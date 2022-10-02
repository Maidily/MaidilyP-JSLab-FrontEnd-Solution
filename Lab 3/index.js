const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const appId = '0afd5e6b5ff14901ac850dbca80ee843';

var input = document.querySelector('#city');

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    
    input = document.querySelector('#city');

    // function call
    getWeather();

    // getting date and formatting it
    const date = new Date();
    var day = date.getDate();
    
    var monthIndex = date.getMonth();
    var monthName = months[monthIndex];
    
    var year = date.getFullYear();
    
    document.querySelector('#date').innerHTML =  `${day} ${monthName} ${year}`;    

  }
});

function getWeather() {
    console.log("API called");

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${appId}&units=metric`)
    .then(response => response.json())
    .then(data => {
        var city = data['name'];
        var temp = data['main']['temp'];
        var min = data['main']['temp_min'];
        var max = data['main']['temp_max'];
        var maindesc = data['weather'][0]['main'];
        var desc = data['weather'][0]['description'];

        document.querySelector('#place').innerHTML = city;
        document.querySelector('#degree').innerHTML = `${temp}<span>&#176;</span>c`;
        document.querySelector('#minMax').innerHTML = `${min}<span>&#176;</span>c / ${max}<span>&#176;</span>c`;
        document.querySelector('#weather').innerHTML = maindesc;

        // change background based on climate description
        if (desc.includes('cloud')){
            document.body.style.backgroundImage = "url('bg2.jpg')";
        }
        else if (desc.includes('mist')){
            document.body.style.backgroundImage = "url('bg3.jpg')";
        }
        else if (desc.includes('clear')){
            document.body.style.backgroundImage = "url('bg4.jpg')";
        }
        else if (desc.includes('sun')){
            document.body.style.backgroundImage = "url('bg6.jpg')";
        }     
        else if (desc.includes('haze') || desc.includes('dust') || desc.includes('ash')){
            document.body.style.backgroundImage = "url('bg7.jpg')";
        }
        else if (desc.includes('drizzle')){
            document.body.style.backgroundImage = "url('bg8.jpg')";
        }
        else if (desc.includes('rain')){
            document.body.style.backgroundImage = "url('bg9.jpg')";
        }
        else if (desc.includes('fog')){
            document.body.style.backgroundImage = "url('bg10.jpg')";
        }
        else if (desc.includes('snow') || maindesc.includes('Snow')){
            document.body.style.backgroundImage = "url('bg11.jpg')";
        }
        

        console.log(data);
    })
    
    .catch(err => alert("Enter a valid city name!"));
}