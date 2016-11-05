$(document).ready(function() {
    // initialization
    $('.tile').on('click', onTileClick);
});

$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    },
    animateHide: function (animationName) {
        this.animateCss(animationName);
        // this.();
    }
});

function onTileClick(event) {
    var clicked = event.currentTarget;
    console.log(clicked);
    $('.tile').each(function() {
        if (this == clicked) {

        }
        else {
            $(this).animateOut('fadeOutLeft');
        }
    });
}