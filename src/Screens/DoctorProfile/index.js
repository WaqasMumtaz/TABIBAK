import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Components from '../../Components';
import Global from '../../Global';
import TemplateComponents from '../../Components/TemplateComponents';
import { useNavigation } from '@react-navigation/native';


const DoctorProfile = ({ route }) => {
    const { name ,id , category} = route.params;
    const navigation = useNavigation();

    function openImage() {
        // alert('test')
    }

    function handleNavigate(){
        navigation.navigate('Appointment', {
            doctor_name:name,
            doctor_id:id
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <Components.TopBar title={name} backIcon={true} />
            <View style={{ flex: 1, margin: 15 }}>
                <Components.ProfileContainer
                    onClick={openImage}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                    <View style={{ flex: 1 }}>
                        <TemplateComponents.HeadingText title={name} />
                        <TemplateComponents.BodyText title={category} _style={{ marginVertical: 10 }} />
                    </View>
                    <View>
                        <TemplateComponents.HeadingText title='Fee: $50' _style={{ color: Global.main_color }} />
                    </View>
                </View>
                <View style={{ paddingVertical: 10 }}>
                    <TemplateComponents.HeadingText
                        title='About The Doctor'
                        _style={{ borderBottomWidth: 1, borderBottomColor: Global.dark_gray, lineHeight: 25 }}
                    />
                </View>
                <View style={{ paddingVertical: 10 }}>
                    <TemplateComponents.BodyText
                        title={`It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors.`}
                        _style={{ lineHeight: 25 }}
                    />
                </View>
                <View style={{margin:20}}/>
                <Components.MyButton
                    title='Make Appointment'
                    onClick={handleNavigate}
                />
            </View>
        </SafeAreaView>
    )
}

export default DoctorProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    }
})