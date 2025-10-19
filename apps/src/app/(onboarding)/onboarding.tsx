import { Text, ImageBackground, TouchableOpacity, View } from 'react-native'
import { images } from '@/constants'
import { ERouteTable } from '@/constants/route-table'
import { router } from 'expo-router'

export default function Onboarding() {
  return (
    <ImageBackground source={images.onboarding2} resizeMode="cover" className="h-full">
      <View className="mt-32 flex-1 px-4">
        <Text className="text-4xl font-semibold text-left">Smart Middle Math {'\n'}Chào mừng bạn 👋</Text>
        <Text className="text-left py-6">
          Sẵn sàng khám phá thế giới toán học {'\n'}cùng chúng tôi chưa?
        </Text>
      </View>
      <View className="flex-row justify-between mb-6 px-4">
        <Text>Ứng dụng học toán dành {'\n'}riêng cho học sinh cấp 2</Text>
        <TouchableOpacity
          className="bg-primary-dark w-max rounded-full px-12 h-14 justify-center"
          onPress={() => router.replace(ERouteTable.SIGIN_IN)}
        >
          <Text className="text-center text-white text-lg font-bold ">Bắt đầu</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}
