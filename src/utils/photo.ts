/*
{
	record: {
		position: {
		  latitude: 50,
		  longitude: 14,
		},
		faceImage: FACE_IMAGE,
		noiseSound: NOISE_SOUND,
		recorder: new Date().toISOString(),
	}
}
 */

interface IResult {
	record: {
		coordinates?: {
			latitude: number;
			longitude: number;
		};
		faceImage?: string;
		recorder: string;
	};
}

export default class Photo {
	streaming: boolean;
	video: HTMLVideoElement | null;
	canvas: HTMLCanvasElement | null;
	width: number;
	height: number;

	constructor() {
		this.streaming = false;
		this.video = document.querySelector('.photo .video');
		this.canvas = document.querySelector('.photo .canvas');
		this.width = 0;
		this.height = 0;

		navigator.mediaDevices.getUserMedia({video: true, audio: false})
			.then((stream) => {
				this.video.srcObject = stream;
				this.video.play();
			})
			.catch((err) => {
				console.log("An error occurred: " + err);
			});

		this.video.addEventListener('canplay', (ev) => {
			if (!this.streaming) {
				this.height = this.video.videoHeight;
				this.width = this.video.videoWidth;

				// Firefox currently has a bug where the height can't be read from
				// the video, so we will make assumptions if this happens.

				// if (isNaN(this.height)) {
				// 	this.height = this.width / (4/3);
				// }

				this.video.setAttribute('width', this.width.toString());
				this.video.setAttribute('height', this.height.toString());
				this.canvas.setAttribute('width', this.width.toString());
				this.canvas.setAttribute('height', this.height.toString());
				this.streaming = true;
			}
		}, false);
	}

	public takePicture = () => {
		const result: IResult = {
			record: {
				coordinates: {
					latitude: 0,
					longitude: 0,
				},
				recorder: new Date().toISOString(),
			}
		};
		navigator.geolocation.getCurrentPosition((position) => {
			result.record.coordinates = {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
			};
			const context = this.canvas.getContext('2d');
			this.canvas.width = this.width;
			this.canvas.height = this.height;
			if (context) {
				context.drawImage(this.video, 0, 0, this.width, this.height);
				result.record.faceImage = this.canvas.toDataURL('image/jpg');
			}
			console.log(result);
			fetch('http://138.197.181.210:666/records', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(result)
			})
				.then((result) => {
					return result.json();
				})
				.then((result) => {
					console.log(result);
				});
		}, (e) => {
			console.error(e);
		});
	};
}
