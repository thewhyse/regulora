<?php

namespace App\Controllers\Modules;

/**
 * Trait ModuleSliderHeader
 * @package App\Controllers\Modules
 * Require:
 *  - tiny-slider JS (https://github.com/ganlanyuan/tiny-slider)
 */

trait ModuleSliderHeader
{
    /**
     * Class config
    */
    public static $singleSLide   = false;
    public static $getRandom     = false;

    // Default module template
    public static $sliderModuleTemplate = 'modules.module-slider-header';

    /**
     * ACF fields
     */
    // Repeater field
    public static $acfHeadSlider    = 'head_slider';

    // Sub-fields of repeater
    public static $acfHSimage       = 'image';
    public static $acfHSheading     = 'heading';
    public static $acfHSsubHeading  = 'sub_heading';
    public static $acfHStextContent = 'text_content';

    // Buttons repeater field
    public static $acfHSbuttons     = 'buttons';

    // Sub-fields of buttons repeater
    public static $acfHSBtitle      = 'button_title';
    public static $acfHSBlink       = 'button_link';

    // Available button types blue|white
    public static $acfHSBtype       = 'button_type';

    /**
     * Setup trait
     */
    public static function traitSetup()
    {
        // Nothing here
    }

    public static function getSlidesData ( int $pageID = NULL )
    {
        // Current page id
        $pageID = $pageID ?? get_the_ID();

        // Get slides of the page
        $slides = get_field( static::$acfHeadSlider );

        if ( ! $slides )
            return false;

        if ( static::$getRandom )
            shuffle( $slides );

        return static::$singleSLide ? array_shift( $slides ) : $slides;
    }

    public static function slideAjaxData ()
    {
        // Use frontpage id if not defined page_id parameter in url
        $pageID = $_GET[ 'page_id' ] ?? get_option( 'page_on_front' );
        echo json_encode( static::getSlidesData( $pageID ) );
        wp_die( '', '', ['response' => 200] );
    }
}
