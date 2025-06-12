import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PieDato from './PieDato'

export default function PiePagina2() {

    const [years, setYears] = React.useState('2025')

  return (
    <View>
      <Text> Copyrigth@2025 </Text>
      <PieDato date={years}/>
    </View>
  )
}

const styles = StyleSheet.create({})