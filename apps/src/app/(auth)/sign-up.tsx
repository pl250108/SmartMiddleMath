import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native'
import { useRouter } from 'expo-router'
import { useAuth } from '@/hooks/useAuth'
import { images } from '@/constants'
import { Ionicons } from '@expo/vector-icons'
import { ERouteTable } from '@/constants/route-table'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// Define validation schema
const schema = yup.object().shape({
  fullName: yup
    .string()
    .required('Vui lòng nhập tên người dùng')
    .min(2, 'Tên người dùng phải có ít nhất 2 ký tự'),
  email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
  password: yup
    .string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .required('Vui lòng nhập mật khẩu'),
})

type FormData = {
  fullName: string
  email: string
  password: string
}

const SignUp = () => {
  const [loading, setLoading] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const { signUpMutation } = useAuth()
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true)
      await signUpMutation.mutateAsync(data)
    } catch (error: any) {
      // Alert.alert('Đăng ký thất bại', error.response?.data?.message || 'Đã xảy ra lỗi')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ImageBackground
      source={images.bgAuth}
      resizeMode="cover"
      className="h-full items-center justify-center"
    >
      <View className="items-center mb-6 -mt-20">
        <Image source={images.logoApp} className="h-[80px] w-[80px]" />
      </View>
      <View className="justify-center p-6 w-11/12 rounded-3xl pt-[114px] pb-12">
        <Text className="text-3xl mb-3 text-center">Đăng ký</Text>
        <Text className="text-sm text-[#64748B] mb-8 text-center">
          Đăng ký tài khoản mới
        </Text>

        {/* Name Input */}
        <Controller
          control={control}
          name="fullName"
          render={({ field: { onChange, value } }) => (
            <View>
              <TextInput
                placeholder="Tên người dùng"
                value={value}
                onChangeText={onChange}
                placeholderTextColor="#94A3B8"
                className="border border-gray-300 rounded-full px-4 py-3 mb-4 text-base"
              />
              {errors.fullName && (
                <Text className="text-red-500 text-sm mb-2">{errors.fullName.message}</Text>
              )}
            </View>
          )}
        />

        {/* Email Input */}
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <View>
              <TextInput
                placeholder="Email"
                value={value}
                onChangeText={onChange}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholderTextColor="#94A3B8"
                className="border border-gray-300 rounded-full px-4 py-3 mb-4 text-base"
              />
              {errors.email && (
                <Text className="text-red-500 text-sm mb-2">{errors.email.message}</Text>
              )}
            </View>
          )}
        />

        {/* Password Input */}
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <View className="relative">
              <TextInput
                placeholderTextColor="#94A3B8"
                className="border border-gray-300 rounded-full px-4 py-3 mb-2 text-base"
                placeholder="Mật khẩu"
                secureTextEntry={!isPasswordVisible}
                value={value}
                onChangeText={onChange}
              />
              <TouchableOpacity
                className="absolute right-5 top-4"
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <Ionicons name={isPasswordVisible ? 'eye' : 'eye-off'} size={20} color="#64748B" />
              </TouchableOpacity>
              {errors.password && (
                <Text className="text-red-500 text-sm mb-2">{errors.password.message}</Text>
              )}
            </View>
          )}
        />

        <Pressable
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
          className={`bg-primary-dark mt-8 h-12 py-3 rounded-full ${loading ? 'opacity-50' : ''}`}
        >
          <Text className="text-white text-center text-base font-semibold">
            {loading ? 'Đăng ký...' : 'Đăng ký'}
          </Text>
        </Pressable>

        <Pressable onPress={() => router.push(ERouteTable.SIGIN_IN)}>
          <Text className="text-center text-sm text-secondary mt-6">
            Bạn đã có tài khoản? <Text className="font-semibold text-primary underline">Đăng nhập</Text>
          </Text>
        </Pressable>
      </View>
    </ImageBackground>
  )
}

export default SignUp
