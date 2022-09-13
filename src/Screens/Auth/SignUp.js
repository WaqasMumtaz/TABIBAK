import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native'
import Components from '../../Components'
import Global from '../../Global'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useTranslation } from 'react-i18next'


const SignUp = ({ handleState }) => {
    const [authObj, setAuthObj] = useState({
        first_name:'',
        last_name:'',
        email: '',
        phone:'',
        password: '',
        family_key:''
    })

    const [errorObj, setErrorObj] = useState({
        first_name:'',
        last_name:'',
        email: '',
        phone:'',
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
                        placeholder="First Name"
                        name={'first_name'}
                        handleChange={(name, value) => handleChange(name, value)}
                        value={authObj.first_name}
                    />
                    {errorObj.first_name ? <Text style={styles.error}>{errorObj.first_name}</Text> : null}
                    <View style={{ marginBottom: 15 }} />
                    <Components.InputField
                        placeholder="Last Name"
                        name={'last_name'}
                        handleChange={(name, value) => handleChange(name, value)}
                        value={authObj.last_name}
                    />
                    {errorObj.last_name ? <Text style={styles.error}>{errorObj.last_name}</Text> : null}
                    <View style={{ marginBottom: 15 }} />
                    <Components.InputField
                        placeholder="Phone"
                        name={'phone'}
                        handleChange={(name, value) => handleChange(name, value)}
                        value={authObj.phone}
                    />
                    {/* {errorObj.phone ? <Text style={styles.error}>{errorObj.last_name}</Text> : null} */}
                    <View style={{ marginBottom: 15 }} />
                    <Components.InputField
                        placeholder="Email"
                        name={'email'}
                        handleChange={(name, value) => handleChange(name, value)}
                        value={authObj.email}
                        keyboardType={'email-address'}
                    />
                    {errorObj.email ? <Text style={styles.error}>{errorObj.email}</Text> : null}
                    <View style={{ marginBottom: 15 }} />
                    <Components.InputField
                        placeholder="Family key (Optional)"
                        name={'family_key'}
                        handleChange={(name, value) => handleChange(name, value)}
                        value={authObj.family_key}
                    />
                    <View style={{ marginBottom: 15 }} />
                    <Components.InputField
                        placeholder="Password"
                        secureTextEntry={!authObj.showPass}
                        name={'password'}
                        handleChange={(name, value) => handleChange(name, value)}
                        value={authObj.password}
                        onPress={() =>
                            setAuthObj({
                                ...authObj,
                                showPass: !authObj.showPass,
                            })}
                    />
                    {errorObj.password ? (
                        <Text style={styles.error}>{errorObj.password}</Text>
                    ) : (
                        null
                    )}
                    <View style={{ margin: 15 }} />
                    <Components.MyButton
                        title={t('signUp')}
                        onClick={handleLogin}
                    />

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", alignSelf: 'center' }}>
                        <TouchableOpacity style={{}} onPress={()=> handleState(1)}>
                            <Text style={{ color: 'gray' }}>
                                {t('already_registerd')}{' '}
                                <Text style={{ color: Global.buttons_bg, textDecorationLine: 'underline' }}>{t('Login')}</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    error: {
        textAlign: 'center',
        color: 'red',
    },
})
