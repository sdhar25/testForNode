require('dotenv').config();
const api_key = process.env.API_KEY;
const request = require('request')
const films = (search,callback) => {
    const options = {
        method: 'GET',
        url: 'https://series-movies-imdb.p.rapidapi.com/movie/search/'+search,
        headers: {
          'x-rapidapi-key': api_key,
          'x-rapidapi-host': 'series-movies-imdb.p.rapidapi.com',
          useQueryString: true
        }
      };
      
      request(options, function (error, response, body) {
          if (error) {
            callback('Unable to connect to location services!', undefined)
          }
            else
            {
                callback(undefined, {
                    latitude:JSON.parse(body)
                })
            }
          
      });
}
  module.exports = films