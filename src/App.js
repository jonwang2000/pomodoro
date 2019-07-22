import React, { useState, useEffect } from "react";
import Timer from "./components/Timer";
import MainButton from "./components/MainButton";

function App() {
	const [timer, setTimer] = useState(0);
	const [timerOn, setTimerOn] = useState(false);
    const [timeLimit, setTimeLimit] = useState(15 * 60)

	useEffect(() => {
		let interval = null;
		if (timerOn) {
			interval = setInterval(() => {
				setTimer(timer + 1);
			}, 1000);
		} else if (!timerOn && timer !== 0) {
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	}, [timerOn, timer]);

    // Helper that converts total number of seconds to a string in a timer format
	const secondsToTimer = secNo => {
		let minutes = Math.floor(secNo / 60);
		let seconds = secNo % 60;
		if (seconds < 10) {
			seconds = String("0" + seconds);
		}
		return `${minutes}:${seconds}`;
	};

	return (
		<div>
			<p>{secondsToTimer(timer)}</p>

			<Timer timer={timer} setTimer={setTimer} />
			<MainButton timerOn={timerOn} setTimerOn={setTimerOn} />

			<button onClick={() => setTimerOn(!timerOn)}>Button!</button>
		</div>
	);
}

export default App;
