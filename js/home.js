;(function() {
  
  var
    scrollInterval,
    scrollDirection,
    sliderImages = [],
    scrollProgress = 0;

  
  window.onload =
  function start(){
    buildHome();
  }

  window.setInterval(scrollSlideBar, 100);

  function buildHome()
  {
    // decide which way to scroll the slideBar
    scrollDirection = Math.floor(Math.random() * 2);
    this.console.log("scroll direction: " + scrollDirection);

    // start building the slideBar
    var
      imageQuantity = 19,
      randomizedOrder = [],
      slideBar = document.getElementById("slideBar");

    // create an array of elements as big as the quantity that was predefined
    for (var i = 0; i < imageQuantity; i++)
    {
      randomizedOrder.push(i + 1);
    }
    randomizedOrder = shuffle(randomizedOrder);
    this.console.log(randomizedOrder);

    // loop through the total number of images needed and 
    for (var i = 0; i < imageQuantity; i++)
    {
      var slideImg = document.createElement("img");
      slideImg.src = "media/images/ranksprites/" + randomizedOrder[i] + ".png";
      slideImg.className = "sliderImgs";
      // append the created image with a randomized source to the container div
      slideBar.appendChild(slideImg);
      sliderImages.push(slideImg);
    }
  }
  
  // shuffle the image list array
  function shuffle(array) {
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

  // scroll the images after a certain time interval, can go left or right
  function scrollSlideBar(){
    if (scrollDirection == 0)
    {
      scrollProgress++;
    }
    else if (scrollDirection == 1)
    {
      scrollProgress--;
    }
    for (const sliderImg of sliderImages)
    {
      console.log(sliderImg);
      var imageStyle = window.getComputedStyle(sliderImg); // resume here
      var rightValue = imageStyle.getPropertyValue("right").replace("px", "");
      sliderImg.style.right = rightValue + scrollProgress + "px";
    }

    //console.log("scroll pixels: " + scrollProgress);
    //console.log("right: " + sliderImg.style.right);
  }
})();