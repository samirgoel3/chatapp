import Endpoints from '../../endpoints';
import Client from '../../api-client/';
class AuthenticationService {

    getLogin = (email, password) => Client.API_CLIENT.post("" + Endpoints.v1.LGOIN, { email, password })
    getSignUp = (formData) => Client.API_CLIENT.post("" + Endpoints.v1.CREATE_USER, formData)

}
export default new AuthenticationService();
