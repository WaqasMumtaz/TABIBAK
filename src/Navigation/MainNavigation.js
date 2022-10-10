import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Screens from '../Screens';
import BottomNavigation from './BottomNavigation';
import { useSelector } from 'react-redux';


const Stack = createNativeStackNavigator();

function Navigation() {
  // const [userData, setUserData] = useState(0);
  const { userData } = useSelector(state => state.persistedReducer.userReducer);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {userData == null ?
        <Stack.Screen name="Auth" component={Screens.Auth} />
        :
        <>
          <Stack.Screen name="Bottom Tabs" component={BottomNavigation} />
          <Stack.Screen name="Detail" component={Screens.DetailsPage} />
          <Stack.Screen name="Profile" component={Screens.Profile}/>
          <Stack.Screen name="Family Members" component={Screens.FamilyMembers}/>
          <Stack.Screen name="DoctorsTile" component={Screens.DoctorsTile}/>
          <Stack.Screen name="DoctorProfile" component={Screens.DoctorProfile}/>
          <Stack.Screen name="Appointment" component={Screens.AppointmentForm}/>

        </>
      }

    </Stack.Navigator>
  )

}

export default Navigation;