require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
// Weather Match API
app.get('/api/weather', async (req, res) => {
    const location = req.query.location;
  
    if (!location) {
      return res.status(400).json({ error: 'Bad Request: Missing location parameter' });
    }
    // Get the latitude and longitude from the Geocoding API
    const geoResponse = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${process.env.OPEN_WEATHER_API_KEY}`);
    const { lat, lon } = geoResponse.data[0];
    // Use the latitude and longitude to get the weather data
    const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_API_KEY}`);
    res.json(weatherResponse.data);
});
// Ticketmaster API
app.get('/api/activities', async (req, res) => {
    const location = req.query.location;
    
    if (!location) {
      res.status(400).json({ error: 'Location query parameter is required' });
      return;
    }
  
    const response = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?city=${location}&apikey=${process.env.TICKETMASTER_API_KEY}`);
    res.json(response.data);
});
// Foursquare places api
app.get('/api/places', async (req, res) => {
    const location = req.query.location;
    
    if (!location) {
      res.status(400).json({ error: 'Location query parameter is required' });
      return;
    }
  
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: process.env.FOURSQUARE_API_KEY
      }
    };
  
    const response = await axios.get(`https://api.foursquare.com/v3/places/search?near=${location}`, options);
    res.json(response.data);
});

app.listen(5000, () => console.log('Server running on port 5000'));
