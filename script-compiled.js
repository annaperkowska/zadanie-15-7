
const single = document.createElement('li', { id: 'singleResult' });
class Stopwatch extends React.Component {
	constructor(display) {
		super(display);
		this.state = {
			running: false,
			display: display,
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			}
		};
	}

	reset() {
		this.setState({
			running: false,
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			}
		});
	}

	format(times) {
		return `${this.pad0(this.state.times.minutes)}:${this.pad0(this.state.times.seconds)}:${this.pad0(Math.floor(this.state.times.miliseconds))}`;
	}

	step() {
		if (!this.state.running) return;
		this.calculate();
	}

	calculate() {
		if (!this.state.running) return;
		let miliseconds = this.state.times.miliseconds;
		let seconds = this.state.times.seconds;
		let minutes = this.state.times.minutes;

		miliseconds += 1;

		if (miliseconds >= 100) {
			seconds += 1;
			miliseconds = 0;
		}
		if (seconds >= 60) {
			minutes += 1;
			seconds = 0;
		}

		this.setState({
			times: {
				minutes: minutes,
				seconds: seconds,
				miliseconds: miliseconds
			}
		});
	}

	start() {
		if (!this.state.running) {
			this.state.running = true;
			this.watch = setInterval(() => this.step(), 10);
		}
	}

	stop() {
		this.state.running = false;
		clearInterval(this.watch);
		const table = document.getElementById('results');

		single.innerText += this.format(this.state.times);
		table.appendChild(single);
	}

	pad0(value) {
		let result = value.toString();
		if (result.length < 2) {
			result = '0' + result;
		}
		return result;
	}

	resetTime() {
		this.state.times = {
			minutes: 0,
			seconds: 0,
			miliseconds: 0
		};
		this.state.display.innerText = this.format(this.state.times);
	}

	resetAllTimes() {
		single.innerText = " ";
		this.reset();
	}

	render() {
		return React.createElement('div', {}, React.createElement('div', { className: 'buttons' }, React.createElement('button', { onClick: () => this.start() }, 'start'), React.createElement('button', { onClick: () => this.stop() }, 'stop'), React.createElement('button', { onClick: () => this.reset() }, 'reset'), React.createElement('button', { onClick: () => this.resetAllTimes() }, 'clear')), React.createElement('div', { id: 'stopwatch' }, this.format()), React.createElement('ul', { id: 'results' }, 'Results:'));
	}
}

var element = React.createElement(Stopwatch);
ReactDOM.render(element, document.getElementById('app'));
