import React from "react"
import App from "../App";
import { LiaTemperatureLowSolid } from "react-icons/lia";
import { BiWorld } from "react-icons/bi"
import { MdOutlineVisibility } from "react-icons/md";
import { IoMdSpeedometer } from "react-icons/io";
import { WiHumidity } from "react-icons/wi";
import { CiTempHigh } from "react-icons/ci";
import { useEffect } from "react";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import Sunrise from './assets/img/Sunrise.jpg';
import Sunset from './assets/img/Sunset.jpg';
const Nav = () => {
    const [city ,setcity] = useState("Mumbai")
    const [data , setdata] = useState([])
    const[error, seterror] =useState("")
    let [statuss ,setstatuss] = useState("")
    const [prassure, setprassure] = useState("")
    const API_KEY = "e1b7864e29b68fa906621daa6dc327f6";
   const URL =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;



useEffect(()=>{
      Search()
},[])


async function Search() {
    setcity(city)
    seterror(null);
    try{
      let response = await fetch(URL);
      let output = await response.json();
      if(response.ok){
        setdata(output);
        console.log(output)
      }else{
        seterror("Data not found")
        setdata(null)
      }

    }
    catch{
      
    }}
    


 let  pressurecal = () =>{
    let prassure = data?.main?.pressure;
      
  if(prassure === undefined) return;
    if(prassure >= 1005 && prassure <=1025){
      statuss = "Normal"
    }
    if(prassure >=990 && prassure <= 1005){
      statuss = "Low"
    }
    if(prassure >=1025 && prassure <= 1040){
      statuss = "High"
    }
    if( prassure <= 990){
      statuss = "Very Low"
    }
 }
console.log(prassure)

let sunrise = data?.sys?.sunrise;
let sunset = data?.sys?.sunset;


let sunriseIST = new Date(sunrise * 1000).toLocaleTimeString("en-IN",{
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true
})
   
let sunsetIST = new Date(sunset * 1000).toLocaleTimeString("en-IN",{
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true
})

console.log(sunriseIST);





return (
  <div className="relative w-full h-screen">

    {/* Search input */}
    <div className="absolute w-106 h-10 bg-white mx-10 my-5 rounded-4xl overflow-hidden">
      <input
        value={city}
        onChange={(e) => setcity(e.target.value)}
        className="h-full w-full px-4 outline-none text-xl pb-1 font-semibold"
        type="text"
        placeholder="search the city"
      />
    </div>

    {/* Search button */}
    <div className="absolute right-12 top-5 h-10 w-10 rounded-full flex justify-center items-center bg-white">
      <button
        onClick={Search}
        className="h-full w-full text-2xl font-bold flex justify-center items-center"
      >
        <IoSearch />
      </button>
    </div>
  <div className=' absolute w-full h-193 flex mt-27  ' >
    {/* Error */}
    {error && (
      <div className="absolute top-10 w-full  h-143 flex  justify-center items-center">
        <p className="text-2xl text-white font-bold">{error}</p>
      </div>
    )}

    {/* Weather Data */}
    {data && data.weather && (
      <div className=" absolute  w-full h-full flex justify-center items-center">
        <div className=" absolute bg-white/60 left-5 top-5  rounded-xl w-130 h-70 flex flex-col items-center justify-center">
          <img
            className="w-60 h-60 mb-10"
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <h3 className="absolute text-black text-2xl font-bold bottom-5">
            {data.weather[0].description}
          </h3>
        </div>
        <div className="absolute  bg-black/70 top-85 right-5 w-60 h-40  rounded-xl flex items-center flex-col" >
          <div className="text-[90px] mt-2  text-white"><WiHumidity /></div>
          <div className="absolute text-xl font-bold bottom-5 text-white " ><h3><span>Humidity: </span>{data.main.humidity}<span>%</span></h3></div>
        </div>  
        <div className="absolute  bg-black/70 left-5 top-85 w-60 h-40  rounded-xl flex items-center flex-col" >
          <div className="text-[90px] mt-3  text-white" ><CiTempHigh /></div>
          <div className="absolute text-xl font-bold bottom-5  text-white" ><h3><span>Temperature: </span>{data.main.temp}<span>°</span></h3></div>
        </div>
        <div className="absolute  bg-black/70 right-5 top-135 w-60 h-40  rounded-xl flex items-center flex-col" >
          <div className="text-[90px] mt-2  text-white" ><IoMdSpeedometer /></div>
          <div className="absolute text-xl font-bold bottom-5  text-white" ><span>Wind: </span>{(data.wind.speed * 3.6).toFixed(2)}<span>Km/h</span></div>
        </div>
        <div  className="absolute  bg-black/70 left-5 top-135 w-60 h-40  rounded-xl flex items-center flex-col" >
          <div className="text-[90px] mt-2  text-white" ><LiaTemperatureLowSolid /></div>
          <div className="absolute text-xl font-bold bottom-5 text-white" ><span>Feels Like: </span>{data.main.feels_like}°</div>
        </div> 

        <div className="absolute h-220 bottom-0 rounded-2xl w-300 bg-white/30  backdrop-blur-none left-150">
          <div className="absolute  bg-black/70 left-99 top-8 w-60 h-60  rounded-xl flex items-center flex-col" >
            <div className="text-[110px] mt-12  text-white" ><MdOutlineVisibility /></div>
            <div className="absolute  text-xl font-bold bottom-8 text-white" ><span>Visibility: </span>{(data.visibility)/1000}km</div>
          </div>
          <div className="absolute  bg-black/70 right-10 top-80 w-135 h-60  rounded-xl flex items-center flex-col">
            <div><input type="range" min={990} max={1040} value={data.main.pressure}  disabled  className=" triangle-slider absolute  bottom-8 right-10 w-md h-1 rounded-lg appearance-none 
               bg-[linear-gradient(270deg,rgb(255,0,0),rgb(255,165,0),rgb(255,255,0),rgb(0,128,0))]"></input></div>
            <div><span  className="absolute left-5 top-10 text-3xl font-bold text-white ">Pressure:</span><p className="text-6xl text-white mt-4 absolute top-15 left-3" >{data.main.pressure} hPa{pressurecal()}</p></div>
            <div className=" absolute right-5 top-5 text-2xl text-white" >Status: {statuss}</div>
          </div>
          <div className="absolute  bg-black/70 left-10 top-80 w-135 h-60  rounded-xl flex items-center flex-col">
            <div><input type="range" min={990} max={1040} value={data.main.sea_level} disabled  className=" triangle-slider absolute  bottom-8 right-10 w-md h-1 rounded-lg appearance-none 
               bg-[linear-gradient(270deg,rgb(255,0,0),rgb(255,165,0),rgb(255,255,0),rgb(0,128,0))]"></input></div>
            <div><span  className="absolute left-5 top-10 text-3xl font-bold text-white ">Sea-level:</span><p className="text-6xl text-white mt-4 absolute top-15 left-3" >{data.main.sea_level} hPa{pressurecal()}</p></div>
            <div className=" absolute right-5 top-5 text-2xl text-white" >Status: {statuss}</div>
          </div>
          <div className="absolute  bg-black/70 right-10 top-8 w-125 h-60  rounded-xl flex items-center flex-col" >
            <div className=" ml-50 mr-10 mt-8 w-65 h-40 overflow-hidden rounded-md" ><img src={Sunrise} alt="" className="h-full w-full"  /> </div>
            <div className="absolute left-5 bottom-22  text-3xl font-bold text-white " >Sunrise: </div>
            <div className="absolute left-5 bottom-10 rounded-md bg-white/30 text-2xl w-35 h-10 font-bold text-white flex items-center justify-center ">{sunriseIST}</div>
          </div>
          <div className="absolute  bg-black/70 left-10 bottom-8 w-125 h-60  rounded-xl flex items-center flex-col" >
            <div className=" ml-50 mr-10 mt-8 w-65 h-40 overflow-hidden rounded-md" ><img src={Sunset} alt="" className="h-full w-full"  /> </div>
            <div className="absolute left-5 bottom-22  text-3xl font-bold text-white " >Sunrise: </div>
            <div className="absolute left-5 bottom-10 rounded-md bg-white/30 text-2xl w-35 h-10 font-bold text-white flex items-center justify-center ">{sunsetIST}</div>
          </div>
          <div className="absolute  bg-black/70 left-10 top-8 w-83 h-60  rounded-xl flex items-center flex-col" >
            <div className="text-[110px] mt-12 ml-35 text-white" ><BiWorld /></div>
            <div className="absolute left-5 text-2xl font-bold bottom-17 text-white" >Location: </div>
            <div className="absolute left-5 text-3xl font-bold bottom-8 text-white" >{data.name},{data.sys.country}</div>
          </div>
        </div>
      </div>

    )}
  </div>  

  </div>
)};

export default Nav;




