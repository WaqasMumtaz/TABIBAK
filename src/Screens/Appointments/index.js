import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList, useWindowDimensions } from 'react-native'
import Components from '../../Components'
import Global from '../../Global';
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native';

const Appointments = () => {
    const navigation = useNavigation();
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir();

    const [authObj, setAuthObj] = useState({
        search: ''
    })

    const { height, width } = useWindowDimensions();

    function handleChange(name, value) {
        console.log('Name >>>>>>', name, 'Value >>>>>>', value);
        setAuthObj({
            ...authObj,
            [name]: value,
        });
    }

    function handleSubmit(title) {
        console.log('Title >>>', title)
        if (title === 'Favourite') {
            alert('Added successfully...')
        }
        else if (title === 'Delete') {
            alert('Your process is pending...')
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Components.TopBar title={t('appointments')} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Appointments</Text>
            </View>
        </SafeAreaView>
    )
}

export default Appointments

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:Global.white
    },
})