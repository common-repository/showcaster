<?php
namespace SHWPortfolioCatalog\Controllers\Frontend;
class WP_Router extends WP_Router_Utility {
	const ROUTE_CACHE_OPTION = 'WP_Router_route_hash';
	private $routes = array();

	private static $instance;
	public static function init() {
		self::$instance = self::get_instance();
	}

	public function add_route( $id, array $properties ) {
		if ( $route = $this->create_route($id, $properties) ) {
			$this->routes[$id] = $route;
		}
		return $route;
	}
	public function get_route( $id ) {
		if ( isset($this->routes[$id]) ) {
			return $this->routes[$id];
		} else {
			return NULL;
		}
	}
	public function edit_route( $id, array $changes ) {
		if ( !isset($this->routes[$id]) ) {
			return;
		}
		foreach ( $changes as $key => $value ) {
			if ( $key != 'id' ) {
				try {
					$this->routes[$id]->set($key, $value);
				} catch ( Exception $e ) {
				}
			}
		}
	}
	public function remove_route( $id ) {
		if ( isset($this->routes[$id]) ) {
			unset($this->routes[$id]);
		}
	}
	public function get_url( $route_id, $arguments = array() ) {
		$route = $this->get_route($route_id);
		if ( !$route ) {
			return home_url();
		} else {
			return $route->url($arguments);
		}
	}


	public static function get_instance() {
		if ( !self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}
	
	public function __construct() {
		add_action('init', array($this, 'generate_routes'), 1000, 0);
		add_action('parse_request', array($this, 'parse_request'), 10, 1);
		add_filter('rewrite_rules_array', array($this, 'add_rewrite_rules'), 10, 1);
		add_filter('query_vars', array($this, 'add_query_vars'), 10, 1);
	}

	private function __clone() {
		trigger_error(__CLASS__.' may not be cloned', E_USER_ERROR);
	}

	public function generate_routes() {
		do_action('wp_router_generate_routes', $this);
		do_action('wp_router_alter_routes', $this);
		$rules = $this->rewrite_rules();
		if ( $this->hash($rules) != get_option(self::ROUTE_CACHE_OPTION) ) {
			$this->flush_rewrite_rules();
		}
	}
	public function add_rewrite_rules( $rules ) {
		$new_rules = $this->rewrite_rules();
		update_option(self::ROUTE_CACHE_OPTION, $this->hash($new_rules));
		return $new_rules + $rules;
	}

	public function add_query_vars( $vars ) {
		$route_vars = $this->query_vars();
		$vars = array_merge($vars, $route_vars);
		return $vars;
	}
	public function parse_request($query ) {
		$this->redirect_placeholder($query);
		if ( $id = $this->identify_route($query) ) {
			$this->routes[$id]->execute($query);
		}
	}
	protected function redirect_placeholder( $query ) {
		if ( !empty( $query->query_vars[WP_Router_Page::POST_TYPE]) ) {
			wp_redirect( home_url(), 303 );
			exit();
		}
	}
	protected function identify_route( $query ) {
		if ( !isset($query->query_vars[self::QUERY_VAR]) ) {
			return NULL;
		}
		$id = $query->query_vars[self::QUERY_VAR];
		return $id;
	}

	protected function create_route( $id, array $properties ) {
		try {

			$route = new WP_Route($id, $properties);
		} catch ( Exception $e ) {

			return NULL;
		}
		return $route;
	}

	protected function rewrite_rules() {
		$rules = array();
		foreach ( $this->routes as $id => $route ) {
			$rules = array_merge($rules, $route->rewrite_rules());
		}
		return $rules;
	}
	protected function query_vars() {
		$vars = array();
		foreach ( $this->routes as $id => $route ) {
			$vars = array_merge($vars, $route->get_query_vars());
		}
		$vars[] = self::QUERY_VAR;
		return $vars;
	}

	protected function hash( $rules ) {
		return md5(serialize($rules));
	}

	protected function flush_rewrite_rules() {
		flush_rewrite_rules();
	}
}
