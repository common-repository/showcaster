<?php

namespace SHWPortfolioCatalog\Controllers\Frontend;

use SHWPortfolioCatalog\Models\Catalog;

class AjaxController
{

	public static function init()
	{
		add_action('wp_ajax_nopriv_shwproduct_search_product', array(__CLASS__, 'searchProduct'));
		add_action('wp_ajax_shwproduct_search_product', array(__CLASS__, 'searchProduct'));
	}

	public static function searchProduct()
	{
		if (!isset($_REQUEST['nonce']) || !wp_verify_nonce($_REQUEST['nonce'], 'productInfo')) {
			die('security check failed');
		}

		$term = $_REQUEST['term'];
		$catID = absint($_REQUEST['catID']);
		$limit = absint($_REQUEST['limit']);
		$page = absint($_REQUEST['page']);
		$catalogAllProductsData = array();
        $ns = absint($_REQUEST['ns']);
        $categoryTitle = $_REQUEST['category'];

		$catalog = new Catalog(array('id'=>$catID));
		$catalogOptions = $catalog -> getProductSettings($catID); // CatalogOptions
        $productOptionsEnableSearch = $catalogOptions['productOptionsEnableSearch']['value'] ? $catalogOptions['productOptionsEnableSearch']['value'] : 'on';
        $productOptionsactivateLoadMore = $catalogOptions['productOptionsactivateLoadMore']['value'] ? $catalogOptions['productOptionsactivateLoadMore']['value'] : 'on';
        $productEnableCategoriesFilter = $catalogOptions['productEnableCategoriesFilter']['value'] ? $catalogOptions['productEnableCategoriesFilter']['value'] : 'on';
        $productEnableOrderingButtons = $catalogOptions['productEnableOrderingButtons']['value'] ? $catalogOptions['productEnableOrderingButtons']['value'] : 'on';
        $productPopup = $catalogOptions['productPopup']['value'] ? $catalogOptions['productPopup']['value'] : 'popup';
        $productEnableZoom = $catalogOptions['productEnableZoom']['value'] ? $catalogOptions['productEnableZoom']['value'] : 'on';
        $productEnableLightbox = $catalogOptions['productEnableLightbox']['value'] ? $catalogOptions['productEnableLightbox']['value'] : 'on';
        $productShowCategories = $catalogOptions['productShowCategories']['value'] ? $catalogOptions['productShowCategories']['value'] : 'on';
        $productShowAttributes = $catalogOptions['productShowAttributes']['value'] ? $catalogOptions['productShowAttributes']['value'] : 'off';

        $productOptionsactivateScroll = "on"; // ToDO

        $theme_id = $catalogOptions['productOptionTheme']['theme_id'];
        if ($theme_id) {
            $theme = new \SHWPortfolioCatalog\Models\Themes(array('id'=>$theme_id));
            $propertyOptions = $theme->getOptionsObject();
        }
        $template = $propertyOptions->view;
        $categoryButtonsPositionBtn = $propertyOptions->categoresPositionBtn; // $btnPosition
        $orderingButtonsPositionBtn = $propertyOptions->orderingButtonsPositionBtn;
        $searchFieldPosition = $propertyOptions->searchFieldPosition; // $btnPosition
		$catalogProducts = $categoryTitle == '*' ? $catalog -> getSearchProducts($catID, $term, $page, $limit)
                                                 : $catalog -> getSearchProductsByCategories($catID, $term, $page, $limit, $categoryTitle); //Catalog Products By Id
        $allCatalogProducts = $categoryTitle == '*' ? $catalog -> getSearchProducts($catID, $term, -1, -1)
                                                    : $catalog -> getSearchProductsByCategories($catID, $term, -1, -1, $categoryTitle); //Catalog Products By Id
        $category = new \SHWPortfolioCatalog\Models\Category();
        $categories = $category->getCategories(true,false);
        foreach ($catalogProducts as $key =>$value) {
            $prodId = $value->prodId;
            $thumbnails = $catalog->getProductByIdWithoutMain($prodId);
            $catalogCategories = $catalog -> getCatalogProductCategories($prodId);
            $catalogproductAttributes = $catalog ->getCatalogProductAtrributes($prodId); //Catalog Products By Id
            $isFound = false;
            array_push($catalogAllProductsData, array('result' => $value, 'thumbnails' => $thumbnails,
                'categories' => $catalogCategories, 'attributes' => $catalogproductAttributes));
        }
        $url     = wp_get_referer();
        $postId = url_to_postid($url);
        // $productData
        $productInfoArray = array(
            'catID'=>$catID,
            'options'=>$propertyOptions,
            'AllProductsData' => $catalogAllProductsData,
            'allCountData' => count($allCatalogProducts),
            'productOptionsEnableSearch'=>$productOptionsEnableSearch,
            'productOptionsactivateLoadMore' => $productOptionsactivateLoadMore,
            'productOptionsactivateScroll' => $productOptionsactivateScroll,
            'productEnableCategoriesFilter'=>$productEnableCategoriesFilter,
            'productEnableOrderingButtons'=>$productEnableOrderingButtons,
            'catalog' => $catalog,
            'index_' => $page,
            'categoresPositionBtn' => $categoryButtonsPositionBtn,
            'orderingPositionBtn' => $orderingButtonsPositionBtn,
            'productPopup' => $productPopup,
            'productEnableZoom' => $productEnableZoom,
            'productEnableLightbox' => $productEnableLightbox,
            'productShowCategories' => $productShowCategories,
            'productShowAttributes' => $productShowAttributes,
            'searchPosition' => $searchFieldPosition,
            'catalogProducts' => $catalogProducts,
            'template' => $template,
            'categories' => $categories,
            'postId' => $postId,
            'ns' =>$ns
        );
        $tempCss = \SHWPortfolioCatalog\Helpers\View::render('frontend/templates/styles/template-' . $template . '.css.php', array('propertyOptions' => $propertyOptions, 'ns' => $ns, ));
        $item_popup = \SHWPortfolioCatalog\Helpers\View::render('frontend/options/item_popup.css.php', array('propertyOptions' => $propertyOptions, 'ns' => $ns, ));
        $item_page = \SHWPortfolioCatalog\Helpers\View::render('frontend/options/item_page.css.php', array('propertyOptions' => $propertyOptions, 'ns' => $ns, ));
        $category_buttons = \SHWPortfolioCatalog\Helpers\View::render('frontend/options/category_buttons.css.php', array('propertyOptions' => $propertyOptions, 'ns' => $ns, ));
        $ordering_buttons = \SHWPortfolioCatalog\Helpers\View::render('frontend/options/ordering_buttons.css.php', array('propertyOptions' => $propertyOptions, 'ns' => $ns, ));
        $search_field =  \SHWPortfolioCatalog\Helpers\View::render('frontend/options/search_field.css.php', array('propertyOptions' => $propertyOptions, 'ns' => $ns, ));
        $load_more = \SHWPortfolioCatalog\Helpers\View::render('frontend/options/load_more.css.php', array('propertyOptions' => $propertyOptions, 'ns' => $ns, ));
        $res = \SHWPortfolioCatalog\Helpers\View::render('frontend/templates/template-'.$template.'-1.php', $productInfoArray);
        die();
	}
}