# Google RSS Widget

Converts an specified div in html into a simple Google Plus RSS feed. 

## Configuration

Create a div in the html file

```html

<div id="posts"></div>

```

```javascript
$(document).ready(function() {

$("#posts").googlewidget({apikey:"insert_api_key", plusid: "google_plus_id"});

});

```