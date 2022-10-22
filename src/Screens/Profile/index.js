import React, { useRef, useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import Global from '../../Global'
import { hasMixed, hasNumber, hasSpecial, hasValidLength } from '../../Global/password';
import Components from '../../Components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useTranslation } from 'react-i18next'
import { useRTL } from '../../../Functions'
import IonicIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';
import HttpUtilsFile from '../../Services/HttpUtils';
import { useSelector } from 'react-redux';

//const isRTL = Global.isRTL();

const Profile = () => {
    const { t, i18n } = useTranslation();
    const isRTL = useRTL();
    let actionSheet = useRef();
    const navigation = useNavigation()
    // console.log('Custom Function RTL ***>>>>>', isRTL);
    const { userData } = useSelector(state => state.persistedReducer.userReducer);

    let phoneInput = useRef(null);
    const [loader, setLoader] = useState(false);

    let optionArray = [
        t('gallery'),
        t('camera'),
        t('cancel')
    ];

    const openSheet = () => {
        actionSheet.current.show();
    }

    const [authObj, setAuthObj] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        family_key: '',
        photo: null,
        edit: false,
        role: ''
    })

    const [errorObj, setErrorObj] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: ''
    })

    function handleClear() {
        //alert('Clear form')
        // phoneInput = null;
        setAuthObj({
            ...authObj,
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            password: '',
            family_key: '',
            edit: false
        })
        setErrorObj({
            ...errorObj,
            first_name: '',
            last_name: '',
            email: '',
            phone: ''
        })
        setLoader(false);

    }

    function handleChange(name, value) {
        // console.log('Name >>>>>>', name, 'Value >>>>>>', value);
        setAuthObj({
            ...authObj,
            [name]: value,
        });
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
        //console.log('Errors >>', errors);
        if (!hasValidLength(password)) {
            errors.password = "Your password must have 8 or more characters"
        }
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
        console.log(phoneInput.current?.isValidNumber(phone), 'PHONE');
        if (phoneInput.current?.isValidNumber(phone) == false) {
            errors.phone = 'Phone number is not valid';

        }
        setErrorObj(errors);
        if (Object.keys(errors).length === 0) {
            setLoader(true)
            // setTimeout(()=>{
            //     setLoader(false);
            //     dispatch(updateUser(authObj));
            // },2000)
        }
    }

    async function selectProfilePic(index) {
        if (index == 0) {
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
                setAuthObj({
                    ...authObj,
                    photo: image.path,
                })

                //}
            });
            //console.log('gallery image >>>', profileImage)

        }
        else if (index == 1) {
            ImagePicker.openCamera({
                width: 300,
                height: 400,
            }).then(async (image) => {
                console.log('Camera Pic >>', image);
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
                // if (resJson.status === 'Success') {
                setAuthObj({
                    ...authObj,
                    photo: image.path,
                })
                //  }

            });

        }
    }

    console.log('Edit user >>>', authObj.edit)
    async function getUserDetails() {
        try {
            let params = {
                api_token: userData?.api_token
            };

            let query = Object.keys(params)
                .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                .join('&');

            let req = await HttpUtilsFile.get('user_details?' + query);
            if (req.message === 'Data fetch Successful') {
                setAuthObj({
                    ...authObj,
                    first_name: req?.data?.fname,
                    last_name: req?.data?.lname,
                    phone:req?.data?.image,
                    role: req?.data?.role,
                    phone: req?.data?.phone,
                    email: req?.data?.email,
                    family_key: req?.data?.family_name
                })
            }

        } catch (error) {

        }
    }

    useEffect(() => {
        getUserDetails();
        return () => {
            handleClear()
        }
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView
                //style={{backgroundColor: 'white' }}
                contentContainerStyle={{ flexGrow: 1 }}
                //  keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
                enableOnAndroid={true}
                nestedScrollEnabled={true}
            >
                <View style={[styles.container, { margin: 20 }]}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <IonicIcon name="chevron-back" color={Global.main_color} size={30} />
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity
                            style={styles.profile_container}
                            disabled={!authObj.edit}
                            onPress={() => openSheet()}
                        >
                            {authObj.photo ?
                                <Image source={{ uri: authObj.photo }} style={styles.profile_photo} resizeMode='cover' />
                                :
                                <IonicIcon name="person" size={30} color={Global.dark_gray} />
                            }
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            zIndex: 0,
                            top: 20,
                            right: 15,
                            position: 'absolute',
                            // flexDirection: 'row',
                            // justifyContent: 'flex-end',
                        }}
                            onPress={() => setAuthObj({ ...authObj, edit: true })}
                        >
                            <IonicIcon name="create" color={Global.main_color} size={30} />

                        </TouchableOpacity>
                    </View>
                    {authObj.role && (
                        <View style={{flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row', justifyContent:'center', alignItems:'center', marginTop:10}}>
                          <Text style={{fontSize:15, fontWeight:'bold', color:Global.main_color}}>{`${t('role')} :`}</Text>
                          <Text style={{marginHorizontal:7}}>{`${authObj.role}`}</Text>
                        </View>
                    )}
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Components.InputField
                            placeholder="First Name"
                            name={'first_name'}
                            handleChange={(name, value) => handleChange(name, value)}
                            value={authObj.first_name}
                            editable={authObj.edit}
                        />
                        {errorObj.first_name ? <Text style={styles.error}>{t('first_name')}</Text> : null}
                        <View style={{ marginBottom: 15 }} />
                        <Components.InputField
                            placeholder="Last Name"
                            name={'last_name'}
                            handleChange={(name, value) => handleChange(name, value)}
                            value={authObj.last_name}
                            editable={authObj.edit}
                        />
                        {errorObj.last_name ? <Text style={styles.error}>{t('last_name')}</Text> : null}
                        <View style={{ marginBottom: 15 }} />
                        {authObj.edit ? (
                            <>
                                <Components.PhoneNumberInput
                                    name='phone'
                                    handleChange={handleChange}
                                    handleChangeFormatted={handleChange}
                                    phoneInput={phoneInput}
                                />
                                {errorObj.phone ? <Text style={styles.error}>{t('phone_validation')}</Text> : null}
                            </>
                        ) :
                            (
                                <Components.InputField
                                    placeholder="Phone"
                                    name={'phone'}
                                    //handleChange={(name, value) => handleChange(name, value)}
                                    value={authObj.phone}
                                    editable={authObj.edit}
                                />
                            )
                        }

                        <View style={{ marginBottom: 15 }} />
                        <Components.InputField
                            placeholder="Email"
                            name={'email'}
                            handleChange={(name, value) => handleChange(name, value)}
                            value={authObj.email}
                            keyboardType={'email-address'}
                            editable={authObj.edit}
                        />
                        {errorObj.email ? <Text style={styles.error}>{t('email_validation')}</Text> : null}
                        <View style={{ marginBottom: 15 }} />
                        <Components.InputField
                            placeholder="Family key (Optional)"
                            name={'family_key'}
                            handleChange={(name, value) => handleChange(name, value)}
                            value={authObj.family_key}
                            editable={authObj.edit}
                        />
                        {authObj.edit && (
                            <View style={{ margin: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ margin: 10 }}>
                                    <Components.MyButton
                                        title={t('save')}
                                        styleBtn={{ width: 120 }}
                                        loader={loader}
                                        onClick={handleSave}
                                    />
                                </View>
                                <View style={{ margin: 10 }}>
                                    <Components.MyButton
                                        title={t('cancel')}
                                        styleBtn={{ width: 120, backgroundColor: Global.inputs_bg }}
                                        titleStyle={{ color: 'black' }}
                                        onClick={handleClear}
                                    />

                                </View>
                            </View>
                        )}
                    </View>
                </View>
                <ActionSheet
                    ref={actionSheet}
                    title={t('choose_pic')}
                    options={optionArray}
                    cancelButtonIndex={2}
                    destructiveButtonIndex={0}
                    onPress={(index) =>
                        selectProfilePic(index)
                    }
                />
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Global.white
    },
    profile_container: {
        height: 120,
        width: 120,
        borderWidth: 1,
        borderColor: Global.inputs_bg,
        borderRadius: 120 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Global.inputs_bg
    },
    profile_photo: {
        height: 120,
        width: 120,
        borderRadius: 120 / 2,
    },
    error: {
        textAlign: 'center',
        color: 'red',
    }
})
