<?php

namespace SHWPortfolioCatalog\Database\Migrations;

class CreateCatalogProductOptionsTable
{
    public static function run()
    {
        global $wpdb;
        $wpdb->query(
            "CREATE TABLE IF NOT EXISTS ". $wpdb->prefix . "shwcatalogproductoptions(
                `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
                `catalog_id` int(11) UNSIGNED NOT NULL,
                `productoptions_id` int(11) NOT NULL, 
                `value` varchar(500) NOT NULL,
                `theme_id` int (11) UNSIGNED,
                 FOREIGN KEY (`catalog_id`) REFERENCES ". $wpdb->prefix . "shwcatalogs (id)
                 ON DELETE CASCADE,
                 FOREIGN KEY (`theme_id`) REFERENCES ". $wpdb->prefix . "shwthemes (id)
                 ON DELETE CASCADE,
                PRIMARY KEY (id)
            ) ENGINE=InnoDB"
        );
        $result = $wpdb->get_results("SELECT id from " . $wpdb->prefix . "shwcatalogproductoptions");
        if(count($result) == 0) {
            $wpdb->query("INSERT INTO " . $wpdb->prefix . "shwcatalogproductoptions (id, catalog_id, productoptions_id, `value`, theme_id) 
             VALUES (32, 1, 4, 'off', 1),
                    (33, 1, 8, 'off', 1),
                    (34, 1, 5, 'off', 1),
                    (35, 1, 7, 'on', 1),
                    (36, 1, 3, 'on', 1),
                    (37, 1, 2, 'off', 1),
                    (38, 1, 1, '0', 1),
                    (39, 1, 6, 'popup', 1),
                    (40, 1, 10, 'off', 1),
                    (41, 1, 9, 'off', 1);");
        }
    }
}