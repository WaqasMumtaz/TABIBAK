import React from 'react'
import { StyleSheet, Text, View , SafeAreaView} from 'react-native';
import Components from '../../Components';

const DoctorProfile = ({route}) => {
    const { name } = route.params;
    return (
        <SafeAreaView style={styles.container}>
           <Components.TopBar title={name} backIcon={true} />
           <Text>Doctor Profile</Text>
        </SafeAreaView>
    )
}

export default DoctorProfile

const styles = StyleSheet.create({})
