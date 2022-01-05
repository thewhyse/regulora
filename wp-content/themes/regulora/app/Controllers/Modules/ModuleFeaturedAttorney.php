<?php

namespace App\Controllers\Modules;

use App\Controllers\App;
use App\Controllers\Attorney;

/**
 * Trait ModuleTestimonials
 * @package App\Controllers\Modules
 */

trait ModuleFeaturedAttorney
{
    /**
     * Class config
    */
    public static $countTM       = 1;
    public static $getRandomTM   = true;

    // Block settings
    public static $blockType = 'random-attorney';

    // Post type variables
    //protected static $postType = 'team';
    public static $acfRotateOnBlock = 'featured_on_homepage';
    public static $acfImageForBlock = 'homepage_featured_image';

    // Default module template
    public static $testimonialsModuleTemplate = 'modules.module-featured-attorney';

    /**
     * ACF fields
     */
    public static $acfTestimonialAuthor = 'testimonial_author';
    public static $acfTestimonialText   = 'testimonial_text';

    /**
     * Setup trait
     */
    public static function traitSetup()
    {
        add_action( 'acf/init', [ static::class, 'gutenbergBlockInit' ] );

        // Getting Attorney Data for Frontpage
        add_action( 'wp_ajax_ajaxGetAttorney', static::class . '::randomAttorneyAjax' );
        add_action( 'wp_ajax_nopriv_ajaxGetAttorney', static::class . '::randomAttorneyAjax' );
    }

    public static function gutenbergBlockInit()
    {
        // Check function exists.
        if( function_exists('acf_register_block_type') ) {

            // Register a testimonial block.
            acf_register_block_type( array(
                'name'              => static::$blockType,
                'title'             => __( 'Featured Attorney' ),
                'description'       => __( 'Show block with random attorney' ),
                'keywords'          => array( 'attorney', 'random', 'featured' ),
                'icon'              => '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="address-card" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-address-card fa-w-18 fa-2x"><path fill="currentColor" d="M528 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm0 400H48V80h480v352zM208 256c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm-89.6 128h179.2c12.4 0 22.4-8.6 22.4-19.2v-19.2c0-31.8-30.1-57.6-67.2-57.6-10.8 0-18.7 8-44.8 8-26.9 0-33.4-8-44.8-8-37.1 0-67.2 25.8-67.2 57.6v19.2c0 10.6 10 19.2 22.4 19.2zM360 320h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8zm0-64h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8zm0-64h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8z" class=""></path></svg>',
                'align'             => 'full',
                'render_callback'   => [ static::class, 'renderBlock' ],
                'category'          => 'common',
                'enqueue_script'    => get_stylesheet_directory_uri() . '/assets/scripts/blocks/random-attorney.js',
                'supports'          => array(
                    'align'             => array( 'left', 'wide', 'full' ),
                    'align_content'     => true,
                    'full_height'       => true,
                    'mode'              => false,
                    'multiple'          => true,
                ),
            ) );
        }
    }

    public static function renderBlock( $block, $content = '', $is_preview = false, $post_id = 0 )
    {
        // Create id attribute allowing for custom "anchor" value.
        $id = 'featured-attorney-' . $block[ 'id' ];
        if( !empty( $block[ 'anchor' ] ) ) {
            $id = $block[ 'anchor' ];
        }

        // Create class attribute allowing for custom "className" and "align" values.
        $className = 'featured-attorney';
        if( !empty( $block[ 'className' ] ) ) {
            $className .= ' ' . $block['className'];
        }
        if( !empty($block['align']) ) {
            $className .= ' align' . $block[ 'align' ];
        }
        ?>
        <div id="<?php echo esc_attr($id); ?>" class="<?php echo esc_attr($className); ?> wp-block-media-text is-stacked-on-mobile is-vertically-aligned-center">
            <figure class="block-attorney-image wp-block-media-text__media"></figure>
            <div class="info wp-block-media-text__content">
                <h4 class="block-attorney-position text-gray">Associate</h4>
                <h1 class="block-attorney-name"></h1>
                <p class="block-attorney-descr has-bigger-font-size"></p>
                <div class="wp-block-buttons">
                    <div class="wp-block-button is-style-link-with-arrow"><a class="block-attorney-link wp-block-button__link" href=""></a></div>
                </div>
            </div>
        </div>

        <?php
    }

    public static function getRandomAttorneyForBlock()
    {
        $args = array(
            'posts_per_page'        => static::$countTM,
            'meta_query'            => array(
                'relation'              => 'AND',
                array(
                    'key'       => static::$acfRotateOnBlock,
                    'value'     => 1,
                ),
                array(
                    'key'       => static::$acfImageForBlock,
                    'value'     => 0,
                    'compare'   => '>'
                ),
            ),
            'post_type'             => static::$postType,
            'post_status'           => 'publish',
            'suppress_filters'      => true,
            'ignore_sticky_posts'   => true,
            'order'                 => 'ASC'
        );

        if ( static::$getRandomTM ) {
            $args[ 'orderby' ] = 'rand';
        }

        $posts = new \WP_Query( $args );

        if ( $posts->post ) {
            $post = $posts->post;
            $image = wp_get_attachment_image( get_post_thumbnail_id( $post->ID ), 'full', false, [ 'loading' => 'eager' ] );
            $imageWebp = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'large'/*'attorney'*/ );
            if ( $imageWebp ) {
                $imageWebp = App::webpConvert( $imageWebp[0] );
                $imageWebp = "<img src='{$imageWebp}' class='attachment-full size-full' alt>";
            }
            $imageBG = '';
            if ( $bgID = get_field( static::$acfImageForBlock, $post->ID ) ) {
                $bgID = $bgID[ 'ID' ];
                $imageBG = wp_get_attachment_image_src( $bgID, 'background-fullwidth' );
                $imageBGx2 = wp_get_attachment_image_src( $bgID, 'background-fullwidth@x2' );
                if ( !empty( $imageBGx2 ) ) {
                    $imageBGx2webp = App::webpConvert( $imageBGx2[0] );
                }
                if ( !empty( $imageBG ) ) {
                    $imageBGwebp = App::webpConvert( $imageBG[0] );
                }
            }
//            $practices = get_field( Attorney::$acfRelatedPractices, $post->ID );
//            $practicesArray = array();
//            if ( $practices ) {
//                foreach ( $practices as $practice ) {
//                    $practicesArray[] = array(
//                        'title' => $practice->post_title,
//                        'link'  => get_the_permalink( $practice->ID ),
//                    );
//                }
//            }
            return array(
                'id'            => $post->ID,
                'image'         => ! empty( $image ) ? $image : "",
                'imageWebp'     => ! empty( $imageWebp ) ? $imageWebp : "",
                'imageBG'       => ! empty( $imageBG ) ? $imageBG : "",
                'imageBGx2'     => ! empty( $imageBGx2 ) ? $imageBGx2 : "",
                'imageBGwebp'   => ! empty( $imageBGwebp ) ? $imageBGwebp : "",
                'imageBGx2webp' => ! empty( $imageBGx2webp ) ? $imageBGx2webp : "",
                'title'         => get_the_title( $post->ID ),
                'descr'         => strip_tags( get_field( Attorney::$acfShortDescription, $post->ID ) ),
//                'practices'     => $practicesArray,
                'url'           => get_permalink( $post->ID ),
            );
        }

        return false;
    }

    public static function randomAttorneyAjax()
    {
        echo json_encode( static::getRandomAttorneyForBlock() );
        wp_die( '', '', ['response' => 200] );
    }
}
