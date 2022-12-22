// wait until DOM is ready
document.addEventListener('DOMContentLoaded', function(event){

  console.log('DOM loaded', event);

  //wait until images, links, fonts, stylesheets, and js is loaded
  window.addEventListener('load', function(e){

    //custom GSAP code goes here

    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#dt-pain',
        //markers: true,
        start: 'top 60%',
        //end: 'top 30%',
        //toggleClass: { targets: '#dt-pain', className: 'go-do-it' },
        addClass: 'go-do-it',
      },

    });

    console.log('window loaded');
  }, false);

});