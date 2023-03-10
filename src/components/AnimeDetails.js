import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AnimeDetails = ({ match }) => {
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await axios.get(`https://kitsu.io/api/edge/anime/${match.params.id}`);
        const data = response.data.data;
        setAnime(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAnime();
  }, [match.params.id]);

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
      {anime ? (
        <div>
          <img src={anime.attributes.posterImage.medium} alt="Anime poster" />
          <h1>{anime.attributes.titles.en}</h1>
          <p>{anime.attributes.synopsis}</p>
          <p>Rating: {anime.attributes.averageRating}</p>
          <p>Start date: {anime.attributes.startDate}</p>
          <p>Age rating: {anime.attributes.ageRating}</p>
          <p>Status: {anime.attributes.status}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AnimeDetails;
