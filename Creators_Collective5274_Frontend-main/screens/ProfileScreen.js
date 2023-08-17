import React from 'react';
import { StyleSheet, Text, View, Image,SafeAreaView } from 'react-native';
import styles from '../style';
export default class ProfileScreen extends React.Component{
  render()
  {
 return(
  <View style={styles.container}>
  <SafeAreaView style={styles.droidSafeArea}>
  
    <Text>Profile</Text>
    </SafeAreaView>
    </View>
   
  )
  }
 
}