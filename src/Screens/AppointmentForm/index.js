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



const AppointmentForm = ({ route }) => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir();
    const { doctor_name, doctor_id } = route.params;
    const [appointments, setAppointments] = useState(null);
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
    const [openTimeSlots, setOpenTimeSlots] = useState(false);
    const [timeSlots, setTimeSlots] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' }
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

    const [selectedCategory, setSelectedCategory] = useState('');
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
        category: selectedCategory
    }, {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        name: "John Don",
        category: selectedCategory
    }, {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        name: "Saim Duck",
        category: selectedCategory
    }, {
        id: "68694a0f-3da1-431f-bd56-142371e29d72",
        name: "Ben Stroke",
        category: selectedCategory

    }, {
        id: "28694a0f-3da1-471f-bd96-142456e29d72",
        name: "Zampa",
        category: selectedCategory
    }
    ]

    const renderItem = (item) => (
        <View
            style={{ flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row', alignItems: 'center', margin: 10 }}
            key={item.id}
        >
            <RadioButton
                value={selectedCategory}
                status={item.category === selectedCategory ? 'checked' : 'unchecked'}
                onPress={() => setSelectedCategory(item.category)}
                color={Global.main_color}
            />
            <Text >{item.category}</Text>
        </View>
    )

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
                               <View style={{ margin: 10, flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row'}}>
                                  <Text style={{ color: Global.main_color, fontWeight: 'bold'}}>{t('category')}</Text>
                               </View>
                                <View style={{ margin: 10, flexDirection: 'row', flexWrap: 'wrap' }}>
                                    {CATEGORIES.map(item => renderItem(item))}
                                </View>
                            </>
                        )}
                        {selectedCategory !== '' && (
                            <>
                                <View style={{ margin: 10 }}>
                                    <Text style={{ color: Global.main_color, fontWeight: 'bold', marginVertical: 5 }}>Choose Doctor</Text>
                                    <ScrollView horizontal={true} >
                                        {DOCTORS.map((item, i) => (<Components.DoctorCard data={item} handleDoctor={handleDoctor} selectedDoctor={selectedDoctor} key={i} />))}
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
                                <View style={{ margin: 10 }}>
                                    <Components.MyButton
                                        title='View Prescription'
                                        styleBtn={{ backgroundColor: Global.inputs_bg }}
                                        titleStyle={{ fontWeight: '500', color: Global.main_color }}
                                    />
                                </View>
                            </>
                        )}
                        {(selectedCategory && selectedDoctor.name) && (
                            <View style={{ margin: 10 }}>
                                <Text style={{ color: Global.main_color, fontWeight: 'bold', marginVertical: 5 }}>Check Information Place Comment</Text>
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
                                                    {v.id == 4 && (<Text>{selectedCategory}</Text>)}
                                                </View>
                                            </View>
                                        ]

                                    })}
                                </View>
                                <View style={{ marginVertical: 10 }}>
                                    <Text>Brief Your Problems</Text>
                                </View>
                                <Components.InputField
                                    placeholder="Comment"
                                    name={'comment'}
                                    handleChange={(name, value) => handleChange(name, value)}
                                    value={appointmentData.comment}
                                    multiple={true}
                                />
                                <View style={{ marginTop: 10 }}>
                                    <Text style={{ fontWeight: '600', color: Global.main_color }}>Select Payment Method</Text>
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
                                {appointmentData.payment && (
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
                                                    <Text style={{ color: 'red', textDecorationLine:'underline'}}>Remove File</Text>
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
                                    <View style={{margin:10}}/>
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
        width: 160,
        borderColor: Global.main_color
    },
    paymentBtnStyle: {
        height: 70,
        width: 160,
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
