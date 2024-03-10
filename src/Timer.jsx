import React, {useState, useEffect, useRef} from "react";

function Timer() {
    let seconds = 90
    const [countdown, setCountdown] = useState(seconds)
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
        <h2>Countdown: {formatTime()} </h2>
    )
}

export default Timer