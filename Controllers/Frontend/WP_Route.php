<?php
namespace SHWPortfolioCatalog\Controllers\Frontend;

class WP_Route extends WP_Router_Utility {
	protected $id = '';
	protected $path = '';
	protected $query_vars = array();
	protected $wp_rewrite = '';
	protected $title = '';
	protected $title_callback = '__';
	protected $title_arguments = array();
	protected $page_callback = '';
	protected $page_arguments = array();
	protected $access_callback = TRUE;
	protected $access_arguments = array();
	protected $template = array();
	protected $properties = array();


	public function __construct( $id, array $properties ) {
		$this->set('id', $id);

		foreach ( array('path', 'page_callback') as $property ) {
			if ( !isset($properties[$property]) || !$properties[$property] ) {
				throw new Exception(sprintf(__("Missing %s", 'wp-router'), $property));
			}
		}
		
		foreach ( $properties as $property => $value ) {
			$this->set($property, $value);
		}
		
		if ( $this->access_arguments && !$properties['access_callback'] ) {
			$this->set('access_callback', 'current_user_can');
		}

	}

	public function get( $property ) {
		if ( isset($this->$property) ) {
			return $this->$property;
		} elseif ( isset($this->properties[$property]) ) {
			return $this->properties[$property];
		} else {
			throw new Exception(sprintf(__("Property not found: %s.", 'wp-router'), $property));
		}
	}

	public function set( $property, $value ) {
		if ( in_array($property, array('id', 'path', 'page_callback')) && !$value ) {
			throw new Exception(sprintf(__("Invalid value for %s. Value may not be empty.", 'wp-router'), $property));
		}
		if ( in_array($property, array('query_vars', 'title_arguments', 'page_arguments', 'access_arguments')) && !is_array($value) ) {
			throw new Exception(sprintf(__('Invalid value for %1$s: %2$s. Value must be an array.'), $property, $value));
		}
		if ( isset($this->$property) ) {
			$this->$property = $value;
		} else {
			$this->properties[$property] = $value;
		}
	}

	public function execute($query ) {
		if ( !$this->check_access($query) ) {
			$this->access_denied();
			return; // can't get in
		}

		$page_contents = $this->get_page($query);
		
		if ( $page_contents === FALSE ) {
			return;
		}

		$template = $this->choose_template();

		if ( $template === FALSE ) {
			print $page_contents;
			exit();
		}

		$title = $this->get_title($query);

		$page = new WP_Router_Page($page_contents, $title, $template);
	}

	public function url( $args = array() ) {
		$args[self::QUERY_VAR] = $this->id;
		return add_query_arg($args, trailingslashit(home_url()));
	}

	public function rewrite_rules() {
		$this->generate_rewrite();
		return array(
			$this->path => $this->wp_rewrite,
		);
	}


	public function get_query_vars() {
		return array_keys($this->query_vars);
	}

	protected function get_callback( $possibilities ) {
		if ( is_callable($possibilities) ) {
			return $possibilities;
		}
		if ( is_array($possibilities) ) {
			$method = $_SERVER['REQUEST_METHOD'];
			if ( $method && isset($possibilities[$method]) && is_callable($possibilities[$method]) ) {
				return $possibilities[$method];
			}
			if ( isset($possibilities['default']) && is_callable($possibilities['default']) ) {
				return $possibilities['default'];
			}
		}
		return FALSE;
	}

	protected function get_page( $query ) {
		$callback = $this->get_callback($this->page_callback);
		if ( !$callback ) {
			return FALSE;
		}
		$args = $this->get_query_args($query, 'page');
		ob_start();
		$returned = call_user_func_array($callback, $args);

		$echoed = ob_get_clean();

		if ( $returned === FALSE ) {
			return FALSE;
		}

		return $echoed.$returned;
	}

	protected function get_title( $query ) {
		$callback = $this->get_callback($this->title_callback);
		if ( !$callback ) {
			return $this->title; // can't call it
		}
		$args = $this->get_query_args($query, 'title');
		if ( !$args ) {
			$args = array($this->title);
		}
		$title = call_user_func_array($this->title_callback, $args);

		if ( $title === FALSE ) {
			return $this->title;
		}

		return $title;
	}

