import React from 'react';
import './App.scss';
// import Navbar from './components/organisms/Navbar';
import { useSelector } from 'react-redux';
import Login from './components/pages/Login';

function App() {
  const { loading, error, user } = useSelector((state) => ({ loading: state.auth.loading, error: state.auth.error, user: state.auth.user }));
  console.log(loading, error, (user && user.data[0].id));
  return (
    <div className="App">
      <Login>  </Login>
      {user && user.data[0].email}
    </div>
  );
}

export default App;
