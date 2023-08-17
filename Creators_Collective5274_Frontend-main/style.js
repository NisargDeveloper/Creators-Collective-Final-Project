import * as React from 'react';
import { StyleSheet,SafeAreaView,Platform,StatusBar} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
},

      droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
 
})

export default styles;