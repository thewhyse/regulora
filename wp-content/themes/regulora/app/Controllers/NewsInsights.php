<?php

namespace App\Controllers;

use Sober\Controller\Controller;

class NewsInsights extends Controller
{
    public static $postType = 'post';

    public static $acfRelatedPractices  = "related_practices_rpb";
    public static $acfRelatedNews       = "related_news_insights";
    public static $acfRelatedAttorneys  = "key_contacts";
    public static $acfAlternateFeatured = "alternate_featured_image";

    public static $postsPerPage = 9;

    public static $instance;

    public static function setup()
    {
        // Setup instance
        static::$instance = new NewsInsights();
    }

    public static function slugToID( $slug )
    {
        if ( $post = get_page_by_path( $slug, OBJECT, Attorney::$postType ) )
            return $post->ID;
        else
            return 0;
    }

    public static function showNews( $force = false )
    {
        if ( $force ) {
            return true;
        }

        if ( is_search() ) {
            return false;
        }

        if ( get_field( 'show_news_block' ) ) {
            return true;
        }

        if ( is_front_page() ) {
            return false;
        }

        if ( is_singular( Attorney::$postType ) ) {
            return true;
        }

        if ( is_singular( Practices::$postType ) ) {
            return true;
        }

        if ( is_page_template( 'views/template-client-case.blade.php' ) ) {
            return true;
        }
    }

    public static function isRelated()
    {
        if ( is_singular( Attorney::$postType ) ) {
            return get_the_permalink() . 'news/';
        }

        if ( is_singular( Practices::$postType ) ) {
            return get_the_permalink() . 'news/';
        }

        return false;
    }

    public static function blockTitle()
    {
        if ( is_singular( Attorney::$postType ) ) {
            return "Related News & Insights";
        }

        if ( is_singular( Practices::$postType ) ) {
            return "Related News & Insights";
        }

        return "News & Insights";
    }

    public static function posts( int $attorney = null, int $practice = null, $limit = 0,  $filterDisable = false, $withStats = false )
    {
        global $wp_query;
        $paged = get_query_var( 'paged' ) ? get_query_var( 'paged' ) : 1;
//        $filter = get_query_var( 'filter' ) ? get_query_var( 'filter' ) : '';
        $categoryFilter = ! empty( $_GET[ 'category' ] ) && (int) $_GET[ 'category' ] > 0 ? (int) $_GET[ 'category' ] : '';
        $practiceFilter = ! empty( $_GET[ 'practice' ] ) && (int) $_GET[ 'practice' ] > 0 ? (int) $_GET[ 'practice' ] : '';
        $attorneyFilter = !empty($_GET['attorney']) && (int) $_GET['attorney'] > 0 ? (int) $_GET['attorney'] : '';

        $limit = $limit != 0 ? $limit : NewsInsights::$postsPerPage;

        $args = array(
            'posts_per_page'        => $limit,
            'post_type'             => NewsInsights::$postType,
            'post_status'           => 'publish',
            'suppress_filters'      => true,
            'paged'                 => $paged,
//            'category_name'         => $categoryFilter,
            'order'                 => 'DESC',
            'orderby'               => 'date',
            'ignore_sticky_posts'   => true
        );

        if ( is_singular( Attorney::$postType ) ) {
            $attorney = get_the_ID();
        } else if ( get_query_var( 'related-attorney' ) ) {
            $attorney = NewsInsights::slugToID( get_query_var( 'related-attorney' ) );
        }

        if ( is_singular( 'practice' ) ) {
            $practice = get_the_ID();
        }

        if ( $categoryFilter && ! $filterDisable ) {
            $args[ 'cat' ] = $categoryFilter;
        }

        if ($attorneyFilter && ! $filterDisable ) {
            $args[ 'meta_query' ][] = array(
                'key'       => NewsInsights::$acfRelatedAttorneys,
                'value'     => (string) $attorneyFilter,
                'compare'   => 'LIKE'
            );
        }

        if ( $attorney ) {
            $args[ 'meta_query' ][] = array(
                'key'       => NewsInsights::$acfRelatedAttorneys,
                'value'     => (string) $attorney,
                'compare'   => 'LIKE'
            );
        }

        if ( $practiceFilter && ! $filterDisable ) {
            $practice = $practiceFilter;
        }

        if ( $practice ) {
            $args[ 'meta_query' ][] = array(
                'key'       => NewsInsights::$acfRelatedPractices,
                'value'     => '"' . (int) $practice . '"',
                'compare'   => 'LIKE'
            );
        }

        if ( ! empty( $args[ 'meta_query' ] ) ) {
            $args[ 'meta_query' ][ 'relation' ] = 'AND';
        }

        //$posts = get_posts( $args );

        $postsQuery = new \WP_Query( $args );
        NewsInsights::$instance = $postsQuery;

        $news = array_map( function ( $post ) {
            return static::getFormattedData( $post );
        }, $postsQuery->posts );

        if ( $withStats ) {
            return array(
                'news'          => $news,
                'currentPage'   => $paged,
                'showedNum'     => ( $paged * static::$postsPerPage - ( $limit - 1 ) ) . "-" . ( ( $paged * $limit ) <= $postsQuery->found_posts ? $paged * $limit : $postsQuery->found_posts ),
                'totalPosts'    => $postsQuery->found_posts,
            );
        }

        return $news;
    }

