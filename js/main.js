
$(function() {
	CalculateCountdown();
	InitializeCarousel();
	DisplaySecretPanels();
	InitializeViews();
	InitializeGallery();
});

preloadImages();

function InitializeGallery() {
	var isActive = false;
	var currentAlbum = "";
	var currentPicture = 0;

	var galleries = {};
		galleries["dates"] = ["https://sphotos-a-pao.xx.fbcdn.net/hphotos-frc1/p417x417/1234094_10151722860757935_483375580_n.jpg","https://sphotos-a-pao.xx.fbcdn.net/hphotos-frc3/p417x417/1239461_10151722862562935_1625379756_n.jpg","https://sphotos-b-pao.xx.fbcdn.net/hphotos-prn2/p417x417/1150381_10151722862602935_946300707_n.jpg","https://fbcdn-sphotos-d-a.akamaihd.net/hphotos-ak-frc1/p417x417/999109_10151722862592935_199286201_n.jpg","https://sphotos-b-pao.xx.fbcdn.net/hphotos-frc1/p417x417/995194_10151722862692935_1153889123_n.jpg","https://fbcdn-sphotos-b-a.akamaihd.net/hphotos-ak-ash4/p417x417/1003380_10151722862732935_1899068562_n.jpg","https://sphotos-a-pao.xx.fbcdn.net/hphotos-prn2/p417x417/1238372_10151722862782935_58241138_n.jpg","https://fbcdn-sphotos-g-a.akamaihd.net/hphotos-ak-frc3/p417x417/966292_10151722862847935_1124140612_o.jpg","https://sphotos-b-pao.xx.fbcdn.net/hphotos-prn1/p417x417/1148758_10151722862952935_1075499180_n.jpg","https://sphotos-b-pao.xx.fbcdn.net/hphotos-ash4/p417x417/998946_10151722862997935_47973236_n.jpg","https://fbcdn-sphotos-b-a.akamaihd.net/hphotos-ak-prn2/p417x417/1233557_10151722863037935_470344561_n.jpg","https://sphotos-b-pao.xx.fbcdn.net/hphotos-prn1/p417x417/560843_10151722863077935_560360541_n.jpg","https://sphotos-a-pao.xx.fbcdn.net/hphotos-frc3/p417x417/1098434_10151722863167935_39003843_n.jpg","https://sphotos-a-pao.xx.fbcdn.net/hphotos-prn1/p417x417/1234906_10151722863207935_736210454_n.jpg","https://sphotos-a-pao.xx.fbcdn.net/hphotos-prn2/p417x417/1237089_10151722863297935_2120145583_n.jpg","https://sphotos-a-pao.xx.fbcdn.net/hphotos-ash3/p417x417/1003786_10151722863327935_1326668566_n.jpg","https://sphotos-b-pao.xx.fbcdn.net/hphotos-ash3/p417x417/1184753_10151722863362935_318119591_n.jpg","https://fbcdn-sphotos-b-a.akamaihd.net/hphotos-ak-ash4/p417x417/1240008_10151722863392935_656521208_n.jpg","https://sphotos-a-pao.xx.fbcdn.net/hphotos-ash3/p417x417/1237007_10151722863472935_941789452_n.jpg","https://sphotos-a-pao.xx.fbcdn.net/hphotos-ash3/p417x417/581540_10151722863512935_398080761_n.jpg","https://sphotos-a-pao.xx.fbcdn.net/hphotos-prn1/p417x417/1236585_10151722863537935_748057431_n.jpg","https://fbcdn-sphotos-g-a.akamaihd.net/hphotos-ak-ash3/p417x417/1186887_10151722863592935_59924935_n.jpg","https://fbcdn-sphotos-f-a.akamaihd.net/hphotos-ak-prn2/p417x417/1151056_10151722863637935_909812947_n.jpg","https://sphotos-b-pao.xx.fbcdn.net/hphotos-frc3/p417x417/1157715_10151722863697935_1922003076_n.jpg","https://sphotos-b-pao.xx.fbcdn.net/hphotos-ash3/p417x417/576562_10151722863742935_1171620073_n.jpg","https://sphotos-b-pao.xx.fbcdn.net/hphotos-prn2/p417x417/1157733_10151722863822935_1406314680_n.jpg","https://sphotos-a-pao.xx.fbcdn.net/hphotos-prn2/p417x417/1186067_10151722863882935_781441064_n.jpg","https://sphotos-a-pao.xx.fbcdn.net/hphotos-prn2/p417x417/1175305_10151722863897935_36332255_n.jpg","https://sphotos-b-pao.xx.fbcdn.net/hphotos-ash4/p417x417/1174869_10151722863957935_1569221680_n.jpg","https://sphotos-b-pao.xx.fbcdn.net/hphotos-prn2/p417x417/1174594_10151722864037935_950956708_n.jpg","https://sphotos-b-pao.xx.fbcdn.net/hphotos-ash3/p417x417/1174889_10151722864057935_1387372637_n.jpg","https://sphotos-b-pao.xx.fbcdn.net/hphotos-frc3/p417x417/1239484_10151722864077935_801523856_n.jpg","https://sphotos-a-pao.xx.fbcdn.net/hphotos-ash3/p417x417/1236563_10151722864122935_1308475530_n.jpg","https://sphotos-a-pao.xx.fbcdn.net/hphotos-prn2/p417x417/1150358_10151722864142935_1126304941_n.jpg","https://sphotos-a-pao.xx.fbcdn.net/hphotos-prn1/p417x417/68896_10151722864197935_537537264_n.jpg","https://sphotos-a-pao.xx.fbcdn.net/hphotos-frc1/p417x417/1235886_10151722864247935_1305104412_n.jpg","https://sphotos-b-pao.xx.fbcdn.net/hphotos-ash4/p417x417/1001959_10151722864272935_787471224_n.jpg","https://sphotos-b-pao.xx.fbcdn.net/hphotos-ash3/p417x417/1235326_10151722864327935_2139825854_n.jpg","https://sphotos-a-pao.xx.fbcdn.net/hphotos-prn2/p417x417/1186185_10151722864392935_1619657025_n.jpg","https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-prn1/p417x417/1013387_10151722864407935_369020785_n.jpg","https://sphotos-a-pao.xx.fbcdn.net/hphotos-frc3/p417x417/1173699_10151722864477935_715016988_n.jpg","https://sphotos-a-pao.xx.fbcdn.net/hphotos-ash3/p417x417/537777_10151722864472935_1067186336_n.jpg","https://sphotos-b-pao.xx.fbcdn.net/hphotos-frc3/p417x417/1170768_10151722864562935_623383182_n.jpg","https://sphotos-b-pao.xx.fbcdn.net/hphotos-frc3/p417x417/1240023_10151722864627935_1499629319_n.jpg","https://sphotos-b-pao.xx.fbcdn.net/hphotos-ash3/p417x417/995179_10151722864717935_338315005_n.jpg","https://sphotos-b-pao.xx.fbcdn.net/hphotos-ash3/p417x417/1234104_10151722864722935_1641052297_n.jpg","https://fbcdn-sphotos-e-a.akamaihd.net/hphotos-ak-prn2/p417x417/1240568_10151722864767935_216186030_n.jpg","https://sphotos-a-pao.xx.fbcdn.net/hphotos-prn2/p417x417/1170882_10151722864872935_2125110264_n.jpg","https://sphotos-b-pao.xx.fbcdn.net/hphotos-frc3/p417x417/1098398_10151722864932935_1459567335_n.jpg","https://sphotos-b-pao.xx.fbcdn.net/hphotos-ash4/p417x417/1000919_10151722864997935_1683562819_n.jpg","https://fbcdn-sphotos-f-a.akamaihd.net/hphotos-ak-ash4/p417x417/249194_10151722865022935_250814715_n.jpg","https://sphotos-b-pao.xx.fbcdn.net/hphotos-ash3/p417x417/995185_10151722865097935_838292286_n.jpg","https://sphotos-a-pao.xx.fbcdn.net/hphotos-ash3/p417x417/1151026_10151722865197935_1396401594_n.jpg","https://sphotos-a-pao.xx.fbcdn.net/hphotos-frc3/p417x417/1239491_10151722865192935_584711446_n.jpg","https://sphotos-a-pao.xx.fbcdn.net/hphotos-ash3/p417x417/1185405_10151722865207935_1737037728_n.jpg","https://fbcdn-sphotos-c-a.akamaihd.net/hphotos-ak-prn2/p417x417/1236171_10151722865317935_215711870_n.jpg","https://sphotos-b-pao.xx.fbcdn.net/hphotos-frc3/p417x417/1185965_10151722865432935_211693748_n.jpg","https://sphotos-b-pao.xx.fbcdn.net/hphotos-frc1/p417x417/1003373_10151722865427935_38040880_n.jpg","https://sphotos-a-pao.xx.fbcdn.net/hphotos-prn1/p417x417/935944_10151722865472935_203590486_n.jpg","https://sphotos-a-pao.xx.fbcdn.net/hphotos-prn2/p417x417/1173770_10151722865552935_520467136_n.jpg","https://sphotos-a-pao.xx.fbcdn.net/hphotos-prn2/p417x417/1098077_10151722865562935_1882522077_n.jpg","https://fbcdn-sphotos-b-a.akamaihd.net/hphotos-ak-ash3/p417x417/577283_10151722865687935_247381244_n.jpg","https://fbcdn-sphotos-c-a.akamaihd.net/hphotos-ak-ash3/p417x417/548347_10151722865682935_757278832_n.jpg","https://sphotos-b-pao.xx.fbcdn.net/hphotos-prn2/p417x417/1233448_10151722865692935_292721379_n.jpg","https://sphotos-b-pao.xx.fbcdn.net/hphotos-ash3/p417x417/994596_10151722865782935_424395566_n.jpg","https://sphotos-b-pao.xx.fbcdn.net/hphotos-ash3/p417x417/1236728_10151722865852935_679839247_n.jpg","https://sphotos-a-pao.xx.fbcdn.net/hphotos-prn1/p417x417/994307_10151722865892935_1788263182_n.jpg","https://sphotos-a-pao.xx.fbcdn.net/hphotos-prn1/p417x417/1236639_10151722865927935_672495133_n.jpg","https://fbcdn-sphotos-g-a.akamaihd.net/hphotos-ak-ash3/p417x417/542225_10151722865987935_1014520085_n.jpg","https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-ash4/p417x417/1003788_10151722866112935_15832298_n.jpg","https://sphotos-a-pao.xx.fbcdn.net/hphotos-ash3/p417x417/1237986_10151722866152935_1902658761_n.jpg","https://sphotos-a-pao.xx.fbcdn.net/hphotos-frc3/p417x417/1238748_10151722866187935_1253107924_n.jpg","https://sphotos-b-pao.xx.fbcdn.net/hphotos-prn2/p417x417/1173640_10151722866272935_1497140521_n.jpg","https://sphotos-b-pao.xx.fbcdn.net/hphotos-ash4/p417x417/1237821_10151722866297935_788451003_n.jpg","https://sphotos-b-pao.xx.fbcdn.net/hphotos-ash3/p417x417/1150165_10151722866347935_773882316_n.jpg","https://sphotos-b-pao.xx.fbcdn.net/hphotos-prn1/p417x417/993688_10151722866457935_23845404_n.jpg","https://sphotos-a-pao.xx.fbcdn.net/hphotos-prn2/p417x417/1236317_10151722866482935_835543460_n.jpg","https://sphotos-b-pao.xx.fbcdn.net/hphotos-ash3/p417x417/1176299_10151722866587935_1053724861_n.jpg","https://sphotos-a-pao.xx.fbcdn.net/hphotos-ash3/p417x417/1236746_10151722866617935_1461505743_n.jpg","https://sphotos-b-pao.xx.fbcdn.net/hphotos-prn2/p417x417/1185165_10151722866682935_1688622279_n.jpg","https://sphotos-b-pao.xx.fbcdn.net/hphotos-ash3/p417x417/1240216_10151722866782935_1822122413_n.jpg","https://sphotos-b-pao.xx.fbcdn.net/hphotos-frc1/p417x417/1176194_10151722866727935_9107838_n.jpg","https://sphotos-a-pao.xx.fbcdn.net/hphotos-prn2/p417x417/1146669_10151722866847935_1806829093_n.jpg","https://sphotos-a-pao.xx.fbcdn.net/hphotos-ash3/p417x417/556330_10151722866852935_605490571_n.jpg","https://sphotos-a-pao.xx.fbcdn.net/hphotos-frc1/p417x417/1005228_10151722866897935_2032451383_n.jpg","https://sphotos-a-pao.xx.fbcdn.net/hphotos-prn1/p417x417/1237621_10151722867057935_2126820454_n.jpg","https://sphotos-a-pao.xx.fbcdn.net/hphotos-frc3/p417x417/1239651_10151722866992935_746691932_n.jpg","https://sphotos-b-pao.xx.fbcdn.net/hphotos-ash3/p417x417/1229815_10151722867027935_1961774864_n.jpg","https://sphotos-b-pao.xx.fbcdn.net/hphotos-frc3/p417x417/1229965_10151722867062935_251167284_n.jpg","https://sphotos-a-pao.xx.fbcdn.net/hphotos-ash3/1236314_10151722867102935_1525264760_n.jpg","https://sphotos-a-pao.xx.fbcdn.net/hphotos-prn2/p417x417/1237151_10151722867272935_1081195148_n.jpg","https://sphotos-a-pao.xx.fbcdn.net/hphotos-ash3/p417x417/1148996_10151722867307935_836821868_n.jpg"] ;
		galleries["engaged"] = ['https://sphotos-b-pao.xx.fbcdn.net/hphotos-ash3/p417x417/1235351_10151724777092935_642582468_n.jpg','https://sphotos-b-pao.xx.fbcdn.net/hphotos-frc1/p417x417/1176116_10151724777692935_1980345908_n.jpg','https://sphotos-b-pao.xx.fbcdn.net/hphotos-ash4/p417x417/1236495_10151724777682935_2056215566_n.jpg','https://sphotos-b-pao.xx.fbcdn.net/hphotos-ash3/p417x417/1236079_10151724777662935_699123663_n.jpg','https://sphotos-a-pao.xx.fbcdn.net/hphotos-prn1/p417x417/1234644_10151724778012935_460899092_n.jpg','https://sphotos-b-pao.xx.fbcdn.net/hphotos-ash4/p417x417/993003_10151724778202935_366016153_n.jpg','https://sphotos-a-pao.xx.fbcdn.net/hphotos-frc1/p417x417/1002177_10151724778152935_1100306908_n.jpg','https://sphotos-b-pao.xx.fbcdn.net/hphotos-frc3/p417x417/1098343_10151724778922935_1701768277_n.jpg','https://fbcdn-sphotos-d-a.akamaihd.net/hphotos-ak-prn1/p417x417/556327_10151724778717935_374750806_n.jpg','https://sphotos-b-pao.xx.fbcdn.net/hphotos-ash3/p417x417/1240268_10151724778847935_949700824_n.jpg','https://sphotos-a-pao.xx.fbcdn.net/hphotos-ash4/p417x417/1009860_10151724778977935_1081243907_n.jpg','https://sphotos-a-pao.xx.fbcdn.net/hphotos-prn2/p417x417/1098177_10151724779157935_1219845123_n.jpg'];
		
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