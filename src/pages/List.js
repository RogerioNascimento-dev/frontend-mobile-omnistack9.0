import React,{ useState, useEffect } from 'react';
import { SafeAreaView,Text, ScrollView, Image, StyleSheet, AsyncStorage } from 'react-native';
import logo from '../assets/logo.png';
import SpotList from '../components/SpotList';

export default function List(){
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
  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.logo}/>
      <Text>{`Olá, ${user_name}`}</Text>
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
  logo:{
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 30,
  }
});
