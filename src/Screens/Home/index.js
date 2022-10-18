import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import Components from '../../Components'
import Global from '../../Global'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux'
import HttpUtilsFile from '../../Services/HttpUtils';
import cardio from '../../Assets/cardio.png';
import therapy from '../../Assets/therapy.png';
import online_doctor from '../../Assets/online_doctor.png';
import doctor from '../../Assets/doctor.png';
import family from '../../Assets/family.png';
import nurse from '../../Assets/nurse.png';



const Home = () => {
    const navigation = useNavigation();
    const { t } = useTranslation();
    const { userData } = useSelector(state => state.persistedReducer.userReducer);
    const [categories, setCategories] = useState(null);

    const [authObj, setAuthObj] = useState({
        search: ''
    })

    function handleChange(name, value) {
        console.log('Name >>>>>>', name, 'Value >>>>>>', value);
        setAuthObj({
            ...authObj,
            [name]: value,
        });
    }


    const CATEGORIES = [{
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        category: t('category_1')
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

    function handleNavigate(data) {
        console.log('Data clicked >>>>', data);
        navigation.navigate("DoctorsTile", {
            category_id: data.id,
            category_name: data.category
        })
    }



    const renderItem = (item) => (
        // <Components.MyCard data={item} key={item.id} />
        <TouchableOpacity
            key={item.id}
            style={styles.card}
            elevation={3}
            onPress={() => handleNavigate(item)}
        >
            {/* <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} /> */}
            <View>
                <View style={{ marginVertical: 5 }}>
                    <Components.ImagePlaceholder
                        src={item.id == 1 ? doctor : item.id == 2 ? nurse : item.id == 3 ? therapy : item.id == 4 ? online_doctor : item.id == 5 ? cardio : family}
                        _style={{ height: 60, width: 60 }}
                    />
                </View>
                <View>
                    <Text style={[styles.textStyle, { fontSize: 18 }]}>{item.name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )

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

    useEffect(() => {
        fetchCategories();
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Components.TopBar title={t('home')} home={true} />
            <View style={{ flex: 1}}>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    {categories == null ?
                        <Components.Spinner />
                        : categories?.length == 0 ?
                            <Components.NoRecord />
                            :
                            <View style={{ flexDirection: 'row', marginTop: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
                                {categories.map(item => renderItem(item))}
                            </View>
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Global.white
    },
    contentContainer: {
        flexGrow: 1,
        paddingVertical: 20
    },
    card: {
        margin: 8,
        width: '41%',
        height: 200,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: Global.inputs_bg,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        }
    },
    textStyle: {
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 28,
        color: Global.main_color
    }
})