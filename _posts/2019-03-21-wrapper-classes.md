---
layout:     post
title:      Java - chuyện “cái bao”
date:       2019-03-21
---

# TL;DR

Java tự xưng là một “ngôn ngữ lập trình hướng đối tượng”. Hầu hết mọi giá trị trong không gian nhớ của máy chạy Java là đối tượng. Hầu hết, trừ dăm ba cái *primity types: số, luận lý, ký tự*.

Có một sự thật là **không phải ở đâu cũng có thể cứ khơi khơi thế mà “ở trần”**. Chẳng hạn, bạn viết một lớp dụng đến Generic, chẳng hạn `C<T>`. Rất tiếc, bạn sẽ không thể viết khai báo `C<int> c = new C<>`. Đơn giản, `int` không phải là một lớp.

# Bao

Bao (tiếng Anh: *wrapper class*, tớ dịch nghĩa đen thôi nhé) là những lớp được tạo ra với mục đích biến bất kỳ thứ gì thành *object*. Cách thức rất đơn giản, bạn có giá trị kiểu `T` (không cần biết có phải primity type hay không), bạn tạo ra một lớp `WrappedOfT` mà trong đó giá trị chúng ta cần sử dụng biến thành một thuộc tính của nó:


```java
class WrappedOfT<T> {
  private T value;
  public WrappedT(T value) { this.value = value; }
  public T getValue() { return this.value; }
}
```

Từ bây giờ, thay vì sử dụng các biến `T` , thay vào đó bạn dụng `WrappedOfT`. Dĩ nhiên, do đã được gói (tôi không dùng nghĩa đen chính thống nữa nhé), class `WrappedOfT` mất tất cả các phương thức và hành vi vốn có của `T`. Nếu bạn muốn có lại chúng, bạn viết lại chúng và kết nối chúng với `value`.

Trong số các *thư viện cơ sở của JRE* có sẵn các lớp bao gói cho tất cả các kiểu nguyên thủy. Chúng ta có *Integer* cho kiểu *int*, *Byte* cho các *byte*, *Double* cho các *double*, *Boolean* cho các *bool*… Trong phần còn lại của bài này, chúng ta sẽ sử dụng thuật ngữ *lớp bao gói* để chỉ các lớp này - chứ không phải các lớp bao gói theo nghĩa rộng.

Tất cả các class bao gói của Java, ngoại trừ *Char* đều có 2 constructor - một sử dụng giá trị nguyên thủy làm tham số và một sử dụng *String*:

```java
Integer i3 = new Integer(3); // bao gói số 3
Integer i5 = new Integer("5"); // bao gói số 5
```

Mặc dù vậy, chúng ta sẽ được khuyến khích sử dụng *static factory* để khởi tạo đối tượng bao gói, do nó *cache* những đối tượng bao gói những giá trị hay dùng nhất và nhờ đó có hiệu năng cao hơn đáng kể:

```java
Integer i500 = Integer.valueOf(500);
Integer i501 = Integer.valueOf("501");
```

Chỉ một lưu ý nhỏ, cả hai cách khởi tạo mà dụng tham số *String* đều có khả năng tạo ra *NumberFormatException*, do nó là *RuntimeException* nên bạn sẽ không bị compile ép phải *try..catch*, nhưng nếu bạn không *try..catch*, chương trình của bạn sẽ có khả năng đột tử. Nhớ nhé :).

# Tự động gói

Thử tưởng tượng phải dùng Java Collection theo cách này:


```java
List<Integer> nums = new ArrayList<Integer>();
nums.add(Integer.valueOf(1));
nums.add(Integer.valueOf(3));
nums.add(Integer.valueOf(14));
```

Không vui chút nào đúng không? Trước Java phiên bản 5, quả thật các lập trình viên đã phải làm như vậy. Cho tới khi Java 5 đến và mang theo tính năng *tự động gói*. Đồng nghĩa **với bất kỳ chức năng nào sử dụng tham số có kiểu là** ***kiểu bao gói của T*****, bạn cũng có thể sử dụng** ***giá trị T*** **để thế vào**. Chẳng hạn:


```java
Integer i = 100; // @@ voãi, lấy SỐ ra gán vào ĐỐI TƯỢNG

int compareResult = compare(3, 5); 
// -1 @@, voãi, truyền SỐ vào phương thức dụng ĐỐITƯỢNG

static int compare(Integer i1, Integer i2) {
  return i1.compareTo(i2);
}
```

