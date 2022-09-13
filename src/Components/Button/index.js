import { StyleSheet, Text, View , TouchableOpacity, ActivityIndicator} from 'react-native'
import React from 'react'
import Global from '../../Global'

const MyButton = ({title , onClick , styleBtn, titleStyle, loader}) => {
 
    const btnStyle = {
        //borderWidth:2,
       // borderColor:Global.main_color,
        borderRadius:12,
        backgroundColor:Global.buttons_bg,
        padding:10,
        height:50,
        paddingHorizontal:20,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    }
    const _titleStyle = {
        fontWeight:'bold',
        color:Global.white
      }

  return (
    <TouchableOpacity 
    onPress={()=> onClick()}
    style={{...btnStyle, ...styleBtn}}
    >
      {loader && (
        <View style={{marginRight:8}}>
          <ActivityIndicator color={Global.white} size='small'/>
        </View>
      )}
      <Text style={{..._titleStyle, ...titleStyle}}>{title.toUpperCase()}</Text>
    </TouchableOpacity>
  )
}

export default MyButton

const styles = StyleSheet.create({
   btn:{
     justifyContent:'center',
     
   }
})