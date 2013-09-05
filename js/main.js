
$(function() {
	CalculateCountdown();
	InitializeCarousel();
	DisplaySecretPanels();
	InitializeViews();
	InitializeGallery();

	$(".love").click(function() { 

	});
});

preloadImages();

function InitializeGallery() {
	var isActive = false;
	var currentAlbum = "";
	var currentPicture = 0;

	var galleries = {};
		galleries["dates"] = [];
		galleries["engaged"] = [];

	for(var g in galleries) {
		if(galleries.hasOwnProperty(g)) {
			$.getJSON("/gallery/" + g, (function(album) { return function(data) { 
				var photos = data.data;

				var list = [];
				for(var idx = 0; idx < photos.length; idx++) {
					list.push(photos[idx].images[3].source);
				} 
				
				galleries[album] = list;
			}})(g));
		}
	}

	$(document).on("click", ".gallery a", function(e) { 
		if($(this).hasClass("disabled")) { return false; }
		$(".modal-title").text($(this).text());
		$(".gallery-modal").modal();
		var id = $(this).attr("href").replace("/gallery/","");

		currentAlbum = id;
		$(".image").html(" ");
		$(".thumbs").html(" ");
		var contents = $("<div></div>");
		var pics = galleries[id] || [];
 
 		for(var i = 0; i < pics.length; i++) {
			contents.append("<span><img data-id='" + i + "' class='js-pic-"+i+"' src='" + pics[i] + "' /></span>");
		}

		if(pics.length == 0) {
			contents.append("<div class='empty'>No hay fotos todavia!</div>");
		}

		$(".thumbs").append(contents);
		isActive = true;

		$(".js-pic-0").parent().click();

		e.preventDefault();
		return false;
	});

	$(document).on("click",".thumbs span", function() {
		var imgUrl = $(this).find("img").attr("src");
		currentPicture = $(this).find("img").data("id");
		
		$(".image").fadeOut(function() {
			$(this).html("").append("<img src='"+imgUrl+"'/>").fadeIn();
		});
	});

	$(document).on("click", ".image", function() {
		if(currentPicture == galleries[currentAlbum].length - 1) {
				return;
			}

			$(".js-pic-" + (currentPicture + 1)).parent().click();
	});


	$(document).on("keyup", function(e) { 
		if(!isActive) { return; }

		if(e.which == 37) {  
			// left
			if(currentPicture == 0) {  return; }
			$(".js-pic-" + (currentPicture - 1)).parent().click();
		} else if(e.which == 39) {  
			// right
			if(currentPicture == galleries[currentAlbum].length - 1) {
				return;
			}

			$(".js-pic-" + (currentPicture + 1)).parent().click();

		}
	});

	$('.gallery-modal').on('hide.bs.modal', function () {
		currentPicture = 0;
		currentAlbum = "";
		isActive = false;
  	});
}

/**
 * Initializes pjax events
 */
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

/**
 * Resizes the main banner based on the configuration set on the specified menu link
 */
function ResizeBanner(pageId, callback, isLoad) {
	callback = callback || function() { };

	var $menu   = typeof pageId == "string" ? $(".menu a[href*=" + (pageId == "/" ? "home" : pageId.replace("/","").replace(".html","") ) + "]") : $(pageId);
	var $banner = $(".banner .item, .banner");
	var smallSize = $(".banner").data("small");
	var bigSize = $(".banner").data("big");
	
	if($menu.size() > 0 || true) {
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

/**
 * When a certain height is met, display the hidden panels if any exist. 
 */
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

	$countdown.text(Math.ceil(parseFloat(daysLeft)));
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


/**
 * Preloads the banner images.
 */
function preloadImages() {
	var arr = [];
	var max = 5;

	for(var idx = 1; idx <= max; idx++) {
		arr.push("img/banners/"+idx+"-small.png");
		arr.push("img/banners/"+idx+"-big.png");
	}

	preload(arr);
} 