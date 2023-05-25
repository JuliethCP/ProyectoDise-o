import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AnimeDetails.css';

const AnimeDetails = ({ match }) => {
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [streamingLinks, setStreamingLinks] = useState([]);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://kitsu.io/api/edge/anime?filter[text]=${match.params.animeName}`);
        const data = response.data.data[0];
        setAnime(data);
        const streamingResponse = await axios.get(`https://kitsu.io/api/edge/anime/${data.id}/streaming-links`);
        const streamingData = streamingResponse.data.data;
        setStreamingLinks(streamingData);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchAnimeDetails();
  }, [match.params.animeName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!anime) {
    return <div>Anime not found</div>;
  }

  const { attributes: animeAttributes } = anime;

  return (
    <div className="container-fluid">
    <div className="anime-details-container">
      <img src={animeAttributes.posterImage.small} alt="Anime poster" />
      <div className="anime-details-info">
        <h1>{animeAttributes.canonicalTitle}</h1>
        {animeAttributes.description && <p><strong>Description:</strong> {animeAttributes.description}</p>}
        {streamingLinks.length > 0 &&
          <div>
            <p><strong>Streaming Links:</strong></p>
            <ul>
              {streamingLinks.map((link) => (
                <li key={link.id}><a href={link.attributes.url}>{link.attributes.url}</a></li>
              ))}
            </ul>
          </div>
        }
        {animeAttributes.startDate && <p><strong>Start Date:</strong> {animeAttributes.startDate}</p>}
        {animeAttributes.endDate && <p><strong>End Date:</strong> {animeAttributes.endDate}</p>}
        {animeAttributes.endDate ? null : <p><strong>Status:</strong> {animeAttributes.status}</p>}
        {animeAttributes.episodeCount && <p><strong>Episodes:</strong> {animeAttributes.episodeCount}</p>}
        <p><strong>Rating:</strong> {animeAttributes.averageRating}</p>
        <div className="anime-buttons">
          <button className="add-to-favorites"><i className="fas fa-heart"></i> FAVORITE</button>
          <button className="add-to-watchlist"><i className="fas fa-clock"></i> WAIT</button>
          <button className="add-to-completed"><i className="fas fa-check"></i> FINISH</button>
        </div>
      </div>
    </div>
    </div>
  );
  
};

export default AnimeDetails;