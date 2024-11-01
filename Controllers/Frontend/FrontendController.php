<?php
namespace SHWPortfolioCatalog\Controllers\Frontend;
use SHWPortfolioCatalog\Controllers\Frontend\WP_Router;
use SHWPortfolioCatalog\Controllers\Frontend\WP_Route;
use SHWPortfolioCatalog\Controllers\Frontend\WP_Router_Page;
use SHWPortfolioCatalog\Models\Catalog;
class FrontendController
{
	public function __construct() {
		add_shortcode('showcaster', array('SHWPortfolioCatalog\Controllers\Frontend\ShortcodeController', 'run'));
        add_action('wp_router_generate_routes', array($this, 'generate_routes'));
		FrontendAssetsController::init();
        new CatalogPreviewController();
        WP_Router_Page::init();
	}
	public static function generate_routes(WP_Router $router) {

            if ($_GET) {
	            //echo "brr 15 Get </br>";
	            FrontendController::permalinkPlain($_SERVER['REQUEST_URI']);
            }else {
	            $posts = get_posts(array(
		            'post_type' => array( 'page', 'post' ),
		            'posts_per_page' => 100,
		            'post_status' => 'publish'
	            ));
	            foreach ($posts as $key=>$post) {


		            $curPostID=$post->ID;
		            $permalink_structure = explode(home_url() . "/", get_permalink($curPostID))[1];
		            if (substr($permalink_structure, -1) != '/') {$permalink_structure.'/';}

			        $path = '^' . $permalink_structure . 'catalog/(.*?)$';

		            $id = rand(1, mt_getrandmax());
		            $router->add_route('wp-router-sample' . $id, array(
			            'path' => $path,
			            'query_vars' => array(
				            'sample_argument' => 1
			            ),
			            'page_callback' => array(get_class(), 'sample_callback'),
			            'page_arguments' => array('sample_argument'),
			            'access_callback' => TRUE
		            ));
	            }
	        }
    }

    public static function sample_callback($title){
	    //echo "brr 11</br>";
        $catalog = new Catalog();
        $allData = $catalog->getAllCatalogDataByTitle($title);
        do_action('shwproductShortcodeScripts');
	    \SHWPortfolioCatalog\Helpers\View::render('frontend/single.php', array('allData' => $allData));
    }

    public static function permalinkPlain($permalink_structure) {
	    //echo "brr 7  permalink structure = $permalink_structure</br>";


        ob_start();
        $extra = array(
            'route-$id.php',
            'route.php',
            'page-$id.php',
            'page.php'
        );
        $template = locate_template($extra);
        $title = substr($permalink_structure, strrpos($permalink_structure, '&cat=catalog&product=') + 21);

	    //echo "brr 8 title = $title</br>";
        $returned =FrontendController::sample_callback($title);
        $echoed = ob_get_clean();


	    // echo "brr wp_route=".$echoed.$returned." title=".$title." template=".$template.'</br>';

	    if(strpos($permalink_structure, '&cat=catalog&product=') !== false) {
		    $page = new WP_Router_Page( $echoed . $returned, $title, $template );
	    }
    }
}