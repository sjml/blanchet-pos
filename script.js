$(document).ready(function() {
    // initialization
    $('.tile').on('click', onTileClick);
});

function onTileClick(event) {
    var clicked = event.currentTarget;
    var index = $(clicked).index();
    var total = $(clicked).siblings().length + 1;
    $('.tile').each(function() {
        if (this != clicked) {
            if ( $(this).index() < index ) {
                $(this).addClass('animated fadeOutLeft');
            }
            else {
                $(this).addClass('animated fadeOutRight');
            }
        }
        else {
            // we have other plans for you
            var destination = clicked.dataset.page;
            // window.history.pushState({}, destination, destination);
        }
    });
}