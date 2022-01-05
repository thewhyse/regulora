<?php

namespace App\Controllers\Modules;

/**
 * Trait ModuleTestimonials
 * @package App\Controllers\Modules
 */

trait ModuleTestimonials
{
    /**
     * Class config
    */
    public static $countTM       = 1;
    public static $getRandomTM   = true;

    // Block settings
    public static $blockType = 'random-testimonial';

    // Post type variables
    public static $postType = 'testimonial';
    public static $postSlug = 'testimonials';
    public static $postSupports = array(
        'title',
        'custom-fields',
    );

    // Default module template
    public static $testimonialsModuleTemplate = 'modules.module-testimonials';

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
        register_post_type( static::$postType,
            array(
                'label'              => __( 'Testimonials' ),
                'singular_label'     => __( 'Testimonial', 'sage' ),
                'labels'             => array(
                    'add_new_item' => __( 'Add New Testimonial', 'sage' ),
                ),
                '_builtin'           => false,
                'public'             => true,
                'publicly_queryable' => false,
                'show_ui'            => true,
                'menu_icon'          => 'dashicons-format-chat',
                'menu_position'      => 24,
                'rewrite'            => array(
                    'slug'       => static::$postSlug,
                    'with_front' => false,
                ),
                'show_in_rest'       => true,
                'supports'           => static::$postSupports
            )
        );

        add_action( 'acf/init', [ static::class, 'gutenbergBlockInit' ] );

        // Getting Attorney Data for Frontpage
        add_action( 'wp_ajax_ajaxGetTestimonial', static::class . '::testimonialAjaxData' );
        add_action( 'wp_ajax_nopriv_ajaxGetTestimonial', static::class . '::testimonialAjaxData' );
    }

    public static function gutenbergBlockInit()
    {
        // Check function exists.
        if( function_exists('acf_register_block_type') ) {

            // Register a testimonial block.
            acf_register_block_type( array(
                'name'              => static::$blockType,
                'title'             => __( 'Testimonial' ),
                'description'       => __( 'Show block with random testimonial' ),
                'keywords'          => array( 'testimonial', 'random', 'featured' ),
                'icon'              => '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="comments" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-comments fa-w-18 fa-2x"><path fill="currentColor" d="M532 386.2c27.5-27.1 44-61.1 44-98.2 0-80-76.5-146.1-176.2-157.9C368.3 72.5 294.3 32 208 32 93.1 32 0 103.6 0 192c0 37 16.5 71 44 98.2-15.3 30.7-37.3 54.5-37.7 54.9-6.3 6.7-8.1 16.5-4.4 25 3.6 8.5 12 14 21.2 14 53.5 0 96.7-20.2 125.2-38.8 9.2 2.1 18.7 3.7 28.4 4.9C208.1 407.6 281.8 448 368 448c20.8 0 40.8-2.4 59.8-6.8C456.3 459.7 499.4 480 553 480c9.2 0 17.5-5.5 21.2-14 3.6-8.5 1.9-18.3-4.4-25-.4-.3-22.5-24.1-37.8-54.8zm-392.8-92.3L122.1 305c-14.1 9.1-28.5 16.3-43.1 21.4 2.7-4.7 5.4-9.7 8-14.8l15.5-31.1L77.7 256C64.2 242.6 48 220.7 48 192c0-60.7 73.3-112 160-112s160 51.3 160 112-73.3 112-160 112c-16.5 0-33-1.9-49-5.6l-19.8-4.5zM498.3 352l-24.7 24.4 15.5 31.1c2.6 5.1 5.3 10.1 8 14.8-14.6-5.1-29-12.3-43.1-21.4l-17.1-11.1-19.9 4.6c-16 3.7-32.5 5.6-49 5.6-54 0-102.2-20.1-131.3-49.7C338 339.5 416 272.9 416 192c0-3.4-.4-6.7-.7-10C479.7 196.5 528 238.8 528 288c0 28.7-16.2 50.6-29.7 64z" class=""></path></svg>',
                'align'             => 'full',
                'render_callback'   => [ static::class, 'renderBlock' ],
                'category'          => 'common',
                'enqueue_script'    => get_stylesheet_directory_uri() . '/assets/scripts/blocks/random-testimonial.js',
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
        $id = 'featured-testimonial-' . $block[ 'id' ];
        if( !empty( $block[ 'anchor' ] ) ) {
            $id = $block[ 'anchor' ];
        }

        // Create class attribute allowing for custom "className" and "align" values.
        $className = 'featured-testimonial';
        if( !empty( $block[ 'className' ] ) ) {
            $className .= ' ' . $block['className'];
        }
        if( !empty($block['align']) ) {
            $className .= ' align' . $block[ 'align' ];
        }
        ?>
        <div id="<?php echo esc_attr($id); ?>" class="<?php echo esc_attr($className); ?> wp-block-media-text has-media-on-the-right is-stacked-on-mobile is-vertically-aligned-center">
            <figure class="block-testimonial-image wp-block-media-text__media">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/images/testimonial.jpg">
            </figure>
            <div class="inner-container wp-block-media-text__content">
                <div class="info">
                    <h4 class="block-testimonial-sub text-gray">Testimonial</h4>
                    <h1 class="block-testimonial-title"></h1>
                    <p class="block-testimonial-descr has-bigger-font-size"></p>
                </div>
            </div>
        </div>
        <?php
    }

    public static function getRandomTestimonial ()
    {
        $args = array(
            'posts_per_page'        => static::$countTM,
            'meta_query'            => array(
                'relation'              => 'AND',
                array(
                    'key'       => static::$acfTestimonialAuthor,
                    'compare'   => 'EXISTS',
                ),
                array(
                    'key'       => static::$acfTestimonialText,
                    'compare'   => 'EXISTS'
                ),
            ),
            'post_type'             => static::$postType,
            'post_status'           => 'publish',
            'suppress_filters'      => true,
            'ignore_sticky_posts'   => true,
            'orderby'               => static::$getRandomTM ? 'rand' : 'date',
            'order'                 => 'DESC'
        );

        $posts = new \WP_Query( $args );

        $result = array();
        if ( $posts->post ) {
            $post = $posts->post;

            $result = array(
                'id'        => $post->ID,
                'author'    => get_field( static::$acfTestimonialAuthor, $post->ID ),
                'text'      =>  strip_tags( get_field( static::$acfTestimonialText, $post->ID ) ),
            );
        }

        return $result;
    }

    public static function testimonialAjaxData ()
    {
        echo json_encode( static::getRandomTestimonial() );
        wp_die( '', '', ['response' => 200] );
    }
}
