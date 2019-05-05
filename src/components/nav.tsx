import React from 'react';
import Photo from '../utils/photo';
import {Link} from 'react-router-dom';

import {ReactComponent as ShapePlus} from '../assets/shapes/plus.svg';
import {ReactComponent as ShapeMap} from '../assets/shapes/map.svg';
import {ReactComponent as ShapeChart} from '../assets/shapes/chart.svg';

export default class Nav extends React.PureComponent {
	private photo: Photo;

	public constructor(props: any) {
		super(props);

		this.photo = new Photo();
	}

	public render() {
		return(
			<nav>
				<div className="link">
					<Link to="/">
						<ShapeMap />
					</Link>
				</div>
				<div className="button">
					<ShapePlus onClick={this.photo.takePicture} />
				</div>
				<div className="link">
					<Link to="/records">
						<ShapeChart />
					</Link>
				</div>
			</nav>
		);
	}
}
