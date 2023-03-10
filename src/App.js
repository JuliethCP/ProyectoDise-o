import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { auth } from './firebase';
import LoginPage from './LoginPage';
import Home from './Home';
import LogoutButton from './LogoutButton';
import SearchBar from './components/SearchBar';
import AnimeList from "./components/AnimeList";
import "./App.css";
import './components/SearchBar.css'

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    
    <Router>
      <Route exact path="/login">
      <Home />
        {user ? <Redirect to="/" /> : <LoginPage />}
      </Route>
      <Route path="/">
        {user ? (
          <div>
            <div className='welcome'> 
            <SearchBar/>
            <AnimeList/>
            <LogoutButton />
            </div>
          </div>
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
    </Router>
  );
};

export default App;

