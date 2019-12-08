;(function() {

    var bodyThumbnailPath = 'media/images/items/bodies/';

    // handle the page setup when the query results are returned
    window.itemSearch = function() {

        // grab values from the inputs, append them to the url, send off the request
        var name = document.getElementById('name').value,
            category =  document.getElementById('category').value,
            rarity = document.getElementById('rarity').value,
            obtain_method = document.getElementById('obtain_method').value,
            hitbox = document.getElementById('hitbox').value;

        // only append values to the url that have data
        // url base string and bool for tracking if first param or not
        var url = filterUrl(name, category, rarity, obtain_method, hitbox);

        // remove previously created results
        var previousResponse = document.getElementById('append');
        previousResponse.parentNode.removeChild(previousResponse);

        var request = new XMLHttpRequest();
        request.responseType = 'text';
        request.onreadystatechange = function() {
            if (request.readyState == 4 & request.status == 200) {
                // when the request is returned, put it into the page
                var newResponse = document.createElement('DIV');
                var viewport = document.getElementById('viewport');
                viewport.appendChild(newResponse);
                newResponse.setAttribute('class', 'entry');
                newResponse.setAttribute('id', 'append');               

                // grab parent reference and convert response to json
                var parent = document.getElementById('append'),
                    resultsArray = JSON.parse(request.responseText);
                
                for (var i = 0; i < resultsArray.length; i++) {
                    var div = document.createElement('DIV');
                    div.setAttribute('class', 'responseItem');

                    // put item image into the element as the background image
                    div.style.backgroundImage = 'url(' + bodyThumbnailPath + resultsArray[i].image + ')';
                    switch(resultsArray[i].rarity) {
                        case 'common':
                            div.style.borderColor = 'lightgray';
                            break;
                        case 'uncommon':
                            div.style.borderColor = 'lightblue';
                            break;
                        case 'rare':
                            div.style.borderColor = 'blue';
                            break;
                        case 'very rare':
                            div.style.borderColor = 'purple';
                            break;
                        case 'import':
                            div.style.borderColor = 'red';
                            break;
                        case 'exotic':
                            div.style.borderColor = 'yellow';
                            break;
                        case 'limited':
                            div.style.borderColor = 'orange';
                            break;
                        case 'premium':
                            div.style.borderColor = 'green';
                            break;
                        case 'black market':
                            div.style.borderColor = 'darkpurple';
                            break;
                        default:
                            div.style.borderColor = 'white';
                            break;
                    }

                    parent.appendChild(div);

                    // create fader for effect on hover
                    var fader = document.createElement('DIV');
                    fader.setAttribute('class', 'responseFader');
                    fader.innerText = resultsArray[i].name;
                    div.appendChild(fader);
                }
            }
        }
        request.open("GET", url, true);
        request.send();
    }

    filterUrl = function(name, category, rarity, obtain_method, hitbox) {
        var url = '/itemSearch?',
        paramTracker = true;
        if (name.length > 0) {
            if (paramTracker == false) {
                url += '&';
            }
            url += 'name=' + name;
            paramTracker = false;
        }
        if (category.length > 0) {
            if (paramTracker == false) {
                url += '&';
            }
            url += 'category=' + category;
            paramTracker = false;
        }
        if (rarity.length > 0) {
            if (paramTracker == false) {
                url += '&';
            }
            url += 'rarity=' + rarity;
            paramTracker = false;
        }
        if (obtain_method.length > 0) {
            if (paramTracker == false) {
                url += '&';
            }
            url += 'obtain_method=' + obtain_method;
            paramTracker = false;
        }
        if (hitbox.length > 0) {
            if (paramTracker == false) {
                url += '&';
            }
            url += 'hitbox=' + hitbox;
            paramTracker = false;
        }

        return url;
    }

})();