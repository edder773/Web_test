import React, { useEffect, useRef, useState } from 'react';
import SimplePeer from 'simple-peer';

const WebRTCSFU: React.FC = () => {
	const localVideoRef = useRef<HTMLVideoElement>(null);
	const remoteVideoRef = useRef<HTMLVideoElement>(null);
	const [videoEnabled, setVideoEnabled] = useState<boolean>(true);
	const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
	let localPeer: SimplePeer.Instance | null = null;

	useEffect(() => {
		navigator.mediaDevices
			.getUserMedia({ video: videoEnabled, audio: audioEnabled })
			.then(handleLocalMediaStream)
			.catch(error => console.error('Error accessing media devices:', error));
	}, [videoEnabled, audioEnabled]);

	const handleLocalMediaStream = (stream: MediaStream) => {
		if (localVideoRef.current) {
			localVideoRef.current.srcObject = stream;
		}
	};

	const toggleVideo = () => {
		setVideoEnabled(prevState => !prevState);
	};

	const toggleAudio = () => {
		setAudioEnabled(prevState => !prevState);
	};

	return (
		<div>
			<video
				ref={localVideoRef}
				autoPlay
				playsInline
				muted={videoEnabled}
				width="400"
				height="300"
			/>
			<div>
				<button onClick={toggleVideo}>
					{videoEnabled ? '화면 끄기' : '비디오 켜기'}
				</button>
				<button onClick={toggleAudio}>
					{audioEnabled ? '마이크 끄기' : '마이크 켜기'}
				</button>
			</div>
		</div>
	);
};

export default WebRTCSFU;
