---
layout:     post
title:      Tại sao chỉ có thể sử dụng compile-time constants cho các case của lệnh switch
date:       2019-03-13
---

Trong hầu hết các ngôn ngữ lập trình biên dịch có lệnh rẽ nhánh `switch`, hành dụng như sau sẽ bị *từ chối biên dịch*:

    biến mong_muốn(String) = "bar"
    switch (tham_số(String) = hỏi_người_dùng()) {
      case mong_muốn:
        hoan_hô()
        break
      case "bar":
        khích_lệ()
        break
      case default:
        thông_báo_cái_gì_đó()
    }

Bỏ qua thứ ngôn ngữ mã giả dở hơi mà tôi mới phịa ra, mong bạn bằng cách nào đó (chạy thử với mã thật của ngôn ngữ bạn yêu thích chẳng hạn) phát hiện ra rằng lỗi nằm ở *dòng 3*, khi tôi mô tả một `case` dựa theo biến `mong_muốn`.

Nguyên nhân được compiler viện ra thường có chữ `constant`, và ở một số compiler có đạo đức hơn thì có thêm chữ `compile time`. Tựu chung lại, không biết vì lý do gì, những thế lực tà đạo đó yêu cầu các *case* phải đi kèm với kiểu thức `hằng biết được giá trị ngay tại thời điểm complie`. Tức là:

- Các giá trị được nhập vào bằng *literal*, hoặc các biểu thức chỉ gồm *literal*, chẳng hạn: `0`, `1`, `"``foobar``"`, `1 + 100`, `"``foo``"` `+` `"``bar``"`
- Các enum name, ví dụ `DUMMY.FOO`

**Không thể sử dụng bất kỳ thứ gì có khả năng thay đổi trong lúc runtime**. Chẳng hạn biến hay biểu thức chứa biến.

Chúng ta cần xem xem *compiler* đã *compile* như thế nào, để rồi nó bị trói chân như thế.

Vậy hãy tạo ra một đoạn mã tương tự, nhưng compilable:

    String temp = "";
    switch (temp) {
      case "foo":
        break;
      case "bar":
        break;
      default:
        break;
    }

Compile và sử dụng một công cụ decompile nào đó để soi vào *compiled code*. Ở đây tôi dùng ngôn ngữ Java với Jetbrains Java Decompiler và nhận được kết quả decompile như sau:

    String temp = "";
    byte var3 = -1;
    switch(temp.hashCode()) {
    case 97299:
      if (temp.equals("bar")) {
        var3 = 1;
      }
      break;
    case 101574:
      if (temp.equals("foo")) {
        var3 = 0;
      }
    }
    
    switch(var3) {
      case 0:
      case 1:
      default:
    }

Chưa cần quan tâm đến lý do của lệnh `if` lồng trong mỗi case. Ta đã thấy ngay rằng lệnh `switch` nguyên thủy dựa trên biến String đã được chuyển thể thành dựa trên biến kiểu *byte*. Việc chuyển thể này cần có *hashCode* của giá trị của *case*.

**Nếu biểu thức của** ***case*** **có khả năng thay đổi trong** ***runtime*****,** ***hashCode*** **sẽ thay đổi, và** ***compiler*** **sẽ không có khả năng tính trước để chuyển thể nữa.**

Nhưng tại sao compiler này được code để thực hiện phép chuyển thể như thế?

Câu trả lời là tốc độ, so sánh đơn thuần 2 byte với nhau nhanh hơn nhiều rất nhiều so với đa số các phép so sánh khác.

Các ngôn ngữ thực thi trên môi trường *.NET* thì đưa tất cả các case vào một kiểu dữ liệu *Map* và lợi dụng cơ chế getValue để giấu lời gọi đến *getHashCode* đi:

    Dictionary dictionary1 = new Dictionary(6);
    dictionary1.Add("foo", 0);
    dictionary1.Add("bar", 1);
    
    int num1 = dictionary1.getValue(temp)
    
    switch (num1) {
      case 0: return
      case 1: return;
    }

Nguyên lý ở đây tương tự, *key của các entry trong map là không được bị thay đổi trong runtime*, do đó các giá trị case phải là hằng đoán được tại compile-time.
