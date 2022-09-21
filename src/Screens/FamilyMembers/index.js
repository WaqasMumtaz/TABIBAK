import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import Components from '../../Components'
import translate from 'translate-google-api';
import { useTranslation } from 'react-i18next';
import Global from '../../Global';

const FamilyMembers = () => {
    const [DATA, setDATA] = useState(null);
    const [visible, setVisible] = useState(true);
    const [modal, setModal] = useState(false);

    const { t, i18n } = useTranslation();

    const isRTL = i18n.dir();

    function userOperation(params) {
        console.log('Params >>>', params);
    }

    function handleModal() {
        setModal(modal => !modal)
    }

    async function fetchFamilyMembers(params) {
        let data = [];
        const res = [{
            value: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
            label: 'Ahmed',

        }, {
            value: "58694a0f-3da1-471f-bd96-145571e29d72",
            label: 'Zain',

        }, {
            value: "68694a0f-3da1-431f-bd56-142371e29d72",
            label: 'Qureshi'
        }, {
            value: "28694a0f-3da1-471f-bd96-142456e29d72",
            label: 'Naeem'
        },
        {
            value: "28694a0f-3da1-471f-bd96-142456e29d73",
            label: 'Nabi',
        }
        ]
        if (isRTL === 'rtl') {
            for (const iterator of res) {
                const result = await translate(`${iterator.label}`, {
                    tld: "cn",
                    to: "ar",
                });
                let obj = {
                    ...iterator,
                    label: result[0]
                }
                data.push(obj);
            }
            // console.log('After Change lang name >>>>', data);
            setDATA(data);
        }
        else {
            setDATA(res);
        }

    }

    useEffect(() => {
        fetchFamilyMembers();
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Components.TopBar title={t('users')} backIcon={true} />
            <Components.MembersList
                data={DATA}
                userOperation={userOperation}
                listStyle={{ flexDirection: isRTL === 'rtl' ? 'row-reverse' : 'row' }}
            />
            <Components.FABComponent
                visible={visible}
                iconDetail={{ name: 'add', color: 'white' }}
                color={Global.main_color}
                placement='right'
                size='large'
                onPress={handleModal}
            />
            <Components.ModalScreen
                modalVisible={modal}
                title={t('add_member')}
                handleModal={handleModal}
            >
                <View>
                    <Text>This form Screen</Text>
                </View>
            </Components.ModalScreen>
        </SafeAreaView>
    )
}

export default FamilyMembers

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    }
})
