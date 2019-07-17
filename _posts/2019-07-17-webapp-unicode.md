---
layout:     post
title:      Debug và khắc phục lỗi hiển thị ký tự Unicode của ứng dụng Web
date:       2019-07-17
---

Bài viết này ngầm định rằng bạn biết “bảng mã” nghĩa là gì, và bạn quen thuộc
với các thành phầncủa mô hình ứng dụng web cũng như mô hình trình diễn MVC.
Mặc dù mã ở đây được trình bày dưới dạng thức của ngôn ngữ Java, framework
Spring MVC và database MySQL, các vấn đề được nhắc đến là chung, các khái niệm
được nhắc đến là phổ biến, và các cách giải quyết là tổng quát.

## Model mang dữ liệu Unicode nhưng View thì không

Bạn có *model* như thế này.

<img src="/resource/posts/2019-07-17-webapp-unicode/01.jpg" width="427px" height="207px" align="center" >

Nhưng bạn nhận được kết quả như thế này:

<img src="/resource/posts/2019-07-17-webapp-unicode/02.jpg" width="392px" height="186px" align="center" >

Là vì *View* của bạn có nội dung như thế này:

```html
<input type="text" name="name" value="Nh?t">
```

Bạn cần làm cho *view engine* render cho bạn một *view* mà trong đó các ký tự
unicode của *template* và *model* được bảo toàn. Ví dụ sau đây là cấu hình cho
view engine *Thymeleaf*.

```java
@Bean
public ViewResolver viewResolver() {
    // ...
    viewResolver.setCharacterEncoding("UTF-8");
    return viewResolver;
}
```

## Template mang ký tự Unicode nhưng View thì không

Bạn có view template như thế này:


```html
<tr>
  <td>Tên</td>
  <td>
    <input type="text" name="name" th:value="${customer.name}">
  </td>
</tr>
<tr>
  <td>Email</td>
  <td>
    <input type="text" name="email" th:value="${customer.email}">
  </td>
</tr>
<tr>
  <td>Địa chỉ</td>
  <td>
    <input type="text" name="address" th:value="${customer.address}">
  </td>
</tr>
```

Nhưng bạn nhận được view như thế này:

<img src="/resource/posts/2019-07-17-webapp-unicode/03.jpg" width="395px" height="183px" align="center" >


Nếu bạn đã xử lý vấn đề encoding trong lúc render như ở trên rồi, thì có thể vấn
đề là do *template resorver* đã dùng một encoding khác để đọc tài liệu template.
Hãy cấu hình lại cho cả template resolver nữa.


```java
@Bean
public ITemplateResolver templateResolver() {
    // ...
    templateResolver.setCharacterEncoding("UTF-8");
    return templateResolver;
}
```


## Không thể chuyển tải ký tự Unicode qua tầng giao vận

Giả sử cần submit form sau:

<img src="/resource/posts/2019-07-17-webapp-unicode/04.jpg" width="388px" height="159px" align="center" >

Tầng giao vận TCP/IP không quan tâm với bảng mã, nó đơn giản và vận chuyển gói
tin, **từng byte một**. Phần lớn web server, trừ khi là web server do bạn tự
viết, decode các bytes này để có các parametter theo lối như thể rằng các bytes
đó trước kia là ký tự của bảng mã ISO-8859-1. Nếu bạn nhìn các ký tự đã được
decode ra dưới con mắt của bảng mã UTF-8 (trớ trêu rằng, phần lớn các ngôn ngữ
lập trình làm như thế), bạn sẽ nhận được kết quả không mong muốn.

<img src="/resource/posts/2019-07-17-webapp-unicode/05.jpg" width="238px" height="85px" align="center" >

Cách xử lý luôn luôn là encode chuỗi ký tự ngược lại thành dòng bytes (theo bảng
mã ISO-8859-1, tất nhiên), và sau đó decode lại theo bảng mã UTF-8. Cho dù là thủ
công như sau:

```java
public String createCustomer(Customer customer) {
    try {
        byte[] bytes = customer.getName().getBytes("ISO-8859-1");
        String decodedName = new String(bytes, "UTF-8");
        customer.setName(decodedName);
        customerService.save(customer);
        return "redirect:/customers";
    } catch (UnsupportedEncodingException e) {
        e.printStackTrace();
        return "500";
    }
}
```

… hay tự động, bằng cách sử dụng filter, như sau chẳng hạn:


```java
public class AppInit extends AbstractAnnotationConfigDispatcherServletInitializer {
    // ...

    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        FilterRegistration.Dynamic filterRegistration =
            servletContext.addFilter("endcoding-filter", new CharacterEncodingFilter());
        filterRegistration.setInitParameter("encoding", "UTF-8");
        filterRegistration.setInitParameter("forceEncoding", "true");
        
        //make sure encodingFilter is matched most first, by "false" arg
        filterRegistration.addMappingForUrlPatterns(null, false, "/*");
        
        super.onStartup(servletContext);
    }
}
```


## Entity mang thông tin Unicode, vào đến Database thì mất dấu

Bạn có form như thế này:

<img src="/resource/posts/2019-07-17-webapp-unicode/06.jpg" width="375px" height="185px" align="center" >

Entity ngon nghẻ như thế này:

<img src="/resource/posts/2019-07-17-webapp-unicode/07.jpg" width="444px" height="123px" align="center" >

Vào tới database thì loạn cào cào hết cả:

<img src="/resource/posts/2019-07-17-webapp-unicode/08.jpg" width="772px" height="129px" align="center" >

Hầu hết các client của các dbms, khi kết nối tới dbms server, đều chọn mặc định
một bảng mã để làm việc với nhau. “Mặc định” này đôi khi là một giá trị cố định,
đôi khi là lấy dynamic. Dù là trường hợp nào đi chăng nữa, đôi khi charset đó
hoàn toàn khác với charset được dùng cho Schema/Table/Column. Nghĩa là *“anh nói
tiếng của anh, nhưng tôi hiểu theo tiếng của tôi”*.

Cách xử lý luôn là cố định lại bảng mã dùng trong cuộc nói chuyện giữa client
và dbms server:

```java
dataSource.setUrl("jdbc:mysql://localhost:3306/cms?characterEncoding=utf8");
```

Và đồng thời (điều này rất quan trọng), sử dụng cùng một bảng mã đó cho
Schema/Table/Column:

```sql
CREATE DATABASE IF NOT EXISTS cms CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Nếu database cùng với dữ liệu đã tồn tại, theo một bảng mã khác, cách xử lý luôn
là sử dụng một kỹ thuật nào đó được dbms hỗ trợ để convert dữ liệu từ bảng mã
cũ sang bảng mã mong muốn.

