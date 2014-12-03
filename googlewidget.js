
//http://stackoverflow.com/questions/23335060/how-to-display-activity-feed-of-my-google-plus-page-in-my-website
//changed the code (slightly) from the one obtained above
//remember to enable Google+ API, maybe contacts in the google developer API console 

var plusId = '102756237423986139099';
var apiKey = 'AIzaSyA9d1zhQhAaSSB_HuOaClrELgWhMaP7B1k';

function start(){
    gapi.client.setApiKey( apiKey );
    gapi.client.load('plus','v1').then(function(){
        console.log('loaded');
        gapi.client.plus.activities.list({
            userId: plusId,
		    collection: 'public',
            maxResults: 10
        }).execute(function(resp){
		    console.log('in execute');
            if( resp && resp.items && resp.items.length > 0 ){
                for( var co=0; co<resp.items.length; co++ ){
                    //$('#posts').append('<div class="post"><div id="posts-'+co+'"></div></div>');
                    //var url = resp.items[co].object.url;
                    //gapi.post.render('posts-'+co, {url:url});


                    $('#posts').append('<div class="post"><div class="date"></div><div id="posts-'+co+'"></div></div>');
					// var datez = $("<div>", {class: "date", text: });
					// $('#posts-' + co).prepend(datez);
					// console.log(resp.items[co].published);
					$('#posts-' + co).siblings(".date").text( (resp.items[co].published).match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/) );
					$('#posts-' + co).text(resp.items[co].object.content);

                }
            } 
			else {
                console.log('invalid resp', resp);
            }
		});

    });

}

function speed_test(data) {
	for(var i = 0; i < data.items.length; i++) {
        $('#posts').append('<div class="post"><div class="date"></div><div id="posts-'+i+'"></div></div>');
		$('#posts-' + i).siblings(".date").text( convertRFC3339(data.items[i].published));
		$('#posts-' + i).text(data.items[i].object.content);
	}
}

function convertRFC3339(rfc3339time) { //converts into GMT Pacific Standard Time
	var date = new Date(Date.parse(rfc3339time));
	var mytime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
	return mytime;
}


$(document).ready(function() {

    // var po = document.createElement( 'script' );
    // po.type = 'text/javascript';
    // po.async = true;
    // po.src = 'https://plus.google.com/js/client:plusone.js?onload=start';
    // var s = document.getElementsByTagName( 'script' )[0];
    // s.parentNode.insertBefore( po, s );

	var json = get_url_json("https://content.googleapis.com/plus/v1/people/102756237423986139099/activities/public?maxResults=10&key=AIzaSyA9d1zhQhAaSSB_HuOaClrELgWhMaP7B1k");
	console.log(json);
	speed_test(json);
});

function get_url_json(url) {
	var jsondata = $.ajax({
		type: 'GET',
		cache: false,
		url: url,
		dataType: 'json',
		async:false,
	});
	return jQuery.parseJSON(jsondata.responseText);
}
