import React from 'react';
import './Sidebar.css';
import SidebarChat from './SidebarChat';

import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { useSelector } from 'react-redux';
import { useStateValue } from '../../../src/StateProvider';

const Sidebar = () => {
    const [{ user }, dispatch] = useStateValue();

    const rooms = useSelector(state => state);
    console.log(rooms);

    return (
        <div className='sidebar'>
            <div className='sidebar__header'>
                <div className='sidebar__avatar'>
                    <Avatar 
                        alt={user?.displayName} 
                        src={user?.photoURL} /> 

                </div>
                <div className='sidebar__headerRight'>
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className='sidebar__search'>
                <div className='sidebar__searchContainer'>
                    <SearchOutlinedIcon />
                    <input placeholder='Search or start new chat' type='text' />
                </div>
            </div>

            <div className='sidebar__chats'>
                <SidebarChat addNewChat/>
                {rooms.map((room) => (
                    <SidebarChat 
                        key={room._id} 
                        id={room._id} 
                        name={room.room} 
                        messages={room.messages}
                    />
                ))}
            </div>
        </div>
    )
}

export default Sidebar
