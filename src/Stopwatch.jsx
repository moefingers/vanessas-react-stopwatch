import React, {useState, useEffect, useRef} from 'react'

function Stopwatch() {
    //tracks if stopwatch is running or not
    const [isRunning, setIsRunning] = useState(false);
    //tracks elapsed time in milliseconds
    const [elapsedTime, setElapsedTime] = useState(0);

    //ref to store interval id (created by setInterval)
    const intervalIdRef = useRef(null)
    //ref to keep track of start time
    const startTimeRef = useRef(0)

//when stopwatch is running, updates elapsedTime every 10ms
//elapsed time continously updated in the state, reflecting the time elapsed since the stopwatch started
    useEffect(() => {
        if (isRunning) {
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current) //Date.now returns a number representing the timestamp in ms of the current time
            }, 10);
        }
        return () => {
            clearInterval(intervalIdRef.current);
        }
    }, [isRunning]);


    function start(){
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime
    };

    function stop(){
        setIsRunning(false);
    };

    function reset(){
        setElapsedTime(0);
        setIsRunning(false);
    };

    function formatTime(){

        //calculations to format time
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60))
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60)
        let seconds = Math.floor(elapsedTime / (1000) % 60)
        let milliseconds = Math.floor((elapsedTime % 1000) / 10)

        //displays leading 0 using padStart and converting each time slot to a String
        hours = String(hours).padStart(2, "0")
        minutes = String(minutes).padStart(2, "0")
        seconds = String(seconds).padStart(2, "0")
        milliseconds = String(milliseconds).padStart(2, "0")

        return `${minutes}:${seconds}:${milliseconds}`
    };

    return (
        <div className='stopwatch-timer'>
            <div className='display'>
                {formatTime()}
            </div>
            <div className='controls'>
                <button className='start-button' onClick={start} >Start</button>
                <button className='stop-button' onClick={stop} >Stop</button>
                <button className='reset-button' onClick={reset} >Reset</button>
            </div>
        </div>
    );
}

export default Stopwatch