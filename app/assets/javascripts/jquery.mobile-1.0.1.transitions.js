$(document).bind( "mobileinit", function(event) {
    $.mobile.transitionHandlers = { "default" : $.mobile.defaultTransitionHandler };
});
 
$(document).bind("mobileinit", function(){
    $.mobile.defaultTransitionHandler = function( name, reverse, $to, $from ) {
 
        var deferred = new $.Deferred(),
            sequential = false,
            reverseClass = reverse ? " reverse" : "",
            active  = $.mobile.urlHistory.getActive(),
            toScroll = active.lastScroll || $.mobile.defaultHomeScroll,
            screenHeight = $.mobile.getScreenHeight(),
            maxTransitionOverride = $.mobile.maxTransitionWidth !== false && $( window ).width() > $.mobile.maxTransitionWidth,
            none = !$.support.cssTransitions || maxTransitionOverride || !name || name === "none",
            toggleViewportClass = function(){
                $.mobile.pageContainer.toggleClass( "ui-mobile-viewport-transitioning viewport-" + name );
            },
            scrollPage = function(){
                // By using scrollTo instead of silentScroll, we can keep things better in order
                // Just to be precautios, disable scrollstart listening like silentScroll would
                $.event.special.scrollstart.enabled = false;
 
                window.scrollTo( 0, toScroll );
 
                // reenable scrollstart listening like silentScroll would
                setTimeout(function() {
                    $.event.special.scrollstart.enabled = true;
                }, 150 );
            },
            cleanFrom = function(){
                $from
                    .removeClass( $.mobile.activePageClass + " out in reverse " + name )
                    .height( "" );
            },
            startOut = function(){
                // if it's not sequential, call the doneOut transition to start the TO page animating in simultaneously
                if( !sequential ){
                    doneOut();
                }
                else {
                    $from.animationComplete( doneOut ); 
                }
 
                // Set the from page's height and start it transitioning out
                // Note: setting an explicit height helps eliminate tiling in the transitions
                $from
                    .height( screenHeight + $(window ).scrollTop() )
                    .addClass( name + " out" + reverseClass );
            },
 
            doneOut = function() {
 
                if ( $from && sequential ) {
                    cleanFrom();
                }
 
                startIn();
            },
 
            startIn = function(){   

                //prevent flickering in phonegap container
                $to.css("z-index", -10);
 
                $to.addClass( $.mobile.activePageClass );               
 
                // Send focus to page as it is now display: block
                $.mobile.focusPage( $to );
 
                // Set to page height
                $to.height( screenHeight + toScroll );
 
                scrollPage();
  
                //restores visibility of the new page
                $to.css("z-index", "");

                if( !none ){
                    $to.animationComplete( doneIn );
                }
 
                $to.addClass( name + " in" + reverseClass );
 
                if( none ){
                    doneIn();
                }
 
            },
 
            doneIn = function() {
 
                if ( !sequential ) {
 
                    if( $from ){
                        cleanFrom();
                    }
                }
 
                $to
                    .removeClass( "out in reverse " + name )
                    .height( "" );
 
                toggleViewportClass();
 
                // In some browsers (iOS5), 3D transitions block the ability to scroll to the desired location during transition
                // This ensures we jump to that spot after the fact, if we aren't there already.
                if( $( window ).scrollTop() !== toScroll ){
                    scrollPage();
                }
 
                deferred.resolve( name, reverse, $to, $from, true );
            };
 
        toggleViewportClass();
 
        if ( $from && !none ) {
            startOut();
        }
        else {
            doneOut();
        }
 
        return deferred.promise();
    };
    $.extend($.mobile, {
        defaultPageTransition: "slide",
        loadingMessage: "Loading, Please Wait..."
    });
});

