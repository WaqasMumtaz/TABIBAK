import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import Components from '../../Components'
import translate from 'translate-google-api';
import { useTranslation } from 'react-i18next';
import Global from '../../Global';
import { hasMixed, hasNumber, hasSpecial, hasValidLength } from '../../Global/password';


const FamilyMembers = () => {
    let phoneInput = useRef(null);
    const [DATA, setDATA] = useState(null);
    const [visible, setVisible] = useState(true);
    const [modal, setModal] = useState(false);
    const [loader, setLoader] = useState(false);

    const { t, i18n } = useTranslation();


    const [authObj, setAuthObj] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        family_key: ''
    })

    const [errorObj, setErrorObj] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: ''
    })


    const isRTL = i18n.dir();

    function userOperation(params) {
        console.log('Params >>>', params);
    }

    function handleModal() {
        setModal(modal => !modal)
    }

    function handleChange(name, value) {
        console.log('Name >>>>>>', name, 'Value >>>>>>', value);
        setAuthObj({
            ...authObj,
            [name]: value,
        });
    }
    function handleChangeFormatted(params) {
        console.log('Get Country *****>>>>>>>>>', params);
    }

    async function fetchFamilyMembers(params) {
        let data = [];
        const res = [{
            value: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
            label: 'Ahmed',

        }, {
            value: "58694a0f-3da1-471f-bd96-145571e29d72",
            label: 'Zain',

        }, {
            value: "68694a0f-3da1-431f-bd56-142371e29d72",
            label: 'Qureshi'
        }, {
            value: "28694a0f-3da1-471f-bd96-142456e29d72",
            label: 'Naeem'
        },
        {
            value: "28694a0f-3da1-471f-bd96-142456e29d73",
            label: 'Nabi',
        }
        ]
        if (isRTL === 'rtl') {
            for (const iterator of res) {
                const result = await translate(`${iterator.label}`, {
                    tld: "cn",
                    to: "ar",
                });
                let obj = {
                    ...iterator,
                    label: result[0]
                }
                data.push(obj);
            }
            // console.log('After Change lang name >>>>', data);
            setDATA(data);
        }
        else {
            setDATA(res);
        }

    }

    function handleSave() {
        // console.log('User Data ****>>>>>', authObj)
        let { email, password, first_name, last_name, phone, family_key } = authObj;
        let errors = {};
        // console.log(phoneInput.current?.isValidNumber(phone), 'PHONE');
        //   return
        if (Global.email_validation.test(email.replace(' ', '')) === false) {
            errors.email = 'Please enter a valid email.';
        }
        console.log('Password Error >>', hasValidLength(password));
        if (!hasValidLength(password)) {
            errors.password = "Your password must have 8 or more characters"
        }
        // else {
        //     errors.password = ''
        // }
        if (!hasMixed(password)) {
            errors.password = "Your password must have upper & lowercase letters"

        }
        if (!hasNumber(password)) {
            errors.password = "Your password must have at least one number"

        }
        if (!hasSpecial(password)) {
            errors.password = "Your password must have at least one special character"
        }

        if (first_name == '' || !/^[a-zA-Z]+$/.test(first_name)) {
            errors.first_name = 'First Name is required and may only contain letters';

        }
        if (last_name == '' || !/^[a-zA-Z]+$/.test(last_name)) {
            errors.last_name = 'Last Name is required and may only contain letters';

        }
        // console.log(phoneInput.current?.isValidNumber(phone), 'PHONE');
        // if (phoneInput.current?.isValidNumber(phone) == false) {
        //     errors.phone = 'Phone number is not valid';

        // }
        console.log('Errors Details >>>>', errors);
        setErrorObj(errors);
        if (Object.keys(errors).length === 0) {
            setLoader(true)
            // setTimeout(()=>{
            //     setLoader(false);
            //     dispatch(updateUser(authObj));
            // },2000)
        }
    }

    function handleClear() {
        //alert('Clear form')
        // phoneInput = null;
        setAuthObj({
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            password: '',
            family_key: '',
        })
        setErrorObj({
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            password: ''
        })
        setLoader(false);
    }


    useEffect(() => {
        fetchFamilyMembers();
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Components.TopBar title={t('users')} backIcon={true} />
            <Components.MembersList
                data={DATA}
                userOperation={userOperation}
                listStyle={{ flexDirection: isRTL === 'rtl' ? 'row-reverse' : 'row' }}
            />
            <Components.FABComponent
                visible={visible}
                iconDetail={{ name: 'add', color: 'white' }}
                color={Global.main_color}
                placement='right'
                size='large'
                onPress={handleModal}
            />
            <Components.ModalScreen
                modalVisible={modal}
                title={t('add_member')}
                handleModal={handleModal}
            >
                <ScrollView keyboardShouldPersistTaps='always'>
                    <View style={{ flex: 1, marginHorizontal: 20 }}>
                        <View style={{ marginBottom: 15 }} />
                        <Components.InputField
                            placeholder="First Name"
                            name={'first_name'}
                            handleChange={(name, value) => handleChange(name, value)}
                            value={authObj.first_name}
                        />
                        {errorObj.first_name ? <Text style={styles.error}>{t('first_name')}</Text> : null}
                        <View style={{ marginBottom: 15 }} />
                        <Components.InputField
                            placeholder="Last Name"
                            name={'last_name'}
                            handleChange={(name, value) => handleChange(name, value)}
                            value={authObj.last_name}
                        />
                        {errorObj.last_name ? <Text style={styles.error}>{t('last_name')}</Text> : null}
                        <View style={{ marginBottom: 15 }} />
                        {/* <Components.PhoneNumberInput
                            name='phone'
                            value={authObj.phone}
                            handleChange={handleChange}
                            handleChangeFormatted={handleChangeFormatted}
                            phoneInput={phoneInput}
                        /> */}
                        <Components.InputField
                            placeholder="Phone"
                            name={'phone'}
                            handleChange={(name, value) => handleChange(name, value)}
                            value={authObj.phone}
                            keyboardType='phone-pad'
                        />
                        {errorObj.phone ? <Text style={styles.error}>{t('phone_validation')}</Text> : null}
                        <View style={{ marginBottom: 15 }} />
                        <Components.InputField
                            placeholder="Email"
                            name={'email'}
                            handleChange={(name, value) => handleChange(name, value)}
                            value={authObj.email}
                            keyboardType={'email-address'}
                        />
                        {errorObj.email ? <Text style={styles.error}>{t('email_validation')}</Text> : null}
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
                            <Text style={styles.error}>{t('password_validation')}</Text>
                        ) : (
                            null
                        )}
                        <View style={{ margin: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ margin: 10 }}>
                                <Components.MyButton
                                    title={t('add')}
                                    styleBtn={{ width: 120 }}
                                    loader={loader}
                                    onClick={handleSave}
                                />
                            </View>
                            <View style={{ margin: 10 }}>
                                <Components.MyButton
                                    title={t('clear')}
                                    styleBtn={{ width: 120, backgroundColor: Global.inputs_bg }}
                                    titleStyle={{ color: 'black' }}
                                    onClick={handleClear}
                                />

                            </View>
                        </View>
                    </View>
                </ScrollView>
            </Components.ModalScreen>
        </SafeAreaView>
    )
}

export default FamilyMembers

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    error: {
        textAlign: 'center',
        color: 'red',
    }
})
