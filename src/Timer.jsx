import React, {useState, useEffect, useRef} from "react";
import sound from './assets/Cute-Ringtone.wav'

function Timer() {
    const [isRunning, setIsRunning] = useState(false)
    const [minInput, setMinInput] = useState(0)
    const [secInput, setSecInput] = useState(0)

    let inputToSeconds = (minInput * 60) + Number(secInput)

    const [countdown, setCountdown] = useState(300)
    const intervalIdRef = useRef()

    useEffect(() => {
        if (isRunning) {
        intervalIdRef.current = setInterval(() => {
            setCountdown(prev => prev - 1)
        }, 1000)
    }
        return () => clearInterval(intervalIdRef.current)
    }, [isRunning])

    useEffect(() => {
        if (countdown <= 0) {
            clearInterval(intervalIdRef.current)
            setIsRunning(false)
        }
    })

    useEffect(() => {
        if (countdown === 0 && !isRunning) {
            playTimerSound(0.2)
        }
    }, [countdown, isRunning])

    function start() {
        if (countdown != inputToSeconds && inputToSeconds != 0) {
            setCountdown(inputToSeconds)
            setIsRunning(true)
            stopTimerSound()
        } else {
            setIsRunning(true)
        }
        
    }

    function reset() {
        setCountdown(300)
        setIsRunning(false)
        stopTimerSound()
    }

    function formatTime() {
        let minutes = Math.floor(countdown / 60)
        let seconds = Math.floor(countdown - minutes * 60)

        minutes = String(minutes).padStart(2, "0")
        seconds = String(seconds).padStart(2, "0")

        return `${minutes}:${seconds}`
    }

    let audio;

    function playTimerSound(volume) {
            audio = new Audio(sound)
            audio.volume = volume
            audio.loop = true
            return audio.play()
    }

    function stopTimerSound() {
        if (audio) {
            audio.pause()
        }
    }
    
    return (
        <div className="stopwatch-timer">
            {countdown === 0 && !isRunning && <div className="timer-end-container"><p>TIMER HAS ENDED!</p></div>}
            <div className="display">
                {formatTime()}
            </div>
            <div className="input-container">
                <input type="number" id="minutes" name="minutes" value={minInput} onInput={e => setMinInput(e.target.value)} min={0} /><span>min</span>
                <input type="number" id="seconds" name="seconds" value={secInput} onInput={e => setSecInput(e.target.value)} min={0}/><span>sec</span>
            </div>
            <div className="controls">
                <button className="start-button" onClick={start}>Start</button>
                <button className="reset-button" onClick={reset} >Reset</button>
            </div>
        </div>
    )
}

export default Timer