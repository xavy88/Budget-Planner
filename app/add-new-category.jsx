import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import colors from '../utils/colors';
import ColorPicker from '../components/ColorPicker';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { supabase } from './../utils/SupabaseConfig'
import { client } from './../utils/KindeConfig'
import { useRouter } from 'expo-router';

export default function AddNewCategory() {

  const [selectedIcon, setSelectedIcon] = useState('Icon');
  const [selectedColor, setSelectedColor] = useState(colors.PRIMARY);
  const [categoryName, setCategoryName] = useState();
  const [totalBudget, setTotalBudget] = useState();

  const router = useRouter();
  const onCreateCategory = async () => {
    const user = await client.getUserDetails();
    const { data, error } = await supabase
    .from("Category")
    .insert([
      {
        name: categoryName,
        assigned_budget: totalBudget,
        icon: selectedIcon,
        color: selectedColor,
        created_by: user.email,
      },
    ])
    .select();

      console.log(data);
      if (data) {
        router.replace({
          pathname:'/category-detail',
          params:{
            categoryId:data[0].id
          }
        })
        ToastAndroid.show("Category Created Successfully", ToastAndroid.SHORT);
      }

  }


  return (
    <View style={{ marginTop: 20, padding: 20 }}>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <TextInput
          style={[styles.iconInput, { backgroundColor: selectedColor }]}
          maxLength={2}
          onChangeText={(value) => setSelectedIcon(value)}
        >
          {selectedIcon}
        </TextInput>
        <ColorPicker
          selectedColor={selectedColor}
          setSelectedColor={(color) => setSelectedColor(color)}
        />
      </View>
      {/* Category Name  and total budget section */}

      <View style={styles.inputView}>
        <Entypo name="price-tag" size={24} color={colors.PRIMARY} />
        <TextInput placeholder='Category Name'
          onChangeText={(v) => setCategoryName(v)}
          style={{ width: '100%', fontSize: 18, }} />
      </View>

      <View style={styles.inputView}>
        <FontAwesome6 name="sack-dollar" size={24} color={colors.PRIMARY} />
        <TextInput placeholder='Total Budget'
          onChangeText={(v) => setTotalBudget(v)}
          keyboardType='numeric'
          style={{ width: '100%', fontSize: 18, }} />
      </View>

      <TouchableOpacity style={styles.button}
        disabled={!categoryName || !totalBudget}
        onPress={()=>onCreateCategory()}
      >
        <Text style={styles.textTotal}>Create</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  iconInput: {
    textAlign: 'center',
    fontSize: 30,
    padding: 20,
    borderRadius: 99,
    paddingHorizontal: 28,
    color: colors.WHITE,
  },
  inputView: {
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    padding: 14,
    borderRadius: 10,
    borderColor: colors.GRAY,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: colors.PRIMARY,
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
  },
  textTotal: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.WHITE,
  }
})