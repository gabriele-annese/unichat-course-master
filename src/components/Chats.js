import React, { useRef, useState, useEffect } from  'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';

import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Chat = () => {
  const history = useHistory();
  const { user } = useAuth();
  const [ loading, setLoading] = useState(true);

  const handleLogout = async () => {
      await auth.signOut();
      history.push('/');
  }

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], "userPhoto.jpg", { type: 'image/jpeg' })
  }

  useEffect( () => {
    if(!user) {
      history.push('/');

      return;
    }

    axios.get('https://api.chatengine.io/users/me', {
        headers: {
          "project-id": "74956438-4c59-4d91-9127-a3aaf25b0560",
          "user-name": user.email,
          "user-secret": user.uid,
        }
    })

    .then(() => {
      setLoading(false);
    })

    .catch(() => {
      let formdata = new FormData();
      formdata.append('email', user.email );
      formdata.append('username', user.email);
      formdata.append('secret', user.uid);

      getFile(user.photoURL)
        .then((avatar) => {
          formdata.append('avatar', avatar, avatar.name);

          axios.post('https://api.chatengine.io/users/', formdata, { headers: {"private-key": "2cf5cf82-6f61-48b6-ace6-fda0534bd759"}})
          .then(() => setLoading(false))
          .catch((error) => console.log(error));
        })
    })
  }, [user, history]);


  return (
    <div className='chats-page'>
        <div className='nav-bar'>
            <div className='logo-tab'>
                Unichat
            </div>
            <div onClick={handleLogout} className='logout-tab'>
                Logout
            </div>
        </div>
        <ChatEngine
          height="calc(100vh - 66px)"
          projectID='74956438-4c59-4d91-9127-a3aaf25b0560'
          userName='Gabri'
          userSecret='pass123'
        />
    </div>
  )
}

export default Chat