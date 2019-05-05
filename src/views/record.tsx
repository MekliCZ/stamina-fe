import React from 'react';
import {ReactComponent as ShapeHappy} from '../assets/shapes/happy.svg';
import {ReactComponent as ShapeCasual} from '../assets/shapes/casual.svg';
import {ReactComponent as ShapeSad} from '../assets/shapes/sad.svg';
import {ReactComponent as ShapeArrowLeft} from '../assets/shapes/arrowLeft.svg';
import classNames from 'class-names';

interface IState {
	record: {
		rating: number;
		geojson: {
			features: {
				properties: {
					name: string;
				};
			}[];
		};
		ratings: {
			noice: {
				volume: number;
			};
			activity: {
				rating: number;
			};
			weather: {
				rating: number;
			};
			area: {
				rating: number;
			};
			trafic: {
				rating: number;
			};
			polution: {
				rating: number;
			};
		}
		created: string;
	};
}

interface IProps {
	match: any;
	history: any;
}

export default class Record extends React.Component<IProps> {
	state: IState;

	constructor(props) {
		super(props);

		console.log(props.history.goBack);

		this.state = {
			record: {
				rating: 0,
				created: '',
				geojson: {
					features: [{
						properties: {
							name: '',
						},
					}],
				},
				ratings: {
					noice: {
						volume: 2,
					},
					activity: {
						rating: 1,
					},
					weather: {
						rating: 1,
					},
					area: {
						rating: 1,
					},
					trafic: {
						rating: 1,
					},
					polution: {
						rating: 1,
					},
				}
			},
		};
	}

	componentDidMount() {
		fetch(`http://138.197.181.210:666/records/${this.props.match.params.id}`)
			.then((result) => {
				return result.json();
			})
			.then((result) => {
				this.setState({
					record: result.record,
				});
			})
	}

	private getMood() {
		if (this.state.record.rating <= 33) {
			return(
				<ShapeSad />
			);
		} else if (this.state.record.rating <= 66) {
			return(
				<ShapeCasual />
			);
		} else {
			return(
				<ShapeHappy />
			);
		}
	}

	private getColor() {
		if (this.state.record.rating <= 33) {
			return(
				'red'
			);
		} else if (this.state.record.rating <= 66) {
			return(
				'yellow'
			);
		} else {
			return(
				'blue'
			);
		}
	}

	public render() {
		return(
			<div className="record">
				<div className="controls">
					<ShapeArrowLeft onClick={this.props.history.goBack} />
				</div>
				<div className="record-circle">
					<div className="record-circle-score">{Math.round(this.state.record.rating * 100)}</div>
					<div className="record-circle-location">
						{this.state.record.geojson.features[0].properties.name}
					</div>
					<div className="record-circle-time">
						{this.state.record.created}
					</div>
				</div>
				<div className={classNames("record-mood", `record-mood--${this.getColor()}`)}>
					{this.getMood()}
				</div>
				<div className="title">Recorded data</div>
				<div className="record-item">
					<div className="record-item-name">Noise</div>
					<div className="record-item-data">{Math.round(this.state.record.ratings.noice.volume * 100)}</div>
				</div>
				<div className="record-item">
					<div className="record-item-name">Activity</div>
					<div className="record-item-data">{Math.round(this.state.record.ratings.activity.rating * 100)}</div>
				</div>
				<div className="record-item">
					<div className="record-item-name">Weather</div>
					<div className="record-item-data">{Math.round(this.state.record.ratings.weather.rating * 100)}</div>
				</div>
				<div className="record-item">
					<div className="record-item-name">Area</div>
					<div className="record-item-data">{Math.round(this.state.record.ratings.area.rating * 100)}</div>
				</div>
				<div className="record-item">
					<div className="record-item-name">Traffic</div>
					<div className="record-item-data">{Math.round(this.state.record.ratings.trafic.rating * 100)}</div>
				</div>
				<div className="record-item">
					<div className="record-item-name">Pollution</div>
					<div className="record-item-data">{Math.round(this.state.record.ratings.polution.rating * 100)}</div>
				</div>
			</div>
		);
	}
}
