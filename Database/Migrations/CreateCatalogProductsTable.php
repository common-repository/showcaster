<?php
namespace SHWPortfolioCatalog\Database\Migrations;

class CreateCatalogProductsTable
{
    public static function run()
    {
        global $wpdb;
        $wpdb->query(
            "CREATE TABLE IF NOT EXISTS " . $wpdb->prefix . "shwcatalogproducts(
                `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
                `catalog_id` int(11) UNSIGNED NOT NULL,
                `image_id` int(11) NOT NULL,
                `title` varchar(255) NULL,
                `catalog_title` varchar(255) NULL,
                `description` text,
                `price` varchar(50)  NULL,
                `discount` varchar(50) NULL,
                `visible` int(1) NULL DEFAULT '1',
				`ordering` int(11) NULL,
				`created_date` datetime NULL,
                 FOREIGN KEY (`catalog_id`) REFERENCES ". $wpdb->prefix . "shwcatalogs (id)
                 ON DELETE CASCADE,
                PRIMARY KEY (id)
            ) ENGINE=InnoDB "
        );
//        $result = $wpdb->get_results("SELECT id from " . $wpdb->prefix . "shwcatalogproducts");
//        if(count($result) == 0) {
//            $wpdb->query("INSERT INTO " . $wpdb->prefix . "shwcatalogproducts
//            (id, catalog_id, image_id, title, catalog_title, description, price, discount, visible, ordering, created_date)
//             VALUES(1, 1, 1, 'title', 'catalog products title',  'catalog products description', 'price', 'discount', 'off', 1, '12/12/2')");
//        }
    }
}