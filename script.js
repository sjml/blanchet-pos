var CURRENT_STATE = "menu"; // "transition" and individual tiles are other options

$(document).ready(function() {
    Origami.fastclick(document.body);

    setupText();

    $('.tile').on('click', onTileClick);
});

$.fn.extend({
    animateAdd: function (animationName, callback) {
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
    animateRemove: function (animationName, callback) {
        var self = this;
        return new Promise( function(resolve, reject) {
            var animationEnd = 'webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd';
            self.removeClass(animationName).one(animationEnd, function() {
                if (callback) {
                    callback.bind(self)();
                }
                resolve();
            });
        });
    }
});

function setupText() {
    $(".text").each(function(index, el) {
        var pageName = this.dataset.page;
        $.get( "/pages/" + pageName + ".md", function(data) {
            var md = marked(data);
            $(el).html(md);
        });
    });
}

function onTileClick(event) {
    if (CURRENT_STATE === "transition") {
        return; // ignore input while we're transitioning
    }
    var prevState = CURRENT_STATE;
    CURRENT_STATE = "transition";

    function getTileIndex(element) {
        var visibles = $(element).parent().children(".tile");
        return visibles.index(element);
    }
    var clicked = event.currentTarget;
    var index = getTileIndex(clicked);
    var numTiles = $(clicked).parent().children(".tile").length;

    var animPromises = [];

    if (prevState === "menu") {
        $('.tile').each(function() {
            if (this != clicked) {
                if ( getTileIndex(this) < index ) {
                    animPromises.push($(this).animateAdd('outLeft'));
                }
                else {
                    animPromises.push($(this).animateAdd('outRight'));
                }
            }
            else {
                if (index === 0 || index === numTiles-1) {
                    // we don't gotta do nothin'
                }
                else if (index < (numTiles / 2)) {
                    // move us to the left
                    animPromises.push($(clicked).animateAdd('shiftLeft'));
                }
                else {
                    // move us to the right
                    animPromises.push($(clicked).animateAdd('shiftRight'));            
                }
            }
        });
        Promise.all(animPromises).then(function() {
            // tile transition done
            animPromises = [];

            var destination = clicked.dataset.page;
            var selector = ".text[data-page='" + destination + "']";
            $(selector).show();
            $(selector).scrollTop(0);            

            $(".outLeft, .outRight").hide();
            $(clicked).addClass("noTransition");

            //leave note for future-us that this item is visually shifted
            if ($(clicked).hasClass("shiftLeft")) {
                $(clicked).addClass("vizLeft");
            }
            if ($(clicked).hasClass("shiftRight")) {
                $(clicked).addClass("vizRight");
            }
            
            $(clicked).removeClass("shiftLeft shiftRight");
            var hack = clicked.offsetHeight; // to trigger a reflow! 
            $(clicked).removeClass("noTransition");
            
            $(selector).removeClass("out");

            CURRENT_STATE = destination;
        });
    }
    else {
        // we're going back to the menu

        var selector = ".text[data-page='" + prevState + "']";
        animPromises.push($(selector).animateAdd("out"));

        // this is a mess of nesting :(
        Promise.all(animPromises).then(function() {
            animPromises = [];

            $(selector).hide();
            var awayDivs = $(".outLeft, .outRight");
            awayDivs.show();
            
            $(clicked).addClass("noTransition");
            if ($(clicked).hasClass("vizLeft")) {
                $(clicked).removeClass("vizLeft");
                $(clicked).addClass("shiftLeft");
            }
            if ($(clicked).hasClass("vizRight")) {
                $(clicked).removeClass("vizRight");
                $(clicked).addClass("shiftRight");
            }
            var hack = $(".outRight, .outLeft").css('transform'); //reflow
            $(clicked).removeClass("noTransition");

            animPromises.push($(clicked).animateRemove("shiftLeft shiftRight"));
            $.each(awayDivs, function(index, value) {
                animPromises.push($(value).animateRemove("outLeft outRight"));
            });

            Promise.all(animPromises).then(function() {
                animPromises = [];
            });
        });

        // bring back the other tiles

        CURRENT_STATE = "menu";
    }
}