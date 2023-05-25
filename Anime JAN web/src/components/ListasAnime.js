import React, { useState } from 'react';
import AnimeDetails from './AnimeDetails';

const ListasAnime = () => {
  const [favorites, setFavorites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [message, setMessage] = useState("");
  
  const addToFavorites = (anime) => {
    if (!favorites.some((f) => f.id === anime.id)) {
      setFavorites([...favorites, anime]);
      setMessage("The anime was successfully added to the favorites list");
    } else {
      setMessage("The anime is already in the favorites list");
    }
  };
  
  const addToWatchlist = (anime) => {
    if (!watchlist.some((w) => w.id === anime.id)) {
      setWatchlist([...watchlist, anime]);
      setMessage("The anime was successfully added to the watchlist");
    } else {
      setMessage("The anime is already in the watchlist");
    }
  };
  
  const addToCompleted = (anime) => {
    if (!completed.some((c) => c.id === anime.id)) {
      setCompleted([...completed, anime]);
      setMessage("The anime was successfully added to the completed list");
    } else {
      setMessage("The anime is already in the completed list");
    }
  };

  const removeFromFavorites = (anime) => {
    setFavorites(favorites.filter((favAnime) => favAnime.id !== anime.id));
  };

  const removeFromWatchlist = (anime) => {
    setWatchlist(watchlist.filter((watchAnime) => watchAnime.id !== anime.id));
  };

  const removeFromCompleted = (anime) => {
    setCompleted(completed.filter((compAnime) => compAnime.id !== anime.id));
  };

  const handleHideMessage = () => {
    setShowMessage(false);
    setMessage('');
  };

  return (
    <div className="container-fluid">
    <div>
      {showMessage && (
        <div>
          <p>{message}</p>
          <button onClick={handleHideMessage}>Close</button>
        </div>
      )}
      <h2>Favorites</h2>
      {favorites.map((anime) => (
        <div key={anime.id}>
          <img src={anime.attributes.posterImage.small} alt="Anime poster" />
          <p>{anime.attributes.canonicalTitle}</p>
          <button onClick={() => removeFromFavorites(anime)}>Remove from Favorites</button>
        </div>
      ))}
      <h2>Watchlist</h2>
      {watchlist.map((anime) => (
        <div key={anime.id}>
          <img src={anime.attributes.posterImage.small} alt="Anime poster" />
          <p>{anime.attributes.canonicalTitle}</p>
          <button onClick={() => removeFromWatchlist(anime)}>Remove from Watchlist</button>
        </div>
      ))}
      <h2>Completed</h2>
      {completed.map((anime) => (
        <div key={anime.id}>
          <img src={anime.attributes.posterImage.small} alt="Anime poster" />
          <p>{anime.attributes.canonicalTitle}</p>
          <button onClick={() => removeFromCompleted(anime)}>Remove from Completed</button>
        </div>
      ))}
      <h2>Anime Details</h2>
      <AnimeDetails
        addToFavorites={addToFavorites}
        addToWatchlist={addToWatchlist}
        addToCompleted={addToCompleted}
      />
    <p>{message}</p>
  </div>
  </div>
  );
};

export default ListasAnime;