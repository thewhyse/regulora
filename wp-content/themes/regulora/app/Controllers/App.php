<?php

namespace App\Controllers;

use Sober\Controller\Controller;

class App extends Controller
{
    // Connect modules
    use Helpers\HelperImages,
        Helpers\HelperSettings
    {
        Helpers\HelperImages::traitSetup insteadof Helpers\HelperSettings;
        Helpers\HelperImages::traitSetup as traitSetupHI;
        Helpers\HelperSettings::traitSetup as traitSetupHS;
    }

    public static function setup()
    {
        // Traits setup
        static::traitSetupHI();
        static::traitSetupHS();
    }

    public function siteName()
    {
        return get_bloginfo('name');
    }

    public static function title()
    {
        if (is_home()) {
            if ($home = get_option('page_for_posts', true)) {
                return get_the_title($home);
            }
            return __('Latest Posts', 'sage');
        }
        if (is_archive()) {
            return get_the_archive_title();
        }
        if (is_search()) {
            return sprintf(__('Search Results for %s', 'sage'), get_search_query());
        }
        if (is_404()) {
            return __('Page Not Found', 'sage');
        }
        return get_the_title();
    }

    public static function siteLogo( string $type = NULL ) {
        switch ( $type ) {
            case 'footer' :
                $type = 'footer_logo';
                break;
            default:
                $type = 'custom_logo';
        }

        $logo    = '';
        $logo_id = get_theme_mod( $type );

        if ( $image_data = wp_get_attachment_image_src( $logo_id, 'full' ) ) {
            if ( strpos( $image_data[0], '.svg' ) !== false ) {
                $servPath = realpath( $_SERVER['DOCUMENT_ROOT'] . parse_url( esc_url( $image_data[0] ), PHP_URL_PATH ) );
                $logo     = file_get_contents( $servPath );
            } else {
                $logo = '<img src="' . esc_url( $image_data[0] ) . '" alt="' . get_bloginfo( 'name' ) . '" />';
            }
        }

        return $logo ?: '<h1>' . get_bloginfo( 'name', 'display' ) . '</h1>';
    }

    public static function siteFooterCopyright()
    {
        $copyright = get_theme_mod( 'true_footer_copyright_text' );
        $copyright = str_replace(
            array('%year%'),
            array(date('Y')),
            $copyright
        );
        if ( !empty ( $copyright ) )
            return '<div class="footer-copyright">
                        <p>' . $copyright . '</p>
                    </div>';
    }

    public static function backLink( $link = '', $text = '' )
    {
        $link = ( !empty( $link ) ) ? $link : '#';

        if( is_singular( \Attorney::$postType ) ) {
            $text = "Our Attorneys";
            $link = "/attorneys/";
        }

        if ( is_singular( 'post' ) ) {
            $text = "Wins & Insights";
            $link = "/wins-insights/";
        }

        if( is_singular( 'practice' ) ) {
            $text = "Practices";
            $link = "/our-work/";
        }

        if ( isset( $_GET[ 'destination' ] ) ) {
            $link .= $_GET[ 'destination' ];
        }

        return "<a href='{$link}' class='back-link underlined'><span class='arrow via-border to-left'></span>{$text}</a>";
    }

    public static function dc_pagination( $instance = null )
    {
        global $wp_query;

        if ( empty( $instance ) ) {
            $instance = $wp_query;
        }

        $total = isset( $instance->max_num_pages ) ? $instance->max_num_pages : 1;
        $args = array(
            'show_all'      => false,
            'prev_next'     => true,
            'prev_text'    => '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-left" role="img" alt="Previous page" aria-label="Previous page" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-chevron-left fa-w-10 fa-2x"><path fill="currentColor" d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" class=""></path></svg><span class="meta-nav screen-reader-text">' . __( 'Previous page', 'yourtheme' ) . ' </span>',
            'next_text'    => '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" role="img" alt="Next page" aria-label="Next page" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-chevron-right fa-w-10 fa-2x"><path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" class=""></path></svg><span class="meta-nav screen-reader-text">' . __( 'Next page', 'yourtheme' ) . ' </span>',
            'before_page_number' => '<span class="meta-nav screen-reader-text">' . __( 'Page', 'yourtheme' ) . ' </span>',
            'total'         => $total,
            'mid_size'      => 2,
            'end_size'      => 1,
            'add_args'      => array(),
        );

        if ( $total > 1 ) echo '<nav class="pagination col-auto p-0">';
        echo paginate_links( $args );
        if ( $total > 1 ) echo '</nav>';

    }
}
