import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList, ScrollView } from 'react-native'
import Components from '../../Components'
import Global from '../../Global'
import case1 from '../../Assets/case_1.jpeg'
import case2 from '../../Assets/case_2.jpeg'
import case3 from '../../Assets/case_3.jpeg'
import case4 from '../../Assets/case_4.jpeg'
import case5 from '../../Assets/case_5.jpeg'
import { useTranslation } from 'react-i18next'


const Home = () => {
    const { t } = useTranslation();
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

    const DATA = [{
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        name: "Dr. Kumar",
        timeStamp: "12:47 PM",
        subTitle: "Specialist",
        avatarUrl: case1
        // avatarUrl: "https://www.google.com/search?q=fbr+tax+collection+images&rlz=1C1ONGR_enPK976PK976&sxsrf=ALiCzsbp0_n_n92v8yIfya4WhFIWUOPjEQ:1662404600891&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj229Xdq_75AhWpMlkFHUMMDf8Q_AUoAnoECAEQBA&biw=1280&bih=577&dpr=1.5#imgrc=hLmfBbQJXSDzlM"
    }, {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        name: "Dr. Saif",
        timeStamp: "11:11 PM",
        subTitle: "Cardio Specialist",
        avatarUrl: case2
        //avatarUrl: "https://www.google.com/search?q=fbr+tax+collection+images&rlz=1C1ONGR_enPK976PK976&sxsrf=ALiCzsbp0_n_n92v8yIfya4WhFIWUOPjEQ:1662404600891&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj229Xdq_75AhWpMlkFHUMMDf8Q_AUoAnoECAEQBA&biw=1280&bih=577&dpr=1.5#imgrc=by_xKEh1YSq2WM"
    }, {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        name: "Dr. Rumi",
        timeStamp: "6:22 PM",
        subTitle: "Gyani Specialist",
        avatarUrl: case3
        //avatarUrl: "https://www.google.com/search?q=fbr+tax+collection+images&rlz=1C1ONGR_enPK976PK976&sxsrf=ALiCzsbp0_n_n92v8yIfya4WhFIWUOPjEQ:1662404600891&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj229Xdq_75AhWpMlkFHUMMDf8Q_AUoAnoECAEQBA&biw=1280&bih=577&dpr=1.5#imgrc=4_ezFtQMlDkR1M"
    }, {
        id: "68694a0f-3da1-431f-bd56-142371e29d72",
        name: "Dr. Dawood",
        timeStamp: "8:56 PM",
        subTitle: "Child Specialist",
        avatarUrl: case4
        // avatarUrl: "https://www.google.com/search?q=fbr+tax+collection+images&rlz=1C1ONGR_enPK976PK976&sxsrf=ALiCzsbp0_n_n92v8yIfya4WhFIWUOPjEQ:1662404600891&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj229Xdq_75AhWpMlkFHUMMDf8Q_AUoAnoECAEQBA&biw=1280&bih=577&dpr=1.5#imgrc=4_ezFtQMlDkR1M"
    }, {
        id: "28694a0f-3da1-471f-bd96-142456e29d72",
        name: "Dr. Noor",
        timeStamp: "12:47 PM",
        subTitle: "Specialist",
        avatarUrl: case5
        // avatarUrl: "https://www.google.com/search?q=fbr+tax+collection+images&rlz=1C1ONGR_enPK976PK976&sxsrf=ALiCzsbp0_n_n92v8yIfya4WhFIWUOPjEQ:1662404600891&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj229Xdq_75AhWpMlkFHUMMDf8Q_AUoAnoECAEQBA&biw=1280&bih=577&dpr=1.5#imgrc=B_pNo7CE4kUZmM"
    }
    ]

    const renderItem = (item) => (
        <Components.MyCard data={item} key={item.id} />
    )

    return (
        <SafeAreaView style={styles.container}>
            <Components.TopBar title={t('home')} home={true} />
            <View style={{ flex: 1, marginTop: 20 }}>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <View style={{ flexDirection: 'row', marginTop:3, flexWrap:'wrap', justifyContent:'center'}}>
                        {DATA.map(item => renderItem(item))}
                    </View>
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
    }
})