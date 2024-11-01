<?php
namespace SHWPortfolioCatalog\Models;

use SHWPortfolioCatalog\Core\Model;

class Category extends Model
{
    protected static $tableName = 'shwcategories';
    protected static $primaryKey = 'id';
    private $title;
    private $categories;
    private $category;
    private $viewStyle;
    private $cache = array();
    private $displayTitle;

    protected static $dbFields = array(
        'title', 'slug', 'parent', 'description'
    );

    public function __construct($args = array())    {
        parent::__construct($args);
        if (null !== $this->id) {
            $this->category = $this->getCategory();
            $this->title = $this->category->title;
            $this->description = $this-> category->description;

        } else {
            $this->title = __('New Category', SHWPORTFOLIOCATALOG_TEXT_DOMAIN);
            $this->displayTitle = 1;
        }
    }

    public static function getAllCategoriesBySubCategory(){
        global $wpdb;
        $query = "Select * from " . $wpdb->prefix . "shwcategories order by id";
        $categories = $wpdb->get_results($query);
        $arra = array();
        $i = 0;
        foreach ($categories as $element) {
            $editUrl = admin_url('admin.php?page=shwcategories&task=edit_category&id=' . $element->id);
            $delete_category_link = admin_url('admin.php?page=shwcategories&task=delete_category&id='. $element->id);
            $arra[$i]['editUrl'] = $editUrl;
            $arra[$i]['delete_category_link'] = $delete_category_link;
            $arra[$i]['title'] = $element->title;
            $arra[$i]['id'] = $element->id;
            $arra[$i]['slug'] = $element->slug;
            $arra[$i]['description'] = $element->description;
            $i++;
        }
        return $arra;
    }

    /* Searchg Categories */

