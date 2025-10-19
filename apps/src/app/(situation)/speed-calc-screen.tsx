import React, { useState, useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, TextInput, Animated, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'
import { ERouteTable } from '@/constants/route-table'
import { LinearGradient } from 'expo-linear-gradient'

const { width } = Dimensions.get('window')

interface Problem {
  question: string
  answer: number
  timeLimit: number
}

const generateProblem = (): Problem => {
  const operations = ['+', '-', '×', '÷']
  const operation = operations[Math.floor(Math.random() * operations.length)]
  
  let num1: number, num2: number, answer: number, question: string

  switch (operation) {
    case '+':
      num1 = Math.floor(Math.random() * 50) + 1
      num2 = Math.floor(Math.random() * 50) + 1
      answer = num1 + num2
      question = `${num1} + ${num2}`
      break
    case '-':
      num1 = Math.floor(Math.random() * 50) + 25
      num2 = Math.floor(Math.random() * 25) + 1
      answer = num1 - num2
      question = `${num1} - ${num2}`
      break
    case '×':
      num1 = Math.floor(Math.random() * 12) + 1
      num2 = Math.floor(Math.random() * 12) + 1
      answer = num1 * num2
      question = `${num1} × ${num2}`
      break
    case '÷':
      answer = Math.floor(Math.random() * 12) + 1
      num2 = Math.floor(Math.random() * 12) + 1
      num1 = answer * num2
      question = `${num1} ÷ ${num2}`
      break
  }

  return {
    question,
    answer,
    timeLimit: 10 // 10 seconds per problem
  }
}

export default function SpeedCalcScreen() {
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [gameActive, setGameActive] = useState(false)
  const [streak, setStreak] = useState(0)
  const [totalProblems, setTotalProblems] = useState(0)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const progressAnim = useRef(new Animated.Value(1)).current
  const shakeAnim = useRef(new Animated.Value(0)).current
  const scoreAnim = useRef(new Animated.Value(1)).current

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
        progressAnim.setValue(timeLeft / currentProblem!.timeLimit)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (gameActive && timeLeft === 0) {
      // Time's up
      handleWrongAnswer()
    }
  }, [gameActive, timeLeft])

  useEffect(() => {
    if (totalProblems >= 10) {
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
    generateNewProblem()
  }

  const generateNewProblem = () => {
    const problem = generateProblem()
    setCurrentProblem(problem)
    setTimeLeft(problem.timeLimit)
    setUserAnswer('')
    progressAnim.setValue(1)
  }

  const handleAnswerSubmit = () => {
    if (!userAnswer.trim() || !currentProblem) return

    const userNum = parseFloat(userAnswer)
    const isCorrect = userNum === currentProblem.answer

    if (isCorrect) {
      handleCorrectAnswer()
    } else {
      handleWrongAnswer()
    }
  }

  const handleCorrectAnswer = () => {
    const points = Math.max(10, 10 + streak * 2)
    setScore(score + points)
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
      generateNewProblem()
    }, 500)
  }

  const handleWrongAnswer = () => {
    setStreak(0)
    setTotalProblems(totalProblems + 1)

    // Shake animation
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start()

    setTimeout(() => {
      generateNewProblem()
    }, 1000)
  }

  const endGame = () => {
    setGameActive(false)
    setShowResult(true)
    setTimeout(() => {
      setGameCompleted(true)
    }, 2000)
  }

  const getProgressColor = () => {
    const progress = timeLeft / (currentProblem?.timeLimit || 10)
    if (progress > 0.5) return '#4CAF50'
    if (progress > 0.2) return '#FF9800'
    return '#F44336'
  }

  return (
    <LinearGradient
      colors={['#FF6B6B', '#4ECDC4']}
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
          <Text className="text-white text-lg font-bold">Tính Toán Nhanh</Text>
          <View className="w-12" />
        </View>

        {!gameActive && !gameCompleted && (
          <View className="flex-1 items-center justify-center px-8">
            <View className="bg-white/20 rounded-3xl p-8 items-center">
              <Text className="text-white text-3xl mb-4">⚡</Text>
              <Text className="text-white text-2xl font-bold mb-4 text-center">
                Thử thách tính toán
              </Text>
              <Text className="text-white text-base text-center mb-8">
                Giải 10 bài toán càng nhanh càng tốt!{'\n'}
                Mỗi câu đúng sẽ tăng điểm combo!
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

        {gameActive && (
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
                <Text className="text-white text-2xl font-bold">{totalProblems}/10</Text>
              </View>
            </View>

            {/* Timer Progress */}
            <View className="px-4 mb-6">
              <View className="bg-white/20 rounded-full h-3">
                <Animated.View
                  style={{
                    height: '100%',
                    width: progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '100%'],
                    }),
                    backgroundColor: getProgressColor(),
                    borderRadius: 15,
                  }}
                />
              </View>
              <Text className="text-white text-center mt-2 font-medium">
                {timeLeft}s
              </Text>
            </View>

            {/* Problem Display */}
            <Animated.View 
              style={{ 
                transform: [{ translateX: shakeAnim }],
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 20
              }}
            >
              <View className="bg-white/20 rounded-3xl p-8 w-full max-w-sm">
                <Text className="text-white text-center text-lg mb-6">
                  Giải bài toán sau:
                </Text>
                <Text className="text-white text-center text-4xl font-bold mb-8">
                  {currentProblem?.question}
                </Text>
                
                <TextInput
                  className="bg-white rounded-xl h-14 px-4 text-center text-2xl font-bold text-purple-600 mb-6"
                  value={userAnswer}
                  onChangeText={setUserAnswer}
                  placeholder="?"
                  keyboardType="numeric"
                  autoFocus
                  onSubmitEditing={handleAnswerSubmit}
                />
                
                <TouchableOpacity
                  onPress={handleAnswerSubmit}
                  className="bg-white rounded-full py-4"
                  disabled={!userAnswer.trim()}
                >
                  <Text className="text-purple-600 font-bold text-lg text-center">
                    Kiểm tra
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
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
                    type: score >= 500 ? 'win' : 'lose',
                    totalScore: score,
                    maxScore: 1000,
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
