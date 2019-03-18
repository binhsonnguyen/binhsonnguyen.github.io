---
layout:     post
title:      Java - Biến chuỗi, Hằng chuỗi, Hồ chuỗi, Đối tượng chuỗi - tưởng tượng thế nào cho dễ hiểu
date:       2019-03-18
---

# TL;DR!

Nếu bạn đang sử dụng ngôn ngữ Java, và bạn được dặn là luôn so sánh hai giá trị String với nhau bằng phương thức `booleal equals(@Nullable Object)` thì đây là lúc để làm rõ điều đó.

# Biến

Tôi sẽ làm như thể bạn đã biết rằng biến là một giá trị được đặt tên. Tên và giá trị của biến nằm tại vùng nhớ gọi là *Ngăn Xếp*. Biến là rất nhiều, *Ngăn Xếp* cần được tối ưu để truy cập rất nhanh, nên phần “đất” (bộ nhớ) trong ngăn xếp cần được phân bổ thật tốt.

Nếu kiểu dữ liệu của biến là các *kiểu nguyên thủy* - những kiểu có *độ dài bit* cố định và không dài lắm thì ổn thôi. Nhưng nếu biến đại diện cho một *giá trị đối tượng* thì lại khác, ta không thể dự trước được đối tượng sẽ chiếm bao nhiêu bit, JVM cũng thế. Điều này làm nó không thể phân bổ vùng nhớ dành cho *đối tượng* vào *Ngăn Xếp* được.

Giải pháp là đặt giá trị *đối tượng thật* vào một vùng nhớ khác gọi là *Đống*. Còn biến nằm tại *Ngăn Xếp* thì có giá trị là một *con số* đại diện cho vị trí của đối tượng đang nằm trong *Đống*. Các con số này cơ bản là có độ dài bit bằng nhau, nhờ đó mà JVM dễ phân bổ bộ nhớ đi bao nhiêu. Đây là lý do tại sao so sánh `==` hai biến object với nhau lại khó khăn đến thế: cho dù chúng giống nhau y hệt, chúng vẫn nằm ở hai chỗ khác nhau, và *giá trị của hai biến tham chiếu đến chúng* là khác nhau. Một khi đã khác thì phép `==` chả bao giờ cho `true` được.

```java
Object o1 = new Object();
Object o2 = new Object();
Object o3 = o1;
System.out.println(o1 == o2); // false
System.out.println(o1 == o3); // true
```

Kiến trúc *Ngăn Xếp* và *Đống* này đẹp và hiệu quả đến nỗi nó được sử dụng cho hầu hết các ngôn ngữ lập trình.

# Biến Chuỗi, Hồ Chuỗi

Tôi tiết lộ thêm cho bạn một bí mật, rằng với kiểu dữ liệu *String*, giá trị thật của chúng nằm tại một vùng đặc biệt khác trong *Đống*, gọi là *Hồ*. Mỗi khi bạn tạo mới một chuỗi, nếu giá trị của chuỗi đó là đã biết trước (compile time), JVM sẽ cố mò xem giá trị đó có sẵn có trong *Hồ* không và tìm cách tái sử dụng. Cùng lắm mới phải tạo chuỗi mới.

Chả thế mà dù là đối tượng chứ không phải kiểu nguyên thủy, các phép so sánh sau vẫn đúng mới hay:

```java
String s1 = "JVM van tue";
String s2 = "JVM van tue";
String s3 = "JVM" + " van tue";
System.out.println(s1 == s2); //true
System.out.println(s1 == s3); //true
```

Bạn lưu ý, phép so sánh trên cho `true` chỉ là do hai biến `s1` và `s2` đang có cùng con số (nghĩa là tham chiếu đến cùng một giá trị chuỗi đang nằm trong *Hồ*) thôi. Chứ giá trị của chuỗi chả nghĩa lý gì ở đây cả:

