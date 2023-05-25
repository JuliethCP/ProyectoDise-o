import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import AnimeDetails from './AnimeDetails';

const SearchBar = ({ onSearch, navigation }) => {
  const [query, setQuery] = useState('');
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);


  const handleSubmit = async () => {
    setLoading(true);
    setAnimes([]); // clear previous search results

    try {
      const response = await axios.get(`https://kitsu.io/api/edge/anime?filter[text]=${query}`);
      const data = response.data.data;
      setAnimes(data);
      onSearch(data); // Pass the search results to the parent component
      setSearchHistory(prevHistory => [...prevHistory, query]); // Add the current search query to the history
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const handleChange = (value) => {
    setQuery(value);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <TextInput
        style={{ width: '80%', height: 45, borderWidth: 1, borderRadius: 20, paddingHorizontal: 10 }}
        placeholder="Search for anime"
        value={query}
        onChangeText={handleChange}
      />
      <TouchableOpacity
        style={{justifyContent: 'center', alignItems: 'center', height: 30, backgroundColor: '#f1f1f1', borderRadius: 20, marginTop: 15, marginBottom: 15, width: 200, height: 85, borderRadius: 40}}
        onPress={handleSubmit}
        disabled={!query || loading}
      >
      <Image source={{ uri: 'https://images2.alphacoders.com/983/983353.png' }} style={{ position: 'absolute', width: 200, height: 85, borderRadius: 40}} /> 
        <Text style={{ color: 'white' }}>{loading ? 'Loading...' : 'Search'}</Text>
      </TouchableOpacity>
      {animes.length > 0 && <SearchResults animes={animes} navigation={navigation} />}
      {searchHistory.length > 0 && <SearchHistory searchHistory={searchHistory} onSearch={setQuery} />}
    </View>
  );
};

const SearchResults = ({ animes, navigation }) => {
  return (
    <ScrollView style={styles.scrollView}>
    <View>
      <Text style={styles.title}>                                                     </Text>
      {animes.map(anime => (
        <TouchableOpacity style={styles.card} key={anime.id} onPress={() => navigation.navigate('AnimeDetails', { slug: encodeURIComponent(anime.attributes.slug) })}>
          <Image source={{ uri: anime.attributes.posterImage.small }} style={styles.cardImage} />
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>{anime.attributes.canonicalTitle}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    overflow: 'hidden',
    resizeMode: 'cover',
    marginBottom: 15,
  },
  cardImage: {
    width: 100,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  cardBody: {
    flex: 1,
    padding: 10,
  },
  cardTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.65)',
    textShadowOffset: { width: 0.5, height: 0.9 },
    textShadowRadius: 5,
  },
});

export default SearchBar;