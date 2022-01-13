<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package WordPress
 * @subpackage Twenty_Twenty_One
 * @since Twenty Twenty-One 1.0
 */

get_header(); ?>

<?php if ( is_home() && ! is_front_page() && ! empty( single_post_title( '', false ) ) ) : ?>
	<header class="page-header alignwide">
	</header><!-- .page-header -->
<?php endif; ?>


  <div class="error_message_container">

    <div class="error_message">
      <h2>NO RESULTS FOUND</h2>
      <div>
        The page you requested could not be found. <br />Try refining your search, or use the navigation above to locate content.
      </div>
    </div>

  </div>


get_footer();
