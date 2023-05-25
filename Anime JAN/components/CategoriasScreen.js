import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const CategoriasScreen = ({ route }) => {
  const [animeList, setAnimeList] = useState([]);

  const { categoryTitle } = route.params;

  useEffect(() => {
    axios.get(`https://kitsu.io/api/edge/anime?filter[categories]=${categoryTitle}`)
      .then(response => setAnimeList(response.data.data))
      .catch(error => console.log(error));
  }, [categoryTitle]);

  const navigation = useNavigation();
  const renderAnime = ({ item }) => {
    const imageUrl = item.attributes.posterImage ? item.attributes.posterImage.original : 'https://i.pinimg.com/736x/02/54/a3/0254a36ef127c73967b78d91ad0b7c3f.jpg';
  
    return (
      <TouchableOpacity style={styles.animeContainer} onPress={() => navigation.navigate('AnimeDetails', { slug: encodeURIComponent(item.attributes.slug) })}>
        <Image source={{ uri: imageUrl }} style={styles.animeImage} />
        <View style={styles.animeDetails}>
          <Text style={styles.animeTitle}>{item.attributes.canonicalTitle}</Text>
          <Text style={styles.animeRating}>Rating: {item.attributes.averageRating || 'N/A'}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  
  return (
    <View style={styles.container}>
      <FlatList
        data={animeList}
        keyExtractor={(item) => item.id}
        renderItem={renderAnime}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
  },
  animeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  animeImage: {
    width: 50,
    height: 75,
    borderRadius: 5,
    marginRight: 10,
  },
  animeDetails: {
    flex: 1,
  },
  animeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0.5, height: 0.9 },
    textShadowRadius: 5,
  },
  animeRating: {
    fontSize: 15,
    color: '#555',
  },
});

export default CategoriasScreen;