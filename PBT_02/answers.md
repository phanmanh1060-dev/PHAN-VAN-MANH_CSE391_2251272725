# PBT_02
# PHẦN A — KIỂM TRA ĐỌC HIỂU (25 điểm)
## Câu A1 (5đ) — Các loại đầu vào
**1.** type="text" → Ô nhập văn bản một dòng cơ bản → Không tự xác thực → Dùng để nhập Họ tên khách hàng hoặc Địa chỉ nhận hàng.

**2.** type="email" → Ô nhập văn bản, tự động kiểm tra định dạng phải có dấu @ và tên miền → Tự động xác thực định dạng email → Dùng cho Form đăng nhập hoặc Đăng ký nhận bản tin khuyến mãi.

**3.** type="password" → Ô nhập văn bản nhưng ký tự hiển thị dưới dạng dấu chấm hoặc sao để bảo mật → Không tự xác thực (thường kết hợp thuộc tính minlength) → Dùng để Nhập mật khẩu tài khoản.

**4.** type="number" → Ô nhập số, có nút tăng/giảm ở cạnh phải → Tự động xác thực chỉ cho phép nhập số, có thể giới hạn min và max → Dùng để Chọn số lượng sản phẩm trong giỏ hàng.

**5.** type="tel" → Ô nhập văn bản tối ưu cho bàn phím số trên điện thoại → Không tự xác thực mặc định (thường dùng kèm thuộc tính pattern để kiểm tra số điện thoại) → Dùng để Nhập số điện thoại giao hàng.

**6.** type="date" → Hiển thị giao diện chọn ngày tháng năm từ một bộ lịch thả xuống → Tự động xác thực định dạng ngày hợp lệ → Dùng để Chọn ngày hẹn giao hàng hoặc Nhập ngày sinh để nhận quà thành viên.

**7.** type="checkbox" → Ô vuông nhỏ để tích chọn hoặc bỏ chọn → Không tự xác thực → Dùng để Chọn nhiều tiêu chí bộ lọc (ví dụ: lọc theo màu sắc: Đen, Trắng, Đỏ) hoặc Đồng ý điều khoản mua hàng.

**8.** type="radio" → Hình tròn nhỏ, chỉ cho phép chọn duy nhất một lựa chọn trong một nhóm → Không tự xác thực → Dùng để Chọn phương thức thanh toán (ví dụ: COD, Chuyển khoản, Ví điện tử).

**9.** type="file" → Nút nhấn để mở cửa sổ chọn tệp tin từ thiết bị → Tự động xác thực định dạng tệp nếu dùng thuộc tính accept → Dùng để Tải ảnh minh họa khi gửi đánh giá sản phẩm (Review).

**10.** type="search" → Giao diện giống ô text nhưng có thêm nút "x" để xóa nhanh nội dung đã nhập → Không tự xác thực → Dùng cho Thanh tìm kiếm sản phẩm ở đầu trang web.

## Câu A2 (5đ) — Thuộc tính xác thực
**Dự đoán**
- TH1: Bị chặn (Lỗi). Thuộc tính required bắt buộc trường này không được để trống. Nếu không có dữ liệu, trình duyệt sẽ báo lỗi "Please fill out this field".
- TH2: Bị chặn (Lỗi). type="email" yêu cầu dữ liệu phải có định dạng địa chỉ email (có dấu @). Chuỗi "abc" thiếu ký tự này nên không hợp lệ.
- TH3: Bị chặn (Lỗi). Thuộc tính max="10" giới hạn giá trị lớn nhất là 10. Số 15 vượt quá giới hạn này nên trình duyệt sẽ yêu cầu nhập giá trị nhỏ hơn hoặc bằng 10.
- TH4: Bị chặn (Lỗi). pattern="[0-9]{10}" yêu cầu dữ liệu phải là đúng 10 chữ số. "abc123" chứa chữ cái và chỉ có 6 ký tự, hoàn toàn sai so với mẫu (Regex).
- TH5: Bị chặn (Lỗi). minlength="8" yêu cầu tối thiểu phải có 8 ký tự. "123" chỉ có 3 ký tự nên không đủ độ dài tối thiểu theo quy định.

