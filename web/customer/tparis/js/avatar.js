/******************
Telecom ParisTech
******************/


var canvas = document.getElementById('canvas');
paper.setup(canvas);	

paper.project.importSVG(document.getElementById('avatar'));

//Resize the svg to fit within the window:
paper.project.activeLayer.fitBounds(paper.view.bounds);

//Global init states
var blinkDone = false;
var mood = 'neutral';
var animationTime = 0;
var time = 0;

var items = paper.project.activeLayer.firstChild.children;

//Breathe elements
var body = items[1];
var clothes = items[2].children[0];

//Expression elements
var expression = items[5];
var expression_elems = expression.children;

//Blink elements
var eyelid_left = expression_elems[2].segments[1];
var eyelid_right = expression_elems[3].segments[1];

//Expressions elements
var mouth = expression_elems[4];
var eyebrow_left = expression_elems[5];
var eyebrow_right = expression_elems[6];

//eyebrow_right.selected = true;

//Init states breathe
body_init = body.position.y;
clothes_init = clothes.position.y;

//Init states eyes

var eyelid_left_init = eyelid_left.point.y;
var eyelid_right_init = eyelid_right.point.y;

//Frequences
var freq = 0.3;
var freq_breathe = 5;

//Fonctions

	//Breathe
	function breathe () {

		var bodyy = body_init - 2 * Math.abs(Math.sin(time * Math.PI /freq_breathe));;
		body.position.y = bodyy;

		var clothesy = clothes_init - 2 * Math.abs(Math.sin(time * Math.PI /freq_breathe));;
		clothes.position.y = clothesy;

	}

	//Blink left eye
	function blink_left () {

		var eyelid_left1y = eyelid_left_init + 10 * Math.abs(Math.sin(time * Math.PI /freq));
		eyelid_left.point.y = eyelid_left1y;

	}

	//Blink right eye
	function blink_right () {

		var eyelid_right1y = eyelid_right_init + 10 * Math.abs(Math.sin(time * Math.PI /freq));
		eyelid_right.point.y = eyelid_right1y;

	}
	//Neutral to joy
	function toHappy () {
		
		//Mouth
		var mouth0py = mouth.segments[0].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[0].point.y = mouth0py;

		var mouth1py = mouth.segments[1].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[1].point.y = mouth1py;

		var mouth2py = mouth.segments[2].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[2].point.y = mouth2py;

		var mouth3py = mouth.segments[3].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[3].point.y = mouth3py;

		var mouth4py = mouth.segments[4].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[4].point.y = mouth4py;

		var mouth5py = mouth.segments[5].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[5].point.y = mouth5py;

		//Eyebrows
		var eyebrow_lefty = eyebrow_left.position.y - 0.2 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_left.position.y = eyebrow_lefty;

		var eyebrow_righty = eyebrow_right.position.y - 0.2 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_right.position.y = eyebrow_righty;

	}
	//Joy to neutral
	function happyTo () {
			
		//Mouth
		var mouth0py = mouth.segments[0].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[0].point.y = mouth0py;

		var mouth1py = mouth.segments[1].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[1].point.y = mouth1py;

		var mouth2py = mouth.segments[2].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[2].point.y = mouth2py;

		var mouth3py = mouth.segments[3].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[3].point.y = mouth3py;

		var mouth4py = mouth.segments[4].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[4].point.y = mouth4py;

		var mouth5py = mouth.segments[5].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[5].point.y = mouth5py;

		//Eyebrows
		var eyebrow_lefty = eyebrow_left.position.y + 0.2 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_left.position.y = eyebrow_lefty;

		var eyebrow_righty = eyebrow_right.position.y + 0.2 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_right.position.y = eyebrow_righty;

	}
	//Neutral to angry
	function toAngry () {
			
		//Mouth
		var mouth0px = mouth.segments[0].point.x - 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[0].point.x = mouth0px;

		var mouth1py = mouth.segments[1].point.y - 0.3 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[1].point.y = mouth1py;

		var mouth0px = mouth.segments[2].point.x + 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[2].point.x = mouth0px;

		var mouth0px = mouth.segments[3].point.x + 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[3].point.x = mouth0px;

		var mouth4py = mouth.segments[4].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[4].point.y = mouth4py;

		var mouth0px = mouth.segments[5].point.x - 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[5].point.x = mouth0px;

		//Eyebrows
		var eyebrow_lefty = eyebrow_left.position.y + 0.1 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_left.position.y = eyebrow_lefty;

		var eyebrow_righty = eyebrow_right.position.y + 0.1 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_right.position.y = eyebrow_righty;

		var eyebrow_leftx = eyebrow_left.position.x + 0.05 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_left.position.x = eyebrow_leftx;

		var eyebrow_rightx = eyebrow_right.position.x - 0.05 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_right.position.x = eyebrow_rightx;

		var eyebrow_leftr = eyebrow_left.rotate(2);

		var eyebrow_rightr = eyebrow_right.rotate(-2);
	}
	//Angry to neutral
	function angryTo () {
			
		//Mouth
		var mouth0px = mouth.segments[0].point.x + 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[0].point.x = mouth0px;

		var mouth1py = mouth.segments[1].point.y + 0.3 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[1].point.y = mouth1py;

		var mouth0px = mouth.segments[2].point.x - 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[2].point.x = mouth0px;

		var mouth0px = mouth.segments[3].point.x - 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[3].point.x = mouth0px;

		var mouth4py = mouth.segments[4].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[4].point.y = mouth4py;

		var mouth0px = mouth.segments[5].point.x + 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[5].point.x = mouth0px;

		//Eyebrows
		var eyebrow_lefty = eyebrow_left.position.y - 0.2 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_left.position.y = eyebrow_lefty;

		var eyebrow_righty = eyebrow_right.position.y - 0.2 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_right.position.y = eyebrow_righty;

		var eyebrow_leftx = eyebrow_left.position.x - 0.05 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_left.position.x = eyebrow_leftx;

		var eyebrow_rightx = eyebrow_right.position.x + 0.05 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_right.position.x = eyebrow_rightx;

		var eyebrow_leftr = eyebrow_left.rotate(-2);

		var eyebrow_rightr = eyebrow_right.rotate(2);

	}
	//Neutral to sceptical
	function toSceptical () {
			
		//Mouth
		var mouth0py = mouth.segments[0].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[0].point.y = mouth0py;

		var mouth0px = mouth.segments[0].point.x - 0.3 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[0].point.x = mouth0px;

		var mouth1py = mouth.segments[1].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[1].point.y = mouth1py;

		var mouth2py = mouth.segments[2].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[2].point.y = mouth2py;

		var mouth2px = mouth.segments[2].point.x + 0.3 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[2].point.x = mouth2px;

		var mouth3py = mouth.segments[3].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[3].point.y = mouth3py;

		var mouth3px = mouth.segments[3].point.x + 0.3 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[3].point.x = mouth3px;

		var mouth4py = mouth.segments[4].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[4].point.y = mouth4py;

		var mouth5py = mouth.segments[5].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[5].point.y = mouth5py;

		var mouth5px = mouth.segments[5].point.x - 0.3 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[5].point.x = mouth5px;

		//Eyebrows
		var eyebrow_righty = eyebrow_right.position.y - 0.1 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_right.position.y = eyebrow_righty;

	}
	//Sceptical to neutral
	function scepticalTo () {
			
		//Mouth
		var mouth0py = mouth.segments[0].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[0].point.y = mouth0py;

		var mouth0px = mouth.segments[0].point.x + 0.3 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[0].point.x = mouth0px;

		var mouth1py = mouth.segments[1].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[1].point.y = mouth1py;

		var mouth2py = mouth.segments[2].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[2].point.y = mouth2py;

		var mouth2px = mouth.segments[2].point.x - 0.3 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[2].point.x = mouth2px;

		var mouth3py = mouth.segments[3].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[3].point.y = mouth3py;

		var mouth3px = mouth.segments[3].point.x - 0.3 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[3].point.x = mouth3px;

		var mouth4py = mouth.segments[4].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[4].point.y = mouth4py;

		var mouth5py = mouth.segments[5].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[5].point.y = mouth5py;

		var mouth5px = mouth.segments[5].point.x + 0.3 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[5].point.x = mouth5px;

		//Eyebrows
		var eyebrow_righty = eyebrow_right.position.y + 0.1 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_right.position.y = eyebrow_righty;

	}
	//Neutral to sad
	function toSad () {
			
		//Mouth
		var mouth0px = mouth.segments[0].point.x - 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[0].point.x = mouth0px;

		var mouth1py = mouth.segments[1].point.y - 0.3 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[1].point.y = mouth1py;

		var mouth2px = mouth.segments[2].point.x + 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[2].point.x = mouth2px;

		var mouth3px = mouth.segments[3].point.x + 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[3].point.x = mouth3px;

		var mouth4py = mouth.segments[4].point.y - 0.3 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[4].point.y = mouth4py;

		var mouth0px = mouth.segments[5].point.x - 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[5].point.x = mouth0px;

		//Eyebrows
		var eyebrow_lefty = eyebrow_left.position.y + 0.1 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_left.position.y = eyebrow_lefty;

		var eyebrow_righty = eyebrow_right.position.y + 0.1 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_right.position.y = eyebrow_righty;

	}
	//Sad to neutral
	function sadTo () {
		
		//Mouth
		var mouth0px = mouth.segments[0].point.x + 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[0].point.x = mouth0px;

		var mouth1py = mouth.segments[1].point.y + 0.3 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[1].point.y = mouth1py;

		var mouth2px = mouth.segments[2].point.x - 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[2].point.x = mouth2px;

		var mouth3px = mouth.segments[3].point.x - 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[3].point.x = mouth3px;

		var mouth4py = mouth.segments[4].point.y + 0.3 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[4].point.y = mouth4py;

		var mouth0px = mouth.segments[5].point.x + 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[5].point.x = mouth0px;

		//Eyebrows
		var eyebrow_lefty = eyebrow_left.position.y - 0.1 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_left.position.y = eyebrow_lefty;

		var eyebrow_righty = eyebrow_right.position.y - 0.1 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_right.position.y = eyebrow_righty;

	}

