import Endpoints from '../../endpoints';
import Client from '../../api-client/';
import Storage from '../../../storage';


class ChatService {
    getChatWithReadMessages = () => Client.API_CLIENT.get("" + Endpoints.v1.ALL_CHAT_WITH_READ_MESSAGE, {params:{user_id: ""+Storage.Session.getUserData()._id }})
}


export default new ChatService();
