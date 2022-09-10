import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Screens from '../Screens';
import Global from '../Global';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const Check=()=>(
  <View style={{flex:1, justifyContent:'center'}}><Text>Check</Text></View>
)

const BottomNavigation = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route })=>({
        headerShown:false,
        tabBarActiveTintColor: Global.main_color,
        tabBarStyle:{height: 60},
        tabBarLabelStyle:{fontSize:12,marginBottom:6},
    })}
    >
      <Tab.Screen name="Home" component={Screens.Home} 
      options={{
        tabBarIcon: ({ color, size , focused }) => (
          <FontAwesomeIcon size={size} color={color} name='home'/>
       )}}
      />
      <Tab.Screen name="List" component={Screens.List} 
      options={{
        tabBarIcon: ({ color, size , focused }) => (
          <FontAwesomeIcon size={size} color={color} name='list'/>
       )}}
      />
      <Tab.Screen name="More" component={Screens.More} 
      
      options={{
        tabBarIcon: ({ color, size , focused }) => (
          <IonicIcon size={size} color={color} name='ellipsis-horizontal-outline'/>
       )}}
      />
    </Tab.Navigator>
  )
}

export default BottomNavigation

const styles = StyleSheet.create({})