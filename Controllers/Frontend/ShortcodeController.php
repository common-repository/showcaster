<?php

namespace SHWPortfolioCatalog\Controllers\Frontend;

use SHWPortfolioCatalog\Helpers\View;
use SHWPortfolioCatalog\Models\Catalog;
use SHWPortfolioCatalog\Models\Portfolio;

class ShortcodeController
{
	private $type;
	static $catalogId;

	public static function run($attrs)
	{
		$attrs = shortcode_atts(array(
			'id' => false
		), $attrs);

		if (!$attrs['id'] || absint($attrs['id']) != $attrs['id']) {
			throw new \Exception('"id" parameter is required and must be not negative integer.');
		}

		$test = self::show($attrs['id']);
        self::$catalogId = $attrs['id'];
		do_action('shwproductShortcodeScripts', $attrs['id']);

		return $test;
	}

	private static function show($id)
	{
		ob_start();
		$catalog = new Catalog(array('id'=>$id));
		if($catalog->getCatalog()) {
            $postId = get_the_ID();
			View::render( 'frontend/catalog.php', array( 'catalog' => $catalog, 'id' => $id, 'postId'=>$postId) );
		}
		return ob_get_clean();
	}
}