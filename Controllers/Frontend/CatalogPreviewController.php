<?php
namespace SHWPortfolioCatalog\Controllers\Frontend;

use SHWPortfolioCatalog\Models\Catalog;

class CatalogPreviewController
{
	/**
	 * Catalog ID
	 *
	 * @var int
	 */
	private $catalog;

	/***
	 * @param
	 *
	 */
	public function __construct()
	{
		if (!isset($_GET['shwcatalog_preview'])) return;

		$this->catalog = intval($_GET['shwcatalog_preview']);

		add_filter('the_title', array($this, 'theTitle'));
		add_filter('the_content', array($this, 'theContent'), 9001);
		add_filter('template_include', array($this, 'templateInclude'));
		add_action('pre_get_posts', array($this, 'preGetPosts'));
	}

	/**
	 * @return string
	 */
	public function theTitle($title)
	{
		if (!in_the_loop()) return $title;

		$catalog = new Catalog(array('id' => $this->catalog));
		$title = $catalog->getName();

		return $title . " " . __('Showcaster Preview', SHWPORTFOLIOCATALOG_TEXT_DOMAIN);
	}

	/**
	 * @return string
	 */
	public function theContent()
	{
		if (!is_user_logged_in()) return __('Log In First In Order to Preview The Grid.', SHWPORTFOLIOCATALOG_TEXT_DOMAIN);

		return do_shortcode("[showcaster  id='{$this->catalog}']");
	}

	public static function previewUrl($catalog, $return_html = true)
	{

		if ($return_html) {
			$html = '<a target="_blank" class="shwcatalog-preview" href="' . home_url() . '/?shwcatalog_preview=' . $catalog . '">' . __('Preview The Grid', SHWPORTFOLIOCATALOG_TEXT_DOMAIN) . '</a>';

			return $html;
		} else {
			return home_url() . '/?shwcatalog_preview=' . $catalog;

		}
	}

	public static function templateInclude()
	{
		 return locate_template(array('page.php', 'single.php', 'index.php'));
	}

	public static function preGetPosts($query)
	{
		$query->set('posts_per_page', 1);
	}
}