require('dotenv').config();

const api_key = process.env.API_KEY;
var detailis = [];
var axios = require("axios");
var listgot = [];
var movie_list= [];
let options;
const filmdetails = (imdb,callback) => {
  for(var i=0;i<imdb.length; i++){

    options = {
      method: 'GET',
      url: 'https://data-imdb1.p.rapidapi.com/movie/id/'+imdb[i]+'/',
      headers: {
        'x-rapidapi-key': api_key,
        'x-rapidapi-host': 'data-imdb1.p.rapidapi.com'
      }
    };
   // movie_list.push(axios(options))
    movie_list[i] = axios(options)
    //  listgot[i] = options;
  } 
  Promise.all(movie_list)
  .then(response=>{
    let updatedResponse=[];
    response.forEach(element => {
      updatedResponse.push(element.data);
    });
    callback(undefined,{
      detailis:updatedResponse
    })
  }) 
  .catch(function (error) {
        console.error(error);
        callback('Unable to connect to location services!', undefined)
      });

  

}


  


module.exports = filmdetails