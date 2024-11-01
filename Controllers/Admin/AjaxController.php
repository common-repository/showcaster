<?php
namespace SHWPortfolioCatalog\Controllers\Admin;
use SHWPortfolioCatalog\Models\Catalog;
use SHWPortfolioCatalog\Models\Attributes;
use SHWPortfolioCatalog\Models\Category;
use SHWPortfolioCatalog\Models\Themes;

class AjaxController
{
	public static function init() {
		add_action('wp_ajax_shwproduct_save_product', array(__CLASS__, 'saveCatalog'));
		add_action('wp_ajax_shwcatalog_getProductById', array(__CLASS__, 'getProductById'));
		add_action('wp_ajax_shwcatalog_getProducts', array(__CLASS__, 'getProducts'));
		add_action('wp_ajax_shwproduct_remove_catalog_items', array(__CLASS__, 'removeCatalogItems'));
		add_action('wp_ajax_shwcatalog_delete_catalog_product_thumbnails', array(__CLASS__, 'removeCatalogProductThumbnails'));
		add_action('wp_ajax_shwcatalog_delete_catalog_product_mainimage', array(__CLASS__, 'removeCatalogProductMainImage'));
		add_action('wp_ajax_shwproduct_add_catalog_product', array(__CLASS__, 'AddCatalogProduct'));
		add_action('wp_ajax_shwcatalog_updateOrder_products', array(__CLASS__, 'updateCatalogProductOrder'));
		add_action('wp_ajax_shwproduct_add_catalog_thumbnails', array(__CLASS__, 'AddProductThubmnails'));
		add_action('wp_ajax_shwremove_catalogs', array(__CLASS__, 'removeCatalogs'));
		add_action('wp_ajax_shwcatalog_updateOrder_thumbnails', array(__CLASS__, 'updateCatalogProductThumbnailsOrder'));
		add_action('wp_ajax_shwproduct_duplicate_field', array(__CLASS__, 'duplicateField'));
		add_action('wp_ajax_shwcatalog_add_attributes_button', array(__CLASS__, 'addAttributes'));
		add_action('wp_ajax_shwcatalog_updateOrder_attributes', array(__CLASS__, 'updateOrderAttributes'));
		add_action('wp_ajax_shwcatalog_remove_attributes', array(__CLASS__, 'removeAttributes'));
		add_action('wp_ajax_shwadd_category', array(__CLASS__, 'addCategory'));
		add_action('wp_ajax_shwsearch_category', array(__CLASS__, 'searchCategories'));
		add_action('wp_ajax_shwupdate_category', array(__CLASS__, 'updateCategory'));
		add_action('wp_ajax_shwupdate_catalogsName', array(__CLASS__, 'updateCatalogName'));
		add_action('wp_ajax_shwcatalog_updatethemesData', array(__CLASS__, 'updateThemesData'));
		add_action('wp_ajax_shwcatalog_getethemeData', array(__CLASS__, 'getThemesData'));
		add_action('wp_ajax_shwupdate_theme_title', array(__CLASS__, 'updateThemeTitle'));
		add_action('wp_ajax_shwremove_theme', array(__CLASS__, 'removeTheme'));
	}

	public static function getProductById()	{
		if (!isset($_REQUEST['nonce']) || !wp_verify_nonce($_REQUEST['nonce'], 'shwproduct_save_product')) {
			die('security check failed');
		}
		$productId = absint($_REQUEST['productId']);
		$id = absint($_REQUEST['catalogId']);
		$catalog = new Catalog(array('id' => $id));
		$image = $catalog->getProductById($productId);
		$attributes = $catalog->getCatalogProductAtrributes($productId);
		$image['attributes'] = $attributes;
		$image['categories'] = $catalog->getCatalogProductCategories($productId);
		echo json_encode($image);
		die();
	}

	public static function getProducts(){
		if (!isset($_REQUEST['nonce']) || !wp_verify_nonce($_REQUEST['nonce'], 'shwproduct_save_product')) {
			die('security check failed');
		}
		$id = absint($_REQUEST['catalogId']);
		$catalog = new Catalog(array('id' => $id));
		$products = $catalog->getProducts($id);
		echo json_encode($products);
		die();
	}

