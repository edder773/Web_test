import React, { useEffect, useRef, useState } from 'react';
import SimplePeer from 'simple-peer';

const VideoChat: React.FC = () => {
	const myVideoRef = useRef<HTMLVideoElement>(null);
	const otherVideoRef = useRef<HTMLVideoElement>(null);
	const myPeerRef = useRef<SimplePeer.Instance | null>(null);
	const myStreamRef = useRef<MediaStream | undefined>();
	const [isVideoEnabled, setIsVideoEnabled] = useState(true);
	const [isAudioEnabled, setIsAudioEnabled] = useState(true);

	useEffect(() => {
		navigator.mediaDevices
			.getUserMedia({ video: true, audio: true })
			.then(stream => {
				myStreamRef.current = stream;
				if (myVideoRef.current) myVideoRef.current.srcObject = stream;

				myPeerRef.current = new SimplePeer({ initiator: true, stream });

				myPeerRef.current.on('signal', data => {});

				myPeerRef.current.on('stream', stream => {
					if (otherVideoRef.current) otherVideoRef.current.srcObject = stream;
				});

				myPeerRef.current.on('connect', () => {});
			})
			.catch(error => {
				console.error('Error accessing media devices: ', error);
			});

		return () => {
			if (myStreamRef.current) {
				myStreamRef.current.getTracks().forEach(track => track.stop());
			}
		};
	}, []);

	const connectToOtherUser = (otherUserSignal: any) => {
		if (!myStreamRef.current) return;

		const otherPeer = new SimplePeer({
			initiator: false,
			stream: myStreamRef.current,
		});

		otherPeer.on('signal', data => {});

		otherPeer.on('stream', stream => {
			if (otherVideoRef.current) otherVideoRef.current.srcObject = stream;
		});

		otherPeer.signal(otherUserSignal);

		otherPeer.on('connect', () => {});

		return otherPeer;
	};

	const handleToggleVideo = () => {
		if (myStreamRef.current) {
			const videoTrack = myStreamRef.current.getVideoTracks()[0];
			if (videoTrack) {
				videoTrack.enabled = !videoTrack.enabled;
				setIsVideoEnabled(videoTrack.enabled);
			}
		}
	};

	const handleToggleAudio = () => {
		if (myStreamRef.current) {
			const audioTrack = myStreamRef.current.getAudioTracks()[0];
			if (audioTrack) {
				audioTrack.enabled = !audioTrack.enabled;
				setIsAudioEnabled(audioTrack.enabled);
			}
		}
	};

	return (
		<div className="video-chat-container">
			<video ref={myVideoRef} autoPlay muted />
			<video ref={otherVideoRef} autoPlay />
			<div className="button-container">
				<button onClick={handleToggleVideo}>
					{isVideoEnabled ? '비디오 끄기' : '비디오 켜기'}
				</button>
				<button onClick={handleToggleAudio}>
					{isAudioEnabled ? '마이크 끄기' : '마이크 켜기'}
				</button>
				<button onClick={() => connectToOtherUser('otherUserSignalHere')}>
					연결하기
				</button>
			</div>
		</div>
	);
};

export default VideoChat;
