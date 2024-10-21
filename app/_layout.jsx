import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { useFonts } from 'expo-font';


export default function HomeLayout() {

  const [loaded, error] = useFonts({
    'Outfit': require('./../assets/fonts/Outfit-Regular.ttf'),
    'Outfit-Medium': require('./../assets/fonts/Outfit-Medium.ttf'),
    'Outfit-Bold': require('./../assets/fonts/Outfit-Bold.ttf'),
  });
  return (
    <Stack 
        screenOptions={{
            headerShown: false,
        }
        }
    >
      <Stack.Screen name='(tabs)'
        options={{
          headerShown:false
        }}
      />
      
      </Stack>
  )
}