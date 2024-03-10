import React, {useState, useEffect, useRef} from "react";

function Timer() {
    const [isRunning, setIsRunning] = useState(false)
    const [minInput, setMinInput] = useState(0)
    const [secInput, setSecInput] = useState(0)

    let inputToSeconds = (minInput * 60) + Number(secInput)

    const [countdown, setCountdown] = useState(0)
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

    function start() {
        if (countdown == 0) {
            setCountdown(inputToSeconds)
            setIsRunning(true)
        } else {
            setIsRunning(true)
        }
        
    }

    function stop(){
        setIsRunning(false);
    }

    function reset() {
        setCountdown(0)
    }

    function formatTime() {
        let minutes = Math.floor(countdown / 60)
        let seconds = Math.floor(countdown - minutes * 60)

        minutes = String(minutes).padStart(2, "0")
        seconds = String(seconds).padStart(2, "0")

        return `${minutes}:${seconds}`
    }
    
    return (
        <div className="stopwatch-timer">
            <div className="display">
                {formatTime()}
            </div>
            <input type="number" id="minutes" name="minutes" value={minInput} onInput={e => setMinInput(e.target.value)} /><span>min</span>
            <input type="number" id="seconds" name="seconds" value={secInput} onInput={e => setSecInput(e.target.value)} /><span>sec</span>
            <div className="controls">
                <button className="start-button" onClick={start}>Start</button>
                <button className="stop-button" onClick={stop} >Pause</button>
                <button className="reset-button" onClick={reset} >Reset</button>
            </div>
        </div>
    )
}

export default Timer