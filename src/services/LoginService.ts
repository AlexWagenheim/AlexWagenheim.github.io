import axios from "axios";

const serverUrl = process.env.REACT_APP_OAUTH_URL;
axios.defaults.baseURL = serverUrl;

const clientId = process.env.REACT_APP_OAUTH_CLIENT_ID;
const authHeaderValue = process.env.REACT_APP_OAUTH_AUTH_HEADER;
const redirectUri = process.env.REACT_APP_OAUTH_REDIRECT_URI;

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const UPDATE_TOKEN_INTERVAL = "expires_in";

const requestParams = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectUri
} as unknown as URLSearchParams);

let intervalID: NodeJS.Timer;

export default class LoginService {


    static login() {
        window.location.href = serverUrl + "/oauth2/authorize?" + requestParams;
    }

    static logout() {
        window.location.href = serverUrl + "/logout";
        sessionStorage.removeItem(ACCESS_TOKEN_KEY);
        sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    }

    static async getTokens(code: string) {

        let payload = new FormData()
        payload.append('grant_type', 'authorization_code')
        payload.append('code', code)
        payload.append('redirect_uri', redirectUri !== undefined ? redirectUri.toString(): "error")
        payload.append('client_id', clientId !== undefined ? clientId.toString(): "error")

        await axios.post('/oauth2/token', payload, {
                headers: {
                    'Content-type': 'application/url-form-encoded',
                    'Authorization': authHeaderValue
                }
            }
        ).then((response) => {
            window.sessionStorage.setItem(ACCESS_TOKEN_KEY, response.data[ACCESS_TOKEN_KEY]);
            window.sessionStorage.setItem(REFRESH_TOKEN_KEY, response.data[REFRESH_TOKEN_KEY]);

            clearInterval(intervalID);

            intervalID =  setInterval(() => {
                this.updateTokens();
            }, (response.data[UPDATE_TOKEN_INTERVAL] - 10)*1000);

        }).catch((error) => {
            console.log("getTokens() -> Error: ", JSON.stringify(error));
        });
    }

    static async updateTokens() {

        let payload = new FormData()
        const token = window.sessionStorage.getItem(REFRESH_TOKEN_KEY);

        console.log("Updating tokens")

        payload.append('grant_type', 'refresh_token')
        payload.append('refresh_token', token != null ? token : "error")
        // payload.append('redirect_uri', redirectUri !== undefined ? redirectUri.toString(): "error")
        payload.append('client_id', clientId !== undefined ? clientId.toString(): "error")

        await axios.post('/oauth2/token', payload, {
                headers: {
                    'Content-type': 'application/url-form-encoded',
                    'Authorization': authHeaderValue
                }
            }
        ).then((response) => {
            window.sessionStorage.setItem(ACCESS_TOKEN_KEY, response.data[ACCESS_TOKEN_KEY]);
            window.sessionStorage.setItem(REFRESH_TOKEN_KEY, response.data[REFRESH_TOKEN_KEY]);

            clearInterval(intervalID);

            intervalID =  setInterval(() => {
                this.updateTokens();
            }, (response.data[UPDATE_TOKEN_INTERVAL] - 10)*1000);
        }).catch((error) => {
            console.log("getTokens() -> Error: ", JSON.stringify(error));
        });
    }



    static async getTokenInfo() {
        const token = window.sessionStorage.getItem(ACCESS_TOKEN_KEY);
        let payload = new FormData();

        console.log("getTokenInfo -> token: " + token);
        payload.append('token', token != null ? token : "error");

        return  axios.post('/oauth2/token-info', payload, {
            headers: {
                'Authorization': authHeaderValue
            }
        });

    }

}