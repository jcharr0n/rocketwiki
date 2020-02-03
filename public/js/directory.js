;(function() {

    var bodyThumbnailPath = 'media/images/items/bodies/';

    $(function() {
        $('#itemProfile').hide();
    });

    document.onclick = function(e) {
        if (e.target.getAttribute("class") == 'responseFader') {
            itemProfile(e.target.innerText);
        }
        if (e.target.getAttribute("id") == 'back') {
            //$('#back').hide();
            $('#itemProfile').hide();
            $('#searchBar').show();
            $('#results').show();
        }
    }

    // handle the page setup when the query results are returned
    window.itemSearch = function() {

        // grab values from the inputs, append them to the url, send off the request
        var category =  document.getElementById('category').value,
        rarity = document.getElementById('rarity').value,
        obtain_method = document.getElementById('obtain_method').value,
        hitbox = document.getElementById('hitbox').value,
        parameters = [];

        parameters.push(category, rarity, obtain_method, hitbox);

        // only go through the request process if there's at least
        // one parameter to pass
        if (checkForParams(parameters)) {
            // only pass values to the query that have data
            var url = filterUrl(category, rarity, obtain_method, hitbox);

            // remove any previously created results from the page
            $('#results').remove();

            var request = new XMLHttpRequest();
            request.responseType = 'text';
            request.onreadystatechange = function() {
                if (request.readyState == 4 & request.status == 200) {
                    // when the request is returned, put it into the page
                    $('#viewport').append('<div class="entry" id="results"></div>');
                    
                    // grab parent reference and convert response to json
                    var parent = document.getElementById('results'),
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
        else {
            return;
        }
    }

    // load the information for a specified item upon clicking its thumbnail
    itemProfile = function(name) {
        var url = 'directory/' + name;
        request = new XMLHttpRequest();
        request.responseType = 'text';
        request.onreadystatechange = function() {
            if (request.readyState == 4 & request.status == 200) {
                // reset content box including removing the search bar. will need to add it back in when going back to the search page
                $('#results').hide();
                $('#searchBar').hide();

                // call helper to inject response data into profile template
                results = JSON.parse(request.responseText);
                itemDetailInjection(results);

                // show the item profile
                $('#itemProfile').show();
            }
        }
        request.open("GET", url, true);
        request.send();
    }

    // determine if at least one request param was given
    checkForParams = function(params) {
        var populated = false;
        for (var i = 0; i < params.length; i++) {
            if (params[i]) {
                populated = true;
            }
        }

        return populated;
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

    filterUrl = function(category, rarity, obtain_method, hitbox) {
        var url = '/itemSearch?',
        paramTracker = true;
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

    itemDetailInjection = function(info) {
        $('#thumbnail').css('background-image', 'url(' + bodyThumbnailPath + info[0].image + ')');
        $('#itemName').text(info[0].name);
        $('#itemType').text(info[0].category);
        $('#itemRarity').text(info[0].rarity);
        $('#itemHitbox').text(info[0].hitbox); // add conditional for when item is not a body
    }

})();