import { View, Text, TouchableOpacity, TextInput, FlatList, Image, ScrollView } from 'react-native'
import { router } from 'expo-router'
import HeaderHome from '@/components/HeaderHome'
import { useEffect, useMemo, useState } from 'react'
import ItemLessonHome from '@/components/ItemLessonHome'
import { ERouteTable } from '@/constants/route-table'
import { useHome } from '@/hooks/useHome'
import { useIsFocused } from '@react-navigation/native'
import { useQueryClient } from '@tanstack/react-query'
import { ArrowRight2, SearchNormal1 } from 'iconsax-react-native'
import { images } from '@/constants'
import TitleComponent from '@/components/TitleComponent'
import ItemLessonHomeBig from '@/components/ItemLessonHomeBig'
import ItemLessonHomeSmall from '@/components/ItemLessonHomeSmall'
import { useToast } from '@/components/ToastNotify/ToastContext'
import { sortByLockOrder } from '@/utils/utils'

export type LessonItem = {
  thumb: string
  description: string
  title: string
  rank: string
  isCompleted: boolean
  category: { id: number; title: string }
  score: { score: number; totalScore: number }
  id: number
  isLocked: boolean
  image: string
  isPlaceholder?: boolean
}

function toEvenArrayWithPlaceholder(data: LessonItem[] = []): LessonItem[] {
  const cleaned = [...data]
  if (cleaned.length % 2 !== 0) {
    cleaned.push({
      id: -1,
      thumb: '',
      description: '',
      title: '',
      rank: '',
      isCompleted: false,
      category: { id: 0, title: '' },
      score: { score: 0, totalScore: 0 },
      isLocked: false,
      image: '',
      isPlaceholder: true,
    })
  }
  return cleaned
}

const randomBackGround = ['#FF98003D', '#00BCD43D', '#F443363D', '#21C45D3D']

function getRandomItems(data: LessonItem[] | undefined, count = 3): LessonItem[] {
  const sorted = sortByLockOrder(data)
  const picked = [...sorted].sort(() => Math.random() - 0.5).slice(0, count)
  return sortByLockOrder(picked)
}

// Loading Skeleton Components
const CategorySkeleton = () => (
  <View className="bg-gray-200 rounded-xl mr-2 h-12 w-24 animate-pulse" />
)

const LessonSkeleton = () => (
  <View className="bg-gray-200 rounded-xl h-48 w-full mb-4 animate-pulse" />
)

