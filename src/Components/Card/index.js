import * as React from 'react';
import { View , Text, StyleSheet, Image} from 'react-native';
import MyButton from '../Button';
import Global from '../../Global';



const MyCard = ({ data }) => (
  <View style={styles.card} elevation={3} key={data.id}>
    {/* <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} /> */}
    <View>
      <Text style={[styles.textStyle, {fontSize:18}]}>{data.name}</Text>
      <Text style={[styles.textStyle, {fontSize:14}]}>{data.subTitle}</Text>
      <Text style={[styles.textStyle, {fontSize:12}]}>{data.timeStamp}</Text>
    </View>
     <View style={{alignItems:'center'}}>
      <Image source={data.avatarUrl} style={styles.imageStyle}/>
     </View>
    {/* <View style={{flexDirection:'row',justifyContent:'flex-end', margin:10 }}>
       <MyButton
       title={btn_title_1}
       onClick={()=> handleSubmit(btn_title_1)}
       />
       <View style={{margin:10}}/>
        <MyButton
       title={btn_title_2}
       onClick={()=> handleSubmit(btn_title_2)}
       styleBtn={styles.btn_style}
       titleStyle={styles.titleStyle}
       />
    </View> */}
    {/* <Card.Actions>
      <Button onClick>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions> */}
  </View>
);

export default MyCard;

const styles = StyleSheet.create({
  card:{
    margin:8,
    width:'41%',
    borderRadius:10,
    padding:10,
    backgroundColor:Global.inputs_bg,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  btn_style:{
    borderWidth:1,
    borderColor:Global.main_color,
    borderRadius:15,
    backgroundColor:Global.main_color,

  },
  titleStyle:{
    fontWeight:'bold',
    color:Global.white
  },
  imageStyle:{
    resizeMode:'cover',
    height:120, 
    width:120, 
    borderRadius:120/2
  },
  textStyle:{
    marginVertical:5
  }
})