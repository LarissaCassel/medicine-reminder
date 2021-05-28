import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Alert, 
  FlatList, 
  TouchableOpacity, 
  ScrollView
  } from 'react-native';

import { startOfTomorrow, addDays, eachDayOfInterval, format  } from 'date-fns' ;
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { Button } from '../components/Button';
import { MedicineShape } from '../components/MedicineShape';
import colors  from '../styles/colors';
import shapes from '../assets/shapesImg';

interface StorageShedules{
    [date: string]:[{
      medicineName: string; 
      dose: string; 
      description: string; 
      quantity: number;  
      days: number; 
      itemShapeImg: string 
    }]
  }

export function MedicineSave(){

    const [ medicineName,  setMedicineName ] = useState<string>(); 
    const [ dose, setDose ] = useState<string>(); 
    const [ description, setDescription ] = useState<string>(''); 
    const [ quantity, setQuantity ] = useState(1); 
    const [ doseInDays, setdoseInDays ] = useState(7); 
    const [ itemShapSelect, setItemShapeSelect ] = useState<number>(0); 
    const [ shapeImage, setShapeImage ] = useState<string>('https://images.gamebanana.com/img/ico/sprays/50f916fcc9c5b.png');

//Setar img 
function handleShape (id: number, imgUrl: string){
    setItemShapeSelect(id);
    setShapeImage(imgUrl);
}


//Função Para Salvar Nome Do Medicamento
function handleMedicineInputChange(value: string){
setMedicineName(value);
}

//Função Para Salvar Dose/mg 
function handleDoseInputChange(value: string){
setDose(value);
}

//Função Para Salvar Descrição
function handleDescriptionInputChange(value: string){
setDescription(value);
}

async function handleSave() { 

    // Caso o nome do medicamento/dose não seja informados
    if ( !medicineName  || !dose ){
      return Alert.alert(' Medicine Name or Dose Not Informeded '); 
    } 
  
      try{   
  
        // Medicamentos Já Salvos
        const shedulles = await AsyncStorage.getItem('@medicineReminder:medicinesSchedules');
        const oldShedulles = shedulles ? ( JSON.parse(shedulles) as StorageShedules ) : {};
        const oldSchedullesDates: Array<string> = Object.keys(oldShedulles); 
  
        //Criar array com as datas para serem salva
        const dayInit = startOfTomorrow(); // Dia seguinte ao de hoje
        const dayEnd =  addDays(new Date(), doseInDays); 
        const daysInterval = eachDayOfInterval({start: dayInit, end: dayEnd}); //array com as datas
  
        // Objeto dos novos items
        const newSheddule = {} as StorageShedules;
  
        //formatação das datas
        for(let i = 0; i <= daysInterval.length; i++){
            if(daysInterval[i]){
                // pegar data e formatar para string
                const dateFormat = format( daysInterval[i], 'yyyy-MM-dd' ); 
  
                //caso a data já tenha sida armazenada antes
                if( oldSchedullesDates.includes(dateFormat) ){
  
                      oldShedulles[dateFormat].push({
                        medicineName: medicineName, 
                        dose: dose, 
                        description: description, 
                        quantity:quantity, 
                        days: doseInDays, 
                        itemShapeImg: shapeImage});
                };
                //caso a data não tenha sido armazenado antes
                newSheddule[dateFormat] = [{ medicineName: medicineName, dose: dose, description: description, quantity:quantity, days: doseInDays, itemShapeImg: shapeImage}];
            };
        }
   
        //Salvar
        await AsyncStorage.setItem('@medicineReminder:medicinesSchedules', JSON.stringify({...newSheddule, ...oldShedulles}) );
        
        //Pronto
        Alert.alert('Ready');
  
      }catch{
        //Erro
        Alert.alert( ' Error ' );
      }
  }

  return(
    <View style = {styles.container} >

        <View style = {styles.header} >
      
            <Text style = {styles.haderTitle} > Add New Medicine </Text>

        </View>

        <ScrollView style = {styles.contain} showsVerticalScrollIndicator = {false} >
             <Text style = {styles.constainText}> Medicine Name </Text>
             <TextInput style = {styles.containInput} onChangeText = {handleMedicineInputChange} />

             <Text style = {styles.constainText}> Pill Dose (Mg) </Text>
             <TextInput style = {styles.containInput} keyboardType = 'numeric' onChangeText = {handleDoseInputChange} />

             <Text style = {styles.constainText}> Description (Optional) </Text>
             <TextInput style = {styles.containInput} onChangeText = {handleDescriptionInputChange} />

             <Text style = {styles.constainText} > Amount (Per Day) </Text>
             <View style = {styles.counterContainer} >
                <TouchableOpacity 
                style = {styles. counterButtom}  
                onPress = { 
                  () => quantity === 1 ? setQuantity(1) : setQuantity(quantity - 1)
                  }
                >
                  <Text style = {styles. counterButtomText} >-</Text>
                </TouchableOpacity>
                <Text style = {styles. counterText} > 
                    {quantity} Pills
                </Text>
                <TouchableOpacity 
                style = {styles.counterButtom} 
                onPress = { 
                  () => setQuantity(quantity + 1)
                  } 
                  >
                    <Text style = {styles. counterButtomText} >
                      +
                    </Text>
                </TouchableOpacity>
             </View>


             <Text style = {styles.constainText} > How Long (Days)  </Text>

             <View style = {styles.counterContainer} >
                <TouchableOpacity 
                style = {styles. counterButtom}  
                onPress = { 
                  () => doseInDays === 2 ? setdoseInDays(2) : setdoseInDays(doseInDays - 1)
                  }
                >
                  <Text style = {styles. counterButtomText} > - </Text>
                </TouchableOpacity>
                <Text style = {styles. counterText} > 
                    {doseInDays} Days
                </Text>
                <TouchableOpacity 
                style = {styles.counterButtom} 
                onPress = { 
                  () => doseInDays === 30 ? setdoseInDays(30) : setdoseInDays(doseInDays + 1)
                  } 
                  >
                    <Text style = {styles. counterButtomText} >
                      +
                    </Text>
                </TouchableOpacity>
             </View>
             <Text style = {styles.constainText}> Appearance </Text> 
             <FlatList
                data = {shapes}
                renderItem = {({item}) => {
                  
                  return(
                    
                    <MedicineShape imageUrl = {item.img} 
                    active = {item.id === itemShapSelect} 
                    onPress = { () =>  handleShape(item.id, item.img) } 
                    /> 
                    
                  )

                }}
                keyExtractor={(item) => item.key}
                horizontal
                contentContainerStyle = {{marginTop:20}}
             />
          </ScrollView>            
           <View>
            <Button title = "Schedule The Dose" onPress = { () =>  handleSave() } />
          </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      justifyContent:'space-around',
      marginTop:40,
      marginBottom:35,
      marginHorizontal:10
    },
    header:{
      flexDirection:"row",
      alignItems:"center",
      
    },
    haderTitle:{
      flex:1,
      fontSize:24,
      textAlign:"center",
      color:colors.green_dark
    },
    contain:{
      flex:1,
      marginHorizontal:30,
    },
    constainText:{
      color:colors.body_light,
      fontSize:15,
      marginTop:20
    },
    containInput:{
      borderBottomWidth:1,
      borderBottomColor:colors.body_light,
      color:colors.green_dark,
      paddingLeft:5
    },
    shape:{
      paddingLeft:10
    },
    counterContainer:{
      marginTop:20,
      flexDirection:'row',
      justifyContent:'space-around',
      alignItems:'center',
      height:80,
      backgroundColor:colors.white,
      borderRadius:30,
    },
    counterText:{
      fontSize: 20,
      textAlign:"center"
    },
    counterButtom:{
        height:50,
        width:50,
        backgroundColor:colors.green_dark,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:25,
    },
     counterButtomText:{
      fontSize:15,
      color:colors.white,
      fontWeight:'bold',
    },
  
  });