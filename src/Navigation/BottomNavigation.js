import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Screens from '../Screens';
import Global from '../Global';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next'


const Tab = createBottomTabNavigator();

const Check=()=>(
  <View style={{flex:1, justifyContent:'center'}}><Text>Check</Text></View>
)

const BottomNavigation = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
    screenOptions={({ route })=>({
        headerShown:false,
        tabBarActiveTintColor: Global.main_color,
        tabBarStyle:{height: 60},
        tabBarLabelStyle:{fontSize:12,marginBottom:6},
        
    })}
    >
      <Tab.Screen name={t('home')} component={Screens.Home} 
      options={{
        tabBarIcon: ({ color, size , focused }) => (
          <FontAwesomeIcon size={size} color={color} name='home'/>
       )}}
      />
      <Tab.Screen name={t('appointments')} component={Screens.Appointments} 
      options={{
        tabBarIcon: ({ color, size , focused }) => (
          <FontAwesomeIcon size={size} color={color} name='calendar'/>
       )}}
      />
      <Tab.Screen name={t('booking')} component={Screens.Booking} 
      options={{
        tabBarIcon: ({ color, size , focused }) => (
          <FontAwesomeIcon size={size} color={color} name='check'/>
       )}}
      />
      <Tab.Screen name={t('more')} component={Screens.More} 
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