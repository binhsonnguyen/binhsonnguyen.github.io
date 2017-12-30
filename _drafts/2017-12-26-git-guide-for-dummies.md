---
layout:     post
title:      Hướng dẫn dùng git trong dự án - for dummies version
date:       2017-12-26
---

Too long; didn't read
---

Tài liệu này được viết với mục đích giúp những nhóm làm sản phẩm còn mới, nhỏ, và chưa
có nhiều kinh nghiệm sử dụng git (hay bất kỳ một version manager nào khác) tiến đến sử 
dụng được git-way để cộng tác phát triển sản phẩm, cũng như quản lý phiên bản.

Dù bạn sẽ phải đối diện với các vấn đề thuần kỹ thuật khi sử dụng git, thì vẫn nên nhớ
rằng hai mặt của git, là một công cụ cộng tác, và một công cụ quản lý phiên bản. Tài 
liệu này, mặc dù là một tài liệu "nén", nhưng vẫn nhiều step hơn mức bình thường. Nhưng
tất cả các bước đó đều phục vụ một vai trò nào đó để quản lý phiên bản hay cộng tác mà 
thôi.

Môi trường
---

Bài viết này được viết theo hướng chỉ bạn cách cộng tác và quản lý phiên bản dựa trên 
git, không phải là một bài viết "học về git".

Bài viết này sẽ hướng dẫn bạn sẽ sử dụng các tính năng mà git mang lại thông một IDE 
bất kỳ của hãng JetBrains: Intelij, WebStorm, PhpStorm, RubyMine, PyCharm... Nếu bạn sử
dụng IDE khác, hoặc chỉ dùng git executable, thì nguyên lý ở bài viết này không thay đổi
và vẫn cung cấp cho bạn một hướng tiếp cận đúng đắn, chỉ có cách thao tác là khác đi.

Bạn cần có sẵn IDE như đã nói ở trên.

Bạn cũng cần cài đặt thành công git executable. Bạn có thể kiểm tra bằng cách mở giao 
diện command-line và gọi thử chương trình `git`, hãy chắc chắn rằng `git` có chạy và 
thông báo cho bạn thông tin gì đó, như dưới đây:

```bash
[codegym:~] $ git
usage: git [--version] [--help] [-C <path>] [-c name=value]
           [--exec-path[=<path>]] [--html-path] [--man-path] [--info-path]
           [-p | --paginate | --no-pager] [--no-replace-objects] [--bare]
           [--git-dir=<path>] [--work-tree=<path>] [--namespace=<name>]
           <command> [<args>]

These are common Git commands used in various situations:
...
```

Nếu bạn nhìn thấy dòng chữ `command not found`, điều đó có nghĩa là trong môi trường của
bạn không có git executable, và các IDE như Intelij hay WebStorm sẽ không thể giúp bạn
chạy bất kỳ tính năng nào của git cả.

Tìm mọi cách để có một kho chứa online, và có URL của nó
---

Bạn cần thực hiện bước này khi nhóm của bạn chưa có kho chứa chung, đặt trên một server
cung cấp dịch vụ git nào đó ([github][github] và [gitlab][gitlab] là những ví dụ).

Với mỗi dự án, nhóm của bạn nên cộng tác trên cùng một dịch vụ, điều này giúp việc cộng
tác được đơn giản hơn. Ví dụ: tất cả cùng sử dụng github cho một project.

Hãy tạo ra một kho chứa git (new repository) từ giao diện web, đặt tên kho chứa đó theo tên
dự án của bạn, nên đặt tên `theo-cú-pháp-như-thế-này`. Tại thời điểm mới tạo xong, chúng
ta thường được cảnh báo rằng đây vẫn đang là một kho chứa rỗng, đừng lo về điều đó. Bởi
tất cả những gì chúng ta cần là kho chứa của chúng ta được đặt online, để mọi cộng tác 
viên đều truy cập được.

Sau khi kho chứa online đã được tạo ra, các cộng tác viên có thể lấy được URL của kho 
chứa như mô tả dưới đây:

<img src="/resource/posts/2017-12-26-git-guide-for-dummies/repository-url.png" align="center" >

Cộng tác viên tạo một kho chứa "bản sao" ở máy tính cá nhân
---

Cộng tác viên đã có được URL của kho chứa ở bước trước, và có thể dùng lệnh `git clone` 
hoặc dùng sẵn tính năng _Checkout from Version Control_ của IDE để tạo ra một bản sao
của kho chứa online:

<img src="/resource/posts/2017-12-26-git-guide-for-dummies/clone.png" align="center" >

Sau đó hãy dùng IDE để mở dự án lên.

Cộng tác viên chuẩn bị cho mình một nhánh để viết mã cho chức năng
---

Cộng tác viên sẽ không trực tiếp viết mã trên nhánh có tên là `master` hay `dev`, mà trên
các nhánh `function-`. Ví dụ `function-foo` và `function-bar`. Trong trường hợp chưa có 
nhánh `dev` (thường là lúc dự án mới vừa được tạo kho chứa xong), thì nhánh `dev` được 
tách ra từ nhánh `master`.

