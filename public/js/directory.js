;(function() {

    var
        bodyThumbnailPath = 'media/images/items/bodies/';

    // handle the page setup when the query results are returned
    window.httpGetAsync = function() {

        // grab values from the inputs, append them to the url, send off the request
        var name = document.getElementById('name').value,
            category =  document.getElementById('category').value,
            rarity = document.getElementById('rarity').value,
            obtain_method = document.getElementById('obtain_method').value,
            hitbox = document.getElementById('hitbox').value;

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

                // grab parent reference and then create the new elements
                var parent = document.getElementById('append'),
                    resultsArray = JSON.parse(request.responseText);
                
                for (var i = 0; i < resultsArray.length; i++) {
                    var div = document.createElement('DIV');
                    div.setAttribute('class', 'responseItem');
                    div.innerText = resultsArray[i].name;

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

                    }

                    parent.appendChild(div);
                }
            }
        }
        request.open("GET", '/query?name=' + name + '&category=' + category + '&rarity=' + rarity + '&obtain_method=' + obtain_method + '&hitbox=' + hitbox, true);
        request.send();
    }

})();