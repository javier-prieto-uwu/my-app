import { FontAwesome } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'

export default function Tablayout() {
  return (
    <Tabs screenOptions={{tabBarActiveTintColor:'purple'}}>

        <Tabs.Screen
        name='home'
        options={{
            title:'home',
            tabBarIcon:({color})=> <FontAwesome size={28} name='home' color={color}/>
        }}
        />


        <Tabs.Screen
        name='settings'
        options={{
            title:'Setting',
            tabBarIcon:({color})=> <FontAwesome size={28} name='cog' color={color}/>
        }}
        />


        
        <Tabs.Screen
        name='about'
        options={{
            title:'About',
            tabBarIcon:({color})=> <FontAwesome size={28} name='cog' color={color}/>
        }}
        />


    </Tabs>

    
  )
}