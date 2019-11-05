;(function() {

  var
    slideBar,
    scrollDirection,
    sliderImages = [],
    scrollInterval = 50,
    spriteCount = 19,
    spriteWidth = 40,
    scrollProgress = 1;
  
  window.onload =
  function start(){
    buildSlideBar();
  }

  window.setInterval(scrollSlideBar, scrollInterval);

  function buildSlideBar()
  {
    // decide which way to scroll the slideBar
    scrollDirection = Math.floor(Math.random() * 2);

    // start populating the slideBar
    var imageQuantity = Math.floor(window.outerWidth / 40) + 1;
    var randomizedOrder = [];
    slideBar = document.getElementById('slideBar');

    // create an array as big as the quantity that was determined,
    // but only assigns the source as a number from 1 to total num of sprites
    for (var i = 0; i < imageQuantity; i++)
    {
      if (i < (spriteCount - 1))
      {
        randomizedOrder.push(i + 1);
      }
      else
      {
        randomizedOrder.push(Math.floor(Math.random() * spriteCount) + 1);
      }
    }

    randomizedOrder = shuffle(randomizedOrder);
    // format images and append to slideBar
    for (var i = 0; i < randomizedOrder.length; i++)
    {
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
    var currentIndex = array.length, tempValue, randIndex;
  
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
    for (var sliderImg of sliderImages)
    {
      var currentLeft = parseInt(sliderImg.style.left);
      // right
      if (scrollDirection == 0)
      {
        sliderImg.style.left = currentLeft + scrollProgress + 'px';
        if (parseInt(sliderImg.style.left) > window.outerWidth)
        {
          sliderImg.style.left = 0 - spriteWidth + 'px';
        }
      }
      // left
      else if (scrollDirection == 1)
      {
        sliderImg.style.left = currentLeft - scrollProgress + 'px';
        if (parseInt(sliderImg.style.left) < -spriteWidth)
        {
          sliderImg.style.left = window.outerWidth + 'px';
        }
      }
    }
  }

  // add onclick functionality for navbar butons,
  // make app an SPA by inserting html into #content (or .entry) on click
  // style active tab to have black background in the navbar, lightsteelblue text
  // orange text on down click
  // if clicked, assign navitem an id of "active" and iterate through all navitem
  // elements. if their class is navitem and their id is not "active" assign them
  // the original style class

  // fix content entries so that they originate at the right border of the navbar,
  // not at the left edge of the screen. add a "left: x px" style to it maybe

  // use a wide pan image for title bar background banner, will give the page more
  // character

  // when hovering over a navbar item, slide out with css animation a further menu
  // well, maybe a slide out. might look cleaner just to have it be instant on hover
  // for example Item List -> Blueprints, Twitch Drops, RocketPass
  // or          Item List -> Bodies, Wheels, Boosts, Trails
  // will be a div whose width is set to 0 until its navbar item is hovered over,
  // and it will have a left style of however many pixels the navbar is (+ margin)

  // have drop down for item select, so you can select by crate series, by rarity,
  // by season rewards, etc
})();