**Xác thực**


TH1 đúng với dự đoán
<img width="1919" height="868" alt="Screenshot 2026-04-28 220537" src="https://github.com/user-attachments/assets/db8bc775-4e88-4d2f-b54a-251a33a7e296" />
TH2 đúng với dự đoán
<img width="1375" height="735" alt="Screenshot 2026-04-28 220837" src="https://github.com/user-attachments/assets/c64a6582-9a85-4414-bf96-c283b0baa905" /> 
TH3 đúng với dự đoán
<img width="1499" height="797" alt="Screenshot 2026-04-28 220920" src="https://github.com/user-attachments/assets/4f8ace59-5c6f-4a97-b9c1-59825dc99d5d" />
TH4 đúng với dự đoán
<img width="801" height="707" alt="image" src="https://github.com/user-attachments/assets/000aefac-6e53-4ba4-ac79-dd344c5469a3" />
TH5 đúng với dự đoán
<img width="997" height="749" alt="Screenshot 2026-04-28 221305" src="https://github.com/user-attachments/assets/35a83bfc-89b4-4bbe-9d39-3d4a6b926764" />

## Câu A3 (5đ) — Khả năng tiếp cận
**1.Tại sao ```<label for="email">``` quan trọng cho trình đọc màn hình?**
- **Định danh ô nhập liệu:** Trình đọc màn hình (Screen Reader) không thể "nhìn" thấy giao diện. Khi người dùng khiếm thị điều hướng đến một ô nhập (input), nếu không có <label>, trình duyệt chỉ đọc là "Edit text" (Ô nhập văn bản), khiến họ không biết phải nhập gì (là Email, Họ tên hay Mật khẩu?).
- **Liên kết logic:** Thuộc tính for của label phải khớp với id của input. Khi đó, trình đọc màn hình sẽ đọc: "Email, edit text" ngay khi người dùng chọn ô đó.
- **Mở rộng vùng tương tác:** Với người dùng bị run tay hoặc dùng thiết bị nhỏ, việc click vào dòng chữ Label cũng sẽ kích hoạt con trỏ vào ô Input, giúp việc nhập liệu dễ dàng hơn.

**2. Khi nào dùng ```<fieldset>``` + ```<legend>```?**
- Bạn nên dùng bộ đôi này khi muốn nhóm các ô nhập liệu có liên quan chặt chẽ với nhau về mặt ý nghĩa, giúp biểu mẫu dài trở nên mạch lạc hơn.
  + ```<fieldset>```: Đóng vai trò là một cái khung bao bọc nhóm thông tin.
  + ```<legend>```: Đóng vai trò là tiêu đề của cái khung đó.
- **Ví dụ cụ thể:** Trong trang Thương mại điện tử, bạn cần tách biệt "Thông tin cá nhân" và "Thông tin thanh toán"
```
<fieldset>
    <legend>Thông tin giao hàng</legend>
    <label for="addr">Địa chỉ:</label>
    <input type="text" id="addr" name="addr">
    
    <label for="city">Thành phố:</label>
    <select id="city" name="city">
        <option value="hn">Hà Nội</option>
    </select>
</fieldset>
```
**3. aria-label sử dụng vào lúc nào? Tại sao không nên dùng khi đã có <label>?**
- aria-label được dùng khi bạn muốn cung cấp thông tin cho trình đọc màn hình nhưng không muốn hiển thị văn bản đó trên giao diện. Trường hợp điển hình: Các nút bấm chỉ có Icon (như nút 🛒 để đặt hàng hoặc nút 🔍 để tìm kiếm). Người thường nhìn icon sẽ hiểu, nhưng trình đọc màn hình cần aria-label="Đặt hàng" để đọc lên cho người khiếm thị.
- Tại sao KHÔNG dùng cùng lúc với ```<label>```? Gây nhiễu thông tin: Nếu có cả hai, trình đọc màn hình có thể bị "lú", đọc lặp lại thông tin hoặc ưu tiên cái này mà bỏ cái kia, gây bối rối cho người dùng.
Nguyên tắc ưu tiên: HTML chuẩn (```<label>```) luôn tốt hơn và ổn định hơn các thuộc tính bổ trợ (aria-). aria-label chỉ là giải pháp "cứu cánh" khi cấu trúc thiết kế không cho phép hiển thị chữ trên màn hình.

