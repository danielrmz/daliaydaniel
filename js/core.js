
$(function() {
	CalculateCountdown();
	InitializeCarousel();
	DisplaySecretPanels();
	InitializeViews();
	InitializeGallery();

	$(".love").click(function() { 
		$(".save").show().modal();
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
		galleries["pedida"] = [];
		galleries["encuentro"] = [];
		galleries["presentacion"] = [];

	for(var g in galleries) {
		if(galleries.hasOwnProperty(g)) {
			$.getJSON("/pictures/" + g, (function(album) { return function(data) {
				if(data.error && data.error.message) { return; }

				var photos = data.data;

				var list = [];
				for(var idx = 0; idx < photos.length; idx++) {
					list.push(photos[idx].images[1].source);
				} 
				
				galleries[album] = list;

				if(window.pcback && window.pcback[album]) {
					window.pcback[album]();
				}
			}})(g));
		}
	}
	var scrollerInitialized = false;

	$(document).on("click", ".gallery a", function(e) { 
		if($(this).hasClass("disabled")) { return false; }
		$(".modal-title").text($(this).text());

		var id = $(this).attr("href").replace("/gallery-","");

		currentAlbum = id;
		$(".image").html(" ");
		$(".thumbs .jTscrollerContainer").html("");
		var contents = $("<div class='jTscroller'></div>");
		var pics = galleries[id] || [];
 
 		for(var i = 0; i < pics.length; i++) {
			contents.append("<a href='javascript:;'><img data-id='" + i + "' class='js-pic-"+i+"' src='" + pics[i] + "' /></a>");
		}

		if(pics.length == 0) {
			contents.append("<div class='empty'>No hay fotos todavia!</div>");
		}

		$(".thumbs .jTscrollerContainer").append(contents);
		isActive = true;

		$(".js-pic-0").click();

		$(".gallery-modal").on("shown.bs.modal", function() { 
			if(scrollerInitialized) {
				return true;
			} else {
				//
				$("#tS2").thumbnailScroller({
			        scrollerType: "clickButtons",
			        scrollerOrientation: "horizontal",
			        scrollSpeed: 2,
			        scrollEasing: "easeOutCirc",
			        scrollEasingAmount: 600,
			        acceleration: 4,
			        scrollSpeed: 800,
			        noScrollCenterSpace: 10,
			        autoScrolling: 0,
			        autoScrollingSpeed: 2000,
			        autoScrollingEasing: "easeInOutQuad",
			        autoScrollingDelay: 500
			    });
			 //scrollerInitialized = true;
			}
		}).modal();

		e.preventDefault();
		return false;
	});

	$(document).on("click",".thumbs img", function() {
		var imgUrl = $(this).attr("src");
		currentPicture = $(this).data("id");
		

		$(".image").fadeOut(function() {
			var width = 600;

			$("<img />").attr("src", imgUrl).load(function() { width = this.width; });
			 
			var $image = $("<img src='"+imgUrl+"'/>");
			$(this).html("").append($image);
			
			$(this).fadeIn(function() {  
				$(".gallery-modal .modal-dialog").attr("style", "width: " + width + "px");
			});
		});
	});

	$(document).on("click", ".image", function() {
		if(currentPicture == galleries[currentAlbum].length - 1) {
				return;
			}

			$(".js-pic-" + (currentPicture + 1)).click();
	});


	$(document).on("keyup", function(e) { 
		if(!isActive) { return; }

		if(e.which == 37) {  
			// left
			if(currentPicture == 0) {  return; }
			$(".js-pic-" + (currentPicture - 1)).click();
		} else if(e.which == 39) {  
			// right
			if(currentPicture == galleries[currentAlbum].length - 1) {
				return;
			}

			$(".js-pic-" + (currentPicture + 1)).click();

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


