import { useEffect, useState } from "react";
import "./App.css";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Switch from "@material-ui/core/Switch";
import CloudWithSunIcon from './comp/CloudWithSunIcon';
import SunIcon from './comp/SunIcon';
import HotIcon from './comp/HotIcon';
import SnowBallIcon from './comp/SnowBallIcon';
import CloudsIcon from './comp/CloudsIcon';

function App() {
  const API_KEY = "40606d1a7691345518b8f45275e22d47";
  const [lang, setLang] = useState("eng");
  const cities = ['Warsaw', 'Paris', 'Madrid', 'Berlin', 'Barcelona', 'Rio', 'New York', 'Chicago', 'London', 'Rome', 'Tokyo']
  const [city, setCity] = useState(cities[Math.floor(Math.random()*cities.length)]);
  const FetchURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=${lang}&appid=${API_KEY}`;
  const [data, setData] = useState([]);
  const [isPolish, setIsPolish] = useState(false);
  const [hours, setHours] = useState('') 
  const minutes = new Date().getUTCMinutes()
  // console.log( hours);




  const time = new Date().toLocaleDateString();
  // const [hours, setHours] = useState(new Date().getUTCHours());
  const weekDaysPolish = [
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
    "Niedziela",
  ];

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  
  useEffect(() => {
    fetch(FetchURL)
      .then((res) => res.json())
      .then((res) => {
        if (res.cod === 200) {
          setData(res);

            let newHours  = new Date().getUTCHours()
            newHours += res.timezone/3600
            if(newHours >= 24 ){
              newHours-=24
              setHours(newHours)
            }else{
              setHours(new Date().getUTCHours() +res.timezone/3600)
            }
            
          

        }
      });

    if (!localStorage.getItem("isPolish")) {
      localStorage.setItem("isPolish", false);
    }
    if (localStorage.getItem("isPolish") === "false") {
      setIsPolish(false);
    } else {
      setIsPolish(true);
    }
  }, [city, FetchURL]);

  return (
    <div className="app">
      <div className="weatherApp">
        <div className="inputCity">
          <h2>{isPolish ? "Podaj nazwe miasta" : "Enter city name"}</h2>
          <TextField
            value={city}
            onChange={(e) => setCity(e.target.value)}
            id="outlined-basic"
            label={isPolish ? "Miasto" : "City"}
            variant="outlined"

          />
        </div>
        {data.main ? (
          <div className="answerData">
            <div className="location">
              <h1 className="cityName">
                {data.name}, {data.sys.country}
              </h1>
              <div  title={`${data.clouds.all}% sky in clouds`} className="temperatureAnswer">
                {data.main.temp > 0 ? ( //CHECK TEMPERATURE
                <div>{data.clouds.all < 50 ? (<div>{data.clouds.all > 25 ? <CloudWithSunIcon /> : <div>{data.main.temp < 30 ? <SunIcon/> : <HotIcon/>}</div> }</div>) : 
                <div><CloudsIcon/></div> }</div> // CHECK CLOUDS 
              ) : (
                <SnowBallIcon/>
              )}
              </div>
              

              <div className="localeTime">
                <p>
                  {isPolish
                    ? `${weekDaysPolish[new Date().getDay() - 1]}`
                    : `${weekDays[new Date().getDay() - 1]}`}
                </p>
                <p>{new Date().getDay() < 10 ? `0${time}` : time}</p>
                  <p>{hours< 10 ? `0${hours}:${minutes}` : `${hours}:${minutes}`}</p>
              </div>
            </div>

            <div className="temperature">
              <h2 title="Current" className="primaryTemperature">{`${Math.round(data.main.temp)}℃`}</h2>
              <h4 title="MAX/MIN" className="secondaryTemperature">{`${Math.round(data.main.temp_max)}℃ / ${Math.round(
                data.main.temp_min
              )}℃`}</h4>
            </div>
          </div>
        ) : (
          <CircularProgress />
        )}
      </div>
      <div className="languageSwitch">
        ENG
        <Switch
          color="default"
          id="switch"
          checked={isPolish}
          onChange={() => {
            let previousIsPolish;
            setIsPolish((prev) => !prev);
            setLang((prev) => (prev === "eng" ? "pl" : "eng"));
            if (localStorage.getItem("isPolish") === "false") {
              previousIsPolish = "true";
            } else {
              previousIsPolish = "false";
            }
            localStorage.setItem("isPolish", previousIsPolish);
          }}
        />
        PL
      </div>
          
    </div>
  );
}

export default App;


// CLOUDS --> 
  // CLOUDS -> 
  // SUN --> COLD/ HOT