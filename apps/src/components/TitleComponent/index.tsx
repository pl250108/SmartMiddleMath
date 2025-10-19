import { View, Text } from 'react-native'

interface TitleComponentProps {
  title: string;
}

export default function TitleComponent({ title}: TitleComponentProps) {
  return(
    <View className="my-2">
      <Text className="text-xl font-semibold">{title}</Text>
    </View>
  )
}