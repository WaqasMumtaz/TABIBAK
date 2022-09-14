import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Platform, Linking, Dimensions } from 'react-native';
import Global from '../../Global';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next'
import SearchInput from '../SearchInput';

export default function TopBar({ title, home = false, backBtn }) {
  const navigation = useNavigation();
  const [searchValue , setSearchValue] = useState({
    name:''
  });

  const { t  } = useTranslation();

  function handleChange(name , value) {
    setSearchValue({
      ...searchValue,
      [name]:value
    })
  }


  return home ? (
    <View style={styles.homeTopBarStyle}>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Text style={styles.topBarText} numberOfLines={1} ellipsizeMode='tail'>{title}</Text>
      </View>
      <View style={styles.containerText}>
          {/* <Text>Hello waqas</Text> */}
          <SearchInput
           placeholder={t('search')}
           name={'search'}
           handleChange={(name, value) => handleChange(name, value)}
           value={searchValue}
           icon='search-outline'
          />
      </View>
    </View>

  ) : (
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
    height: '16%',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    // padding:8
  },
  containerText: {
    position: 'relative',
    elevation: 3,
   //  backgroundColor: '#FB8500',
    // padding: 3,
    borderRadius: 12,
    marginHorizontal:'6%',
    top:37,
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
  }
});
