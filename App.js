import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import * as Font from 'expo-font'
import Header from './components/Header'
import StartGame from './screens/StartGame'
import GameScreen from './screens/GameScreen'
import GameOver from './screens/GameOver'
import AppLoading from 'expo-app-loading'
const fetchFont = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })
}
const App = () => {
  const [userNumber, setUserNumber] = useState()
  const [guessRound, setGuessRound] = useState(0)
  const [dataLoaded, setDataLoaded] = useState(false)
  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFont}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    )
  }
  const resetHandler = () => {
    setGuessRound(0)
    setUserNumber(null)
  }
  const startHandler = (selectNumber) => {
    setUserNumber(selectNumber)
  }

  const gameOverHandler = (numberOfRound) => {
    setGuessRound(numberOfRound)
  }
  let content = <StartGame onStart={startHandler} />
  if (userNumber && guessRound <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    )
  } else if (guessRound > 0) {
    content = (
      <GameOver
        userNumber={userNumber}
        noOfGuess={guessRound}
        reset={resetHandler}
      />
    )
  }
  return (
    <View style={styles.screen}>
      <Header title='Guess a Number' />
      {content}
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
})

export default App
