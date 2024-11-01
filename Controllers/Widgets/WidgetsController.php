<?php

namespace SHWPortfolioCatalog\Controllers\Widgets;

class WidgetsController
{
    public static function init(){
        register_widget('SHWPortfolioCatalog\Controllers\Widgets\CatalogWidgetController');
    }
}