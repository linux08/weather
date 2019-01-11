import axios from 'axios';


export const getWeather = async () => {
    try {
        const resp = await axios.get('http://api.openweathermap.org/data/2.5/weather?q=Lagos,ng&APPID=4fc8853b78461373695afcd65ad458b5');
        return resp;
    } catch (err) {
        return err;
    }
};
