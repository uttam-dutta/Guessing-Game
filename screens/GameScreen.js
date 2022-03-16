import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native'
import NumberContainer from '../components/NumberContainer'
import { Card } from '../components/Card'
import DefaultStyle from '../constants/Default-style'
import MainButton from '../components/MainButton'
import { Ionicons } from '@expo/vector-icons'
const generateRandomNumber = (min, max, exclude) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  const rndNum = Math.floor(Math.random() * (max - min)) + min
  if (rndNum === exclude) {
    return generateRandomNumber(min, max, exclude)
  } else {
    return rndNum
  }
}

const renderList = (value, numOfRound) => (
  <View key={value} style={styles.listItems}>
    <Text style={DefaultStyle.bodyText}>#{numOfRound}</Text>
    <Text style={DefaultStyle.bodyText}>{value}</Text>
  </View>
)

const GameScreen = (props) => {
  const intialGuess = generateRandomNumber(1, 100, props.userChoice)
  const [currentGuess, setCurrentGuess] = useState(intialGuess)
  const [pastGuesses, setPastGuesses] = useState([])
  const currentLow = useRef(1)
  const currentMax = useRef(100)
  const { userChoice, onGameOver } = props
  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length)
    }
  }, [currentGuess, userChoice, onGameOver])
  const nextGuessHandler = (direction) => {
    if (
      (direction === 'lower' && currentGuess < userChoice) ||
      (direction === 'higher' && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!!", 'You know this is wrong...', [
        { text: 'Sorry!', style: 'cancel' },
      ])
      return
    }
    if (direction === 'lower') {
      currentMax.current = currentGuess
    } else {
      currentLow.current = currentGuess + 1
    }
    const nextNumber = generateRandomNumber(
      currentLow.current,
      currentMax.current,
      currentGuess
    )
    setCurrentGuess(nextNumber)
    setPastGuesses((prevState) => [nextNumber, ...prevState])
  }
  return (
    <View style={styles.screen}>
      <Text style={DefaultStyle.title}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
          <Ionicons name='md-remove' size={24} color='white' />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, 'higher')}>
          <Ionicons name='md-add' size={24} color='white' />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) =>
            renderList(guess, pastGuesses.length - index)
          )}
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '80%',
  },
  listContainer: {
    width: '80%',
    flex: 1,
  },
  list: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexGrow: 1,
  },
  listItems: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
})
export default GameScreen
