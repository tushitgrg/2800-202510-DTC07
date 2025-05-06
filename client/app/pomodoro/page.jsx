"use client"

import { useState } from "react"

import VideoBackground from "@/components/Pomodoro/VideoBackground"
import PomodoroTimer from "@/components/Pomodoro/PomodoroTimer"


// Hardcoded weather data
const weatherData = {
  location: "Tokyo, Japan",
  condition: "snowy", // Options: sunny, rainy, cloudy, snowy
  temperature: 18,
  humidity: 85,
  windSpeed: 12,
  // YouTube video sources for each weather condition
  videos: {
    sunny: "https://www.youtube.com/watch?v=vLIQn-RrCa8", // Sunny beach scene
    rainy: "https://www.youtube.com/watch?v=mPZkdNFkNps", // Rainy window scene
    cloudy: "https://www.youtube.com/watch?v=E5Ib4EuP4q8", // Cloudy sky timelapse
    snowy: "https://www.youtube.com/watch?v=vz91QpgUjFc", // Snowy forest scene
  },
}

export default function WeatherPomodoroPage() {
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
    <main className="relative h-screen w-screen overflow-hidden">
      {/* Video Background - either YouTube or direct file */}
      <VideoBackground weatherCondition={weatherData.condition} videoSources={weatherData.videos} />
   
      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-white z-10">
        {/* Location and Weather Info */}
        <div className="text-center mt-8">
          <h1 className="text-4xl font-bold tracking-tight">{weatherData.location}</h1>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="text-6xl font-light">{weatherData.temperature}°</span>
            <div className="text-left text-lg opacity-80">
              <p className="capitalize">{weatherData.condition}</p>
              <p>Humidity: {weatherData.humidity}%</p>
              <p>Wind: {weatherData.windSpeed} km/h</p>
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
    </main>
  )
}
