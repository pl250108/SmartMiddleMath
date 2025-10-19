import React, { useState, useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, TextInput, Animated, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'
import { ERouteTable } from '@/constants/route-table'
import { LinearGradient } from 'expo-linear-gradient'

interface Sequence {
  id: string
  type: 'arithmetic' | 'geometric' | 'fibonacci' | 'square' | 'prime'
  sequence: number[]
  missingIndex: number
  answer: number
  hint: string
  difficulty: 'easy' | 'medium' | 'hard'
}

const generateSequence = (): Sequence => {
  const types: Array<Sequence['type']> = ['arithmetic', 'geometric', 'fibonacci', 'square', 'prime']
  const type = types[Math.floor(Math.random() * types.length)]
  
  let sequence: number[] = []
  let missingIndex: number
  let answer: number
  let hint: string
  let difficulty: 'easy' | 'medium' | 'hard'

  switch (type) {
    case 'arithmetic':
      const start = Math.floor(Math.random() * 10) + 1
      const diff = Math.floor(Math.random() * 5) + 1
      sequence = Array.from({ length: 6 }, (_, i) => start + i * diff)
      missingIndex = Math.floor(Math.random() * (sequence.length - 2)) + 1 // Not first or last
      answer = sequence[missingIndex]
      hint = `Dãy số cộng với bước nhảy ${diff}`
      difficulty = 'easy'
      break

    case 'geometric':
      const first = Math.floor(Math.random() * 5) + 1
      const ratio = Math.floor(Math.random() * 3) + 2
      sequence = Array.from({ length: 5 }, (_, i) => first * Math.pow(ratio, i))
      missingIndex = Math.floor(Math.random() * (sequence.length - 2)) + 1
      answer = sequence[missingIndex]
      hint = `Dãy số nhân với tỷ lệ ${ratio}`
      difficulty = 'medium'
      break

    case 'fibonacci':
      sequence = [1, 1, 2, 3, 5, 8, 13, 21, 34]
      missingIndex = Math.floor(Math.random() * (sequence.length - 2)) + 1
      answer = sequence[missingIndex]
      hint = 'Dãy Fibonacci: mỗi số = tổng 2 số trước'
      difficulty = 'medium'
      break

    case 'square':
      sequence = Array.from({ length: 6 }, (_, i) => Math.pow(i + 1, 2))
      missingIndex = Math.floor(Math.random() * (sequence.length - 2)) + 1
      answer = sequence[missingIndex]
      hint = 'Dãy số bình phương: 1², 2², 3², ...'
      difficulty = 'hard'
      break

    case 'prime':
      sequence = [2, 3, 5, 7, 11, 13, 17, 19]
      missingIndex = Math.floor(Math.random() * (sequence.length - 2)) + 1
      answer = sequence[missingIndex]
      hint = 'Dãy số nguyên tố'
      difficulty = 'hard'
      break
  }

  return {
    id: Date.now().toString(),
    type,
    sequence,
    missingIndex,
    answer,
    hint,
    difficulty
  }
}

export default function NumberSequenceScreen() {
  const [currentSequence, setCurrentSequence] = useState<Sequence | null>(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [totalProblems, setTotalProblems] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [gameActive, setGameActive] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const scoreAnim = useRef(new Animated.Value(1)).current
  const hintAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (totalProblems >= 5) {
      endGame()
    }
  }, [totalProblems])

  const startGame = () => {
    setGameActive(true)
    setScore(0)
    setStreak(0)
    setTotalProblems(0)
    setGameCompleted(false)
    setShowResult(false)
    generateNewSequence()
  }

  const generateNewSequence = () => {
    const sequence = generateSequence()
    setCurrentSequence(sequence)
    setUserAnswer('')
    setShowHint(false)
    hintAnim.setValue(0)
  }

  const handleAnswerSubmit = () => {
    if (!userAnswer.trim() || !currentSequence) return

    const userNum = parseInt(userAnswer)
    const isCorrect = userNum === currentSequence.answer

    if (isCorrect) {
      handleCorrectAnswer()
    } else {
      handleWrongAnswer()
    }
  }

  const handleCorrectAnswer = () => {
    const points = currentSequence!.difficulty === 'easy' ? 50 : 
                   currentSequence!.difficulty === 'medium' ? 100 : 150
    const bonus = Math.max(0, streak * 10)
    setScore(score + points + bonus)
    setStreak(streak + 1)
    setTotalProblems(totalProblems + 1)

    // Score animation
    Animated.sequence([
      Animated.timing(scoreAnim, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scoreAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start()

    setTimeout(() => {
      generateNewSequence()
    }, 1000)
  }

  const handleWrongAnswer = () => {
    setStreak(0)
    setTotalProblems(totalProblems + 1)

    setTimeout(() => {
      generateNewSequence()
    }, 2000)
  }

  const showHintWithAnimation = () => {
    setShowHint(true)
    Animated.spring(hintAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start()
  }

  const endGame = () => {
    setGameActive(false)
    setShowResult(true)
    setTimeout(() => {
      setGameCompleted(true)
    }, 2000)
  }

  const renderSequence = () => {
    if (!currentSequence) return null

    return (
      <View className="flex-row flex-wrap justify-center items-center mb-6">
        {currentSequence.sequence.map((number, index) => (
          <View key={index} className="mx-2 mb-2">
            {index === currentSequence.missingIndex ? (
              <View className="bg-white/20 rounded-xl w-16 h-16 items-center justify-center border-2 border-white">
                <TextInput
                  className="text-white text-xl font-bold text-center w-full"
                  value={userAnswer}
                  onChangeText={setUserAnswer}
                  placeholder="?"
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  keyboardType="numeric"
                  maxLength={3}
                />
              </View>
            ) : (
              <View className="bg-white/30 rounded-xl w-16 h-16 items-center justify-center">
                <Text className="text-white text-xl font-bold">{number}</Text>
              </View>
            )}
          </View>
        ))}
      </View>
    )
  }

  const getDifficultyColor = () => {
    if (!currentSequence) return '#4CAF50'
    switch (currentSequence.difficulty) {
      case 'easy': return '#4CAF50'
      case 'medium': return '#FF9800'
      case 'hard': return '#F44336'
      default: return '#4CAF50'
    }
  }

  return (
    <LinearGradient
      colors={['#FF9A9E', '#FECFEF', '#FECFEF']}
      className="flex-1"
    >
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between p-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-white/20 h-12 w-12 items-center justify-center rounded-full"
          >
            <AntDesign name="left" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-lg font-bold">Dãy Số Toán Học</Text>
          <View className="w-12" />
        </View>

        {!gameActive && !gameCompleted && (
          <View className="flex-1 items-center justify-center px-8">
            <View className="bg-white/20 rounded-3xl p-8 items-center">
              <Text className="text-white text-4xl mb-4">🔢</Text>
              <Text className="text-white text-2xl font-bold mb-4 text-center">
                Thử thách dãy số
              </Text>
              <Text className="text-white text-base text-center mb-8">
                Tìm quy luật và điền số còn thiếu{'\n'}
                Càng khó càng được nhiều điểm!
              </Text>
              <TouchableOpacity
                onPress={startGame}
                className="bg-white rounded-full py-4 px-8"
              >
                <Text className="text-purple-600 font-bold text-xl">Bắt đầu</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {gameActive && currentSequence && (
          <>
            {/* Score Board */}
            <View className="flex-row justify-around px-4 mb-6">
              <Animated.View 
                style={{ transform: [{ scale: scoreAnim }] }}
                className="bg-white/20 rounded-xl p-3 items-center min-w-[80px]"
              >
                <Text className="text-white text-sm font-medium">Điểm</Text>
                <Text className="text-white text-2xl font-bold">{score}</Text>
              </Animated.View>
              <View className="bg-white/20 rounded-xl p-3 items-center min-w-[80px]">
                <Text className="text-white text-sm font-medium">Combo</Text>
                <Text className="text-white text-2xl font-bold">{streak}</Text>
              </View>
              <View className="bg-white/20 rounded-xl p-3 items-center min-w-[80px]">
                <Text className="text-white text-sm font-medium">Tiến độ</Text>
                <Text className="text-white text-2xl font-bold">{totalProblems}/5</Text>
              </View>
            </View>

            {/* Difficulty Indicator */}
            <View className="items-center mb-4">
              <View 
                className="rounded-full px-4 py-2"
                style={{ backgroundColor: getDifficultyColor() + '40' }}
              >
                <Text className="text-white font-bold text-sm uppercase">
                  {currentSequence.difficulty}
                </Text>
              </View>
            </View>

            {/* Sequence Display */}
            <View className="flex-1 justify-center px-4">
              <View className="bg-white/20 rounded-3xl p-6">
                <Text className="text-white text-center text-lg mb-6">
                  Tìm số còn thiếu trong dãy:
                </Text>
                
                {renderSequence()}

                {/* Hint Section */}
                <Animated.View
                  style={{
                    opacity: hintAnim,
                    transform: [{
                      translateY: hintAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, 0],
                      })
                    }]
                  }}
                  className="mb-6"
                >
                  {showHint && (
                    <View className="bg-white/30 rounded-xl p-4">
                      <Text className="text-white text-center font-medium">
                        💡 Gợi ý: {currentSequence.hint}
                      </Text>
                    </View>
                  )}
                </Animated.View>

                {/* Action Buttons */}
                <View className="flex-row gap-3">
                  <TouchableOpacity
                    onPress={showHintWithAnimation}
                    className="flex-1 bg-white/20 rounded-full py-3"
                    disabled={showHint}
                  >
                    <Text className="text-white font-bold text-center">
                      {showHint ? 'Đã xem gợi ý' : '💡 Gợi ý'}
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    onPress={handleAnswerSubmit}
                    className="flex-1 bg-white rounded-full py-3"
                    disabled={!userAnswer.trim()}
                  >
                    <Text className="text-purple-600 font-bold text-center">
                      Kiểm tra
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>
        )}

        {showResult && !gameCompleted && (
          <View className="flex-1 items-center justify-center px-8">
            <View className="bg-white/20 rounded-3xl p-8 items-center">
              <Text className="text-white text-6xl mb-4">🎉</Text>
              <Text className="text-white text-2xl font-bold mb-4 text-center">
                Hoàn thành!
              </Text>
              <Text className="text-white text-base text-center mb-8">
                Điểm số: {score}{'\n'}
                Combo cao nhất: {streak}
              </Text>
            </View>
          </View>
        )}

        {gameCompleted && (
          <View className="p-4">
            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: ERouteTable.RESULT_SITUATION,
                  params: {
                    type: score >= 400 ? 'win' : 'lose',
                    totalScore: score,
                    maxScore: 750,
                  },
                })
              }}
              className="bg-white/20 rounded-full py-4 items-center mb-3"
            >
              <Text className="text-white font-bold text-lg">Xem kết quả</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={startGame}
              className="bg-white rounded-full py-4 items-center"
            >
              <Text className="text-purple-600 font-bold text-lg">Chơi lại</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  )
}
