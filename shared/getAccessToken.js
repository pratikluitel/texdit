import appInfo from '../shared/appInfo'
import { encode } from "base-64";

export default function getAccessToken(){
    //checks if user was already logged in,
    //if logged in use refresh token, else generate an access token

    var details = {
        'grant_type':'authorization_code',
        'code':appInfo.code,
        'redirect_uri':appInfo.redirectUri
    }
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    console.log(formBody)

    fetch('https://www.reddit.com/api/v1/access_token',{
        method:'post',
        headers:new Headers({
            'Authorization':'Basic '+encode(appInfo.clientId+':'+''),
            'Content-Type':'application/x-www-form-urlencoded'
        }),
        body: formBody
    }).then(response => {
        if (response.ok){
            return response;
        }
        else {
            var error = new Error('Error '+ response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(resp=>resp.json()).then((resp)=>{
        console.log('\n',resp)
        if(resp.error){
            throw resp.error
        }
        appInfo.accessToken = resp.access_token
        appInfo.refreshToken = resp.refresh_token
        console.log(resp)
        appInfo.loggedIn = true
    },err=>console.log('Error in response',err)).catch(err =>{
        console.log('Error in fetching token',err)
    })
}