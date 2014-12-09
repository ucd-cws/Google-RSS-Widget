(function($) {

	$.fn.googlewidget = function(options) {

		var config = {
			'apikey' : '',
			'plusid' : '',
			'maxresults' : 10,
			'height' : 350
		};

		if(options) {
			//compare objects and then apply new changes
			$.extend(config, options);
		}

		return this.each(function() {
			var widget = this;
			$(widget).css({ 'height' : config.height + 'px' });
			startwidget(widget, config.apikey, config.plusid, config.maxresults);
		});
	}

}(jQuery));


function startwidget(mydiv, apikey, plusid, maxresults){

	var script = document.createElement('script');
	script.type = 'text/javascript';
	/** the onload=invokegoogleapi is hardcoded into the src 
	    so the js parser doesnt parse the callback function
	**/
	script.src = 'https://plus.google.com/js/client:plusone.js?onload=invokegoogleapi';
	script.async = true;
	//script.onload doesnt work because the below gets parsed before the script.src gets evaled
	//the below variable is global
	invokegoogleapi = function() {
		gapi.client.setApiKey( apikey );
		gapi.client.load('plus','v1').then(function(){
			console.log('loaded');
			gapi.client.plus.activities.list({
				userId: plusid,
				collection: 'public',
				maxResults: maxresults
			}).execute(function(resp){
				console.log('in execute');
				if( resp && resp.items){
					for( var i = 0; i < resp.items.length; i++ ){
						$(mydiv).append('<div class="post"><div id="posts-'+i+'"></div></div>');
						var url = resp.items[i].object.url;
						gapi.post.render('posts-'+i, {url:url}); 
					}
				} 
				else {
					console.log('invalid resp', resp);
				}
			});

		});
	};
	var p = document.getElementsByTagName('script')[0]
	p.parentNode.insertBefore(script, p);
	eval(script); // oddly, we need to evaluate the script..

}

