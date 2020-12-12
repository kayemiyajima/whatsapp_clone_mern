import React, { useState, useEffect } from 'react';
import Pusher from 'pusher-js';
import './Chat.css';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import MoodIcon from '@material-ui/icons/Mood';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';
import { useStateValue } from '../../StateProvider';
import { addMessage } from '../../action';
import moment from 'moment';


const Chat = () => {

    const dispatching = useDispatch();
    const [seed, setSeed] = useState('');
    const [input, setInput] = useState('');
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();
    const rooms = useSelector(state => state);
    const postMessage = {
        room: roomName,
        id: roomId,
        messages: {
            message: input,
            name: user.displayName,
            timestamp: new Date()
        }
    };
    
    useEffect(() => {
        let room = rooms.find(room => room._id === roomId);
        setRoomName(room.room);
        setMessages(room.messages);
    }, [roomId, rooms, messages]);

    useEffect(() => {
        var pusher = new Pusher('af06e6e76b8ff510b67d', {
          cluster: 'eu'
        });
    
        var channel = pusher.subscribe('messages');
        channel.bind('updated', (newMessage) => {
          setMessages([...messages, newMessage])
        });
    
        return () => {
          channel.unbind_all();
          channel.unsubscribe();
        };
      }, [messages]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    const sendMessage = async (e) => {
        e.preventDefault();
        console.log(postMessage);
        dispatching(addMessage(postMessage));

        setInput('');
    };

    return (
        <div className='chat'>
            <div className='chat__header'>
                <div className='chat__headerLeft'>
                    <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                    <div className='chat__headerInfo'>
                        <h3>{roomName}</h3>
                        <p>Tap for more info...</p>
                    </div>
                </div>
                <div className='chat__headerRight'>
                    <IconButton>
                        <SearchOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />  
                    </IconButton>                    
                </div>
            </div>

            <div className='chat__body'>
                {messages.map((message) => (
                    <p className={`chat__message ${message.name===user.displayName && "chat__reciever"}`}  key={message._id}>
                        <span className='chat__name'>{message.name}</span>
                        {message.message}
                        <span className='chat__timestamp'>
                            {moment(message.timestamp).format('lll')}
                        </span>
                    </p>
                ))}
            </div>

            <div className='chat__footer'>
                <MoodIcon />
                <form>
                    <input 
                        value={input} 
                        onChange ={(e) => setInput(e.target.value) }
                        placeholder='Type a message' 
                        type='text'
                    />
                    <button onClick={ sendMessage } type='submit'>
                        <SendIcon  />
                    </button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat