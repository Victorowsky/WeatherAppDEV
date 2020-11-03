import { useEffect, useState } from "react";
import "./App.css";
import TextField from "@material-ui/core/TextField";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import CircularProgress from "@material-ui/core/CircularProgress";
import Switch from "@material-ui/core/Switch";

function App() {
  const API_KEY = "40606d1a7691345518b8f45275e22d47";
  const [city, setCity] = useState("Warsaw");
  const [lang, setLang] = useState("eng");
  const FetchURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=${lang}&appid=${API_KEY}`;
  const [data, setData] = useState([]);
  const [isPolish, setIsPolish] = useState(false);

  const time = new Date().toLocaleDateString();
  const [hours, setHours] = useState(new Date().getUTCHours());
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

  const checkHours = () => {
    if (hours > 24) {
      setHours((prev) => console.log(prev - 24));
    }
  };

  useEffect(() => {
    fetch(FetchURL)
      .then((res) => res.json())
      .then((res) => {
        if (res.cod === 200) {
          setData(res);
        }
      });
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
            color="white"
          />
        </div>
        {data.main ? (
          <div className="answerData">
            <div className="location">
              <h1 className="cityName">
                {data.name}, {data.sys.country}
              </h1>
              {data.main.temp > 0 ? (
                <WbSunnyIcon
                  onClick={(e) => e.target.classList.add("round")}
                  fontSize="large"
                  style={{ color: "#faa307" }}
                />
              ) : (
                <AcUnitIcon
                  fontSize="large"
                  color="inherit"
                  style={{ color: "#0096c7" }}
                />
              )}

              <div className="localeTime">
                <p>
                  {isPolish
                    ? `${weekDaysPolish[new Date().getDay() - 1]}`
                    : `${weekDays[new Date().getDay() - 1]}`}
                </p>
                <p>{new Date().getDay() < 10 ? `0${time}` : time}</p>
              </div>
            </div>

            <div className="temperature">
              <h2>{`${Math.round(data.main.temp)}℃`}</h2>
              <h4>{`${Math.round(data.main.temp_max)}℃ / ${Math.round(
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
            setIsPolish((prev) => !prev);
            setLang((prev) => (prev === "eng" ? "pl" : "eng"));
          }}
        />
        PL
      </div>
    </div>
  );
}

export default App;
