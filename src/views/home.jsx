import React from 'react';

export default class Home extends React.Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const H = window.H;
		var platform = new H.service.Platform({
			'app_id': 'gtH2Vy08frXz72GS1bQK',
			'app_code': '3JRF9-v9o5DFlTVqSdO65Q'
		});

		var defaultLayers = platform.createDefaultLayers();
		fetch('http://138.197.181.210:666/records')
			.then((result) => {
				return result.json();
			})
			.then((result) => {
				this.setState({
					records: result.records,
				});

		navigator.geolocation.getCurrentPosition((position) => {
			// Instantiate (and display) a map object:
			this.map = new H.Map(
				document.getElementById('map'),
				defaultLayers.normal.map,
				{
					zoom: 13,
					center: {lat: position.coords.latitude, lng: position.coords.longitude}
				});

			var ui = H.ui.UI.createDefault(this.map, defaultLayers);

			const redMarker = `<svg width="36" height="38" viewBox="0 0 36 38" fill="none" xmlns="http://www.w3.org/2000/svg"><circle opacity="0.2" cx="18" cy="16" r="16" fill="#FF7878"/><g filter="url(#filter0_d)"><circle cx="18" cy="16" r="10" fill="#FF7878"/></g><defs><filter id="filter0_d" x="0" y="2" width="36" height="36" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="4"/><feGaussianBlur stdDeviation="4"/><feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.470117 0 0 0 0 0.470117 0 0 0 0.4 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`;
			const yellowMarker = `<svg width="36" height="38" viewBox="0 0 36 38" fill="none" xmlns="http://www.w3.org/2000/svg"><circle opacity="0.2" cx="18" cy="16" r="16" fill="#FFDB5B"/><g filter="url(#filter0_d)"><circle cx="18" cy="16" r="10" fill="#FFDB5B"/></g><defs><filter id="filter0_d" x="0" y="2" width="36" height="36" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="4"/><feGaussianBlur stdDeviation="4"/><feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.858676 0 0 0 0 0.357617 0 0 0 0.4 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`;
			const blueMarker = `<svg width="36" height="38" viewBox="0 0 36 38" fill="none" xmlns="http://www.w3.org/2000/svg"><circle opacity="0.2" cx="18" cy="16" r="16" fill="#78DAFF"/><g filter="url(#filter0_d)"><circle cx="18" cy="16" r="10" fill="#78DAFF"/></g><defs><filter id="filter0_d" x="0" y="2" width="36" height="36" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="4"/><feGaussianBlur stdDeviation="4"/><feColorMatrix type="matrix" values="0 0 0 0 0.470117 0 0 0 0 0.855165 0 0 0 0 1 0 0 0 0.4 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`;

			this.state.records.forEach((item) => {
				const rating = Math.round(item.rating * 100);
				let iconSVG = redMarker;
				if (rating <= 33) {
					iconSVG = redMarker;
				} else if (rating <= 66) {
					iconSVG = yellowMarker;
				} else {
					iconSVG = blueMarker;
				}
				const icon = new H.map.Icon(iconSVG);
				const marker = new H.map.Marker({
					lat: item.coordinates.latitude,
					lng: item.coordinates.longitude,
				}, {icon: icon});
				this.map.addObject(marker);
			});
		});
			});
	}

	render() {
		return (
			<div id="map" />
		)
	}
}
