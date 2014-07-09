/******************
Telecom Bretagne
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

//Item names
var body = items[2];
var body_elems = body.children;

//Breathe elements
var collar_back = items[1].children[1];
var polo_topright = body_elems[1].segments[3];
var polo_topleft = body_elems[1].segments[14];
var chest = body_elems[2];
var chest_shadow_left = body_elems[3];
var chest_shadow_right = body_elems[4];
var breasts_right = body_elems[5];
var breasts_left = body_elems[6];
var polo_shadow = body_elems[7].segments[0];
var neck_shadow = body_elems[8];
var collar_left = body_elems[9];
var collar_right = body_elems[10];
var collar_shadow = body_elems[12];

//Expression elements
var expression = items[4];
var expression_elems = expression.children;

//Blink elements
var eyelid_left = expression_elems[2].segments[1];
var eyelid_right = expression_elems[3].segments[1];

//Expressions elements
var mouth = expression_elems[4];
var mouthcorner_left = expression_elems[5];
var mouthcorner_right = expression_elems[6];
var eyebrow_left = expression_elems[7];
var eyebrow_right = expression_elems[8];

//Init states breathe
collar_backy_init = collar_back.position.y;
polo_toprighty_init = body_elems[1].segments[3].point.y;
polo_toplefty_init = body_elems[1].segments[14].point.y;
chesty_init = chest.position.y;
chest_shadow_lefty_init = chest_shadow_left.position.y;
chest_shadow_righty_init = chest_shadow_right.position.y;
breasts_lefty_init = breasts_left.position.y;
breasts_righty_init = breasts_right.position.y;
polo_shadowy_init = polo_shadow.point.y;
neck_shadowy_init = neck_shadow.position.y;
collar_left_init = collar_left.position.y;
collar_right_init = collar_right.position.y;
collar_shadow_init = collar_shadow.position.y;

//Init states eyes

var eyelid_left_init = eyelid_left.point.y;
var eyelid_right_init = eyelid_right.point.y;

//Frequences
var freq = 0.3;
var freq_breathe = 5;

//Fonctions

	//Breathe
	function breathe () {

		//Breasts animation
		var breasts_lefty = breasts_lefty_init - 1 * Math.abs(Math.sin(time * Math.PI /freq_breathe));
		breasts_left.position.y = breasts_lefty;

		var breasts_righty = breasts_righty_init - 1 * Math.abs(Math.sin(time * Math.PI /freq_breathe));
		breasts_right.position.y = breasts_righty;

		//Shoulders animation
		var collar_backy = collar_backy_init - 3 * Math.abs(Math.sin(time * Math.PI /freq_breathe));;
		collar_back.position.y = collar_backy;

		var polo_toprighty = polo_toprighty_init - 3 * Math.abs(Math.sin(time * Math.PI /freq_breathe));;
		polo_topright.point.y = polo_toprighty;

		var polo_toplefty = polo_toplefty_init - 3 * Math.abs(Math.sin(time * Math.PI /freq_breathe));;
		polo_topleft.point.y = polo_toplefty;

		var chesty = chesty_init - 3 * Math.abs(Math.sin(time * Math.PI /freq_breathe));;
		chest.position.y = chesty;

		var chest_shadow_lefty = chest_shadow_lefty_init - 3 * Math.abs(Math.sin(time * Math.PI /freq_breathe));;
		chest_shadow_left.position.y = chest_shadow_lefty;

		var chest_shadow_righty = chest_shadow_righty_init - 3 * Math.abs(Math.sin(time * Math.PI /freq_breathe));;
		chest_shadow_right.position.y = chest_shadow_righty;

		var polo_shadowy = polo_shadowy_init - 3 * Math.abs(Math.sin(time * Math.PI /freq_breathe));;
		polo_shadow.point.y = polo_shadowy;

		var neck_shadowy = neck_shadowy_init - 3 * Math.abs(Math.sin(time * Math.PI /freq_breathe));;
		neck_shadow.position.y = neck_shadowy;

		var collar_lefty = collar_left_init - 3 * Math.abs(Math.sin(time * Math.PI /freq_breathe));;
		collar_left.position.y = collar_lefty;

		var collar_righty = collar_right_init - 3 * Math.abs(Math.sin(time * Math.PI /freq_breathe));;
		collar_right.position.y = collar_righty;

		var collar_shadowy = collar_shadow_init - 3 * Math.abs(Math.sin(time * Math.PI /freq_breathe));;
		collar_shadow.position.y = collar_shadowy;
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

		var mouth1py = mouth.segments[1].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[1].point.y = mouth1py;

		var mouth2py = mouth.segments[2].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[2].point.y = mouth2py;

		var mouth3py = mouth.segments[3].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[3].point.y = mouth3py;

		var mouth4py = mouth.segments[4].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[4].point.y = mouth4py;

		var mouth5py = mouth.segments[5].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[5].point.y = mouth5py;

		var mouthcorner_lefty = mouthcorner_left.position.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouthcorner_left.position.y = mouthcorner_lefty;

		var mouthcorner_righty = mouthcorner_right.position.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouthcorner_right.position.y = mouthcorner_righty;

		//Eyebrows
		var eyebrow_lefty = eyebrow_left.position.y - 0.05 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_left.position.y = eyebrow_lefty;

		var eyebrow_righty = eyebrow_right.position.y - 0.05 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_right.position.y = eyebrow_righty;
	}

	//Joy to neutral
	function happyTo () {
			
		//Mouth
		var mouth0py = mouth.segments[0].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[0].point.y = mouth0py;

		var mouth1py = mouth.segments[1].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[1].point.y = mouth1py;

		var mouth2py = mouth.segments[2].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[2].point.y = mouth2py;

		var mouth3py = mouth.segments[3].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[3].point.y = mouth3py;

		var mouth4py = mouth.segments[4].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[4].point.y = mouth4py;

		var mouth5py = mouth.segments[5].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[5].point.y = mouth5py;

		var mouthcorner_lefty = mouthcorner_left.position.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouthcorner_left.position.y = mouthcorner_lefty;

		var mouthcorner_righty = mouthcorner_right.position.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouthcorner_right.position.y = mouthcorner_righty;

		//Eyebrows
		var eyebrow_lefty = eyebrow_left.position.y + 0.05 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_left.position.y = eyebrow_lefty;

		var eyebrow_righty = eyebrow_right.position.y + 0.05 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_right.position.y = eyebrow_righty;
	}

	//Neutral to angry
	function toAngry () {
			
		//Mouth
		var mouth1py = mouth.segments[1].point.y + 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[1].point.y = mouth1py;

		var mouth4py = mouth.segments[4].point.y - 0.3 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[4].point.y = mouth4py;

		//Eyebrows
		var eyebrow_lefty = eyebrow_left.position.y + 0.1 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_left.position.y = eyebrow_lefty;

		var eyebrow_righty = eyebrow_right.position.y + 0.1 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_right.position.y = eyebrow_righty;

		var eyebrow_leftx = eyebrow_left.position.x + 0.05 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_left.position.x = eyebrow_leftx;

		var eyebrow_rightx = eyebrow_right.position.x - 0.05 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_right.position.x = eyebrow_rightx;
	}

	//Angry to neutral
	function angryTo () {
			
		//Mouth
		var mouth1py = mouth.segments[1].point.y - 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[1].point.y = mouth1py;

		var mouth4py = mouth.segments[4].point.y + 0.3 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[4].point.y = mouth4py;

		//Eyebrows
		var eyebrow_lefty = eyebrow_left.position.y - 0.1 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_left.position.y = eyebrow_lefty;

		var eyebrow_righty = eyebrow_right.position.y - 0.1 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_right.position.y = eyebrow_righty;

		var eyebrow_leftx = eyebrow_left.position.x - 0.05 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_left.position.x = eyebrow_leftx;

		var eyebrow_rightx = eyebrow_right.position.x + 0.05 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_right.position.x = eyebrow_rightx;
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

		var mouthcorner_lefty = mouthcorner_left.position.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouthcorner_left.position.y = mouthcorner_lefty;

		var mouthcorner_righty = mouthcorner_right.position.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouthcorner_right.position.y = mouthcorner_righty;

		var mouthcorner_leftx = mouthcorner_left.position.x + 0.3 * Math.abs(Math.sin(time * Math.PI /freq));
		mouthcorner_left.position.x = mouthcorner_leftx;

		var mouthcorner_rightx = mouthcorner_right.position.x - 0.3 * Math.abs(Math.sin(time * Math.PI /freq));
		mouthcorner_right.position.x = mouthcorner_rightx;

		//Eyebrows
		var eyebrow_righty = eyebrow_right.position.y - 0.2 * Math.abs(Math.sin(time * Math.PI /2*freq));
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

		var mouthcorner_lefty = mouthcorner_left.position.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouthcorner_left.position.y = mouthcorner_lefty;

		var mouthcorner_righty = mouthcorner_right.position.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouthcorner_right.position.y = mouthcorner_righty;

		var mouthcorner_leftx = mouthcorner_left.position.x - 0.3 * Math.abs(Math.sin(time * Math.PI /freq));
		mouthcorner_left.position.x = mouthcorner_leftx;

		var mouthcorner_rightx = mouthcorner_right.position.x + 0.3 * Math.abs(Math.sin(time * Math.PI /freq));
		mouthcorner_right.position.x = mouthcorner_rightx;

		//Eyebrows
		var eyebrow_righty = eyebrow_right.position.y + 0.2 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_right.position.y = eyebrow_righty;
	}

	//Neutral to sad
	function toSad () {
			
		//Mouth
		var mouth0px = mouth.segments[0].point.x - 0.3 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[0].point.x = mouth0px;

		var mouth1py = mouth.segments[1].point.y - 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[1].point.y = mouth1py;

		var mouth2px = mouth.segments[2].point.x + 0.3 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[2].point.x = mouth2px;

		var mouth3px = mouth.segments[3].point.x + 0.3 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[3].point.x = mouth3px;

		var mouth4py = mouth.segments[4].point.y - 0.3 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[4].point.y = mouth4py;

		var mouth5px = mouth.segments[5].point.x - 0.3 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[5].point.x = mouth5px;

		var mouthcorner_leftx = mouthcorner_left.position.x + 0.3 * Math.abs(Math.sin(time * Math.PI /freq));
		mouthcorner_left.position.x = mouthcorner_leftx;

		var mouthcorner_rightx = mouthcorner_right.position.x - 0.3 * Math.abs(Math.sin(time * Math.PI /freq));
		mouthcorner_right.position.x = mouthcorner_rightx;

		//Eyebrows
		var eyebrow_lefty = eyebrow_left.position.y - 0.1 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_left.position.y = eyebrow_lefty;

		var eyebrow_righty = eyebrow_right.position.y - 0.1 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_right.position.y = eyebrow_righty;
	}

	//Sad to neutral
	function sadTo () {
		
		//Mouth	
		var mouth0px = mouth.segments[0].point.x + 0.3 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[0].point.x = mouth0px;

		var mouth1py = mouth.segments[1].point.y + 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[1].point.y = mouth1py;

		var mouth2px = mouth.segments[2].point.x - 0.3 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[2].point.x = mouth2px;

		var mouth3px = mouth.segments[3].point.x - 0.3 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[3].point.x = mouth3px;

		var mouth4py = mouth.segments[4].point.y + 0.3 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[4].point.y = mouth4py;

		var mouth5px = mouth.segments[5].point.x + 0.3 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth.segments[5].point.x = mouth5px;

		var mouthcorner_leftx = mouthcorner_left.position.x - 0.3 * Math.abs(Math.sin(time * Math.PI /freq));
		mouthcorner_left.position.x = mouthcorner_leftx;

		var mouthcorner_rightx = mouthcorner_right.position.x + 0.3 * Math.abs(Math.sin(time * Math.PI /freq));
		mouthcorner_right.position.x = mouthcorner_rightx;

		//Eyebrows
		var eyebrow_lefty = eyebrow_left.position.y + 0.1 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_left.position.y = eyebrow_lefty;

		var eyebrow_righty = eyebrow_right.position.y + 0.1 * Math.abs(Math.sin(time * Math.PI /2*freq));
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
	if ((home.mood == '') || (home.mood == 'neutral')) {
		animationTime = event.time;
	};

	if ((mood != 'neutral') && (home.mood == '')) {
		animationTimeNeutral = event.time;
	};

	//Animations
	if ((mood == 'neutral') && (home.mood != 'neutral')) {

		if (home.mood == 'happy') {
			toHappy();
		}

		if ((event.time - animationTime > freq) && (event.time > 0) && (home.mood == 'happy')) {
			home.mood = '';
			mood = 'happy';
		}

		if (home.mood == 'angry') {
			toAngry();
		}

		if ((event.time - animationTime > freq) && (event.time > 0) && (home.mood == 'angry')) {
			home.mood = '';
			mood = 'angry';
		}

		if (home.mood == 'sceptical') {
			toSceptical();
		}

		if ((event.time - animationTime > freq) && (event.time > 0) && (home.mood == 'sceptical')) {
			home.mood = '';
			mood = 'sceptical';
		}

		if (home.mood == 'sad') {
			toSad();
		}

		if ((event.time - animationTime > freq) && (event.time > 0) && (home.mood == 'sad')) {
			home.mood = '';
			mood = 'sad';
		}

	}

	if ((mood != 'neutral') && (home.mood != '')) {

		if ((mood == 'happy') && (mood != home.mood)) {
			happyTo();
		}

		if ((mood == 'angry') && (mood != home.mood)) {
			angryTo();
		}

		if ((mood == 'sceptical') && (mood != home.mood)) {
			scepticalTo();
		}

		if ((mood == 'sad') && (mood != home.mood)) {
			sadTo();
		}

		if ((event.time - animationTimeNeutral > freq) && (event.time > 0)) {
			mood = 'neutral';
		}

		if (mood == home.mood) {
			return true;
		}

	}

}

//Random time (s)
var timer = (Math.floor(Math.random() * 5) * freq) + 6;

//Animation triggers
setInterval(function() {
	var timer = (Math.floor(Math.random() * 5) * freq) + 4;
	blinkDone = false;
}, timer * 1000);

paper.view.draw();