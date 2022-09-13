import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native'
import Components from '../../Components'
import Global from '../../Global'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useTranslation } from 'react-i18next'


const ForgotPassword = ({ handleState }) => {
    const [authObj, setAuthObj] = useState({
        email: '',
        password: ''
    })

    const [errorObj, setErrorObj] = useState({
        email: '',
        password: ''
    })
    const { t } = useTranslation();


    function handleChange(name, value) {
        console.log('Name >>>>>>', name, 'Value >>>>>>', value);
        setAuthObj({
            ...authObj,
            [name]: value,
        });
    }

    function handleLogin() {
        console.log('User Data ****>>>>>', authObj)
    }
    return (
        <KeyboardAwareScrollView
        style={{ flexGrow: 1, backgroundColor: 'white' }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
        <View style={styles.container}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Components.Logo />
            </View>
            <View style={{ flex: 1, marginHorizontal: 20 }}>
                <View style={{ marginBottom: 15 }} />
                <Components.InputField
                    placeholder="Email"
                    name={'email'}
                    handleChange={(name, value) => handleChange(name, value)}
                    value={authObj.email}
                    keyboardType={'email-address'}
                />
                {errorObj.email ? <Text style={styles.error}>{errorObj.email}</Text> : null}
                
                <View style={{ margin: 15 }} />
                <Components.MyButton
                    title= {t('forgot_password')}
                    onClick={handleLogin}
                />

                <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", alignSelf: 'center' }}>
                    <TouchableOpacity style={{}} onPress={()=> handleState(1)}>
                        <Text style={{ color: 'gray' }}>
                            {t('not_now')}{' '}
                            <Text style={{ color: Global.buttons_bg, textDecorationLine: 'underline' }}>{t('Login')}</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </KeyboardAwareScrollView>
    )
}

export default ForgotPassword

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    error: {
        textAlign: 'center',
        color: 'red',
    },
})
