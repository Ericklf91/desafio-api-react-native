import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ActivityIndicator, StyleSheet, FlatList, View, Text, Image } from 'react-native';

const Passageiros = () => {
  const [passageiros, setPassageiros] = useState([]);
  const [tamanho, setTamanho] = useState(10);

  useEffect(() => {
    getPassageiros();
  }, []);

  const renderFooter = () => {
    return (
      <View style={styles.view}>
        <ActivityIndicator size="large" color="#00FF7F"/>
      </View>
    );
  }

  const getPassageiros = () => {
    axios.get(`https://api.instantwebtools.net/v1/passenger?page=0&size=${tamanho}`)
      .then((response) => {
        setPassageiros(response.data.data);
        setTamanho(tamanho + 5);
        console.log(tamanho);
      }).catch(function (error) {
        alert(error);
      });
  }

  return (
    <FlatList style={styles.list}
      onEndReached={getPassageiros}
      onEndReachedThreshold={0.1}
      ListFooterComponent={renderFooter}
      data={passageiros}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => {
        return (
          <View>
            <Text style={styles.listItem}>Nome: {item.name}</Text>
            <Text style={styles.listItem}>Quantidade de viagens: {item.trips}</Text>
            <Text style={styles.listItem}>Cia. aérea: {item.airline.name}</Text>
            <Image style={styles.img} source={{ uri: item.airline.logo }} />
          </View>
        )
      }}
    />
  );
};

export default Passageiros;

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 20,
    backgroundColor: '#7B68EE',
  },

  listItem: {
    backgroundColor: '#EEE',
    marginTop: 5,
    padding: 10,
    borderRadius: 10,
  },
  img: {
    height: 50,
    width: 370,
    marginTop: 5,
    marginBottom: 30,
    padding: 30,
    borderRadius: 10,
  },
  view: {
    marginBottom: 20,
  }
});