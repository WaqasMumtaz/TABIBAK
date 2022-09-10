import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native'
import Components from '../../Components'
import Global from '../../Global'
import case1 from '../../Assets/case_1.jpg'
import case2 from '../../Assets/case_2.jpg'
import case3 from '../../Assets/case_3.jpg'
import case4 from '../../Assets/case_4.jpg'
import case5 from '../../Assets/case_5.png'


const Home = () => {
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
        title: "PROVISION MONTH WISE / TAX WISE COLLECTION FY: 2021-22",
        timeStamp: "12:47 PM",
        subTitle: "Quarter-1 ",
        avatarUrl: case1
        // avatarUrl: "https://www.google.com/search?q=fbr+tax+collection+images&rlz=1C1ONGR_enPK976PK976&sxsrf=ALiCzsbp0_n_n92v8yIfya4WhFIWUOPjEQ:1662404600891&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj229Xdq_75AhWpMlkFHUMMDf8Q_AUoAnoECAEQBA&biw=1280&bih=577&dpr=1.5#imgrc=hLmfBbQJXSDzlM"
    }, {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        title: "MONTH WISE / TAX WISE COLLECTION DURING FY: 2020-21",
        timeStamp: "11:11 PM",
        subTitle: "Quarter-2",
        avatarUrl: case2
        //avatarUrl: "https://www.google.com/search?q=fbr+tax+collection+images&rlz=1C1ONGR_enPK976PK976&sxsrf=ALiCzsbp0_n_n92v8yIfya4WhFIWUOPjEQ:1662404600891&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj229Xdq_75AhWpMlkFHUMMDf8Q_AUoAnoECAEQBA&biw=1280&bih=577&dpr=1.5#imgrc=by_xKEh1YSq2WM"
    }, {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        title: "MONTH WISE/TAX WISE COLLECTION DURING FY 2019-20",
        timeStamp: "6:22 PM",
        subTitle: "Quarter-3",
        avatarUrl: case3
        //avatarUrl: "https://www.google.com/search?q=fbr+tax+collection+images&rlz=1C1ONGR_enPK976PK976&sxsrf=ALiCzsbp0_n_n92v8yIfya4WhFIWUOPjEQ:1662404600891&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj229Xdq_75AhWpMlkFHUMMDf8Q_AUoAnoECAEQBA&biw=1280&bih=577&dpr=1.5#imgrc=4_ezFtQMlDkR1M"
    }, {
        id: "68694a0f-3da1-431f-bd56-142371e29d72",
        title: "MONTH WISE/ TAX WISE COLLECTION DURING FY 2018-19",
        timeStamp: "8:56 PM",
        subTitle: "Quarter-4",
        avatarUrl: case4
        // avatarUrl: "https://www.google.com/search?q=fbr+tax+collection+images&rlz=1C1ONGR_enPK976PK976&sxsrf=ALiCzsbp0_n_n92v8yIfya4WhFIWUOPjEQ:1662404600891&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj229Xdq_75AhWpMlkFHUMMDf8Q_AUoAnoECAEQBA&biw=1280&bih=577&dpr=1.5#imgrc=4_ezFtQMlDkR1M"
    }, {
        id: "28694a0f-3da1-471f-bd96-142456e29d72",
        title: "MONTH WISE/ TAX WISE COLLECTION DURING FY 2017-18",
        timeStamp: "12:47 PM",
        subTitle: "Quarter-5",
        avatarUrl: case5
        // avatarUrl: "https://www.google.com/search?q=fbr+tax+collection+images&rlz=1C1ONGR_enPK976PK976&sxsrf=ALiCzsbp0_n_n92v8yIfya4WhFIWUOPjEQ:1662404600891&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj229Xdq_75AhWpMlkFHUMMDf8Q_AUoAnoECAEQBA&biw=1280&bih=577&dpr=1.5#imgrc=B_pNo7CE4kUZmM"
    }
    ]

    const renderItem = ({ item }) => (
        <Components.MyCard
            title={item.title}
            subTitle={item.subTitle}
            uri={item.avatarUrl}
            time={item.timeStamp}
            btn_title_1={'Cancel'}
            btn_title_2={'OK'}
        />
    )

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, justifyContent: 'center',alignItems:'center' }}>
                <Text>Home</Text>
            </View>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})