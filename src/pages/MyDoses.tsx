import React, {useState, useEffect} from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Alert,
  Image
  } from 'react-native';
import { Card } from 'react-native-paper';  
import {Load} from '../components/Load';
import { Agenda } from 'react-native-calendars';
import colors from '../styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';

export interface SchedullesValues{
    [date: string]:[{
      medicineName: string; 
      dose: string; 
      description: string; 
      quantity: number; 
      days: number; 
      itemShapeImg: string  
    }]
  }

export function MyDoses(){

    const [ schedulles, setSchedulles ] = useState<SchedullesValues>();
    const [ load, setLoad ] = useState(true);

    const navigation = useNavigation();

    useEffect( () => {   
   
        async function getItem(){
            try{
                
                const value = await AsyncStorage.getItem('@medicineReminder:medicinesSchedules')
                const datas = value ? (JSON.parse(value) as SchedullesValues ) : {};
                setSchedulles(datas);
    
            }catch{ 
    
                Alert.alert('Get Data Error.'); 
    
            }     
      }
    
      getItem();
            
            
      }, [] );
    
    useEffect( () => {

        if(schedulles) setLoad(false);
    
      },[schedulles]); 
    
    if(load){
      return <Load/>
    }

    const renderItem = (item: SchedullesValues) => {
        
          return (
            <TouchableOpacity style={{marginRight: 10, marginTop: 17}} >
              <Card>
                <Card.Content>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text>{item.medicineName},{item.dose}Mg</Text>
                    <Image source = {{uri: item.itemShapeImg}} style = {{height:60, width: 60}} />
                  </View>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          );
        };

        return(
            <View style = {styles.container} >
        
                <View style = {styles.header} >
        
                          <Text style = {styles.title} >
                              Take Care {'\n'}
                              of Your Health!
                          </Text>
        
                </View>
                
                <View style={styles.calendar }>
                   
                   <Agenda items = {schedulles} renderItem = {renderItem} />
        
                </View>
        
        
            </View>
          );
        
        }
        
        
        const styles = StyleSheet.create({
          container:{
            flex:1, 
            marginTop:45,
            marginHorizontal:25
          },
          header:{
        
          },
          title:{
            fontSize:30,
            color: colors.green_dark
          },
          calendar:{
            marginTop:5,
            flex:1
          }
        });
