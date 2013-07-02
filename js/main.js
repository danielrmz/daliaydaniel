
$(function() {

	var $countdown = $(".days-left");
	var wedding_day = new Date(2014,6,5);
	var today = new Date();

	var daysLeft = (wedding_day - today)/1000/60/60/24;

	$countdown.text(parseInt(daysLeft));

});