	public static function saveCatalog() {
		if (!isset($_REQUEST['nonce']) || !wp_verify_nonce($_REQUEST['nonce'], 'shwproduct_save_product')) {
			die('security check failed');
		}

		$id = absint($_REQUEST['catalog_id']);
		$catalog_data = str_replace("shwproduct_", "", $_REQUEST["formdata"]);
		$catalog = new Catalog(array('id' => $id));
		$catalog_data_arr = array();
		parse_str($catalog_data, $catalog_data_arr);
		$updated = $catalog->updateCatalogData($catalog_data_arr);
		//echo $updated;
		if ($updated) {
			echo 1;
			die();
		} else {
			die('something went wrong No 0');
		}
	}

	/* Search Categories*/
	public static function searchCategories() {
		if (!isset($_REQUEST['nonce']) || !wp_verify_nonce($_REQUEST['nonce'], 'shwcatalog_add_category')) {
			die('security check failed');
		}
		$categoryTerm = $_REQUEST["categoryTerm"];
		$category= new Category();
		$found = $category->searchCategories($categoryTerm);
		echo json_encode($found);
		die();
	}

	public static function updateCatalogName() {
		if (!isset($_REQUEST['nonce']) || !wp_verify_nonce($_REQUEST['nonce'], 'shwproduct_save_product')) {
			die('security check failed');
		}
		$id = absint($_REQUEST['id']);
		$catalog = new Catalog(array('id' => $id));
		$updated = $catalog->updateCatalogName($_REQUEST['name']);
		if ($updated) {
			echo 1;
			die();
		} else {
			die('something went wrong No 1');
		}
	}

	public static function updateThemeTitle(){
		if (!isset($_REQUEST['nonce']) || !wp_verify_nonce($_REQUEST['nonce'], 'shwproduct_save_product')) {
			die('security check failed');
		}
		$id = absint($_REQUEST['id']);
		$title = $_REQUEST['name'];
		$theme = new Themes(array('id' => $id));
		$updated = $theme->updateThemeTitle($title);
		if ($updated) {
			echo 1;
			die();
		} else {
			die('something went wrong No 3');
		}
	}
	public static function removetheme() {
		if (!isset($_REQUEST['nonce']) || !wp_verify_nonce($_REQUEST['nonce'], 'shwproduct_save_product')) {
			die('security check failed');
		}

		$id = absint($_REQUEST['id']);

		$theme = new Themes(array('id' => $id));
		$updated = $theme->removeTheme();
		if ($updated) {
			echo 1;
			die();
		} else {
			die('something went wrong No 4');
		}
	}

	public static function addAttributes()	{
		if (!isset($_REQUEST['nonce']) || !wp_verify_nonce($_REQUEST['nonce'], 'shwproduct_save_product')) {
			die('security check failed');
		}
		$attribute = new Attributes();
		$title = $_REQUEST['title'];
		$catalog_id = absint($_REQUEST['catalog_id']);
		$allAttributes = $attribute->getAttributes($catalog_id);

		$createdAttribute = $attribute->addAttribute($catalog_id, $title, 1 - count($allAttributes));

		if($createdAttribute) {
			echo json_encode($attribute->getAttributes($catalog_id));
			die();
		} else {
			die('something went wrong');
		}
	}

	public static function getThemesData() {
		if (!isset($_REQUEST['nonce']) || !wp_verify_nonce($_REQUEST['nonce'], 'shwproduct_save_product')) {
			die('security check failed');
		}
		$theme_id = absint($_REQUEST['theme_id']);
		$getTheme = new Themes();
		$themeById = $getTheme -> getThemeById($theme_id);
	}

	public static function updateThemesData(){

		if (!isset($_REQUEST['nonce']) || !wp_verify_nonce($_REQUEST['nonce'], 'shwproduct_save_product')) {
			die('security check failed');
		}
		$isSave = $_REQUEST['isSave'] === 'true' ? true : false;
		$data = $_REQUEST['data'];
		if ($isSave) {
			$theme_id = absint($_REQUEST['theme_id']);
			$theme = new Themes(array('id'=>$theme_id));
			$theme->setOptions($data)->save($theme_id);
		}
		echo 1;
		die();
	}

	public static function updateOrderAttributes() {
		if (!isset($_REQUEST['nonce']) || !wp_verify_nonce($_REQUEST['nonce'], 'shwproduct_save_product')) {
			die('security check failed');
		}

		$attributeIds = $_REQUEST['attributeIds'];
		$catalog_id = absint($_REQUEST['catalog_id']);
		$update = 0;
		$attribute = new Attributes();
		for ($i = 0; $i < count($attributeIds); $i++) {
			$attr = $attributeIds[$i];
			$update = $attribute->updateOrderAttributes($attr, $catalog_id);
		}
		if($update) {
			echo json_encode($attribute->getAttributes($catalog_id));
			die();
		} else {
			die('something went wrong');
		}
	}

