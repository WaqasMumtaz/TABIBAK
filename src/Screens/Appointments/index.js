import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, ScrollView, View, SafeAreaView, FlatList, useWindowDimensions, TouchableOpacity, Dimensions } from 'react-native'
import Components from '../../Components'
import Global from '../../Global';
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux'
import HttpUtilsFile from '../../Services/HttpUtils'
import moment from 'moment';
import IonicIcon from 'react-native-vector-icons/Ionicons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Appointments = () => {
    const navigation = useNavigation();
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir();
    const [appointments, setAppointments] = useState(null);
    const [modal, setModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState({})

    const { userData } = useSelector(state => state.persistedReducer.userReducer);

    const [authObj, setAuthObj] = useState({
        search: ''
    })

    const headings = [
        'Doctor Name',
        'Date',
        'Time',
        'Status',
        'Prescription',
        'Reports',
    ];

    function handleModal(params) {
        console.log('Selected perscription .>>', params);
        setModal(true);
        setSelectedAppointment(params);
    }

    function closeModal() {
        setModal(false);
    }

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

    const renderItem = ({ item }) => {
        const childContainer = {
            flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row',
            alignItems: 'center',
            marginVertical: 5
        }
        return (
            <View style={styles.card}>
                <View style={{ ...childContainer }}>
                    <View style={styles.row1}>
                        <Text style={styles.titleHead}>{t('doctor_name')}</Text>
                    </View>
                    <View>
                        <Text style={{}}>{item?.doctor.user?.name}</Text>
                    </View>
                </View>
                <View style={{ ...childContainer }}>
                    <View style={styles.row1}>
                        <Text style={styles.titleHead}>{t('date')}</Text>
                    </View>
                    <View>
                        <Text style={{}}>{moment(item?.doctor.user?.created_at).format('DD/MM/yyyy')}</Text>
                    </View>
                </View>
                <View style={{ ...childContainer }}>
                    <View style={styles.row1}>
                        <Text style={styles.titleHead}>{t('time')}</Text>
                    </View>
                    <View>
                        <Text style={{}}>{item?.slot?.start_time}</Text>

                    </View>
                </View>
                <View style={{ ...childContainer }}>
                    <View style={styles.row1}>
                        <Text style={styles.titleHead}>{t('status')}</Text>
                    </View>
                    <View>
                        <Text style={[styles.statusStyle, { color: item?.status === "2" ? 'green' : 'red' }]}>{item?.status === "2" ? t('completed') : t('cancelled')}</Text>
                    </View>
                </View>
                <View style={{ ...childContainer }}>
                    <View style={styles.row1}>
                        <Text style={styles.titleHead}>{t('prescription')}</Text>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={styles.prescriptionBtn}
                            onPress={() => handleModal(item)}
                        >
                            <Text style={{ color: Global.main_color }}>{t('view_pres')}</Text>
                        </TouchableOpacity>

                    </View>
                </View>
                <View style={{ ...childContainer }}>
                    <View style={styles.row1}>
                        <Text style={styles.titleHead}>{t('reports')}</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={[styles.prescriptionBtn, { backgroundColor: Global.main_color }]}>
                            <Text style={{ color: Global.white }}>{t('view_reports')}</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        )
    }

    async function fetchAppointments(params) {
        try {
            let params = {
                api_token: userData?.api_token
            };

            let query = Object.keys(params)
                .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                .join('&');
            // console.log('Query >>>', query)
            let req = await HttpUtilsFile.get('appointmentlist?' + query);
            //  console.log('Req of Categories >>', req);
            if (req.data.length == 0) {
                setAppointments([])
            }
            else {
                // alert(req.data.length)
                setAppointments(req.data)
            }


        } catch (error) {
            console.log('Error >>>>', error);
        }
    }

    useEffect(() => {
        fetchAppointments();
    }, [])


    return (
        <SafeAreaView style={styles.container}>
            <Components.TopBar title={t('appointments')} />
            <View style={{ flex: 1 }}>
                {appointments == null ?
                    <Components.Spinner />
                    : appointments?.length == 0 ?
                        <Components.NoRecord />
                        :
                        <FlatList
                            data={appointments}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                        />
                    // <View style={{ flexDirection: 'row', marginTop: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
                    //     {categories.map(item => renderItem(item))}
                    // </View>
                }
                <Components.ModalScreen
                    modalVisible={modal}
                    handleModal={closeModal}
                >
                    {/* <View style={{height: windowHeight - 100, backgroundColor: 'red' }}> */}
                    <ScrollView>
                        <View style={{ flex: 1, margin: 8 }}>
                            <View style={{ flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row', alignItems: 'center' }}>
                                <View style={{ flex: 1 }}>
                                    <View style={{ flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row', alignItems: 'center' }}>
                                        <Text style={{ fontWeight: 'bold' }}>{t('all')} {t('prescription')}</Text>
                                        <Text style={{ fontWeight: 'bold', color: Global.main_color }}>/ {t('view_pres')}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={() => closeModal()}>
                                    <IonicIcon name="close-circle" color={Global.main_color} size={28} />
                                </TouchableOpacity>
                            </View>
                            {/* Second Row  */}
                            <View style={{ marginTop: 18, flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row', justifyContent: 'space-between' }}>
                                <View style={styles.row2child}>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{selectedAppointment?.doctor?.user?.name}</Text>
                                    <Text style={{ fontSize: 12, fontWeight: 'bold', color: Global.dark_gray, marginTop: 5 }}>{selectedAppointment?.doctor?.specialist} Specialist</Text>
                                    <Text style={{ fontSize: 12, color: Global.dark_gray, marginTop: 5 }}>{selectedAppointment?.doctorsService}</Text>
                                </View>
                                <View style={styles.row2child}>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Chamber</Text>
                                    <Text style={{ fontSize: 12, color: Global.dark_gray, marginTop: 5 }}>{selectedAppointment?.doctor?.chamber ? `${selectedAppointment?.doctor?.chamber}` : ''}</Text>
                                </View>
                                <View style={styles.row2child}>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{`Off Day : ${selectedAppointment?.doctor?.offday}`}</Text>
                                    <Text style={{ fontSize: 12, color: Global.dark_gray, marginTop: 5 }}>{`${selectedAppointment?.doctor?.starttime} am - ${selectedAppointment?.doctor?.endtime} pm`}</Text>
                                    <Text style={{ fontSize: 12, color: Global.dark_gray, marginTop: 5 }}>{`${selectedAppointment?.doctor?.starttime2} pm - ${selectedAppointment?.doctor?.endtime2} am`}</Text>
                                </View>
                            </View>
                            {/* Second Row  */}
                            <View style={{ padding: 12, backgroundColor: Global.main_color, marginTop: 18, borderRadius:10}}>
                                <View style={{ flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row'}}>
                                    <Text style={{ color: Global.white, fontWeight: '700' }}>{`${t('appointment')} ${t('date')} :`} {moment(selectedAppointment.appdate).format("MMM Do YYYY")}, {moment(selectedAppointment.appdate, "YYYY-MM-DD HH:mm:ss").format('dddd').substring(0, 3)}</Text>
                                </View>
                                <View style={{ flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row'}}>
                                    <Text style={{ color: Global.white, fontWeight: '700', marginTop:3}}>{`Time : ${moment(selectedAppointment?.slot?.start_time, 'hh:mm a').format('hh:mm a')}`}</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    {/* </View> */}
                </Components.ModalScreen>
            </View>
        </SafeAreaView>
    )
}

export default Appointments

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Global.white
    },
    card: {
        margin: 10,
        borderRadius: 3,
        padding: 15,
        //flex: 1,
        // elevation: 3,
        backgroundColor: Global.inputs_bg,
        overflow: 'hidden',
        borderWidth: 0.3,
        borderRadius: 8,
        borderColor: Global.inputs_bg,
    },
    prescriptionBtn: {
        paddingHorizontal: 10,
        padding: 6,
        backgroundColor: Global.white,
        // margin: 5,
        width: 140,
        alignItems: 'center'
    },
    childContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleHead: {
        fontWeight: 'bold',
        fontSize: 15,
        color: Global.main_color
    },
    row1: {
        flex: 1,
    },
    statusStyle: {
        fontWeight: 'bold'
    },
    row2child: {
        width: '33%',
        //marginTop:20
    }
})