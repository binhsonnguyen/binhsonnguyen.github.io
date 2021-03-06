---
layout:     post
title:      Hành dụng xây dựng Javascript Objectt
date:       2017-09-30
---

Bài viết này được xây dựng dựa trên [MDN web docs][mwd-js-object-building] như một hướng dẫn thực hành cho các bạn 
đang muốn hoặc đang cần làm chủ kỹ năng xây dựng Javascript Object. Những thực hành được giới 
thiệu trong bài viết này phù hợp với việc triển khai thử concept về javascript object mà các bạn 
đã biết được nhưng chưa làm hoặc làm chưa trôi chảy. Do đó, để sử dụng nội dung bài viết này tốt 
nhất, bạn nên tự trang bị cho mình một ít hiểu biết về mô hình đối tượng của Javascript. MWD có một tài 
nguyên rất tốt nằm [ở đây][mwd-js-object-overview].

Các thực hành ở đây sẽ sử dụng HTML5 canvas và CSS như một công cụ để trực quan hóa các object 
mà chúng ta xây dựng. Bạn không cần phải có kiến thức về các thư viện đặc thù, nhưng phải có khả 
năng đọc hiểu được cú pháp cơ bản của chúng.

Bài toán
---

Chúng ta sẽ triển khai một bài toán bóng-dội kinh điển. Những quả bóng của chúng ta sẽ sau khi dội 
vào viền cửa sổ sẽ đổi màu và dội ngược lại. Một ví dụ hoàn chỉnh trông sẽ giống như sau:

<img src="/resource/posts/2017-09-30-practice-javascript-object-building/overview.png" width="840" height="525" align="center" >

Chúng ta cần một thư viện để vẽ những quả bóng, trong trường hợp này là *Canvas* của HTML5, và điều
khiển các họat họa chuyển động trên toàn khung hình bằng hàm [requestAnimationFrame][mwd-request-animation-frame] 
(tôi cũng hi vọng rằng sau bài viết này các bạn sẽ quan tâm khám phá những công cụ này nhiều hơn).
Chúng ta cũng sẽ sử dụng vài đối tượng rất được việc khác, và khám phá một vài kỹ thuật phát hiện 
va chạm rất tốt để làm những quả bóng dội lại sau khi chạm tường hay chạm vào nhau.

Chuẩn bị
---

Hãy chuẩn bị một thư mục dự án với bộ khung gồm các file `index.html`, `style.css` và `main.js`. Bạn có thể download 
nhanh [tại đây][backbone-dl]. Những file đó, theo thứ tự, chứa những nội dung sau:

1. Một tài liệu HTML rất đơn giản, chứa một vùng `canvas` để chúng ta có thể vẽ lên, và lời gọi
tới file *CSS* và *JavaScript* của chúng ta.

2. Một ít style đơn giản với mục đích là loại bỏ đi những khoảng giãn cách
ở viền cửa sổ, giúp biến chúng thành những "bức tường" thực sự.

3. Một đoạn mã *javascript* ngắn để vẽ phần tử `canvas` lên bao phủ vùng nhìn thấy của trình duyệt.

Chúng ta cùng xem xét những dòng mã *javascript* đầu tiên:

```javascript
// setup canvas
let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

```

Đoạn mã này lấy ra tham chiếu tới đối tượng `canvas` trong cây DOM của tài liệu HTML. Thông qua 
tham chiếu đó cài đặt kích thước cho `canvas`. Chúng ta muốn canvas bao phủ toàn bộ vùng nội dung
nhìn thấy trên trình duyệt (*ta không muốn nhìn thấy bóng chưa chạm tường đã bật lại, hoặc bay ra 
khỏi vùng nhìn thấy được của trình duyệt luôn, đúng chứ?*), do đó mà có dòng lệnh thứ 2 và thứ 3.
Chúng ta sẽ vẽ MỌI quả bóng lên trên canvas này.

Vẽ một "bóng"
---

Chúng ta sẽ mô tả một quả bóng, bao gồm vị trí, kích thước, màu sắc, và thử vẽ nó vào canvas. Việc
"vẽ" có trình tự cụ thể là: sử dụng một cây bút (context) vẽ một VÒNG CUNG (arc) quét qua đủ 360 độ 
(từ `0` đến `2 * Math.PI`). Bởi vì những bước này là đặc thù chỉ cho việc vẽ "bóng", nên ta sẽ giấu
chúng trong hàm `draw`:

