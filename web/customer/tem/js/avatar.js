/******************
Telecom Ecole de Management
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
var body = items[1];
var body_elems = body.children;

//Breathe elements
var collar_back = items[0].children[1];
var polo_topright = body_elems[1].segments[3];
var polo_topleft = body_elems[1].segments[14];
var chest = body_elems[2];
var chest_shadow_left = body_elems[3];
var chest_shadow_right = body_elems[4];
var breasts_left = body_elems[5];
var breasts_right = body_elems[6];
var polo_shadow = body_elems[7].segments[0];
var neck_shadow = body_elems[8];
var collar_left = body_elems[9];
var collar_right = body_elems[10];
var collar_shadow = body_elems[12];

//Expressions elements
var mouth_edge = items[6];
var mouth_int = items[7];
var eyelid_left = items[10];
var eyelash_left = items[11];
var eyebrow_left = items[12];
var eyelid_righte = items[13];
var eyelash_righte = items[14];
var eyebrow_right = items[15];

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

//Init states left eye
var eyelash_left0px_init = eyelash_left.segments[0].point.x;
var eyelash_left0py_init = eyelash_left.segments[0].point.y;
var eyelash_left0Inx_init = eyelash_left.segments[0].handleIn.x;
var eyelash_left0Iny_init = eyelash_left.segments[0].handleIn.y;
var eyelash_left0Outx_init = eyelash_left.segments[0].handleOut.x;
var eyelash_left0Outy_init = eyelash_left.segments[0].handleOut.y;
var eyelash_left2px_init = eyelash_left.segments[2].point.x;
var eyelash_left2py_init = eyelash_left.segments[2].point.y;
var eyelash_left2Inx_init = eyelash_left.segments[2].handleIn.x;
var eyelash_left2Iny_init = eyelash_left.segments[2].handleIn.y;
var eyelash_left2Outx_init = eyelash_left.segments[2].handleOut.x;
var eyelash_left2Outy_init = eyelash_left.segments[2].handleOut.y;
var eyelid_left0px_init = eyelid_left.segments[0].point.x;
var eyelid_left0py_init = eyelid_left.segments[0].point.y;
var eyelid_left0Outx_init = eyelid_left.segments[0].handleOut.x;

//Init states right eye 
var eyelash_righte0px_init = eyelash_righte.segments[0].point.x;
var eyelash_righte0py_init = eyelash_righte.segments[0].point.y;
var eyelash_righte0Inx_init = eyelash_righte.segments[0].handleIn.x;
var eyelash_righte0Iny_init = eyelash_righte.segments[0].handleIn.y;
var eyelash_righte0Outx_init = eyelash_righte.segments[0].handleOut.x;
var eyelash_righte0Outy_init = eyelash_righte.segments[0].handleOut.y;
var eyelash_righte2x_init = eyelash_righte.segments[2].point.x;
var eyelash_righte2y_init = eyelash_righte.segments[2].point.y;
var eyelash_righte2Inx_init = eyelash_righte.segments[2].handleIn.x;
var eyelash_righte2Iny_init = eyelash_righte.segments[2].handleIn.y;
var eyelash_righte2Outx_init = eyelash_righte.segments[2].handleOut.x;
var eyelash_righte2Outy_init = eyelash_righte.segments[2].handleOut.y;
var eyelid_righte0px_init = eyelid_righte.segments[0].point.x;
var eyelid_righte0py_init = eyelid_righte.segments[0].point.y;
var eyelid_righte0Outx_init = eyelid_righte.segments[0].handleOut.x;
var eyelid_righte0Inx_init = eyelid_righte.segments[0].handleIn.x;

//Frequences
var freq = 0.3;
var freq_breathe = 5;

//Fonctions

	//Breathe
	function breathe () {

		//Breasts animation
		var tshirt0y = tshirt0y_init - 4 * Math.abs(Math.sin(time * Math.PI /freq_breathe));
		tshirt.segments[0].point.y = tshirt0y;

		var chest0y = chest0y_init - 4 * Math.abs(Math.sin(time * Math.PI /freq_breathe));
		chest.segments[0].point.y = chest0y;

		var breastsy = breastsy_init - 4 * Math.abs(Math.sin(time * Math.PI /freq_breathe));
		breasts.position.y = breastsy;

		//Shoulders animation
		var chest1y = chest1y_init - 1 * Math.abs(Math.sin(time * Math.PI /freq_breathe));
		chest.segments[1].point.y = chest1y;

		var chest2y = chest2y_init - 1 * Math.abs(Math.sin(time * Math.PI /freq_breathe));
		chest.segments[2].point.y = chest2y;

		var chest5y = chest5y_init - 1 * Math.abs(Math.sin(time * Math.PI /freq_breathe));
		chest.segments[5].point.y = chest5y;

		var chest6y = chest6y_init - 1 * Math.abs(Math.sin(time * Math.PI /freq_breathe));
		chest.segments[6].point.y = chest6y;

		var suit_left2y = suit_left2y_init + 1 * Math.abs(Math.sin(time * Math.PI /freq_breathe));
		suit_left.segments[2].point.y = suit_left2y;
		
		var suit_left3y = suit_left3y_init - 1 * Math.abs(Math.sin(time * Math.PI /freq_breathe));
		suit_left.segments[3].point.y = suit_left3y;
		revers_left.segments[3].point.y = suit_left3y;

		var suit_righte2y = suit_righte2y_init + 1 * Math.abs(Math.sin(time * Math.PI /freq_breathe));
		suit_righte.segments[2].point.y = suit_righte2y;
		
		var suit_righte3y = suit_righte3y_init - 1 * Math.abs(Math.sin(time * Math.PI /freq_breathe));
		suit_righte.segments[3].point.y = suit_righte3y;
		revers_righte.segments[3].point.y = suit_righte3y;

		var shadow0y = shadow0y_init - 1 * Math.abs(Math.sin(time * Math.PI /freq_breathe));
		shadow.segments[0].point.y = shadow0y;

		var shadow1y = shadow1y_init - 1 * Math.abs(Math.sin(time * Math.PI /freq_breathe));
		shadow.segments[1].point.y = shadow1y;
	}

	//Blink left eye
	function blink_left () {
		var eyelash_left0px = eyelash_left0px_init - 5 * Math.abs(Math.sin(time * Math.PI /freq));
		eyelash_left.segments[0].point.x = eyelash_left0px;
		
		var eyelash_left0py = eyelash_left0py_init + 9 * Math.abs(Math.sin(time * Math.PI /freq));
		eyelash_left.segments[0].point.y = eyelash_left0py;

		var eyelash_left0Inx = eyelash_left0Inx_init - 2.5 * Math.abs(Math.sin(time * Math.PI /freq));
		eyelash_left.segments[0].handleIn.x = eyelash_left0Inx;

		var eyelash_left0Iny = eyelash_left0Iny_init - 2.5 * Math.abs(Math.sin(time * Math.PI /freq));
		eyelash_left.segments[0].handleIn.y = eyelash_left0Iny;

		var eyelash_left0Outx = eyelash_left0Outx_init + 4 * Math.abs(Math.sin(time * Math.PI /freq));
		eyelash_left.segments[0].handleOut.x = eyelash_left0Outx;

		var eyelash_left0Outy = eyelash_left0Outy_init + 4 * Math.abs(Math.sin(time * Math.PI /freq));
		eyelash_left.segments[0].handleOut.y = eyelash_left0Outy;

		var eyelash_left2px = eyelash_left2px_init - 1 * Math.abs(Math.sin(time * Math.PI /freq));
		eyelash_left.segments[2].point.x = eyelash_left2px;

		var eyelash_left2py = eyelash_left2py_init + 9 * Math.abs(Math.sin(time * Math.PI /freq));
		eyelash_left.segments[2].point.y = eyelash_left2py;

		var eyelash_left2Inx = eyelash_left2Inx_init - 1.5 * Math.abs(Math.sin(time * Math.PI /freq));
		eyelash_left.segments[2].handleIn.x = eyelash_left2Inx;

		var eyelash_left2Iny = eyelash_left2Iny_init - 1.5 * Math.abs(Math.sin(time * Math.PI /freq));
		eyelash_left.segments[2].handleIn.y = eyelash_left2Iny;

		var eyelash_left2Outx = eyelash_left2Outx_init + 4 * Math.abs(Math.sin(time * Math.PI /freq));
		eyelash_left.segments[2].handleOut.x = eyelash_left2Outx;

		var eyelash_left2Outy = eyelash_left2Outy_init + 4 * Math.abs(Math.sin(time * Math.PI /freq));
		eyelash_left.segments[2].handleOut.y = eyelash_left2Outy;

		var eyelid_left0px = eyelid_left0px_init + 1.5 * Math.abs(Math.sin(time * Math.PI /freq));
		eyelid_left.segments[0].point.x = eyelid_left0px;

		var eyelid_left0py = eyelid_left0py_init + 9 * Math.abs(Math.sin(time * Math.PI /freq));
		eyelid_left.segments[0].point.y = eyelid_left0py;

		var eyelid_left0Outx = eyelid_left0Outx_init + 4 * Math.abs(Math.sin(time * Math.PI /freq));
		eyelid_left.segments[0].handleOut.x = eyelid_left0Outx;
	}

	//Blink right eye
	function blink_right () {
		var eyelash_righte0px = eyelash_righte0px_init + 4 * Math.abs(Math.sin(time * Math.PI /freq));
		eyelash_righte.segments[0].point.x = eyelash_righte0px;

		var eyelash_righte0py = eyelash_righte0py_init + 9 * Math.abs(Math.sin(time * Math.PI /freq));
		eyelash_righte.segments[0].point.y = eyelash_righte0py;

		var eyelash_righte0Inx = eyelash_righte0Inx_init + 1 * Math.abs(Math.sin(time * Math.PI /freq));
		eyelash_righte.segments[0].handleIn.x = eyelash_righte0Inx;

		var eyelash_righte0Iny = eyelash_righte0Iny_init - 2.5 * Math.abs(Math.sin(time * Math.PI /freq));
		eyelash_righte.segments[0].handleIn.y = eyelash_righte0Iny;

		var eyelash_righte0Outx = eyelash_righte0Outx_init - 5.5 * Math.abs(Math.sin(time * Math.PI /freq));
		eyelash_righte.segments[0].handleOut.x = eyelash_righte0Outx;

		var eyelash_righte0Outy = eyelash_righte0Outy_init + 5 * Math.abs(Math.sin(time * Math.PI /freq));
		eyelash_righte.segments[0].handleOut.y = eyelash_righte0Outy;

		var eyelash_righte2x = eyelash_righte2x_init + 1 * Math.abs(Math.sin(time * Math.PI /freq));
		eyelash_righte.segments[2].point.x = eyelash_righte2x;

		var eyelash_righte2y = eyelash_righte2y_init + 9 * Math.abs(Math.sin(time * Math.PI /freq));
		eyelash_righte.segments[2].point.y = eyelash_righte2y;

		var eyelash_righte2Inx = eyelash_righte2Inx_init - 2.5 * Math.abs(Math.sin(time * Math.PI /freq));
		eyelash_righte.segments[2].handleIn.x = eyelash_righte2Inx;

		var eyelash_righte2Iny = eyelash_righte2Iny_init - 2 * Math.abs(Math.sin(time * Math.PI /freq));
		eyelash_righte.segments[2].handleIn.y = eyelash_righte2Iny;

		var eyelash_righte2Outx = eyelash_righte2Outx_init + 5 * Math.abs(Math.sin(time * Math.PI /freq));
		eyelash_righte.segments[2].handleOut.x = eyelash_righte2Outx;

		var eyelash_righte2Outy = eyelash_righte2Outy_init + 0.5 * Math.abs(Math.sin(time * Math.PI /freq));
		eyelash_righte.segments[2].handleOut.y = eyelash_righte2Outy;

		var eyelid_righte0px = eyelid_righte0px_init - 2.5 * Math.abs(Math.sin(time * Math.PI /freq));
		eyelid_righte.segments[0].point.x = eyelid_righte0px;

		var eyelid_righte0py = eyelid_righte0py_init + 9 * Math.abs(Math.sin(time * Math.PI /freq));
		eyelid_righte.segments[0].point.y = eyelid_righte0py;

		var eyelid_righte0Outx = eyelid_righte0Outx_init - 5 * Math.abs(Math.sin(time * Math.PI /freq));
		eyelid_righte.segments[0].handleOut.x = eyelid_righte0Outx;

		var eyelid_righte0Inx = eyelid_righte0Inx_init + 10 * Math.abs(Math.sin(time * Math.PI /freq));
		eyelid_righte.segments[0].handleIn.x = eyelid_righte0Inx;
	}

	//Neutral to happy
	function toHappy () {
			
		//Mouth edge
		var mouth_edge0px = mouth_edge.segments[0].point.x + 0.075 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[0].point.x = mouth_edge0px;

		var mouth_edge0px = mouth_edge.segments[2].point.x - 0.075 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[2].point.x = mouth_edge0px;

		var mouth_edge0px = mouth_edge.segments[3].point.x - 0.075 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[3].point.x = mouth_edge0px;

		var mouth_edge0px = mouth_edge.segments[5].point.x + 0.075 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[5].point.x = mouth_edge0px;			

		var mouth_edge0py = mouth_edge.segments[0].point.y + 0.125 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[0].point.y = mouth_edge0py;

		var mouth_edge0py = mouth_edge.segments[1].point.y + 0.125 * Math.abs(Math.sin(time * Math.PI /freq));;
		mouth_edge.segments[1].point.y = mouth_edge0py;

		var mouth_edge0py = mouth_edge.segments[2].point.y + 0.125 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[2].point.y = mouth_edge0py;

		var mouth_edge0py = mouth_edge.segments[3].point.y - 0.125 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[3].point.y = mouth_edge0py;

		var mouth_edge0py = mouth_edge.segments[4].point.y - 0.125 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[4].point.y = mouth_edge0py;

		var mouth_edge0py = mouth_edge.segments[5].point.y - 0.125 * Math.abs(Math.sin(time * Math.PI /freq));;
		mouth_edge.segments[5].point.y = mouth_edge0py;

		//Mouth int
		var mouth_int0px = mouth_int.segments[0].point.x + 0.075 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[0].point.x = mouth_int0px;

		var mouth_int0px = mouth_int.segments[2].point.x - 0.075 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[2].point.x = mouth_int0px;

		var mouth_int0px = mouth_int.segments[3].point.x - 0.075 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[3].point.x = mouth_int0px;

		var mouth_int0px = mouth_int.segments[5].point.x + 0.075 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[5].point.x = mouth_int0px;			

		var mouth_int0py = mouth_int.segments[0].point.y + 0.125 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[0].point.y = mouth_int0py;

		var mouth_int0py = mouth_int.segments[1].point.y + 0.125 * Math.abs(Math.sin(time * Math.PI /freq));;
		mouth_int.segments[1].point.y = mouth_int0py;

		var mouth_int0py = mouth_int.segments[2].point.y + 0.125 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[2].point.y = mouth_int0py;

		var mouth_int0py = mouth_int.segments[3].point.y - 0.125 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[3].point.y = mouth_int0py;

		var mouth_int0py = mouth_int.segments[4].point.y - 0.125 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[4].point.y = mouth_int0py;

		var mouth_int0py = mouth_int.segments[5].point.y - 0.125 * Math.abs(Math.sin(time * Math.PI /freq));;
		mouth_int.segments[5].point.y = mouth_int0py;	

		//Eyebrows
		var eyebrow_left0py = eyebrow_left.segments[0].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_left.segments[0].point.y = eyebrow_left0py;

		var eyebrow_left1py = eyebrow_left.segments[1].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_left.segments[1].point.y = eyebrow_left1py;

		var eyebrow_left2py = eyebrow_left.segments[2].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_left.segments[2].point.y = eyebrow_left2py;

		var eyebrow_left3py = eyebrow_left.segments[3].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_left.segments[3].point.y = eyebrow_left3py;

		var eyebrow_right0py = eyebrow_right.segments[0].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_right.segments[0].point.y = eyebrow_right0py;

		var eyebrow_right1py = eyebrow_right.segments[1].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_right.segments[1].point.y = eyebrow_right1py;

		var eyebrow_right2py = eyebrow_right.segments[2].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_right.segments[2].point.y = eyebrow_right2py;

		var eyebrow_right3py = eyebrow_right.segments[3].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_right.segments[3].point.y = eyebrow_right3py;
	}

	//Happy to neutral
	function happyTo () {
			
		//edge
		var mouth_edge0px = mouth_edge.segments[0].point.x - 0.075 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[0].point.x = mouth_edge0px;

		var mouth_edge0px = mouth_edge.segments[2].point.x + 0.075 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[2].point.x = mouth_edge0px;

		var mouth_edge0px = mouth_edge.segments[3].point.x + 0.075 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[3].point.x = mouth_edge0px;

		var mouth_edge0px = mouth_edge.segments[5].point.x - 0.075 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[5].point.x = mouth_edge0px;			

		var mouth_edge0py = mouth_edge.segments[0].point.y - 0.125 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[0].point.y = mouth_edge0py;

		var mouth_edge0py = mouth_edge.segments[1].point.y - 0.125 * Math.abs(Math.sin(time * Math.PI /freq));;
		mouth_edge.segments[1].point.y = mouth_edge0py;

		var mouth_edge0py = mouth_edge.segments[2].point.y - 0.125 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[2].point.y = mouth_edge0py;

		var mouth_edge0py = mouth_edge.segments[3].point.y + 0.125 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[3].point.y = mouth_edge0py;

		var mouth_edge0py = mouth_edge.segments[4].point.y + 0.125 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[4].point.y = mouth_edge0py;

		var mouth_edge0py = mouth_edge.segments[5].point.y + 0.125 * Math.abs(Math.sin(time * Math.PI /freq));;
		mouth_edge.segments[5].point.y = mouth_edge0py;

		//Interieur
		var mouth_int0px = mouth_int.segments[0].point.x - 0.075 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[0].point.x = mouth_int0px;

		var mouth_int0px = mouth_int.segments[2].point.x + 0.075 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[2].point.x = mouth_int0px;

		var mouth_int0px = mouth_int.segments[3].point.x + 0.075 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[3].point.x = mouth_int0px;

		var mouth_int0px = mouth_int.segments[5].point.x - 0.075 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[5].point.x = mouth_int0px;			

		var mouth_int0py = mouth_int.segments[0].point.y - 0.125 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[0].point.y = mouth_int0py;

		var mouth_int0py = mouth_int.segments[1].point.y - 0.125 * Math.abs(Math.sin(time * Math.PI /freq));;
		mouth_int.segments[1].point.y = mouth_int0py;

		var mouth_int0py = mouth_int.segments[2].point.y - 0.125 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[2].point.y = mouth_int0py;

		var mouth_int0py = mouth_int.segments[3].point.y + 0.125 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[3].point.y = mouth_int0py;

		var mouth_int0py = mouth_int.segments[4].point.y + 0.125 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[4].point.y = mouth_int0py;

		var mouth_int0py = mouth_int.segments[5].point.y + 0.125 * Math.abs(Math.sin(time * Math.PI /freq));;
		mouth_int.segments[5].point.y = mouth_int0py;	

		//eyebrows
		var eyebrow_left0py = eyebrow_left.segments[0].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_left.segments[0].point.y = eyebrow_left0py;

		var eyebrow_left1py = eyebrow_left.segments[1].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_left.segments[1].point.y = eyebrow_left1py;

		var eyebrow_left2py = eyebrow_left.segments[2].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_left.segments[2].point.y = eyebrow_left2py;

		var eyebrow_left3py = eyebrow_left.segments[3].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_left.segments[3].point.y = eyebrow_left3py;

		var eyebrow_right0py = eyebrow_right.segments[0].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_right.segments[0].point.y = eyebrow_right0py;

		var eyebrow_right1py = eyebrow_right.segments[1].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_right.segments[1].point.y = eyebrow_right1py;

		var eyebrow_right2py = eyebrow_right.segments[2].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_right.segments[2].point.y = eyebrow_right2py;

		var eyebrow_right3py = eyebrow_right.segments[3].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /2*freq));
		eyebrow_right.segments[3].point.y = eyebrow_right3py;
	}

	//Neutral to angry
	function toAngry () {
			
		//edge
		var mouth_edge0px = mouth_edge.segments[0].point.x - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[0].point.x = mouth_edge0px;

		var mouth_edge0px = mouth_edge.segments[2].point.x + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[2].point.x = mouth_edge0px;

		var mouth_edge0px = mouth_edge.segments[3].point.x + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[3].point.x = mouth_edge0px;

		var mouth_edge0px = mouth_edge.segments[5].point.x - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[5].point.x = mouth_edge0px;			

		var mouth_edge0py = mouth_edge.segments[0].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[0].point.y = mouth_edge0py;

		var mouth_edge0py = mouth_edge.segments[1].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));;
		mouth_edge.segments[1].point.y = mouth_edge0py;

		var mouth_edge0py = mouth_edge.segments[2].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[2].point.y = mouth_edge0py;

		var mouth_edge0py = mouth_edge.segments[3].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[3].point.y = mouth_edge0py;

		var mouth_edge0py = mouth_edge.segments[4].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[4].point.y = mouth_edge0py;

		var mouth_edge0py = mouth_edge.segments[5].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));;
		mouth_edge.segments[5].point.y = mouth_edge0py;

		//Interieur
		var mouth_int0px = mouth_int.segments[0].point.x - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[0].point.x = mouth_int0px;

		var mouth_int0px = mouth_int.segments[2].point.x + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[2].point.x = mouth_int0px;

		var mouth_int0px = mouth_int.segments[3].point.x + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[3].point.x = mouth_int0px;

		var mouth_int0px = mouth_int.segments[5].point.x - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[5].point.x = mouth_int0px;			

		var mouth_int0py = mouth_int.segments[0].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[0].point.y = mouth_int0py;

		var mouth_int0py = mouth_int.segments[1].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));;
		mouth_int.segments[1].point.y = mouth_int0py;

		var mouth_int0py = mouth_int.segments[2].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[2].point.y = mouth_int0py;

		var mouth_int0py = mouth_int.segments[3].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[3].point.y = mouth_int0py;

		var mouth_int0py = mouth_int.segments[4].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[4].point.y = mouth_int0py;

		var mouth_int0py = mouth_int.segments[5].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));;
		mouth_int.segments[5].point.y = mouth_int0py;

		//eyebrows
		var eyebrow_left0py = eyebrow_left.segments[0].point.y + 0.3 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_left.segments[0].point.y = eyebrow_left0py;

		var eyebrow_left0py = eyebrow_left.segments[1].point.y - 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_left.segments[1].point.y = eyebrow_left0py;

		var eyebrow_left2py = eyebrow_left.segments[2].point.y + 0.3 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_left.segments[2].point.y = eyebrow_left2py;

		var eyebrow_left3py = eyebrow_left.segments[3].point.y + 0.3 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_left.segments[3].point.y = eyebrow_left3py;

		var eyebrow_right0py = eyebrow_right.segments[0].point.y + 0.3 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_right.segments[0].point.y = eyebrow_right0py;

		var eyebrow_right0py = eyebrow_left.segments[1].point.y - 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_right.segments[1].point.y = eyebrow_right0py;

		var eyebrow_right2py = eyebrow_right.segments[2].point.y + 0.3 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_right.segments[2].point.y = eyebrow_right2py;

		var eyebrow_right3py = eyebrow_right.segments[3].point.y + 0.3 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_right.segments[3].point.y = eyebrow_right3py;
	}

	//Angry to neutral
	function angryTo () {
			
		//edge
		var mouth_edge0px = mouth_edge.segments[0].point.x + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[0].point.x = mouth_edge0px;

		var mouth_edge0px = mouth_edge.segments[2].point.x - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[2].point.x = mouth_edge0px;

		var mouth_edge0px = mouth_edge.segments[3].point.x - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[3].point.x = mouth_edge0px;

		var mouth_edge0px = mouth_edge.segments[5].point.x + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[5].point.x = mouth_edge0px;			

		var mouth_edge0py = mouth_edge.segments[0].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[0].point.y = mouth_edge0py;

		var mouth_edge0py = mouth_edge.segments[1].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));;
		mouth_edge.segments[1].point.y = mouth_edge0py;

		var mouth_edge0py = mouth_edge.segments[2].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[2].point.y = mouth_edge0py;

		var mouth_edge0py = mouth_edge.segments[3].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[3].point.y = mouth_edge0py;

		var mouth_edge0py = mouth_edge.segments[4].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[4].point.y = mouth_edge0py;

		var mouth_edge0py = mouth_edge.segments[5].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));;
		mouth_edge.segments[5].point.y = mouth_edge0py;

		//Interieur
		var mouth_int0px = mouth_int.segments[0].point.x + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[0].point.x = mouth_int0px;

		var mouth_int0px = mouth_int.segments[2].point.x - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[2].point.x = mouth_int0px;

		var mouth_int0px = mouth_int.segments[3].point.x - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[3].point.x = mouth_int0px;

		var mouth_int0px = mouth_int.segments[5].point.x + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[5].point.x = mouth_int0px;			

		var mouth_int0py = mouth_int.segments[0].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[0].point.y = mouth_int0py;

		var mouth_int0py = mouth_int.segments[1].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));;
		mouth_int.segments[1].point.y = mouth_int0py;

		var mouth_int0py = mouth_int.segments[2].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[2].point.y = mouth_int0py;

		var mouth_int0py = mouth_int.segments[3].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[3].point.y = mouth_int0py;

		var mouth_int0py = mouth_int.segments[4].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[4].point.y = mouth_int0py;

		var mouth_int0py = mouth_int.segments[5].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));;
		mouth_int.segments[5].point.y = mouth_int0py;

		//eyebrows
		var eyebrow_left0py = eyebrow_left.segments[0].point.y - 0.3 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_left.segments[0].point.y = eyebrow_left0py;

		var eyebrow_left0py = eyebrow_left.segments[1].point.y + 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_left.segments[1].point.y = eyebrow_left0py;

		var eyebrow_left2py = eyebrow_left.segments[2].point.y - 0.3 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_left.segments[2].point.y = eyebrow_left2py;

		var eyebrow_left3py = eyebrow_left.segments[3].point.y - 0.3 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_left.segments[3].point.y = eyebrow_left3py;

		var eyebrow_right0py = eyebrow_right.segments[0].point.y - 0.3 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_right.segments[0].point.y = eyebrow_right0py;

		var eyebrow_right0py = eyebrow_left.segments[1].point.y + 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_right.segments[1].point.y = eyebrow_right0py;

		var eyebrow_right2py = eyebrow_right.segments[2].point.y - 0.3 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_right.segments[2].point.y = eyebrow_right2py;

		var eyebrow_right3py = eyebrow_right.segments[3].point.y - 0.3 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_right.segments[3].point.y = eyebrow_right3py;
	}

	//Neutral to sceptical
	function toSceptical () {
			
		//edge
		var mouth_edge0px = mouth_edge.segments[0].point.x + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[0].point.x = mouth_edge0px;

		var mouth_edge0px = mouth_edge.segments[2].point.x - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[2].point.x = mouth_edge0px;

		var mouth_edge0px = mouth_edge.segments[3].point.x + 0.5 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[3].point.x = mouth_edge0px;

		var mouth_edge0px = mouth_edge.segments[5].point.x - 0.5 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[5].point.x = mouth_edge0px;			

		var mouth_edge0py = mouth_edge.segments[0].point.y - 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[0].point.y = mouth_edge0py;

		var mouth_edge0py = mouth_edge.segments[1].point.y - 0.15 * Math.abs(Math.sin(time * Math.PI /freq));;
		mouth_edge.segments[1].point.y = mouth_edge0py;

		var mouth_edge0py = mouth_edge.segments[2].point.y - 0.15 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[2].point.y = mouth_edge0py;

		var mouth_edge0py = mouth_edge.segments[3].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[3].point.y = mouth_edge0py;

		var mouth_edge0py = mouth_edge.segments[4].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[4].point.y = mouth_edge0py;

		var mouth_edge0py = mouth_edge.segments[5].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));;
		mouth_edge.segments[5].point.y = mouth_edge0py;

		//Interieur
		var mouth_int0px = mouth_int.segments[0].point.x + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[0].point.x = mouth_int0px;

		var mouth_int0px = mouth_int.segments[2].point.x - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[2].point.x = mouth_int0px;

		var mouth_int0px = mouth_int.segments[3].point.x + 0.5 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[3].point.x = mouth_int0px;

		var mouth_int0px = mouth_int.segments[5].point.x - 0.5 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[5].point.x = mouth_int0px;			

		var mouth_int0py = mouth_int.segments[0].point.y - 0.15 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[0].point.y = mouth_int0py;

		var mouth_int0py = mouth_int.segments[1].point.y - 0.15 * Math.abs(Math.sin(time * Math.PI /freq));;
		mouth_int.segments[1].point.y = mouth_int0py;

		var mouth_int0py = mouth_int.segments[2].point.y - 0.15 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[2].point.y = mouth_int0py;

		var mouth_int0py = mouth_int.segments[3].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[3].point.y = mouth_int0py;

		var mouth_int0py = mouth_int.segments[4].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[4].point.y = mouth_int0py;

		var mouth_int0py = mouth_int.segments[5].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));;
		mouth_int.segments[5].point.y = mouth_int0py;

		//eyebrows
		var eyebrow_left0py = eyebrow_left.segments[0].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_left.segments[0].point.y = eyebrow_left0py;

		var eyebrow_left1py = eyebrow_left.segments[1].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_left.segments[1].point.y = eyebrow_left1py;

		var eyebrow_left2py = eyebrow_left.segments[2].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_left.segments[2].point.y = eyebrow_left2py;

		var eyebrow_left3py = eyebrow_left.segments[3].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_left.segments[3].point.y = eyebrow_left3py;

		var eyebrow_right0py = eyebrow_right.segments[0].point.y - 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_right.segments[0].point.y = eyebrow_right0py;

		var eyebrow_right1py = eyebrow_right.segments[1].point.y - 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_right.segments[1].point.y = eyebrow_right1py;

		var eyebrow_right2py = eyebrow_right.segments[2].point.y - 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_right.segments[2].point.y = eyebrow_right2py;

		var eyebrow_right3py = eyebrow_right.segments[3].point.y - 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_right.segments[3].point.y = eyebrow_right3py;
	}

	//Sceptical to neutral
	function scepticalTo () {
			
		//edge
		var mouth_edge0px = mouth_edge.segments[0].point.x - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[0].point.x = mouth_edge0px;

		var mouth_edge0px = mouth_edge.segments[2].point.x + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[2].point.x = mouth_edge0px;

		var mouth_edge0px = mouth_edge.segments[3].point.x - 0.5 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[3].point.x = mouth_edge0px;

		var mouth_edge0px = mouth_edge.segments[5].point.x + 0.5 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[5].point.x = mouth_edge0px;			

		var mouth_edge0py = mouth_edge.segments[0].point.y + 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[0].point.y = mouth_edge0py;

		var mouth_edge0py = mouth_edge.segments[1].point.y + 0.15 * Math.abs(Math.sin(time * Math.PI /freq));;
		mouth_edge.segments[1].point.y = mouth_edge0py;

		var mouth_edge0py = mouth_edge.segments[2].point.y + 0.15 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[2].point.y = mouth_edge0py;

		var mouth_edge0py = mouth_edge.segments[3].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[3].point.y = mouth_edge0py;

		var mouth_edge0py = mouth_edge.segments[4].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[4].point.y = mouth_edge0py;

		var mouth_edge0py = mouth_edge.segments[5].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));;
		mouth_edge.segments[5].point.y = mouth_edge0py;

		//Interieur
		var mouth_int0px = mouth_int.segments[0].point.x - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[0].point.x = mouth_int0px;

		var mouth_int0px = mouth_int.segments[2].point.x + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[2].point.x = mouth_int0px;

		var mouth_int0px = mouth_int.segments[3].point.x - 0.5 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[3].point.x = mouth_int0px;

		var mouth_int0px = mouth_int.segments[5].point.x + 0.5 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[5].point.x = mouth_int0px;			

		var mouth_int0py = mouth_int.segments[0].point.y + 0.15 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[0].point.y = mouth_int0py;

		var mouth_int0py = mouth_int.segments[1].point.y + 0.15 * Math.abs(Math.sin(time * Math.PI /freq));;
		mouth_int.segments[1].point.y = mouth_int0py;

		var mouth_int0py = mouth_int.segments[2].point.y + 0.15 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[2].point.y = mouth_int0py;

		var mouth_int0py = mouth_int.segments[3].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[3].point.y = mouth_int0py;

		var mouth_int0py = mouth_int.segments[4].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[4].point.y = mouth_int0py;

		var mouth_int0py = mouth_int.segments[5].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));;
		mouth_int.segments[5].point.y = mouth_int0py;

		//eyebrows
		var eyebrow_left0py = eyebrow_left.segments[0].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_left.segments[0].point.y = eyebrow_left0py;

		var eyebrow_left1py = eyebrow_left.segments[1].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_left.segments[1].point.y = eyebrow_left1py;

		var eyebrow_left2py = eyebrow_left.segments[2].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_left.segments[2].point.y = eyebrow_left2py;

		var eyebrow_left3py = eyebrow_left.segments[3].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_left.segments[3].point.y = eyebrow_left3py;

		var eyebrow_right0py = eyebrow_right.segments[0].point.y + 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_right.segments[0].point.y = eyebrow_right0py;

		var eyebrow_right1py = eyebrow_right.segments[1].point.y + 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_right.segments[1].point.y = eyebrow_right1py;

		var eyebrow_right2py = eyebrow_right.segments[2].point.y + 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_right.segments[2].point.y = eyebrow_right2py;

		var eyebrow_right3py = eyebrow_right.segments[3].point.y + 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_right.segments[3].point.y = eyebrow_right3py;
	}

	//Neutral to sad
	function toSad () {
			
		//edge
		var mouth_edge0px = mouth_edge.segments[0].point.x + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[0].point.x = mouth_edge0px;

		var mouth_edge0px = mouth_edge.segments[2].point.x - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[2].point.x = mouth_edge0px;

		var mouth_edge0px = mouth_edge.segments[3].point.x + 0.5 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[3].point.x = mouth_edge0px;

		var mouth_edge0px = mouth_edge.segments[5].point.x - 0.5 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[5].point.x = mouth_edge0px;			

		var mouth_edge0py = mouth_edge.segments[0].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[0].point.y = mouth_edge0py;

		var mouth_edge0py = mouth_edge.segments[1].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));;
		mouth_edge.segments[1].point.y = mouth_edge0py;

		var mouth_edge0py = mouth_edge.segments[2].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[2].point.y = mouth_edge0py;

		var mouth_edge0py = mouth_edge.segments[3].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[3].point.y = mouth_edge0py;

		var mouth_edge0py = mouth_edge.segments[4].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[4].point.y = mouth_edge0py;

		var mouth_edge0py = mouth_edge.segments[5].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));;
		mouth_edge.segments[5].point.y = mouth_edge0py;

		//Interieur
		var mouth_int0px = mouth_int.segments[0].point.x + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[0].point.x = mouth_int0px;

		var mouth_int0px = mouth_int.segments[2].point.x - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[2].point.x = mouth_int0px;

		var mouth_int0px = mouth_int.segments[3].point.x + 0.5 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[3].point.x = mouth_int0px;

		var mouth_int0px = mouth_int.segments[5].point.x - 0.5 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[5].point.x = mouth_int0px;			

		var mouth_int0py = mouth_int.segments[0].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[0].point.y = mouth_int0py;

		var mouth_int0py = mouth_int.segments[1].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));;
		mouth_int.segments[1].point.y = mouth_int0py;

		var mouth_int0py = mouth_int.segments[2].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[2].point.y = mouth_int0py;

		var mouth_int0py = mouth_int.segments[3].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[3].point.y = mouth_int0py;

		var mouth_int0py = mouth_int.segments[4].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[4].point.y = mouth_int0py;

		var mouth_int0py = mouth_int.segments[5].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));;
		mouth_int.segments[5].point.y = mouth_int0py;

		//eyebrows
		var eyebrow_left0py = eyebrow_left.segments[0].point.y + 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_left.segments[0].point.y = eyebrow_left0py;

		var eyebrow_left1py = eyebrow_left.segments[1].point.y + 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_left.segments[1].point.y = eyebrow_left1py;

		var eyebrow_left2py = eyebrow_left.segments[2].point.y + 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_left.segments[2].point.y = eyebrow_left2py;

		var eyebrow_left3py = eyebrow_left.segments[3].point.y + 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_left.segments[3].point.y = eyebrow_left3py;

		var eyebrow_right0py = eyebrow_right.segments[0].point.y + 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_right.segments[0].point.y = eyebrow_right0py;

		var eyebrow_right1py = eyebrow_right.segments[1].point.y + 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_right.segments[1].point.y = eyebrow_right1py;

		var eyebrow_right2py = eyebrow_right.segments[2].point.y + 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_right.segments[2].point.y = eyebrow_right2py;

		var eyebrow_right3py = eyebrow_right.segments[3].point.y + 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_right.segments[3].point.y = eyebrow_right3py;
	}

	//Sad to neutral
	function sadTo () {
			
		//edge
		var mouth_edge0px = mouth_edge.segments[0].point.x - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[0].point.x = mouth_edge0px;

		var mouth_edge0px = mouth_edge.segments[2].point.x + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[2].point.x = mouth_edge0px;

		var mouth_edge0px = mouth_edge.segments[3].point.x - 0.5 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[3].point.x = mouth_edge0px;

		var mouth_edge0px = mouth_edge.segments[5].point.x + 0.5 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[5].point.x = mouth_edge0px;			

		var mouth_edge0py = mouth_edge.segments[0].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[0].point.y = mouth_edge0py;

		var mouth_edge0py = mouth_edge.segments[1].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));;
		mouth_edge.segments[1].point.y = mouth_edge0py;

		var mouth_edge0py = mouth_edge.segments[2].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[2].point.y = mouth_edge0py;

		var mouth_edge0py = mouth_edge.segments[3].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[3].point.y = mouth_edge0py;

		var mouth_edge0py = mouth_edge.segments[4].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_edge.segments[4].point.y = mouth_edge0py;

		var mouth_edge0py = mouth_edge.segments[5].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));;
		mouth_edge.segments[5].point.y = mouth_edge0py;

		//Interieur
		var mouth_int0px = mouth_int.segments[0].point.x - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[0].point.x = mouth_int0px;

		var mouth_int0px = mouth_int.segments[2].point.x + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[2].point.x = mouth_int0px;

		var mouth_int0px = mouth_int.segments[3].point.x - 0.5 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[3].point.x = mouth_int0px;

		var mouth_int0px = mouth_int.segments[5].point.x + 0.5 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[5].point.x = mouth_int0px;			

		var mouth_int0py = mouth_int.segments[0].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[0].point.y = mouth_int0py;

		var mouth_int0py = mouth_int.segments[1].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));;
		mouth_int.segments[1].point.y = mouth_int0py;

		var mouth_int0py = mouth_int.segments[2].point.y + 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[2].point.y = mouth_int0py;

		var mouth_int0py = mouth_int.segments[3].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[3].point.y = mouth_int0py;

		var mouth_int0py = mouth_int.segments[4].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));
		mouth_int.segments[4].point.y = mouth_int0py;

		var mouth_int0py = mouth_int.segments[5].point.y - 0.1 * Math.abs(Math.sin(time * Math.PI /freq));;
		mouth_int.segments[5].point.y = mouth_int0py;

		//eyebrows
		var eyebrow_left0py = eyebrow_left.segments[0].point.y - 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_left.segments[0].point.y = eyebrow_left0py;

		var eyebrow_left1py = eyebrow_left.segments[1].point.y - 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_left.segments[1].point.y = eyebrow_left1py;

		var eyebrow_left2py = eyebrow_left.segments[2].point.y - 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_left.segments[2].point.y = eyebrow_left2py;

		var eyebrow_left3py = eyebrow_left.segments[3].point.y - 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_left.segments[3].point.y = eyebrow_left3py;

		var eyebrow_right0py = eyebrow_right.segments[0].point.y - 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_right.segments[0].point.y = eyebrow_right0py;

		var eyebrow_right1py = eyebrow_right.segments[1].point.y - 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_right.segments[1].point.y = eyebrow_right1py;

		var eyebrow_right2py = eyebrow_right.segments[2].point.y - 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_right.segments[2].point.y = eyebrow_right2py;

		var eyebrow_right3py = eyebrow_right.segments[3].point.y - 0.2 * Math.abs(Math.sin(time * Math.PI /freq));
		eyebrow_right.segments[3].point.y = eyebrow_right3py;
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
var timer = (Math.floor(Math.random() * 5) * freq) + 4;

//Animation triggers
setInterval(function() {
	var timer = (Math.floor(Math.random() * 5) * freq) + 4;
	blinkDone = false;
}, timer * 1000);

paper.view.draw();