	protected function check_access( $query ) {
		if ( $this->access_callback === TRUE ) {
			return TRUE;
		}
		$callback = $this->get_callback($this->access_callback);
		if ( !$callback ) {
			return FALSE; // nobody gets in
		}
		if ( is_callable($callback) ) {
			$args = $this->get_query_args($query, 'access');
			return (bool)call_user_func_array($callback, $args);
		}
		return (bool)$this->access_callback;
	}


	protected function access_denied() {
		$user_id = get_current_user_id();
		if ( $user_id ) {
			$this->error_403();
		} else {
			$this->login_redirect();
		}
	}

	protected function error_403() {
		$message = apply_filters('wp_router_access_denied_message', __('You are not authorized to access this page', 'wp-router'));
		$title = apply_filters('wp_router_access_denied_title', __('Access Denied', 'wp-router'));
		$args = apply_filters('wp_router_access_denied_args', array( 'response' => 403 ));
		wp_die($message, $title, $args);
		exit();
	}


	protected function login_redirect() {
		$url = wp_login_url($_SERVER['REQUEST_URI']);
		wp_redirect($url);
		exit;
	}

	protected function get_query_args( $query, $callback_type = 'page' ) {
		$property = $callback_type.'_arguments';
		$args = array();
		if ( $this->$property ) {
			foreach ( $this->$property as $query_var ) {
				if ( $this->is_a_query_var($query_var, $query) ) {
					if ( isset($query->query_vars[$query_var]) ) {
						$args[] = $query->query_vars[$query_var];
					} else {
						$args[] = NULL;
					}
				} else {
					$args[] = $query_var;
				}
			}
		}
		return $args;
	}

	protected function is_a_query_var( $var, $query ) {
		if ( in_array($var, $query->public_query_vars) ) {
			return TRUE;
		}
		return FALSE;
	}
	protected function generate_rewrite() {
		$rule = "index.php?";
		$vars = array();
		foreach ( $this->query_vars as $var => $value ) {
			if ( is_int($value) ) {
				$vars[] = $var.'='.$this->preg_index($value);
			} else {
				$vars[] = $var.'='.$value;
			}
		}
		$vars[] = self::QUERY_VAR.'='.$this->id;
		$rule .= implode('&', $vars);
		$this->wp_rewrite = $rule;
	}

	protected function preg_index( $int ) {
		global $wp_rewrite;
		$wp_rewrite->matches = 'matches'; // because it may not be set, yet
		return $wp_rewrite->preg_index($int);
	}

	protected function choose_template() {
		if ( $this->template === FALSE ) {
			return FALSE;
		}
		$template = '';
		$extra = array(
			'route-$id.php',
			'route.php',
			'page-$id.php',
			'page.php',
		);
		if ( $this->template ) {
			foreach ( (array) $this->template as $path ) {
				$path = str_replace('$id', $this->id, $path);
				if ( $this->is_absolute_path($path) ) {
					if ( file_exists($path) ) {
						$template = $path;
						break;
					}
				} else {
					$template = locate_template(array($path));
					if ( $template ) {
						break;
					}
				}
			}
		}
		foreach ( $extra as $key => $path ) {
			$extra[$key] = str_replace('$id', $this->id, $path);
		}
		if ( !$template ) {
			$template = locate_template($extra);
		}
		return $template;
	}

	protected function is_absolute_path( $filename ) {
		$char_1 = substr($filename, 0, 1);
		if ( $char_1 == '/' || $char_1 == '\\' ) {
			return TRUE;
		}
		$char_2 = substr($filename, 1, 1);
		$char_3 = substr($filename, 2, 1);
		if ( ctype_alpha($char_1) && $char_2 == ':' && ( $char_3 == '/' || $char_3 == '\\') ) {
			return TRUE;
		}
		return FALSE;
	}
}
