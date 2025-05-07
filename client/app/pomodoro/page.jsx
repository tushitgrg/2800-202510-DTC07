"use client"

import { useEffect, useState } from "react"


import PomodoroTimer from "@/components/Pomodoro/PomodoroTimer"
import DirectVideoBackground from "@/components/Pomodoro/VideoBackground"
import { fetchUserWeather } from "@/lib/userLocation"




export default function WeatherPomodoroPage() {

const [weatherData, setweatherData] = useState(null)

const setData =async ()=>{
setweatherData( await fetchUserWeather())
}

useEffect(()=>{
  setData()
}, [])

  const [timerActive, setTimerActive] = useState(false)
  const [timerMode, setTimerMode] = useState("work")
  const [timeRemaining, setTimeRemaining] = useState(25 * 60) // 25 minutes in seconds

  const toggleTimer = () => {
    setTimerActive(!timerActive)
  }

  const resetTimer = () => {
    setTimerActive(false)
    setTimeRemaining(timerMode === "work" ? 25 * 60 : 5 * 60)
  }

  const switchMode = () => {
    const newMode = timerMode === "work" ? "break" : "work"
    setTimerMode(newMode)
    setTimeRemaining(newMode === "work" ? 25 * 60 : 5 * 60)
    setTimerActive(false)
  }



  return (
   <>
   {weatherData? <main className="relative h-screen w-screen overflow-hidden">

     <DirectVideoBackground weatherCondition={weatherData.weather}/>
   
      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-white z-10">
        {/* Location and Weather Info */}
        <div className="text-center mt-8">
          <h1 className="text-4xl font-bold tracking-tight">{weatherData.city},{weatherData.country} </h1>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="text-6xl font-light">{weatherData.temp}°</span>
            <div className="text-left text-lg opacity-80">
              <p className="capitalize">{weatherData.weather}</p>
              <p>Humidity: {weatherData.humidity}%</p>
              <p>Wind: {weatherData.wind} m/s</p>
            </div>
          </div>
       
        </div>

        {/* Pomodoro Timer */}
        <PomodoroTimer
          timerActive={timerActive}
          timerMode={timerMode}
          timeRemaining={timeRemaining}
          setTimeRemaining={setTimeRemaining}
          toggleTimer={toggleTimer}
          resetTimer={resetTimer}
          switchMode={switchMode}
        />

       
      </div>
    </main>:<div>Loading</div>}
   
   </>
  )
}
