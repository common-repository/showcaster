<?php
namespace SHWPortfolioCatalog\Models;
use SHWPortfolioCatalog\Core\Model;
class Catalog extends Model
{
	protected static $tableName = 'shwcatalogs';
	protected static $primaryKey = 'id';
	private $name;
	private $items;
	private $catalog;
	private $view_style;
	private $cache = array();
	private $displayTitle;

	protected static $dbFields = array(
		'name', 'description', 'display_type', 'position', 'hover_style', 'custom_css'
	);

	public function __construct($args = array()){
		parent::__construct($args);
		if (null !== $this->id) {
			$this->catalog = $this->getCatalog();
			$this->name = $this->catalog->name;
		} else {
			$this->name = __('New Showcaster', SHWPORTFOLIOCATALOG_TEXT_DOMAIN);
			$this->displayTitle = 1;
		}
	}

	public function saveDuplicate()	{
		global $wpdb;
		$catalog = $this->getCatalog();
		$name = $catalog->name . "(Duplicate)";
		$newCatalog = new Catalog();
		$newCatalog->name = $name;
		$newCatalog->save();
		$products = $this->getProducts_($catalog->id);
		$productOptions = $this->getProductSettings($catalog->id);
		$thumbnails = array();
		$allData = array();
		$newCatalog->saveProductOptions($productOptions);
        $where = array(
            'catalog_id' => $newCatalog->id
        );
        $updatedData = array("theme_id"=>sanitize_text_field($productOptions['productOptionTheme']['theme_id']));
        $wpdb->update($wpdb->prefix . "shwcatalogproductoptions", $updatedData, $where);

		foreach ($products as $key => $value) {
			$thumbnails['thumbnails'] = $this->getProductById($value->id)['thumbnails'];
			$thumbnails['products'] = $value;
			$allData[$value->id] = $thumbnails;
		}
		$allAtrribures = $this->getCatalogAtrributes($catalog->id);
		$attrIds = array();
		foreach ($allAtrribures as $key=>$value) {
			$wpdb->insert(
				$wpdb->prefix . "shwattributes", array(
				'catalog_id' => esc_sql($newCatalog->id),
				'title' => $value->title,
				'ordering' =>$value->ordering
			));
			$newAttributeId = $wpdb->insert_id;
			$attrIds[] = $newAttributeId;
		}

		foreach ($allData as $key=>$value) {
			$products = $value['products'];
			$thumbnails_ = $value['thumbnails'];
			$catalogproductattributes = $this->getCatalogProductAtrributes($products->id);
			$wpdb->insert(
				$wpdb->prefix . "shwcatalogproducts", array(
				'catalog_id' => sanitize_text_field(esc_sql($newCatalog->id)),
				'image_id' => esc_sql($products->image_id),
				'title' => sanitize_text_field(esc_sql($products->title)),
				'description'=>sanitize_text_field(esc_sql($products->description)),
				'price'=>sanitize_text_field(esc_sql($products->price)),
				'discount'=>sanitize_text_field(esc_sql($products->discount)),
				'visible'=>sanitize_text_field(esc_sql($products->visible))
			));
			$newProductId = $wpdb->insert_id;
			foreach ($thumbnails_ as $thumbnails_Key=>$thumbnailsValue) {
				$wpdb->insert(
					$wpdb->prefix . "shwcatalogproductthumbnails", array(
					'product_id' => esc_sql($newProductId),
					'image_id' => esc_sql($thumbnailsValue->image_id)
				));
			}
			$i = 0;
			foreach ($catalogproductattributes as $key=>$value) {
				if ($value->product_id != "") {
					if (!empty($catalogproductattributes)) {
						$wpdb->insert(
							$wpdb->prefix . "shwcatalogproductattributes", array(
							'product_id' => esc_sql($newProductId),
							'attribute_id' => esc_sql($attrIds[$i]),
							'value' => esc_sql($value->value),
							'is_visible' => esc_sql($value->is_visible)
						));
					}
					$i++;
				}
			}
		}
		return $this->catalog;
	}

