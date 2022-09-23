import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import Components from '../../Components'
import translate from 'translate-google-api';
import { useTranslation } from 'react-i18next';
import Global from '../../Global';


const FamilyMembers = () => {
    const phoneInput = useRef(null);
    const [DATA, setDATA] = useState(null);
    const [visible, setVisible] = useState(true);
    const [modal, setModal] = useState(false);

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
        // console.log('Name >>>>>>', name, 'Value >>>>>>', value);
        setAuthObj({
            ...authObj,
            [name]: value,
        });
    }
    function handleChangeFormatted(params) {
        console.log('Phone Number Formatted *****>>>>>>>>>', params);
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
                        <Components.PhoneNumberInput
                            name='phone'
                            handleChange={handleChange}
                            handleChangeFormatted={handleChangeFormatted}
                            phoneInput={phoneInput}
                        />
                        {/* <Components.InputField
                        placeholder="Phone"
                        name={'phone'}
                        handleChange={(name, value) => handleChange(name, value)}
                        value={authObj.phone}
                    /> */}
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
                        <View style={{ margin: 15 }} />
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
    }
})
