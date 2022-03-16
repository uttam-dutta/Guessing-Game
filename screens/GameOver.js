import React from 'react'
import { View, Text, StyleSheet, Button, Image } from 'react-native'
import DefaultStyle from '../constants/Default-style'
import color from '../constants/color'
import MainButton from '../components/MainButton'
const GameOver = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={DefaultStyle.title}>The Game Is Over.</Text>
      <View style={styles.imageContainer}>
        <Image
          // source={require('../assets/success.png')}
          source={{
            uri: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw5ODAwNzIzfHxlbnwwfHx8fA%3D%3D&w=1000&q=80',
          }}
          style={styles.image}
          resizeMode='cover'
        />
      </View>
      <View style={styles.resultContainer}>
        <Text style={{ ...DefaultStyle.bodyText, ...styles.resultText }}>
          Your phone needed{' '}
          <Text style={styles.highlight}>{props.noOfGuess}</Text> rounds to
          guess <Text style={styles.highlight}>{props.userNumber}</Text>{' '}
          correctly
        </Text>
      </View>
      <MainButton onPress={props.reset}>NEW GAME</MainButton>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 200,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: 30,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  resultText: {
    textAlign: 'center',
    fontSize: 20,
  },
  highlight: {
    color: color.primary,
    fontFamily: 'open-sans-bold',
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: 15,
  },
})
export default GameOver