//Animations
paper.view.onFrame = function (event) {

	time = event.time;

	breathe();

	//Blink
	if ((blinkDone != true) && (Math.sin(event.time * Math.PI) != -1)) {
		blink_right();
		blink_left();
	}

	if ((event.time % freq < 0.02) && (event.time > 0)) {
		blinkDone = true;
	}

	//Test
	if ((avi.mood == '') || (avi.mood == 'neutral')) {
		animationTime = event.time;
	};

	if ((mood != 'neutral') && (avi.mood == '')) {
		animationTimeNeutral = event.time;
	};

	//Animations
	if ((mood == 'neutral') && (avi.mood != 'neutral')) {

		if (avi.mood == 'happy') {
			toHappy();
		}

		if ((event.time - animationTime > freq) && (event.time > 0) && (avi.mood == 'happy')) {
			avi.mood = '';
			mood = 'happy';
		}

		if (avi.mood == 'angry') {
			toAngry();
		}

		if ((event.time - animationTime > freq) && (event.time > 0) && (avi.mood == 'angry')) {
			avi.mood = '';
			mood = 'angry';
		}

		if (avi.mood == 'sceptical') {
			toSceptical();
		}

		if ((event.time - animationTime > freq) && (event.time > 0) && (avi.mood == 'sceptical')) {
			avi.mood = '';
			mood = 'sceptical';
		}

		if (avi.mood == 'sad') {
			toSad();
		}

		if ((event.time - animationTime > freq) && (event.time > 0) && (avi.mood == 'sad')) {
			avi.mood = '';
			mood = 'sad';
		}

	}

	if ((mood != 'neutral') && (avi.mood != '')) {

		if ((mood == 'happy') && (mood != avi.mood)) {
			happyTo();
		}

		if ((mood == 'angry') && (mood != avi.mood)) {
			angryTo();
		}

		if ((mood == 'sceptical') && (mood != avi.mood)) {
			scepticalTo();
		}

		if ((mood == 'sad') && (mood != avi.mood)) {
			sadTo();
		}

		if ((event.time - animationTimeNeutral > freq) && (event.time > 0)) {
			mood = 'neutral';
		}

		if (mood == avi.mood) {
			return true;
		}

	}

}

//Random time (s)
var timer = (Math.floor(Math.random() * 5) * freq) + 4;


//Animation triggers
setInterval(function() {
	var timer = (Math.floor(Math.random() * 5) * freq) + 4;
	blinkDone = false;
}, timer * 1000);

paper.view.draw();