import React from 'react';
import { TouchableOpacityProps, TouchableOpacity, Image, StyleSheet } from 'react-native';
import colors from '../styles/colors';

interface MedicineShapeProps extends TouchableOpacityProps {
    imageUrl: string;
    active? : boolean;
  }

export function MedicineShape({ imageUrl, active = false, ...rest }: MedicineShapeProps){
    return (
      <TouchableOpacity
          style = {
            [styles.container, 
            active && styles.containerActive]
            }
          {...rest}
      >
  
          <Image style = {styles.image} source = {{uri: imageUrl}} />
           
      </TouchableOpacity>
    )
  }

const styles = StyleSheet.create({
    container:{
      backgroundColor: colors.white,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginLeft:10
    },
    containerActive:{
      backgroundColor: colors.green_light
    },
    image:{
      height: 60,
      width: 60
    }
  });