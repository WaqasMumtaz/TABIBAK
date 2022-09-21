import React from 'react'
import { StyleSheet, Text, View , Modal} from 'react-native';
import Components from '..';

const ModalScreen = ({children, modalVisible, title, handleModal }) => {
    return (
        <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        // onRequestClose={() => {
        //   setModalVisible(!modalVisible);
        // }}
      >
           <Components.TopBar title={title} backIcon={true} backBtn={()=> handleModal()}/>
             {children}
      </Modal>
    )
}

export default ModalScreen

const styles = StyleSheet.create({})
