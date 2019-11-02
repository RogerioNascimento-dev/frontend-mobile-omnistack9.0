import React, {useEffect, useState} from 'react';
import { View,Text, FlatList, Image,TouchableOpacity, StyleSheet } from 'react-native';
import {withNavigation} from 'react-navigation';
import api from '../services/api';

function SpotList({tecnologia, navigation}){
  const [spots, setSpots] = useState([]);

  useEffect(() =>{
    async function loadSpots(){
      const response = await api.get('/spots', {
        params: {tech: tecnologia}
      });
      setSpots(response.data);
    }
    loadSpots();
  },[]);

  function handleNavigate(id){
    navigation.navigate('Book',{id});
  }
  return (
    <View style={styles.container} >
      <Text style={styles.title}>Empresas que usam <Text style={styles.textBold}>{tecnologia}.</Text>
      </Text>

   
      <FlatList 
      style={styles.list}
      data={spots} 
      keyExtractor={spot => spot._id}
      horizontal 
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={styles.listItem}>
          <Image style={styles.listItemImagem} source={{uri: item.imagem_url.replace('localhost','192.168.25.169')}}/> 
          <Text style={styles.empresa}>{item.empresa} </Text>
          <Text style={styles.valor}>{ (item.valor)?`R$${item.valor}/Dia`:'Gratuito'}</Text>
          <TouchableOpacity 
          style={styles.button}
          onPress={() => handleNavigate(item._id)}
          >
            <Text style={styles.textButton}>Solicitar reserva</Text>
          </TouchableOpacity>
        </View>
      )}

  /> 
  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30
  },
  title:{
    fontSize:20,
    color:'#444',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  textBold:{
    fontWeight: 'bold',
  },
  list:{
    paddingHorizontal: 20,
  },
  listItem:{
    marginRight: 10,
  },
  listItemImagem:{
    width: 200,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 2,
  },
  empresa:{
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  valor:{
    fontSize: 15,    
    color: '#999',
    marginTop: 5,
  },
  button:{
    height: 32,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems:'center',
    borderRadius:2,
    marginTop: 15,
  },
  textButton:{
    color:'#FFF',
    fontWeight: 'bold',
    fontSize: 15
  }
})

export default withNavigation(SpotList);