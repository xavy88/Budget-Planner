import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import colors from '../utils/colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Foundation from '@expo/vector-icons/Foundation';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from "../utils/SupabaseConfig";
import { decode } from 'base64-arraybuffer';
import { router, useLocalSearchParams } from 'expo-router';

const placeholder = 'https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png'


export default function AddNewCategoryItem() {
  const [image, setImage] = useState(placeholder);
  const [previewImage, setPrevieImage] = useState(placeholder);
  const { categoryId } = useLocalSearchParams();
  const [name, setName] = useState();
  const [url, setUrl] = useState();
  const [cost, setCost] = useState();
  const [note, setNote] = useState();

  const onImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      // aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    // console.log(result);

    if (!result.canceled) {
      setPrevieImage(result.assets[0].uri);
      setImage(result.assets[0].base64);
    }
  }

  const onClickAdd = async () => {
    const fileName = Date.now() + ".png";
    const { data, error } = await supabase.storage
      .from("Images")
      .upload(fileName, decode(image), {
        contentType: "image/png",
      });


    if (data) {
      const fileUrl =
        "https://narpwpzolhjtofywdgxx.supabase.co/storage/v1/object/public/Images/" +
        fileName;

      console.log('File', fileUrl)

      const { data, error } = await supabase
        .from("CategoryItems")
        .insert([
          {
            name: name,
            cost: cost,
            url: url,
            Image: fileUrl,
            note: note,
            category_id: categoryId
          }
        ])
        .select();
      console.log('data', data, 'error', error);
      ToastAndroid.show("Item Added Successfully", ToastAndroid.SHORT);
      //console.log('File Upload', data, error);

      //navigate to category details screen
      router.replace({
        pathname: "/category-detail",
        params: {
          categoryId: categoryId,
        },

      });
    }
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView style={{ padding: 20, backgroundColor:colors.WHITE }}>
        <TouchableOpacity onPress={() => onImagePick()}>
          <Image
            style={styles.image}
            source={{ uri: previewImage }}

          />
        </TouchableOpacity>
        <View style={styles.textInputContainer}>
          <AntDesign name="tagso" size={24} color={colors.PRIMARY} />
          <TextInput style={styles.input} placeholder='Item Name'
            onChangeText={(value) => setName(value)}
          />
        </View>

        <View style={styles.textInputContainer}>
          <MaterialIcons name="price-change" size={24} color={colors.PRIMARY} />
          <TextInput style={styles.input} placeholder='Cost'
            keyboardType='number-pad'
            onChangeText={(value) => setCost(value)}
          />
        </View>

        <View style={styles.textInputContainer}>
          <AntDesign name="link" size={24} color={colors.PRIMARY} />
          <TextInput style={styles.input} placeholder='URL'
           onChangeText={(value) => setUrl(value)}
          />
        </View>

        <View style={styles.textInputContainer}>
          <Foundation name="clipboard-notes" size={24} color={colors.PRIMARY} />
          <TextInput style={styles.input} placeholder='Notes'
            numberOfLines={3}
            value={note}
            onChangeText={(value) => setNote(value)}
          />
        </View>

        <TouchableOpacity style={styles.button}
          disabled={!name || !cost}
          onPress={() => onClickAdd()}
        >
          <Text style={styles.textButton}>Add</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    backgroundColor: colors.GRAY,
    borderRadius: 15
  },
  textInputContainer: {
    padding: 10,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.PRIMARY,
    borderRadius: 10,
    gap: 10,
    marginTop: 10
  },
  input: {
    fontSize: 17,
    width: '100%',
  },
  button: {
    padding: 14,
    backgroundColor: colors.PRIMARY,
    borderRadius: 99,
    marginTop: 25,
  },
  textButton: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.WHITE,

  },
})
