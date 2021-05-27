import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export function Load(){
    return(
      <View style = {styles.container} >
          <LottieView
              source={require('../assets/medicinepills.json')}
              autoPlay
              style = {styles.animation}
          />
      </View>
    )
}


const styles = StyleSheet.create({
container:{
flex:1,
justifyContent:"center",
alignItems:'center',
},
animation:{
width:200,
height:200,
}

});