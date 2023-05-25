import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { auth } from './firebase';
import LoginPage from './LoginPage';
import AnimeList from "./components/AnimeList";
import AnimeDetails from "./components/AnimeDetails";
import Navbar from './components/NavBar';
import "./App.css";
import Home from './Home';
import SearchBar from './components/SearchBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import $ from 'jquery';
import Category from './components/Categories';

window.jQuery = $;
window.$ = $;

const App = () => {
  const [user, setUser] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/login">
          <Home />
          {user ? <Redirect to="/" /> : <LoginPage />}
        </Route>
        <Route exact path="/">
          {user ? (
            <div>
              <div className='welcome'>
                <SearchBar onSearch={(results) => setSearchResults(results)} />
                <AnimeList />
              </div>
            </div>
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route exact path="/searchresults">
          {user ? (
            <div>
              <div className='welcome'>
                <SearchBar onSearch={(results) => setSearchResults(results)} />
              </div>
            </div>
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/anime/:animeName" component={AnimeDetails} />
        <Route  path="/category/:category" component={Category} />
      </Switch>
    </Router>
  );
};

export default App;