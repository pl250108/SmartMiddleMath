import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Alert, Animated } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'
import { ERouteTable } from '@/constants/route-table'
import { LinearGradient } from 'expo-linear-gradient'

interface Card {
  id: number
  value: string
  isFlipped: boolean
  isMatched: boolean
  animation: Animated.Value
}

const mathPairs = [
  { question: '2 + 3', answer: '5' },
  { question: '7 × 4', answer: '28' },
  { question: '15 ÷ 3', answer: '5' },
  { question: '12 - 8', answer: '4' },
  { question: '6²', answer: '36' },
  { question: '√16', answer: '4' },
  { question: '3 × 7', answer: '21' },
  { question: '18 ÷ 2', answer: '9' },
]

export default function MemoryMathScreen() {
  const [cards, setCards] = useState<Card[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matches, setMatches] = useState(0)
  const [moves, setMoves] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)

  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    const gameCards: Card[] = []
    
    // Tạo cặp thẻ từ mathPairs
    mathPairs.forEach((pair, index) => {
      gameCards.push({
        id: index * 2,
        value: pair.question,
        isFlipped: false,
        isMatched: false,
        animation: new Animated.Value(0)
      })
      gameCards.push({
        id: index * 2 + 1,
        value: pair.answer,
        isFlipped: false,
        isMatched: false,
        animation: new Animated.Value(0)
      })
    })

    // Xáo trộn thẻ
    const shuffledCards = gameCards.sort(() => Math.random() - 0.5)
    setCards(shuffledCards)
    setFlippedCards([])
    setMatches(0)
    setMoves(0)
    setGameStarted(true)
    setGameCompleted(false)
  }

  const flipCard = (cardId: number) => {
    if (flippedCards.length >= 2 || cards[cardId].isFlipped || cards[cardId].isMatched) {
      return
    }

    // Animation flip
    Animated.spring(cards[cardId].animation, {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 8
    }).start()

    const newFlippedCards = [...flippedCards, cardId]
    setFlippedCards(newFlippedCards)

    const updatedCards = cards.map(card => 
      card.id === cardId ? { ...card, isFlipped: true } : card
    )
    setCards(updatedCards)

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1)
      checkMatch(newFlippedCards)
    }
  }

  const checkMatch = (flippedCardIds: number[]) => {
    const [firstId, secondId] = flippedCardIds
    const firstCard = cards[firstId]
    const secondCard = cards[secondId]

    // Tìm cặp tương ứng
    const pair = mathPairs.find(p => 
      (firstCard.value === p.question && secondCard.value === p.answer) ||
      (firstCard.value === p.answer && secondCard.value === p.question)
    )

    setTimeout(() => {
      if (pair) {
        // Match found
        setMatches(prev => prev + 1)
        setCards(prevCards => 
          prevCards.map(card => 
            card.id === firstId || card.id === secondId 
              ? { ...card, isMatched: true }
              : card
          )
        )

        if (matches + 1 === mathPairs.length) {
          setGameCompleted(true)
          setTimeout(() => {
            router.push({
              pathname: ERouteTable.RESULT_SITUATION,
              params: {
                type: 'win',
                totalScore: matches + 1,
                maxScore: mathPairs.length,
              },
            })
          }, 1000)
        }
      } else {
        // No match - flip back
        Animated.spring(cards[firstId].animation, {
          toValue: 0,
          useNativeDriver: true,
          tension: 100,
          friction: 8
        }).start()
        Animated.spring(cards[secondId].animation, {
          toValue: 0,
          useNativeDriver: true,
          tension: 100,
          friction: 8
        }).start()

        setCards(prevCards => 
          prevCards.map(card => 
            card.id === firstId || card.id === secondId 
              ? { ...card, isFlipped: false }
              : card
          )
        )
      }
      setFlippedCards([])
    }, 1000)
  }

  const getCardStyle = (card: Card) => {
    const frontInterpolate = card.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    })

    const backInterpolate = card.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['180deg', '360deg'],
    })

    return {
      front: {
        transform: [{ rotateY: frontInterpolate }],
      },
      back: {
        transform: [{ rotateY: backInterpolate }],
      },
    }
  }

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
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
          <Text className="text-white text-lg font-bold">Game Trí Nhớ Toán Học</Text>
          <View className="w-12" />
        </View>

        {/* Score Board */}
        <View className="flex-row justify-around px-4 mb-6">
          <View className="bg-white/20 rounded-xl p-3 items-center min-w-[80px]">
            <Text className="text-white text-sm font-medium">Cặp đã ghép</Text>
            <Text className="text-white text-2xl font-bold">{matches}/{mathPairs.length}</Text>
          </View>
          <View className="bg-white/20 rounded-xl p-3 items-center min-w-[80px]">
            <Text className="text-white text-sm font-medium">Số lượt</Text>
            <Text className="text-white text-2xl font-bold">{moves}</Text>
          </View>
        </View>

        {/* Game Grid */}
        <View className="flex-1 px-4">
          <View className="flex-row flex-wrap justify-between">
            {cards.map((card, index) => {
              const styles = getCardStyle(card)
              return (
                <TouchableOpacity
                  key={card.id}
                  onPress={() => flipCard(index)}
                  className="w-[22%] aspect-square mb-3"
                  disabled={card.isMatched}
                >
                  <View className="flex-1 relative">
                    {/* Front of card */}
                    <Animated.View
                      style={[
                        styles.front,
                        {
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          backfaceVisibility: 'hidden',
                        }
                      ]}
                    >
                      <LinearGradient
                        colors={['#FF6B6B', '#FF8E53']}
                        className="flex-1 rounded-xl items-center justify-center"
                      >
                        <Text className="text-white text-2xl">?</Text>
                      </LinearGradient>
                    </Animated.View>

                    {/* Back of card */}
                    <Animated.View
                      style={[
                        styles.back,
                        {
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          backfaceVisibility: 'hidden',
                        }
                      ]}
                    >
                      <LinearGradient
                        colors={card.isMatched ? ['#4CAF50', '#45a049'] : ['#2196F3', '#1976D2']}
                        className="flex-1 rounded-xl items-center justify-center p-2"
                      >
                        <Text className="text-white text-center font-bold text-sm">
                          {card.value}
                        </Text>
                      </LinearGradient>
                    </Animated.View>
                  </View>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>

        {/* Action Buttons */}
        <View className="p-4">
          <TouchableOpacity
            onPress={initializeGame}
            className="bg-white/20 rounded-full py-4 items-center mb-3"
          >
            <Text className="text-white font-bold text-lg">Chơi lại</Text>
          </TouchableOpacity>
          
          {gameCompleted && (
            <View className="bg-green-500/20 rounded-xl p-4 items-center">
              <Text className="text-white text-lg font-bold mb-2">🎉 Hoàn thành!</Text>
              <Text className="text-white text-center">
                Bạn đã ghép đúng tất cả {mathPairs.length} cặp chỉ với {moves} lượt!
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}