Để tạo ra một nhánh, trước tiên cộng tác viên cần chắc chắn là đang đứng ở nhánh gốc 
bằng cách quan sát ở thanh trạng thái của IDE:

<img src="/resource/posts/2017-12-26-git-guide-for-dummies/which-branch.png" align="center" >

Sau đó, mở menu _Find Action_, gõ _new branch_, hoặc tìm tới menu _new branch_, để 
mở hộp thoại tạo ra branch mới:

<img src="/resource/posts/2017-12-26-git-guide-for-dummies/new-branch.jpg" align="center" >

Sau khi branch mới đã được tạo ra, cộng tác viên có thể checkout sang branch đó và bắt 
đầu viết mã

<img src="/resource/posts/2017-12-26-git-guide-for-dummies/checkout-new-branch.png" align="center" >

Hãy luôn chắc chắn mình đang viết mã trên đúng nhánh, lưu ý tên nhánh ở trong bài này 
được cố ý viết không tuân theo quy ước `function-tên_nhánh`, ngụ ý rằng các nhóm được 
tự do đặt ra quy ước của mình..

<img src="/resource/posts/2017-12-26-git-guide-for-dummies/branch-checked-out.png" align="center" >

Viết mã và commit vào cây lịch sử
---

Cộng tác viên luôn có thể sử dụng menu _Show Diff_ để kiểm tra những thay đổi mà mình đang
tạo ra trên file:

<img src="/resource/posts/2017-12-26-git-guide-for-dummies/diff.png" align="center" >

Các commit là trái tim của một kho chứa git. Mỗi commit đại diện cho toàn bộ nội dung
của project tại một thời điểm nào đó trong lịch sử. Để đánh dấu việc đưa một file mới
vào commit tiếp theo, sử dụng menu _Add to VCS_

<img src="/resource/posts/2017-12-26-git-guide-for-dummies/git-add.png" align="center" >

Tạo ra một commit là một hành động quan trọng và cần phải cân nhắc, cộng tác viên phải
chắc chắn rằng các thay đổi mà mình chọn để có mặt trong commit là có ý nghĩa và "đặt 
tên được", việc commit có một message mô tả đầy đủ mà vẫn ngắn gọn các thay đổi của nó
so với commit cha là một trong những biểu hiện của mã tốt.

Để mở hộp thoại tạo commit, cộng tác viên sử dụng menu _Commit_:

<img src="/resource/posts/2017-12-26-git-guide-for-dummies/commit.png" align="center" >

Nhập mô tả cho những thay đổi vào và nhấn _Commit_:

<img src="/resource/posts/2017-12-26-git-guide-for-dummies/commit-dialog.png" align="center" >

Sau khi commit được tạo ra, nó sẽ được hiện diện trong cây lịch sử:

<img src="/resource/posts/2017-12-26-git-guide-for-dummies/history-tree.png" align="center" >

Đọc cây lịch sử
---

Mặc dù không bắt buộc để có thể làm việc cộng tác, nhưng có kỹ năng đọc cây lịch sử giúp
hiệu quả cộng tác tăng lên rất nhiều.

Các thông tin có trên cây lịch sử bao gồm tên các commit và liên kết cha-con giữa chúng.
Vị trí các nhánh ở trong kho chứa local và kho chứa online, những dữ liệu đó cho cộng 
tác viên biết cần phải làm gì tiếp theo.

Trước tiên, sử dụng menu _Find Action_ để chạy tính năng _fetch_ của git, giúp cập nhật
trạng thái mới nhất của kho chứa online:

<img src="/resource/posts/2017-12-26-git-guide-for-dummies/find-fetch.png" align="center" >

Sau đó bạn có thể bật biểu đồ mô tả cây lịch sử lên và bắt đầu quan sát đánh giá:

<img src="/resource/posts/2017-12-26-git-guide-for-dummies/graph.png" align="center" >

Trên biểu đồ cây lịch sử, thẻ màu vàng định vị thư mục hiện hành của bạn đang dựa trên 
commit nào, các thẻ màu xanh lá định vị các nhánh local và các thẻ màu tím định vị các 
nhánh ở kho chứa online (theo thông tin mà git biết được từ lần _fetch_ cuối cùng).

Đối chiếu với hình trên, ta biết được rằng thư mục hiện hành đang đứng ở nhánh `foo`. 
Nó có một commit mới so với nhánh `master` (cũng như nhánh `dev`) và commit này chưa được
merged. Vì không có thẻ màu tím tương ứng với nhánh `foo` nên ta biết rằng đây là một 
nhánh mới. Ta sẽ phải _push_ nhánh `foo` cùng với các commit (mới) của nó lên kho chứa 
online trước khi tạo _yêu cầu merge_ nhánh foo vào nhánh `dev`.

Push commit lên kho chứa online
---

