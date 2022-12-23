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
    let imageRight = img.getBoundingClientRect().right;

    let ww = window.innerWidth;

    let stopPoint = ww - (ww - imageLeft);

    console.log(document.querySelector('#dt-pain').width + 'dt-pain container');
    console.log(stopPoint + ' this is x stopPoint', imageLeft + ' = imaageLeft  ');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#dt-pain',
        markers: true,
        start: 'top 60%',
        //end: 'top 30%',
        //toggleClass: { targets: '#dt-pain', className: 'go-do-it' }
      },

    });

    tl.to(bow, {x: imageLeft, duration: 2})
      .to(aft, {rotateX: 180, duration: 0.2})
      .to(aft, {width: 70, duration: 2});


  }, false);

});


const kartinka = document.querySelector('#dt-pain img');
window.addEventListener('resize', function(event) {
  let imageLeft = kartinka.getBoundingClientRect().left;
  let imageRight = kartinka.getBoundingClientRect().right;

  console.log(imageLeft + ' = imageLeft' , imageRight + ' =imageRight');
}, true);
