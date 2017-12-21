---
layout:     post
title:      Tái tạo từ khóa this của JavaScript (phần 1)
date:       2017-12-21
---

Bài viết này dành cả cho những người biết rõ vấn đề đang nói tới ở đây là gì, lẫn những
người chưa biết. Vì thế nó không mở đầu với "`this` là một từ khóa rất dễ gây bối rối
của JavaScript" - hay đại loại thế. Trong bài viết này, tôi sẽ đưa bạn đọc tái tạo lại
từ khóa `this`, theo nhu cầu lập trình thường gặp, để bạn đọc chiếm lĩnh được nó một 
cách tự nhiên, hữu cơ.

Đặt vấn đề chúng ta có một hàm xây dựng object, giúp ta xây dựng một đối tượng "đoạn 
thẳng", đối tượng đó có khả năng tự trực quan hóa nó bằng một phương thức `print()`, như
thế này:

```javascript
function createLineSegment(len) {
  return {
    length: len,
    print: function () {
      let visualization = ''
      let remaining = length
      while (remaining > 0) {
        visualization += '*'
      }
      return visualization
    }
  }
}

let aLineSegment = createLineSegment(5)
console.log(aLineSegment.print())
```

Bạn cần có khả năng hiểu được ý đồ của đoạn kịch bản trên để có khả năng hiểu được phần
còn lại của bài viết.

Phương thức `print()` của những object được tạo bằng đoạn mã trên sẽ không thể thực thi
được đúng như mong muốn. Hãy để ý dòng `let remaining = length`. Hãy nhận thấy rằng "What?
Lúc đứng trong hàm đó thì làm quái gì có biến `length` nào?"

Đấy chính là điều mà trình thông dịch đã gặp phải. Những người biết tiếng Anh đều sẽ 
rất dễ nhận ra rằng phép gán đó nói tới thuộc tính `length` của object đó. Nhưng trình 
thông dịch, một đứa cực kỳ chặt chẽ về mặt lý luận, sẽ không chấp nhận sự "coi như" hời
hợt đó.

Chúng ta cần chỉ ra cho trình thông dịch rằng "tôi lấy thuộc tính length CỦA ĐỐI TƯỢNG 
NÀY ra và gán vào cho biến remaining".

Nếu ở phía ngoài thì rất dễ, đoạn mã như sau sẽ chạy mà không gặp vấn đề gì cả:

```javascript
let aLineSegment = createLineSegment(5)
let remaining = aLineSegment.length
let visualization = ''
while (remaining > 0) {
  visualization += '*'
}
console.log(visualization)
```

Ở phía bên ngoài, chúng ta chỉ cần `aLineSegment.length`, và nó work. Nhưng ở phía trong, 
chúng ta cần một thứ đại diện cho "đối tượng mà mình đang ở trong" để sử dụng thay cho
`aLineSegment`. Những người tạo ra ngôn ngữ JavaScript sử dụng từ khóa `this` để đại 
diện cho thứ đó. Như vậy, lỗi của đoạn mã đầu tiên có thể được sử như sau:

```javascript
function createLineSegment(len) {
  return {
    length: len,
    print: function () {
      let visualization = ''
      let remaining = this.length
      while (remaining > 0) {
        visualization += '*'
      }
      return visualization
    }
  }
}

let aLineSegment = createLineSegment(5)
console.log(aLineSegment.print())
```

Như vậy, bạn đã tìm tới được usecase đầu tiên của từ khóa this, là dùng trong việc viết 
kịch bản cho PHƯƠNG THỨC của đối tượng, để truy cập tới các thuộc tính khác (và tất nhiên
là cả các phương thức khác) của đối tượng đó.

Chúng ta sẽ tiếp tục ở phần hai, với nội dung là "phá hoại, làm hỏng" usecase này.
