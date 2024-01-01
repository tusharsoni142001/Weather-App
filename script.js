window.onload = getlocation;

const apiKey="c9e54e3d0926ecc8692a34149dfcf453";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox=document.querySelector(".search input");
const searchBtn=document.querySelector(".search button");
const weatherIcon=document.querySelector(".weather-icon");

let latitude=null;
let longitude=null;

async function checkWeather(city){
    const response=await fetch(apiUrl + city+ `&appid=${apiKey}`);

    if(response.status==404)
    {
        // document.querySelector("error").style.display="block";
        // document.querySelector("weather").style.display="none";

        document.querySelector(".weather").style.display="none";
        document.querySelector(".error").style.display="block";
    }
    else
    {
        var data=await response.json();

    
    console.log(data);

    document.querySelector(".city").innerHTML=data.name;
    document.querySelector(".temp").innerHTML=Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML=data.main.humidity + " %";
    document.querySelector(".wind").innerHTML=data.wind.speed + " km/h";


    //Images according to weather condition
    if(data.weather[0].main=="Clouds"){
        weatherIcon.src="images/clouds.png";
    }
    else if(data.weather[0].main=="Clear")
    {
        weatherIcon.src="images/clear.png";
    }
    else if(data.weather[0].main=="Rain")
    {
        weatherIcon.src="images/rain.png";
    }
    else if(data.weather[0].main=="Drizzle")
    {
        weatherIcon.src="images/drizzle.png";
    }
    else if(data.weather[0].main=="Mist")
    {
        weatherIcon.src="images/mist.png";
    }


    document.querySelector(".weather").style.display="block";
    document.querySelector(".error").style.display="none";
    }
    
}

//Event listener for search button
searchBtn.addEventListener("click",()=>{
    checkWeather(searchBox.value);
})


//Method to fetch user current location
function getlocation(){
    if(navigator.getLocation){
        navigator.getCurrentLocation(getCoordinates);
    }
}

function getCoordinates(position)
{
    latitude=position.coords.latitude;
    longitude=postion.coord.longitude;
    console.log(latitude+"\n"+longitude);
}