```java
String s1 = "JVM van tue";
String s2 = "jvm".toUpperCase() + " van tue";
System.out.println(s1 == s2); // false
```

Chuỗi là kiểu dữ liệu được sử dụng thường xuyên, rất thường xuyên. *Hồ* giúp JVM phân bổ bộ nhớ cho các dữ liệu này hiệu quả hơn đáng kể.

# Hằng chuỗi

Như đã chỉ ra ở trên, **chuỗi thật nằm trong** ***Hồ*** **chứ không ở đâu khác**.

Bởi chuỗi nằm trong *Hồ* có thể được tham chiếu bởi vô số biến nằm tại *Ngăn Xếp*, chuỗi nằm trong hồ cần phải **bất biến**, nếu không chúng ta sẽ không bao giờ tin tưởng được tính chính xác trong giá trị của một biến chuỗi nữa. 

Mọi chuỗi đều là hằng.

Ngay khi ta thực hiện phép thay đổi một biến kiểu chuỗi, **một chuỗi mới sẽ được tạo ra** trong *Hồ* để lưu giá trị mới, và để mặc giá trị cũ ở chỗ cũ. Mời bạn theo dõi các dòng lệnh và comment dưới đây.

```java
String s1 = "JVM van tue";
System.out.println(System.identityHashCode(s1)); // một số X, đây là ...
// ...số để tham chiếu của s1

s1 += ""; 
// tại lúc này, một chuỗi mới đã được tạo ra trong hồ, và s1...
// ...tham chiếu tới chuỗi đó, xem câu lệnh dưới để thấy bằng chứng

System.out.println(System.identityHashCode(s1)); // một số Y != X

String s2 = "JVM van tue";
System.out.println(System.identityHashCode(s2)); // vẫn số X,...
// ...s2 tham chiếu tới chuỗi đã từng là tham chiếu của s1
```

Tính bất biến là một hiệu ứng phụ của giải pháp *Hồ*, nó làm tốc độ thao túng các giá trị chuỗi giảm sút đáng kể. Giải pháp cho vấn đề này nằm tại thư API *StringBuiler* và *StringBuffer*, nhưng tôi sẽ không đề cập tới chúng trong phạm vi bài viết này.

# Đối tượng chuỗi

Có sự khác nhau đáng kể khi bạn khai báo *biến chuỗi* với khi bạn khai báo *đối tượng chuỗi*:

```java
String s1 = "JVM";
System.out.println(System.identityHashCode(s1)); // một số X
String s2 = new String("JVM");
System.out.println(System.identityHashCode(s2)); // số Y != X
```

Biến `s1` tham chiếu tới hằng chuỗi nằm trong *Hồ*. Trong trường hợp còn lại, `s2` tham chiếu tới một đối tượng kiểu *String* được tạo ra trong *Đống*, và đối tượng này có thuộc tính tham chiếu tới hằng chuỗi đang nằm trong *Hồ:*

![](https://d2mxuefqeaa7sj.cloudfront.net/s_26A94F394E38E9B676EBCC2B7D2D074EFEEF5AA7196D05CFF158EF98895DB824_1552875563515_IMG_2028.JPG)


Hai biến (s1 và s2) tham chiếu tới 2 nơi khác nhau, điều đó có thể được kiểm tra bằng `System.``*identityHashCode*`, nhưng cuối cùng chúng đều đi tới chung một hằng chuỗi, điều đó có thể được kiểm tra bằng `String[hashCode]`:

```java
System.out.println(identityHashCode(s1) == identityHashCode(s2)); // false
System.out.println(s1.hashCode() == s2.hashCode()); // true
```

# Lời kết

Còn nhiều điều khúc mắc trong bài này, như cấu trúc của thứ được gọi là hằng chuỗi như thế nào chẳng hạn. Bài viết này xin được gạt chúng ta để tập trung chỉ vào mối quan hệ giữa những thứ được kể ra trên đầu bài.
