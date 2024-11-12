import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../utils/colors'
import { useRouter } from 'expo-router'

export default function CategoryList({ categoryList }) {

  const router = useRouter();
   //To navigate to the category details screen
   const onCategoryClick = (category) => {
    router.push({
      pathname: "/category-detail",
      params: {
        categoryId: category.id,
      },
    });
  };

  const calculateTotalCost=( categoryItems )=>{
        let totalCost = 0;
        categoryItems.forEach(item =>{
          totalCost = totalCost + item.cost;
        })

        return totalCost;
  }

  return (
    <View style={styles.container}>
      <Text
        style={styles.textBudget}
      >Latest Budget</Text>
      <View>
      {categoryList.map((category, index) => (
            <TouchableOpacity key={index} style={styles.containerList}
            onPress={()=> onCategoryClick(category)}
            >
              <View style={styles.iconContainer}>
                 <Text  style={[styles.iconText, { backgroundColor: category?.color }]}>{category.icon}</Text>
                 </View>
                 <View style={styles.subContainer}>
                 <View>
                  <Text style={styles.categoryText}>{category.name}</Text>
                  <Text style={styles.itemCount}>{category?.CategoryItems?.length} items</Text>
                 </View>
                 <Text style={styles.totalAmountText} >$ { calculateTotalCost(category?.CategoryItems) }</Text>
                 </View>
            </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        marginTop:20,
      
    },
    textBudget:{
        fontSize:20,
        paddingBottom:10,
        fontFamily: "Outfit-Bold",
        color:colors.PRIMARY,
    },
    iconText:{
      fontSize:35,
      padding:16,
      borderRadius:15
    },
    iconContainer:{
      justifyContent:'center',
      alignItems:'baseline',
    },
    containerList:{
      marginBottom:10,
      display:'flex',
      flexDirection:'row',
      gap:13,
      paddingTop:7,
      alignItems:'center',
      backgroundColor: colors.WHITE,
      padding:10,
      borderRadius:15,
    },
    categoryText:{
      fontSize:20,
      fontFamily: "Outfit-Bold",
      color:colors.PRIMARY,
    },
    itemCount:{
      fontFamily: "Outfit",
      
    },
    subContainer:{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      width:'70%'
    },
    totalAmountText:{
      fontFamily: "Outfit-Bold",
      fontSize:17,
      color:colors.PRIMARY,
    }
})