import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList ,useWindowDimensions} from 'react-native'
import Components from '../../Components'
import Global from '../../Global'
import videoImg from '../../Assets/video_img.png';
import video_1 from '../../Assets/gif_1.gif';
import video_2 from '../../Assets/gif_2.gif';
import video_3 from '../../Assets/gif_3.gif';
import video_4 from '../../Assets/gif_4.gif';
import video_5 from '../../Assets/gif_5.gif';


const List = () => {
    const [authObj, setAuthObj] = useState({
        search: ''
    })

    const { height, width } = useWindowDimensions();

    function handleChange(name, value) {
        console.log('Name >>>>>>', name, 'Value >>>>>>', value);
        setAuthObj({
            ...authObj,
            [name]: value,
        });
    }

    const DATA = [{
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "Sales Tax and Federal Excise Duty Budget Instructions- (Budget 2014)",
        timeStamp: "12:47 PM",
        subTitle: "Quarter-1 ",
        avatarUrl: video_1
        // avatarUrl: "https://www.google.com/search?q=fbr+tax+collection+images&rlz=1C1ONGR_enPK976PK976&sxsrf=ALiCzsbp0_n_n92v8yIfya4WhFIWUOPjEQ:1662404600891&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj229Xdq_75AhWpMlkFHUMMDf8Q_AUoAnoECAEQBA&biw=1280&bih=577&dpr=1.5#imgrc=hLmfBbQJXSDzlM"
    }, {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        title: "Sales Tax and Federal Excise Budget Instruction 2017-2018",
        timeStamp: "11:11 PM",
        subTitle: "Quarter-2",
        avatarUrl: video_2
        //avatarUrl: "https://www.google.com/search?q=fbr+tax+collection+images&rlz=1C1ONGR_enPK976PK976&sxsrf=ALiCzsbp0_n_n92v8yIfya4WhFIWUOPjEQ:1662404600891&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj229Xdq_75AhWpMlkFHUMMDf8Q_AUoAnoECAEQBA&biw=1280&bih=577&dpr=1.5#imgrc=by_xKEh1YSq2WM"
    }, {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        title: "Extension of income tax holiday on IT exports till 2025",
        timeStamp: "6:22 PM",
        subTitle: "Quarter-3",
        avatarUrl: video_3
        //avatarUrl: "https://www.google.com/search?q=fbr+tax+collection+images&rlz=1C1ONGR_enPK976PK976&sxsrf=ALiCzsbp0_n_n92v8yIfya4WhFIWUOPjEQ:1662404600891&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj229Xdq_75AhWpMlkFHUMMDf8Q_AUoAnoECAEQBA&biw=1280&bih=577&dpr=1.5#imgrc=4_ezFtQMlDkR1M"
    }, {
        id: "68694a0f-3da1-431f-bd56-142371e29d72",
        title: "Reduction in sales tax to 5 percent in Islamabad Capital Territory",
        timeStamp: "8:56 PM",
        subTitle: "Quarter-4",
        avatarUrl: video_4
        // avatarUrl: "https://www.google.com/search?q=fbr+tax+collection+images&rlz=1C1ONGR_enPK976PK976&sxsrf=ALiCzsbp0_n_n92v8yIfya4WhFIWUOPjEQ:1662404600891&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj229Xdq_75AhWpMlkFHUMMDf8Q_AUoAnoECAEQBA&biw=1280&bih=577&dpr=1.5#imgrc=4_ezFtQMlDkR1M"
    }, {
        id: "28694a0f-3da1-471f-bd96-142456e29d72",
        title: "100 percent foreign ownership and 100 percent repatriation of capital and dividends",
        timeStamp: "12:47 PM",
        subTitle: "Quarter-5",
        avatarUrl: video_5
        // avatarUrl: "https://www.google.com/search?q=fbr+tax+collection+images&rlz=1C1ONGR_enPK976PK976&sxsrf=ALiCzsbp0_n_n92v8yIfya4WhFIWUOPjEQ:1662404600891&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj229Xdq_75AhWpMlkFHUMMDf8Q_AUoAnoECAEQBA&biw=1280&bih=577&dpr=1.5#imgrc=B_pNo7CE4kUZmM"
    }
    ]

   function handleSubmit(title){
       console.log('Title >>>', title)
     if(title === 'Favourite'){
         alert('Added successfully...')
     }
     else if(title === 'Delete'){
         alert('Your process is pending...')
     }
    }

    const renderItem = ({ item }) => (
        <Components.MyCard
            title={item.title}
            subTitle={item.subTitle}
            uri={item.avatarUrl}
            time={item.timeStamp}
            btn_title_1={'Delete'}
            btn_title_2={'Favourite'}
            image_style={{
                flex: 1, 
                maxHeight:height,
                maxWidth:width
            }}
            handleSubmit={handleSubmit}
        />
    )

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, justifyContent: 'center',alignItems:'center' }}>
                <Text>List</Text>
            </View>
        </SafeAreaView>
    )
}

export default List

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
})