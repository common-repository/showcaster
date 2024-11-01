<?php

namespace SHWPortfolioCatalog\Database\Migrations;

class CreateAttributesTable
{
    public static function run()
    {
        global $wpdb;

        $wpdb->query(
            "CREATE TABLE IF NOT EXISTS " . $wpdb->prefix . "shwattributes(
                `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
                `catalog_id` int(11) UNSIGNED NOT NULL,
                `title` varchar(255) NULL,
                `ordering` int(11) NULL,
                 FOREIGN KEY (`catalog_id`) REFERENCES ". $wpdb->prefix . "shwcatalogs (id)
                 ON DELETE CASCADE,
                 PRIMARY KEY (id)
            ) ENGINE=InnoDB "
        );

        $result = $wpdb->get_results("SELECT id from " . $wpdb->prefix . "shwattributes");
        if(count($result) == 0) {
            $wpdb->query("INSERT INTO " . $wpdb->prefix . "shwattributes (id, catalog_id, title, ordering) 
             VALUES (1, 1, 'Attribute 1', 1),
                    (2, 1, 'Attribute 2', 2),
                    (3, 1, 'Attribute 3', 3);");
        }
    }
}