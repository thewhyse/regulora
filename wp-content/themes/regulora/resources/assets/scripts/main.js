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

// TODO: Should be removed. You can set the link target in menu editor
// Target Black for footer menu links
// const blank = $('#menu-footer-menu-1 li a');
// blank.each(function () {
//   $(this).attr('target', '_blank');
// });