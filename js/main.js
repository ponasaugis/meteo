const APIkey = '76e0b4c9ac34cc21550ed04a79f5af8f';
let input = document.getElementById('input').value;
let button = document.getElementById('button');
let output = document.getElementById('result');
let result = document.querySelector('.result');
let cityName = document.querySelector('.cityName');
let description = document.querySelector('.description');
let logo = document.getElementById('logo');

let ThreeDays = document.getElementById('ThreeDays');

let logoTomorrow = document.getElementById('logoTomorrow');
let logoAfterTomorrow = document.getElementById('logoAfterTomorrow');
let logoDayAfterTomorrow = document.getElementById('logoDayAfterTomorrow');

let fone = document.getElementById('fone')
let ftwo = document.getElementById('ftwo')
let fthree = document.getElementById('fthree')

let done = document.getElementById('done')
let dtwo = document.getElementById('dtwo')
let dthree = document.getElementById('dthree')

let tone = document.getElementById('tone')
let ttwo = document.getElementById('ttwo')
let tthree = document.getElementById('tthree')



// ------------GEO------------------------------


var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  function success(pos) {
    var crd = pos.coords;
    
    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${crd.latitude}&lon=${crd.longitude}&units=metric&lang=lt&appid=${APIkey}`
    return new Promise((resolve, reject) => {
        fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            resolve(data);
            pushDataToHTML(data)            
        });
       
    });
      
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
  
  function findGeo(){
    navigator.geolocation.getCurrentPosition(success, error, options);
  };
  
  document.getElementById('geoButton').addEventListener('click', findGeo);

  

// ---------------END -- GEO --------------------


function submitFunction(){
    let cityInfo = document.getElementById('input').value
    return cityInfo; 
};

document.querySelector('#input').addEventListener("keypress", function (e) {
    if (e.key === 'Enter'){ 
        fechData();
        
    };
})


// DATE for forecast

        const today= new Date();
        const tomorrow = new Date()
        const afterTomorrow = new Date()
        const dayAfterTomorrow = new Date()
        tomorrow.setDate(today.getDate() + 1)
        afterTomorrow.setDate(today.getDate() + 2)
        dayAfterTomorrow.setDate(today.getDate() + 3)
        tomorrow1 = tomorrow.getDay()
        afterTomorrow1 = afterTomorrow.getDay()
        dayAfterTomorrow1 = dayAfterTomorrow.getDay()

        if (tomorrow1 == 0) {
            day1 = 'Sekmadienį'
        } else if (tomorrow1 == 1){
            day1 = 'Pirmadienį'
        } else if (tomorrow1 == 2){
            day1 = 'Antradienį'
        } else if (tomorrow1 == 3){
            day1 = 'Trečiadienį'
        } else if (tomorrow1 == 4){
            day1 = 'Ketvirtadienį'
        } else if (tomorrow1 == 5){
            day1 = 'Penktadienį'
        } else if (tomorrow1 == 6){
            day1 = 'Šeštadienį'
        };

        if (afterTomorrow1 == 0) {
            day2 = 'Sekmadienį'
        } else if (afterTomorrow1 == 1){
            day2 = 'Pirmadienį'
        } else if (afterTomorrow1 == 2){
            day2 = 'Antradienį'
        } else if (afterTomorrow1 == 3){
            day2 = 'Trečiadienį'
        } else if (afterTomorrow1 == 4){
            day2 = 'Ketvirtadienį'
        } else if (afterTomorrow1 == 5){
            day2 = 'Penktadienį'
        } else if (afterTomorrow1 == 6){
            day2 = 'Šeštadienį'
        };

        if (dayAfterTomorrow1 == 0) {
            day3 = 'Sekmadienį'
        } else if (dayAfterTomorrow1 == 1){
            day3 = 'Pirmadienį'
        } else if (dayAfterTomorrow1 == 2){
            day3 = 'Antradienį'
        } else if (dayAfterTomorrow1 == 3){
            day3 = 'Trečiadienį'
        } else if (dayAfterTomorrow1 == 4){
            day3 = 'Ketvirtadienį'
        } else if (dayAfterTomorrow1 == 5){
            day3 = 'Penktadienį'
        } else if (dayAfterTomorrow1 == 6){
            day3 = 'Šeštadienį'
        };
      
// END ------ DATE for forecast


// FIND CITY

document.getElementById('button').addEventListener("click", function(){
    fechData()
});



function fechData(){
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${submitFunction()}&units=metric&lang=lt&appid=${APIkey}`;
    fetch(url)
       .then(
        function(response) {
          if (response.status === 404) {
            alert('Patikrinkite ar gerai įvedėte miesto pavadinimą.');
            return;
          } 
            response.json().then(function(data) {
                data
                pushDataToHTML(data) ;
                graph(data);
                console.log(data.list[0].main.temp)
                });
            })      
        };


function pushDataToHTML(data){
        const temp = data.list[0].main.temp;
        const tempFone = data.list[1].main.temp;
        const tempFtwo = data.list[2].main.temp;
        const tempFthree = data.list[3].main.temp;
        const descrip = data.list[0].weather[0].description;

        fone.innerHTML = day1;
        ftwo.innerHTML = day2;
        fthree.innerHTML = day3; 
        done.innerHTML = Math.floor(tempFone) + '°C ';
        dtwo.innerHTML = Math.floor(tempFtwo) + '°C ';
        dthree.innerHTML = Math.floor(tempFthree) + '°C '; 

        tone.innerHTML = data.list[1].weather[0].description;
        ttwo.innerHTML = data.list[6].weather[0].description;
        tthree.innerHTML = data.list[14].weather[0].description;  

        output.innerHTML = Math.floor(temp) + '°C';
        cityName.innerHTML = data.city.name.toUpperCase();   

        ThreeDays.innerHTML = 'Trijų dienų prognozė';

        //Main Icon
        let icon = data.list[0].weather[0].icon;
        let wicon = `img/meteo/${icon}.png`;     
       
        description.textContent = descrip;     
        logo.src = wicon;
        
        //Icon Tomorrow
        let icon1 = data.list[1].weather[0].icon;
        let wicon1 = `img/meteo/${icon1}.png`      
        
        logoTomorrow.src = wicon1;

        //Icon After Tomorrow
        let icon2 = data.list[6].weather[0].icon;
        let wicon2 = `img/meteo/${icon2}.png`      
        
        logoAfterTomorrow.src = wicon2;

        //Icon Day After Tomorrow
        let icon3 = data.list[14].weather[0].icon;
        let wicon3 = `img/meteo/${icon3}.png`      
        
        logoDayAfterTomorrow.src = wicon3;
        

};



// Graph

function graph(data){
    // let quantity = parseInt(document.getElementById('quantity').value)
    // let maxValue = parseInt(document.getElementById('maxValue').value)
    // let minValue = parseInt(document.getElementById('minValue').value)

    
    graphParent.innerHTML = ''

    for(let i = 1; i <= 9; i++){
        let graphParent = document.getElementById('graphParent')
        let createGraph = document.createElement('div')			
        createGraph.classList.add('lineSet')
        createGraph.setAttribute('id', 'line-' + i)
        graphParent.appendChild(createGraph);
        let graphHeight = document.getElementById('line-' + i);
        graphHeight.style.height = String((Math.floor(((data.list[i].main.temp) + 10) * 10) + 'px'));
        let persist = document.getElementById('line-' + i)			
        console.log(data.list[i].main.temp)
    };

};





