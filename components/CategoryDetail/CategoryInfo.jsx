import { View, Text, StyleSheet, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import Fontisto from '@expo/vector-icons/Fontisto';
import colors from '../../utils/colors'
import { supabase } from './../../utils/SupabaseConfig'
import { useRouter } from 'expo-router';

export default function CategoryInfo({ categoryData }) {

    const [totalCost, setTotalCost] = useState();
    const [percentTotal, setPercentTotal] = useState(0);
    const router = useRouter();

    useEffect(() =>{
        categoryData&&calculateTotalPercentage();
    }, [categoryData])
    //function to calculate total and percentage of all items in a category
  const calculateTotalPercentage = () => {
    let total = 0;
    categoryData?.CategoryItems?.forEach((item) => {
      total = total + item.cost;
    });

    setTotalCost(total);
    let perc = (total/categoryData.assigned_budget) * 100;
    if (perc > 100) {
        perc = 100;
    }
    setPercentTotal(perc);
   }

   const onDeleteCategory=()=>{
    Alert.alert('Are you sure','Do you really want to delete?',[
        {
            text:'Cancel',
            style:'cancel'
        },
        {
            text:'Yes',
            style:'destructive',
            onPress:async()=>{
                const {error} = await supabase
                .from('CategoryItems')
                .delete()
                .eq('category_id', categoryData.id);

                await supabase
                .from ('Category')
                .delete()
                .eq('id', categoryData.id)

                ToastAndroid.show('Category Deleted!', ToastAndroid.SHORT);
                router.replace('/(tabs)');
            }
        }
    ])
   }

    return (
        <View>
            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <Text style={[styles.textIcon, { backgroundColor: categoryData.color }]}>{categoryData.icon}</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 20 }}>
                    <Text style={styles.categoryName}>{categoryData?.name}</Text>
                    <Text style={styles.CategoryItemText}>{categoryData?.CategoryItems?.length} Item</Text>
                </View>
                <TouchableOpacity onPress={() => onDeleteCategory()}>
                <Fontisto name="trash" size={24} color="red" />
                </TouchableOpacity>
            </View>
            {/* PROGRESSS BAR */}
            <View style={styles.amountContainer}>
                <Text style={{fontFamily:'Outfit-Bold'}}> $ {totalCost} </Text>
                <Text style={{fontFamily:'Outfit-Bold'}}> Total Budget: $ {categoryData.assigned_budget} </Text>
            </View>
            <View style={styles.progressBarMainContainer}>
                <View style={[styles.progressBarSubContainer, { width: percentTotal + "%" }]}>

                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textIcon: {
        fontSize: 35,
        padding:20,
        borderRadius: 15
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'baseline',
    },
    categoryName: {
        fontSize: 24,
        fontFamily:'Outfit-Bold',
        color:colors.PRIMARY,
    },
    CategoryItemText: {
        fontSize: 16,
        fontFamily:'Outfit',
    },
    amountContainer:{
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row',
        marginTop:15,
    },
    progressBarMainContainer:{
        width:'100%',
        height:15,
        backgroundColor:colors.GRAY,
        borderRadius:99,
        marginTop:7,
    },
    progressBarSubContainer:{
        width:'40%',
        backgroundColor:colors.PRIMARY,
        borderRadius:99,
        height:15,
    },
})