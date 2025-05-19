"use client"; // Marks this as a Client Component, enabling hooks and interactivity.

import { useEffect } from "react";
import { Play, Pause, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * PomodoroTimer Component
 * Implements a Pomodoro timer with work and break modes, countdown, and controls.
 *
 * @param {Object} props - Component properties.
 * @param {boolean} props.timerActive - True if the timer is currently running.
 * @param {'work' | 'break'} props.timerMode - Current mode of the timer ('work' or 'break').
 * @param {number} props.timeRemaining - Seconds remaining on the timer.
 * @param {Function} props.setTimeRemaining - Setter for timeRemaining state.
 * @param {Function} props.toggleTimer - Function to start/pause the timer.
 * @param {Function} props.resetTimer - Function to reset the timer.
 * @param {Function} props.switchMode - Function to switch between work and break modes.
 */
export default function PomodoroTimer({
  timerActive,
  timerMode,
  timeRemaining,
  setTimeRemaining,
  toggleTimer,
  resetTimer,
  switchMode,
}) {
  // Timer countdown effect
  useEffect(() => {
    let interval;

    if (timerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      // Play sound when timer ends
      const audio = new Audio("/notification.mp3");
      audio.play();

      // Auto switch to the other mode
      switchMode();
    }

    return () => clearInterval(interval);
  }, [timerActive, timeRemaining, setTimeRemaining, switchMode]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Calculate progress percentage
  const totalTime = timerMode === "work" ? 25 * 60 : 5 * 60;
  const progress = (timeRemaining / totalTime) * 100;

  return (
    <div className="flex flex-col items-center">
      {/* Timer Mode */}
      <div className="flex gap-4 mb-4">
        <Button
          variant="ghost"
          className={cn(
            "text-white/70 hover:text-white hover:bg-white/10",
            timerMode === "work" && "bg-white/20 text-white",
          )}
          onClick={() => {
            if (timerMode !== "work") {
              setTimeRemaining(25 * 60);
              switchMode();
            }
          }}
        >
          Focus
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "text-white/70 hover:text-white hover:bg-white/10",
            timerMode === "break" && "bg-white/20 text-white",
          )}
          onClick={() => {
            if (timerMode !== "break") {
              setTimeRemaining(5 * 60);
              switchMode();
            }
          }}
        >
          Break
        </Button>
      </div>

      {/* Timer Display */}
      <div className="relative w-64 h-64 flex items-center justify-center mb-6">
        {/* Progress Circle */}
        <svg className="absolute w-full h-full -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            fill="transparent"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="8"
          />
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            fill="transparent"
            stroke="rgba(255, 255, 255, 0.8)"
            strokeWidth="8"
            strokeDasharray="282.7"
            strokeDashoffset={282.7 - (282.7 * progress) / 100}
            strokeLinecap="round"
          />
        </svg>

        {/* Time Display */}
        <div className="text-6xl font-light z-10">
          {formatTime(timeRemaining)}
        </div>
      </div>

      {/* Timer Controls */}
      <div className="flex gap-4">
        <Button
          size="icon"
          variant="outline"
          className="w-12 h-12 rounded-full border-white/20 bg-white/10 hover:bg-white/20 text-white"
          onClick={toggleTimer}
        >
          {timerActive ? <Pause size={24} /> : <Play size={24} />}
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="w-12 h-12 rounded-full border-white/20 bg-white/10 hover:bg-white/20 text-white"
          onClick={resetTimer}
        >
          <SkipForward size={24} />
        </Button>
      </div>
    </div>
  );
}
