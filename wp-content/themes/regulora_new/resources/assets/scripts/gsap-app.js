// wait until DOM is ready
document.addEventListener('DOMContentLoaded', function(event){

  //console.log('DOM loaded', event);

  //wait until images, links, fonts, stylesheets, and js is loaded
  window.addEventListener('load', function(e){

    //custom GSAP code goes here

    gsap.registerPlugin(ScrollTrigger);

    const img = document.querySelector('.dt-pain img'),
      bow = document.querySelector('.dt-pain .bow'),
      aft = document.querySelector('.dt-pain .aft'),
      downw = document.querySelector('.dt-pain .downw');

    let imageLeft = img.getBoundingClientRect().left;
    let imageRight = img.getBoundingClientRect().right;

    let ww = window.innerWidth;

    let stopPoint = ww - (ww - imageLeft);

    const pain_container = document.querySelector('.dt-pain');
    let aft_width = (pain_container.offsetWidth - 197) / 2;

    const pain_column = document.querySelector('#pain-column');
    let half_column = pain_column.offsetHeight / 2;

    console.log(aft_width + ' = aft_width');
    console.log(stopPoint + ' this is x stopPoint', imageLeft + ' = imaageLeft  ');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.dt-pain',
        markers: true,
        start: 'top 60%',
        //end: 'top 30%',
        //toggleClass: { targets: '.dt-pain', className: 'go-do-it' }
      },

    });

    tl.to(bow, {x: imageLeft, duration: 1})
      .to(aft, {right: aft_width, x: aft_width + 10, width: aft_width + 10, duration: 1})
      .to(downw, {
        //right: - aft_width,
        bottom: - (half_column - 11),
        height: (half_column -5),
        duration: 2,
      });

    const img_mobi = document.querySelector('.dt-pain-mobi img'),
      bow_mobi = document.querySelector('.dt-pain-mobi .bow'),
      aft_mobi = document.querySelector('.dt-pain-mobi .aft');

    let imageLeft_mobi = img_mobi.getBoundingClientRect().left;

//     let imageRight = img.getBoundingClientRect().right;
//
//     let ww = window.innerWidth;
//
//     let stopPoint = ww - (ww - imageLeft);

    const pain_container_mobi = document.querySelector('.dt-pain-mobi');
    let aft_width_mobi = (pain_container_mobi.offsetWidth - 197) / 2;

    const tl_mobi = gsap.timeline({
      scrollTrigger: {
        trigger: '.dt-pain-mobi',
        markers: true,
        start: 'top 70%',
        end: 'top 45%',
        scrub: true,
      },

    });

    tl_mobi.to(bow_mobi, {x: imageLeft_mobi, duration: 1})
      .to(aft_mobi, {right: aft_width_mobi, x: aft_width_mobi + 10, width: aft_width_mobi + 10, duration: 1});


  }, false);

});

window.addEventListener('resize', function(event) {

  gsap.registerPlugin(ScrollTrigger);

  const img = document.querySelector('.dt-pain img') ||  document.querySelector('.dt-pain-mobi img'),
    bow = document.querySelector('.dt-pain .bow'),
    aft = document.querySelector('.dt-pain .aft'),
    downw = document.querySelector('.dt-pain .downw');

  let imageLeft = img.getBoundingClientRect().left;
  let imageRight = img.getBoundingClientRect().right;

  let ww = window.innerWidth;

  let stopPoint = ww - (ww - imageLeft);

  const pain_container = document.querySelector('.dt-pain');
  let aft_width = (pain_container.offsetWidth - 197) / 2;

  const pain_column = document.querySelector('#pain-column');
  let half_column = pain_column.offsetHeight / 2;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.dt-pain',
      markers: true,
      start: 'top 60%',
    },

  });

  tl.to(bow, {x: imageLeft, duration: 1})
    .to(aft, {right: aft_width, x: aft_width + 10, width: aft_width + 10, duration: 1})
    .to(downw, {
      //right: - aft_width,
      bottom: - (half_column - 11),
      height: (half_column -5),
      duration: 2,
    });

}, true);
