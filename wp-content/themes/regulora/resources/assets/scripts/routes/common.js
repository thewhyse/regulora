/* eslint-disable */
import {init as faqInit} from "../components/faq";
// import {ScrollSpy, Collapse} from "bootstrap";

export default {
  init() {
    // JavaScript to be fired on all pages
    /**
     * Modernizr custom tests
     */
    Modernizr.addTest('IE', function() {
      return window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
    });
    Modernizr.addTest('has-scroll', function() {
      return window.innerHeight < document.body.scrollHeight;
    });
  },
  finalize() {
    // JavaScript to be fired on all pages, after page specific JS is fired
    faqInit();
    
    // ScrollSpy Color Change
    const mainMenu  = document.getElementById( 'navPrimaryMenu' );
    const lightBG   = 'bg-light';
    const darkBG    = 'bg-dark';
    const linkClass = 'nav-link';
    const colorAssoc = {};
    colorAssoc[ lightBG ] = 'dark-color';
    colorAssoc[ darkBG ]  = 'light-color';
    
    window.addEventListener( 'activate.bs.scrollspy', function ( e ) {
      if ( window.innerWidth >= 992 ) {
        let targetBlock = mainMenu.querySelector( '.' + linkClass + '.active' ).getAttribute( 'href' );
        if ( targetBlock && ( targetBlock.indexOf( '#' ) > -1 ) && document.querySelector( targetBlock ) ) {
          mainMenu.querySelector( '.nav' ).classList.remove( colorAssoc[lightBG], colorAssoc[darkBG] );
          
          let targetBG = document.querySelector( targetBlock ).classList;
          for ( let i = 0; i < targetBG.length; i++ ) {
            if ( colorAssoc[ targetBG[ i ] ] ) {
              mainMenu.querySelector( '.nav' ).classList.add( colorAssoc[ targetBG[ i ] ] );
            }
          }
          
          let parentItem = mainMenu.querySelector( '.' + linkClass + '.active' ).closest( 'li' );
          if ( parentItem.classList.contains( 'd-none' ) ) {
            let sibling = parentItem.previousElementSibling;
            console.log(sibling);
            sibling.querySelector( 'a' ).classList.add( 'active' );
          }
        }
      }
    } )
  },
};