	public function removeCatalog()	{
		global $wpdb;
		$wpdb->delete($wpdb->prefix . "shwcatalogs", array('id' => $this->id),array('%d'));
		return static::$primaryKey;
	}

    public function saveProductOptions($data) {
        global $wpdb;
        $wpdb->delete($wpdb->prefix . "shwcatalogproductoptions", array('catalog_id' => $this->id));
        $query = "select * from " . $wpdb->prefix . "shwproductoptions";
        $product_data = $wpdb->get_results($query);
        foreach ($product_data as $key => $value) {
            $saved = $wpdb->insert($wpdb->prefix . "shwcatalogproductoptions", array(
                    'catalog_id' => esc_sql($this->id),
                    'productoptions_id' => esc_sql($value->id),
                    'value' => isset($data[$value->option_name]) ? sanitize_text_field(esc_sql($data[$value->option_name]['value'])) : "off"
                )
            );
        }
        return $saved;
    }

	public function updateCatalogData($data){
		global $wpdb;
		$wpdb->delete($wpdb->prefix . "shwcatalogproductoptions", array('catalog_id' => $this->id));
		$query = "select * from " . $wpdb->prefix . "shwproductoptions";
		$product_data = $wpdb->get_results($query);
		foreach ($product_data as $key => $value) {
			$saved = $wpdb->insert($wpdb->prefix . "shwcatalogproductoptions", array(
					'catalog_id' => esc_sql($this->id),
					'productoptions_id' => esc_sql($value->id),
					'value' =>sanitize_text_field(esc_sql($value->id)) == 1 ? "0" : (isset($data[$value->option_name]) ? sanitize_text_field(esc_sql($data[$value->option_name])) : "off"),
					'theme_id' => esc_sql($value->id) == 1 ? esc_sql($data[$value->option_name]) : 1
				)
			);
		}
		return $saved;
	}

	public function updateCatalogName($name){
		global $wpdb;
		$where = array(
			'id' => $this->id
		);
		$updatedData = array("name"=>sanitize_text_field($name));
		$update = $wpdb->update($wpdb->prefix . "shwcatalogs", $updatedData, $where);
		return $update;
	}

	public function getCatalog(){
		global $wpdb;
		$query = $wpdb->prepare("select * from `" . $wpdb->prefix . "shwcatalogs` where id=%d order by ordering", $this->id);
		$catalogs = $wpdb->get_row($query);
		if (empty($catalogs)) {
			return null;
		}
		$this->catalog = $catalogs;
		return $this->catalog;
	}

	public function getProductById($product_id)	{
		global $wpdb;
		$query = "Select * from `" . $wpdb->prefix . "shwcatalogproducts` left join `" . $wpdb->prefix . "posts` on `" . $wpdb->prefix . "posts`.id=`" . $wpdb->prefix . "shwcatalogproducts`.image_id where  `" . $wpdb->prefix . "shwcatalogproducts`.catalog_id=%d and " . $wpdb->prefix . "shwcatalogproducts.id=%s";
		$query = $wpdb->prepare($query, $this->id, $product_id);
		$images = $wpdb->get_results($query);
		$query_thumbnails = "Select * from `" . $wpdb->prefix . "shwcatalogproductthumbnails`, `" . $wpdb->prefix . "posts` where `" . $wpdb->prefix . "posts`.id=`" . $wpdb->prefix . "shwcatalogproductthumbnails`.image_id and `" . $wpdb->prefix . "shwcatalogproductthumbnails`.product_id=%d order by ordering asc";
		$query_thumbnails = $wpdb->prepare($query_thumbnails, $product_id);
		$thumbnails = $wpdb->get_results($query_thumbnails);
		return array("result" => $images[0], "thumbnails" => $thumbnails);
	}

