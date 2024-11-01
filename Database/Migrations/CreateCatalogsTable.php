<?php

namespace SHWPortfolioCatalog\Database\Migrations;

class CreateCatalogsTable
{
    public static function run()
    {
        global $wpdb;
        $wpdb->query(
            "CREATE TABLE IF NOT EXISTS " . $wpdb->prefix . "shwcatalogs(
                `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
                `name` varchar(255) NULL,
                `description` text,
                `ordering` int(11) NOT NULL,
                `display_type` int(1) NOT NULL DEFAULT 0,
                `view_type` int(1) NOT NULL DEFAULT 0,
                `position` ENUM('center','left','right') DEFAULT 'center',
                `hover_effect` int(1) NOT NULL DEFAULT 0,
                `items_per_page` int(3) NOT NULL DEFAULT 0,
                `custom_css` TEXT,
                `ctime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
                PRIMARY KEY (id)
            ) ENGINE=InnoDB "
        );

        $result = $wpdb->get_results("SELECT id from " . $wpdb->prefix . "shwcatalogs");
        if(count($result) == 0) {
            $wpdb->query("INSERT INTO " . $wpdb->prefix . "shwcatalogs (id, `name`, description, ordering, display_type, view_type, `position`, hover_effect, items_per_page, custom_css, ctime)
              VALUES(1, 'Default Grid', '', 1, '', '','','','','','')");
        }
    }
}