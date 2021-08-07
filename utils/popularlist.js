require('dotenv').config();
const api_key = process.env.API_KEY;
var axios = require("axios").default;
const popularlist = (callback) => {
  var options = {
    method: 'GET',
    url: 'https://data-imdb1.p.rapidapi.com/movie/order/upcoming/',
    headers: {
      'x-rapidapi-key': api_key,
      'x-rapidapi-host': 'data-imdb1.p.rapidapi.com'
    }
  };
      
    


      axios.request(options).then(function (response) {
        //console.log(response.data);
        callback(undefined, {
          listis:response.data
      })

      }).catch(function (error) {
        console.error(error);
        callback('Unable to connect to location services!', undefined)
      });
}
  module.exports = popularlist