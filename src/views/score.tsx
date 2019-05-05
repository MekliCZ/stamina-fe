import React from 'react';
import {ReactComponent as ShapeSad} from "../assets/shapes/badSmall.svg";
import {ReactComponent as ShapeCasual} from "../assets/shapes/casualSmall.svg";
import {ReactComponent as ShapeHappy} from "../assets/shapes/happySmall.svg";
import {Link} from 'react-router-dom';

interface IState {
	records: {
		uuid: string;
		title: string;
		recorded: string;
		rating: number;
	}[];
}

export default class Score extends React.Component {
	state: IState = {
		records: [],
	};

	componentDidMount() {
		fetch('http://138.197.181.210:666/records')
			.then((result) => {
				return result.json();
			})
			.then((result) => {
				this.setState({
					records: result.records,
				});
			});
	}

	private static getMood(rating) {
		if (rating <= 33) {
			return(
				<ShapeSad />
			);
		} else if (rating <= 66) {
			return(
				<ShapeCasual />
			);
		} else {
			return(
				<ShapeHappy />
			);
		}
	}

	render() {
		return(
			<div className="score">
				<div className="controls" />
				<div className="title">Mood score</div>
				{
					this.state.records.map((item, key) => (
						<Link to={`/record/${item.uuid}`}>
							<div className="score-item">
								<div className="score-item-left">
									<div className="score-item-icon">{Score.getMood(Math.round(item.rating*100))}</div>
									<div className="score-item-texts">
										<div className="score-item-name">{item.title}</div>
										<div className="score-item-date">{item.recorded}</div>
									</div>
								</div>
								<div className="score-item-right">
									{Math.round(item.rating*100)}
								</div>
							</div>
						</Link>
					))
				}
			</div>
		);
	}
}
