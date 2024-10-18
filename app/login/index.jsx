import { View, Text, Image, StyleSheet, TouchableOpacity, Button } from 'react-native'
import React from 'react'
import loginBg from './../../assets/images/loginbg.png'
import colors from './../../utils/colors'
import {client} from './../../utils/KindeConfig'
import services from './../../utils/services'
import { useRouter } from 'expo-router'


const router  = useRouter();
const handleSignIn = async () => {
  const token = await client.login();
  if (token) {
    // User was authenticated
    await services.storeData('login','true');
    router.replace('/');
  }
};



export default function LoginScreen() {
  return (
    <View  style={{
            display:'flex',
            alignItems:'center',}}
    > 
      <Image source={loginBg} 
        style={styles.bgImage}

      />
      <View style={styles.ContainerDetailHome}> 
        <Text style={styles.TextDetailHome}>Personal Budget Planner</Text>
        <Text style={styles.contentDetailHome}>Stay on track with your personal budget app</Text>

        <TouchableOpacity style={styles.button}
          onPress={handleSignIn}
        >
            <Text style={{textAlign:'center', color:colors.PRIMARY}}>Login / Signup</Text>
        </TouchableOpacity>
        <Text style={styles.termcond} >* By Login / Sign Up you'll agree to our tearms and conditions *</Text>
        
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
    bgImage:{
        width:200,
        height:400,
        marginTop:70,
        borderWidth:5,
        borderRadius:20,
        borderColor:colors.BLACK,
    },
    ContainerDetailHome:{
        backgroundColor:colors.PRIMARY,
        width:'100%',
        height:'100%',
        padding:20,
        marginTop:-30,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
    },
    TextDetailHome:{
        fontSize:25,
        fontWeight:'bold',
        textAlign:'center',
        color: colors.WHITE,
    },
    contentDetailHome:{
        fontSize:18,
        textAlign:'center',
        color:colors.WHITE,
        marginTop:20,
    },
    button:{
        backgroundColor:colors.WHITE,
        padding:15,
        paddingHorizontal:5,
        borderRadius:99,
        marginTop:30,
    },
    termcond:{
      fontSize:13,
      color:colors.GRAY,
      marginTop:20,
    }
})