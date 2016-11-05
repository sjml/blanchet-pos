$(document).ready(function() {
    // initialization
    $('.tile').on('click', onTileClick);
});

function onTileClick(event) {
    var clicked = event.currentTarget;
    var parent = $(clicked).parent(".content");
    var index = parent.index();
    var total = parent.siblings().length + 1;
    $('.tile').each(function() {
        if (this != clicked) {
            if ( $(this).parent(".content").index() < index ) {
                $(this).addClass('animated fadeOutLeft');
            }
            else {
                $(this).addClass('animated fadeOutRight');
            }
        }
        else {
            // we have other plans for you
        }
    });
}