Không có ngoại lệ nào ở đây, phương thức compare **vẫn nhận được các ĐỐI TƯỢNG Integer**, chứ không phải các giá trị *int*, để thực thi. Có điều đó là do các giá trị 3 và 5 ở trên đã được tự động bao gói thành các đối tượng Integer.

Bạn phải thật cẩn trọng khi sử dụng các tham chiếu của kiểu bao gói, đừng bao giờ coi chúng thực sự là giá trị nguyên thủy:


```java
int i1 = 1000;
int i2 = 1000;
System.out.println(i1 == i2); // true, tất nhiên rồi
Integer i3 = 1000;
Integer i4 = 1000;
System.out.println(i3 == i4); // false đấy
```

`i3` và `i4` là hai tham chiếu đến hai đối tượng khác nhau, theo nguyên lý bình thường của phép toán `==`, kết quả sẽ là `false`.

# Caching của `valueOf`

Đừng kiểm thử giá trị của đoạn mã ở phần trên với những giá trị nhỏ, kết quả sẽ không như bạn mong đợi đâu:


```java
Integer i3 = 100;
Integer i4 = 100;
System.out.println(i3 == i4); // true, thế mới hay
```

Khi thực hiện thao tác tự động bao gói, JVM sử dụng phương thức `valueOf` của lớp bao gói. Như đã nói ở đầu bài, phương thức này tạo sẵn một *Hồ* chứa những đối tượng bao gói những giá trị hay dùng nhất, bao gồm:

- Tất cả các đối tượng của lớp *Boolean* (có 2 thôi mà)
- Tất cả các đối tượng của kiểu *Byte*
- Tất cả các *Character* ASCII (mang các *char* có mã từ 0 đến 127)
- Tất cả các *Short* và các *Integer* mang các giá trị từ -128 đến 127

Nếu giá trị cần bao gói được liệt kê ở trên, đối tượng sẽ được dùng lại, gây ra hiện tượng `==` lúc *true* lúc *false* như các bạn quan sát thấy.

Cách để đơn giản hóa vấn đề này là làm y như lời thầy cô đã dặn, với các object, chỉ sử dụng phép toán `==` khi bạn thực sự hiểu mình đang làm gì, còn không, hãy dụng phương thức `equals`. Các nhà phát triển Java đã chơi đủ đẹp để *overriden* phương thức đó thành một phương thức hữu dụng: nó so sánh giá trị được bao gói, thay vì số tham chiếu:


```java
Integer i3 = 1000;
Integer i4 = 1000;
System.out.println(i3.equals(i4)); // true rồi :)
```

# Mở bao gói

Bao gói và tự động bao gói tạo cơ hội để chúng ta sử dụng các giá trị nguyên thủy như những object bình thường, ví dụ sử dụng `List<Integer>`. Nhưng khiến cho những câu lệnh như sau thêm phần khó hiểu:


```java
Integer i1 = new Integer("1");
i1++;
```

WTF? Chúng ta vừa thực hiện phép tăng **++** trên **đối tượng**?

Câu trả lời là không, chuyện thực sự xảy ra như sau:


```java
Integer i1 = new Integer("1");
int x = i1.intValue();
x++;
i1 = new Integer(x);
```

Ví dụ trên là một minh chứng cho việc JVM thực sự đối xử một cách không công bằng với tất cả các class. Những lớp bao gói nhận được đặc quyền sử dụng các phép tính mà chúng ta không thể tái hiện lại ở những class khác. Khi thực hiện những phép tính mà **chỉ các giá trị kiểu nguyên thủy mới làm được**, chẳng hạn +-*/!, JVM sẽ tự động mở bao gói.

Bạn có thể tự thử nghiệm để phát hiện điều này rất dễ dàng. Các đối tượng của lớp gói kiểu nguyên thủy của Java là *bất biến*. Mỗi khi bạn thực hiện các phép toán, JVM thực sự liên tục mở bao, tính toán, và đeo bao lại như mã bên trên. Nếu bạn sử dụng phương thức `System.identityHashCode` để theo dõi tham chiếu của biến bao gói, bạn sẽ thấy tham chiếu này liên tục thay đổi - điều chứng tỏ các đối tượng bao gói liên tục được tạo mới để lưu chứa giá trị mới.
