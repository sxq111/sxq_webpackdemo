import React, { Component } from 'react';

export default class Cpn extends Component {
	componentDidMount() {
		setTimeout(() => {
			import('./DimportCpn').then(rst => {
				console.log(rst);
			})
		}, 3000)
	}
	state = {
		count: 0
	}
	render() {
		return (
			<div>
				<button onClick={() => {
					this.setState({ count: this.state.count + 1 });
				}} >ADD</button>
				<br />
				{this.state.count}
			</div>
		)
	}
}