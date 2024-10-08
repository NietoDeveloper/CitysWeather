const weatherApi = {
    key: 'ebcacc5015e4adaf2d68f39b3ad18ac8',
    baseUrl: 'https://api.openweathermap.org/data/2.5/weather'
}

const searchInputBox = document.getElementById('input-box');
searchInputBox.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
        getWeatherReport(searchInputBox.value);
    }
})

function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)  
        .then(weather => {  
            return weather.json();
        }).then(showWeaterReport); 
}

function showWeaterReport(weather) {
    const city_code=weather.cod;
    if(city_code==='400'){ 
        swal("Empty Input", "Please enter any city", "error");
        reset();
    }else if(city_code==='404'){
        swal("Bad Input", "entered city didn't matched", "warning");
        reset();
    }
    else{
  
    const op = document.getElementById('weather-body');
    op.style.display = 'block';
    const todayDate = new Date();
    const parent=document.getElementById('parent');
    const weather_body = document.getElementById('weather-body');
    weather_body.innerHTML =
        `
    <div class="location-deatils">
        <div class="city" id="city">${weather.name}, ${weather.sys.country}</div>
        <div class="date" id="date"> ${dateManage(todayDate)}</div>
    </div>
    <div class="weather-status">
        <div class="temp" id="temp">${Math.round(weather.main.temp)}&deg;C </div>
        <div class="weather" id="weather"> ${weather.weather[0].main} <i class="${getIconClass(weather.weather[0].main)}"></i>  </div>
        <div class="min-max" id="min-max">${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max) </div>
        <div id="updated_on">Updated as of ${getTime(todayDate)}</div>
    </div>
    <hr>
    <div class="day-details">
        <div class="basic">Feels like ${weather.main.feels_like}&deg;C | Humidity ${weather.main.humidity}%  <br> Pressure ${weather.main.pressure} mb | Wind ${weather.wind.speed} KMPH</div>
    </div>
    `;
    parent.append(weather_body);
    changeBg(weather.weather[0].main);
    reset();
    }
}
 

function getTime(todayDate) {
    const hour =addZero(todayDate.getHours());
    const minute =addZero(todayDate.getMinutes());
    return `${hour}:${minute}`;
}

function dateManage(dateArg) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const year = dateArg.getFullYear();
    const month = months[dateArg.getMonth()];
    const date = dateArg.getDate();
    const day = days[dateArg.getDay()];

    return `${date} ${month} (${day}) , ${year}`
}

function changeBg(status) {
    if (status === 'Clouds') {
        document.body.style.backgroundImage = 'url(assets/img/clouds.jpg)';
    } else if (status === 'Rain') {
        document.body.style.backgroundImage = 'url(assets/img/rainy.jpg)';
    } else if (status === 'Clear') {
        document.body.style.backgroundImage = 'url(assets/img/clear.jpg)';
    }
    else if (status === 'Snow') {
        document.body.style.backgroundImage = 'url(assets/img/snow.jpg)';
    }
    else if (status === 'Sunny') {
        document.body.style.backgroundImage = 'url(assets/img/sunny.jpg)';
    } else if (status === 'Thunderstorm') {
        document.body.style.backgroundImage = 'url(assets/img/thunderstrom.jpg)';
    } else if (status === 'Drizzle') {
        document.body.style.backgroundImage = 'url(assets/img/drizzle.jpg)';
    } else if (status === 'Mist' || status === 'Haze' || status === 'Fog') {
        document.body.style.backgroundImage = 'url(assets/img/mist.jpg)';
    }

    else {
        document.body.style.backgroundImage = 'url(assets/img/bg.jpg)';
    }
}

function getIconClass(classarg) {
    if (classarg === 'Rain') {
        return 'fas fa-cloud-showers-heavy';
    // biome-ignore lint/style/noUselessElse: <explanation>
    } else if (classarg === 'Clouds') {
        return 'fas fa-cloud';
    // biome-ignore lint/style/noUselessElse: <explanation>
    } else if (classarg === 'Clear') {
        return 'fas fa-cloud-sun';
    // biome-ignore lint/style/noUselessElse: <explanation>
    } else if (classarg === 'Snow') {
        return 'fas fa-snowman';
    // biome-ignore lint/style/noUselessElse: <explanation>
    } else if (classarg === 'Sunny') {
        return 'fas fa-sun';
    // biome-ignore lint/style/noUselessElse: <explanation>
    } else if (classarg === 'Mist') {
        return 'fas fa-smog';
    // biome-ignore lint/style/noUselessElse: <explanation>
    } else if (classarg === 'Thunderstorm' || classarg === 'Drizzle') {
        return 'fas fa-thunderstorm';
    // biome-ignore lint/style/noUselessElse: <explanation>
    } else {
        return 'fas fa-cloud-sun';
    }
}

function reset() {
    const input = document.getElementById('input-box');
    input.value = "";
}

// funtion to add zero if hour and minute less than 10
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}