```javascript

let ctx = canvas.getContext('2d');

let ball = {
    color: "red",
    x: 100,
    y: 100,
    size: 50
};

draw(ball);

function draw(ball) {
    const ANGLE_START = 0;
    const ANGLE_END = 2 * Math.PI;
    let ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = ball.color;
    ctx.arc(ball.x, ball.y, ball.size, ANGLE_START, ANGLE_END);
    ctx.fill();
}

```

Chạy thử

<img src="/resource/posts/2017-09-30-practice-javascript-object-building/static_ball.png" width="832" height="636" align="center" >

Mô hình của "bóng"
---

Nhưng chúng ta muốn tạo ra nhiều bóng, vì thế, hãy mô hình hóa "bóng" thành một lớp. Đặc tả cho lớp
đó những thuộc tính mô tả được vị trí, màu sắc, kích thước; đưa `draw` thành một "khả năng"
của lớp đó. Dưới đây là một cách triển khai khả dĩ làm được những việc đó:

```javascript

let ball = new Ball(100, 100, "red", 50);

ball.draw(canvas);

function Ball(x, y, color, size) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
    
    this.draw = function (canvas) {
        const ANGLE_START = 0;
        const ANGLE_END = 2 * Math.PI;
        let ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, ANGLE_START, ANGLE_END);
        ctx.fill();
    }

}

```

Hãy chạy thử để chắc chắn rằng bóng vẫn được vẽ lên thành công. Sau đó chúng ta sang bước tiếp
theo - giúp bóng "lăn" được.

Bóng "lăn"
---

Chúng ta cần làm bóng di chuyển, có nghĩa là, chúng ta làm hình tròn được vẽ trên canvas được vẽ 
lại ở một tọa độ khác sau một khoảng thời gian (nhỏ) nào đấy. Điều này tương đương với *"sau một 
khoảng thời gian nhỏ, tọa độ của bóng được thay đổi, sau đó hình vẽ cũ của bóng trên canvas được
xóa đi, sau đó việc vẽ quả bóng với tọa độ mới được thực hiện lại."*

Hành động như trên là vô cùng phổ biến trong việc lập trình hình họa chuyển động, cho nên không ngạc
nhiên khi mà javascript có luôn API [requestAnimationFrame][mwd-request-animation-frame] giúp chúng ta 
thực hiện được việc đó, và được hầu hết các trình duyệt hiện đại hỗ trợ.

Chỉ cần gọi `requestAnimationFrame` cùng với một mô tả cho nó biết rằng nó phải làm gì giữa mỗi 
khung hình - ở trong mã mẫu sau đây thì đó là hàm `stepping`. Để ý rằng bản thân mỗi "step" lại gọi 
thực thi khung hình tiếp theo.

```javascript
let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext('2d');

let ball = new Ball(100, 100, "red", 50);

window.requestAnimationFrame(stepping);

function stepping() {
    ball.draw(canvas);
    ball.roll();
    window.requestAnimationFrame(stepping);
}

function Ball(x, y, color, size) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
    
    this.roll = function() {
        this.x += 1;
        this.y += 1;
    }
    
    this.draw = function (canvas) {
        const ANGLE_START = 0;
        const ANGLE_END = 2 * Math.PI;
        let ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, ANGLE_START, ANGLE_END);
        ctx.fill();
    }

}

```

Chạy lên thử

<img src="/resource/posts/2017-09-30-practice-javascript-object-building/moving_ball.png" width="832" height="636" align="center" >

Vâng, đan có gì đó sai sai - với mỗi khung hình, chúng ta thay đổi (tăng) tọa độ của bóng, sau đấy vẽ lại bóng, 
và sau đấy gọi khung hình tiếp theo, nhưng chúng ta chưa thực hiện việc *"xóa hình ảnh cũ của bóng"*. Ta có 
thể làm việc này bằng cách XÓA TRẮNG TOÀN BỘ CANVAS:

```javascript

function stepping() {
    dim(canvas);
    ball.draw(canvas);
    ball.roll();
    window.requestAnimationFrame(stepping);

    function dim(canvas) {
        let ctx = canvas.getContext('2d');
        const BACKGROUND_COLOR = "white";
        ctx.fillStyle = BACKGROUND_COLOR;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
}

```

