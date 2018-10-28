export default function getBaseUrl(){
    //Assume that the api server is on the same host, but just with port 3001
    return window.location.protocol + "//" + window.location.host.split(":")[0] + ":3001"
}