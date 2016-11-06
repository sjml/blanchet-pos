$(document).ready(function() {
    $('.tile').on('click', onTileClick);
});

$.fn.extend({
    animateCss: function (animationName, callback) {
        var self = this;
        return new Promise( function(resolve, reject) {
            var animationEnd = 'webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd';
            self.addClass(animationName).one(animationEnd, function() {
                if (callback) {
                    callback.bind(self)();
                }
                resolve();
            });
        });
    },
});

function onTileClick(event) {
    function getVisibleIndex(element) {
        var visibles = $(element).parent().children(".tile"); // just look at tiles right now
        return visibles.index(element);
    }
    var clicked = event.currentTarget;
    var index = getVisibleIndex(clicked);
    var numTiles = $(clicked).parent().children(".tile").length;

    var animPromises = [];
    $('.tile').each(function() {
        if (this != clicked) {
            if ( getVisibleIndex(this) < index ) {
                animPromises.push($(this).animateCss('outLeft'));
            }
            else {
                animPromises.push($(this).animateCss('outRight'));
            }
        }
        else {
            if (index === 0 || index === numTiles-1) {
                // we don't gotta do nothin'
            }
            else if (index < (numTiles / 2)) {
                // move us to the left
                animPromises.push($(clicked).animateCss('shiftLeft'));
            }
            else {
                // move us to the right
                animPromises.push($(clicked).animateCss('shiftRight'));            
            }
        }
    });
    Promise.all(animPromises).then(function() {
        // tile transition done
        animPromises = [];


        var destination = clicked.dataset.page;
        var selector = ".text[data-page='" + destination + "']";
        $(selector).show();

        $(".outLeft, .outRight").hide();
        $(clicked).addClass("noTransition");
        $(clicked).removeClass("shiftLeft shiftRight");
        var hack = clicked.offsetHeight; // to trigger a reflow! 
        $(clicked).removeClass("noTransition");
        
        $(selector).removeClass("out");
    });
}