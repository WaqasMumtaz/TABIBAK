import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';

function useRTL(){
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir();
    return isRTL
}

function alertDialog(head, title, handleYes, key , options) {
   
    Alert.alert(
        `${head}`,
        `${title}`,
        [
          {
            text: options.no,
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: options.yes, onPress: ()=>handleYes(key)}
        ]
      );
  
}

function showAlert(head,title, text) {
   
    Alert.alert(
        `${head}`,
         `${title}`,
        [
          {
            text: text,
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
        //   { text: options.yes, onPress: ()=>handleYes(key)}
        ]
      );
  
}



export {
    useRTL,
    alertDialog,
    showAlert
}