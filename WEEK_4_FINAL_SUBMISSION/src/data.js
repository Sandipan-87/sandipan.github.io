export const API_KEY = 'AIzaSyAjShrIR88_kR9Uc3a3OtyDWcO6SW_D43Y';

export const value_converter = (value) =>{
    if(value>=1000000)
    {
        return Math.floor(value/1000000)+"M";
    }
    else if(value>=1000){
        return Math.floor(value/1000)+"K";
    }
    else{
        return value;
    }
}