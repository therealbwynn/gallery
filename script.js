// Components:
//  - Slide object
//    - name
//    - src
//    - active state change req'd

//  - Gallery object
//    - add slide object
//    - default state
//    - current slide
//      - slide object
//      - slide index
//    - advance index
//    - decrement index

//  - DOM Generation
//    - Append structure to target container
//      - instantiate new Gallery object
//      - add slides elements to gallery
//      - add class values to slides
//    - Add paddle navigation to gallery
//    - Add dotnav list items to gallery
//      - set default states through class assignments in elements

//  - Events
//    - paddle navigation
//       - bind advance and previous state change
//    - dot navigation
//       - bind the active state to a selected element
//    - touch navigation
//       - advance/previous state changes
(function strict() {
  "use strict";
}());


var slides = []; // slides array stores slide objects, passed in using api listed
// below

function Slide() {
  this.active = false; // default state - false, this property will act as the
  // state switcher for the current gallery slide in the gallery.
}

function Gallery() {

  this.addSlide = function( name, path, arr ) {
    // check parameters passed in are - string, string, array object
    if ( typeof name == "string" && typeof path == "string" && Array.isArray( arr )) {

      var slide = new Slide(); // invoke new slide object

      slide.name = name; // get name as a string

      slide.src = path; // get url path as a string

      arr.push( slide ); // push the slide object into the slides array

      console.log(arr); // just to double check while in development
    }
    else {
      console.log("Ensure parameters passed in are: string, string, array"); // go fish
    }
  };

  // implemented as Gallery.defaultState.call(this, arr);
  this.defaultSlideState = function( arr ) {
    // check to see that the array has values assigned - slide objects
    if ( arr.length > 0 ) {

      // set all active state values to false, clearing out any current assignments
      for ( var i = 0; i < arr.length; i++ ) {
        arr[i].active = false;
      }
      // return with the first slide as active
      arr[0].active = true; // sets the first gallery object with the active state
    }
    console.log( arr ); // quick double check
  };

  // curSlide takes the gallery array object as a parameter, which controls
  // session states and changes
  this.currentSlide = function( arr ) {
    var selected; // declare selected
    for ( var i = 0; i < arr.length; i++ ) {
      if ( arr[i].active === true ) { // if the slide object has a property with the active state === true
        selected = arr[i]; // set selected var to the current slide to create a
      }                    // session instance
    }

    // return current slide's index value
    function index() {
      if ( Array.isArray( arr ) ) {
        return arr.indexOf( selected ); // set var for the current index value
      }
    }

    return {
      selected: selected,
      index: index
    };
  };

  // increment/advance to the next array object
  this.advanceIndex = function( arr ) {
    var getIndex = this.currentSlide( arr ).index(); // get current slides index
    var newIdx = getIndex += 1; // set new index

    // if the index value is less than or equal to the array length value
    if ( this.currentSlide( arr ).index() < arr.length - 1 ) {
      // clear out current active state
      this.currentSlide(arr).selected.active = false;

      // assign new active state index
      arr[newIdx].active = true;
      console.log(arr);

      // if idx of arr == newIdx
      if ( this.currentSlide( arr ).index() == newIdx ) {
        displaySlide( arr );
        dotNavSlides( arr );
      }
      else {
        console.log("conditional switcher inside advance index not working");
      }
    }
    else {
      console.log("Last slide in the array");
    }
  };

  this.previousIndex = function( arr ) {
    var getIndex = this.currentSlide( arr ).index();

    // if the current index is set to 1 or, select previous slide
    if (getIndex >= 1) {
      // newIdx value set to - 1
      var newIdx = getIndex -= 1;

      // clear out active state
      this.currentSlide(arr).selected.active = false;

      // new index assigned
      arr[newIdx].active = true;
      console.log(arr);

      if ( this.currentSlide( arr ).index() == newIdx ) {
        displaySlide( arr );
        dotNavSlides( arr );
      }
      else {
        console.log("something went wrong with the previous index conditional");
      }
    }
    else {
      return console.log("At the first slide, can't go back any further.");
    }
  };

  this.createContainer = function( container, arr ) {
      // if slides are present
      if ( arr.length > 0 ) {
          var gallery = String() +
               "<div id='slidify'>" +
                 "<div id='slides'></div>" +
                 "<div class='paddle-nav'>" +
                   "<a href='#' class='left'><div class='paddle paddle-left'></div></a>" +
                   "<a href='#' class='right'><div class='paddle paddle-right'></div></a>" +
                 "</div>" +
                 "<div class='dotnav'>" +
                  "<ul></ul>" +
                 "</div>" +
               "</div>";

          container.innerHTML = gallery;
      }
      else {
          console.log( "Need to create more slide objects using addSlide() method." );
      }
  };

  // this method invokes the generation of gallery slider, based on the presence
  // of array slide objects.
  this.createSlides = function( arr ) {

    var gal = document.querySelector("#slidify #slides");

    // array has slides in it?
    if ( arr.length > 0 ) {
      for ( var i = 0; i < arr.length; i++ ) {

        var fig = document.createElement("FIGURE"); // create figure element
        // create new element
        gal.appendChild( fig );
      }
      displaySlide( arr );
    }
    else {
      console.log("createSlides function needs an array to be passed in as param");
    }
  };

  this.dotNav = function( arr ) {
    var getUl = document.querySelector("#slidify .dotnav > ul");

    if ( getUl ) {
      // create all dotnav elements by looping through the array
      for ( var i = 0; i < arr.length; i++ ) {

        var li = document.createElement("li");

        getUl.appendChild( li );
      }
      dotNavSlides( arr );
    }
  };

  function dotNavSlides( arr ) {
    var items = document.querySelectorAll("#slidify .dotnav li");
    for (var i = 0; i < arr.length; i++) {
      if ( arr[i].active ) {
        items[i].classList.add("active");
      }
      else {
        items[i].classList.remove("active");
      }
    }
  }

  // this is a callback function to determine the slide index after a state change
  // has taken place to display the current slide
  function displaySlide( arr ) {
    var el = document.querySelectorAll("#slidify #slides > figure");
    // if elements created and variable successful
    if (el) {
      for ( i = 0; i < arr.length; i++ ) {
        // clear out all active class assignments
        el[i].classList.remove("active");
        // set default active state
        if ( arr[i].active ) {
          el[i].classList.add("active");
          el[i].style.zIndex = "7";
        }
        else {
          el[i].style.zIndex = "2";
        }
        el[i].classList.add( arr[i].name, "slide" ); // cycle through array.name values to assign as class to element
        el[i].style.background = "url('" + arr[i].src + "')"; // defining gallery slide image via arr.src prop
        el[i].style.backgroundSize = "contain";
        el[i].style.backgroundRepeat = "no-repeat";
        el[i].style.backgroundPosition = "center";
      }
    }
    else {
      console.log("Check el element is assigned to correct querySelectorAll value.");
    }
  }

  return {
    addSlide: this.addSlide, // return addSlide method
    defaultSlideState: this.defaultSlideState, // return defaultSlideState method
    currentSlide: this.currentSlide, // return currentSlide method
    advanceIndex: this.advanceIndex, // advanceIndex
    previousIndex: this.previousIndex, // previousIndex
    createContainer: this.createContainer, // createContainer
    createSlides: this.createSlides, // createSlides
    dotNav: this.dotNav
  };
}


// SAMPLE SESSION FOR DEVELOPMENT PURPOSES
// create new gallery object
var gallery = new Gallery();
// gallery.addSlide("slide 1", "imgsrc.jpg", slides); // invocation of a new slide
gallery.addSlide("slide1", "img/img1.jpg", slides ); // addSlide along with slide name, image path, and project array
gallery.addSlide("slide2", "img/img2.jpg", slides );
gallery.addSlide("slide3", "img/img3.jpg", slides );
gallery.addSlide("slide4", "img/img4.jpg", slides );
gallery.addSlide("slide5", "img/img5.jpg", slides );
gallery.defaultSlideState( slides ); // on init, this should be set as a promise, to execute asynchronously when a slide object is available
var el = document.getElementById("attach"); // set element declaration to with element to append gallery to
gallery.createContainer( el, slides ); // create gallery container
gallery.createSlides( slides ); // create slides
gallery.dotNav( slides ); // create dotnav
