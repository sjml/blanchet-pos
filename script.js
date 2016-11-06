$(document).ready(function() {
    // initialization
    $('.tile').on('click', onTileClick);
});

$.fn.extend({
    animateCss: function (animationName, callback) {
        var self = this;
        return new Promise( function(resolve, reject) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            self.addClass('animated ' + animationName).one(animationEnd, function() {
                $(self).removeClass('animated ' + animationName);
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
    var numTiles = $(clicked).parent().children(".tile");

    var animPromises = [];
    $('.tile').each(function() {
        if (this != clicked) {
            if ( getVisibleIndex(this) < index ) {
                animPromises.push($(this).animateCss('fadeOutLeft'));
            }
            else {
                animPromises.push($(this).animateCss('fadeOutRight'));
            }
        }
        else {
            if (index < (numTiles / 2)) {
                // move us to the left
                animPromises.push($(clicked).animateCss('slideOutLeft'));
            }
            else {
                // move us to the right
                animPromises.push($(clicked).animateCss('slideOutRight'));            
            }
        }
    });
    Promise.all(animPromises).then(function() {
        // tile transition done

        animPromises = [];
    });
}