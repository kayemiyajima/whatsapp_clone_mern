import React, { useEffect } from 'react';
import './App.css';
import Sidebar from './components/sidebar_components/Sidebar';
import Chat from './components/chat_components/Chat';
import Login from './components/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getRooms } from './action';
import { useStateValue } from './StateProvider';


function App() {
  const dodispatch = useDispatch();
  const [{ user }, dispatch] = useStateValue();
  
  useEffect(() => {
    dodispatch(getRooms());
  }, [dodispatch]);

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className='app__body'>
        <Router>
          <Sidebar />

          <Switch>

            <Route path='/rooms/:roomId'>
              <Chat />
            </Route>

            <Route path='/'>
              {/* <Chat /> */}
            </Route>
          </Switch>
        </Router>
        </div>
      )} 
    </div>
  );
}

export default App;
