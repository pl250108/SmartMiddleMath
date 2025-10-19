import { Image, Pressable, Text, View } from 'react-native'
import { images } from '@/constants'
import IconCheckActive from '~/assets/icon-svg/IconCheckActive'
import IconCheck from '~/assets/icon-svg/IconCheck'
import IconBigLock from '~/assets/icon-svg/IconBigLock'
import React from 'react'

export interface IDataItemLessonHomeProps {
  thumb: string
  description: string
  title: string
  rank: string
  isCompleted: boolean
  category: {
    id: number
    title: string
  }
  score: {
    score: number
    totalScore: number
  }
  id: number
  isLocked: boolean
  image: string
  isPlaceholder?: boolean
}

interface IItemLessonHomeProps {
  data: IDataItemLessonHomeProps
  onPress: () => void
}

export default function ItemLessonHomeSmall({ data, onPress }: IItemLessonHomeProps) {
  return (
    <Pressable
      style={{ width: 128 }}
      onPress={onPress}
      className={`bg-white mb-3 rounded-2xl ${data.isLocked ? 'opacity-[48%]' : ''}`}
    >
      <View className="flex-col items-center">
        <View>
          <Image
            source={
              data?.image
                ? {
                  uri: data?.image,
                }
                : images.defaultImage
            }
            className="rounded-2xl"
            style={{
              width: 128,
              height: 86,
            }}
          />
          {data.isLocked && (
            <View className="absolute bottom-0 left-0 right-0 top-0 items-center justify-center">
              <IconBigLock />
            </View>
          )}
          <View className="bg-white absolute top-2 right-2 rounded-xl">
            {data.isCompleted ? <IconCheckActive /> : <IconCheck />}
          </View>
        </View>
        <View className="flex-col items-start justify-start w-full px-4 mb-2 mt-2">
          <Text className="text-[#1E293B] font-semibold my-1" numberOfLines={2}>
            {data.title}
          </Text>
        </View>
      </View>
    </Pressable>
  )
}
