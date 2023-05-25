import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';


const AnimeList = ({ navigation }) => {
  const [actionAnimes, setActionAnimes] = useState([]);
  const [romanceAnimes, setRomanceAnimes] = useState([]);
  const [adventureAnimes, setAdventureAnimes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseAction = await axios.get('https://kitsu.io/api/edge/anime?sort=popularityRank&filter[genres]=action&limit=10');
        setActionAnimes(responseAction.data.data);

        const responseRomance = await axios.get('https://kitsu.io/api/edge/anime?sort=popularityRank&filter[genres]=romance&limit=10');
        setRomanceAnimes(responseRomance.data.data);

        const responseAdventure = await axios.get('https://kitsu.io/api/edge/anime?sort=popularityRank&filter[genres]=adventure&limit=10');
        setAdventureAnimes(responseAdventure.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView style={styles.scrollView}>
      <View>
        <Text style={styles.title}>Top 10 Action Animes</Text>
        {actionAnimes.map(anime => (
          <TouchableOpacity style={styles.card} key={anime.id} onPress={() => navigation.navigate('AnimeDetails', { slug: encodeURIComponent(anime.attributes.slug) })}>
            <Image source={{ uri: anime.attributes.posterImage.small }} style={styles.cardImage} />
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>{anime.attributes.canonicalTitle}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View>
        <Text style={styles.title}>Top 10 Romance Animes</Text>
        {romanceAnimes.map(anime => (
          <TouchableOpacity style={styles.card} key={anime.id} onPress={() => navigation.navigate('AnimeDetails', { slug: encodeURIComponent(anime.attributes.slug) })}>
            <Image source={{ uri: anime.attributes.posterImage.small }} style={styles.cardImage} />
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>{anime.attributes.canonicalTitle}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View>
        <Text style={styles.title}>Top 10 Adventure Animes</Text>
        {adventureAnimes.map(anime => (
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
      paddingVertical: 20,
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 10,
      paddingVertical: 20,
    },
    title: {
      fontSize: 30,
      textAlign: 'center',
      fontWeight: 'bold',
      marginBottom: 15,
    },
    card: {
      flexDirection: 'row',
      marginVertical: 10,
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

export default AnimeList;