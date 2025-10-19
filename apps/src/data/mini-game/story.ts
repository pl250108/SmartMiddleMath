export interface Message {
  id: string
  text: string
  isBot: boolean
  options?: string[]
  isCorrect?: boolean
}

export interface Scenario {
  id: string
  category: string
  botMessage: string
  options: string[]
  correctAnswer: number
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
  points: number
}

export const allScenarios: Scenario[] = [
  // Đại số và phương trình
  {
    id: '1',
    category: 'Đại số',
    botMessage: 'Bạn có bài toán: "Một số nhân với 3 rồi cộng 7 thì được 25. Tìm số đó." Bạn sẽ giải như thế nào?',
    options: [
      'Gọi số cần tìm là x, viết phương trình 3x + 7 = 25',
      'Thử các số từ 1 đến 10 cho đến khi đúng',
      'Lấy 25 trừ 7 rồi chia cho 3',
      'Hỏi bạn bè đáp án',
    ],
    correctAnswer: 0,
    explanation:
      'Tuyệt vời! Cách đặt phương trình là phương pháp toán học chính xác nhất để giải bài toán này.',
    difficulty: 'easy',
    points: 10,
  },
  {
    id: '2',
    category: 'Hình học',
    botMessage: 'Bạn cần tính diện tích sân trường hình chữ nhật có chiều dài 50m và chiều rộng 30m. Bạn sẽ làm gì?',
    options: [
      'Dùng thước đo lại toàn bộ sân',
      'Áp dụng công thức: Diện tích = chiều dài × chiều rộng',
      'Hỏi thầy cô đáp án',
      'Ước lượng bằng mắt thường',
    ],
    correctAnswer: 1,
    explanation:
      'Rất tốt! Áp dụng công thức toán học là cách chính xác và nhanh nhất để tính diện tích hình chữ nhật.',
    difficulty: 'medium',
    points: 15,
  },
  {
    id: '3',
    category: 'Số học',
    botMessage: 'Bạn cần tìm ước chung lớn nhất của 24 và 36 để rút gọn phân số. Bạn sẽ làm gì?',
    options: [
      'Liệt kê tất cả ước của cả hai số rồi tìm số lớn nhất chung',
      'Dùng thuật toán Euclid',
      'Thử chia từ số nhỏ đến lớn',
      'Bỏ qua việc rút gọn',
    ],
    correctAnswer: 1,
    explanation: 'Xuất sắc! Thuật toán Euclid là phương pháp hiệu quả nhất để tìm ƯCLN của hai số.',
    difficulty: 'hard',
    points: 20,
  },
  {
    id: '4',
    category: 'Đo lường',
    botMessage: 'Bạn cần đo chiều cao của cây cổ thụ trong sân trường. Bạn sẽ dùng cách nào?',
    options: [
      'Dùng thước dây đo trực tiếp',
      'Dùng bóng của cây và tỷ lệ tam giác đồng dạng',
      'Ước lượng bằng mắt',
      'Hỏi thầy cô',
    ],
    correctAnswer: 1,
    explanation:
      'Thông minh! Sử dụng tỷ lệ tam giác đồng dạng là phương pháp toán học chính xác để đo chiều cao cây.',
    difficulty: 'medium',
    points: 15,
  },
  {
    id: '5',
    category: 'Tỷ lệ',
    botMessage: 'Bạn làm bánh theo công thức: 2 chén bột cần 1 chén đường. Nếu có 6 chén bột, cần bao nhiêu chén đường?',
    options: [
      '3 chén đường',
      '2 chén đường',
      '4 chén đường',
      '6 chén đường',
    ],
    correctAnswer: 0,
    explanation:
      'Chính xác! Tỷ lệ 2:1 nghĩa là 6 chén bột cần 3 chén đường (6÷2 = 3).',
    difficulty: 'easy',
    points: 10,
  },
  {
    id: '6',
    category: 'Hình học',
    botMessage: 'Bạn cần tính chu vi hình tròn có bán kính 7cm. Bạn sẽ dùng công thức nào?',
    options: [
      'C = πr²',
      'C = 2πr',
      'C = πd',
      'C = 4πr',
    ],
    correctAnswer: 1,
    explanation: 'Đúng rồi! Công thức chu vi hình tròn là C = 2πr.',
    difficulty: 'easy',
    points: 10,
  },
  {
    id: '7',
    category: 'Phân số',
    botMessage: 'Bạn có 3/4 cái bánh và muốn chia đều cho 2 bạn. Mỗi bạn sẽ nhận được bao nhiêu phần?',
    options: [
      '3/8 cái bánh',
      '1/2 cái bánh',
      '6/8 cái bánh',
      '3/2 cái bánh',
    ],
    correctAnswer: 0,
    explanation: 'Chính xác! 3/4 ÷ 2 = 3/4 × 1/2 = 3/8.',
    difficulty: 'medium',
    points: 15,
  },
  {
    id: '8',
    category: 'Đại số',
    botMessage: 'Bạn cần giải hệ phương trình: x + y = 10 và x - y = 2. Bạn sẽ làm gì?',
    options: [
      'Cộng hai phương trình để loại bỏ y',
      'Thay x = y + 2 vào phương trình đầu',
      'Thử các giá trị x, y cho đến khi đúng',
      'Hỏi bạn bè',
    ],
    correctAnswer: 0,
    explanation: 'Tuyệt vời! Cộng hai phương trình: (x+y) + (x-y) = 10+2 → 2x = 12 → x = 6, y = 4.',
    difficulty: 'hard',
    points: 20,
  },
  {
    id: '9',
    category: 'Số học',
    botMessage: 'Bạn cần kiểm tra xem 147 có chia hết cho 3 không. Bạn sẽ làm gì?',
    options: [
      'Thử chia 147 cho 3',
      'Tính tổng các chữ số: 1+4+7 = 12, kiểm tra 12 có chia hết cho 3',
      'Dùng máy tính',
      'Ước lượng',
    ],
    correctAnswer: 1,
    explanation: 'Thông minh! Quy tắc chia hết cho 3: tổng các chữ số chia hết cho 3 thì số đó chia hết cho 3.',
    difficulty: 'medium',
    points: 15,
  },
  {
    id: '10',
    category: 'Hình học',
    botMessage: 'Bạn cần tính diện tích tam giác có đáy 8cm và chiều cao 6cm. Công thức nào đúng?',
    options: [
      'S = (đáy × chiều cao) ÷ 2',
      'S = đáy × chiều cao',
      'S = 2 × đáy × chiều cao',
      'S = đáy + chiều cao',
    ],
    correctAnswer: 0,
    explanation: 'Chính xác! Diện tích tam giác = (đáy × chiều cao) ÷ 2.',
    difficulty: 'easy',
    points: 10,
  },
  {
    id: '11',
    category: 'Tỷ lệ phần trăm',
    botMessage: 'Lớp bạn có 30 học sinh, trong đó 60% là nữ. Có bao nhiêu học sinh nam?',
    options: [
      '18 học sinh nam',
      '12 học sinh nam',
      '20 học sinh nam',
      '15 học sinh nam',
    ],
    correctAnswer: 1,
    explanation: 'Đúng! 60% nữ = 18 học sinh nữ → 30 - 18 = 12 học sinh nam.',
    difficulty: 'medium',
    points: 15,
  },
  {
    id: '12',
    category: 'Đại số',
    botMessage: 'Bạn cần giải phương trình bậc hai: x² - 5x + 6 = 0. Bạn sẽ làm gì?',
    options: [
      'Dùng công thức nghiệm',
      'Phân tích thành nhân tử: (x-2)(x-3) = 0',
      'Vẽ đồ thị',
      'Thử các giá trị x',
    ],
    correctAnswer: 1,
    explanation: 'Tuyệt vời! Phân tích thành nhân tử là cách nhanh nhất: (x-2)(x-3) = 0 → x = 2 hoặc x = 3.',
    difficulty: 'hard',
    points: 20,
  },
  {
    id: '13',
    category: 'Số học',
    botMessage: 'Bạn cần tìm số nguyên tố trong các số: 17, 21, 25, 29. Bạn sẽ làm gì?',
    options: [
      'Kiểm tra từng số xem có chia hết cho số nào khác 1 và chính nó',
      'Dùng máy tính',
      'Nhớ thuộc lòng',
      'Hỏi thầy cô',
    ],
    correctAnswer: 0,
    explanation: 'Đúng! Kiểm tra: 17 ✓, 21 = 3×7 ✗, 25 = 5×5 ✗, 29 ✓. Vậy 17 và 29 là số nguyên tố.',
    difficulty: 'medium',
    points: 15,
  },
  {
    id: '14',
    category: 'Hình học',
    botMessage: 'Bạn cần tính thể tích hình hộp chữ nhật có chiều dài 5cm, rộng 3cm, cao 4cm.',
    options: [
      'V = 5 × 3 × 4 = 60 cm³',
      'V = 5 + 3 + 4 = 12 cm³',
      'V = 2 × (5×3 + 3×4 + 4×5) = 94 cm³',
      'V = (5 + 3 + 4) × 2 = 24 cm³',
    ],
    correctAnswer: 0,
    explanation: 'Chính xác! Thể tích hình hộp chữ nhật = chiều dài × chiều rộng × chiều cao.',
    difficulty: 'easy',
    points: 10,
  },
  {
    id: '15',
    category: 'Đại số',
    botMessage: 'Bạn cần rút gọn biểu thức: 2x + 3x - x + 5. Kết quả là gì?',
    options: [
      '4x + 5',
      '6x + 5',
      '5x - 5',
      'x + 5',
    ],
    correctAnswer: 0,
    explanation: 'Đúng! 2x + 3x - x + 5 = (2+3-1)x + 5 = 4x + 5.',
    difficulty: 'easy',
    points: 10,
  },
]