import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native'
import Components from '../../Components'
import Global from '../../Global'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import ActionSheet from 'react-native-actionsheet';
import { useSelector, useDispatch } from 'react-redux'
import { changeLanguage }  from '../../Redux/reducersActions/changeLanguage';
import { useTranslation } from 'react-i18next'

const Login = ({ handleState }) => {
    let actionSheet = useRef();
    let dispatch = useDispatch();
    const [authObj, setAuthObj] = useState({
        email: '',
        password: ''
    })

    const {t , i18n} = useTranslation();
  
    const [errorObj, setErrorObj] = useState({
        email: '',
        password: ''
    })

    const { default_language,  userReducer} = useSelector(state => state.persistedReducer);
    console.log('<<<<<****** userData *******>>>>>', userReducer);

    // useSelector(state => console.log('<<<<******* Redux Data ******>>>>>>', state.persistedReducer));

    let optionArray = [
        'English',
        'عربى',
        'Cancel',
    ];

    const openSheet = () => {
        actionSheet.current.show();
    }

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

    async function selectLang(index) {
        console.log('Language index >>>>>>>>>', index);
            dispatch(changeLanguage(index == 0 ? 'English' : 'عربى'))
    }

    useEffect(() => {
        if(default_language === 'عربى'){
            i18n.changeLanguage('ar')
        }
        else if(default_language === 'English'){
            i18n.changeLanguage('en')
        }
       
    }, [default_language])

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
                        title={t('Login')}
                        onClick={handleLogin}
                    />

                    <View style={{ flex: 0.5, justifyContent: 'center', alignItems: "center", alignSelf: 'center' }}>
                        <TouchableOpacity style={{ margin: 15 }} onPress={() => handleState(3)}>
                            <Text style={{ color: Global.buttons_bg, textDecorationLine: 'underline' }}>{t('forgot_password')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}} onPress={() => handleState(2)}>
                            <Text style={{ color: 'gray' }}>
                                {t('not_register')}{' '}
                                <Text style={{ color: Global.buttons_bg, textDecorationLine: 'underline' }}>{t('create_account')}</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end',marginBottom:10 }}>
                <TouchableOpacity style={styles.languageBox} onPress={() => openSheet()}>
                    <Text style={{fontWeight:'bold'}}>{default_language}</Text>
                    <View style={{ marginLeft: 10 }}>
                        <FontIcon name="globe" color={Global.buttons_bg} size={20} />
                    </View>
                </TouchableOpacity>

            </View>
            <ActionSheet
                ref={actionSheet}
                title={'Choose your language ?'}
                options={optionArray}
                cancelButtonIndex={2}
                destructiveButtonIndex={0}
                onPress={(index) =>
                    selectLang(index)
                }
            />
        </KeyboardAwareScrollView>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    error: {
        textAlign: 'center',
        color: 'red',
    },
    languageBox: {
        position: 'absolute',
        zIndex: 0,
        top: -50,
        bottom: 0,
        right: 20,
        height: 40,
        backgroundColor: Global.inputs_bg,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderRadius: 12,
        paddingHorizontal: 10,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 15,
        width:100
    }
})
