import React from 'react'
import { StyleSheet, Text, View, StatusBar, useColorScheme, } from 'react-native'
import Global from '../../Global';

export default function MyStatusBar() {
    const isDarkMode = useColorScheme() === 'dark';
    const statusBarStyle = {
        backgroundColor: Global.main_color,
    }
    return (
        <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={statusBarStyle.backgroundColor}
        />
    )
}


