<?php

namespace SHWPortfolioCatalog\Database\Migrations;

class CreateProductOptionsTable
{
    public static function run()
    {
        global $wpdb;
        $wpdb->query(
            "CREATE TABLE IF NOT EXISTS " . $wpdb->prefix . "shwproductoptions(
                `id` int(11) UNSIGNED NOT NULL,
                `option_name` varchar(255) NULL,            
                PRIMARY KEY (id)
            ) ENGINE=InnoDB "
        );
        $result = $wpdb->get_results("SELECT id from " . $wpdb->prefix . "shwproductoptions");
        if(count($result) == 0) {
            $wpdb->query("INSERT INTO " . $wpdb->prefix . "shwproductoptions (id, option_name) VALUES
                                    (4, 'productEnableCategoriesFilter'),
                                    (8, 'productEnableLightbox'),
                                    (5, 'productEnableOrderingButtons'),
                                    (7, 'productEnableZoom'),
                                    (3, 'productOptionsactivateLoadMore'),
                                    (2, 'productOptionsEnableSearch'),
                                    (1, 'productOptionTheme'),
                                    (6, 'productPopup'),
                                    (10, 'productShowAttributes'),
                                    (9, 'productShowCategories')");
        }
    }
}