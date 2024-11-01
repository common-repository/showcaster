<?php

namespace SHWPortfolioCatalog\Database\Migrations;

class CreateCatalogProductThumbnailsTable
{
    public static function run()
    {
        global $wpdb;
        $wpdb->query(
            "CREATE TABLE IF NOT EXISTS `" . $wpdb->prefix . "shwcatalogproductthumbnails`(
                `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
                `product_id` int(11) UNSIGNED NULL,
                `image_id` int(11) NULL,
                `ordering` int(11) NULL,
                 FOREIGN KEY (`product_id`) REFERENCES ". $wpdb->prefix . "shwcatalogproducts (id)
                 ON DELETE CASCADE,
                PRIMARY KEY (id)
            ) ENGINE=InnoDB"
        );
//        $result = $wpdb->get_results("SELECT id from " . $wpdb->prefix . "shwcatalogproductthumbnails");
//        if(count($result) == 0) {
//            $wpdb->query("INSERT INTO " . $wpdb->prefix . "shwcatalogproductthumbnails (id, product_id, image_id, ordering)
//             VALUES(1, 1, 1, 1)");
//        }
    }
}