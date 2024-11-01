<?php

namespace SHWPortfolioCatalog\Database\Migrations;

class CreateCatalogProductAttributes
{
    public static function run()
    {
        global $wpdb;
        $wpdb->query(
            "CREATE TABLE IF NOT EXISTS " . $wpdb->prefix . "shwcatalogproductattributes(
                  `id` int(50) NOT NULL AUTO_INCREMENT,
                  `product_id` int(11) NOT NULL,
                  `attribute_id` int(11) NOT NULL,
                  `value` varchar(200) NOT NULL,
                  `is_visible` varchar(10) NOT NULL,
                 PRIMARY KEY (id)
            ) ENGINE=InnoDB "
        );

        $result = $wpdb->get_results("SELECT id from " . $wpdb->prefix . "shwcatalogproductattributes");
        if(count($result) == 0) {
            $wpdb->query("INSERT INTO " . $wpdb->prefix . "shwcatalogproductattributes 
            (id, product_id, attribute_id, `value`, is_visible) 
             VALUES (1, 1, 1, 'Value 1', true),
                    (2, 1, 1, 'Value 2', true),
                    (3, 1, 1, 'Value 3', true)");
        }
    }
}