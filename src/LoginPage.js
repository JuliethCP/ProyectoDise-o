import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth, provider } from './firebase';

const LoginPage = () => {
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleGoogleLogin = async () => {
    try {
      const result = await auth.signInWithPopup(provider);
      // If authentication is successful, redirect to home page
      history.push('/home');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-page">
      <h1>Bienvenido a Anime</h1>
      {error && <div>{error}</div>}
      <button className="login-button" onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
};

export default LoginPage;