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
    const [selectedAppointment, setSelectedAppointment] = useState(null)
    const [medicineData, setMedicineData] = useState({
        medicine_name: [],
        medicine_type: [],
        medicine_bps: [],
        medicine_dose: [],
        medicine_day: [],
        medicine_comment: []
    })
    const [reportVisible, setReportVisible] = useState({
        modal: false,
        app_id: null
    })

    const { userData } = useSelector(state => state.persistedReducer.userReducer);
    // console.log('Login user data >>>>', userData);

    const medicine_arr = [
        {
            id: 1,
            title: t('medicine_name'),
            detail: medicineData.medicine_name
        },
        {
            id: 2,
            title: t('type'),
            detail: medicineData.medicine_type
        },
        {
            id: 3,
            title: t('mg_mi'),
            detail: medicineData.medicine_bps
        },
        {
            id: 4,
            title: t('dose'),
            detail: medicineData.medicine_dose
        },
        {
            id: 5,
            title: t('day'),
            detail: medicineData.medicine_day
        },
        {
            id: 6,
            title: t('comments'),
            detail: medicineData.medicine_comment

        }

    ]
    const patientInfo = [
        {
            id: 1,
            title: t('name'),
            info: userData?.name
        },
        {
            id: 2,
            title: t('age'),
            info: ''
        },
        {
            id: 3,
            title: t('gender'),
            info: userData?.gender
        },
        {
            id: 4,
            title: t('patient_type'),
            info: selectedAppointment ? selectedAppointment?.type : ''
        },
        {
            id: 5,
            title: t('blood_pressure'),
            info: ''
        }
    ]

    const [authObj, setAuthObj] = useState({
        search: ''
    })

    const childContainer = {
        flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row',
        alignItems: 'center',
        marginVertical: 5
    }

    const headings = [
        'Doctor Name',
        'Date',
        'Time',
        'Status',
        'Prescription',
        'Reports',
    ];

    function handleModal(params) {
        console.log('Selected perscription .>>', params.prescription);
        console.log('prescriptions')
        let names;
        let types;
        let mbs;
        let does;
        let days;
        let comments;
        
        if(params?.prescription?.length > 0){
            for (const iterator of params.prescription) {
                names = JSON.parse(iterator.medicine_name)
                types = JSON.parse(iterator.medicine_type)
                mbs = JSON.parse(iterator.medicine_quantity)
                does = JSON.parse(iterator.medicine_dose)
                days = JSON.parse(iterator.medicine_day)
                comments = JSON.parse(iterator.medicine_comment)
            }
            console.log('Medical Report >.', names, types, mbs, does, days, comments);
            let arr1 = Object.keys(names);
            let arr2 = Object.keys(types);
            let arr3 = Object.keys(mbs);
            let arr4 = Object.keys(does);
            let arr5 = Object.keys(days);
            let arr6 = Object.keys(comments);
            let newArr1 = [];
            let newArr2 = [];
            let newArr3 = [];
            let newArr4 = [];
            let newArr5 = [];
            let newArr6 = [];
            for (const iterator of arr1) {
                newArr1.push(names[iterator])
            }
            for (const iterator of arr2) {
                newArr2.push(types[iterator])
            }
            for (const iterator of arr3) {
                newArr3.push(mbs[iterator])
            }
            for (const iterator of arr4) {
                newArr4.push(does[iterator])
            }
            for (const iterator of arr5) {
                newArr5.push(days[iterator])
            }
            for (const iterator of arr6) {
                newArr6.push(comments[iterator])
            }
    
            // console.log('New Arr1 >>>>', newArr1);
            // console.log('New Arr2 >>>>', newArr2);
            // console.log('New Arr3 >>>>', newArr3);
            // console.log('New Arr4 >>>>', newArr4);
            // console.log('New Arr >>>>', newArr5);
            // console.log('New Arr >>>>', newArr6);
    
            setMedicineData({
                medicine_name: newArr1,
                medicine_type: newArr2,
                medicine_bps: newArr3,
                medicine_dose: newArr4,
                medicine_day: newArr5,
                medicine_comment: newArr6
            })
            setSelectedAppointment(params);
            setModal(true);
        }


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

    function viewReports(params) {
        //console.log('Params >>>', params);
        setReportVisible({
            modal: true,
            app_id: params.id
        })
    }

    const renderItem = ({ item }) => {
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
                            style={item.prescription.length == 0 ? styles.prescriptionBtnDisabled : styles.prescriptionBtn}
                            onPress={() => handleModal(item)}
                            disabled={item.prescription.length == 0 ? true : false}
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
                        <TouchableOpacity
                            style={[styles.prescriptionBtn, { backgroundColor: Global.main_color }]}
                            onPress={() => viewReports(item)}
                        >
                            <Text style={{ color: Global.white }}>{t('view_reports')}</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        )
    }


    const medicineDataRender = (item, i) => {
        // console.log('Detail of items >>>', item.detail)
        return (
            <View key={i} style={{ marginLeft: i != 0 ? 15 : 0 }}>
                <View style={{}} >
                    <Text style={{ fontSize: 15, color: Global.main_color, fontWeight: 'bold' }}>{item.title}</Text>
                </View>
                <View style={{ marginTop: 8, justifyContent: 'center', alignItems: 'center' }}>
                    {/* <Text>hello</Text> */}
                    {/* <View> */}
                    {item?.detail?.map((v, j) => {
                        return (
                            <View key={j} style={{ marginTop: j != 0 ? 7 : 0 }}>
                                <Text>{v}</Text>
                            </View>
                        )
                    })}
                    {/* </View>  */}
                    {/* <View>
                        {medicineData.medicine_type.map((item, i) => {
                            return (
                                <View key={i}>
                                    <Text>{item}</Text>
                                </View>
                            )
                        })}

                    </View>
                    <View>
                        {medicineData.medicine_bps.map((item, i) => {
                            return (
                                <View key={i}>
                                    <Text>{item}</Text>
                                </View>
                            )
                        })}
                    </View>
                    <View>
                        {medicineData.medicine_dose.map((item, i) => {
                            return (
                                <View key={i}>
                                    <Text>{item}</Text>
                                </View>
                            )
                        })}

                    </View>
                    <View>
                        {medicineData.medicine_day.map((item, i) => {
                            return (
                                <View key={i}>
                                    <Text>{item}</Text>
                                </View>
                            )
                        })}

                    </View>
                    <View>
                        {medicineData.medicine_comment.map((item, i) => {
                            return (
                                <View key={i}>
                                    <Text>{item}</Text>
                                </View>
                            )
                        })}

                    </View> */}
                </View>
            </View>
        )
    }

    const patientInfoDataRender = (items, i) => {
        return (
            <View key={i} style={{ marginTop: i != 0 ? 8 : 0 }}>
                <View style={{ flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row', alignItems: 'center' }} >
                    <View style={{ flex: 1, }}>
                        <Text style={{ fontSize: 15, color: Global.main_color, fontWeight: 'bold' }}>{items.title}</Text>
                    </View>
                    <View >
                        {i == 1 ?
                            <Text style={{}}>{selectedAppointment?.prescription[0].patient_age}</Text>
                            : i == 4 ?
                                <Text style={{}}>{selectedAppointment?.prescription[0].patient_bp}</Text>
                                :
                                <Text style={{}}>{items.info}</Text>
                        }
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
                setAppointments(req.data);
                let prescriptions = req.data.prescription;


            }


        } catch (error) {
            console.log('Error >>>>', error);
        }
    }

    async function handleDownload(params) {
        alert('Process pending...')
    }

    async function handleDownloadReport() {
        alert('Process pending...')

    }

    function closeReportModal(params) {
        setReportVisible({
            modal: false,
            app_id: null
        })
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
                {selectedAppointment != null &&
                    <Components.ModalScreen
                        modalVisible={modal}
                        handleModal={closeModal}
                        transparent={true}
                    >
                        {/* <View style={{height: windowHeight - 100, backgroundColor: 'red' }}> */}
                        <View style={{ flex: 1, margin: 8, }}>
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
                            <ScrollView nestedScrollEnabled={true}>
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
                                <View style={{ padding: 12, backgroundColor: Global.main_color, marginTop: 18, borderRadius: 10 }}>
                                    <View style={{ flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row' }}>
                                        <Text style={{ color: Global.white, fontWeight: '700' }}>{`${t('appointment')} ${t('date')} :`} {moment(selectedAppointment.appdate).format("MMM Do YYYY")}, {moment(selectedAppointment.appdate, "YYYY-MM-DD HH:mm:ss").format('dddd').substring(0, 3)}</Text>
                                    </View>
                                    <View style={{ flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row' }}>
                                        <Text style={{ color: Global.white, fontWeight: '700', marginTop: 3 }}>{`Time : ${moment(selectedAppointment?.slot?.start_time, 'hh:mm a').format('hh:mm a')} - ${moment(selectedAppointment?.slot?.end_time, 'hh:mm a').format('hh:mm a')}`}</Text>
                                    </View>
                                </View>
                                {/* Third Row  */}
                                <View style={{ marginTop: 18 }}>
                                    <View style={{ flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row' }}>
                                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{t('medicine')}:</Text>
                                    </View>
                                    <View style={[styles.card, { height: 180 }]}>
                                        <ScrollView
                                            nestedScrollEnabled={true}
                                        >
                                            <ScrollView
                                                nestedScrollEnabled={true}
                                                horizontal={true}
                                                showsHorizontalScrollIndicator={false}>
                                                {medicine_arr.map((v, i) => medicineDataRender(v, i))}
                                            </ScrollView>

                                        </ScrollView>
                                    </View>
                                </View>
                                {/* Fourth Row  */}
                                <View style={{ marginTop: 18 }}>
                                    <View style={{ flex: 1, flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row' }}>
                                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{t('patient_info')}:</Text>
                                    </View>
                                    <View style={[styles.card, { height: 180 }]}>
                                        <ScrollView nestedScrollEnabled={true}>
                                            {patientInfo.map((v, i) => patientInfoDataRender(v, i))}

                                        </ScrollView>
                                    </View>
                                </View>
                                {/* Fifth Row  */}
                                <View style={{ marginTop: 18 }}>
                                    <View style={{ flex: 1, flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row' }}>
                                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{t('test')}:</Text>
                                    </View>

                                </View>
                                <View style={[styles.card]}>
                                    <View style={{ flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row', alignItems: 'center' }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ fontSize: 13, fontWeight: 'bold' }}>{t('advice')}</Text>
                                        </View>
                                        <View style={{ flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row', alignItems: 'center' }}>
                                            <IonicIcon name="checkmark" color={Global.dark_gray} size={20} />
                                            <Text>{selectedAppointment?.prescription[0]?.advice}</Text>
                                        </View>
                                    </View>
                                </View>
                                {/* Download btn */}

                                {/* <View style={{flex:1}}>
                                <Components.MyButton
                                title='Download'
                                />
                            </View> */}
                            </ScrollView>
                        </View>
                        <View style={{ flex: 0.2 }}>
                            <Components.FABComponent
                                visible={true}
                                // iconDetail={{ name: 'add', color: 'white' }}
                                title={t('download')}
                                color={Global.main_color}
                                placement={isRTL == 'rtl' ? 'left' : 'right'}
                                size='large'
                                onPress={handleDownload}
                                _style={{ borderRadius: 7 }}
                            />
                        </View>
                        {/* </View> */}
                    </Components.ModalScreen>
                }

                <Components.ModalScreen
                    modalVisible={reportVisible.modal}
                    handleModal={closeReportModal}
                    transparent={true}
                >
                    <View style={{ flex: 1, margin: 8 }}>
                        <View style={{ flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row', alignItems: 'center' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: Global.main_color }}>{t('report')}</Text>
                            </View>
                            <TouchableOpacity onPress={() => closeReportModal()}>
                                <IonicIcon name="close-circle" color={Global.main_color} size={28} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>Currently Unavailable Reports...</Text>
                        </View>
                    </View>
                    <View style={{ flex: 0.2 }}>
                        <Components.FABComponent
                            visible={true}
                            // iconDetail={{ name: 'add', color: 'white' }}
                            title={t('download')}
                            color={Global.main_color}
                            placement={isRTL == 'rtl' ? 'left' : 'right'}
                            size='large'
                            onPress={handleDownloadReport}
                            _style={{ borderRadius: 7 }}
                        />
                    </View>
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
    prescriptionBtnDisabled:{
        opacity:0.3,
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