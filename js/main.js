jQuery(document).ready(function($) {
	$('.wrapper_preloader.bg-primary').delay(1200).fadeOut(400);
	$('.wrapper_preloader.bg-warning').delay(1500).fadeIn(400);
});
$( "#accordion" ).accordion();
$( "#radioset" ).buttonset();

function callPopup(){
	$('#myModal').modal('show');
}

$('span.mx-auto').click(function(event) {
	console.log('reload');
	location.reload();
});

const input = document.getElementById("upload_img");
const img = document.getElementById("preview_img");
let cut_img_parts = 3;
var cuttedImage = '';


$('#radioset').click(function(event) {
	$(this).removeClass('pulse');
	let cut_img_parts = event.target.value;
	if(cut_img_parts){
		console.log($('#sexy_image'));
		$('#sexy_image').removeAttr('disabled');
		imageDivider(cut_img_parts);
		animationStart();
	}
});

function animationStart(){
	$('#sexy_image').addClass('pulse');
	$('.custom-file-upload').addClass('pulse2');
}

function disabledRadio(){
	$('#radioset>input').attr("disabled", true);
	$('#radioset').css('opacity', '0.25');
}

$("#sexy_image").click(function(event) {
	var years = prompt('Сколько вам лет?', '');
	console.log(years);
	if(years < 18){
		alert('You so young for this choice! Bye');
		window.location = 'https:www.google.com/';
	}
	else{
		//alert('Вам ' + years + ' лет!')
		let random = randomImg();
		// console.log(random);
		$('.draggable').css('background-image', 'url(' + random + ')');
		$('.target_image').css('background-image', 'url(' + random + ')');
		$('.wrapper_preloader.bg-warning').fadeOut(400);
		verifyImage();
	}
});

$("#confirm").click(function(event) {
	let imageSelected = input.files[0];
	if(imageSelected !== undefined){
		base64Read();
	}
});

$("#upload_img").click(function(event) {
	$('#confirm').removeAttr('disabled');
	$('#confirm').addClass('pulse');
	$('#sexy_image').removeClass('pulse');
	$('.custom-file-upload').removeClass('pulse2');
});

function imageDivider(value){
	document.querySelector('.wrap_icon').className = 'wrap_icon';
	if(value == 3){
		ui3();
		$('.wrap_icon').addClass('tr3');
	}
	else if(value == 4){
		ui4();
		$('.wrap_icon').addClass('tr4');
	}
	else{
		ui5();
		$('.wrap_icon').addClass('tr5');
	}
	let count = value*value;
	imagePreview(count);
	let puzzles = '';
	const id = document.querySelectorAll('table tbody');
	id.forEach(element => {
		element.classList.add('d-none');
	});
	document.querySelector('table tbody[data-number="' + value + '"]').classList.remove('d-none');
}

function imagePreview(count){
	const array = document.querySelectorAll('.bg_size');
	// console.log(count);
	// console.log(array);
	for (var i = 0; i < count; i++) {
		// console.log(array[i]);
		array[i].classList.add('draggable');
		array[i].classList.add('ui-draggable');
		array[i].classList.add('ui-draggable-handle');
	}
}

function base64Read(type, path){
	callPopup();
	var fReader = new FileReader();
	img.classList.remove('d-none');
	console.log(typeof(input.files[0]));
	fReader.readAsDataURL(input.files[0]);
	fReader.onloadend = function(event){
	    img.src = event.target.result;
	}
}

$('#play').click(function(event) {
	cuttedImage = $(this).attr('href');
	console.log(cuttedImage);
	$('.draggable').css('background-image', 'url(' + cuttedImage + ')');
	$('.target_image').css('background-image', 'url(' + cuttedImage + ')');
	$('.wrapper_preloader.bg-warning').fadeOut(400);
	verifyImage();
});

$('#startCrop').click(function(event) {
	$(this).addClass('d-none');
	$('.download').removeClass('d-none');
	var image = $('img.crop'),
	    cropwidth = image.attr('cropwidth'),
	    cropheight = image.attr('cropheight'),
	    results = image.next('.results' ),
	    x       = $('.cropX', results),
	    y       = $('.cropY', results),
	    w       = $('.cropW', results),
	    h       = $('.cropH', results),
	    download = $('.download').find('a');

	  image.cropbox( {width: cropwidth, height: cropheight, showControls: 'auto' }).on('cropbox', function( event, results, img ) {
	      x.text( results.cropX );
	      y.text( results.cropY );
	      w.text( results.cropW );
	      h.text( results.cropH );
	      download.attr('href', img.getDataURL());
	    });

});
	
console.log(cut_img_parts);
let arrayNudeImg = ['./img/000.jpg','./img/001.jpg','./img/002.jpg','./img/003.jpg','./img/004.jpg','./img/005.jpg','./img/006.jpg',
'./img/007.jpg','./img/008.jpg','./img/009.jpg','./img/010.jpg','./img/011.jpg','./img/012.jpg','./img/013.jpg','./img/014.jpg',];
let choiceImg = 0;

function randomImg(){
	let randomNumber = parseInt(Math.random()*100);
	// console.log(randomNumber);
	let def = randomNumber % 14;
	choiceImg = arrayNudeImg[def];
	return choiceImg;
}

$('.play_field').click(function(event) {
	disabledRadio();
	let e = event.target;
	playing(e);
});

function verifyImage(){
	console.log('you started verifyImage');
	$('.bg_size.ui-draggable').on('mouseup', function(event) {
		event.preventDefault();
		let pseudoMassive = $('.bg_size.ui-draggable:visible');
		let disabledElement = $('.ui-draggable-disabled');
		if((disabledElement.length+1) == pseudoMassive.length){
			alert('you winner');
			winner();
		}
		else{
			console.log('you dropped block' + disabledElement.length);
		}
	});
}

function winner(){
	$('.canvas_box').addClass('z_15');
	$('.canvas_box').show();
	var confettiSettings = { target: 'canvas', max: "280", clock:"80" };
	var confetti = new ConfettiGenerator(confettiSettings);
	confetti.render();
}