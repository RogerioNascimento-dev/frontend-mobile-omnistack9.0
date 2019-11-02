import React, {useState} from 'react';
import logo from '../assets/logo.png';
import {SafeAreaView, Alert, View, TouchableOpacity, Image, Text, TextInput, AsyncStorage, StyleSheet} from 'react-native';
import api from '../services/api';


export default function Book({navigation}){
  const [data, setData] = useState('');
  const id = navigation.getParam('id');
  
  async function bandleSubimit(){
    const user_id = await AsyncStorage.getItem('user');
    console.log('[Uid:'+user_id+'] [Data:'+data+'] [idSpot:'+id+']');
    await api.post(`/spots/${id}/bookings`,{
      data,
      headers: { user_id }
    });

    Alert.alert('Sucesso!','Solicitação de reserva enviada');
    navigation.navigate('List');

  }
  return ( 
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.logo}/>
      <Text style={styles.label}>Data de interesse *</Text>
          <TextInput 
          style={styles.input}
          placeholder="Informe seu Data de interesse"
          placeholderTextColor="#ccc"         
          autoCapitalize="words"
          autoCorrect={false}
          value={data}
          onChangeText={setData}
          />

          <View style={styles.containerButtons}>
          <TouchableOpacity style={[styles.button,styles.buttonCancelar]} onPress={() => navigation.navigate('List')} >
            <Text styles={styles.textButton}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={bandleSubimit} >
            <Text styles={styles.textButton}>Solicitar Reserva</Text>
          </TouchableOpacity>          
          </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    paddingHorizontal: 30,
  },
  label:{
    fontWeight:'bold',
    color: '#444',
    marginBottom: 8,
  },
  input:{
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 20,
    borderRadius: 2
  },
  logo:{
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',    
    marginBottom:15,
  },
  button:{
    flex: 1,
    height: 42,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems:'center',
    borderRadius:2,  
    marginLeft: 5,  
  },
  buttonCancelar:{      
    backgroundColor: '#999', 
    marginLeft: 0,        
  },
  textButton:{
    color:'#FFF',
    fontWeight: 'bold',
    fontSize: 16
  },  
  containerButtons:{
    flex: 1,
    marginTop:10,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',      
  }
})