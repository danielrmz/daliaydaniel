// Initializes. 


$(function() {
	CalculateCountdown();
	InitializeCarousel();
	DisplaySecretPanels();
	InitializeViews();
});

preloadImages();

function InitializeViews() {
	$(window).resize(DisplaySecretPanels);
	$(document).pjax('.menu a', '.content');

	$(document).on('pjax:send', function(pjax) {
		var $target = $(arguments[2].target);

		ResizeBanner($target, function() { 
	  		DisplaySecretPanels();
	  	});

		$(".menu .active").removeClass("active");
		$target.addClass("active");
		$('.content').html("<div class='loading'></div>");

	});

	$(document).on('pjax:complete', function() {
		var $target = $(arguments[3].target); 
	});

	$(document).on('pjax:timeout', function(e) {  
		e.preventDefault(); 
	});

	// Detect page and resize banner accordingly.
	ResizeBanner(window.location.pathname, null, true); 
}

function ResizeBanner(pageId, callback, isLoad) {
	callback = callback || function() { };

	var $menu   = typeof pageId == "string" ? $(".menu a[href*=" + (pageId == "/" ? "home" : pageId.replace("/","") ) + "]") : $(pageId);
	var $banner = $(".banner .item, .banner");
	var smallSize = $(".banner").data("small");
	var bigSize = $(".banner").data("big");
	
	if($menu.size() > 0) {
		if($menu.data("big")) { 
			$banner.addClass("big").removeClass("small");
			if(isLoad) {
				$banner.css("height", bigSize);
				callback();
			} else {
				$banner.animate({ height: bigSize }, function() { callback();  });
			}
		} else { 
			if(isLoad) {
				$banner.css("height", smallSize);
				$banner.removeClass("big").addClass("small"); callback(); 
			} else {
				$banner.animate({ height: smallSize }, function() { $banner.removeClass("big").addClass("small"); callback(); });
			}
		}
	}
}

function DisplaySecretPanels() {
	if(window.location.pathname == "/" || window.location.pathname == "/home") {
		if($(window).height() > 650) {
			$(".panels").fadeIn();
		} else {
			$(".panels").fadeOut();
		}	
	}
}

/**
 * Initializes main carousel event, and
 * defines size toggle triggers. 
 */
function InitializeCarousel() {
	$(".carousel").carousel({ interval: 10000 }).carousel('cycle');
}

/**
 * Calculates how many dates until the wedding and updates the
 * associated container. 
 */
function CalculateCountdown() {
	var $countdown = $(".days-left");
	var wedding_day = new Date(2014,6,5);
	var today = new Date();

	var daysLeft = (wedding_day - today)/1000/60/60/24;

	$countdown.text(parseInt(daysLeft));
	$countdown.attr("title", (parseInt(daysLeft) / 30) + " meses");
}

/**
 * Preloads a set of images.
 */
function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img async="true" />')[0].src = this;
    });
}


function preloadImages() {
	var arr = [];
	var max = 5;

	for(var idx = 1; idx <= max; idx++) {
		arr.push("img/banners/"+idx+"-small.png");
		arr.push("img/banners/"+idx+"-big.png");
	}

	preload(arr);
} 