const LessonSmallSkeleton = () => (
  <View className="bg-gray-200 rounded-xl h-32 w-48 mr-4 animate-pulse" />
)

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<number | null>(null)
  const [search, setSearch] = useState('')

  const { categoriesQuery, learningItemsQuery } = useHome(activeTab ?? undefined)
  const isFocused = useIsFocused()
  const queryClient = useQueryClient()
  const { showToast } = useToast()

  useEffect(() => {
    if (isFocused) {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    }
  }, [isFocused])

  useEffect(() => {
    if (categoriesQuery.data && categoriesQuery.data.length > 0 && !activeTab) {
      setActiveTab(categoriesQuery.data[0].id)
    }
  }, [categoriesQuery.data])

  const data = useMemo(
    () => toEvenArrayWithPlaceholder(learningItemsQuery?.data?.slice(0, 4) || []),
    [learningItemsQuery?.data],
  )

  const dataPopular = useMemo(
    () => getRandomItems(learningItemsQuery?.data, 3) || [],
    [learningItemsQuery?.data],
  )

  const dataSuggest = useMemo(
    () => getRandomItems(learningItemsQuery?.data, 4) || [],
    [learningItemsQuery?.data],
  )

  const renderLesson = ({ item }: { item: LessonItem }) =>
    item.isPlaceholder ? (
      <View style={{ flex: 1 }} />
    ) : (
      <ItemLessonHome
        data={item}
        onPress={() =>
          router.push({
            pathname: ERouteTable.DETAIL_LESSON,
            params: {
              coursesId: item.id,
              score: item?.score?.score || 0,
              totalScore: item?.score?.totalScore || 100,
            },
          })
        }
      />
    )

  const renderItemLessonSmall = ({ item }: { item: LessonItem }) => (
    <ItemLessonHomeSmall
      data={item}
      onPress={() => {
        if (item.isLocked) {
          showToast('Vui lòng hoàn thành khoá học trước đó!', 'error')
        } else {
          router.push({
            pathname: ERouteTable.DETAIL_LESSON,
            params: {
              coursesId: item.id,
              score: item?.score?.score || 0,
              totalScore: item?.score?.totalScore || 100,
            },
          })
        }
      }}
    />
  )

  const renderItemLessonBig = ({ item }: { item: LessonItem }) => (
    <ItemLessonHomeBig
      data={item}
      onPress={() => {
        if (item.isLocked) {
          showToast('Vui lòng hoàn thành khoá học trước đó!', 'error')
        } else {
          router.push({
            pathname: ERouteTable.DETAIL_LESSON,
            params: {
              coursesId: item.id,
              score: item?.score?.score || 0,
              totalScore: item?.score?.totalScore || 100,
            },
          })
        }
      }}
    />
  )

  const keyExtractor = (item: LessonItem, index: number) =>
    item.id !== undefined ? String(item.id) : `lesson-${index}`

  return (
    <View className="bg-neutral flex-1">
      <View className="px-4">
        <HeaderHome />
      </View>

      <ScrollView className="px-4 flex-1" showsVerticalScrollIndicator={false}>
        <View className="relative mt-2">
          <TextInput
            className="w-full p-2 pl-14 h-14 bg-white rounded-2xl"
            placeholder="Tìm kiếm bài học"
            value={search}
            onChangeText={setSearch}
          />
          <View className="absolute top-3.5 left-4">
            <SearchNormal1 size="24" color="#919EAB" />
          </View>
        </View>

        <Text className="text-2xl font-semibold mt-8">Smart Middle Math</Text>
        <View className="mt-4 flex-row relative items-center bg-primary-main justify-between rounded-3xl overflow-hidden">
          <View className="px-5 py-6">
            <Text className="text-2xl font-bold text-white">Học Toán thật {'\n'}Dễ Dàng</Text>
            <TouchableOpacity
              onPress={() => router.push(ERouteTable.PLAY_SITUATION)}
              className="flex-row items-center gap-2 mt-4"
            >
              <Text className="text-white">Khám phá</Text>
              <ArrowRight2 size="16" color="#FFFFFF" variant="Bold" />
            </TouchableOpacity>
          </View>
          <Image source={images.discovery} className="w-40 h-52 absolute bottom-0 right-4" />
        </View>
        <View className="py-2">
          {categoriesQuery.isLoading ? (
            <View className="flex-row" style={{ paddingTop: 16 }}>
              {[1, 2, 3, 4].map((index) => (
                <CategorySkeleton key={index} />
              ))}
            </View>
          ) : (
            <FlatList
              data={categoriesQuery.data || []}
              keyExtractor={(item) => String(item.id)}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingTop: 16 }}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  key={item.id}
                  className={`p-3.5 rounded-xl mr-2 h-12 ${
                    activeTab === item.id ? 'border-primary-main border' : ''
                  }`}
                  style={{ backgroundColor: randomBackGround[index % randomBackGround.length] }}
                  onPress={() => setActiveTab(item.id)}
                >
                  <Text className="text-primary font-medium capitalize">{item.title}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
        <TitleComponent title="Bài học phổ biến" />
        {learningItemsQuery.isLoading ? (
          <View className="flex-row">
            {[1, 2, 3].map((index) => (
              <LessonSkeleton key={index} />
            ))}
          </View>
        ) : (
          <FlatList
            horizontal
            data={dataPopular}
            renderItem={renderItemLessonBig}
            keyExtractor={keyExtractor}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 16 }}
          />
        )}

        <TitleComponent title="Bài học mới" />
        {learningItemsQuery.isLoading ? (
          <View className="flex-row flex-wrap justify-around">
            {[1, 2, 3, 4].map((index) => (
              <View key={index} className="w-[48%] mb-4">
                <LessonSkeleton />
              </View>
            ))}
          </View>
        ) : (
          <FlatList
            data={data}
            renderItem={renderLesson}
            keyExtractor={keyExtractor}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-around' }}
            showsVerticalScrollIndicator={false}
            className="flex-1"
            contentContainerStyle={{ gap: 16 }}
            // (tuỳ chọn) tối ưu hoá
            initialNumToRender={6}
            windowSize={7}
            removeClippedSubviews
            getItemLayout={(_, index) => {
              // nếu ItemLessonHome có chiều cao cố định (ví dụ 250) + margin 16
              const ITEM_HEIGHT = 250
              const VERTICAL_GAP = 16
              return {
                length: ITEM_HEIGHT,
                offset: (ITEM_HEIGHT + VERTICAL_GAP) * Math.floor(index / 2),
                index,
              }
            }}
          />
        )}

        <TitleComponent title="Gần đây" />
        {learningItemsQuery.isLoading ? (
          <View className="flex-row">
            {[1, 2, 3].map((index) => (
              <LessonSmallSkeleton key={index} />
            ))}
          </View>
        ) : (
          <FlatList
            horizontal
            data={learningItemsQuery?.data?.filter((it) => !it.isLocked)}
            renderItem={renderItemLessonSmall}
            keyExtractor={keyExtractor}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 16 }}
          />
        )}

        <TitleComponent title="Gợi ý cho bạn" />
        {learningItemsQuery.isLoading ? (
          <View className="flex-row">
            {[1, 2, 3].map((index) => (
              <LessonSkeleton key={index} />
            ))}
          </View>
        ) : (
          <FlatList
            horizontal
            data={dataSuggest}
            renderItem={renderItemLessonBig}
            keyExtractor={keyExtractor}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 16 }}
          />
        )}
      </ScrollView>
    </View>
  )
}