## Câu A4 (5đ) — Media
**1. Thuộc tính loading="lazy" trên thẻ ```<img>```**
- Giải thích: Đây là kỹ thuật "tải chậm". Thay vì tải tất cả ảnh trên trang web ngay khi vừa mở (gây nặng máy), trình duyệt sẽ chỉ tải ảnh khi người dùng cuộn trang đến gần vị trí của tấm ảnh đó.
- Cải thiện:
  + Tốc độ tải trang (Page Speed): Giảm dung lượng dữ liệu phải tải ban đầu, giúp trang web hiện ra nhanh hơn.
  + Tiết kiệm băng thông: Cực kỳ hữu ích cho người dùng sử dụng mạng 3G/4G vì họ không phải trả tiền cho những tấm ảnh mà họ chưa kịp cuộn tới để xem.
- Khi nào KHÔNG nên dùng: Không dùng cho những ảnh ở đầu trang (Above the fold) – tức là những ảnh người dùng thấy ngay khi vừa mở web (như Logo hoặc ảnh Banner chính). Nếu dùng lazy-load ở đây, người dùng sẽ thấy một khoảng trắng trước khi ảnh hiện ra, gây trải nghiệm xấu.

**2.Thẻ ```<video>``` và các định dạng**
- Tại sao nên dùng nhiều thẻ ```<source>```? Vì mỗi trình duyệt (Chrome, Safari, Firefox) hỗ trợ các loại tệp khác nhau. Khi bạn cung cấp nhiều nguồn, trình duyệt sẽ tự chọn định dạng tốt nhất mà nó có thể đọc được. Nếu định dạng thứ nhất lỗi, nó sẽ thử đến định dạng thứ hai.
- 3 định dạng video phổ biến:
  + MP4 (.mp4): Phổ biến nhất, tương thích với hầu hết mọi trình duyệt và thiết bị.
  + WebM (.webm): Do Google phát triển, dung lượng nhẹ hơn MP4 nhưng chất lượng vẫn rất tốt, tối ưu cho web.
  + Ogg (.ogv): Định dạng mã nguồn mở, thường dùng làm phương án dự phòng.

**3. Thuộc tính alt (Alternative Text)**
- Công dụng: Hiển thị văn bản thay thế nếu ảnh bị lỗi không tải được và giúp trình đọc màn hình (cho người khiếm thị) mô tả nội dung ảnh. Ngoài ra, nó giúp Google hiểu nội dung ảnh để làm SEO tốt hơn.
- Cách viết alt tốt cho 3 trường hợp:
  + Ảnh sản phẩm iPhone 16: alt="Điện thoại iPhone 16 màu xanh Teal dung lượng 128GB mặt trước và sau" (Càng chi tiết càng tốt cho người mua hàng).
  + Ảnh trang trí (Decorative): alt="" (Để trống). Nếu ảnh chỉ để làm cảnh, không mang nội dung, ta để trống để trình đọc màn hình bỏ qua, tránh làm phiền người dùng.
  + Biểu đồ doanh thu Q1/2026: alt="Biểu đồ cột hiển thị doanh thu tăng trưởng 15% trong Quý 1 năm 2026" (Phải mô tả được thông tin chính mà biểu đồ đang biểu diễn).

 ##  Câu A5 (5đ) — So sánh ```<figure>```với```<img>```
