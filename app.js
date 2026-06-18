// https://api.weatherapi.com/v1/current.json?key=ed608fa4233d4779a4164901261606&q=London&aqi=yes
const textBox = document.querySelector("#search-City");
const searchBtn = document.querySelector("#Search-btn");

const exactLocation = document.querySelector("#loction");
const temp = document.querySelector("#temp");
const time = document.querySelector("#date-time");

const getLocationbtn = document.querySelector(".Get-btn");

async function weatherNow(loc,lat){
    if(lat === undefined){
        const data =await fetch(`https://api.weatherapi.com/v1/current.json?key=ed608fa4233d4779a4164901261606&q=${loc}&aqi=yes`)
        console.log(`location is ${loc}`)
        return await data.json();
    }else{
        const data =await fetch(`https://api.weatherapi.com/v1/current.json?key=ed608fa4233d4779a4164901261606&q=${loc},${lat}&aqi=yes`)
        console.log(`latitude is ${loc}, longitude is ${lat}`);
        return await data.json();
    }
}

searchBtn.addEventListener("click",async () =>{
    const value =textBox.value;
    const result = await weatherNow(value);
    exactLocation.innerText =`${result.location.name} ${result.location.region} ${result.location.country}`;   
    time.innerText =`${result.location.localtime}`;
    temp.innerText = `${result.current.temp_c}°C`;    
    localStorage.setItem("Location",`${result.location.name} ${result.location.region} ${result.location.country}`);
    localStorage.setItem("Time",`${result.location.localtime}`);
    localStorage.setItem("temp",`${result.current.temp_c}`);
});

getLocationbtn.addEventListener("click",() =>{
    navigator.geolocation.getCurrentPosition(async (position)=>{
        let lac = position.coords.latitude;
        let lon = position.coords.longitude;
        const result = await weatherNow(lac,lon);
        exactLocation.innerText =`${result.location.name} ${result.location.region} ${result.location.country}`;   
        time.innerText =`${result.location.localtime}`;
        temp.innerText = `${result.current.temp_c}°C`;    
        localStorage.setItem("Location",`${result.location.name} ${result.location.region} ${result.location.country}`);
        localStorage.setItem("Time",`${result.location.localtime}`);
        localStorage.setItem("temp",`${result.current.temp_c}`);
    },
    (error)=>{
        alert(`Error ${error}`);
    });
});

window.addEventListener("load",() =>{
    exactLocation.innerText = localStorage.getItem("Location");
    temp.innerText = localStorage.getItem("temp");
    time.innerText = localStorage.getItem("Time");
});