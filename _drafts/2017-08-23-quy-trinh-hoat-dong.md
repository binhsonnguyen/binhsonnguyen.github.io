---
layout:     post
title:      Quy trình hoạt động
date:       2017-08-04
---

Lưu ý: tài liệu này được sử dụng nội bộ trong Scrumlab như một nội quy/hướng dẫn và được publish 
chỉ với mục đích chia sẻ. Không phải là một tài liệu mang tính học thuật, và không đảm bảo chính quy 
về mặt nội dung.

Scrum
---

**Scrumlab** là đội phát triển của [Học viện Agile][agilead], chịu trách nhiệm nghiên cứu, phát 
triển, triển khai và bảo trì các nhu liệu hỗ trợ cho sự hoạt động của tổ chức. Là một phần của một 
tổ chức nghiên cứu/phát triển và đào tạo Agile, và như trong tên gọi đã gợi ý, **Scrumlab** hoạt 
động dưới framework **Scrum**. Theo đó, Scrumlab chuyển giao sản phẩm theo từng gói nhỏ chuyển giao 
được, trong từng khoảng thời gian ngắn và đều đặn, gọi là *Sprint*. Trước, trong và sau mỗi sprint, 
Scrum triển khai một số *event* đặc thù nhằm giữ được ba trụ cột của Scrum là *Minh bạch, Thanh 
tra và Thích nghi*. Để hoạt động tạo ra sản phẩm cũng như tham gia các event được hiệu quả, con 
người của Scrumlab được đặt vào các role theo Scrum như trình bày dưới đây.

Team
---

### Product Owner

PO là người chịu trách nhiệm 
định ra nội dung của các gói nhỏ này, cung cấp cho đội phát triển những mô tả cần thiết, cũng như 
kiểm tra khả năng chuyển giao được của gói.

Hiện tại, vai trò PO của Scrumlab do anh **Nguyễn Khắc Nhật** đảm nhiệm.

### Scrum Master

Nhạc trưởng / người huấn luyện giúp Scrumlab hoạt động hiệu quả và chất lượng với framework Scrum. 
Cũng như tạo điều kiện làm việc tốt nhất có thể cho đội phát triển.

Hiện tại, vai trò SM do anh **Nguyễn Bình Sơn** đảm nhiệm.

### Đội phát triển

Chịu trách nhiệm tạo ra gói sản phẩm chuyển giao được. Đội phát triển của Scrumlab bao gồm những 
con người sau đây

- Lê Thị Trang
- Nguyễn Duy Đức
- Dương Dũng
- Phan Duy Luân

Sự kiện
---

Hoạt động của Scrumlab tuân theo những sự kiện sau đây của framework Scrum, nhằm đảm bảo giữ được 
ba trụ cột *Minh bạch, Thanh Tra, Thích nghi*:

### Planning

Diễn ra đầu mỗi sprint, ở phần đầu của buổi planning, team quyết định xem trong sprint sắp tới sẽ 
*chuyển giao cái gì thì hợp lý*, và ở phần tiếp theo sẽ phân tích *làm những tính năng đó như thế 
nào*.

Hợp lý ở đây bao gồm nội dung của gói sản phẩm là có giá trị cao nhất và phù hợp với năng lực của 
đội phát triển tại thời điểm hiện tại. Chính vì liên quan tới nội dung chuyển giao, sự kiện 
Planning nhất thiết cần đến sự tham giao của PO. Đội phát triển cần có mặt để tham gia ước lượng 
độ phức tạp của các sản phẩm. Và Scrum Master hỗ trợ cho việc ước lượng và ra quyết định trong 
buổi họp này diễn ra hiệu quả và đúng trong khung thời gian dự kiến.

Output của buổi planning là một mục tiêu sprint và một sprint backlog, nơi chứa các đầu mục công 
việc cần giải quyết để đạt được mục tiêu đó. 

### Daily Meeting

Đây là cuộc gặp mặt dành riêng cho các thành viên đội phát triển, để đồng bộ hoá sự minh bạch công 
việc, tiến độ, và các vấn đề đang trì hoãn tiến độ chung. Trong buổi gặp mặt này các thành viên đội 
phát triển broadcast ba câu trả lời của ba câu hỏi: *hôm qua đã làm gì, hôm nay làm gì, những khó 
khăn đang/sẽ gặp phải*. Như tất cả các sự kiện khác của Scrumlab, Scrum Master có thể có mặt trong 
sự kiện này để đảm bảo tính *đều-đặn/đúng-giờ/đúng-nội-dung/gọn/trong-khung-thời-gian* của buổi 
daily meeting.

### Review Srpint

Đánh giá kết quả tạo ra giá trị của đội phát triển trong suốt sprint. Cũng như buổi Planning, 
buổi review liên quan tới nội dung chuyển giao, nên nhất thiết phải có sự tham gia của PO.

Phát triển
---

## Workflow

- Story được đưa vào Product Backlog
- Story được làm mịn vào buổi Planning
- Story được đội phát triển estimate vào buổi planning
- Story nếu lớn hơn 2 tiếng được tách nhỏ thành cách task vào buổi Planning
- Trong suốt sprint, nếu cột Do-ing đang có ít hơn 2 task, các task cần thiết làm nhất tại từng 
thời điểm có thể được kéo sang cột Do-ing để thể hiện rằng task đó là "cần làm bây giờ", những ai 
làm việc với task đó sẽ tự assign mình vào. Sau khi kéo, task sẽ ngay lập tức bước vào quy trình 
tạo/review/merge nhánh.

### Quy trình tạo/review/merge nhánh

- Nhánh issue đuợc tách CHỈ từ nhánh `dev`.
- Sau khi dev cảm thấy nhánh đã ở trạng thái có thể merge được thì tạo *merge request* tới nhánh 
`dev` và kéo task liên quan sang cột "Review".
- Mã đuợc *approve* bởi ít nhất một người trong đội phát triển và sau đó được gán nhãn *Approved*.
- Nhánh được `merge --no-ff` vào `dev`. Task liên quan được kéo vào cột "Test".
Ngay sau đó, task liên quan bước vào quy trình "test".

### Quy trình test

- Chức năng được test trên mã của nhánh `dev`. Sau đó task sẽ được kéo sang cột "Done".
- Nếu có lỗi, hay cần sửa thêm, một Addition Task/Bug sẽ được tạo ra vào cột Doing, và được estimate.
Task/Bug này sẽ đi qua qui trình từ đầu.

## Định nghĩa hoàn thành

Những mục sau cần được xác nhận trước khi bất cứ một công việc nào được gọi là *Done*:


- Code đã đuợc Review chéo 
- Chức năng đã đưọc test chéo
- Test trên nhiều trình duyệt (IE, Chrome , Firefox)
- Phải validate dữ liệu
- Đã hỗ trợ I18n
- Dữ liệu phải đẹp 
- Đã refactor ít nhất 1 lần
- Đã merge vào nhánh dev
- Sử dụng màu mặc định của Bootstrap
- Giao diện đúng với thiết kế


[agilead]: https://hocvienagile.com
