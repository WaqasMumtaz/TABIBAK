import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import Components from '../../Components';
import { useTranslation } from 'react-i18next';
import IonicIcons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import Global from '../../Global';

const AppointmentForm = ({ route }) => {
    const { t, i18n } = useTranslation();
    const { doctor_name, doctor_id } = route.params;
    const [appointments, setAppointments] = useState(null);
    const [appointmentData, setAppointmentData] = useState({
        create: false,
        selected_date: '',
        time_slot: ''
    })
    const [openTimeSlots, setOpenTimeSlots] = useState(false);
    const [timeSlots, setTimeSlots] = useState([
        {label: 'Apple', value: 'apple'},
        {label: 'Banana', value: 'banana'}
      ]);

    function handleChange(name, value) {
        setAppointmentData({
            ...appointmentData,
            [name]:value
        })
    }

    function handleChangeDate(date) {
        console.log('Date Selectd >>>>>', date)
    }

    function createAppointment(params) {
        setAppointments({
            ...appointments,
            create: true
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <Components.TopBar title={t('make_appointment')} backIcon={true} />
            {/* <Text>This is Appointment Form</Text> */}
            {(appointmentData.create == false && appointments == null) ?
                <View style={styles.noDataStyle}>
                    {/* <IonicIcons name="calendar-number-outline" color={Global.orange_clr} size={40}/> */}
                    <FontAwesomeIcon name="calendar" color={Global.orange_clr} size={150} />
                    <View style={{ margin: 20 }} />
                    <Components.MyButton
                        title={t('create_appointment')}
                        onClick={createAppointment}
                    />
                </View>
                :
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <View style={styles.formContainer}>
                        <View style={{ margin: 10 }}>
                            <Components.DatePicker
                                mode='date'
                                name={'mm/dd/yyyy'}
                                onChange={handleChangeDate}
                            />
                        </View>
                        <View style={{ margin: 10 }}>
                            <Components.DropDown
                                placeholder="Select time slot"
                                list={timeSlots}
                                onChange={(value) => handleChange('time_slot', value())}
                                value={appointmentData.time_slot}
                                dropDownMaxHeight={150}
                                open={openTimeSlots}
                                style={styles.dropdown_inner_style}
                                setOpen={() => setOpenTimeSlots(openTimeSlots => !openTimeSlots)}
                                listMode="MODAL"
                            />
                        </View>
                    </View>
                </ScrollView>
            }
        </SafeAreaView>
    )
}

export default AppointmentForm

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    noDataStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    formContainer: {
        flex: 1,
        margin: 10
    },
    contentContainer: {
        flexGrow: 1,
        // paddingVertical: 20
    },
    dropdown_inner_style: {
        backgroundColor: Global.inputs_bg,
        borderColor: Global.inputs_bg
      },
})
