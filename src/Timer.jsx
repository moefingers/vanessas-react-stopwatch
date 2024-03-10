import React, {useState, useEffect, useRef} from "react";

function Timer() {
    let seconds = 90
    const [countdown, setCountdown] = useState(0)
    const intervalIdRef = useRef()

    useEffect(() => {
        intervalIdRef.current = setInterval(() => {
            setCountdown(prev => prev - 1)
        }, 1000)
        return () => clearInterval(intervalIdRef.current)
    }, [])

    useEffect(() => {
        if (countdown <= 0) {
            clearInterval(intervalIdRef.current)
        }
    })

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
                <button className="start-button">Start</button>
                <button className="stop-button">Stop</button>
                <button className="reset-button">Reset</button>
            </div>
        </div>
    )
}

export default Timer