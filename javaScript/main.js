
let background=document.querySelector(".spc-row1")
let currentDay=document.querySelector(".currentDay")
let currentDayInNum=document.querySelector(".currentDayInNum")
let cityName=document.querySelector("#cityName")
let currentTemp=document.querySelector("#currentTemp")
let feelsLike=document.querySelector("#feelsLike")
let cond=document.querySelector("#condition")
let windSpeed=document.querySelector("#wind-speed")
let humi = document.querySelector("#humi")
let press=document.querySelector("#press")
let sunRise=document.querySelector("#sunRise")
let sunSet= document.querySelector("#sunSet")
let iCon=document.querySelector("#icon")
let weatherDay=document.querySelectorAll(".day")
let weatherDate=document.querySelectorAll(".date")
let nextDayIcon=document.querySelectorAll(".spc-icon")
let minDegrees=document.querySelectorAll(".min")
let maxDegrees=document.querySelectorAll(".max")
let nextDayDesc=document.querySelectorAll(".desc")
let searchInput=document.querySelector("#searchInput")
let bgs=document.querySelectorAll("#img")


if(window.localStorage.getItem("bg")) {
    document.getElementById("backGround").style.backgroundImage=`url(${window.localStorage.getItem("bg")})`
} 
else {
    document.getElementById("backGround").style.backgroundImage= `url(./imgs/trial.jpg)`

}

bgs.forEach((img)=>{
    img.addEventListener("click",(e)=>{
      
        window.localStorage.setItem("bg",e.currentTarget.getAttribute("src"))
        let imgSrc=e.currentTarget.getAttribute("src")
        document.getElementById("backGround").style.backgroundImage=`url(${imgSrc})`


    })
})




let days=["Sunday","Monday","Tuseday","Wednsday","Thursday","Friday","Saturday"]
let months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
let date=new Date();
let currentD=days[date.getDay()]
let currentDayInNumber=date.getDate()

async function getCurrentWeather(cityN) {
    apiObject=await fetch(`http://api.weatherapi.com/v1/forecast.json?key=0cd7c6d1a722427dbb2111144231602&q=${cityN}&days=6&aqi=no&alerts=no
    `)
    finalObject= await apiObject.json()
     cityloc=finalObject.location.name
     currentDegree=finalObject.current.temp_c
     feels=finalObject.current.feelslike_c
     conditions=finalObject.current.condition.text
     wind=finalObject.current.wind_mph
     airHum=finalObject.current.humidity
     pressureMb=finalObject.current.pressure_mb
     pressureIn=finalObject.current.pressure_in
     sunRi=finalObject.forecast.forecastday[0].astro.sunrise
     sunse=finalObject.forecast.forecastday[0].astro.sunset
     icon=finalObject.current.condition.icon
    displayWeather()
    displayNextWeather()

}
getCurrentWeather("cairo")

function displayWeather() {
    currentDay.innerHTML=currentD
    currentDayInNum.innerHTML=`${currentDayInNumber}${months[date.getMonth()]}`
    cityName.innerHTML=cityloc
    currentTemp.innerHTML=`${currentDegree}°C`
    feelsLike.innerHTML=`feels like ${feels}°C`
    cond.innerHTML=conditions
    windSpeed.innerHTML=`wind: ${wind} kph`
    humi.innerHTML=`humidity: ${airHum}%`
    press.innerHTML=`pressure: ${pressureMb}-${pressureIn}mm`
    sunRise.innerHTML=`sunrise: ${sunRi}`
    sunSet.innerHTML=`sunset: ${sunse}`
    iCon.innerHTML=`     <img src=http:${icon} alt="">`
   
}

function displayNextWeather(){
for(let i=0 ; i<weatherDay.length;i++) {
   weatherDay[i].innerHTML= days [new Date(finalObject.forecast.forecastday[i+2].date).getDay()]
}
for(let i=0;i<weatherDate.length;i++) {
   
    weatherDate[i].innerHTML=`${new Date((finalObject.forecast.forecastday[i+2].date)).getDate()} ${ months[new Date(finalObject.forecast.forecastday[i+2].date).getMonth()]}`
}
for(let i=0;i<nextDayIcon.length;i++){
    nextDayIcon[i].innerHTML=`     <img src=http:${finalObject.forecast.forecastday[i+2].day.condition.icon} alt="">`
    
}
for(let i=0;i<minDegrees.length;i++){
    minDegrees[i].innerHTML=`min: ${finalObject.forecast.forecastday[i+2].day.mintemp_c}°C`
}
for(let i=0;i<maxDegrees.length;i++){
    maxDegrees[i].innerHTML=`max: ${finalObject.forecast.forecastday[i+2].day.maxtemp_c}°C`
}
for(let i=0 ;i<nextDayDesc.length;i++){
    nextDayDesc[i].innerHTML=finalObject.forecast.forecastday[i+2].day.condition.text
}
}



$(document).ready(function() {
    $("#load").fadeOut(1000)
})