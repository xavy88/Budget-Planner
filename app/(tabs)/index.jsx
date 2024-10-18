import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useEffect } from 'react'
import { Link, useRouter } from 'expo-router'
import services from '../../utils/services'
import { client } from '../../utils/KindeConfig';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    checkUserAuth();
    }, []);

  /**
   * 
   * Use to check user is already auth or not
   */

  const checkUserAuth = async () => {
    const result = await services.getData('login');
    if (result !== 'true') {
      router.replace('/login');
    }
  }

  const handleLogout = async () => {
    const loggedOut = await client.logout();
      if (loggedOut) {
        await services.storeData('login', 'false');
        router.replace('/login');
        // User was logged out
      }
    };

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.text}>Home</Text>
      <Button title='Log Out'
        onPress={handleLogout} />
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
})