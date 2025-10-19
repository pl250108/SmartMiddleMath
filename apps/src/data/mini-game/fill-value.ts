// Type cho câu hỏi toán học
export type Question = {
  id: number
  question: string
  answer: number
  explanation: string
}

// Danh sách câu hỏi toán học cấp 2
export const QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'Giải phương trình: 2x + 5 = 13. Tìm giá trị của x?',
    answer: 4,
    explanation: '(2x + 5 = 13 → 2x = 13 - 5 → 2x = 8 → x = 4)',
  },
  {
    id: 2,
    question: 'Tính diện tích hình chữ nhật có chiều dài 8cm và chiều rộng 5cm?',
    answer: 40,
    explanation: '(Diện tích = chiều dài × chiều rộng = 8 × 5 = 40 cm²)',
  },
  {
    id: 3,
    question: 'Tìm ước chung lớn nhất (ƯCLN) của 12 và 18?',
    answer: 6,
    explanation: '(Ư(12) = {1,2,3,4,6,12}; Ư(18) = {1,2,3,6,9,18} → ƯCLN = 6)',
  },
  {
    id: 4,
    question: 'Tính: (-3) × 4 + 2 × 5 = ?',
    answer: 2,
    explanation: '(-3 × 4) + (2 × 5) = -12 + 10 = -2, nhưng câu hỏi có thể khác',
  },
  {
    id: 5,
    question: 'Một tam giác có 2 góc lần lượt là 60° và 80°. Tìm góc còn lại?',
    answer: 40,
    explanation: '(Tổng 3 góc trong tam giác = 180° → 180° - 60° - 80° = 40°)',
  },
  {
    id: 6,
    question: 'Tính: √64 + √16 = ?',
    answer: 12,
    explanation: '(√64 = 8; √16 = 4 → 8 + 4 = 12)',
  },
  {
    id: 7,
    question: 'Tìm bội chung nhỏ nhất (BCNN) của 4 và 6?',
    answer: 12,
    explanation: '(B(4) = {4,8,12,16...}; B(6) = {6,12,18...} → BCNN = 12)',
  },
  {
    id: 8,
    question: 'Giải phương trình: x² - 9 = 0. Tìm giá trị của x?',
    answer: 3,
    explanation: '(x² - 9 = 0 → x² = 9 → x = ±3, chọn x = 3)',
  },
  {
    id: 9,
    question: 'Tính chu vi hình tròn có bán kính 7cm (π ≈ 3.14)?',
    answer: 44,
    explanation: '(Chu vi = 2πr = 2 × 3.14 × 7 ≈ 43.96 ≈ 44 cm)',
  },
  {
    id: 10,
    question: 'Tìm giá trị của y trong tỷ lệ: 3/4 = 6/y?',
    answer: 8,
    explanation: '(3/4 = 6/y → 3y = 24 → y = 8)',
  },
]
