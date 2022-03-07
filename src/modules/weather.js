const temp = document.querySelector('.temp');
const desc = document.querySelector('.desc');
const feels = document.querySelector('.feelsLike');
const ikoni = document.querySelector('.ikoni');

fetch('https://api.openweathermap.org/data/2.5/weather?lat=60.20999477922676&lon=24.976729499513702&units=metric&lang=FI&appid=b23387891ba41d0c4c9cccaf3ca4bf75')
    .then(response => response.json())
    .then(data => {
        const tempValue = data['main']['temp'];
        const feelsLike = data['main']['feels_like'];
        const descValue = data['weather'][0]['description'];
        const iconcode = data['weather'][0]['icon'];
        const roundedTemp = Math.round(tempValue * 10) / 10;
        const roundedFeels = Math.round(feelsLike * 10) / 10;

        temp.innerHTML = `${roundedTemp}°C`;
        feels.innerHTML = `Tuntuu kuin:<b> ${roundedFeels}°C</b>`;
        desc.innerHTML = `<b> ${descValue}</b>`;
        ikoni.innerHTML = `<img src="./src/icons/${iconcode}.svg" >`;

    });