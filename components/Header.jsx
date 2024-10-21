import { View, StyleSheet, Image, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { client } from '../utils/KindeConfig';
import colors from '../utils/colors';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Header() {
    const [user, setUser] = useState();

    useEffect(() => {
      getUserData();
    }, []);
  
    // This function will get the user data
    const getUserData = async () => {
      const user = await client.getUserDetails();
      setUser(user);
    };
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: user?.picture}} />
      <View style={styles.containercont}>
      <View>
        <Text style={styles.textWel}>Welcome,</Text>
        <Text style={styles.textName}>{user?.given_name}</Text>
        </View>
        <Ionicons name="notifications-circle" size={24} color="white" />
    </View>
    </View>

  )
}

const styles = StyleSheet.create({
    image:{
        width:50,
        height:50,
        borderRadius:99,
    },
    textWel:{
        color:colors.WHITE,
        fontSize:18,
        fontFamily:'Outfit',
    },
    textName:{
        color:colors.WHITE,
        fontSize:22,
        fontWeight:'bold',
        fontFamily:'Outfit',
    },
    container:{
        display:'flex',
        flexDirection:'row',
        gap:12,
        alignItems:'center'
    },
    containercont:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center' ,
        width:'85%',
    }
})