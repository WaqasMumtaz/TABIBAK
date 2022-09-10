import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Screens from '../Screens';
import BottomNavigation from './BottomNavigation';


const Stack = createNativeStackNavigator();

function Navigation() {
  const [userData, setUserData] = useState(0);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {userData == 0 ?
        <Stack.Screen name="Auth" component={Screens.Auth} />
        :
        <>
          <Stack.Screen name="Bottom Tabs" component={BottomNavigation} />
          <Stack.Screen name="Detail" component={Screens.DetailsPage} />
        </>
      }

    </Stack.Navigator>
  )

}

export default Navigation;