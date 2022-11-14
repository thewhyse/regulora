// import external dependencies
import 'jquery';

// Import everything from autoload
import './autoload/**/*'
import './util/modernizr'

// import local dependencies
import Router from './util/Router';
import common from './routes/common';
import home from './routes/home';
import aboutUs from './routes/about';

/** Populate Router instance with DOM routes */
const routes = new Router({
  // All pages
  common,
  // Home page
  home,
  // About Us page, note the change from about-us to aboutUs.
  aboutUs,
});

// Load Events
jQuery(document).ready(() => routes.loadEvents());

/*
const preloadLink = document.createElement('link');
preloadLink.href = '/wp-content/themes/regulora_new/dist/styles/main_*.css';
preloadLink.rel = 'preload';
preloadLink.as = 'script';
document.head.appendChild(preloadLink);

const preloadedScript = document.createElement('script');
preloadedScript.src = '/wp-content/themes/regulora_new/dist/styles/main_*.css';
document.body.appendChild(preloadedScript);
*/
