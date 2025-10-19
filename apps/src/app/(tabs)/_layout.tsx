import React from 'react'
import { Tabs } from 'expo-router'
import { Gameboy, Home3, MessageNotif, Rank } from 'iconsax-react-native'

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FF6315',
        tabBarInactiveTintColor: '#637381',
        tabBarStyle: {
          borderWidth: 1,
          borderColor: '#E5E7EB',
          height: 80,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderBottomWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 4,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Khám phá',
          tabBarIcon: ({ color }) => (<Home3 size="24" color={color}/>),
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          title: 'Trắc nghiệm',
          tabBarIcon: ({ color }) => (<Gameboy size="24" color={color}/>),
        }}
      />
      <Tabs.Screen
        name="play-situation"
        options={{
          title: 'Trò chơi',
          tabBarIcon: ({ color }) => (<MessageNotif size="24" color={color}/>),
        }}
      />
      <Tabs.Screen
        name="rank"
        options={{
          title: 'Xếp hạng',
          tabBarIcon: ({ color }) => (<Rank size="24" color={color}/>),
        }}
      />
    </Tabs>
  )
}

export default TabsLayout