Lưu ý, tiêu đề của mục này là _push commit_ chứ không phải _push code_, _push mã_ hay 
_push file_. Thứ mà bạn _push_ hay _pull_ giữa các kho chứa với nhau chỉ là commit mà 
thôi.

Cộng tác viên sẽ sử dụng menu _Find Action_ để mở hộp thoại :

<img src="/resource/posts/2017-12-26-git-guide-for-dummies/find-push.png" align="center" >

Hãy quan sát hộp thoại _Push_ trước khi nhấn submit. Những thông tin trong hộp thoại
sau đây nói lên rằng, cộng tác viên sẽ push những commit có trong danh sách bên dưới, 
từ nhánh `foo` ở local lên nhánh `foo` (là một nhánh mới) ở kho chứa có tên `origin`.
Hãy chắc chắn rằng đó chính xác là điều cộng tác viên muốn làm, sau đó nhấn submit để 
thực hiện việc push.

<img src="/resource/posts/2017-12-26-git-guide-for-dummies/push.png" align="center" >

Tạo yêu cầu merge
---

Chức năng được phát triển ở nhánh `function-` sẽ cần được merge vào nhánh `dev`. Kết quả
của việc đó là việc từ nhánh `dev` có thể đi ngược được tới tất cả các commit của nhánh
`function-`, như ta thấy trong biểu đồ cây lịch sử dưới đây:

<img src="/resource/posts/2017-12-26-git-guide-for-dummies/merged.png" align="center" >

Việc merge làm thay đổi mã nguồn ở nhánh `dev`, và thường cần được review chéo trước khi
thực hiện. Để việc review chéo này được dễ dàng và trực quan, github cung cấp tính năng
tạo _yêu cầu merge__ - tên gốc là _merge request_.

Một yêu cầu merge, bản thân nó có thông tin về việc _tôi yêu cầu merge từ nhánh \*\*\* 
tới nhánh *\*\*_.

_Yêu cầu merge_ là một khái niệm khá phổ biến, nhưng nó không phải là chức năng được phát 
triển trong git, mà bởi các dịch vụ phục vụ git như github, gitlab. Tên của chức năng 
này có thể mỗi nơi mỗi khác. Với github, họ đặt tên là "pull request" và bạn có thể tạo
_yêu cầu merge_ bằng cách click vào nút "New pull request":

<img src="/resource/posts/2017-12-26-git-guide-for-dummies/pull-request.png" align="center" >

Việc tạo _yêu cầu merge_ từ nhánh này tới nhánh kia trong cùng một kho chứa rất đơn giản, 
bạn "muốn nhánh nào phải merge nhánh của bạn vào", và "bạn muốn họ merge nhánh nào vào"?

<img src="/resource/posts/2017-12-26-git-guide-for-dummies/compare.png" align="center" >

Sau khi chỉ định hướng merge, hãy nhấn nút "Create pull request" như trên hình, màn hình
tiếp theo sẽ để bạn xem trước _yêu cầu merge_, bao gồm tin nhắn mô tả sơ lược chức năng
trong nhánh của cộng tác viên, và mô tả chi tiết hơn, bạn hãy nhập cẩn thận những nội
dung ấy vào và nhấn xác nhận.

<img src="/resource/posts/2017-12-26-git-guide-for-dummies/preview-pull-request.png" align="center" >

Review yêu cầu merge
---

Mỗi yêu cầu merge phải được review chéo trước khi thực sự được merge vào nhánh chính.
Sản phẩm của việc review có thể là comment xác nhận đã đạt, chưa đạt, các comment trực 
tiếp lên mã... tùy theo quy trình do nhóm phát triển đặt ra.

<img src="/resource/posts/2017-12-26-git-guide-for-dummies/review.png" align="center" >

Merge
---

Khi _yêu cầu merge_ đã được xác nhận là đạt chất lượng, việc merge có thể được tiến 
hành. Cộng tác viên có thẩm quyền sẽ thực hiện việc này ở máy local và push commit 
merge lên kho chứa online, hoặc sử dụng tính năng merge do dịch vụ cung cấp. Hai hành
động này có kết quả như nhau đó là commit merge xuất hiện trên kho chứa online và 
các cộng tác viên khác có thể pull về kho chứa local của mình.

<img src="/resource/posts/2017-12-26-git-guide-for-dummies/merged-pushed.png" align="center" >

Reflection
---

Tài liệu này đã trình bày một lượt các thao tác mà cộng tác viên thực hiện với git, với
kho chứa local, với kho chứa online, với dịch vụ git, để đạt mục tiêu là cộng tác phát 
triển sản phẩm theo nhóm. Tuy vậy, kể cả khi phát triển sản phẩm hay học tập, các bước
thực hiện trong tài liệu này vẫn là những hành dụng tốt.

Chúc các bạn học tập và cộng tác hiệu quả.

[github]: https://github.com
[gitlab]: https://gitlab.com
[repository-url]: /resource/posts/2017-12-26-git-guide-for-dummies/repository-url.png











