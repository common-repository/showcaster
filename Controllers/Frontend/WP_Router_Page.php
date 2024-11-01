<?php
namespace SHWPortfolioCatalog\Controllers\Frontend;
class WP_Router_Page extends WP_Router_Utility {
	const POST_TYPE = 'wp_router_page';

	protected static $rewrite_slug = 'WP_Router';
	protected static $post_id = 0; // The ID of the post this plugin uses

	protected $contents = '';
	protected $title = '';
	protected $template = '';
	protected $meta = array();

	public static function init() {
		self::register_post_type();
	}
	private static function register_post_type() {
		$args = array(
			'public' => FALSE,
			'show_ui' => FALSE,
			'exclude_from_search' => TRUE,
			'publicly_queryable' => TRUE,
			'show_in_menu' => FALSE,
			'show_in_nav_menus' => FALSE,
			'supports' => array('title'),
			'has_archive' => TRUE,
			'rewrite' => array(
				'slug' => self::$rewrite_slug,
				'with_front' => FALSE,
				'feeds' => FALSE,
				'pages' => FALSE,
			)
		);

		register_post_type(self::POST_TYPE, $args);
	}
	protected static function get_post_id() {
		if ( !self::$post_id ) {
			$posts = get_posts(array(
				'post_type' => self::POST_TYPE,
				'post_status' => 'publish',
				'posts_per_page' => 1,
			));
			if ( $posts ) {
				self::$post_id = $posts[0]->ID;
			} else {
				self::$post_id = self::make_post();
			}
		}
		return self::$post_id;
	}
	private static function make_post() {
		$post = array(
			'post_title' => __(' ', 'wp-router'),
			'post_status' => 'publish',
			'post_type' => self::POST_TYPE,
		);
		$id = wp_insert_post($post);
		if ( is_wp_error($id) ) {
			return 0;
		}
		return $id;
	}

	public function __construct( $contents, $title, $template = '' ) {
		$this->contents = $contents;
		$this->title = $title;
		$this->template = $template;
		$this->add_hooks();
	}

	protected function add_hooks() {

		add_action('pre_get_posts', array($this, 'edit_query'), 10, 1);
		add_action('the_post', array($this, 'set_post_contents'), 10, 1);
//		add_filter('the_title', array($this, 'get_title'), 10, 2);
		add_filter('single_post_title', array($this, 'get_single_post_title'), 10, 2);
		add_filter('redirect_canonical', array($this, 'override_redirect'), 10, 2);
		add_filter('get_post_metadata', array($this, 'set_post_meta'), 10, 4);
		add_filter('post_type_link', array($this, 'override_permalink'), 10, 4);
		if ( $this->template ) {
			add_filter('template_include', array($this, 'override_template'), 10, 1);
		}
	}

	public function edit_query( $query ) {
		if ( isset($query->query_vars[self::QUERY_VAR]) ) {
			$query->query_vars['post_type'] = self::POST_TYPE;
			$query->query_vars['p'] = self::get_post_id();
			$query->is_single = TRUE;
			$query->is_singular = TRUE;
			$query->is_404 = FALSE;
			$query->is_home = FALSE;
		}
	}
	public function set_post_contents( $post ) {
		global $pages;
		$pages = array($this->contents);
	}
	public function get_title( $title, $post_id ) {
		if ( $post_id == self::get_post_id() ) {
			$title = $this->title;
		}
		return $title;
	}
	public function get_single_post_title( $title, $post = NULL ) {
		// in WP 3.0.x, $post might be NULL. Not true in WP 3.1
		if ( !$post ) {
			$post = $GLOBALS['post'];
		}
		return $this->get_title($title, $post->ID);
	}
	public function override_template( $template ) {
		if ( $this->template && file_exists($template) ) { // these checks shouldn't be necessary, but no harm
			return $this->template;
		}
		return $template;
	}
	public function override_redirect( $redirect_url, $requested_url ) {
		if ( $redirect_url && get_query_var('WP_Route') ) {
			return FALSE;
		}
		if ( $redirect_url && get_permalink(self::get_post_id()) == $redirect_url ) {
			return FALSE;
		}
		return $redirect_url;
	}

	public function set_post_meta( $meta, $post_id, $meta_key, $single ) {
		if ( $post_id == self::get_post_id() ) {
			if ( empty($this->meta) ) {
				$this->meta = array(
					'_yoast_wpseo_title' => array($this->get_title('', $post_id)),
				);
				$this->meta = apply_filters('wp_router_placeholder_postmeta', $this->meta);
			}
			if ( $meta_key ) {
				if ( empty($this->meta[$meta_key]) ) {
					return NULL;
				}
				return $this->meta[$meta_key];
			}
			return $this->meta;
		}
		return $meta;
	}

	public function override_permalink( $post_link, $post, $leavename, $sample ) {
		if ( $post->ID == self::get_post_id() ) {
			if ( $post->ID == get_queried_object_id() ) {
				global $wp;
				return home_url($wp->request);
			}
		}
		return $post_link;
	}
}
