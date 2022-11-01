import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Platform, Linking, Dimensions } from 'react-native';
import Global from '../../Global';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next'
import SearchInput from '../SearchInput';
import IonicIcon from 'react-native-vector-icons/Ionicons';


export default function TopBar({ title, home = false, backBtn, backIcon = false, user_name }) {
  const navigation = useNavigation();
  const [searchValue, setSearchValue] = useState({
    name: ''
  });

  const { t } = useTranslation();

  function handleChange(name, value) {
    setSearchValue({
      ...searchValue,
      [name]: value
    })
  }


  return home ? (
    <>
      <View style={styles.homeTopBarStyle}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={styles.topBarText} numberOfLines={1} ellipsizeMode='tail'>{user_name}</Text>
        </View>
        {/* <View style={styles.containerText}>
        <SearchInput
          placeholder={t('search')}
          name={'search'}
          handleChange={(name, value) => handleChange(name, value)}
          value={searchValue}
          icon='search-outline'
        />
      </View> */}
      </View>
      <View style={{ height: 40, flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1, height: '100%', backgroundColor: Global.main_color, borderBottomLeftRadius: 20 }} />
        <View style={{ flex: 1, height: "100%", backgroundColor: Global.main_color, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ zIndex: 0, position: 'absolute' }}>
            <View style={[styles.profile_container, { bottom: -15 }]}>
              <IonicIcon name="person" size={40} color={Global.dark_gray} />
            </View>
          </View>

        </View>
        <View style={{ flex: 1, height: '100%', backgroundColor: Global.main_color, borderBottomRightRadius: 20 }} />
      </View>
    </>

  ) : backIcon ? (
    <View style={[Platform.OS === 'android' ? styles.androidTopBarWithIcon : styles.iosWithIcon]}>
      <TouchableOpacity
        onPress={() => (backBtn ? backBtn() : navigation.goBack())}
      // onPress={() => navigation.dispatch(
      //   StackActions.push('Main'))}
      >
        <Icon name="chevron-left" iconStyle={styles.topBarMenuIcon} />
      </TouchableOpacity>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={styles.topBarText} numberOfLines={1} ellipsizeMode='tail'>
          {title}
        </Text>
      </View>
    </View>
  )
    :
    (
      <View style={styles.androidTopBar}>
        <Text style={styles.topBarText} numberOfLines={1} ellipsizeMode='tail'>
          {title}
        </Text>
      </View>
    );
}

const styles = StyleSheet.create({
  androidTopBarWithIcon: {
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Global.main_color,

    // marginTop:20
  },
  homeTopBarStyle: {
    backgroundColor: Global.main_color,
    // alignItems:"center",
    // height: '16%',
    //borderBottomRightRadius: 20,
    //borderBottomLeftRadius: 20,
    padding: 5
  },
  containerText: {
    position: 'relative',
    elevation: 3,
    //  backgroundColor: '#FB8500',
    // padding: 3,
    borderRadius: 12,
    marginHorizontal: '6%',
    top: 37,
    // left:-30,
    // right:-30
    // marginTop: 30,
    // marginLeft: -10,
  },
  androidTopBar: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: Global.main_color,
    alignItems: 'center',
    justifyContent: "center",
  },
  iosWithIcon: {
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
    // marginTop:20,
    //paddingTop:30,
    backgroundColor: Global.main_color,
    justifyContent: 'space-between',
  },
  iosContainer: {
    flexDirection: 'row',
    padding: 8,
    // backgroundColor: Global.screensBackground,
    alignItems: 'center',
    justifyContent: "center",
    // marginTop:20
    //  paddingTop:30,
  },
  topBarText: {
    color: Global.white,
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5,
    textTransform: 'uppercase',

  },
  topBarMenuIcon: {
    color: Global.white,
    fontSize: 32,
    // padding: 5,
    fontWeight: 'bold',
  },
  topBarIcon: {
    color: Global.main_color,
    fontSize: 26,
    padding: 5,
    fontWeight: 'bold',
  },
  sideIcons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  bgImg: {
    height: 70,
    width: '100%',
  },
  update_btn: {
    borderWidth: 2,
    borderColor: Global.screensBackground,
    borderRadius: 7,
    padding: 4,
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: Global.screensBackground
    //marginLeft:12,
  },
  profile_container: {
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: Global.inputs_bg,
    backgroundColor: Global.white,
    height: 75,
    width: 75,
    borderRadius: 75 / 2,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
    elevation: 3
  }
});
