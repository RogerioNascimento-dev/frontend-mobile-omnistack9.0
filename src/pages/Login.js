import React, {useState,useEffect} from 'react';
import {View,Image,AsyncStorage,KeyboardAvoidingView, Text,TextInput,TouchableOpacity, StyleSheet} from 'react-native';
import logo from '../assets/logo.png';
import api from '../services/api';

export default function Login({navigation}){

  const [email, setEmail] = useState('');
  const [tecnologias, setTecnologias] = useState('');


  useEffect(()=>{
    AsyncStorage.getItem('user').then(user =>{
      if(user){
        navigation.navigate('List');
      }
    })
  },[])
  async function bandleSubimit(){
      const response = await api.post('/sessions', {email});
      const {_id} = response.data;
      const {nome} = response.data;
      
      await AsyncStorage.setItem('user',_id);
      await AsyncStorage.setItem('user_name',nome);
      await AsyncStorage.setItem('tecnologias',tecnologias);
      navigation.navigate('List');
  }

  return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Image source={logo} />
        <View style={styles.form}>
          <Text style={styles.label}>E-mail *</Text>
          <TextInput 
          style={styles.input}
          placeholder="Informe seu e-mail"
          placeholderTextColor="#ccc"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
          />

          <Text style={styles.label}>Tecnologias</Text>
          <TextInput 
          style={styles.input}
          placeholder="Tecnologias de interesse"
          autoCapitalize="words"
          autoCorrect={false}
          value={tecnologias}
          onChangeText={setTecnologias}
          /> 
          <TouchableOpacity style={styles.button} onPress={bandleSubimit} >
            <Text styles={styles.textButton}>Encontrar spots</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,    
    justifyContent: 'center',
    alignItems:'center'    
  },
  form:{
    alignSelf: 'stretch',
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
  button:{
    height: 42,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems:'center',
    borderRadius:2,
    marginTop: 15
  },
  textButton:{
    color:'#FFF',
    fontWeight: 'bold',
    fontSize: 16
  }


});