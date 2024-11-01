<?php
namespace SHWPortfolioCatalog\Controllers\Frontend;
class WP_Router_Utility {
	const QUERY_VAR = 'WP_Route';
	const PLUGIN_NAME = 'WP Router';
	const DEBUG = FALSE;
	const MIN_PHP_VERSION = '5.2';
	const MIN_WP_VERSION = '3.0';
	const DB_VERSION = 1;
	const PLUGIN_INIT_HOOK = 'wp_router_init';

		public static function plugin_path() {
		return WP_PLUGIN_DIR . '/' . basename( dirname( __FILE__ ) );
	}
	public static function plugin_url() {
		return WP_PLUGIN_URL . '/' . basename( dirname( __FILE__ ) );
	}

	public static function init() {
		do_action(self::PLUGIN_INIT_HOOK);
	}
}