Hãy chạy thử lại và bạn sẽ thấy rằng bây giờ bóng đã lăn rất kool ngầu, sau đó trôi luôn ra khỏi viền cửa sổ và 
đi mất. Ta phải làm bóng có thể "bật" lại sau khi va chạm vào tường. Nhưng để làm được điều đó, trước tiên ta phải
điều khiển được "hướng lăn" của bóng. Bài toán này thường được giải quyết theo hướng phân rã vector lăn
của bóng thành hai vector vuông góc với nhau. Chúng ta sẽ thực hiện một ít chỉnh sửa trên lớp `Ball`:

```javascript
function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
    
    this.roll = function() {
        this.x += this.velX;
        this.y += this.velY;
    }
    
    this.draw = function (canvas) {
        const ANGLE_START = 0;
        const ANGLE_END = 2 * Math.PI;
        let ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, ANGLE_START, ANGLE_END);
        ctx.fill();
    }

}

```

Và cập nhật sự thay đổi này ở chỗ dùng tới `Ball`:

```javascript
let ball = new Ball(100, 100, 3, 1, "red", 50);

```

Bạn sẽ thấy bây giờ ta đã có thể điều khiển hướng bay của bóng một cách rất dễ dàng bằng cách thay đổi `velX` 
và `velY`. Tiếp theo ta sẽ tìm cách phát hiện sự va chạm của bóng với viền cửa sổ, dựa vào đó để đảo chiều 
vector vận tốc của bóng, nói cách khác, là làm bóng "bật tường".

<img src="/resource/posts/2017-09-30-practice-javascript-object-building/vector_ball.png" width="505" height="405" align="center" >

Bóng "bật"
---

Ta sẽ làm bóng "đổi hướng" khi chạm phải "tường":

```javascript
    this.roll = function() {
        this.x += this.velX;
        this.y += this.velY;

        let reachLeft =  this.x - this.size <= 0;
        let reachRight =  this.x + this.size >= canvas.width;
        if (reachLeft || reachRight) {
            this.velX = -(this.velX);
        }

        let reachTop =  this.y - this.size <= 0;
        let reachBottom =  this.y + this.size >= canvas.height;
        if (reachTop || reachBottom) {
            this.velY = -(this.velY);
        }

    }

```

Chạy thử để chắc chắn rằng mã mới hoạt động tốt. Chúng ta sẽ sang bước lớn tiếp theo: CHƠI VỚI NHIỀU BÓNG HƠN.

Nhiều bóng
---

Chúng ta sẽ tạo ngẫu nhiên một số lượng lớn bóng, với hướng lăn ban đầu ngẫu nhiên, kích thước ngẫu nhiên,
màu ngẫu nhiên, và cho chúng tự lăn loạn trên màn hình. Nhưng trước tiên, ta cần chắc chắn rằng mình quản 
được nhiều hơn một quả bóng.

```javascript
let balls = [
    new Ball(100, 100, 3, 1, "red", 30),
    new Ball(300, 200, -2, 3, "blue", 20)
];

window.requestAnimationFrame(stepping);

function stepping() {
    dim(canvas);
    
    for (ball of balls) {
        ball.draw(canvas);
        ball.roll();
    }

    window.requestAnimationFrame(stepping);

    function dim(canvas) {
        let ctx = canvas.getContext('2d');
        const BACKGROUND_COLOR = "white";
        ctx.fillStyle = BACKGROUND_COLOR;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
}

```

Nếu không có gì bất thường, thì bạn sẽ có hai quả bóng lăn trên màn hình, và chúng ta có thể nghĩ đến bước 
tiếp theo - sử dụng những quả bóng được sinh ngẫu nhiên.

```javascript

let balls = createABulkOfBalls(10);

window.requestAnimationFrame(stepping);

function createABulkOfBalls(num) {
    let balls = Array(num);
    while (num > 0) {
        balls[--num] = createRandomBall();
    }

    return balls;

    function createRandomBall() {
        let size = rdr(10, 30);
        let x = rdr(size, canvas.width - size);
        let y = rdr(size, canvas.height - size);
        let velX = rdr(-10, 10);
        let velY = rdr(-10, 10);

        let red = rdr(0, 255);
        let green = rdr(0, 255);
        let blue = rdr(0, 255);
        let color = `rgb(${red}, ${green}, ${blue})`;

        return new Ball(x, y, velX, velY, color, size);

        function rdr(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
    }

}

```

Đây là kết quả:

