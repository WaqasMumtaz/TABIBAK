import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import ImagePlaceholder from '../Image';
import MyButton from '../Button';
import Global from '../../Global';
import IonicIcon from 'react-native-vector-icons/Ionicons'
import { RadioButton } from 'react-native-paper';
import { useTranslation } from 'react-i18next';



const DoctorCard = ({ data, handleDoctor, selectedDoctor, i }) => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir();

    return (
        <View style={styles.card} elevation={3} >
            <ImagePlaceholder />
            <View style={{ flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <Text style={[styles.textStyle, { fontSize: 18 }]}>{data.name}</Text>
                    </View>
                    <View>
                        <Text style={[styles.textStyle, { fontSize: 15, color: Global.dark_gray }]}>{data.category}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Select Doctor</Text>
                    <RadioButton
                        value={data.id === selectedDoctor.id ? selectedDoctor.name : ''}
                        status={data.id === selectedDoctor.id ? 'checked' : 'unchecked'}
                        onPress={() => handleDoctor(data)}
                        color={Global.main_color}
                    />
                </View>
                {/* <View>
           <IonicIcon name="ellipsis-vertical" size={20} color={Global.dark_gray}/>
         </View> */}
            </View>
        </View>
    )
}

export default DoctorCard;

const styles = StyleSheet.create({
    card: {
        margin: 10,
        // width:120,
        // height:120,
        borderRadius: 10,
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
    btn_style: {
        borderWidth: 1,
        borderColor: Global.main_color,
        borderRadius: 15,
        backgroundColor: Global.main_color,

    },
    titleStyle: {
        fontWeight: 'bold',
        color: Global.white
    },
    imageStyle: {
        resizeMode: 'cover',
        height: 120,
        width: 120,
        borderRadius: 120 / 2
    },
    textStyle: {
        marginVertical: 5
    }
})