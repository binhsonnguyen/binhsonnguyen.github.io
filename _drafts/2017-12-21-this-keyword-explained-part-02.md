---
layout:     post
title:      Tái tạo từ khóa this của JavaScript (phần 2)
date:       2017-12-21
---

Ở [bài trước][previous], tôi đã ép các bạn phải nặn ra từ khóa this như một cách để các câu lệnh 
trong hàm `print()` dưới đây truy cập được giá trị của thuộc tính `length`. 

```javascript
function createLineSegment(len) {
  return {
    length: len,
    print: function () {
      let visualization = ''
      let remaining = this.length
      while (remaining > 0) {
        visualization += '*'
        remaining--
      }
      return visualization
    }
  }
}

let aLineSegment = createLineSegment(5)
console.log(aLineSegment.print()) // result: *****
```

Đoạn mã trên hoạt động như mong muốn. Tôi sẽ đặt ra một tình huống mà từ khóa `this` 
trở nên "phế". Hãy quan sát sự thay đổi trong cách gọi ra hàm `print()` ở đoạn mã dưới
đây:

```javascript
function createLineSegment(len) {
  return {
    length: len,
    print: function () {
      let visualization = ''
      let remaining = this.length
      while (remaining > 0) {
        visualization += '*'
        remaining--
      }
      return visualization
    }
  }
}

let aLineSegment = createLineSegment(5)
let printer = aLineSegment.print
console.log(printer()) // result: ''
```

Ô la la failed. Điều gì đã xảy ra?

Hàm mà biến `printer` ở trên trỏ vào, trong nó có lời gọi truy xuất `this`, nhưng `this`
chỉ là một từ khóa, không trỏ tới một đối tượng cụ thể, nói cách khác, thứ mà `this` trỏ
vào là "động", không cố định. Tôi sẽ tiếp tục nhào nặn ví dụ trên như sau:

```javascript
function createLineSegment(len) {
  return {
    length: len,
    print: function () {
      let visualization = ''
      let remaining = this.length
      while (remaining > 0) {
        visualization += '*'
        remaining--
      }
      return visualization
    }
  }
}

let aLineSegment = createLineSegment(5)
let printer = aLineSegment.print

let foo = {length: 10, bar: printer}
console.log(foo.bar()) // result: '**********'
```

Các bạn thấy rồi chứ, trong đoạn mã trên, thứ mà `this` đại diện không phải là đối tượng
ở lúc bạn viết ra nó, mà chính là đối tượng mà từ đó truy xuất "hàm chứa nó".

Hãy hiểu rõ việc `this` đã nhảy qua nhảy lại được mô tả trong bài này, và rút ra kinh nghiệm
là hạn chế viết kịch bản theo lối như sau, vì nó là một nợ kỹ thuật rất hớ hênh:

```javascript
let printer = aLineSegment.print // assign object's method to a variable...
printer() // ... and call it? don't do it
```

[previous]: /2017/12/21/this-keyword-explained.html