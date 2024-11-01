<?php

namespace SHWPortfolioCatalog\Controllers\Frontend;

use SHWPortfolioCatalog\Models\Portfolio;
use SHWPortfolioCatalog\Controllers\Frontend\WP_Router_Page;

class FrontendAssetsController
{

	public static function init()
	{
	    $router = new WP_Router();
		remove_filter( 'the_content', 'wpautop' );
		remove_filter( 'the_excerpt', 'wpautop' );

		add_action('shwproductShortcodeScripts', array(__CLASS__, 'addScripts'));
		wp_enqueue_style('shwproductmain', \SHWPortfolioCatalog()->pluginUrl() . '/resources/assets/css/frontend/main.css');
		wp_enqueue_style('shwproductmodal', \SHWPortfolioCatalog()->pluginUrl() . '/resources/assets/css/frontend/modal.css');
		wp_enqueue_style('shwslickcss', \SHWPortfolioCatalog()->pluginUrl() . '/resources/assets/css/frontend/slick.css');
		wp_enqueue_style('shwslicktheme', \SHWPortfolioCatalog()->pluginUrl() . '/resources/assets/css/frontend/slick-theme.css');
	}

	public static function addScripts()
	{

		wp_enqueue_script("shwProductAjax_", \SHWPortfolioCatalog()->pluginUrl() . "/resources/assets/js/frontend/ajax.js", array('jquery'), false, true);
	    wp_enqueue_script( 'masonry', "shwbxslider", \SHWPortfolioCatalog()->pluginUrl() . "/resources/assets/js/frontend/templates/masonry.js");
		wp_enqueue_script( 'elevatezoom', \SHWPortfolioCatalog()->pluginUrl() . '/resources/assets/js/frontend/jquery.elevatezoom.js', array('jquery'), false, true);
		wp_enqueue_script( 'shwcatalogFilterIso', \SHWPortfolioCatalog()->pluginUrl() . '/resources/assets/js/frontend/templates/isotope.pkgd.min.js', array('jquery'), false, true);
		wp_enqueue_script( 'shwcatalogFilter', \SHWPortfolioCatalog()->pluginUrl() . '/resources/assets/js/frontend/templates/filter.js', array('jquery'), false, true);
		wp_enqueue_script('shwproduct_modal', \SHWPortfolioCatalog()->pluginUrl() . '/resources/assets/js/admin/shwproduct_modal.js', array('jquery'), false, true);
		wp_enqueue_script("shwslick", \SHWPortfolioCatalog()->pluginUrl() . "/resources/assets/js/frontend/templates/slick.min.js", array('jquery'), false, true);
		wp_enqueue_script("shwtouchJs", \SHWPortfolioCatalog()->pluginUrl() . "/resources/assets/js/frontend/jquery.touchSwipe.js", array('jquery'), false, true);

		/* Adds */

		wp_enqueue_script("shwModernizer", \SHWPortfolioCatalog()->pluginUrl() . "/resources/assets/js/frontend/templates/modernizer.js", array('jquery'), false, true);


		$productInfo = wp_create_nonce('productInfo');
		wp_localize_script('shwProductAjax_', 'shwProductAjaxObj',
			array(
				'ajaxUrl' => \SHWPortfolioCatalog()->ajaxUrl(),
				'productInfo' => $productInfo
			)
		);

		wp_enqueue_script("shwmainjs", \SHWPortfolioCatalog()->pluginUrl() . "/resources/assets/js/frontend/main.js", array('jquery'), false, true);

		self::localizeScripts();
	}

	public static function localizeScripts() {
		wp_localize_script('shwcatalogunit', 'shwcatalogunit', null);

	}
}