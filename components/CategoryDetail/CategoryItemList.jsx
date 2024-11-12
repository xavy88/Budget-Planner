import { View, Text, StyleSheet, Image, TouchableOpacity, ToastAndroid, Linking } from 'react-native'
import colors from '../../utils/colors'
import { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { supabase } from '../../utils/SupabaseConfig';

export default function CategoryItemList({categoryData, setUpdateRecord}) {

  const [expandItem, setExpandItem] = useState();

  const onDeleteItem = async (id) => {
    const {error} = await supabase
    .from('CategoryItems')
    .delete()
    .eq('id', id);

    ToastAndroid.show('Item Deleted!', ToastAndroid.SHORT);

    setUpdateRecord(true);
  }

   const openURL = (url) =>{
    if (url) {
      Linking.openURL(url);
    }
   }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Item List</Text>
      <View style={{marginTop:15,}}>
        {categoryData?.CategoryItems?.length > 0 ? categoryData?.CategoryItems?.map((item, index)=>(
          <>
          <TouchableOpacity style={styles.itemContainer}
            onPress={()=>setExpandItem(index)}
          >
                <Image source={{ uri: item.Image }} style={styles.image} />
                <View style={{flex:1,marginLeft:10}} >
                  <Text style={styles.name}> {item.name} </Text>
                  <Text style={styles.url} numberOfLines={2} >{item.url}</Text>
                </View>
                <Text style={styles.cost}>$ {item.cost}</Text>
          </TouchableOpacity>
          {expandItem==index&&
            <View style={styles.actionItemContainer}>
              <TouchableOpacity onPress={() => onDeleteItem( item.id )}>
              <Ionicons name="trash-outline" size={34} color="red" />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>openURL(item.url)}>
              <FontAwesome6 name="link" size={34} color="blue" />
              </TouchableOpacity>
            </View>
          }
          {index !== categoryData?.CategoryItems?.length - 1 && (
                <View
                  style={styles.separator}
                />
              )}
          </>
        )):
        <Text style={styles.noItemText}>Not Item Found</Text>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    marginTop:20,
  },
  heading:{
    fontSize:20,
    fontFamily:'Outfit-Bold',
  },
  image:{
    width: 90,
    height: 90,
    borderRadius: 15,
    marginVertical: 10,
  },
  itemContainer:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  name:{
    fontSize:20,
    fontFamily:'Outfit-Bold',
    color:colors.PRIMARY,
  },
  url:{
    color:colors.GRAY,
  },
  cost:{
    fontSize:16,
    fontFamily:'Outfit-Bold',
    marginLeft:10,
    color:colors.PRIMARY,
  },
  separator:{
    borderWidth:0.5,
    marginTop:10,
    borderColor:colors.GRAY,
  },
  noItemText: {
    fontFamily: "Outfit-Bold",
    fontSize: 20,
    color: colors.GRAY,
  },
  actionItemContainer:{
    display:'flex',
    flexDirection:'row',
    gap:10,
    justifyContent:'flex-end'
  }
})