;(function() {

    var initScreenWidth, // so that scrolling the rank sprites doesnt get messed up if screen resize
    slideBar,
    scrollDirection,
    sliderImages = [],
    scrollInterval = 35,
    spriteCount = 19,
    spriteWidth = 40,
    scrollProgress = 1;

    window.onload = function start(){
        buildSlideBar();
        // test
        console.log("using public js file");
    }

    // set interval for slider speed
    window.setInterval(scrollSlideBar, scrollInterval);

    // creates the slidebar for the header of the page
    // optimize = does it really need this?
    function buildSlideBar()
    {
        // account for window size changing
        initScreenWidth = window.outerWidth * 5;
        var temp = initScreenWidth / spriteWidth,
        temp2 = Math.trunc(temp),
        initScreenWidth = temp2 * spriteWidth;

        // decide which way to scroll the slideBar
        scrollDirection = Math.floor(Math.random() * 2);

        // start populating the slideBar
        var imageQuantity = Math.floor(initScreenWidth / 40) + 1,
        randomizedOrder = [];
        slideBar = document.getElementById('slideBar');

        // create an array as big as the quantity that was determined,
        // but only assigns the source as a number from 1 to total num of sprites
        for (var i = 0; i < imageQuantity; i++) {
            if (i < (spriteCount - 1)) {
                randomizedOrder.push(i + 1);
            }
            else {
                randomizedOrder.push(Math.floor(Math.random() * spriteCount) + 1);
            }
        }
        randomizedOrder = shuffle(randomizedOrder);

        // format images and append to slideBar
        for (var i = 0; i < randomizedOrder.length; i++) {
            var slideImg = document.createElement('img');
            slideImg.src = 'media/images/ranksprites/' + randomizedOrder[i] + '.png';
            slideImg.className = 'sliderImgs';
            slideImg.style.position = 'absolute';
            slideImg.style.left = i * spriteWidth + 'px';
            slideBar.appendChild(slideImg);
        }
        sliderImages = document.getElementsByClassName('sliderImgs');
    }

    // shuffle to randomize the order of the sprites
    function shuffle(array)
    {
        var currentIndex = array.length, tempValue;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
        
            tempValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = tempValue;
        }
        return array;
    }

    // scroll the images left or right, move them back when they go offscreen
    function scrollSlideBar()
    {
        for (var sliderImg of sliderImages) {
            var currentLeft = parseInt(sliderImg.style.left);
            // right
            if (scrollDirection == 0) {
                sliderImg.style.left = currentLeft + scrollProgress + 'px';
                if (parseInt(sliderImg.style.left) > initScreenWidth) {
                    sliderImg.style.left = 0 - spriteWidth + 'px';
                }
            }
            // left
            else if (scrollDirection == 1) {
                sliderImg.style.left = currentLeft - scrollProgress + 'px';
                if (parseInt(sliderImg.style.left) < -spriteWidth) {
                    sliderImg.style.left = initScreenWidth + 'px';
                }
            }
        }
    }

    // when hovering over a navbar item, use slide out animation to display further menu
    // for example:
    //      Item List -> Blueprints -> Series -> (List)
    //                   Rocket Pass -> 1 || 2 || 3 || 4
    //                   Twitch Rewards -> Reward Packs || Stream Drops
    //                   By Item Attribute -> (Type x Quality selectors in page)
    //
    // will be a div whose width is set to 0 until its navbar item is hovered over,
    // and have a left style of however many pixels the navbar is (+ margins)

    // consider changing rarity indicator from border color to something else, potentially
    // an overlay to the thumbnail with a colored stripe, etc.
})();