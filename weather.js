const inputcity=document.getElementById("input")
const weatherform=document.getElementById("weatherform")
const apikey="e752d1cfe9fc64cf12fb5b065fadb74a"
const citydisp=document.getElementById("city")
const wetherdisp=document.getElementById("wetherdisp")
weatherform.addEventListener("submit",async event =>{
    try{
        event.preventDefault();
        const city=inputcity.value.trim()
        if(!city){
            throw new Error("Enter the City Name")
        }
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`);
        if(!response.ok){
            throw new Error("Could not find city")
        }
        const data =await response.json()
        displaywether(data)
        console.log(data)
    }   
    catch(error){
        displayerror(error.message);
    }
})
async function displaywether(data) {
    wetherdisp.style.display="flex"
    const {name:city ,main:{temp,humidity},weather:[{description,id}]}=data
    document.getElementById("city").textContent=city
    document.getElementById("temp").textContent=`${temp} \u00B0C`
    document.getElementById("Humid").textContent=`Humidity: ${humidity}%`
    document.getElementById("des").textContent=description
    document.getElementById("error").textContent=""
    addemoji(id)

}
function addemoji(id){
    let emoji='';
    switch(true){
        case (id>=200 && id<300):
        emoji ='⛈️'
        break
        case (id>=300 && id<400):
        emoji ='🌧️'
        break
        case (id>=400 && id<500):
        emoji ='🌧️'
        break
        case (id>=500 && id<600):
        emoji ='🌦️'
        break
        case (id>=600 && id<700):
        emoji ='❄️'
        break
        case (id>=700 && id<=800):
        emoji ='🍃'
        break
        case (id==800):
        emoji ='☀️'
        break
        case (id>800 && id<810):
        emoji ='🌥️'
        break
    }
    document.getElementById("emoji").textContent=emoji
}
function displayerror(message){
    wetherdisp.style.display="flex"
    document.getElementById("error").textContent=message
}