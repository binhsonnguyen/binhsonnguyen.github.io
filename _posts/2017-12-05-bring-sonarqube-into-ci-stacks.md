---
layout:     post
title:      Tích hợp SonarQube vào CI Stacks
date:       2017-11-25
---

SonarQube Server
---

Một SonarQube server cần phải được cài đặt sẵn, cấu hình tiêu chuẩn là 2GB Ram, với IP 
tĩnh.

Có thể cài đặt nhanh bằng một `docker-compose.yml` như sau (chú ý thay `$PORT` bằng port
muốn sử dụng):

```yaml
version: "2"

services:
  sonarqube:
    image: sonarqube:alpine
    ports:
      - $PORT:9000
    networks:
      - sonarnet
    environment:
      - SONARQUBE_JDBC_URL=jdbc:postgresql://db:5432/sonar
    volumes:
      - sonarqube_conf:/opt/sonarqube/conf
      - sonarqube_data:/opt/sonarqube/data
      - sonarqube_extensions:/opt/sonarqube/extensions
      - sonarqube_bundled-plugins:/opt/sonarqube/lib/bundled-plugins

  db:
    image: postgres:alpine
    networks:
      - sonarnet
    environment:
      - POSTGRES_USER=sonar
      - POSTGRES_PASSWORD=sonar
    volumes:
      - postgresql:/var/lib/postgresql
      - postgresql_data:/var/lib/postgresql/data

networks:
  sonarnet:
    driver: bridge

volumes:
  sonarqube_conf:
  sonarqube_data:
  sonarqube_extensions:
  sonarqube_bundled-plugins:
  postgresql:
  postgresql_data:
```

Và up lên bằng lệnh: `docker-compose up -d`.

Server sau đó có thể đăng nhập bằng địa chỉ `http://address:$PORT`, với username và password
đều là `admin`.

Đăng ký project với SonarQube Server
---

Project cần phải đăng ký lên sonarqube server và nhận về token. Token này là cần thiết để
sonar scanner có thể được xác thực. Token được sử dụng bằng cách lưu trong file cấu hình
sonarscanner hoặc đưa vào làm đối số trong lệnh chạy sonarscanner.

SonarQube Scanner
---

Nếu muốn kiểm tra code quality một cách thủ công, developer có thể tải SonarQubeScanner
về máy mình và cài đặt theo [hướng dẫn][scanner-installation]. Nếu không có thể bỏ qua 
bước này.

Khi thực thi, sonarscanner sẽ tạo ra thư mục `.scannerwork/` trong project của chúng ta.
Có thể cân nhắc để list file này vào `.gitignore`.

SonarQube Scanner - configuration
---

Trái lại, sẽ có một stack trong CI chạy sonarscanner của nó, ở đây ta sẽ cấu hình trước
cho việc chạy sonarscanner.

Trong project root, tạo file `sonar-project.properties`, nhớ thay các biến `$` bằng 
gía trị thật. Có thể tìm các mẫu file config này bằng từ khóa chẳng hạn như `sonarscanner laravel`.

```text
# must be unique in a given SonarQube instance
sonar.projectKey=$TOKEN_NAME:$TOKEN_KEY
# this is the name and version displayed in the SonarQube UI. Was mandatory prior to SonarQube 6.1.
sonar.projectName=$PROJECT_NAME
sonar.projectVersion=$PROJECT_VERSION

# host
sonar.host.url=http://$SONARQUBE_SERVER_ADDRESS:$PORT

# Chỉ định đường dẫn thư mục source code. Thay "\" bằng "/" trên Windows.
sonar.sources=$SOURCE_CODE_LOCATION

# chỉ định ngôn ngữ
sonar.language=$LANGUAGE
sonar.sourceEncoding=UTF-8

# đặc thù cho phpunit
sonar.php.coverage.reportPath=ci/codeCoverage/codeCoverage.xml
sonar.php.tests.reportPath=ci/testResults.xml

# Đặc thù cho laravel
sonar.exclusions=app/Providers/**

```

Commit và push file này vào project.

Gitlab CI configuration
---

Ta cần chỉ định để gitlab chạy sonarscanner trên mỗi commit. Ta sẽ chạy scanner thông 
qua docker container, ta sẽ chạy docker thông qua một container có tool đó. Đây là file
`.gitlab-ci.yml` cho cấu hình như vậy:

```yaml
qualitycheck:
  image: docker:latest
  variables:
    DOCKER_DRIVER: overlay
  services:
    - docker:dind
  script:
    - docker pull binhsonnguyen/sonarqube-scanner
    - docker run -v $PWD:/root/src binhsonnguyen/sonarqube-scanner

```

Từ đây, bất kỳ commit nào có chứa file này được push lên server sẽ kích họat các Gitlab 
Runner đang được assign vào repository của ta thực thi pipeline có tên `qualitycheck` 
được khai báo ở trên.

Ta sẽ tự tạo ra một Gitlab Runner

Gitlab Runner
---

Bạn cần vào `settings/ci_cd` của project gitlab, và vào mục `Runner settings` để có được
`registration token`. Token này là cần thiết để đăng ký runner với project.

Hướng dẫn tạo gitlab runner sau sử dụng runner chạy trong docker container. Vì một vài 
lý do kỹ thuật mà tôi chưa xử lý được, runner và sonarqube server không nên đặt trên cùng
một máy.

Trên một môi trường có IP tĩnh, tạo một folder mới, `cd` vào và tạo trong đó một file `config.toml`
(để trắng) dành cho cấu hình runner.

Khởi tạo và chạy runner lên bằng câu lệnh sau:

```bash
docker run -d --name gitlab-runner \
  -v $PWD:/etc/gitlab-runner \
  -v /var/run/docker.sock:/var/run/docker.sock \
  gitlab/gitlab-runner:alpine
```

Đăng ký runner với project ở gitlab, chú ý thay `$TOKEN` bằng giá trị thật

```bash
docker exec gitlab-runner gitlab-runner register -n \
  --url https://gitlab.com/ \
  --registration-token $TOKEN \
  --executor docker \
  --description "sonarqube dockerized runner" \
  --docker-image "docker:latest" \
  --docker-privileged
```

Trigger
---

Gitlab runner có thể được trigger mà không cần tới hành động push commit. Có thể dùng 
cách tạo một POST request với 2 param là `token`, và `ref` (nhánh) tới API trigger của 
gitlab. Tham khảo `settings/ci_cd`, mục trigger runners.

[scanner-installation]: https://docs.sonarqube.org/display/SONARQUBE52/Installing+and+Configuring+SonarQube+Scanner