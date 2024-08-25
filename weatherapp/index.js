let cityName=document.querySelector(".weather_city");
let dateTime=document.querySelector(".weather_date_time");
let w_forCast=document.querySelector(".weather_forecast");
let w_icon=document.querySelector(".weather_icon");
let w_temp=document.querySelector(".weather_temp");
let w_minTem=document.querySelector(".weather_min");
let w_maxTem=document.querySelector(".weather_max");
let w_feelsLike=document.querySelector(".weather_feels_like");
let w_humidity=document.querySelector(".humidity_feels");
let w_wind=document.querySelector(".wind_feels");
let w_pressure=document.querySelector(".pressure_feels");
let searchCity=document.querySelector(".weather_search");

const getCountryName=(code) =>{
    return new Intl.DisplayNames([code], { type: 'region' }).of(code);

};
const getDateTime=(dt) =>{
const curDate = new Date(dt * 1000); // Convert seconds to milliseconds
console.log(curDate);
// // const date = new Date();
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  //   second: "numeric",
};
const formatter = new Intl.DateTimeFormat("en-US", options);
console.log(formatter);

return  formatter.format(curDate);
};
let city="jammu";
searchCity.addEventListener("submit",(e) =>{
    e.preventDefault();
    let cityName=document.querySelector(".city_name");
    console.log(cityName.value);
    city=cityName.value;
    getWeatherData();
    cityName.value="";
});
const getWeatherData= async() =>{
    const webUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=50ac896d799ea4c856a7e324d4e00b0f`;
    try{
        const res= await fetch(webUrl);
        const data= await res.json();
        console.log(data);
        const {main,name,weather,wind,sys,dt} = data;
        cityName.innerHTML=`${name}, ${getCountryName(sys.country)}`;
        dateTime.innerHTML=getDateTime(dt);
        w_temp.innerText=main.temp;
        w_temp.innerHTML=`${main.temp}&#176`;
        w_minTem.innerText=main.temp_min;
        w_maxTem.innerText=main.temp_max;
        w_minTem.innerHTML=`Min : ${main.temp_min.toFixed()}&#176`;
        w_maxTem.innerHTML=`Max : ${main.temp_max.toFixed()}&#176`;
        w_feelsLike.innerHTML=`${main.feels_like}&#176`;
        w_humidity.innerHTML=`${main.humidity}&#37`;
        w_wind.innerHTML=`${wind.speed} m/s`;
        w_pressure.innerHTML=`${main.pressure}hPa`;
        w_forCast.innerHTML=weather[0].main;
        w_icon.innerHTML=`<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png"/>`;
    }
    catch(error){
        console.log(error);
    }

};
document.body.addEventListener('load',getWeatherData());

