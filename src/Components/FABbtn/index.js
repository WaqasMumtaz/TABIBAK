import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FAB } from 'react-native-elements';

const FABComponent = ({ visible, iconDetail, color, placement , size, onPress }) => {
    return (
        <FAB
            visible={visible}
            icon={iconDetail}
            color={color}
            placement={placement}
            size={size}
            onPress={()=> onPress()}
        />
    )
}

export default FABComponent

const styles = StyleSheet.create({})
