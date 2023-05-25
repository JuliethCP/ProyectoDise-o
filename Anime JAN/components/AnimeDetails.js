import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, Image, StyleSheet, Linking, ScrollView } from 'react-native';

const AnimeDetails = ({ route }) => {
  const [anime, setAnime] = useState(null);
  const [streamingLinks, setStreamingLinks] = useState([]);

  useEffect(() => {
    const slug = decodeURIComponent(route.params.slug);
    axios.get(`https://kitsu.io/api/edge/anime?filter[slug]=${slug}`)
      .then(response => {
        setAnime(response.data.data[0]);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  
    useEffect(() => {
      if (anime) {
        axios.get(`https://kitsu.io/api/edge/anime/${anime.id}/streaming-links`)
          .then(response => {
            setStreamingLinks(response.data.data);
          })
          .catch(error => {
            console.log(error);
          });
      }
    }, [anime]);

  if (!anime) {
    return null;
  }

  const { attributes: animeAttributes } = anime;

  return (
    <ScrollView style={styles.scrollView}>
    <View style={styles.animeDetailsContainer}>
    <Image source={{ uri: 'https://i.pinimg.com/736x/02/54/a3/0254a36ef127c73967b78d91ad0b7c3f.jpg' }} style={styles.backgroundImage} />
      <Image source={{ uri: animeAttributes.posterImage.large }} style={styles.posterImage} />
      <View style={styles.animeDetailsInfo}>
        <Text style={styles.title}>{animeAttributes.canonicalTitle}</Text>
        {animeAttributes.description && <Text><Text style={styles.bold}>Description:</Text> <Text style={[styles.description, {fontSize:18, textAlign: 'justify'}]}>{animeAttributes.description}</Text></Text>}
      <View style={{marginVertical: 15}} />
        {streamingLinks.length > 0 &&
          <View>
            <Text><Text style={styles.bold}>Streaming Links:</Text></Text>
            <View style={styles.streamingLinksList}>
              {streamingLinks.map((link) => (
                <Text key={link.id}><Text style={styles.link} onPress={() => Linking.openURL(link.attributes.url)}>{link.attributes.url}</Text></Text>
              ))}
            </View>
          </View>
        }
        <View style={{marginVertical: 8}} />
        {animeAttributes.startDate && <Text><Text style={styles.bold}>Start Date:</Text> <Text style={[styles.startDate, {fontSize:18} ]}>{animeAttributes.startDate}</Text></Text>}
        <View style={{marginVertical: 8}} />
        {animeAttributes.endDate && <Text><Text style={styles.bold}>End Date:</Text> <Text style={[styles.endDate, {fontSize:18} ]}>{animeAttributes.endDate}</Text></Text>}
        <View style={{marginVertical: 8}} />
        {animeAttributes.endDate ? null : <Text><Text style={styles.bold}>Status:</Text> <Text style={[styles.status, {fontSize:18} ]}>{animeAttributes.status}</Text></Text>}
        {animeAttributes.episodeCount && <Text><Text style={styles.bold}>Episodes:</Text> <Text style={[styles.episodeCount, {fontSize:18} ]}>{animeAttributes.episodeCount}</Text></Text>}
        <View style={{marginVertical: 8}} />
        <Text><Text style={styles.bold}>Rating:</Text> <Text style={[styles.averageRating, {fontSize:18} ]}>{animeAttributes.averageRating}</Text></Text>
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  animeDetailsContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    backgroundColor: '#fff',
  },
  posterImage: {
    borderColor: 'rgba(0, 0, 0, 0.55)',
    borderWidth: 2,
    width: 275,
    height:  385,
    marginRight: 10,
    marginTop: 25,
    borderRadius: 15,
    alignSelf: 'center',
    marginBottom: 10,
    resizeMode: 'cover',
    
  },
  animeDetailsInfo: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    fontSize: 35,
    textShadowColor: 'white',
    textShadowOffset: { width: 0.9, height: 0.9 },
    textShadowRadius: 4,
    alignSelf: 'center',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  description: {
    fontSize: 50,
    marginBottom: 15,
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 23,
  },
  streamingLinksList: {
    marginTop: 5,
    marginBottom: 15,
  },
  link: {
    color: 'blue',
    fontSize: 18,
  },
  backgroundImage: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.5, // opcional: si desea agregar transparencia a la imagen
  },
});

export default AnimeDetails;