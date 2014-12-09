# Google RSS Widget

Converts an specified div in html into a simple Google Plus RSS feed. 

## Configuration/Options

* `apikey`: (String) The API key obtained from the Google Developers Console.
* `height`: (Integer) Sets the height of the div in pixels.
* `maxresults`: (Integer) Sets the maximum number of most recent posts to display.
* `plusid`: (String) Google Plus id. 

## Usage

html 

```html

<div id="posts"></div>

```
javascript

```javascript
$(document).ready(function() {

	$("#posts").googlewidget({
		apikey: "insert_api_key", 
		plusid: "google_plus_id"
	});

});

```

## Credits

[Google for their API](https://www.google.com)

[This Stack Overflow post](http://stackoverflow.com/questions/23335060/how-to-display-activity-feed-of-my-google-plus-page-in-my-website)