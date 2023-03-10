import { auth } from './firebase';

const LogoutButton = () => {
  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <button className='logoutButton'  onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;