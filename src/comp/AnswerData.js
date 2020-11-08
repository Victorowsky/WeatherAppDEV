const AnswerData = ({data, imgLink , isPolish, hours}) => {
    const weekDaysPolish = [
        "Niedziela",
        "Poniedziałek",
        "Wtorek",
        "Środa",
        "Czwartek",
        "Piątek",
        "Sobota",
      ];
    
      const weekDays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
  const time = new Date().toLocaleDateString();
  const minutes = new Date().getUTCMinutes()

    return ( 
        <div className="answerData">
        <div className="location">
          <h1 className="cityName">
            {data.name}, {data.sys.country}
          </h1>


          <div title={`Clouds: ${data.clouds.all}%`} className="temperatureAnswer2">
            <img className="weatherIcon" src={imgLink} alt="" srcSet=""/>
          </div>
          

          <div className="localeTime">
            <p>
              {isPolish
                ? `${weekDaysPolish[new Date().getDay()]}`
                : `${weekDays[new Date().getDay()]}`}
            </p>
            <p>{new Date().getDay() < 10 ? `0${time}` : time}</p>
              <div>{hours < 10 ?
                <p>{minutes < 10 ? `0${hours}:0${minutes}` : `0${hours}:${minutes}` }</p> : 
                <p>{minutes < 10 ? `${hours}:0${minutes}` : `${hours}:${minutes}` }</p>}</div>
          </div>
        </div>

        <div className="temperature">
          <h2 title="Current" className="primaryTemperature">{`${Math.round(data.main.temp)}℃`}</h2>
          <h4 title="MAX/MIN" className="secondaryTemperature">{`${Math.round(data.main.temp_max)}℃ / ${Math.round(
            data.main.temp_min
          )}℃`}</h4>
        </div>
      </div>
     );
}
 
export default AnswerData;