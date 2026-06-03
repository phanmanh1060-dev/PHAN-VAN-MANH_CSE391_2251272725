
const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

// --- CÁC BIẾN ĐỂ THỐNG KÊ ---
let countGioi = 0, countKha = 0, countTB = 0, countYeu = 0;

let highestStudent = null;
let lowestStudent = null;

let totalMath = 0, totalPhysics = 0, totalCS = 0;

let totalMaleGPA = 0, countMale = 0;
let totalFemaleGPA = 0, countFemale = 0;


// YÊU CẦU 1 & 2: TÍNH ĐIỂM TB, XẾP LOẠI VÀ IN BẢNG

console.log("| STT | Tên     | TB   | Xếp loại   |");
console.log("|-----|---------|------|------------|");

for (let i = 0; i < students.length; i++) {
    const sv = students[i];

    // 1. Tính điểm trung bình (áp dụng công thức hệ số)
    const gpa = sv.math * 0.4 + sv.physics * 0.3 + sv.cs * 0.3;
    // Làm tròn 1 chữ số thập phân bằng .toFixed(1), ép lại về Number
    const gpaFixed = Number(gpa.toFixed(1)); 

    // 2. Xếp loại học lực & Đếm số lượng mỗi loại
    let xepLoai = "";
    if (gpaFixed >= 8.0) {
        xepLoai = "Giỏi";
        countGioi++;
    } else if (gpaFixed >= 6.5) {
        xepLoai = "Khá";
        countKha++;
    } else if (gpaFixed >= 5.0) {
        xepLoai = "Trung bình";
        countTB++;
    } else {
        xepLoai = "Yếu";
        countYeu++;
    }

    // In dòng kết quả (Sử dụng hàm padEnd để căn lề chữ cho thẳng hàng)
    const stt = String(i + 1).padEnd(3);
    const ten = sv.name.padEnd(7);
    const diem = String(gpaFixed.toFixed(1)).padEnd(4);
    console.log(`| ${stt} | ${ten} | ${diem} | ${xepLoai.padEnd(10)} |`);

    // 3. Tìm SV cao nhất / thấp nhất
    if (highestStudent === null || gpaFixed > highestStudent.gpa) {
        highestStudent = { name: sv.name, gpa: gpaFixed };
    }
    if (lowestStudent === null || gpaFixed < lowestStudent.gpa) {
        lowestStudent = { name: sv.name, gpa: gpaFixed };
    }

    // 4. Cộng dồn điểm để tính TB môn toàn lớp
    totalMath += sv.math;
    totalPhysics += sv.physics;
    totalCS += sv.cs;

    // Bonus: Cộng dồn điểm theo giới tính
    if (sv.gender === "M") {
        totalMaleGPA += gpaFixed;
        countMale++;
    } else if (sv.gender === "F") {
        totalFemaleGPA += gpaFixed;
        countFemale++;
    }
}

console.log("\n------------------------------------------------\n");


// YÊU CẦU 3: ĐẾM SỐ SV MỖI XẾP LOẠI

console.log(" THỐNG KÊ XẾP LOẠI:");
console.log(`- Giỏi:      ${countGioi} SV`);
console.log(`- Khá:       ${countKha} SV`);
console.log(`- Trung bình: ${countTB} SV`);
console.log(`- Yếu:       ${countYeu} SV`);
console.log("\n------------------------------------------------\n");


// YÊU CẦU 4: SV CAO NHẤT VÀ THẤP NHẤT

console.log(" THÀNH TÍCH ĐẶC BIỆT:");
console.log(`- SV có điểm TB cao nhất: ${highestStudent.name} (${highestStudent.gpa.toFixed(1)})`);
console.log(`- SV có điểm TB thấp nhất: ${lowestStudent.name} (${lowestStudent.gpa.toFixed(1)})`);
console.log("\n------------------------------------------------\n");


// YÊU CẦU 5: ĐIỂM TB TOÀN LỚP THEO MÔN

const classAvgMath = totalMath / students.length;
const classAvgPhysics = totalPhysics / students.length;
const classAvgCS = totalCS / students.length;

console.log(" ĐIỂM TRUNG BÌNH MÔN TOÀN LỚP:");
console.log(`- Toán (Math):      ${classAvgMath.toFixed(2)}`);
console.log(`- Vật lý (Physics): ${classAvgPhysics.toFixed(2)}`);
console.log(`- Tin học (CS):     ${classAvgCS.toFixed(2)}`);
console.log("\n------------------------------------------------\n");

// BONUS: ĐIỂM TB THEO GIỚI TÍNH
console.log(" ĐIỂM TRUNG BÌNH THEO GIỚI TÍNH:");
console.log(`- Nam (M): ${countMale > 0 ? (totalMaleGPA / countMale).toFixed(2) : 0}`);
console.log(`- Nữ (F):  ${countFemale > 0 ? (totalFemaleGPA / countFemale).toFixed(2) : 0}`);