	public function getProductByIdCatalogId($product_id, $catalog_id) {
		global $wpdb;
		$query = "Select * from `" . $wpdb->prefix . "shwcatalogproducts` left join `" . $wpdb->prefix . "posts` on `" . $wpdb->prefix . "posts`.id=`" . $wpdb->prefix . "shwcatalogproducts`.image_id where  `" . $wpdb->prefix . "shwcatalogproducts`.catalog_id=%d and " . $wpdb->prefix . "shwcatalogproducts.id=%s";
		$query = $wpdb->prepare($query, $catalog_id, $product_id);
		$images = $wpdb->get_results($query);
		$query_thumbnails = "Select * from `" . $wpdb->prefix . "shwcatalogproductthumbnails`, `" . $wpdb->prefix . "posts` where `" . $wpdb->prefix . "posts`.id=`" . $wpdb->prefix . "shwcatalogproductthumbnails`.image_id and `" . $wpdb->prefix . "shwcatalogproductthumbnails`.product_id=%d order by ordering asc";
		$query_thumbnails = $wpdb->prepare($query_thumbnails, $product_id);
		$thumbnails = $wpdb->get_results($query_thumbnails);
		return array("result" => $images[0], "thumbnails" => $thumbnails);
	}

	public function getProductByIdWithoutMain($product_id){
		global $wpdb;
		$query_thumbnails = "Select ".$wpdb->prefix . "shwcatalogproductthumbnails .*, ".$wpdb->prefix."posts.guid from `" . $wpdb->prefix . "shwcatalogproductthumbnails`, `" . $wpdb->prefix . "posts` where `" . $wpdb->prefix . "posts`.id=`" . $wpdb->prefix . "shwcatalogproductthumbnails`.image_id and `" . $wpdb->prefix . "shwcatalogproductthumbnails`.product_id=%d order by ordering asc";
		$query_thumbnails = $wpdb->prepare($query_thumbnails, $product_id);
		$thumbnails = $wpdb->get_results($query_thumbnails);
		return $thumbnails;
	}

	public function updateImage($data, $id)	{
		global $wpdb;
		$products = $this->getCatalogProductByTitle(trim($data['productTitle']), $id);
		$catalog_title = str_replace(' ', '-', trim($data['productTitle']));
		$updatedData = array(
			'title' => sanitize_text_field(esc_sql(trim($data['productTitle']))),
            'catalog_title' => sanitize_title(esc_sql($catalog_title)),
			'description' => esc_sql($data['productDescription']),
			'price' => $data['productPrice'] ? sanitize_text_field(esc_sql($data['productPrice'])) : null ,
			'discount' => $data['discountPrice'] ? sanitize_text_field(esc_sql($data['discountPrice'])) : null
		);
		if (isset($data['visible'])) {
			$updatedData['visible'] = esc_sql($data['visible']);
		}
		$where = array(
			'catalog_id' => $this->id,
			'id' => $id
		);
		$update = $wpdb->update($wpdb->prefix . "shwcatalogproducts", $updatedData, $where);
		if (count($products) > 1) {
            foreach ($products as $key => $value) {
                $updatedData = array(
                    'catalog_title' => sanitize_title(esc_sql(trim($catalog_title))) . "-" . ($key + 1)
                );
                $where = array(
                    'catalog_id' => $this->id,
                    'id' => $value->id
                );
                $update = $wpdb->update($wpdb->prefix . "shwcatalogproducts", $updatedData, $where);
            }
        }
		return (bool)$update;
	}

	/**
	 * @return string
	 */
	public function getName(){
		return (!empty($this->name) ? $this->name : __('(no title)', SHWPORTFOLIOCATALOG_TEXT_DOMAIN));
	}
	/**
	 * @param string $name
	 *
	 * @return Catalog
	 */
	public function setName($name) {
		$this->name = sanitize_text_field($name);
		return $this;
	}

	public static function getTableName(){
		return $GLOBALS['wpdb']->prefix . self::$tableName;
	}

	public function setId($id)	{
		$this->id = $id;
	}

	public function getId()	{
		return $this->id;
	}

	public function unsetId()	{
		$this->id = null;
		return $this;
	}
	/**
	 * @return Field[]
	 */
	public function getItemsCount()	{
		global $wpdb;
		$query = $wpdb->prepare("select * from `" . $wpdb->prefix . "shwcatalogproducts` where catalog_id=%d", $this->id);
		$items = $wpdb->get_results($query);
		if (empty($items)) {
			return 0;
		}
		$this->items = $items;
		return  count($this->items);
	}

