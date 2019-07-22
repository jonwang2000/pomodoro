import React, { useState, useEffect } from "react";
import Timer from "./components/Timer";
import MainButton from "./components/MainButton";

function App() {
	const [timer, setTimer] = useState(0);
	const [timerOn, setTimerOn] = useState(false);

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

	return (
		<div>
            <p>{timer}</p>

			<Timer timer={timer} setTimer={setTimer} />
			<MainButton timerOn={timerOn} setTimerOn={setTimerOn} />

            <button onClick={() => setTimerOn(!timerOn)}>Button!</button>
		</div>
	);
}

export default App;
