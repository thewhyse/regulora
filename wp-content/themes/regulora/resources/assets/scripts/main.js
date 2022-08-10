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
// import $ from 'jquery';

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


// Footer menu links
$('#menu-footer-menu-1 li a').each(function () {
  $(this).attr('target', '_blank');
});