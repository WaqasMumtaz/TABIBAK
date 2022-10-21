import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import Components from '../../Components';
import { useTranslation } from 'react-i18next';
import IonicIcons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import Global from '../../Global';
import { RadioButton } from 'react-native-paper';
import moment from 'moment';
import bankImg from '../../Assets/bank.png';
import spotImg from '../../Assets/cod.jpg';
import ImagePicker from 'react-native-image-crop-picker';
import HttpUtilsFile from '../../Services/HttpUtils';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux'


const AppointmentForm = ({ route }) => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir();
    const { doctor_name, doctor_id } = route.params;
    const [appointments, setAppointments] = useState(null);
    const [categories, setCategories] = useState(null);
    const [appointmentData, setAppointmentData] = useState({
        create: false,
        selected_date: '',
        time_slot: '',
        follow: '',
        selected_follow_up: '',
        comment: '',
        payment: '',
        bank_name: '',
        bank_account_name: '',
        bank_account_number: '',
        deposited_by: '',
        deposit_slip: ''
    })
    const { userData } = useSelector(state => state.persistedReducer.userReducer);
    const [doctors, setDoctors] = useState(null);

    const [openTimeSlots, setOpenTimeSlots] = useState(false);
    const [timeSlots, setTimeSlots] = useState([
        // { label: 'Apple', value: 'apple' },
        // { label: 'Banana', value: 'banana' }
    ]);
    const [openFollowUp1, setOpenFollowUp1] = useState(false);
    const [followUp1, setFollowUp1] = useState([
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
    ]);
    const [openFollowUp2, setOpenFollowUp2] = useState(false);
    const [followUp2, setFollowUp2] = useState([
        { label: 'F1', value: 'f1' },
        { label: 'F2', value: 'f2' }
    ]);

    const [selectedCategory, setSelectedCategory] = useState({
        id: 0,
        name: ''
    });
    const [selectedDoctor, setSelectedDoctor] = useState({
        id: '',
        name: ''
    });


    function handleChange(name, value) {
        setAppointmentData({
            ...appointmentData,
            [name]: value
        })
    }

    function handleDoctor(params) {
        console.log('Selected Doctor >>>>', params);
        setSelectedDoctor({
            id: params.id,
            name: params.name
        });
    }

    function handleChangeDate(date) {
        setAppointmentData({
            ...appointmentData,
            selected_date: date
        })
    }

    function createAppointment(params) {
        setAppointments({
            ...appointments,
            create: true
        })
    }

    function addDepositedSlip() {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
        }).then(async (image) => {
            console.log('image', image);
            // const imgData = new FormData();
            // imgData.append('images', { uri: image.path, name: 'photo', type: 'image/jpg' });
            // imgData.append('name', image.filename);
            // imgData.append('company_id', selectedCompany);
            // imgData.append('user_id', loginUser?.user_id)
            // console.log('Image form data >>>>', imgData._parts)
            // let imageReq = await fetch(Global.apiUrl + '/user/image_upload', {
            //     method: 'Post',
            //     headers: new Headers({
            //         Authorization: 'Bearer ' + loginUser?.token,
            //         // "Content-Type": "application/json",
            //     }),
            //     body: imgData,
            // });

            // let resJson = await imageReq.json();
            // console.log('Image ResJSon >>>>>', resJson);
            //if (resJson.status === 'Success') {
            setAppointmentData({
                ...appointmentData,
                deposit_slip: image.path
            })

            //}
        });
        //console.log('gallery image >>>', profileImage)

    }

    const CATEGORIES = [{
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        category: t('category_1'),
    }, {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        category: t('category_2')
    }, {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        category: t('category_3')
    }, {
        id: "68694a0f-3da1-431f-bd56-142371e29d72",
        category: t('category_4')

    }, {
        id: "28694a0f-3da1-471f-bd96-142456e29d72",
        category: t('category_5')
    }
    ]
    const PLACEMENTS = [
        {
            id: 1,
            title: 'Appointment Date',
        },
        {
            id: 2,
            title: 'Appointment Time'
        },
        {
            id: 3,
            title: 'Appointment Day'
        },
        {
            id: 4,
            title: 'Services'
        }

    ];

    const DOCTORS = [{
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        name: "Adam",
        category: selectedCategory.name
    }, {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        name: "John Don",
        category: selectedCategory.name
    }, {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        name: "Saim Duck",
        category: selectedCategory.name
    }, {
        id: "68694a0f-3da1-431f-bd56-142371e29d72",
        name: "Ben Stroke",
        category: selectedCategory.name

    }, {
        id: "28694a0f-3da1-471f-bd96-142456e29d72",
        name: "Zampa",
        category: selectedCategory.name
    }
    ]

    const renderItem = (item) => (
        <View
            style={{ flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row', alignItems: 'center', margin: 10 }}
            key={item.id}
        >
            <RadioButton
                value={selectedCategory.name}
                status={item.name === selectedCategory.name ? 'checked' : 'unchecked'}
                onPress={() => setSelectedCategory({ id: item.id, name: item.name })}
                color={Global.main_color}
            />
            <Text >{item.name}</Text>
        </View>
    )

    async function fetchTimeSlot(params) {
        try {
            let params = {
                api_token: userData?.api_token
            };

            let query = Object.keys(params)
                .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                .join('&');
            // console.log('Query >>>', query)
            let req = await HttpUtilsFile.get('getdoctorslot?' + query);
            if (req.data.length == 0) {
                setTimeSlots([])
            }
            else {
                let slots = [];
                for (const iterator of req?.data) {
                    let obj = {
                        label: `${moment(iterator.start_time, 'hh:mm A').format('hh:mm A')} - ${moment(iterator.end_time, 'hh:mm A').format('hh:mm A')}`,
                        value: `${iterator.start_time} - ${iterator.end_time}`,
                        id: iterator.id
                    }
                    slots.push(obj)
                }
                setTimeSlots(slots);

            }
        } catch (error) {

        }
    }

    async function fetchCategories() {
        try {
            let params = {
                api_token: userData?.api_token
            };

            let query = Object.keys(params)
                .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                .join('&');
            // console.log('Query >>>', query)
            let req = await HttpUtilsFile.get('getcategory?' + query);
            //  console.log('Req of Categories >>', req);
            if (req.data.length == 0) {
                setCategories([])
            }
            else {
                let arr = [...req.data];
                arr.push({ id: 6, name: 'Family Tree' })
                setCategories(arr)
            }

        } catch (error) {
            console.log('Error >>>', error);
        }
    }

    async function fetchDoctors(params) {
        let timesSlots = [...timeSlots];
        let indx = timesSlots.findIndex(x => x.value === appointmentData.time_slot);
        if (indx != -1) {
            // alert(timesSlots[indx].id);
            let appDate = moment(appointmentData.selected_date).format('YYYY-MM-DD');
            let time_id = timesSlots[indx].id;
            let obj = {
                appdate: appDate,
                slot_id: time_id,
                category_id: selectedCategory.id
            }
            console.log('Doctor API data >>>', obj);
            try {
                let req = await HttpUtilsFile.post('getdoctorlist', obj, userData?.api_token);
                console.log('Req of Doctors >>', req);
                if (req.data.length == 0) {
                    setDoctors([])
                }
                else {
                    setDoctors(req.data);
                }

            } catch (error) {
                console.log('Error .>>>', error);
            }
        }
    }

    useEffect(() => {
        if (selectedCategory.id) {
            fetchDoctors();
        }
    }, [selectedCategory.id])

    useEffect(() => {
        fetchTimeSlot();
        fetchCategories();
    }, [])

    // console.log('Selected Doctor .>>>', selectedDoctor);

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
                                name={appointmentData.selected_date == '' ? 'dd/mm/yyyy' : moment(appointmentData.selected_date).format("DD/MM/YYYY")}
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
                                disabled={appointmentData.selected_date == '' ? true : false}
                            />
                        </View>
                        {appointmentData.time_slot !== '' && (
                            <>
                                <View style={{ margin: 10, flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row' }}>
                                    <Text style={{ color: Global.main_color, fontWeight: 'bold' }}>{t('category')}</Text>
                                </View>
                                <View style={{ margin: 8, flexDirection: 'row', flexWrap: 'wrap' }}>
                                    {categories.map(item => renderItem(item))}
                                </View>
                            </>
                        )}
                        {selectedCategory.name !== '' && (
                            <>
                                <View style={{ margin: 10 }}>
                                    <Text style={{ color: Global.main_color, fontWeight: 'bold', marginVertical: 5 }}>Choose Doctor</Text>
                                    <ScrollView horizontal={true} >
                                        {doctors == null ?
                                            <Components.Spinner />
                                            :
                                            doctors?.length == 0 ?
                                                <Components.NoRecord />
                                                :
                                                <>
                                                    {doctors?.map((item, i) => (<Components.DoctorCard data={item} handleDoctor={handleDoctor} selectedDoctor={selectedDoctor} key={i} />))}
                                                </>

                                        }
                                    </ScrollView>
                                </View>
                                <View style={{ margin: 10 }}>
                                    <Text style={{ color: Global.dark_gray, fontWeight: '600', marginVertical: 5 }}>Date, time and service required</Text>
                                    <Components.DropDown
                                        placeholder="Follow Up"
                                        list={followUp1}
                                        onChange={(value) => handleChange('follow', value())}
                                        value={appointmentData.follow}
                                        dropDownMaxHeight={150}
                                        open={openFollowUp1}
                                        style={styles.dropdown_inner_style}
                                        setOpen={() => setOpenFollowUp1(openFollowUp1 => !openFollowUp1)}
                                        listMode="MODAL"
                                    />
                                </View>
                            </>
                        )}
                        {appointmentData.follow == 'yes' && (
                            <>
                                <View style={{ margin: 10 }}>
                                    <Components.DropDown
                                        placeholder="Select Follow Up"
                                        list={followUp2}
                                        onChange={(value) => handleChange('selected_follow_up', value())}
                                        value={appointmentData.selected_follow_up}
                                        dropDownMaxHeight={150}
                                        open={openFollowUp2}
                                        style={styles.dropdown_inner_style}
                                        setOpen={() => setOpenFollowUp2(openFollowUp2 => !openFollowUp2)}
                                        listMode="MODAL"
                                    />
                                </View>
                                {/* <View style={{ margin: 10 }}>
                                    <Components.MyButton
                                        title='View Prescription'
                                        styleBtn={{ backgroundColor: Global.inputs_bg }}
                                        titleStyle={{ fontWeight: '500', color: Global.main_color }}
                                    />
                                </View> */}
                            </>
                        )}
                        {(selectedCategory.name && selectedDoctor.name) && (
                            <View style={{ margin: 10 }}>
                                <View style={{ flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row' }}>
                                    <Text style={{ color: Global.main_color, fontWeight: 'bold', marginVertical: 5 }}>{t('placement_head')}</Text>
                                </View>
                                <View style={{ flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row' }}>
                                    <Text>{`${selectedDoctor.name} Appointment`}</Text>
                                    <Text style={{ color: Global.main_color }}>{`(30 min)`}</Text>
                                </View>
                                <View style={styles.cardContainer}>
                                    {PLACEMENTS.map((v, i) => {
                                        return [
                                            i != 0 && (
                                                <View style={{ borderWidth: 0.5, borderColor: Global.dark_gray }} key={v.id} />
                                            ),
                                            <View style={{ backgroundColor: Global.inputs_bg, height: '25%', justifyContent: 'center', padding: 5 }} key={i}>
                                                <View
                                                    style={{ flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row', alignItems: 'center' }}
                                                >
                                                    <View style={{ flex: 1 }}>
                                                        <Text style={{ fontWeight: 'bold' }}>{v.title}</Text>
                                                    </View>
                                                    {v.id == 1 && (<Text>{moment(appointmentData.selected_date).format("DD/MM/YYYY")}</Text>)}
                                                    {v.id == 2 && (<Text>{appointmentData.time_slot}</Text>)}
                                                    {v.id == 3 && (<Text>{moment(appointmentData.selected_date, "YYYY-MM-DD HH:mm:ss").format('dddd')}</Text>)}
                                                    {v.id == 4 && (<Text>{selectedCategory.name}</Text>)}
                                                </View>
                                            </View>
                                        ]

                                    })}
                                </View>
                                <View style={{ marginVertical: 10, flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row' }}>
                                    <Text>{t('brief_comment')}</Text>
                                </View>
                                <Components.InputField
                                    placeholder="Comment"
                                    name={'comment'}
                                    handleChange={(name, value) => handleChange(name, value)}
                                    value={appointmentData.comment}
                                    multiple={true}
                                />
                                <View style={{ marginTop: 10, flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row' }}>
                                    <Text style={{ fontWeight: '600', color: Global.main_color }}>{t('select_payment')}</Text>
                                </View>
                                <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                    <TouchableOpacity
                                        onPress={() => handleChange('payment', 'bank')}
                                        style={appointmentData.payment == 'bank' ? styles.selectedBtnPayment : styles.paymentBtnStyle}
                                    >
                                        <Components.ImagePlaceholder
                                            src={bankImg}
                                            _style={styles.imgStyle1}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => handleChange('payment', 'spot')}
                                        style={appointmentData.payment == 'spot' ? styles.selectedBtnPayment : styles.paymentBtnStyle}
                                    >
                                        <Components.ImagePlaceholder
                                            src={spotImg}
                                            _style={styles.imgStyle1}
                                        />
                                    </TouchableOpacity>
                                </View>
                                {appointmentData.payment == 'bank' && (
                                    <View style={{ marginTop: 10 }}>
                                        <Components.InputField
                                            placeholder="Bank Name"
                                            name={'bank_name'}
                                            handleChange={(name, value) => handleChange(name, value)}
                                            value={appointmentData.bank_name}
                                        />
                                        <View style={{ margin: 10 }} />
                                        <Components.InputField
                                            placeholder="Bank Account Name"
                                            name={'bank_account_name'}
                                            handleChange={(name, value) => handleChange(name, value)}
                                            value={appointmentData.bank_account_name}
                                        />
                                        <View style={{ margin: 10 }} />
                                        <Components.InputField
                                            placeholder="Bank Account Number"
                                            name={'bank_account_number'}
                                            handleChange={(name, value) => handleChange(name, value)}
                                            value={appointmentData.bank_account_number}
                                        />
                                        <View style={{ margin: 10 }} />
                                        <Components.InputField
                                            placeholder="Deposited by"
                                            name={'deposited_by'}
                                            handleChange={(name, value) => handleChange(name, value)}
                                            value={appointmentData.deposited_by}
                                        />
                                        {appointmentData.deposit_slip ?
                                            <View style={{ marginTop: 15, flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row', alignItems: "center" }}>
                                                <Components.ImagePlaceholder
                                                    uri={appointmentData.deposit_slip}
                                                    _style={{ height: 80, width: 80 }}
                                                />
                                                <TouchableOpacity
                                                    style={{ margin: 10 }}
                                                >
                                                    <Text style={{ color: 'red', textDecorationLine: 'underline' }}>Remove File</Text>
                                                </TouchableOpacity>
                                            </View>
                                            :
                                            <>
                                                <View style={{ margin: 10, flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row', alignItems: 'center' }}>
                                                    <Text style={{ margin: 10 }}>Deposited Slip</Text>

                                                    <TouchableOpacity
                                                        style={styles.chooseFileBtn}
                                                        onPress={() => addDepositedSlip()}
                                                    >
                                                        <Text style={{ fontWeight: 'bold' }}>Choose File</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </>
                                        }

                                    </View>
                                )}
                                {(appointmentData.payment == 'bank' || appointmentData.payment == 'spot') && (
                                    <View style={{ margin: 10 }}>
                                        <Components.MyButton
                                            title='Create'
                                        // titleStyle={{ fontWeight: '500', color: Global.main_color }}
                                        />
                                    </View>
                                )}
                            </View>

                        )}
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
        backgroundColor: 'white',
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
    textStyle: {
        fontWeight: 'bold',
        // textAlign: 'center',
        color: Global.dark_gray
    },
    cardContainer: {
        borderWidth: 2,
        borderColor: Global.inputs_bg,
        borderRadius: 10,
        height: 200
    },
    imgStyle1: {
        height: '100%',
        width: '100%',
        resizeMode: ''
    },
    selectedBtnPayment: {
        borderWidth: 2,
        height: 70,
        width: '46%',
        borderColor: Global.main_color
    },
    paymentBtnStyle: {
        height: 70,
        width: '46%',
        margin: 10,
    },
    chooseFileBtn: {
        borderWidth: 1,
        padding: 10,
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10

    }

})