	public static function removeAttributes(){
		if (!isset($_REQUEST['nonce']) || !wp_verify_nonce($_REQUEST['nonce'], 'shwproduct_save_product')) {
			die('security check failed');
		}
		$attribute = new Attributes();

		$attributeId = $_REQUEST['attributeId'];
		$catalog_id = absint($_REQUEST['catalog_id']);

		$removeAttribute = $attribute->removeAttribute($attributeId, $catalog_id );
		if($removeAttribute) {
			echo json_encode($attribute->getAttributes($catalog_id));
			die();
		} else {
			die('something went wrong');
		}
	}

	public static function removeCatalogProductThumbnails(){
		if (!isset($_REQUEST['nonce']) || !wp_verify_nonce($_REQUEST['nonce'], 'shwproduct_save_product')) {
			die('security check failed');
		}

		$catalog_id = absint($_REQUEST['catalog_id']);
		$product_id = absint($_REQUEST['product_id']);
		$thumbnailsId = absint($_REQUEST['thumbnailsId']);
		$catalog = new Catalog(array('id' => $catalog_id));
		$updated = $catalog->removeCatalogProductThumbnails($product_id, $thumbnailsId);
		if ($updated) {
			$data = $catalog->getProductById($product_id);
			echo json_encode($data);
			die();
		} else {
			die('something went wrong');
		}
	}

	public static function removeCatalogProductMainImage(){
		if (!isset($_REQUEST['nonce']) || !wp_verify_nonce($_REQUEST['nonce'], 'shwproduct_save_product')) {
			die('security check failed');
		}

		$catalog_id = absint($_REQUEST['catalog_id']);
		$product_id = absint($_REQUEST['product_id']);
		$removeOnlyMain = absint($_REQUEST['removeOnlyMain']);
		$catalog = new Catalog(array('id' => $catalog_id));
		$updated = $catalog->removeCatalogProductMainImage($product_id, $removeOnlyMain);
		if ($updated) {
			echo json_encode($updated);
			die();
		} else {
			die('You cannot delete the current image');
		}
	}

	public static function removeCatalogItems(){
		if (!isset($_REQUEST['nonce']) || !wp_verify_nonce($_REQUEST['nonce'], 'shwproduct_save_product')) {
			die('security check failed');
		}

		$catalog_id = absint($_REQUEST['catalog_id']);
		$catalog = new Catalog(array('id' => $catalog_id));
		$updated = null;
		if (!empty($_REQUEST["formdata"])) {
			$updated = $catalog->removeCatalogItems($_REQUEST["formdata"]);
		}

		if ($updated) {
			echo 1;
			die();
		} else {
			die('something went wrong');
		}
	}

	public static function removeCatalogs()	{
		if (!isset($_REQUEST['nonce']) || !wp_verify_nonce($_REQUEST['nonce'], 'shwproduct_save_product')) {
			die('security check failed');
		}
		$ids = $_REQUEST["formdata"];

		foreach ($ids as $value) {
			$catalog = new Catalog(array('id' => absint($value)));
			$updated = $catalog->removeCatalog();
		}

		if ($updated) {
			echo 1;
			die();
		} else {
			die('something went wrong');
		}
	}

	public static function AddCatalogProduct(){
		if (!isset($_REQUEST['nonce']) || !wp_verify_nonce($_REQUEST['nonce'], 'shwproduct_save_product')) {
			die('security check failed');
		}

		$catalog_id = absint($_REQUEST['catalog_id']);
		$catalog_data = $_REQUEST["formdata"];
		$catalog = new Catalog();

		$inserted = $catalog->saveProducts($catalog_data, $catalog_id);

		if ($inserted) {
			echo 1;
			die();
		} else {
			die('something went wrong');
		}
	}

	public static function updateCatalogProductOrder(){
		if (!isset($_REQUEST['nonce']) || !wp_verify_nonce($_REQUEST['nonce'], 'shwproduct_save_product')) {
			die('security check failed');
		}

		$catalog_id = absint($_REQUEST['catalog_id']);
		$productIds = $_REQUEST["productIds"];
		$catalog = new Catalog();
		$update = 0;
		for ($i = 0; $i < count($productIds); $i++) {
			$product = $productIds[$i];
			$update = $catalog->updateCatalogProductOrder($product, $catalog_id);
		}
		$products = $catalog->getProducts_($catalog_id);
		echo json_encode($products);
		exit();
	}