    public static function getFormattedData ( $post )
    {
        $image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'thumb-news-preview' );
        $imageX2 = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'thumb-news-preview@x2' );
        $categories = wp_get_post_terms( $post->ID, array( 'category' ));

        return [
            'id' => $post->ID,
            'image' => !empty($image) ? reset( $image ) : get_theme_mod( 'placeholder_image' ),
            'imageX2' => !empty($imageX2) ? reset( $imageX2 ) : get_theme_mod( 'placeholder_image' ),
            'title' => get_the_title( $post->ID ),
            'excerpt' => get_the_excerpt( $post->ID ),
            'terms' => ( !empty( $categories ) ) ? $categories[0] : '',
            'type' => get_post_type( $post->ID ),
            'url' => get_permalink( $post->ID ),
            'authorId' => $post->post_author,
            'date' => get_the_date( 'F j, Y', $post->ID ),
        ];
    }

    public static function getHeroImage( $postID = 0 )
    {
        if ( $postID == 0 ) {
            $postID = get_the_ID();
        }

        $postThumbID = get_post_thumbnail_id( $postID );

        if ( $postThumbID ) {
            $image = wp_get_attachment_image_src( $postThumbID, App::$heroImageSize );
            $imageX2 = wp_get_attachment_image_src( $postThumbID, App::$heroX2ImageSize );
        } else {
            $heroImagePractices = get_field( App::$practicesDefaultImage, 'option' );
            if ( $heroImagePractices ) {
                $image = wp_get_attachment_image_src( $heroImagePractices, App::$heroImageSize );
                $imageX2 = wp_get_attachment_image_src( $heroImagePractices, App::$heroX2ImageSize );
            }
        }

        return array(
            'heroDefaultImage'  => array(
                'x1'    => $image[ 0 ],
                'x2'    => $imageX2[ 0 ],
            ),
        );
    }

    public static function getRelatedPractices( $postID = 0, $title = 'Related Practices' )
    {
        if ( $postID == 0 ) {
            $postID = get_the_ID();
        }

        $practices = get_field( static::$acfRelatedPractices, $postID );
        if ( !empty( $practices ) ) {
            usort( $practices, function ( $a, $b ) {
                return strcmp( $a->post_title, $b->post_title );
            } );
        }

        if ( ! $practices ) {
            return false;
        }

        return array(
            'title' => $title,
            'practices' => $practices,
        );
    }

    public static function getRelatedNews( $postID = 0, $title = 'Related Wins & Insights' )
    {
        if ( $postID == 0 ) {
            $postID = get_the_ID();
        }

        $news = get_field( static::$acfRelatedNews, $postID );
//        if ( !empty( $news ) ) {
//            usort( $news, function ( $a, $b ) {
//                return strcmp( $a->post_title, $b->post_title );
//            } );
//        }

        if ( ! $news ) {
            $args = array(
                'posts_per_page'        => 3,
                'post_type'             => NewsInsights::$postType,
                'post_status'           => 'publish',
                'suppress_filters'      => true,
                'order'                 => 'DESC',
                'orderby'               => 'date',
                'ignore_sticky_posts'   => true
            );

            $postsQuery = new \WP_Query( $args );

            if ( $postsQuery->have_posts() ) {
                $news = $postsQuery->posts;
            } else {
                return false;
            }
        }

        $result = array_map( function ( $post ) {
            $image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'thumb-news-preview' );
            $imageX2 = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'thumb-news-preview@x2' );
            $categories = wp_get_post_terms( $post->ID, array( 'category' ));
            // $author = get_field( NewsInsights::$acfAuthorName, $post->ID );

            return [
                'id' => $post->ID,
                'image' => !empty($image) ? reset( $image ) : get_theme_mod( 'placeholder_image' ),
                'imageX2' => !empty($imageX2) ? reset( $imageX2 ) : get_theme_mod( 'placeholder_image' ),
                'title' => get_the_title( $post->ID ),
                'excerpt' => get_the_excerpt( $post->ID ),
                'terms' => ( !empty( $categories ) ) ? $categories[0] : '',
                'type' => get_post_type( $post->ID ),
                'url' => get_permalink( $post->ID ),
                //'author' => $author,
                'authorId' => $post->post_author,
                'date' => get_the_date( 'F j, Y', $post->ID ),
                'useFullWidth' => true,
            ];
        }, $news );

        return array(
            'title' => $title,
            'news'  => $result,
        );
    }

    public static function getFiltersByCategories()
    {
        $categories = get_categories();

        if ( ! $categories ) {
            return false;
        }

        $result = array();
        foreach ( $categories as $category ) {
            $result[ $category->term_id ] = $category->name;
        }

        return $result;
    }

    public static function getFiltersByAttorneys() {
        $news = NewsInsights::posts(NULL, NULL, -1);

        if (!$news) {
            return FALSE;
        }

        $result = [];
        foreach ($news as $item) {
            $attorneys = get_field(NewsInsights::$acfRelatedAttorneys, $item['id']);
            if (!$attorneys) {
                continue;
            }
            foreach ($attorneys as $attorney) {
                $result[$attorney->ID] = $attorney->post_title;
            }
        }

        asort($result);

        return $result;
    }

    public static function getFiltersByPractices()
    {
        $news = NewsInsights::posts( null, null, -1, true );

        if ( ! $news ) {
            return false;
        }

        $result = array();
        foreach ( $news as $newsItem ) {
            $practices = get_field( NewsInsights::$acfRelatedPractices, $newsItem[ 'id' ] );
            if ( ! $practices ) {
                continue;
            }
            foreach ( $practices as $practice ) {
                $result[ $practice->ID ] = $practice->post_title;
            }
        }

        asort( $result );

        return $result;
    }

    public static function getFiltersByAuthors()
    {
        $news = NewsInsights::posts( null, null, -1, true );

        if ( ! $news ) {
            return false;
        }

        $result = array();
        foreach ( $news as $new ) {
            $author = get_field( NewsInsights::$acfAuthorName, $new[ 'id' ] );
            if ( ! $author ) {
                continue;
            }
            $result[ $author ] = $author;
        }

        asort( $result );

        return $result;
    }
}
