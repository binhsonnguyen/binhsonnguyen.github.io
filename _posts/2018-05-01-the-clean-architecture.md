---
layout:    post
title:     'Kiến trúc Sạch'
date:      2018-05-01
---

> *Dịch từ bài viết [The Clean Architecture][source] của tác giả Robert C. Martin hay còn 
được biết đến rộng rãi với tên "Uncle" Bob. "Bác Bob" hiện tại là cựu nhân viên của 8th 
Light.*

![](/resource/posts/2018-05-01-the-clean-architecture/1.jpg)

Trong một vài năm gần đây chúng ta đã thấy một lượng lớn các ý tưởng liên quan đến kiến
trúc hệ thống. Trong đó có:

* [Kiến trúc Bát giác][hexagon] (còn được biết với với tên gọi Các Cổng và Các Tiếp hợp)
của Alistair Cockburn và đồng phát triển bởi Steve Freeman cùng với Nat Pryce trong cuốn 
sách rất tuyệt vời [Growing Object Oriented Software][grwoing].
* [Kiến trúc Hành Tây][onion] của Jeffrey Palermo. 
* [Kiến trúc Tiếng Thét][screaming] từ blog của tôi năm ngoái. 
* [DCI][dci] từ James Coplien, và Trygve Reenskaug.
* [BCE][bce] bởi Ivar Jacobson trong cuốn sách *Kỹ thuật Phần mềm Hướng Đối tượng: Một
cách tiếp cận hướng tình huống*.

Tuy tất cả những kiến trúc kể trên có những điểm khác nhau thế nào đó khi đi vào chi tiết,
nhưng chúng rất hao hao nhau. Tất cả đều có cùng một mục tiêu đó là tách bạch những việc
phải lo. Tất cả đều đạt đến mục tiêu đó bằng cách chia tách phần mềm thành các lớp. Mỗi
kiến trúc đều có ít nhất một lớp cho các nghiệp vụ, và một lớp khác cho các giao diện.

Mỗi một kiến trúc đều cho ra những hệ thống mà:

1. Không phụ thuộc framework. Bản thân kiến trúc không phụ thuộc vào bất kỳ thư viện hay
chức năng của một phần mềm nào đang hiện hữu. Điều này cho phép bạn sử dụng các framework
như những công cụ thay vì phải cố ép kiến trúc của bạn tuân theo những ràng buộc của
chúng.
2. Kiểm thử được. Những quy tắc nghiệp vụ có thể được kiểm thử mà không cần đến giao diện
người dùng, hệ quản trị cơ sở dữ liệu, máy chủ web, hay bất kỳ phần tử nào bên ngoài.
3. Không phụ thuộc giao diện người dùng. Giao diện người dùng có thể dễ dàng được thay đổi
mà không kéo theo bất kỳ sự thay đổi nào ở phần còn lại của hệ thống. Một giao diện người
dùng Web có thể được hoán đổi bởi, lấy ví dụ, một giao diện dòng lệnh, mà không ảnh hưởng
tới những quy tắc nghiệp vụ.
4. Không phụ thuộc cơ sở dữ liệu. Bạn có thể hoán đổi cơ sở dữ liệu Oracle hay SQL bởi
Mongo, BigTable, CouchDB, hay thứ gì đó khác. Những nghiệp vụ của bạn không phải là những
thứ bị giới hạn trong cơ sở dữ liệu.
5. Không phụ thuộc bất kỳ dịch vụ bên ngoài nào. Trong bài toán thực tế, những quy tắc
. nghiệp vụ của bạn đơn giản là không biết tới bất kỳ thứ gì nằm ngoài thế giới của nó.

Sơ đồ ở đầu bài viết này là một thử nghiệm để dung hợp tất cả những kiến trúc đã được liệt
kê ở trên thành một ý tưởng dùng được.

Luật phụ thuộc
---

