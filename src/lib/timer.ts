
import { writable, type Subscriber, type Invalidator, type Unsubscriber, type Readable} from 'svelte/store';

export interface Timer {
	state: 'playing' | 'stopped';
	remainingTime: number;
	duration: number;
}

export interface ReadableTimer extends Readable<Timer> {
	start: () => void;
	stop: () => void;
}


export function createTimer(duration: number, onComplete: () => Promise<void>): ReadableTimer {
	let timerEnd: number;
	let remainingTime = duration;
	let timer: Timer = { state: 'stopped', remainingTime, duration };
	const store = writable<Timer>(timer);
	let intervalId: number | undefined;

	const tick = () => {
		const currentValue = timerEnd - new Date().valueOf();
		if (currentValue > 0) {
			timer = {...timer, remainingTime: currentValue };
			store.set(timer);
		} else {
			timer = {...timer, state: 'stopped', remainingTime: 0 };
			store.set(timer);
			clearInterval(intervalId);
			intervalId = undefined;
			onComplete();
		}
	};

	const start = () => {
		if (timer.state == "stopped") {
			timerEnd = new Date().valueOf() + remainingTime;
			timer = {...timer, state: 'playing' };
			store.set(timer);
			intervalId = setInterval(tick, 50);
		}
	};

	const stop = () => {
		if (timer.state == "playing") {
			clearInterval(intervalId);
			remainingTime = timerEnd - new Date().valueOf();
			timer = {...timer, state: 'stopped', remainingTime };
			store.set(timer);
		}
	};

	let subscribers = 0;
	return {
		subscribe(run: Subscriber<Timer>, invalidate: Invalidator<Timer> | undefined): Unsubscriber {
			subscribers = subscribers + 1;
			const unsubscriber = store.subscribe(run, invalidate);
			return () => {
				unsubscriber();
				subscribers = subscribers - 1;
				if (subscribers == 0) {
					stop();
				}
			}
		},
		start,
		stop,
	}
}