	/* Add Category*/
	public static function addCategory() {
		if (!isset($_REQUEST['nonce']) || !wp_verify_nonce($_REQUEST['nonce'], 'shwcatalog_add_category')) {
			die('security check failed');
		}

		$data = $_REQUEST["formdata"];

		$title = str_replace("\'","",$data['catTitle']);
		$title=str_replace("-"," ",$title);

		$slug = $data['slugTitle'];
		$catDescriptiont = $data['catDescription'];

		$category= new Category();
		$saved = $category->saveCategory($title, $slug, $catDescriptiont);
		if($saved) {
			echo json_encode($category->getAllCategoriesBySubCategory());
			die();
		} else {
			die('something went wrong');
		}
	}

	public static function updateCategory(){
		if (!isset($_REQUEST['nonce']) || !wp_verify_nonce($_REQUEST['nonce'], 'shwcatalog_add_category')) {
			die('security check failed');
		}
		$data = $_REQUEST["formdata"];
		$title = $data['catTitle'];
		$slug = $data['slugTitle'];
		$id = $data['id'];
		$category= new Category($id);
		$allData = array(
			'title'=>$title,
			'slug'=>$slug
		);
		$saved = $category->updateCategory($allData, $id);
		if($saved) {
			echo json_encode($category->getAllCategoriesBySubCategory());
			die();
		} else {
			die('something went wrong');
		}
	}

	public static function AddProductThubmnails(){
		if (!isset($_REQUEST['nonce']) || !wp_verify_nonce($_REQUEST['nonce'], 'shwproduct_save_product')) {
			die('security check failed');
		}

		$product_id = absint($_REQUEST['product_id']);
		$catalog_data = $_REQUEST["formdata"];
		$update = $_REQUEST["update"];
		$thumbnailsId = $_REQUEST["thumbnailsId"];
		$catalog = new Catalog();
		$inserted = $catalog->saveProductThubmnails($catalog_data, $product_id, $update, $thumbnailsId);

		if ($inserted) {
			$data = $catalog->getProductById($product_id);
			echo json_encode($data);
			die();
		} else {
			die('something went wrong');
		}
	}

	public static function updateCatalogProductThumbnailsOrder(){
		if (!isset($_REQUEST['nonce']) || !wp_verify_nonce($_REQUEST['nonce'], 'shwproduct_save_product')) {
			die('security check failed');
		}

		$product_id = absint($_REQUEST['product_id']);
		$thumbnailsId = $_REQUEST["thumbnailsId"];
		$catalog = new Catalog();
		$inserted = 0;
		for ($i = 0; $i < count($thumbnailsId); $i++) {
			$thumbnail = $thumbnailsId[$i];
			$inserted = $catalog->updateCatalogProductThumbnailsOrder($product_id, $thumbnail);
		}

		if ($inserted)
		{
			$data = $catalog->getProductById($product_id);
			echo json_encode($data);
			die();
		} else {
			die('something went wrong');
		}
	}

	public function duplicateField(){
		if (!isset($_REQUEST['nonce']) || !wp_verify_nonce($_REQUEST['nonce'], 'shwfrm_duplicate_field')) {
			wp_die(__('Security check failed', SHWFRM_TEXT_DOMAIN));
		}

		if (!isset($_REQUEST['id'])) {
			wp_die(__('missing "id" parameter', SHWFRM_TEXT_DOMAIN));
		}

		$id = $_REQUEST['id'];
		if (absint($id) != $id) {
			wp_die(__('"id" parameter must be non negative integer', SHWFRM_TEXT_DOMAIN));
		}
		$field = Field::get(array('Id' => $id));
		$form = $_REQUEST['form'];
		if (absint($form) != $form) {
			wp_die(__('You are trying to edit a wrong form', SHWFRM_TEXT_DOMAIN));
		}
		$field
			->unsetId()
			->setForm($form);

		$new_field_id = $field->save();
		if ($new_field_id) {

			echo json_encode(array(
				"success" => 1,
				"field" => $new_field_id,
				'settingsBlock' => $field->settingsBlock(),
				'fieldBlock' => $field->fieldBlock(),
			));
			die();

		} else {
			wp_die('something went wrong');
		}
	}
}