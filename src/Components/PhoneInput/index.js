import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PhoneInput from "react-native-phone-number-input";
import Global from '../../Global';

const PhoneNumberInput = ({
    value,
    name,
    handleChange,
    handleChangeFormatted,
    phoneInput,
    disabled
}) => {

    return (
        <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            // disabled={disabled}
            // disableArrowIcon={disabled}
            defaultCode="DM"
            layout="first"
            onChangeText={(text) => {
                handleChange(name,text);
            }}
            // onChangeFormattedText={(text) => {
            //     // handleChangeFormatted(text);
            //     handleChange(name,text);
            // }}
            onChangeCountry={(value)=> {
                handleChangeFormatted(value)
            }}
            // withDarkTheme
            // withShadow
            // autoFocus
            containerStyle={styles.containerStyle}
            textContainerStyle={styles.textContainerStyle}
            textInputStyle={styles.textInputStyle}
          />
    )
}

export default PhoneNumberInput

const styles = StyleSheet.create({
    containerStyle:{
        backgroundColor: Global.inputs_bg,
        borderRadius:12,
        height:55,
        width:'100%'
    },
    textContainerStyle:{
        backgroundColor:Global.inputs_bg,
        borderBottomRightRadius:12,
        borderTopRightRadius:12,
        height:55,
        alignItems:'center'
    },
    textInputStyle:{
        flex:1,
        height:55,
        backgroundColor:Global.inputs_bg
    }
})
