// wait until DOM is ready
document.addEventListener('DOMContentLoaded', function(event){

  console.log('DOM loaded', event);

  //wait until images, links, fonts, stylesheets, and js is loaded
  window.addEventListener('load', function(e){

    //custom GSAP code goes here

    gsap.registerPlugin(ScrollTrigger);

    const img = document.querySelector('#dt-pain img'),
      bow = document.querySelector('#dt-pain .bow'),
      aft = document.querySelector('#dt-pain .aft'),
      downw = document.querySelector('#dt-pain .downw');

    let imageLeft = img.getBoundingClientRect().left;

    let ww = window.innerWidth;

    let stopPoint = ww - imageLeft;
    console.log(stopPoint);

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