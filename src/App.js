import { useEffect, useState } from "react";
import "./App.css";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Switch from "@material-ui/core/Switch";
import AnswerData from "./comp/AnswerData";
import Bookmarks from "./comp/Bookmarks";

function App() {
  const API_KEY = "40606d1a7691345518b8f45275e22d47";
  const [lang, setLang] = useState("eng");
  const cities = [
    "Warsaw",
    "Paris",
    "Madrid",
    "Berlin",
    "Barcelona",
    "Rio",
    "New York",
    "Chicago",
    "London",
    "Rome",
    "Tokyo",
  ];
  const polishCities = [
    "Warszawa",
    "Paryż",
    "Madryt",
    "Berlin",
    "Barcelona",
    "Rio",
    "Nowy York",
    "Chicago",
    "Londyn",
    "Rome",
    "Tokio",
  ];
  const [city, setCity] = useState();
  const FetchURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=${lang}&appid=${API_KEY}`;
  const [iconID, setIconID] = useState("01d");
  const imgLink = `https://openweathermap.org/img/wn/${iconID}@2x.png`;
  const [data, setData] = useState([]);
  const [isPolish, setIsPolish] = useState(false);
  const [hours, setHours] = useState("");
  const [bookMarkedCities, setBookMarkedCities] = useState([]);

  useEffect(() => { // PAGE LOADS
    if (!isPolish) {
      setCity(cities[Math.floor(Math.random() * cities.length)]);
    } else {
      setCity(polishCities[Math.floor(Math.random() * polishCities.length)]);
    }

    if(localStorage.getItem('bookMarkedCities')){ // DOWNLOADING BOOKMARKS FORM LOCALSTORAGE (PAGE LOADS)
          JSON.parse(localStorage.getItem("bookMarkedCities")).forEach(city=>{
      setBookMarkedCities(prev => [...prev, city])
    })
    }



  }, []);

  useEffect(() => { // FETCHING DATA FROM API , SETTING LANGUAGE (BUGGED)
    fetch(FetchURL)
      .then((res) => res.json())
      .then((res) => {
        if (res.cod === 200) {
          setData(res);
          let newHours = new Date().getUTCHours();
          newHours += res.timezone / 3600;
          if (newHours >= 24) {
            newHours -= 24;
            setHours(newHours);
          } else {
            setHours(new Date().getUTCHours() + res.timezone / 3600);
          }
          setIconID(res.weather[0].icon);
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


  useEffect(()=>{ // ADDING BOOKMARKS TO LOCALSTORAGE
    localStorage.setItem("bookMarkedCities", JSON.stringify(bookMarkedCities))
  
  },[bookMarkedCities])


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
          <AnswerData
            bookMarkedCities={bookMarkedCities}
            setBookMarkedCities={setBookMarkedCities}
            data={data}
            imgLink={imgLink}
            isPolish={isPolish}
            hours={hours}
            city={city}
          />
        ) : (
          <CircularProgress />
        )}
      </div>
      <Bookmarks setCity={setCity} bookMarkCities={bookMarkedCities} />

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
