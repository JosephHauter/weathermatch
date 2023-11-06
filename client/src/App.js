import React, { useEffect, useState } from 'react';
function App() {
  
  const [activitiesData, setActivitiesData] = useState([]);
  const [placesData, setPlacesData] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('New York');
  const [inputLocation, setInputLocation] = useState('New York');
  
  useEffect(() => {
    fetch(`/api/weather?location=${location}`)
      .then(response => response.json())
      .then(data => setWeatherData(data));

      fetch(`/api/activities?location=${location}`)
      .then(response => response.json())
      .then(data => {
        if (data._embedded && data._embedded.events) {
          setActivitiesData(data._embedded.events);
        } else {
          setActivitiesData([]);
        }
      });

      fetch(`/api/places?location=${location}`)
    .then(response => response.json())
    .then(data => {
      if (data && data.results) {
        setPlacesData(data.results);
      } else {
        setPlacesData([]);
      }
    });
  }, [location]);

  const handleInputChange = (event) => {
    setInputLocation(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLocation(inputLocation);
  };

  return (
    <div>
      <header className="header">
        <h1>Weather Match</h1>
        <h3>Looking for something to do with your friends/date depending on the weather? 🌦</h3>
        <p>Socials:</p>
        <nav>
          <a href="https://github.com/JosephHauter" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/JosephHauter" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </nav>
      </header>
      <div className="header-container">
        {/*Input field for APIS you put States/Cities  */}
        <h3>Input State/ City/ Country 🔠</h3>
  <form onSubmit={handleSubmit} className="location-form">
    <input type="text" value={inputLocation} onChange={handleInputChange} />
    <button type="submit">Submit</button>
  </form>
  {/* Openweather map API */}
  {weatherData && (
  <div className="weather-data">
    <h2>{weatherData.name}</h2>
    <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="Weather icon" />
    <p>{weatherData.main.temp}°K</p>
    <p>{weatherData.main.temp -273.15}°C</p>
    <p>{(weatherData.main.temp -273.15)*9/5+32}°F</p>
  </div>
)}

</div>
<div className="content-container">
      {/*displays places api stuff  */}
      <div className="events-container">
  <h1>🏞Places:</h1>
  {placesData && placesData.map((place, index) => (
    <div key={index} className="event">
<img src={place.categories[0].icon.prefix + '88' + place.categories[0].icon.suffix} alt={place.name} className="place-image" />
      <div className="event-info">
        <h2>{place.name}</h2>
        <p>Type: {place.categories[0].name}</p>
        <p>Address: {place.location.address}</p>
      </div>
    </div>
  ))}
</div>


      {/* display ticketmaster api events */}
      <div className="events-container">
        <h1>🌆Events:</h1>
        {activitiesData && activitiesData.map((event, index) => (
          <div key={index} className="event">
            <img src={event.images[0].url} alt={event.name} className="event-image" />
            <div className="event-info">
              <h2>{event.name}</h2>
              <p>Type: {event.type}</p>
              <p>Date: {event.dates.start.localDate}</p>
              <p>Time: {event.dates.start.localTime}</p>
              <p><a href={event.url}>Event Link</a></p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>

  );
}

export default App;