import React from 'react'
import { View, StyleSheet } from 'react-native'
export const Card = (props) => {
  return (
    //We used spread operator because we will use the card componenet
    //style as well as our own defined style outside of the components
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  )
}

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 6,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
})
