import Localbase from 'localbase'
import Session from '../storage/Session';
import ChatUtils from '../utils/ChatUtils';



class IndexdbResolver {
    constructor() {
        this.db = new Localbase('chat-db')
    }


    addChatToDb = async (chatData, messages) => {
        this.db.collection('chats').add({
            chat_id: chatData._id,
            chatname: chatData.isgroupchat ? chatData.chatname : chatData.chatname.replace(Session.getUserData().username, "").replace("-", ""),
            isgroupchat: chatData.isgroupchat,
            users: chatData.users,
            groupadmin: chatData.groupadmin,
            createdAt: chatData.createdAt,
            identifier: ChatUtils.CreateIdentifier(chatData.users),
            messages: messages
        }, "" + chatData._id)
    }

    addNewChatToTop = async(obj) =>{
        return this.db.collection('chats').add(obj, "" + obj.chat_id)
    }


    clearDB = async () => {
        await this.db.delete()
    }



    getAllChat = async () => {
        let data = await this.db.collection('chats').orderBy('createdAt', 'desc').get();
        return data;
    }

    getSpecificChatByIdentifier = async(identifierVal)=>{
        let val = await this.db.collection('chats').doc({identifier:identifierVal}).get();
        return val;
    }

   

}


export default Object.freeze(new IndexdbResolver());