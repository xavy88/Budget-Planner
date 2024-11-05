import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Fontisto from '@expo/vector-icons/Fontisto';
import colors from '../../utils/colors'

export default function CategoryInfo({ categoryData }) {

    const [totalCost, setTotalCost] = useState();
    const [percentTotal, setPercentTotal] = useState(0);
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
                <Fontisto name="trash" size={24} color="red" />
            </View>
            {/* PROGRESSS BAR */}
            <View style={styles.amountContainer}>
                <Text> ${totalCost} </Text>
                <Text> Total Budget:{categoryData.assigned_budget} </Text>
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
        fontWeight: 'bold',
        fontSize: 24,
    },
    CategoryItemText: {
        fontSize: 16,
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