    public function searchCategories($term) {
      global $wpdb;
      $term = $wpdb->esc_like( $term );
      $term = '%'.$term.'%';
      $sql = "Select * from " . $wpdb->prefix . "shwcategories"." where title like %s order by id desc";
      $sql = $wpdb->prepare( $sql, $term, $term );
      $categories = $wpdb->get_results($sql);
      $arra = array();
      $i = 0;
      foreach ($categories as $element) {
          $editUrl = admin_url('admin.php?page=shwcategories&task=edit_category&id=' . $element->id);
          $delete_category_link = admin_url('admin.php?page=shwcategories&task=delete_category&id='. $element->id);
          $arra[$i]['editUrl'] = $editUrl;
          $arra[$i]['delete_category_link'] = $delete_category_link;
          $arra[$i]['title'] = $element->title;
          $arra[$i]['id'] = $element->id;
          $arra[$i]['slug'] = $element->slug;
          $arra[$i]['description'] = $element->description;
          $i++;
      }
      return $arra;
    }
    public static function getTableName(){
        return $GLOBALS['wpdb']->prefix . self::$tableName;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function getId() {
        return $this->id;
    }

    public function unsetId(){
        $this->id = null;
        return $this;
    }

    /**
     * @return string
*/
    public function getTitle() {
        return (!empty($this->title) ? $this->title : __('(no title)', SHWPORTFOLIOCATALOG_TEXT_DOMAIN));
    }
    /**
     * @param string $title
     *
     * @return Portfolio Catalog
     */
    public function setTitle($title) {
        $this->title = sanitize_text_field($title);

        return $this;
    }  /**
     * @return string
     */
    public function getDescription() {
        return (!empty($this->description) ? $this->description : __('(no description)', SHWPORTFOLIOCATALOG_TEXT_DOMAIN));
    }
    public function setDescription($description) {
        $this->description = sanitize_text_field($description);
        return $this;
    }

    public function getSlug(){
        return (!empty($this->slug) ? $this-> slug: __('(no slkug)', SHWPORTFOLIOCATALOG_TEXT_DOMAIN));
    }

    public function setSlug($slug) {
        $this->slug = sanitize_text_field($slug);
        return $this;
    }

	public function getCategories($all,$id)  {
		global $wpdb;
		$query = $wpdb->get_results("select * from `" . $wpdb->prefix . "shwcategories` order by id desc");

		$where="";
		if($id && !$all) {

			$query3 = $wpdb->get_results( "select * from `" . $wpdb->prefix . "shwcatalogproducts` where catalog_id=".$id." order by id desc" );
			if ( empty( $query3 ) ) {
				return null;
			}
			$this->products = $query3;
			$strQuery = "";
			foreach ( $this->products as $key => $value ) {
					$strQuery = $strQuery . $value->id . ',';
			}
			$strQuery = substr_replace( $strQuery, "", - 1 );
			$exploded = explode( ',', $strQuery );
			$unique   = array_unique( $exploded );
			$imploded = implode( ',', $unique );
			$where='where product_id IN ('.$imploded.')';



			$query2 = $wpdb->get_results( "select * from `" . $wpdb->prefix . "shwcatalogproductcategories` ".$where." order by id desc" );
			if ( empty( $query2 ) ) {
				return null;
			}
			$this->categories_str = $query2;
			$strQuery = "";
			foreach ( $this->categories_str as $key => $value ) {
				if ( $value->is_visible == "on" ) {
					$strQuery = $strQuery . $value->category_id . ',';
				}
			}
			$strQuery = substr_replace( $strQuery, "", - 1 );
			$exploded = explode( ',', $strQuery );
			$unique   = array_unique( $exploded );
			$imploded = implode( ',', $unique );
			$where='where ID IN ('.$imploded.')';
		}

		$query = $wpdb->get_results("select * from `" . $wpdb->prefix . "shwcategories` ".$where." order by id desc");
		if (empty($query)) {
			return null;
		}
		$this->categories = $query;
		return $this->categories;
	}

    public static function getCategoriesCount() {
        global $wpdb;
        $query = $wpdb->get_results("select * from `" . $wpdb->prefix . "shwcategories` order by id desc");
        if (empty($query)) {
            return null;
        }

        return count($query);
    }

    public function getCategory(){
        global $wpdb;

        $query = $wpdb->prepare("select * from `" . $wpdb->prefix . "shwcategories` where id=%d order by ordering", $this->id);
        $category = $wpdb->get_row($query);
        if (empty($category)) {
            return null;
        }

        $this->category = $category;
        return $this->category;
    }

    public function updateCategory($updateData, $id) {
        global $wpdb;
        $where = array(
            'id' => $id
        );
        $update = $wpdb->update($wpdb->prefix . "shwcategories", $updateData, $where);
        return (bool)$update;
    }

    public function deleteCategory($id) {
        global $wpdb;
        return $wpdb->query($wpdb->prepare("Delete  from `" . $wpdb->prefix . "shwcategories` where id=%d", $id));
    }

    public function saveCategory($title, $slug, $catDescriptiont) {
        global $wpdb;

        $result = $wpdb->insert(static::getTableName(), array(
            'title' => $title,
            'description' => $catDescriptiont,
            'slug' => $slug
        ));
        if (false !== $result) {
            return static::$primaryKey;
        }
        return false;
    }

    public function getViewStyles(){
        return $this->viewStyle;
    }

    public function getDisplayTitle(){
        return $this->displayTitle;
    }

    public function setDisplayTitle($value) {
        if (in_array($value, array(0, 1, 'on'))) {
            if ($value == 'on') $value = 1;
            $this->displayTitle = intval($value);
        }
        return $this;
    }

    public function getData($key, $default = false) {
        if (!in_array($key, $this->cache)) {
            global $wpdb;
            $value = $wpdb->get_var($wpdb->prepare('select Value from ' . self::getTableName() . ' where name=%s', $key));
            if (empty($value)) {
                $this->$key = $default;
            } else {
                $unserialized_value = @unserialize($value);

                if (false !== $unserialized_value || 'b:0;' === $value) {
                    $value = $unserialized_value;
                }
                $this->$key = $value;
            }
            $this->cache[] = $key;
        }
        return $this->$key;
    }
    public function set($key, $value){
        global $wpdb;

        $option_exists = $this->getData($key);
        \debug::trace($option_exists);
        if ($option_exists) {
            $saved = $wpdb->update(self::getTableName(),
                array('Value' => esc_sql($value)),
                array('name' => esc_sql($key))
            );
        } else {
            $saved = $wpdb->insert(self::getTableName(), array(
                    'Value' => esc_sql($value),
                    'name' => esc_sql($key)
                )
            );
        }
        $this->$key = $value;
        return (bool)$saved;
    }
}