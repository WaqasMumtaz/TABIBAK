import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import IonicIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Global from '../../Global';


const More = () => {
  const navigation = useNavigation();
  const DATA = [{
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Revenu Detail",
    icon: 'chatbox-ellipses',
    detail: `PTax gave excellent performance during FY2021, exceeding the annual revenue collection
    target of Rs. 4,691 billion by Rs. 54 billion. Continuing this momentum in the current
    financial year was major challenge. However, FBR not only maintained the momentum, but
    produced even better performance during the first half of FY2022. This is evident from the
    revenue collection made during the period. The target for the July-December 2021 was
    exceeded by 11 percent or Rs. 287 Billion in absolute terms. Another significant aspect is that
    for the first time, the annual target has been achieved to the extent of 50.1 percent against the
    average of 46 percent six monthly achievement in the previous years. All the taxes except
    FED have achieved their respective targets`,
    point_1: `Direct Taxes 2,133.0 1,015.2 1021.4 100.61 6.2`,
    point_2: `Sales Tax 2,435.0 1,052.6 1275.0 121.1 222.4`,
    point_3: `Federal Excise 344.0 150.8 146.3 97.0 (4.5)`
  }, {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Profile",
    icon: 'person',
    detail: `During current FY2022 July-December period, the share of domestic taxes has declined to
    47.9% as compared to 55.7% during the previous FY (Table 6 & Graph 4). There are a
    number of reasons for this. In case of crude oil, the incidence of taxation has shifted from
    domestic (ex-refinery) to import stage. This has contributed heavily in reducing the share of
    domestic sales tax. Second, the increase in international price of such essential items as
    edible has increased their overall import value, which has also resulted in higher sales tax at
    import stage. Import of edible oil in value terms increased from Rs.196.2 billion to Rs.329.1
    billion or 67.8%, in the first of half of CFY as compared to H1 PFY. Third, due to increased
    economic activity in sectors like textile and agriculture, imports of cotton and fertilizers have
    recorded significant increase. For instance, import of cotton has jumped in terms of quantity
    and value by 19.2% and 64.2% respectively.`,
    point_1: `July 341,700 416,072 74,372`,
    point_2: `August 348,600 446,363 97,763`,
    point_3: `September 520,400 534,001 13,601`
    //avatarUrl: "https://www.google.com/search?q=fbr+tax+collection+images&rlz=1C1ONGR_enPK976PK976&sxsrf=ALiCzsbp0_n_n92v8yIfya4WhFIWUOPjEQ:1662404600891&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj229Xdq_75AhWpMlkFHUMMDf8Q_AUoAnoECAEQBA&biw=1280&bih=577&dpr=1.5#imgrc=by_xKEh1YSq2WM"
  }, {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Licence",
    icon: "logo-usd",
    detail: `Direct taxes have contributed around 35% to the total tax collected during H1: 2021-22. Net
    collection stood at Rs. 1,021.4 billion reflecting a growth of 23.6% over the H1: PFY
    collection of Rs. 826.1 billion. An amount of Rs. 5.1 billion has been paid back as refunds.
    during July-December 2021-22 as against Rs. 7.3 billion during corresponding period last
year. The collection of income tax comprises of withholding taxes (WHT), advance tax /
payments with returns and collection on demand (COD).
Analysis of Components of Income Tax
Collection on Demand (CoD) and Advance Tax / Payments with Returns:
Collection on demand as a whole and it’s both components witness decline during the first
half of the CFY. This was primarily because of the FBR policy of providing maximum
facilitation to the business community and furnishing conducive business environment for
greater economic growth. The collection from current demand declined by 62.5% and arrear
demand by 31.9% (Table 7). Major part of income tax comes from withholding taxes,
whereas CoD shares around 2%. 
    `,
    point_1: `October 446,496 337,255 109,241 32.4`,
    point_2: `November 476,392 347,902 128,490 36.9`,
    point_3: `December 600,545 508,636 91,909 18.1`
    //avatarUrl: "https://www.google.com/search?q=fbr+tax+collection+images&rlz=1C1ONGR_enPK976PK976&sxsrf=ALiCzsbp0_n_n92v8yIfya4WhFIWUOPjEQ:1662404600891&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj229Xdq_75AhWpMlkFHUMMDf8Q_AUoAnoECAEQBA&biw=1280&bih=577&dpr=1.5#imgrc=4_ezFtQMlDkR1M"
  }, {
    id: "68694a0f-3da1-431f-bd56-142371e29d72",
    title: "Setting",
    icon: 'settings',
    detail: `Over the years, the number of income tax return filers has increased substantially as evident
    from the table 9. In TY2017, the filers were 2 million; however, this number crossed 3
    million mark in TY2020. The return filing for TY 2021 is still in progress hence number is
    increasing gradually and so far, by 31st January 2022 more than 3 million people have filed
    their income tax returns. As a whole during TY2017 and TY2021 nearly 50 percent growth
    has been recorded. The corporate return filers jumped from 40,000 to more than 60,000
    during last five tax years and during the same period payment with return improved from
    Rs.20.3 billion to Rs.38.7 billion.
    Payment with return is an important component of income tax collection. Collection from this
    head has increased from Rs.Rs.30 billion in TY2017 to Rs.70 billion in TY2021, which is
    133 percent higher (Graph 6). Tax Year-wise growth (%) is reflected in the same graph, the
    growth patterns of number of filers and payments seems aligned with each other. `,
    point_1: `FED 146.3 126.9 15.3 19.4`,
    point_2: `DT 1,147.2 1,317.9 1,223.7 1,323.8 1,512.8 881.0`,
    point_3: `Collection on Demand 20,252.20 38,439.70 -18,188 -47.3`
    // avatarUrl: "https://www.google.com/search?q=fbr+tax+collection+images&rlz=1C1ONGR_enPK976PK976&sxsrf=ALiCzsbp0_n_n92v8yIfya4WhFIWUOPjEQ:1662404600891&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj229Xdq_75AhWpMlkFHUMMDf8Q_AUoAnoECAEQBA&biw=1280&bih=577&dpr=1.5#imgrc=4_ezFtQMlDkR1M"
  }, {
    id: "28694a0f-3da1-471f-bd96-142456e29d72",
    title: "About",
    icon: "information-circle",
    detail: `Major Heads of Sales Tax Domestic: The overall net collection of Sales Tax Domestic
    (STD) was Rs. 382.7 billion against Rs. 408.1 billion in the H1: PFY. Major contributing
    commodities are petroleum products, electrical energy, textile sector, sugar, food products,
    cigarettes, cement, aerated water/beverage, iron & steel products. The share of major 15
    items contributed around 55%. The detail of major 15 items has been shown in Table 11.
    Electrical energy is the top revenue generator in STD with around 16% share in collection.
    Now the POL products including oil refineries, oil marketing and oil exploration has become `,
    point_1: `Arrear 12,974.30 19,057.60 -6,083 -31.9`,
    point_2: `Current 7,277.80 19,382.10 -12,104 -62.5`,
    point_3: `Voluntary Payments 301,036.70 254,965.50 46,071 18.1`
    // avatarUrl: "https://www.google.com/search?q=fbr+tax+collection+images&rlz=1C1ONGR_enPK976PK976&sxsrf=ALiCzsbp0_n_n92v8yIfya4WhFIWUOPjEQ:1662404600891&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj229Xdq_75AhWpMlkFHUMMDf8Q_AUoAnoECAEQBA&biw=1280&bih=577&dpr=1.5#imgrc=B_pNo7CE4kUZmM"
  }
  ]

  function handleNavigate(title, detail, point_1, point_2, point_3) {
    navigation.navigate('Detail', { title, detail, point_1, point_2, point_3 });
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.cardList} onPress={() => handleNavigate(item.title, item.detail, item.point_1, item.point_2, item.point_3)}>
      <View style={{ marginLeft: 10 }}>
        <IonicIcon name={item.icon} color={Global.main_color} size={30} />
      </View>
      <View style={{ marginLeft: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>More</Text>
      </View>
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