var Scroller = function (arrowQuery, toWhere) {
    'use strict';
    var arrow = document.querySelector(arrowQuery);
    function init () {
        arrow.addEventListener('click', scroll.call(this, toWhere));
    }
    function scroll (toWhere) {
        var coordinates =  toWhere.getBoundingClientRect().top;
        var distanceFromTop = document.body.scrollTop;
        var yDistance = coordinates + distanceFromTop;
        return function () {
            scrollTo(yDistance, 500, easing.easeOutQuad);
        };
    }
    return  {
        init: init,
        scroll: scroll
    };
};

var Portfolio = function (portfolioSelector) {
    'use strict';
    var dom = document.querySelector(portfolioSelector);
    var myEntries = [];
    var isOpen;
    function init () {
        buildPortfolioEntryList(dom);
        dom.addEventListener('click', handleClick);
        return dom;
    }
    function buildPortfolioEntryList (portfolioDom) {
        var portfolioItems = portfolioDom.querySelectorAll('li');
        var i = 0;
        var portfolioItemDom;
        var portfolioEntry;
        for (i; i < portfolioItems.length; i++) {
            portfolioItemDom = portfolioItems[i];
            portfolioEntry = PortfolioEntry(portfolioItemDom, i);
            myEntries.push(portfolioEntry);
            portfolioEntry.init();
        }
    }
    function handleClick (e) {
        var index = 0;
        var clickEntryIndex = getClosest(e.target, 'li').dataset.index;
        var clickedEntry = myEntries[clickEntryIndex];
        if (clickedEntry.amIOpen()) {
            return clickedEntry.close();
        }
        for (index; index < myEntries.length; index++) {
            var portfolioEntry = myEntries[index];
            if (portfolioEntry.amIOpen()) {
                portfolioEntry.close();
            }
        }
        if (!clickedEntry.amIOpen()) {
            clickedEntry.open();
        }
    }
    return {
        init: init
    };
};

var PortfolioEntry = function (portfolioItemDom, i) {
    'use strict';
    var myDom = portfolioItemDom;
    var teaser = myDom.querySelector('.teaser');
    var arrow = myDom.querySelector('.fa-angle-right');
    var myIndex = i;
    var isOpen = false;
    var scroller = Scroller(null, myDom);
    function init () {
        myDom.dataset.index = myIndex;
    }
    function amIOpen() {
        return isOpen;
    }
    function close () {
        myDom.classList.remove('open');
        arrow.classList.remove('fa-angle-down');
        isOpen = false;
    }
    function open () {
        myDom.classList.add('open');
        arrow.classList.add('fa-angle-down');
        isOpen = true;
        scroller.scroll(myDom)(null);
    }
    function getDom (){
        return myDom;
    }
    return {
        init: init,
        open: open,
        close: close,
        getDom: getDom,
        amIOpen: amIOpen
    };
};



document.addEventListener("DOMContentLoaded", function(event) {
  var arrowQuery = '.go-down';
  var portfolioQuery = '#portfolio';
  var portfolio = Portfolio(portfolioQuery);
  var scroller = Scroller(arrowQuery, portfolio.init());
  scroller.init();
});


// Helper functions

function scrollTo(Y, duration, easingFunction, callback) {

    var start = Date.now(),
      elem = document.documentElement.scrollTop?document.documentElement:document.body,
      from = elem.scrollTop;

    if(from === Y) {
        callback();
        return; /* Prevent scrolling to the Y point if already there */
    }

    function min(a,b) {
      return a<b?a:b;
    }

    function scroll(timestamp) {

        var currentTime = Date.now(),
            time = min(1, ((currentTime - start) / duration)),
            easedT = easingFunction(time);

        elem.scrollTop = (easedT * (Y - from)) + from;

        if(time < 1) requestAnimationFrame(scroll);
        else
            if(callback) callback();
    }

    requestAnimationFrame(scroll)
}

/* bits and bytes of the scrollTo function inspired by the works of Benjamin DeCock */

/*
 * Easing Functions - inspired from http://gizma.com/easing/
 * only considering the t value for the range [0, 1] => [0, 1]
 */
var easing = {
  // no easing, no acceleration
  linear: function (t) { return t },
  // accelerating from zero velocity
  easeInQuad: function (t) { return t * t },
  // decelerating to zero velocity
  easeOutQuad: function (t) { return t * (2 - t) },
  // acceleration until halfway, then deceleration
  easeInOutQuad: function (t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t },
  // accelerating from zero velocity
  easeInCubic: function (t) { return t * t * t },
  // decelerating to zero velocity
  easeOutCubic: function (t) { return (--t) * t * t + 1 },
  // acceleration until halfway, then deceleration
  easeInOutCubic: function (t) { return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1 },
  // accelerating from zero velocity
  easeInQuart: function (t) { return t * t * t * t },
  // decelerating to zero velocity
  easeOutQuart: function (t) { return 1 - (--t) * t * t * t },
  // acceleration until halfway, then deceleration
  easeInOutQuart: function (t) { return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t },
  // accelerating from zero velocity
  easeInQuint: function (t) { return t * t * t * t * t },
  // decelerating to zero velocity
  easeOutQuint: function (t) { return 1 + (--t) * t * t * t * t },
  // acceleration until halfway, then deceleration
  easeInOutQuint: function (t) { return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t }
}


var getClosest = function (elem, selector) {

    var firstChar = selector.charAt(0);

    // Get closest match
    for ( ; elem && elem !== document; elem = elem.parentNode ) {

        // If selector is a class
        if ( firstChar === '.' ) {
            if ( elem.classList.contains( selector.substr(1) ) ) {
                return elem;
            }
        }

        // If selector is an ID
        if ( firstChar === '#' ) {
            if ( elem.id === selector.substr(1) ) {
                return elem;
            }
        }

        // If selector is a data attribute
        if ( firstChar === '[' ) {
            if ( elem.hasAttribute( selector.substr(1, selector.length - 2) ) ) {
                return elem;
            }
        }

        // If selector is a tag
        if ( elem.tagName.toLowerCase() === selector ) {
            return elem;
        }

    }

    return false;

};
