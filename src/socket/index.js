import { io } from "socket.io-client";
import { actions } from "../states/actions";
import Session from "../storage/Session";
import IndexedDB from "../databse"



const initSocket = (dispatch) => {
    let authentication = { auth: { token: Session.getUserData().token } }
    // let authentication = {auth: {  token: ""+Session.getUserData().token}}
    let socket = io.connect('http://192.168.0.109:5000', authentication)
    //  socket = io('http://44.206.245.7:5000')
    // const socket = io()

    socket.on("disconnect", () => {
        dispatch(actions.ConnectionAction.setConnection(false))
    })

    // On Successfull connection after secure handshake
    socket.on("" + Session.getUserData()._id + "_connection", (data) => {
        dispatch(actions.ConnectionAction.setConnection(true))
        socket.on("" + data.unique_key, (data) => {
            performUniqueKeyOperations(socket, data.type, data.data)
        })
    })

    socket.on("" + Session.getUserData()._id, (data) => {
        alert(JSON.stringify(data))
        dispatch(actions.ConnectionAction.setConnection(true))
    })

    socket.on("connect_error", (err) => {
        if(err.hasOwnProperty('data')){
            IndexedDB.clearDB();
            localStorage.clear();
            alert("It seems you are logged in another device, please Login again on this device")
            window.location.reload(false);
            socket.disconnect()
        }
        else{alert('Please check your network Connection')}
    });
}

const performUniqueKeyOperations = async (socket, type, data) => {
    switch (type) {
        case "LOGOUT":
            IndexedDB.clearDB();
            localStorage.clear();
            alert("It seems you are logged in another device, please Login again on this device")
            window.location.reload(false);
            socket.disconnect()
            break;
        case "ALERT":
            alert("" + data.data)
            break;
        default:
            alert("No Operation defined for " + type)
            break;
    }
}





export default { initSocket }