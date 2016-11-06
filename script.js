$(document).ready(function() {
    // initialization
    $('.tile').on('click', onTileClick);
});

$.fn.extend({
    animateCss: function (animationName, callback) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
            if (callback) {
                callback.bind(this)();
            }
        });
    },
});

function onTileClick(event) {
    var clicked = event.currentTarget;
    var index = $(clicked).index();
    var total = $(clicked).siblings().length + 1;

    var lockedWidth = $(clicked).width();

    $('.tile').each(function() {
        if (this != clicked) {
            if ( $(this).index() < index ) {
                $(this).animateCss('fadeOutLeft');
            }
            else {
                $(this).animateCss('fadeOutRight');
            }
        }
        else {
            // we have other plans for you
            // $(clicked).width(lockedWidth);


            var destination = clicked.dataset.page;
            // window.history.pushState({}, destination, destination);
        }
    });
}