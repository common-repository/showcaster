<?php

namespace SHWPortfolioCatalog\Database\Migrations;

class CreateCategoriesTable
{
    public static function run()
    {
        global $wpdb;
        $wpdb->query(
            "CREATE TABLE IF NOT EXISTS " . $wpdb->prefix . "shwcategories(
                `id` int(11) UNSIGNED  NOT NULL AUTO_INCREMENT,
                  `title` varchar(255) DEFAULT NULL,
                  `slug` varchar(50) NOT NULL,
                  `parent` varchar(50) NOT NULL,
                  `description` text,
                  `ordering` int(11) NOT NULL,
                PRIMARY KEY (id)
            ) ENGINE=InnoDB "
        );
        $result = $wpdb->get_results("SELECT id from " . $wpdb->prefix . "shwcategories");
        if(count($result) == 0) {
            $wpdb->query("INSERT INTO " . $wpdb->prefix . "shwcategories (id, title, slug, parent, description, ordering) VALUES
                        (1, 'Category 1', '', '0', '', 1),
                        (2, 'Category 2 ', '', '', '', 2),
                        (3, 'Category 3 ', '', '', '', 3)");
        }
    }
}