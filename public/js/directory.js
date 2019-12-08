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

        // only pass values to the query that have data
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
                    div.style.borderColor = assignBorderColor(resultsArray[i].rarity);

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

    assignBorderColor = function(rarity) {
        var color = 'white';
        switch(rarity) {
            case 'common':
                color = 'lightgray';
                break;
            case 'uncommon':
                color = 'lightblue';
                break;
            case 'rare':
                color = 'blue';
                break;
            case 'very rare':
                color = 'purple';
                break;
            case 'import':
                color = 'red';
                break;
            case 'exotic':
                color = 'yellow';
                break;
            case 'limited':
                color = 'orange';
                break;
            case 'premium':
                color = 'green';
                break;
            case 'black market':
                color = 'darkpurple';
                break;
            default:
                color = 'white';
                break;
        }

        return color;
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