- **Dùng Cách 1 khi** hình ảnh chỉ đóng vai trò là một thành phần phụ trợ hoặc biểu tượng đi kèm với văn bản, không cần chú thích riêng biệt và nếu thiếu nó thì nội dung chính vẫn không bị mất ý nghĩa hoàn toàn. Đặc điểm: Đơn giản, nhanh gọn, thường dùng cho các hình ảnh mang tính nhận diện hoặc trang trí.
  + Ví dụ thực tế 1: Logo công ty trên thanh Header. Logo này chỉ cần thuộc tính alt để định danh, không bao giờ cần dòng chú thích ở dưới.
  + Ví dụ thực tế 2: Icon tính năng (ví dụ: Icon hình chiếc xe tải bên cạnh dòng chữ "Giao hàng miễn phí").
- **Dùng Cách 2 khi** hình ảnh là một đơn vị nội dung độc lập (self-contained). Dòng chú thích (figcaption) giúp bổ sung thông tin quan trọng cho ảnh, và khối này có thể di chuyển đến vị trí khác trong bài viết mà không làm thay đổi ý nghĩa của mạch văn chính. Đặc điểm: Tăng tính ngữ nghĩa (Semantic), giúp trình duyệt và công cụ tìm kiếm hiểu rằng ảnh và chú thích là một thực thể thống nhất.
  + Ví dụ thực tế 1: Ảnh chi tiết sản phẩm trong bài đánh giá (Review). Ví dụ: Ảnh chụp cụm camera của iPhone kèm chú thích "Cận cảnh cảm biến camera chính 48MP".
  + Ví dụ thực tế 2: Biểu đồ hoặc sơ đồ minh họa trong bài tin tức công nghệ. Ví dụ: Sơ đồ cấu trúc chip A18 kèm chú thích "Sơ đồ kiến trúc 6 nhân của chip Apple A18".
 
## PHẦN C — PHÂN TÍCH & SUY LUẬN (20 điểm)
### Câu C1 (10đ) — Dạng gỡ lỗi
- **Lỗi 1:** Dòng 2 — Input "Tên" không có ```<label for="...">``` và thiếu thuộc tính id, vi phạm accessibility.
Sửa: ```<label for="name">```Tên:```</label> <input type="text" id="name" name="name" required>```
- **Lỗi 2:** Dòng 4 — Input "Email" thiếu thẻ ```<label>```, thiếu thuộc tính required và name.
Sửa: ```<label for="email">Email:</label> <input type="email" id="email" name="email" placeholder="Email của bạn" required>```
- **Lỗi 3:** Dòng 6 — Input "Mật khẩu" thiếu thẻ ```<label>``` và thiếu thuộc tính minlength để đảm bảo độ mạnh cơ bản.
Sửa: ```<label for="pw">Mật khẩu:</label> <input type="password" id="pw" name="password" minlength="8" required>```
- **Lỗi 4:** Dòng 7 — Input "Nhập lại mật khẩu" thiếu thẻ <label> và không có định danh để phân biệt với ô mật khẩu chính.
Sửa: ```<label for="re-pw">Nhập lại mật khẩu:</label> <input type="password" id="re-pw" name="re-password" required>```
- **Lỗi 5:** Dòng 9 — Input "Phone" dùng type="text". Nên dùng type="tel" để hỗ trợ bàn phím di động và thêm pattern để xác thực.
Sửa: ```<label for="tel">Phone:</label> <input type="tel" id="tel" name="phone" pattern="[0-9]{10}">```
- **Lỗi 6:** Dòng 11 — Thẻ ```<select>``` thiếu ```<label>``` và thiếu thuộc tính name để gửi dữ liệu lên máy chủ.
Sửa: ```<label for="city">Thành phố:</label> <select id="city" name="city">...</select>```
- **Lỗi 7:** Dòng 16 — Thẻ ```<label>``` bao quanh văn bản nhưng thiếu thẻ ```<input type="checkbox">``` bên trong để người dùng tương tác.
Sửa: ```<label><input type="checkbox" name="agree" required> Tôi đồng ý điều khoản</label>```
- **Lỗi 8:** Dòng 20 — Sử dụng ```<input type="submit">```. Phương pháp hay nhất hiện nay là dùng thẻ <button type="submit"> để dễ dàng tùy biến giao diện và chứa được icon/media.
Sửa: ```<button type="submit">Gửi</button>```
## Câu C2 (10đ) — Xác thực thiết kế chiến lược
**1. Viết Pattern (Regex) cho CMND/CCCD và Số tài khoản**
- CMND/CCCD (Đúng 12 chữ số): pattern="[0-9]{12}" hoặc pattern="\d{12}"
Giải thích: [0-9] giới hạn chỉ nhập số, {12} bắt buộc độ dài chính xác là 12 ký tự.
- Số tài khoản (10-15 chữ số): pattern="[0-9]{10,15}"
Giải thích: {10,15} cho phép độ dài linh hoạt trong khoảng từ 10 đến 15 ký tự.

