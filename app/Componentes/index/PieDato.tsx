import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function PieDato(props) {

  return (
    <View>
      <Text>año actual: {props.date} </Text>
    </View>
  )
}

const styles = StyleSheet.create({})