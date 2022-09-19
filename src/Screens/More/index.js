import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import IonicIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Global from '../../Global';
import { useTranslation } from 'react-i18next'
import { updateUser } from '../../Redux/reducersActions/userReducer';
import { changeLanguage } from '../../Redux/reducersActions/changeLanguage';

import ActionSheet from 'react-native-actionsheet';


const More = () => {
  const navigation = useNavigation();
  let actionSheet = useRef();
  const dispatch = useDispatch();
  const { default_language } = useSelector(state => state.persistedReducer.changeLanguage);
  const { t, i18n } = useTranslation();

  let optionArray = [
    'English',
    'عربى',
    'Cancel',
  ];
  const openSheet = () => {
    actionSheet.current.show();
  }

  const DATA = [{
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: t('lang'),
    icon: 'globe',

  }, {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: t('profile'),
    icon: 'person',

  }, {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: t('licence'),
    icon: "logo-usd",

  }, {
    id: "68694a0f-3da1-431f-bd56-142371e29d72",
    title: t('setting'),
    icon: 'settings',
  }, {
    id: "28694a0f-3da1-471f-bd96-142456e29d72",
    title: t('about'),
    icon: "information-circle",

  },
  {
    id: "28694a0f-3da1-471f-bd96-142456e29d73",
    title: t('logout'),
    icon: "log-out",

  }
  ]

  function handleNavigate(title) {
    if (title === t('logout')) {
      Alert.alert(
        `${t('alert')}`,
        `${t('logout_alert')}`,
        [
          {
            text: `${t('no')}`,
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: `${t('yes')}`, onPress: () => dispatch(updateUser(null)) }
        ]
      );
    }
    else if (title === t('lang')) {
      openSheet()
    }
    else if (title === t('profile')){
      navigation.navigate('Profile');
    }

    // navigation.navigate('Detail', { title , detail, point_1, point_2, point_3 });
  }

  async function selectLang(index) {
    console.log('Language index >>>>>>>>>', index);
    dispatch(changeLanguage(index == 0 ? 'English' : 'عربى'))
  }

  useEffect(() => {
    if (default_language === 'عربى') {
      i18n.changeLanguage('ar')
    }
    else if (default_language === 'English') {
      i18n.changeLanguage('en')
    }

  }, [default_language])


  const renderItemEnglish = ({ item }) => (
    <TouchableOpacity
      style={styles.cardList}
      onPress={() => handleNavigate(item.title)}
    >
      <View style={{ marginLeft: 10 }}>
        <IonicIcon name={item.icon} color={Global.main_color} size={30} />
      </View>
      <View style={{ marginLeft: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  )

  const renderItemArabic = ({ item }) => (
    <TouchableOpacity
      style={[styles.cardList, { justifyContent: 'flex-end' }]}
      onPress={() => handleNavigate(item.title)}
    >
      <View style={{ marginRight: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
      </View>
      <View style={{ marginRight: 10 }}>
        <IonicIcon name={item.icon} color={Global.main_color} size={30} />
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, marginTop: 20 }}>
        <FlatList
          data={DATA}
          renderItem={default_language === 'English' ? renderItemEnglish : renderItemArabic}
          keyExtractor={item => `item_${item.id}`}
          ItemSeparatorComponent={() => (<View style={{ borderWidth: 1.5, borderColor: Global.gray_clr }}></View>)}
        />
      </View>
      <ActionSheet
        ref={actionSheet}
        title={t('choose_lang')}
        options={optionArray}
        cancelButtonIndex={2}
        destructiveButtonIndex={0}
        onPress={(index) =>
          selectLang(index)
        }
      />
    </SafeAreaView>
  )
}

export default More

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardList: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Global.white,
    padding: 10,
    height: 70
  }
})