<img src="/resource/posts/2017-09-30-practice-javascript-object-building/bulk_of_balls.png" width="505" height="405" align="center" >


Các bạn có thể quan sát thấy đôi lúc, có những quả bóng "đứng yên" được sinh ra, bạn có thể làm gì đó
để tránh được điều này. Hoặc làm bóng "vỡ" sau một số lần va chạm nào đó, v.v... Có rất nhiều điều chúng ta có thể 
làm cho đến bây giờ :). Nhưng gác lại những tùy biến đó, chúng ta đi đến một vấn đề khác trong lập trình game, cũng 
cốt lõi không kém chuyện quản lý khung hình, đó là *phát hiện va chạm*.

Chúng ta sẽ tìm cách phát hiện khi nào có hai "bóng" đã va chạm với nhau, và tạo ra một hệ quả nhìn thấy được, đó 
là hai "bóng" sẽ "đổi màu". Ta sử dụng một thuật toán đơn giản được trình bày [ở đây][collision_detaction]
để cấu thành khả năng phát hiện va chạm của bóng. Nó dựa vào việc *nếu khoảng cách giữa tâm của hai bóng nhỏ hơn tổng
bán kính của hai quả bóng đó thì tức là bóng đã va chạm với nhau*. Bổ sung hàm sau vào lớp "bóng":

```javascript

    collisionDetect = function(balls) {
        for (ball of balls) {
            if (this !== ball && collisioned(this, ball)) {
                this.color = randomColor();
                ball.color = randomColor();
            }
        }

        function collisioned(b1, b2) {
            let sumOfRadiuses = b1.size + b2.size;
            return distance(b1, b2) < sumOfRadiuses;
        }

        function distance(b1, b2) {
            let dx = this.x - balls[j].x;
            let dy = this.y - balls[j].y;
            return Math.sqrt(dx * dx + dy * dy);
        }

        function randomColor() {
            let red = rdr(0, 255);
            let green = rdr(0, 255);
            let blue = rdr(0, 255);
            return `rgb(${red}, ${green}, ${blue})`;
        }

        function rdr(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
    }
    
```

Và cho chạy kiểm tra va chạm sau mỗi khung hình

```javascript
function stepping() {
    dim(canvas);
    
    for (ball of balls) {
        ball.draw(canvas);
        ball.roll();
        ball.collisionDetect(balls);
    }

    window.requestAnimationFrame(stepping);

    function dim(canvas) {
        let ctx = canvas.getContext('2d');
        const BACKGROUND_COLOR = "black";
        ctx.fillStyle = BACKGROUND_COLOR;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
}

```

Bạn có thể lập trình để bóng có những phản ứng phức tạp hơn khi va chạm, như vỡ hay bật lại "như thật". Nhưng 
việc đó đi hơi xa so với mục đích ban đầu của chúng ta, nên tôi không muốn đào sâu ở đây. Bạn có thể tự lập trình,
hoặc sử dụng những thư viện giả lập vật lý (rất quen thuộc với các nhà phát triển game) như [PhysicsJS][physics-js], 
[matter-js][matter-js], [Phaser][phaser], v.v...

Bạn cũng có thể để ý thấy tới lúc này thì mã đã xuất hiện mã lặp, bạn có thể làm gì đó để nợ kỹ thuật này không còn 
nữa.

Ví dụ vừa được trình bày đã bóc từng lớp nhỏ một của một bài toán thực tế, sử dụng nhiều đối tượng và nhiều hành 
dụng lập trình hướng đối tượng. Hi vọng bạn đã thực hành được một vài kỹ năng hữu ích.

Chúc bạn học vui.

PS: bạn có thể theo dõi từng bước tiến triển của bài toán [ở đây][steps]. 

[mwd-js-object-building]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_building_practice
[mwd-js-object-overview]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects
[mwd-request-animation-frame]: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
[backbone-dl]: https://gist.github.com/binhsonnguyen/39c94748e9f6a6a32372b6ca849ef595/archive/c62bf80bb67bf835014f9c4d2e6205e6d246d4b9.zip
[2d-collision_detaction]: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
[physics-js]: http://wellcaffeinated.net/PhysicsJS/
[matter-js]: http://brm.io/matter-js/
[phaser]: https://phaser.io/
[steps]: https://gist.github.com/binhsonnguyen/39c94748e9f6a6a32372b6ca849ef595/revisions