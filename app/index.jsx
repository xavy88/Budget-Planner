import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

export default function Home() {
  return (
    <View style={{marginTop:20}}>
      <Text style={styles.text}>Home</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text:{
    fontSize:20,
  },
})