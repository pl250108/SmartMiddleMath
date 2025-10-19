import { Image, Text, TouchableOpacity, View } from 'react-native'
import { images } from '@/constants'
import IconSetting from '~/assets/icon-svg/IconSetting'
import { ERouteTable } from '@/constants/route-table'
import { router } from 'expo-router'
import { useSettings } from '@/hooks/useSettings'

export default function HeaderHome() {
  const { userQuery } = useSettings()

  return (
    <View className="relative h-[240px] bg-neutral">
      <View className="absolute mt-20">
        <View className="flex-row justify-between w-full">
          <Image
            source={{
              uri:
                userQuery?.data?.avatar ??
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoExoFiajbHD5Yxg0Bj2T9Wh2WfTRFAsdhSw&s',
            }}
            className="w-[48px] h-[48px] rounded-full"
            resizeMode="cover"
          />
          <TouchableOpacity
            onPress={() => router.push(ERouteTable.SETTING_SCREEN)}
            className="w-[48px] h-[48px] bg-[#64748B14] items-center justify-center rounded-full"
          >
            <IconSetting />
          </TouchableOpacity>
        </View>
        <Text className="text-4xl text-primary text-start font-bold mt-8">
          Bạn muốn <Text className="text-primary-main">Học gì</Text> {'\n'}
          <Text className="text-secondary-main">hôm nay?</Text>
        </Text>
      </View>
    </View>
  )
}
