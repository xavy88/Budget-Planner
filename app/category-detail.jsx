import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useLocalSearchParams, useRouter } from 'expo-router'
import { supabase } from '../utils/SupabaseConfig';
import Feather from '@expo/vector-icons/Feather';
import CategoryInfo from '../components/CategoryDetail/CategoryInfo';
import CategoryItemList from '../components/CategoryDetail/CategoryItemList';
import Entypo from '@expo/vector-icons/Entypo';
import colors from '../utils/colors';


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
    <View style={{ padding: 20, marginTop: 20, flex: 1, backgroundColor: colors.WHITE }}>
      <ScrollView showsVerticalScrollIndicator ={false}>
        <TouchableOpacity onPress={() => router.replace('/(tabs)')}>
          <Feather name="arrow-left-circle" size={44} color={colors.PRIMARY} />
        </TouchableOpacity>
        <CategoryInfo categoryData={categoryData} />
        <CategoryItemList categoryData={categoryData}
          setUpdateRecord={() => getCategoryDetail()}
        />
      </ScrollView>
      <Link
        href={{
          pathname: '/add-new-category-item',
          params: {
            categoryId: categoryData.id
          }
        }}
        style={styles.floatingBtn}>
        <Entypo name="add-to-list" size={34} color={colors.PRIMARY} />
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  floatingBtn: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
})