**2. Xác thực HTML5 có đủ an toàn cho ứng dụng Ngân hàng?**
- Câu trả lời là: KHÔNG.
- Xác thực HTML5 (Frontend) chỉ đóng vai trò hỗ trợ trải nghiệm người dùng (UX). Nó giúp người dùng biết họ nhập sai ngay lập tức mà chưa cần gửi dữ liệu đi. Tuy nhiên, nó cực kỳ dễ bị qua mặt. Một người dùng có kiến thức cơ bản về IT có thể nhấn F12, xóa thuộc tính required hoặc pattern trong mã nguồn, hoặc sử dụng các công cụ như Postman để gửi dữ liệu trực tiếp lên máy chủ mà không cần thông qua trình duyệt.

**3. 3 loại xác thực mà HTML5 KHÔNG THỂ làm được (Cần JavaScript)**
- So sánh các trường dữ liệu: Ví dụ: Kiểm tra "Mật khẩu" và "Nhập lại mật khẩu" có trùng khớp hay không.
- Kiểm tra tính khả dụng theo thời gian thực: Ví dụ: Kiểm tra xem "Tên đăng nhập" đã tồn tại trong cơ sở dữ liệu chưa ngay khi người dùng đang gõ (phải dùng JS kết hợp với AJAX/API).
- Logic xác thực phụ thuộc: Ví dụ: Nếu người dùng chọn quốc gia là "Việt Nam" thì ô "Số điện thoại" phải bắt đầu bằng "+84".

**4. 2 rủi ro bảo mật nếu chỉ xác thực trên Frontend (không có Backend)**
Nếu bạn bỏ qua việc kiểm tra dữ liệu ở phía máy chủ (Backend), ngân hàng sẽ đối mặt với những hiểm họa sau:
- Rủi ro 1: Tấn công tiêm nhiễm dữ liệu (Injected Data/SQL Injection): Kẻ tấn công có thể gửi các đoạn mã độc thay vì con số qua các công cụ can thiệp sâu. Nếu máy chủ không kiểm tra lại và trực tiếp lưu vào database, toàn bộ hệ thống dữ liệu có thể bị xóa hoặc rò rỉ.
- Rủi ro 2: Sai lệch logic nghiệp vụ và dữ liệu rác: Kẻ xấu có thể gửi số tài khoản bằng chữ hoặc số tiền là một số âm. Nếu Backend không chặn lại, hệ thống sẽ thực hiện các giao dịch lỗi, dẫn đến thất thoát tài chính hoặc làm hỏng tính toàn vẹn của dữ liệu khách hàng.

