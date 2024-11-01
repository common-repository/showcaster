<?php

namespace SHWPortfolioCatalog\Controllers\Widgets;

use SHWPortfolioCatalog\Helpers\View;

class CatalogWidgetController extends \WP_Widget
{
    /**
     * Widget constructor.
     */
    public function __construct()
    {
        parent::__construct(
            'SHWGCatalog_Widget',
                __('Showcaster', SHWPORTFOLIOCATALOG_TEXT_DOMAIN),
            array('description' => __('Showcaster', SHWPORTFOLIOCATALOG_TEXT_DOMAIN),)
        );


    }
    public function widget($args, $instance)
    {
        extract($args);

        if (isset($instance['shwcatalog_id']) && (absint($instance['shwcatalog_id']) == $instance['shwcatalog_id'])) {
            $shwcatalog_id = $instance['shwcatalog_id'];

            $title = apply_filters('widget_title', $instance['title']);

            if (!empty($title)) {
                echo $title;
            }

            echo do_shortcode("[showcaster id='{$shwcatalog_id}'");
        } else {
            echo __('Select The Grid to Display', SHWPORTFOLIOCATALOG_TEXT_DOMAIN);
        }
    }
    public function update($new_instance, $old_instance)
    {
        $instance = array();
        $instance['shwcatalog_id'] = strip_tags($new_instance['shwcatalog_id']);
        $instance['title'] = strip_tags($new_instance['title']);

        return $instance;
    }
    public function form($instance)
    {
        $catalogInstance = (isset($instance['shwcatalog_id']) ? $instance['shwcatalog_id'] : 0);
        $title = (isset($instance['title']) ? $instance['title'] : '');

        View::render('admin/Widgets/CatalogWidget.php', array('widget' => $this, 'title' => $title, 'catalogInstance' => $catalogInstance));
    }
}