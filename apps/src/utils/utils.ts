import { LessonItem } from '@/app/(tabs)/home'

export function getOrderKey(item: LessonItem) {
  const n = Number(item.rank)
  return Number.isFinite(n) ? n : item.id
}

export function sortByLockOrder(items: LessonItem[] = []) {
  return [...items].sort((a, b) => {
    if (a.isLocked !== b.isLocked) return a.isLocked ? 1 : -1 // unlocked trước
    return getOrderKey(a) - getOrderKey(b) // theo rank/id
  })
}
