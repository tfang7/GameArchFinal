var context;
var source, sourceJs;
var analyser,analyser2;
var splitter;
var url = 'public/data/HappyDays.mp3';
var array = new Array();
var boost = 0;
var audioLoaded = false;
var playing = false;
var ctx = $("#spectrogram").get()[0].getContext("2d");
var gradient = ctx.createLinearGradient(0,0,0,300);
    gradient.addColorStop(1,'#000000');
    gradient.addColorStop(0.75,'#ff0000');
    gradient.addColorStop(0.25,'#ffff00');
    gradient.addColorStop(0,'#ffffff');
var interval = window.setInterval(function() {
	if($('#loading_dots').text().length < 3) {
		$('#loading_dots').text($('#loading_dots').text() + '.');
	}
	else {
		$('#loading_dots').text('');
	}
}, 500);

try {
	context = new AudioContext();
}
catch(e) {
	$('#info').text('Web Audio API is not supported in this browser');
}
var request = new XMLHttpRequest();
request.open("GET", url, true);
request.responseType = "arraybuffer";

request.onload = function(){
	//
	context.decodeAudioData(request.response, 
	function(buffer){
	if (!buffer) {
		$('#info').text('ERROR: Decoding File Data');
		return;
	}

	initAudioNodes(buffer);


	sourceJs.onaudioprocess = function(e){
		array = new Uint8Array(analyser.frequencyBinCount);
        var arr = new Float32Array
		analyser.getByteFrequencyData(array);

        ctx.clearRect(0,0,1000,325);
        ctx.fillStyle = gradient;
        drawSpectrum(array);
        
        
	};
    
    clearInterval(interval);
        play();
        audioLoaded = true;
			// popup
			//$('body').append($('<div onclick="play();" id="play" style="width: ' + $(window).width() + 'px; height: ' + $(window).height() + 'px;"><div id="play_link"></div></div>'));
			$('#play_link').css('top', ($(window).height() / 2 - $('#play_link').height() / 2) + 'px');
			$('#play_link').css('left', ($(window).width() / 2 - $('#play_link').width() / 2) + 'px');
			$('#play').fadeIn()
	},
	function(error){
		//Decode error
        $('#info').text('Decoding error:' + error);

	}
	
	
	);
	
};
request.onerror = function() {
	$('#info').text('buffer: XHR error');
};

request.send();

function initAudioNodes(buffer){
    
	sourceJs = context.createScriptProcessor(2048, 1, 1);
	sourceJs.buffer = buffer;
	sourceJs.connect(context.destination);
	//first analyser
    analyser = context.createAnalyser();
	analyser.smoothingTimeConstant = 0.3;
	analyser.fftSize = 2048;
	//second
    analyser2 = context.createAnalyser();
    analyser2.smoothingTimeConstant = 0.0;
    analyser2.fftSize = 2048;
    
    
    //Spectrogram
    
    
	source = context.createBufferSource();
    splitter = context.createChannelSplitter();
    source.connect(splitter);
	source.buffer = buffer;
	source.loop = true;
	//splitter
    splitter.connect(analyser,0,0);
    splitter.connect(analyser2,1,0);
    
	source.connect(analyser);
	analyser.connect(sourceJs);
	source.connect(context.destination);
}

function drawSpectrum(array){
    for (var i = 0; i < array.length; i++){
        var value = array[i];
        ctx.fillRect(i*5,325-value,3,325);
    }
}
function play() {
	$('#play').fadeOut('normal', function() {
		$(this).remove();
        $('info').remove();
	});
	source.start(0);
}
function stop(){
 source.stop(0);   
}

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 80) {
        if (audioLoaded){
            var state = source.context.state;
            if (state == 'running'){
                source.context.suspend();

            }
            else {
                source.context.resume();

            }
            console.log(source.context.state);
            
        }


        console.log(playing);
    };

});