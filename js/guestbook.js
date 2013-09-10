$(function() { 
    $(document).on("click", ".js-new-guestbook", function() {   
        var $nombre = $("#nombre"),
            $correo = $("#correo"),
            $mensaje = $("#mensaje");
            $lugar = $("#location");

        if($nombre.val().trim() == "" || $correo.val().trim() == "" || $mensaje.val().trim() == "")
        {
            alert('Porfavor introduzca todos los datos');
            return;
        }

        var data = { 
                    "name": $nombre.val().trim(), 
                    "email": $correo.val().trim(), 
                    "comment": $mensaje.val().trim(),
                    "location": $lugar.val().trim()
                };

        $.post("/guestbook/new", data,
            function(data) { 
                $nombre.val("");
                $correo.val("");
                $mensaje.val("");
                $(".js-hidden").slideUp();


                data = $.parseJSON(data);
                var en = getGBEntryTemplate(data); 
                var $item = $(en);
                $(".entries li:first").after($item); 
            });
    }); 

    if((location + "").indexOf("guestbook") >= 0) {
        $.getJSON("/guestbook/list", function(data) { 
            for(var i = 0; i < data.length; i++) {
                var entry = data[i];

                $(".entries").append(getGBEntryTemplate(entry));
            }
        });
    }

    function getGBEntryTemplate(entry) {
        var $temp = $("#entry").html();
        moment.lang('es');

        date = moment(new Date(entry.date)).fromNow(); 
        return $temp.replace("{{name}}", entry.name)
                    .replace("{{date}}", date)
                    .replace("{{comment}}", entry.comment)
                    .replace("{{location}}", entry.location)
                    .replace("{{email}}", entry.email)
                    .replace(/\n/gi, '' )
                    .trim();
    }

});

   var geocoder;

   if (navigator.geolocation) {
   	navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
   } 
//Get the latitude and the longitude;
function successFunction(position) {
	var lat = position.coords.latitude;
	var lng = position.coords.longitude;
	codeLatLng(lat, lng);
}

function errorFunction(){
	alert("Geocoder failed");
} 

function codeLatLng(lat, lng) {
	var geocoder = new google.maps.Geocoder();
	var latlng = new google.maps.LatLng(lat, lng);
	geocoder.geocode({'latLng': latlng}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {

			if (results[1]) {
            //formatted address
            //alert(results[0].formatted_address)
            //find country name
            var state = null;
            var city = null;
            var country = null;

            for (var i=0; i<results[0].address_components.length; i++) {
            	for (var b=0;b<results[0].address_components[i].types.length;b++) {
                    //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                    if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                        //this is the object you are looking for
                        state = results[0].address_components[i];
                        break;
                    }

                    if (results[0].address_components[i].types[b] == "locality") {
                        //this is the object you are looking for
                        city = results[0].address_components[i];
                        break;
                    }

                    if (results[0].address_components[i].types[b] == "country") {
                        //this is the object you are looking for
                        country = results[0].address_components[i];
                        break;
                    }
                }
            }
            $("#location").val(city.short_name + ", " + state.short_name); 
            //city data
            //alert(city.short_name + " " + city.long_name)
        } else {
        	alert("No results found");
        }
    } else {
    	alert("Geocoder failed due to: " + status);
    }
});
}