// https://api.weatherapi.com/v1/current.json?key=ed608fa4233d4779a4164901261606&q=London&aqi=yes
const textBox = document.querySelector("#search-City");
const searchBtn = document.querySelector("#Search-btn");

const exactLocation = document.querySelector("#loction");
const temp = document.querySelector("#temp");
const time = document.querySelector("#date-time");

searchBtn.addEventListener("click",async () =>{
    const value =textBox.value;
    console.log(value);
    const result = await weatherNow(value);
    exactLocation.innerText =`${result.location.name} ${result.location.region} ${result.location.country}`;   
    time.innerText =`${result.location.localtime}`;
    temp.innerText = `${result.current.temp_c}°C`;    
    localStorage.setItem("Location",`${result.location.name} ${result.location.region} ${result.location.country}`);
    localStorage.setItem("Time",`${result.location.localtime}`);
    localStorage.setItem("temp",`${result.current.temp_c}`);
});

async function weatherNow(loc){
    const data =await fetch(`https://api.weatherapi.com/v1/current.json?key=ed608fa4233d4779a4164901261606&q=${loc}&aqi=yes`)
    return await data.json();
}

window.addEventListener("load",() =>{
    const value = localStorage.getItem("Location");
});