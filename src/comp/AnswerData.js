
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import { useRef } from "react";

const AnswerData = ({ data, imgLink, isPolish, setBookMarkedCities,  hours, bookMarkedCities, city }) => {
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
  const minutes = new Date().getUTCMinutes();


  
  const handleMark = (e) => {
    if(!e.target.getAttribute('d')){  // DISABLE BORDER CLICK
        e.target.classList.toggle("marked");
      if(e.target.classList.contains('marked')){
        setBookMarkedCities(prev=> [...prev, data.name])

      }else{
        setBookMarkedCities(prev=> {
        const cityIndex = prev.indexOf(data.name)
          let newArray = prev.filter((item, index)=> index !== cityIndex)
          return newArray
        })
      }
    }
   
    
  };


  const BookmarkBorderIconStyle = {
    alignSelf: "flex-end",
    transition : '0.3s'
  }
  
  const BookmarkButton = useRef()

  const isBookMarked = bookMarkedCities.filter(item=> item === data.name || item === city)

  if(isBookMarked.length > 0 && BookmarkButton.current ){
    BookmarkButton.current.classList.add("marked")

  }else{
    if(BookmarkButton.current) BookmarkButton.current.classList.remove("marked")
    
  }

  return (
    <div className="answerData">
      <div className="location">
        <h1 className="cityName">
          {data.name}, {data.sys.country}
        </h1>

        <div
          title={`Clouds: ${data.clouds.all}%`}
          className="temperatureAnswer2"
        >
          <img className="weatherIcon" src={imgLink} alt="" srcSet="" />
        </div>

        <div className="localeTime">
          <p>
            {isPolish
              ? `${weekDaysPolish[new Date().getDay()]}`
              : `${weekDays[new Date().getDay()]}`}
          </p>
          <p>{new Date().getDate() < 10 ? `0${time}` : time}</p>
          <div>
            {hours < 10 ? (
              <p>
                {minutes < 10
                  ? `0${hours}:0${minutes}`
                  : `0${hours}:${minutes}`}
              </p>
            ) : (
              <p>
                {minutes < 10 ? `${hours}:0${minutes}` : `${hours}:${minutes}`}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="temperature">
      
        <BookmarkBorderIcon
          ref={BookmarkButton}
          className="bookMark"
          style={BookmarkBorderIconStyle}
          onClick={handleMark}
        />


        <h2 title="Current" className="primaryTemperature">{`${Math.round(
          data.main.temp
        )}℃`}</h2>
        <h4 title="MAX/MIN" className="secondaryTemperature">{`${Math.round(
          data.main.temp_max
        )}℃ / ${Math.round(data.main.temp_min)}℃`}</h4>
      </div>
    </div>
  );
};

export default AnswerData;
