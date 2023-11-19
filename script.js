const apiData = {
    defaultURL: "http://api.openweathermap.org",
    key: "ef0b0973b783e0614ac87612ec04344b"
}

/**
 * 
 * @param {String} element 
 * @returns {HTMLElement}
 */
const $ = (element) => {
    return document.querySelector(element)
}

const searchCity = () => {
    let city = $("#city").value

    fetch(`${apiData.defaultURL}/geo/1.0/direct?q=${city}&appid=${apiData.key}`).then(res => {
        res.json().then(json => {
            if(json[0]?.lat){
                const data = [json[0].lat, json[0].lon, `${json[0].local_names.pt ? json[0].local_names.pt : json[0].name} - ${json[0].country}`]
    
                fetch(`${apiData.defaultURL}/data/2.5/weather?lat=${data[0]}&lon=${data[1]}&appid=${apiData.key}`).then(res => {
                    res.json().then(json => {
                        let container = $(".container");
                        let searchContainer = $(".search_container");
                        let weatherInfo = $(".weather_info");
                        
                        container.classList.add("opened");
                        searchContainer.style.display = "none";
                        weatherInfo.style.display = "flex";
                        
                        let cityNamePlace = $("#city_name");
                        let feelsLikePlace = $("#feels_like");
                        let descriptionPlace = $("#description");
                        
                        cityNamePlace.innerText = data[2]
                        feelsLikePlace.innerHTML = `<b>Sensação Térmica:</b> ${json.main.feels_like}`;
                        descriptionPlace.innerHTML = `<b>Descrição:</b> <img src="https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png" alt=""> ${json.weather[0].description}`
                        
                    })
                })
            }else{
                
                let searchContainer = $(".search_container");
                let errorPage = $(".error_message");
                
                searchContainer.style.display = "none"
                errorPage.style.display = "flex"

            }
        })
    })
}

const returnToSearch = () => {
    let container = $(".container");
    let searchContainer = $(".search_container");
    let weatherInfo = $(".weather_info");
    let errorPage = $(".error_message")

    let cityInput = $("#city")

    container.classList.remove("opened");
    searchContainer.style.display = "flex";
    weatherInfo.style.display = "none";
    errorPage.style.display = "none"

    cityInput.value = ""
}