	public function saveCatalog($data) {
		global $wpdb;
		$result = $wpdb->update(static::getTableName(), $data, array(static::$primaryKey => $data["id"]));
		if (false !== $result) {
			return static::$primaryKey;
		}
		return false;
	}

	public function removeCatalogItems($data){
		global $wpdb;
		foreach ($data as $key => $val) {
			$wpdb->delete($wpdb->prefix . "shwcatalogproducts", array('id' => $val, "catalog_id" => $this->id));
		}
		return static::$primaryKey;
	}

	public function removeCatalogProductThumbnails($product_id, $thumbnailsId){
		global $wpdb;
		$wpdb->delete($wpdb->prefix . "shwcatalogproductthumbnails", array('product_id' => $product_id, 'id' => $thumbnailsId));
		return static::$primaryKey;
	}

	public function removeCatalogProductMainImage($product_id, $removeOnlyMain)	{
		global $wpdb;
		if ($removeOnlyMain) {
			$updatedData = array('image_id' => -1);
			$where = array('id' => $product_id);
			$wpdb->update($wpdb->prefix . "shwcatalogproducts", $updatedData, $where);
			return array("main_image" => -1);
		}

		$thumbnails = $this->getProductById($product_id);
		if (count($thumbnails['thumbnails']) == 0) {
			$updatedData = array('image_id' => '-1');
			$where = array('id' => $product_id);
			$wpdb->update($wpdb->prefix . "shwcatalogproducts", $updatedData, $where);
			return array("main_image" => -1);

		} else {
			$thumbnailsId = $thumbnails['thumbnails']{0}->image_id;
			$wpdb->delete($wpdb->prefix . "shwcatalogproductthumbnails", array('product_id' => $product_id, 'id' => $thumbnails['thumbnails']{0}->id));
			$updatedData = array('image_id' => $thumbnailsId);
			$where = array('id' => $product_id);
			$wpdb->update($wpdb->prefix . "shwcatalogproducts", $updatedData, $where);
			$thumbnailsNext = $this->getProductById($product_id);
			return array("main_image" => $thumbnails['thumbnails']{0}->guid, "thumbnails" => $thumbnailsNext['thumbnails']);
		}
	}

	public function getViewStyles()	{
		return $this->view_style;
	}
	/**
	 * return string 0|1
	 */
	public function getDisplayTitle(){
		return $this->displayTitle;
	}

	/**
	 * @param $value int 0,1
	 * @return $this
	 */
	public function setDisplayTitle($value)	{
		if (in_array($value, array(0, 1, 'on'))) {
			if ($value == 'on') $value = 1;
			$this->DisplayTitle = intval($value);
		}
		return $this;
	}

