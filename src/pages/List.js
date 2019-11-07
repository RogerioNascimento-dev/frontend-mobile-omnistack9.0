import React,{ useState, useEffect } from 'react';
import { SafeAreaView,Text,TouchableOpacity, ScrollView, Image, StyleSheet, AsyncStorage,Alert } from 'react-native';
import socketio from 'socket.io-client';
import logo from '../assets/logo.png';
import SpotList from '../components/SpotList';
import { Entypo } from '@expo/vector-icons/'

export default function List({ navigation }){
  const [tecnologias, setTecnologias] = useState([]);
  const [user_name, setUser_name] = useState('');

   useEffect(() => { 
    async function obterStorageTecnologias(){      
      const tecnologias = await AsyncStorage.getItem('tecnologias');
      const user_name = await AsyncStorage.getItem('user_name');
      const tecnologiaArray = tecnologias.split(',').map(tec => tec.trim()); 

      setTecnologias(tecnologiaArray);
      setUser_name(user_name);
     }
     obterStorageTecnologias();    
   },[]);

   useEffect(() =>{
    AsyncStorage.getItem('user')
    .then(user_id =>{
      const socket = socketio('http://192.168.25.169:3333', {
        query: { user_id }
      })
      socket.on('booking_response', booking => {
        Alert.alert('Atenção',`Sua reserva em ${booking.spot.empresa} em ${booking.data} foi ${booking.aprovado ? 'APROVADO': 'REJEITADO'}`)
      })
    })
   }, []);

   async function handleLogout(){    
    await AsyncStorage.clear();
    navigation.navigate('Login');     
   }
  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.logo}/>
      <TouchableOpacity style={styles.contentUsuario} onPress={()=> handleLogout()}>
      <Text>{`Olá, ${user_name}`}</Text>
      <Entypo name="log-out" size={12} color="red" />
      </TouchableOpacity>

      <ScrollView>
      {
        tecnologias.map(tec =>(
          <SpotList key={tec} tecnologia={tec} />
        ))
      }
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,   
  },
  contentUsuario:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentUsuarioText:{
    fontSize: 12,
    marginRight: 5,
  },
  logo:{
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 30,
  }
});
