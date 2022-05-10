import $ from 'jquery';

wp.customize('blogname', (value) => {
  value.bind(to => $('.brand').text(to));
});


const blank = $('#menu-footer-menu-1 li a');
blank.each(function () {
  $(this).attr('target', '_blank');
});