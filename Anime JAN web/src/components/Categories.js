import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './SearchBar.css';

function Category() {
  const [animes, setAnimes] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    axios.get(`https://kitsu.io/api/edge/anime?filter[genres]=${category}&sort=popularityRank&page[limit]=20`)
      .then(response => {
        setAnimes(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [category]);

  return (
    <div className="container-fluid -content-center align-items-center" style={{ background: '#fff url(https://images2.alphacoders.com/823/823422.png) right bottom/cover no-repeat padding-box fixed' }}> 
      <div className="row" > 
        {animes.map((anime) => (
          <div key={anime.id} className="card col-md-3 col-sm-2" style={{background: '#ffffff00', border: '#ffffff00', marginBottom: '15px', marginTop: '15px'}} >
            <div className="card-group text-center bg-transparent animate__animated animate__fadeInUp" style={{backgroundColor: 'white'}}>
              <img 
                src={anime.attributes.posterImage.medium} 
                alt="card-img-top" 
                style={{ width: '100%', borderRadius: '20px',backgroundColor: 'transparent'}}
              />
              <div className="anime-info " style={{backgroundColor: 'white', borderRadius: '20px', marginTop: '15px'}}>
                <h3>
                  <Link to={`/anime/${encodeURIComponent(anime.attributes.slug)}`} className="btn btn-outline-secondary border-0" style={{width: '100%', borderRadius: '20px',}}>
                  View Details of {anime.attributes.canonicalTitle}
                  </Link>
                </h3>
                <p>Rating: {anime.attributes.averageRating}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