Những vòng tròn đồng  tâm biểu thị những vùng phần mềm khác nhau. Nói chung, càng vào
trong, cấp của phần mềm càng cao. Những vòng tròn bên ngoài là các cơ chế (cách thức).
Những vòng ở trong là các chính sách (luật).

Quy tắc bao phủ lên kiến trúc này và làm cho nó hoạt động là _Quy tắc Phụ thuộc_. Quy tắc
này phát biểu rằng _những sự phụ thuộc của mã nguồn_ chỉ có thể _hướng vào trong_. Không
thứ gì ở những vòng phía trong được biết tới sự tồn tại của bất kỳ thứ gì ở những vòng
ngoài. Cụ thể, tên của bất kỳ thứ gì được khai báo ở vòng ngoài, bao gồm hàm, lớp, biến,
hay bất kỳ thực thể phần mềm nào khác, không bao giờ được nhắc tới bởi mã của vòng phía
trong.

Bằng một lối tương tự, những định dạng dữ liệu được dùng ở những vòng ngoài không được
mang đi dùng ở những vòng phía trong, đặc biệt là những định dạng được tạo ra bởi những
framework ở vòng ngoài. Chúng ta không muốn bất kỳ thứ gì ở vòng ngoài ảnh hưởng tới những
vòng bên trong.

Các thực thể
---

Các _thực thể_ đóng gói các quy tắc nghiệp vụ ở phạm vi doanh nghiệp. Một _thực thể_ có
thể là một đối tượng với các phương thức, hay một tập hợp các cấu trúc dữ liệu và các hàm.
Dù là gì thì điều đó cũng không quan trọng bằng việc các _thực thể_ có thể được sử dụng
bởi rất nhiều ứng dụng khác nhau trong doanh nghiệp.

Nếu bạn không sở hữu một doanh nghiệp và chỉ viết ra một chương trình đơn, thì ở đấy những
_thực thể_ chính là những đối tượng nghiệp vụ của chương trình. Chúng bao gói những quy tắc
tổng quát ở mức cao nhất. Chúng gần như ít khi thay đổi theo sự thay đổi của môi trường
bên ngoài. Lấy ví dụ, bạn sẽ không muốn những thực thể này bị ảnh hưởng bởi thanh điều
hướng trang hay bởi triển khai bảo mật. Không có hoạt động thay đổi nào diễn ra trên bất
kỳ ứng dụng cụ thể nào có thể ảnh hưởng tới các _thực thể_.

Các Use Case
---

Phần mềm ở tầng này chứa những quy tắc nghiệp vụ _đặc thù theo ứng dụng_. Nó bao gói và
triển khai tất cả các tình huống nghiệp vụ của hệ thống. Những _use case_ đó điều phối
luồng dữ liệu tới và từ các _thực thể_, và gợi ý những thực thể đó sử dụng bộ quy tắc
nghiệp vụ tổng thể của doanh nghiệp để đạt được những mục đích của use case.

Chúng ta không muốn sự thay đổi trên tầng này ảnh hưởng tới các thực thể. Chúng ta cũng
không muốn vòng này bị ảnh hưởng bởi các thay đổi tới từ các ngoại tác như cơ sở dữ liệu,
giao diện người dùng, hay bất kỳ framework phổ biến nào. Tầng này được cô lập khỏi những
mối tương quan đó.

Dù vậy, các thay đổi trên hoạt động của chương trình được mong muốn là sẽ kéo theo thay
đổi trên tầng này. Nếu chi tiết của một tình huống nghiệp vụ bị thay đổi, thì mã ở tầng
này sẽ bị ảnh hưởng ít nhiều ở đâu đó.

Các bộ tiếp hợp giao diện
---

