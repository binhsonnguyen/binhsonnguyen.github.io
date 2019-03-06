---
layout:     post
title:      Một vài điểm cần lưu ý với phép gán các giá trị biểu diễn số nguyên trong ngôn ngữ Java
date:       2019-03-05
---

Phép gán một giá trị số nguyên trong Java cho một biến có thể được thực hiện đơn
giản bởi toán tử `=` và theo sau đó là một literal hoặc một biểu thức có kết
quả là số.

Nhưng có một số điểm quan trọng xoay quanh kích thước bit của các kiểu biểu 
diễn số nguyên mà lập trình viên rất nên quan tâm tới nếu không muốn gặp phải
những lời từ chối compile trông rất kỳ lạ.

Mời các bạn theo dõi khối mã kèm comment dưới đây để tìm hiểu.

```
// Number litleral luôn được coi như giá trị kiểu `int`, phép gán sau hợp lệ:
int i1 = 3;

// Gán biểu thức trả về int vào biến byte sẽ gây mất chính xác, nên compile 
// triệt để không cho phép:
byte b1 = i1; // compiler từ chối biên dịch

// Cần nhớ, trong trường hợp trên, compile thực sự không quan tâm tới giá trị
// thật của biến `i1` (thừa nhỏ để fit vào kiểu byte), điều  duy nhất compile nhìn
// thấy là chúng ta đang cố đặt kết quả của một biểu thức trả về giá trị của một
// kiểu lớn vào một biến kiểu nhỏ.

// Nếu thật sự muốn, chúng ta cần cast tường minh `i1` thành `byte` trước khi
// chỉ dẫn gán:
byte b2 = (byte) i1;

// nhưng với literal thì khác, giá trị của chúng là cố định và không thay đổi
// trong thời gian thực thi, nên compiler sẽ đoán trước được phép gán có nguy
// hiểm không nếu có, nhờ đó chúng ta không cần phải:
byte b3 = (int) 5;

//...litleral `5` biểu diễn giá trị 5, đủ nhỏ để fit trong kiểu `byte`. Do đó,
// compiler sẽ cast ngầm định `5` thành byte. Chúng ta không cần viết cast tường 
// minh như trên nữa:
byte b4 = 5;

//Chú ý rằng số phải đủ nhỏ, lớn quá là lỗi đoán trước được:
byte b5 = 127; // 2^7 -1, số lớn nhất của kiểu nguyên 8 bit có dấu
byte b6 = 127 + 1; // compiler từ chối biên dịch, số này cần 9 bit
byte b7 = 128 >> 1; // shift 9 bit sang phải 1 bit thì chắc chắn còn 8 bit, vừa

//Một sự thật khác

// Kết quả của phép cộng có sự tham gia của biến có kiểu `int` hoặc ngắn hơn
// luôn có kiểu là `int`, điều này dẫn tới các phép gán sau cũng không được
// compile thông qua:
byte b8 = b2 + 0; // compiler từ chối biên dịch
byte b9 = b2 + b3; // compiler từ chối biên dịch

// Tuy vậy, tương tự như với `b4`, phép gán sau thì compile có thể cho phép:
byte b10 = 3 + 3;
```

Vấn đề tương tự sẽ gặp phải với trường hợp số thực. Đây không phải vấn đề quá
dễ hiểu với lập trình viên mới học nghề. Nhưng may mắn là nó mở ra cơ hội cho
chúng ta hiểu thêm cách máy tính lưu trữ các giá trị từ đời thực và những giới
hạn mà nó gặp phải.
