import React, { useState, useEffect } from 'react';
import './SidebarChat.css';
import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import moment from 'moment';
import { createRoom } from '../../action'
import { useDispatch } from "react-redux";

const SidebarChat = ({ id, name, messages, addNewChat }) => {
    const dispatch = useDispatch()
    const [seed, setSeed] = useState('');
    const [lastMessage, setLastMessage] = useState([]);

    useEffect(() => {    
        if (id) setLastMessage(messages[messages.length -1]);
    }, [id, messages, lastMessage ]);
    


    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    const createChat = () => {
        const newRoom = {
            room: prompt('Please enter name for chat')};

        if (newRoom) {
            dispatch(createRoom(newRoom));
        }
    };
    
    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className='sidebarChat'>
                <div className='sidebarChat__avatar'>
                    <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                </div>
                <div className='sidebarChat__info'>
                    <div className='sidebarChat__infoTop'>
                            <h2>{name}</h2>
                            <h3>{lastMessage ? moment(lastMessage.timestamp).format('LT') : null}</h3>
                    </div>
                    <div className='sidebarChat__infoDown'>
                        <p>
                        {lastMessage ? lastMessage.message : null}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    ): (
        <div onClick = { createChat } className='sidebarChat'>
            <h2>Add New Chat</h2>
        </div>
    );
}

export default SidebarChat
