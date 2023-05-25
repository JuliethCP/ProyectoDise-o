import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import './SearchBar.css';




function Navbar() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);


  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Yin_and_Yang_symbol.svg/800px-Yin_and_Yang_symbol.svg.png" alt="" width="30" height="24" class="d-inline-block align-text-top" />
          ANIME JAN</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/">Home</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Categories
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="/category/action">Action</a> </li>
                <li><a class="dropdown-item" href="/category/romance">Romance</a></li>
                <li><a class="dropdown-item" href="/category/adventure">Adventure</a></li>
                <li><a class="dropdown-item" href="/category/comedy">Comedy</a></li>
                <li><a class="dropdown-item" href="/category/drama">Drama</a></li>
                <li><a class="dropdown-item" href="/category/sports">Sports</a></li>
                <li><a class="dropdown-item" href="/category/horror">Horror</a></li>
                <li><a class="dropdown-item" href="/category/isekai">Isekai</a></li>
                <li><a class="dropdown-item" href="/category/fantasy">Fantasy</a></li>
                <li><a class="dropdown-item" href="/category/shounen">Shounen</a></li>
                <li><a class="dropdown-item" href="/category/mystery">Mystery</a></li>
                <li><a class="dropdown-item" href="/category/thriller">Thriller</a></li>
                
              </ul>
            </li>
          </ul>
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
            <a className="nav-link" href="#">
                <span class="bi bi-person"></span>
              </a>
            </li>
            <span class="navbar-text">
              Usuario:   {user ? user.displayName : 'Invitado'}
            </span>
            <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img src={user ? user.photoURL : 'https://mdbootstrap.com/img/Photos/Avatars/avatar-5.jpg'} alt="avatar image" class="rounded-circle" height="35"/>
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#">Profile</a></li>
              <li><a class="dropdown-item" href="#">Settings</a></li>
              <li><hr class="dropdown-divider"/></li>
              <li><a class="dropdown-item" onClick={handleLogout}  href="/login">Logout</a></li>
            </ul>
          </li>
          </ul>
        </div>
      </div>
    </nav>
      );
    }

export default Navbar;