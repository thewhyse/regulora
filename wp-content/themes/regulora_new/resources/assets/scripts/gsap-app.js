// wait until DOM is ready
document.addEventListener('DOMContentLoaded', function(event){

  //console.log('DOM loaded', event);

  //wait until images, links, fonts, stylesheets, and js is loaded
  window.addEventListener('load', function(e){

    //custom GSAP code goes here

    gsap.registerPlugin(ScrollTrigger);

    let deviceW = window.innerWidth;

/*
    const img = document.querySelector('.dt-pain img'),
      bow = document.querySelector('.dt-pain .bow'),
      aft = document.querySelector('.dt-pain .aft'),
      downw = document.querySelector('.dt-pain .downw');

    let imageLeft;
    if(typeof img !== 'undefined') {
      imageLeft = img.getBoundingClientRect().left;
    }

    //let imageLeft = img.getBoundingClientRect().left;
    //let imageRight = img.getBoundingClientRect().right;

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
      },

    });

    tl.to(bow, {x: imageLeft, duration: 1})
      .to(aft, {right: aft_width, x: aft_width + 10, width: aft_width + 10, duration: 1})
      .to(downw, {
        bottom: - (half_column - 11),
        height: (half_column -5),
        duration: 2,
      });

    const img_mobi = document.querySelector('.dt-pain-mobi img'),
      bow_mobi = document.querySelector('.dt-pain-mobi .bow'),
      aft_mobi = document.querySelector('.dt-pain-mobi .aft');

    let imageLeft_mobi = img_mobi.getBoundingClientRect().left;

    const pain_container_mobi = document.querySelector('.dt-pain-mobi');
    let aft_width_mobi = (pain_container_mobi.offsetWidth - 197) / 2;

    const tl_mobi = gsap.timeline({
      scrollTrigger: {
        trigger: '.dt-pain-mobi',
        markers: true,
        start: 'top 85%',
      },

    });

    tl_mobi.to(bow_mobi, {x: imageLeft_mobi, duration: 1})
      .to(aft_mobi, {right: aft_width_mobi, x: aft_width_mobi + 10, width: aft_width_mobi + 10, duration: 0.5});
*/

    /*    BRAIN-GUT CONNECTION   MOBILE   */

    const imgContainer = document.querySelector('#ten-15-years-mobi');
    let  left_line;
    let  right_line;
    let imgContainerBox;
    if(typeof imgContainer === 'object' && imgContainer !== null && 'getBoundingClientRect' in imgContainer) {
      imgContainerBox = imgContainer.getBoundingClientRect();
      left_line = document.querySelector('#ten-15-years-mobi .lft-line');
      right_line = document.querySelector('#ten-15-years-mobi .rt-line');
    }
    const tl_bgc_mobi = gsap.timeline({
      scrollTrigger: {
        trigger: imgContainer,
        markers: true,
        start: 'top 85%',
      },
    });

    tl_bgc_mobi
      .to(left_line, {
      x: imgContainerBox.width - imgContainerBox.left + 8,
      duration: 1,
    })
      .to(right_line, {
        width: (deviceW - imgContainerBox.width) - imgContainerBox.left,
        duration: 1,
      });

    /*    BRAIN-GUT CONNECTION   DESKTOP   */
    const percentImg = document.querySelector('#bgc-10-15');
    let   leftL, rightL, downL;
    let percentImgContainer;

    if(typeof percentImg === 'object' && percentImg !== null && 'getBoundingClientRect' in percentImg) {
      percentImgContainer = percentImg.getBoundingClientRect();
        leftL = document.querySelector('#bgc-10-15 .lft-line'),
        rightL = document.querySelector('#bgc-10-15 .rt-line'),
        downL = document.querySelector('#bgc-10-15 .downL');
    }

    const tl_bgc_desktop = gsap.timeline({
      scrollTrigger: {
        trigger: percentImgContainer,
        markers: true,
        start: 'top 60%',
      },
    });

    tl_bgc_desktop
      .to(leftL, {

    })
      .to(rightL, {

      })
    .to(downL, {

    });


  }, false);

});

window.addEventListener('resize', function(event) {

  gsap.registerPlugin(ScrollTrigger);

  // HOME PAGE
  const img = document.querySelector('.dt-pain img') ||  document.querySelector('.dt-pain-mobi img'),
    bow = document.querySelector('.dt-pain .bow'),
    aft = document.querySelector('.dt-pain .aft'),
    downw = document.querySelector('.dt-pain .downw');

  let imageLeft;
  if (typeof img === 'object' && img !== null && 'getBoundingClientRect' in img) {
    imageLeft = img.getBoundingClientRect();
  }

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
      bottom: - (half_column - 11),
      height: (half_column -5),
      duration: 2,
    });
  // END HOME PAGE

}, true);
