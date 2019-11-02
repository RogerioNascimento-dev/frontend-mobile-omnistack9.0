import React,{ useState, useEffect } from 'react';
import { SafeAreaView, Text, Image, StyleSheet, AsyncStorage } from 'react-native';
import logo from '../assets/logo.png';
import SpotList from '../components/SpotList';

export default function List(){
  const [tecnologias, setTecnologias] = useState([]);

   useEffect(() => {
    async function obterStorageTecnologias(){      
      const tecnologias = await AsyncStorage.getItem('tecnologias');
      const tecnologiaArray = tecnologias.split(',').map(tec => tec.trim()); 
      setTecnologias(tecnologiaArray);
     }
     obterStorageTecnologias();    
   },[]);
  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.logo}/>

      {
        tecnologias.map(tec =>(
          <SpotList key={tec} tecnologia={tec} />
        ))
      }
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
