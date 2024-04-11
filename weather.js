let city = document.getElementById("city");
let type = document.getElementById("type");
let temp = document.getElementById("temp");
let image = document.getElementById("img");
let input = document.getElementById("inp");
let API_key = "6667d0f2b2e47c072f9d20a6289d8807";

const data = async function(search){
    let getData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_key}&units=metric`);
    console.log(getData);
    let jsonData= await getData.json();
    console.log(jsonData);
    console.log(jsonData.name);
    

    if(jsonData.cod == 400){
        image.src="400.jpg"
        alert("please enter location")
        city.innerHTML="";
        temp.innerHTML="";
        type.innerHTML="";
    }
    if(jsonData.cod == 404){
        image.src="404.jpg"
        alert("please enter correct location")
        city.innerHTML="search";
        temp.innerHTML="";
        type.innerHTML="";
    }
    city.innerHTML=search;
    temp.innerHTML=Math.floor(jsonData.main.temp)+"°C";
    type.innerHTML=jsonData.weather[0].main;
    if(type.innerHTML== "Clouds"){
        image.src="clouds.jpg"
    }
    else if(type.innerHTML == "clear"){
        image.src="clear.jpg"
    }
    else if(type.innerHTML == "Rainy"){
        image.src="rainy.jpg"
    }
    else if(type.innerHTML == "Haze"){
        image.src="haze.jpg"
    }



    input.value="";
}
function myFun(){
    console.log("hello");
    search = input.value ;
    data(search);

}
