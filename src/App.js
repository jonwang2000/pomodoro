import React, { useState, useEffect } from "react";
// import Timer from "./components/Timer";
// import MainButton from "./components/MainButton";

function App() {
	const [timer, setTimer] = useState(0);
	const [timerOn, setTimerOn] = useState(false);
	const [timeLimit, setTimeLimit] = useState(15 * 60);
	const [timerLabel, setTimerLabel] = useState("Idle");

    // Timer effect
	useEffect(() => {
		let interval = null;

        if (timerOn) {
            interval = setInterval(() => {
				setTimer(timer + 1);
			}, 1000);
        } else {
            clearInterval(interval);
        }

		if (timeLimit !== 0 && timer === timeLimit) {
			console.log("TIME LIMIT");
		} else if (timerOn && timer <= timeLimit) {
			setTimerLabel("Working");
		} else if (timerOn && timer >= timeLimit) {
			setTimerLabel("Take a break!");
		} else if (!timerOn && timer !== 0) {
			setTimerLabel("Idle");
		}
		return () => clearInterval(interval);
	}, [timerOn, timer, timeLimit]);

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
			<p>{timerLabel}</p>

			<div>
				<input
					value={timeLimit / 60}
					type="number"
					onChange={e => {
						setTimeLimit(e.target.value * 60);
					}}
				/>
				minutes
			</div>

			<button
				disabled={timeLimit === 0}
				onClick={() => setTimerOn(!timerOn)}
			>
				Button!
			</button>
		</div>
	);
}

export default App;