Phần mềm ở tầng này là một tập hợp các _bộ tiếp hợp_ giúp chuyển đổi dữ liệu từ định dạng
tự nhiên nhất cho các use case và các thực thể sang định dạng tự nhiên nhất cho các dịch
vụ bên ngoài như cơ sở dữ liệu hay web. Tầng này sẽ, lấy ví dụ, chứa toàn mộ kiến trúc MVC
của một giao diện người dùng. Các _presenter_, các _view_, các _controller_, tất cả đều
được đặt ở đây. Các _model_ đóng vai trò như là các cấu trúc dữ liệu được truyền tới các
use case, và sau đó quay ngược lại từ các use case tới các presenter và view.

Tương tự như vậy, dữ liệu được chuyển đổi, trong tầng này, từ hình thái tự nhiên nhất cho
các thực thể và use case, thành hình thái tự nhiên nhất cho bất kỳ _khung tồn lưu_ nào
được sử dụng ví dụ như cơ sở dữ liệu. Không mã nào ở các tầng nằm phía trong vòng này nên
biết gì về cơ sở dữ liệu. Nếu cơ sở dữ liệu là một hệ SQL, thì tất cả các SQL phải được
giới hạn chỉ trong tầng này và trong những phần đặc biệt của nó mà làm nhiệm vụ giao tiếp
với cơ sở dữ liệu thôi.

Bên cạnh đó trong tầng này còn là bất kỳ bộ tiếp hợp nào cần thiết để chuyển đổi dữ liệu
từ _ngoại hình thái_ ngoài nào đó, ví dụ như từ một dịch vụ ngoài, thành _nội hình thái_
được các use case và các thực thể sử dụng.

Các framework và driver.
---

Tầng ngoài cùng nói chung là được tạo nên bởi các framework và công cụ như cơ sở dữ liệu,
web framework, v.v... Nói chung bạn không viết quá nhiều mã ở tầng này ngoại trừ những mã
kết dính làm nhiệm vụ giao tiếp với tầng phía trong nó.

Tầng này là nơi chúng ta đi vào những chi tiết. Web là một chi tiết. Cơ sở dữ liệu là một
chi tiết. Chúng ta giữ những thứ đó ở vòng ngoài nơi mà chúng có thể gây ra ít ảnh hưởng
nhất.

Chỉ 4 vòng thôi à?
---

Không, các vòng ở đây là sơ/giản đồ. Vào lúc nào đó bạn có thể sẽ thấy cần nhiều hơn bốn.
Không có luật nào buộc bạn chỉ được dùng tới 4 vòng đã được liệt kê. Tuy vậy _Luật Phụ
thuộc_ buộc phải được tuân thủ. Những phụ thuộc trong mã luôn chỉ được hướng vào trong.
Càng đi vào trong mức trừu tượng càng tăng lên. Vòng tròn ngoài cùng là những chi tiết ở
mức thấp. Càng đi vào trong phần mềm càng trở nên trừu tượng hơn và bao gói những chính
sách ở mức cao hơn. Vòng tròn trong cùng là nơi tổng quát nhất.

Băng qua đường ranh.
---

Ở góc dưới bên phải của sơ đồ là một ví dụ về cách chúng ta vượt qua ranh giới giữa các
tầng. Nó cho thấy sự giao tiếp giữa các presenter và các controller với các use case ở
vòng phía trong. Chú ý tới luồng điều khiển. Nó bắt đầu ở controller, di chuyển qua use
case, và rồi khởi chạy presenter. Cũng hãy chú ý tới các phụ thuộc của mã nguồn. Mỗi trong
số chúng đều trỏ vào trong, tới các use case.

Chúng ta thường giải quyết mối mâu thuẫn này bằng các sử dụng [Nguyên tắc Đảo ngược Phụ
thuộc][di]. Lấy ví dụ, trong một ngôn ngữ như Java, chúng ta có thể dàn xếp các interface
và quan hệ thừa kế sao cho các phụ thuộc trong mã phản ngược lại so với luồng điều khiển
tại những điểm cần thiết trên khắp các đường ranh.

