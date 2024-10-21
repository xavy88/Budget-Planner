import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useEffect } from 'react'
import { Link, useRouter } from 'expo-router'
import services from '../../utils/services'
import { client } from '../../utils/KindeConfig';
import { supabase } from '../../utils/SupabaseConfig';
import Header from '../../components/Header';
import colors from '../../utils/colors'
import CircularChart from '../../components/CircularChart';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    checkUserAuth();
    getCategoryList();
    }, [])

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

  const getCategoryList = async()=>{
    const user = await client.getUserDetails();
    const {data, error} = await supabase.from('Category')
    .select('*')
    .eq('created_by', user.email)
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
    <View style={{ marginTop: 20, padding:20, backgroundColor:colors.PRIMARY, height:150 }}>
     <Header />
     <CircularChart />
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
})