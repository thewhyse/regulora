// wait until DOM is ready
document.addEventListener('DOMContentLoaded', function(){

  //console.log('DOM loaded', event);

  //wait until images, links, fonts, stylesheets, and js is loaded
  window.addEventListener('load', function(){

    //custom GSAP code goes here

    gsap.registerPlugin(ScrollTrigger);

    let deviceW = window.innerWidth;

    // HOME PAGE
    // const img = document.querySelector('.dt-pain img'),
    const bow = document.querySelector('.dt-pain .bow'),
      aft = document.querySelector('.dt-pain .aft'),
      downw = document.querySelector('.dt-pain .downw');

    let img = document.querySelector('.dt-pain img');

    const pain_container = document.querySelector('.dt-pain');
    const pain_column = document.querySelector('#pain-column');

    let imageLeft, aft_width, half_column;

    if (typeof img === 'object' && img !== null && 'getBoundingClientRect' in img) {
      imageLeft = img.getBoundingClientRect().left;
      aft_width = (pain_container.offsetWidth - 197) / 2;
      half_column = pain_column.offsetHeight / 2;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.dt-pain',
          // markers: true,
          start: 'top 80%',
        },

      });

      tl.to(bow, {x: imageLeft + 2, duration: 0.5})
        .to(aft, {right: aft_width, x: aft_width + 10, width: aft_width + 10, duration: 0.5})
        .to(downw, {
          bottom: - (half_column - 11),
          height: (half_column -5),
          duration: 1,
        });


    } else {
      return;
    }

    // const tl = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: '.dt-pain',
    //     // markers: true,
    //     start: 'top 80%',
    //   },
    //
    // });
    //
    // tl.to(bow, {x: imageLeft + 2, duration: 0.5})
    //   .to(aft, {right: aft_width, x: aft_width + 10, width: aft_width + 10, duration: 0.5})
    //   .to(downw, {
    //     bottom: - (half_column - 11),
    //     height: (half_column -5),
    //     duration: 1,
    //   });

    // HP MOBILE
    const img_mobi = document.querySelector('.dt-pain-mobi img'),
      bow_mobi = document.querySelector('.dt-pain-mobi .bow'),
      aft_mobi = document.querySelector('.dt-pain-mobi .aft');

    let imageLeft_mobi;

    if (typeof img_mobi === 'object' && img_mobi !== null && 'getBoundingClientRect' in img_mobi) {
      imageLeft_mobi = img_mobi.getBoundingClientRect().left;
    } else {
      return;
    }

    const pain_container_mobi = document.querySelector('.dt-pain-mobi');
    const aft_width_mobi = (pain_container_mobi.offsetWidth - 197) / 2;

    const tl_mobi = gsap.timeline({
      scrollTrigger: {
        trigger: '.dt-pain-mobi',
        // markers: true,
        start: 'top 85%',
      },

    });

    tl_mobi.to(bow_mobi, {x: imageLeft_mobi, duration: 1})
      .to(aft_mobi, {right: aft_width_mobi, x: aft_width_mobi + 10, width: aft_width_mobi + 10, duration: 0.5});
    // END HOME PAGE

    /*    BRAIN-GUT CONNECTION   MOBILE   */

    const imgContainer = document.querySelector('#ten-15-years-mobi');
    let  left_line;
    let  right_line;
    let imgContainerBox;
    if(typeof imgContainer === 'object' && imgContainer !== null && 'getBoundingClientRect' in imgContainer) {
      imgContainerBox = imgContainer.getBoundingClientRect();
      left_line = document.querySelector('#ten-15-years-mobi .lft-line');
      right_line = document.querySelector('#ten-15-years-mobi .rt-line');
    } else {
      return;
    }
    const tl_bgc_mobi = gsap.timeline({
      scrollTrigger: {
        trigger: imgContainer,
        // markers: true,
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
    let leftL;
    let rightL;
    let downL;
    let percentImgContainer;

    if(typeof percentImg === 'object' && 'getBoundingClientRect' in percentImg) {
      percentImgContainer = percentImg.getBoundingClientRect();
        leftL = document.querySelector('#bgc-10-15 .lft-line');
        rightL = document.querySelector('#bgc-10-15 .rt-line');
        downL = document.querySelector('#bgc-10-15 .downL');

        console.log(percentImgContainer);

    } else {
      return;
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
      x: percentImgContainer.left,
        duration: 1,
    })
      .to(rightL, {
        width: 200,
        duration: 1,
      })
    .to(downL, {
      height: 200,
      duration: 1,
    });


  }, false);

});

window.addEventListener('resize', function(event) {

  gsap.registerPlugin(ScrollTrigger);

  // HOME PAGE
  const bow = document.querySelector('.dt-pain .bow'),
    aft = document.querySelector('.dt-pain .aft'),
    downw = document.querySelector('.dt-pain .downw');

  let img = document.querySelector('.dt-pain img');

  const pain_container = document.querySelector('.dt-pain');
  const pain_column = document.querySelector('#pain-column');

  let imageLeft, aft_width, half_column;

  if (typeof img === 'object' && img !== null && 'getBoundingClientRect' in img) {
    imageLeft = img.getBoundingClientRect().left;
    aft_width = (pain_container.offsetWidth - 197) / 2;
    half_column = pain_column.offsetHeight / 2;
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.dt-pain',
      // markers: true,
      start: 'top 60%',
    },

  });

  tl.to(bow, {x: imageLeft + 2, duration: 1})
    .to(aft, {right: aft_width, x: aft_width + 10, width: aft_width + 10, duration: 1})
    .to(downw, {
      bottom: - (half_column - 11),
      height: (half_column -5),
      duration: 2,
    });

  // END HOME PAGE

}, true);
