import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { supabase } from '../utils/SupabaseConfig';
import Feather from '@expo/vector-icons/Feather';
import CourseInfo from '../components/CourseDetail/CourseInfo';
import CourseItemList from '../components/CourseDetail/CourseItemList';


export default function CategoryDetails() {

  const { categoryId } = useLocalSearchParams();
  const [categoryData, setCategoryData] = useState([]);
  const router = useRouter();
  useEffect(() => {
    console.log(categoryId);
    categoryId && getCategoryDetail();
  }, [categoryId]);

  const getCategoryDetail = async () => {
    const { data, error } = await supabase.from('Category')
      .select('*,CategoryItems(*)')
      .eq('id', categoryId)
    setCategoryData(data[0]);
  }

  return (
    <View style={{ padding: 20, marginTop: 20 }}>
      <TouchableOpacity onPress={() =>router.back()}>
      <Feather name="arrow-left-circle" size={44} color="black" />
      </TouchableOpacity>
     <CourseInfo categoryData={categoryData} />
     <CourseItemList  categoryData={categoryData} />
    </View>
  )
}