	/**
	 * @param $key string
	 * @param mixed $default
	 * @return mixed
	 */
	public function getData($key, $default = false)	{
		if (!in_array($key, $this->cache)) {
			global $wpdb;
			$value = $wpdb->get_var($wpdb->prepare('select Value from ' . self::getTableName() . ' where Name=%s', $key));
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

	/**
	 * @param $key string
	 * @param $value string
	 * @return bool
	 */
	public function set($key, $value){
		global $wpdb;
		$option_exists = $this->getData($key);
		\debug::trace($option_exists);
		if ($option_exists) {
			$saved = $wpdb->update(self::getTableName(),
				array('Value' => sanitize_text_field(esc_sql($value))),
				array('Name' => sanitize_text_field(esc_sql($key)))
			);
		} else {
			$saved = $wpdb->insert(self::getTableName(), array(
					'Value' => sanitize_text_field(esc_sql($value)),
					'Name' => sanitize_text_field(esc_sql($key))
				)
			);
		}
		$this->$key = $value;
		return (bool)$saved;
	}

	public function updateCatalogProductOrder($product, $catalog_id){
		global $wpdb;
		$where = array(
			'id' => $product['id'],
			'catalog_id' => $catalog_id
		);
		$updatedData = array("ordering"=>sanitize_text_field($product['order']));
		$update = $wpdb->update($wpdb->prefix . "shwcatalogproducts", $updatedData, $where);
		return $update;
	}

	public function updateCatalogProductThumbnailsOrder($product_id, $thumbnail){
		global $wpdb;
		$where = array(
			'product_id' => $product_id,
			'id' => $thumbnail['id']
		);
		$updatedData = array("ordering"=>sanitize_text_field($thumbnail['order']));
		$update = $wpdb->update($wpdb->prefix . "shwcatalogproductthumbnails", $updatedData, $where);
		return $update;
	}

	public function saveProducts($imgData, $catalog_id)	{
		global $wpdb;
        $query = 0;
		$count = 1 - count($this->getProducts($catalog_id));
		foreach ($imgData as $data) {
            $query = $wpdb->insert( $wpdb->prefix.'shwcatalogproducts', array(
                'catalog_id' => $catalog_id,
                'image_id'=> sanitize_text_field($data['image']),
                'ordering' => $count,
                'created_date' => date("Y-m-d H:i:s")

            ));
        }
		return $query;
	}

	public function saveProductThubmnails($imgData, $product_id, $update, $thumbnailsId){
		global $wpdb;
        $query = 1;
		$count = count($this->getProductById($product_id)['thumbnails']);
		if ($update == "false") {
			foreach ($imgData as $data) {
                $wpdb->insert( $wpdb->prefix.'shwcatalogproductthumbnails', array(
                    'product_id' => $product_id,
                    'image_id' => sanitize_text_field($data['image']),
                    'ordering' => $count
                ));
				$count++;
			}
		} else {
			if (!$thumbnailsId) {
				$updatedData = array('image_id' => sanitize_text_field($imgData[count($imgData) - 1]['image']));
				$where = array('id' => $product_id);
				$query = $wpdb->update($wpdb->prefix . "shwcatalogproducts", $updatedData, $where);
			} else {
				$updatedData = array('image_id' => sanitize_text_field($imgData[count($imgData) - 1]['image']));
				$where = array('id' => $thumbnailsId);
				$query = $wpdb->update($wpdb->prefix . "shwcatalogproductthumbnails", $updatedData, $where);
			}
		}
		return $query;
	}

	public static function getProducts($id)	{
		global $wpdb;
		$query = "Select " . $wpdb->prefix . "shwcatalogproducts.id as prodId," . $wpdb->prefix . "shwcatalogproducts.* , " . $wpdb->prefix . "posts.* from `" . $wpdb->prefix . "shwcatalogproducts` left join  `" . $wpdb->prefix . "posts` on  `" . $wpdb->prefix . "posts`.id=`" . $wpdb->prefix . "shwcatalogproducts`.image_id and `" . $wpdb->prefix . "shwcatalogproducts`.catalog_id=%d order by ordering";
		$query = $wpdb->prepare($query, $id);
		$images = $wpdb->get_results($query);
		return $images;
	}


	public static function getProducts_($id) {
		global $wpdb;
		$query = "Select " . $wpdb->prefix . "shwcatalogproducts.id as prodId," . $wpdb->prefix . "shwcatalogproducts.* , " . $wpdb->prefix . "posts.guid  from `" . $wpdb->prefix . "shwcatalogproducts` , `" . $wpdb->prefix . "posts` where  `" . $wpdb->prefix . "posts`.id=`" . $wpdb->prefix . "shwcatalogproducts`.image_id and `" . $wpdb->prefix . "shwcatalogproducts`.catalog_id=%d order by ordering";
		$query = $wpdb->prepare($query, $id);
		$images = $wpdb->get_results($query);
		return $images;
	}

	public static function getProductSettings($catalog_id){
		global $wpdb;
		$query = "Select " . $wpdb->prefix . "shwcatalogproductoptions.*, " . $wpdb->prefix . "shwproductoptions.* from " .
		         $wpdb->prefix . "shwcatalogproductoptions, " . $wpdb->prefix . "shwcatalogs, " . $wpdb->prefix . "shwproductoptions where " .
		         $wpdb->prefix . "shwcatalogs.id=" . $wpdb->prefix . "shwcatalogproductoptions.catalog_id and " . $wpdb->prefix . "shwcatalogs.id=%d and "
		         . $wpdb->prefix . "shwcatalogproductoptions.productoptions_id = " . $wpdb->prefix . "shwproductoptions.id";

		$query = $wpdb->prepare($query, $catalog_id);
		$product_options = $wpdb->get_results($query);
		$allData = array();
		foreach ($product_options as $value) {
			$allData[$value->option_name] = array('value' => $value->value, 'productoptions_id' => $value->productoptions_id,
			                                      'theme_id'=>$value->theme_id);
		}
		return $allData;
	}

	public function getCatalogsUrl() {
		global $wpdb;
		$list = array();
		$catalogs = $wpdb->get_results("select `id`,`name` from `" . $wpdb->prefix . "shwcatalogs` order by id");
		foreach ($catalogs as $val) {
			$EditUrl = admin_url('admin.php?page=shwportfolio&task=edit_catalog&id=' . $val->id);
			$EditUrl = wp_nonce_url($EditUrl, 'shwcatalog_edit_catalog_' . $val->id);
			$list[] = array(
				"id" => $val->id,
				"name" => $val->name,
				"url" => $EditUrl
			);
		}
		return $list;
	}

	public function getCatalogAtrributes($catalog_id){
		global $wpdb;
		$query = $wpdb->prepare("Select ".$wpdb->prefix."shwattributes.* from " .$wpdb->prefix."shwattributes where catalog_id=%d order by ordering",$catalog_id);
		$product_attributes = $wpdb->get_results($query);
		return $product_attributes;
	}

	public function getCatalogProductAtrributes($product_id){
		global $wpdb;
		$query = $wpdb->prepare("Select ".$wpdb->prefix."shwattributes.id as attrId, ".$wpdb->prefix."shwattributes.*, ".$wpdb->prefix."shwcatalogproductattributes.* from " .$wpdb->prefix."shwattributes left join ".$wpdb->prefix."shwcatalogproductattributes on ".
		         $wpdb->prefix."shwcatalogproductattributes.attribute_id=".$wpdb->prefix."shwattributes.id and ".$wpdb->prefix."shwcatalogproductattributes.product_id = %d where catalog_id=%d order by ordering", $product_id, $this->id);
		$product_attributes = $wpdb->get_results($query);
		return $product_attributes;
	}

	public function getCatalogProductAtrributesId($product_id, $catalog_id){
		global $wpdb;
		$query = $wpdb->prepare("Select ".$wpdb->prefix."shwattributes.id as attrId, ".$wpdb->prefix."shwattributes.*, ".$wpdb->prefix."shwcatalogproductattributes.* from " .$wpdb->prefix."shwattributes left join ".$wpdb->prefix."shwcatalogproductattributes on ".
		         $wpdb->prefix."shwcatalogproductattributes.attribute_id=".$wpdb->prefix."shwattributes.id and ".$wpdb->prefix."shwcatalogproductattributes.product_id =%d where catalog_id=%d order by ordering", $product_id, $catalog_id);
		$product_attributes = $wpdb->get_results($query);
		return $product_attributes;
	}

    public function getCatalogProductByTitleById($title, $id) {
        global $wpdb;
        $query = $wpdb->prepare("Select * from `" . $wpdb->prefix . "shwcatalogproducts` where title = %s and id=%d",sanitize_text_field($title), $id );
        $product = $wpdb->get_results($query);
        return $product;
    }

    public function getCatalogProductByTitle($title, $id) {
        global $wpdb;
        $query = $wpdb->prepare("Select * from `" . $wpdb->prefix . "shwcatalogproducts` where title = %s", sanitize_text_field($title));
        $product = $wpdb->get_results($query);
        return $product;
    }

    public function getCatalogProductByCatalogTitle($title) {
        global $wpdb;
        $query = $wpdb->prepare("Select * from `" . $wpdb->prefix . "shwcatalogproducts` where catalog_title = %s",sanitize_text_field($title));
        $product = $wpdb->get_results($query);
        return $product;
    }

    public function getCatalogProductById($poductId) {
        global $wpdb;
        $query = $wpdb->prepare("Select * from `" . $wpdb->prefix . "shwcatalogproducts` where id = %d", $poductId);
        $product = $wpdb->get_results($query);
        return $product;
    }

	public function getCatalogProductCategories($product_id){
		global $wpdb;
		$query = $wpdb->prepare("Select ".$wpdb->prefix."shwcategories.id as cat_id, ".$wpdb->prefix."shwcategories.*, ".$wpdb->prefix."shwcatalogproductcategories.* from " .$wpdb->prefix."shwcategories left join ".$wpdb->prefix."shwcatalogproductcategories on ".
		         $wpdb->prefix."shwcatalogproductcategories.category_id=".$wpdb->prefix."shwcategories.id and ".$wpdb->prefix."shwcatalogproductcategories.product_id =%d order by cat_id desc", $product_id);
		$product_attributes = $wpdb->get_results($query);
		return $product_attributes;
	}

	public function updateCatalogProductAtrributes($product_id, $attributes, $checked) {
		global $wpdb;
		$saved = 1;
		$wpdb->delete($wpdb->prefix . "shwcatalogproductattributes", array('product_id' => $product_id));
		if ($attributes) {
			foreach ($attributes as $key => $value) {
				$saved = $wpdb->insert($wpdb->prefix . "shwcatalogproductattributes", array(
						'product_id' => esc_sql($product_id),
						'attribute_id' => esc_sql($key),
						'value' => sanitize_text_field($value),
						'is_visible' => (isset($checked[$key]) ? "on" : "off")
					)
				);
			}
		}
		return $saved;
	}

	public function updateCatalogProductCategories($product_id, $categories){
		global $wpdb;
		$saved = 1;
		$wpdb->delete($wpdb->prefix . "shwcatalogproductcategories", array('product_id' => $product_id));
		$category = new Category();
        $allCategories = $category->getCategories(true,false);
		if ($allCategories) {
			foreach ($allCategories as $key => $value) {
				$saved = $wpdb->insert($wpdb->prefix . "shwcatalogproductcategories", array(
						'product_id' => esc_sql($product_id),
						'category_id' => esc_sql($value->id),
						'is_visible' => (isset($categories[$value->id]) ? "on" : "off")
					)
				);
			}
		}
		return $saved;
	}

	public function getAllCatalogDataByTitle($title) {
		global $wpdb;
		if (!is_numeric($title)) {
            $product = $this->getCatalogProductByCatalogTitle($title);
        } else {
            $product = $this->getCatalogProductById($title);
        }
		$product_id = $product ? $product[0]->id : null;
		$productAllData = array();
        if ($product_id != null) {
            $catalog_id = $product[0]->catalog_id;
            $productAllData = array(
                'categories'=>$this->getCatalogProductCategories($product_id),
                'attributes' => $this->getCatalogProductAtrributesId($product_id, $catalog_id),
                'thumbnails'=> $this->getProductByIdWithoutMain($product_id),
                'images'=>$this->getProductByIdCatalogId($product_id, $catalog_id)['result'],
	            'options' => $this->getProductSettings($catalog_id)
            );
        }
        return $productAllData;
	}

    public function getSearchProductsByCategories($id, $term, $page, $limit, $category) {
        global $wpdb;
        $wild = "%";
        $query = 1;
        \SHWPortfolioCatalog\Helpers\View::renderOnce('frontend/Utils.php');
        $category = replaceToSpace($category);
        $term1 = $wild.$wpdb->esc_like( $term ).$wild;
        $limit_ = $page ==-1 ? '': "limit %d, %d";
        if ($page == -1) {
            $query = $wpdb->prepare("Select new.prodId as prodId, new.* , new.guid," . $wpdb->prefix . "shwcatalogproductcategories.product_id from " . $wpdb->prefix .
                "shwcategories, " . $wpdb->prefix . "shwcatalogproductcategories 
            join (Select " . $wpdb->prefix . "shwcatalogproducts.id as prodId, " . $wpdb->prefix . "shwcatalogproducts.* , " . $wpdb->prefix .
                "posts.guid from `" . $wpdb->prefix . "shwcatalogproducts`, `" . $wpdb->prefix . "posts` where `" . $wpdb->prefix . "posts`.id=`" . $wpdb->prefix .
                "shwcatalogproducts`.image_id and `" . $wpdb->prefix . "shwcatalogproducts`.catalog_id=%d and ifnull (title, 1) LIKE %s order by ordering ) as new where
            " . $wpdb->prefix . "shwcatalogproductcategories.category_id=".$wpdb->prefix."shwcategories.id and " . $wpdb->prefix . "shwcatalogproductcategories.product_id = new.prodId
            and is_visible='on' and " . $wpdb->prefix . "shwcategories.title=%s" . $limit_, $id, $term1, $category);
        } else {
            $query = $wpdb->prepare("Select new.prodId as prodId, new.* , new.guid," . $wpdb->prefix . "shwcatalogproductcategories.product_id from " . $wpdb->prefix .
                "shwcategories, " . $wpdb->prefix . "shwcatalogproductcategories 
            join (Select " . $wpdb->prefix . "shwcatalogproducts.id as prodId, " . $wpdb->prefix . "shwcatalogproducts.* , " . $wpdb->prefix .
                "posts.guid from `" . $wpdb->prefix . "shwcatalogproducts`, `" . $wpdb->prefix . "posts` where `" . $wpdb->prefix . "posts`.id=`" . $wpdb->prefix .
                "shwcatalogproducts`.image_id and `" . $wpdb->prefix . "shwcatalogproducts`.catalog_id=%d and ifnull (title, 1) LIKE %s order by ordering ) as new where
            " . $wpdb->prefix . "shwcatalogproductcategories.category_id=".$wpdb->prefix."shwcategories.id and " . $wpdb->prefix . "shwcatalogproductcategories.product_id = new.prodId
            and is_visible='on' and " . $wpdb->prefix . "shwcategories.title=%s" . $limit_, $id, $term1, $category, $page, $limit);
        }
        $images = $wpdb->get_results($query);
        return $images;
    }

    public function getSearchProducts($id, $term, $page, $limit){
		global $wpdb;
        $wild = "%";
		$term1 = $wild.$wpdb->esc_like( $term ).$wild;
		$limit_ = $page ==-1 ? '': "limit %d, %d";
        $query = 1;
		if ($page == -1) {
            $query = $wpdb->prepare("Select " . $wpdb->prefix . "shwcatalogproducts.id as prodId," . $wpdb->prefix . "shwcatalogproducts.* , " . $wpdb->prefix . "posts.guid  from `" . $wpdb->prefix . "shwcatalogproducts` , `" . $wpdb->prefix . "posts` where  `" . $wpdb->prefix . "posts`.id=`" . $wpdb->prefix . "shwcatalogproducts`.image_id and `" . $wpdb->prefix . "shwcatalogproducts`.catalog_id=%d and  ifnull (title, 1) LIKE %s order by ordering " . $limit_,
                $id, $term1);
        } else {
            $query = $wpdb->prepare("Select " . $wpdb->prefix . "shwcatalogproducts.id as prodId," . $wpdb->prefix . "shwcatalogproducts.* , " . $wpdb->prefix . "posts.guid  from `" . $wpdb->prefix . "shwcatalogproducts` , `" . $wpdb->prefix . "posts` where  `" . $wpdb->prefix . "posts`.id=`" . $wpdb->prefix . "shwcatalogproducts`.image_id and `" . $wpdb->prefix . "shwcatalogproducts`.catalog_id=%d and  ifnull (title, 1) LIKE %s order by ordering " . $limit_,
                $id, $term1, sanitize_text_field($page), sanitize_text_field($limit));
        }
		$images = $wpdb->get_results($query);
		return $images;
	}

	function portfolio_catalog_get_image_id( $image_url ) {
		global $wpdb;
		$attachment = $wpdb->get_var( $wpdb->prepare( "SELECT ID FROM " . $wpdb->prefix . "posts WHERE guid=%s", $image_url ) );
		return $attachment;
	}

	function portfolio_catalog_get_image_by_sizes_and_src( $image_src, $image_sizes, $is_thumbnail ) {
        $attachment_id     = $this -> portfolio_catalog_get_image_id( $image_src );
        $image_url = wp_get_attachment_image_url( $attachment_id, $image_sizes );
		return $image_url;
	}
}