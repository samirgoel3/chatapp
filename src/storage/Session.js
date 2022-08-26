
import IndexedDB from '../databse';

const saveuserDetails = (data)=>{
    localStorage.setItem('USER_DATA', data)    
}

const getUserData = ()=>{
    let data = localStorage.getItem('USER_DATA')
    let returningData = JSON.parse(data)
    return returningData;
}

const logout = ()=>{
    IndexedDB.clearDB();
    localStorage.clear();
    window.location.reload(false);
    global.socket.disconnect()
}

export default {saveuserDetails, getUserData, logout}