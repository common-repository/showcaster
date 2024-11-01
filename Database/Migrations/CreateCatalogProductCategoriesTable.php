<?php
namespace SHWPortfolioCatalog\Database\Migrations;
class CreateCatalogProductCategoriesTable{
    public static function run(){
        global $wpdb;
        $wpdb->query(
            "CREATE TABLE IF NOT EXISTS " . $wpdb->prefix . "shwcatalogproductcategories(
                `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
                `product_id` int(11) UNSIGNED NOT NULL,
                `category_id` int(11) UNSIGNED NOT NULL,
                `is_visible` varchar(11) NOT NULL,
                 FOREIGN KEY (`product_id`) REFERENCES ". $wpdb->prefix . "shwcatalogproducts (id)
                 ON DELETE CASCADE,
                 FOREIGN KEY (`category_id`) REFERENCES ". $wpdb->prefix . "shwcategories (id)
                 ON DELETE CASCADE,
                 PRIMARY KEY (id)
            ) ENGINE=InnoDB "
        );
//        $result = $wpdb->get_results("SELECT id from " . $wpdb->prefix . "shwcatalogproductcategories");
//        if(count($result) == 0) {
//            $wpdb->query("INSERT INTO " . $wpdb->prefix . "shwcatalogproductcategories (id, product_id, category_id, is_visible)
//            VALUES (1, 1, 1, true),
//                   (1, 1, 2, true),
//                   (1, 1, 3, true)");
//        }
    }
}