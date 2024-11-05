import { View, Text, StyleSheet, Image } from 'react-native'
import colors from '../../utils/colors'

export default function CategoryItemList({categoryData}) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Item List</Text>
      <View style={{marginTop:15,}}>
        {categoryData?.CategoryItems?.length > 0 ? categoryData?.CategoryItems?.map((item, index)=>(
          <>
          <View key={index} style={styles.itemContainer}>
                <Image source={{ uri: item.Image }} style={styles.image} />
                <View style={{flex:1,marginLeft:10}} >
                  <Text style={styles.name}> {item.name} </Text>
                  <Text style={styles.url}>{item.url}</Text>
                </View>
                <Text style={styles.cost}>$ {item.cost}</Text>
          </View>
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
    fontWeight:'bold',
    fontSize:20,
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
  },
  url:{
    color:colors.GRAY,
  },
  cost:{
    fontSize:16,
    fontWeight:'bold',
    marginLeft:10,
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
})