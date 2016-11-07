# Blanchet House POS Kiosk

I would never submit this as as portfolio piece or anything, but it's kinda nice
knowing what you can throw together with limited technology and very little time.

We wanted to have an iPad running at our pop-up shop to serve as an interactive
brochure, and also a terminal to process payments and purchases via Square. 

This would have been an easy task and a trivial little app to write, but with
no access to a Mac, and no developer account, I was left with Steve Jobs's original
"very sweet solution" for apps on iOS devices: an offline web application. 

After toying around in Angular 2 (which lacked offline support at the time) and 
Ember (not really a fit), I learned about CSS transitions and cobbled together 
what little I'd picked up of JavaScript promises to make a simple animation engine
to drive a static website. 

This is pretty basic, but it works. 
* Page text reads from markdown files and inserts converted text at load time
* Basic interactive sliding tiles
* Link out to the Square register app when people want to buy things

Designed entirely for an iPad being held in landscape orientation, from a page
that's been added to the home screen (removing browser chrome). On any other
platform, in any other configuration, the layout may not be functional. But on
that one, it is. 