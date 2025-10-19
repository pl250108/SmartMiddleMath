import { images } from '@/constants'

export const RANK_TIERS = [
  {
    minScore: 0,
    maxScore: 1000,
    rank: images.rank1,
    nextRank: images.rank2,
    nextScore: 1000,
    name: 'HỌC VIÊN',
    nameNext: 'NGƯỜI KHÁM PHÁ',
  },
  {
    minScore: 1001,
    maxScore: 3000,
    rank: images.rank2,
    nextRank: images.rank3,
    nextScore: 3000,
    name: 'NGƯỜI KHÁM PHÁ',
    nameNext: 'CHIẾN BINH TOÁN',
  },
  {
    minScore: 3001,
    maxScore: 5000,
    rank: images.rank3,
    nextRank: images.rank4,
    nextScore: 5000,
    name: 'CHIẾN BINH TOÁN',
    nameNext: 'CAO THỦ',
  },
  {
    minScore: 5001,
    maxScore: 8000,
    rank: images.rank4,
    nextRank: images.rank5,
    nextScore: 8000,
    name: 'CAO THỦ',
    nameNext: 'NHÀ VÔ ĐỊCH',
  },
  {
    minScore: 8001,
    maxScore: 10000,
    rank: images.rank5,
    nextRank: images.rank6,
    nextScore: 10000,
    name: 'NHÀ VÔ ĐỊCH',
    nameNext: 'CHUYÊN GIA TOÁN HỌC',
  },
  {
    minScore: 10001,
    maxScore: 999999,
    rank: images.rank6,
    nextRank: images.rank6,
    nextScore: 999999,
    name: 'CHUYÊN GIA TOÁN HỌC',
    nameNext: 'CHUYÊN GIA TOÁN HỌC',
  },
]


export const listDefaultRank = [
  {
    image: images.rank1,
    name: 'Học Viên',
    description: 'Chặng đường chinh phục mới bắt đầu, hãy cố gắng hết mình.',
    star: '0',
  },
  {
    image: images.rank2,
    name: 'Người Khám Phá',
    description: 'Khám phá hành trình học tập của bạn thật thú vị.',
    star: '1,000',
  },
  {
    image: images.rank3,
    name: 'Chiến Binh Toán',
    description: 'Tinh thần quyết tâm, mỗi ngày một tiến bộ.',
    star: '3,000',
  },
  {
    image: images.rank4,
    name: 'Cao Thủ',
    description: 'Kiến thức vững vàng, bạn là một đối thủ đáng gờm.',
    star: '5,000',
  },
  {
    image: images.rank5,
    name: 'Nhà Vô Địch',
    description: 'Phong độ đỉnh cao, trên đường chinh phục mọi thử thách.',
    star: '8,000',
  },
  {
    image: images.rank6,
    name: 'Chuyên Gia Toán Học',
    description: 'Không bài toán nào làm khó được bạn.',
    star: '10,000',
  },
]
