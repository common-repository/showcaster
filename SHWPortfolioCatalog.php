<?phpnamespace SHWPortfolioCatalog;use SHWPortfolioCatalog\Models\Settings;use SHWPortfolioCatalog\Database\Migrations\CreateCatalogProductThumbnailsTable;use SHWPortfolioCatalog\Controllers\Admin\AdminController;use SHWPortfolioCatalog\Controllers\Admin\AdminAssetsController;use SHWPortfolioCatalog\Controllers\Admin\AjaxController as AdminAjax;use SHWPortfolioCatalog\Controllers\Frontend\FrontendController;use SHWPortfolioCatalog\Controllers\Frontend\AjaxController as FrontAjax;if (!defined('ABSPATH')) {	exit();}if (!class_exists('SHWPortfolioCatalog')) :	class SHWPortfolioCatalog	{		public $version = "1.0.5";		public $admin;		private $migrationClasses;		public $settings;		public $portfolioCatalogInfo;		protected static $_instance = null;		public static function instance() {			if (is_null(self::$_instance)) {				self::$_instance = new self();			}			return self::$_instance;		}		private function __construct()		{			ob_start();			$this->constants();			$this->migrationClasses = array(				'SHWPortfolioCatalog\Database\Migrations\CreateCatalogsTable',				'SHWPortfolioCatalog\Database\Migrations\CreateAttributesTable',                'SHWPortfolioCatalog\Database\Migrations\CreateCategoriesTable',                'SHWPortfolioCatalog\Database\Migrations\CreateThemesTable',                'SHWPortfolioCatalog\Database\Migrations\CreateCatalogProductsTable',				'SHWPortfolioCatalog\Database\Migrations\CreateCatalogProductAttributes',				'SHWPortfolioCatalog\Database\Migrations\CreateCatalogProductCategoriesTable',				'SHWPortfolioCatalog\Database\Migrations\CreateCatalogProductOptionsTable',                'SHWPortfolioCatalog\Database\Migrations\CreateCatalogProductThumbnailsTable',				'SHWPortfolioCatalog\Database\Migrations\CreateProductOptionsTable'			);			add_action('init', array($this, 'init'), 0);			add_action( 'widgets_init', array( 'SHWPortfolioCatalog\Controllers\Widgets\WidgetsController', 'init' ) );		}		public function constants()		{			define('SHWPORTFOLIOCATALOG_VERSION', $this->version);			define('SHWPORTFOLIOCATALOG_IMAGES_URL', untrailingslashit($this->pluginUrl()) . '/resources/assets/images/');			define('SHWPORTFOLIOCATALOG_TEXT_DOMAIN', 'SHWPORTFOLIOCATALOG');			define("SHWPORTFOLIOCATALOG_DEBUG_ENABLE", true);			define("SHWPORTFOLIOCATALOG_NAME", 'Name');			define("SHWPORTFOLIOCATALOG_TEXT_DESCRIPTION", 'Description');			define("SHWPORTFOLIOCATALOG_TEXT_TITLE", 'Title');			define("SHWPORTFOLIOCATALOG_TEXT_BULK_ACTION", 'Bulk Actions');			define("SHWPORTFOLIOCATALOG_TEXT_SELECT_ALL", 'Select All');			define("SHWPORTFOLIOCATALOG_EDIT", 'EDIT');			define("SHWPORTFOLIOCATALOG_TEXT_DELETE", 'Delete');		}		public function init(){			$this->checkVersion();			if (defined('DOING_AJAX')) {				AdminAjax::init();				FrontAjax::init();				ob_end_flush();			}			if (is_admin()) {				$this->admin = new AdminController();				AdminAssetsController::init();			} else {				new FrontendController();			}		}		public function checkVersion()		{			if (get_option('shwportfoliocatalog_version') !== $this->version) {				$this->runMigrations();				update_option('shwportfoliocatalog_version', $this->version);			}			update_option('shwportfoliocatalog_version', $this->version);		}		private function runMigrations()		{			if (empty($this->migrationClasses)) {				return;			}			foreach ($this->migrationClasses as $className) {				if (method_exists($className, 'run')) {					call_user_func(array($className, 'run'));				} else {					throw new \Exception('Specified migration class ' . $className . ' does not have "run" method');				}			}		}		/**		 * @return string		 */		public function viewPath(){			return apply_filters('shwportfoliocatalog_view_path', 'SHWPortfolioCatalog/');		}		/**		 * @return string		 */		public function pluginPath() {			return plugin_dir_path(__FILE__);		}		/**		 * @return string		 */		public function pluginUrl(){			return plugins_url('', __FILE__);		}		public function ajaxUrl() {			return admin_url('admin-ajax.php');		}        public static function uploadRemoteImages($filename, $url) {            $uploaddir = wp_upload_dir();            $uploadfile = $uploaddir['path'] . '/' . $filename;            $contents = file_get_contents($url);            $savefile = fopen($uploadfile, 'w');            fwrite($savefile, $contents);            fclose($savefile);            $wp_filetype = wp_check_filetype(basename($filename), null );            $attachment = array(                'guid'=> $uploaddir['url'] . '/' . basename( $filename ),                'post_mime_type' => $wp_filetype['type'],                'post_title' => preg_replace('/\.[^.]+$/', '', $filename),                'post_content' => '',                'post_status' => 'inherit'            );            $attach_id = wp_insert_attachment( $attachment, $uploadfile );            $imagenew = get_post( $attach_id );            $fullsizepath = get_attached_file( $imagenew->ID );            $attach_data = wp_generate_attachment_metadata( $attach_id, $fullsizepath );            wp_update_attachment_metadata( $attach_id, $attach_data );            return $attach_id;        }	}endif;