Trong ví dụ ở đây, chúng ta đặt vấn đề rằng tình huống cần gọi presenter. Tuy nhiên điều
này không thể thực hiện trực tiếp được bởi vì nó vi phạm _Nguyên tắc Phụ thuộc_: không tên
nào được đặt ở vòng ngoài được xuất hiện ở vòng phía trong. Vậy nên chúng ta phải làm cho
tình huống gọi tới một interface (hiện diện trong sơ đồ như là Use Case Output Port) trong
vòng trong, và presenter trong vòng ngoài phải triển khai nó.

Kỹ thuật tương tự được sử dụng để băng qua tất cả các đường ranh của các kiến trúc. Chúng
ta sử dụng những lợi thế của đa hình động để tạo ra những phụ thuộc phản ngược lại với
luồng điều khiển, nhờ đó chúng ta có thể đáp ứng được _Nguyên tắc Phụ thuộc_ mà không phải
nghĩ tới chuyện luồng điều khiển đang chỉ theo chiều nào.

Những dữ liệu băng qua đường ranh
---

Thông thường dữ liệu băng qua đường ranh là những cấu trúc dữ liệu không phức tạp. Nếu
muốn bạn có thể sử dụng các cấu trúc cơ bản hoặc các đối tượng ôm dữ liệu đơn giản. Dữ
liệu có thể chỉ là các đối số của các lời gọi hàm. Bạn có thể gói chúng vào một hashmap,
hoặc xây dựng nó thành một đối tượng. Điều quan trọng là chúng là các cấu trúc dữ liệu cô
lập, đơn lẻ, được truyền rành mạch qua các đường ranh. Chúng ta không muốn gian lận hay
đồng nhất các Entities với các hàng của cơ sở dữ liệu. Chúng ta không muốn các cấu trúc dữ
liệu nắm giữ bất kỳ mối phụ thuộc nào vi phạm _Quy tắc Phụ thuộc_.

Lấy ví dụ, nhiều framework cơ sở dữ liệu trả về một dữ liệu rất dễ dùng để phản hồi cho
một câu truy vấn. Chúng ta có thể gọi đó là một cấu trúc hàng. Chúng ta không muốn truyền
hàng đó vào những vòng phía trong. Điều đó sẽ gây vi phạm _Quy tắc Phụ thuộc_ bởi vì nó có
thể buộc các vòng phía trong biết điều gì đó về một vòng bên ngoài.

Vậy là khi chúng ta truyền dữ liệu băng qua các đường ranh, chúng luôn luôn ở trong định
dạng thuận tiện nhất cho vòng phía trong.

Lời kết
---

Thích ứng với những quy tắc đơn giản này không quá khó khăn và sẽ giúp bạn bớt đi rất
nhiều đau đầu về sau. Bằng cách phân tách phần mềm thành các lớp và tuân theo _Quy tắc Phụ
thuộc_, bạn sẽ tạo ra một hệ thống "kiểm thử được tự thân", với tất cả các lợi ích đằng
sau. Khi bất kỳ phần ngoài nào của hệ thống bị lỗi thời, như cơ sở dữ liệu hay web
framework, bạn có thể thay thế chúng theo một cách ít phiền toái nhất.

[source]: https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html
[8th-light-blog]: https://8thlight.com/blog/
[hexagon]: http://alistair.cockburn.us/Hexagonal+architecture
[growing]: https://www.amazon.com/Growing-Object-Oriented-Software-Guided-Tests/dp/0321503627
[onion]: http://jeffreypalermo.com/blog/the-onion-architecture-part-1/
[screaming]: https://8thlight.com/blog/uncle-bob/2011/09/30/Screaming-Architecture.html
[dci]: https://www.amazon.com/Lean-Architecture-Agile-Software-Development/dp/0470684208/
[bce]: https://www.amazon.com/Object-Oriented-Software-Engineering-Approach/dp/0201544350
[di]: https://en.wikipedia.org/wiki/Dependency_inversion_principle