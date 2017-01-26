(function (){

	var audio, isWebkit, oscillator, gainNode;

	//Create audio context
	var audio = new (window.AudioContext || window.webkitAudioContext)();

	// Event listeners
	document.addEventListener('mousedown', startTone, false);
	document.addEventListener('mouseup', stopTone, false);

	function startTone(){
		// Create oscillator and gainNode
		oscillator = audio.createOscillator();
		if(!isWebkit){
			gainNode = audio.createGain();
		}else{
			gainNode = audio.createGainNode();
		}

		// Set waveform
		oscillator.type = 'sawtooth';

		// Link audio chain
		oscillator.connect(gainNode);
		gainNode.connect(audio.destination);
		oscillator.start();

		document.addEventListener('mousemove', controlSound, false);
	}

	function stopTone(){
		oscillator.stop();
		document.removeEventListener('mousemove', controlSound, false);
	}

	function controlSound(e){
		// Set mouse locations
		var x = e.clientX;
		var y = e.clientY;
		var w = window.innerWidth;
		var h = window.innerHeight;
		var low = 261.63;	// Middle C
		var high = 16000.25;	// Tenor C
		var range = high - low;
		gainNode.gain.value = x/w;
		oscillator.frequency.value = ((h - y) / h * range) + low;

	}	

})();