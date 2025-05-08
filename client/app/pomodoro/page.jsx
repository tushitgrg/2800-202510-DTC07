"use client"

import { useEffect, useState, useRef } from "react"
import PomodoroTimer from "@/components/Pomodoro/PomodoroTimer"
import DirectVideoBackground from "@/components/Pomodoro/VideoBackground"
import { fetchUserWeather } from "@/lib/userLocation"
import MusicBackground from "@/components/Pomodoro/MusicBackground"

export default function WeatherPomodoroPage() {
  // Initial state is null. After fetching weather data, it will hold { city, country, temp, weather, humidity, speed }
  const [weatherData, setweatherData] = useState(null)

  // Asynchronously fetches the weather and updates state
  const setData = async () => {
    setweatherData(await fetchUserWeather())
  }

  // Run setData once when the component mounts ([] to run only once). Initiate the weather lookup
  useEffect(() => {
    setData()
  }, [])

  const [timerActive, setTimerActive] = useState(false) // Track whether the timer is running
  const [timerMode, setTimerMode] = useState("work") // Mode either "work" or "break"
  const [timeRemaining, setTimeRemaining] = useState(25 * 60) // 25 minutes in seconds
  const musicRef = useRef(null) // Allow calling .playMusic() or .pauseMusic() on the MusicBackground component

  // Toggle the timer state
  const toggleTimer = () => {
    const newTimerState = !timerActive
    setTimerActive(newTimerState)
    
    // Start/stop music based on whether the timer is active
    if (musicRef.current) {
      if (newTimerState) {
        musicRef.current.playMusic()
      } else {
        musicRef.current.pauseMusic()
      }
    }
  }

  // Reset timer based on the current mode
  const resetTimer = () => {
    setTimerActive(false)
    setTimeRemaining(timerMode === "work" ? 25 * 60 : 5 * 60)

    // Always stops music
    if (musicRef.current) {
      musicRef.current.pauseMusic()
    }
  }

  // Switch between "work" and "break"
  const switchMode = () => {
    const newMode = timerMode === "work" ? "break" : "work"
    setTimerMode(newMode)
    setTimeRemaining(newMode === "work" ? 25 * 60 : 5 * 60)
    setTimerActive(false)

    // Always stops music when switching
    if (musicRef.current) {
      musicRef.current.pauseMusic()
    }
  }

  return (
    <>
      {weatherData ? <main className="relative h-screen w-screen overflow-hidden">
        <MusicBackground ref={musicRef} weatherCondition={weatherData.weather} />
        <DirectVideoBackground weatherCondition={weatherData.weather} />

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-white z-10">
          {/* Location and Weather Info */}
          <div className="text-center mt-8">
            <h1 className="text-4xl font-bold tracking-tight">{weatherData.city}, {weatherData.country} </h1>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="text-6xl font-light">{weatherData.temp}°</span>
              <div className="text-left text-lg opacity-80">
                <p className="capitalize">{weatherData.weather}</p>
                <p>Humidity: {weatherData.humidity}%</p>
                <p>Wind: {weatherData.speed} km/h</p>
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
      </main> : <div>Loading</div>}

    </>
  )
}