import React, {useState, useEffect, useRef} from "react";

function Timer() {
    let seconds = 10
    const [isRunning, setIsRunning] = useState(false)
    const [countdown, setCountdown] = useState(seconds)
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
        setIsRunning(true)
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
            <div className="controls">
                <button className="start-button" onClick={start}>Start</button>
                <button className="stop-button" onClick={stop} >Pause</button>
                <button className="reset-button" onClick={reset} >Reset</button>
            </div>
        </div>
    )
}

export default Timer