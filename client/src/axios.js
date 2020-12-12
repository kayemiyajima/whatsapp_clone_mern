import axios from 'axios';

const baseURL = 'https://whatsapp-clone-project.herokuapp.com';

export const fetchRooms = () => axios.get(`${baseURL}/room/sync`);
export const addRoom = (newRoom) => axios.post(`${baseURL}/room`, newRoom);
export const patchMessage = (newMessages) => axios.patch(`${baseURL}/room/${newMessages.id}`, newMessages);
export default axios; 
