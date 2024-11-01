<?php
\SHWPortfolioCatalog\Helpers\View::renderOnce('frontend/Utils.php');
$catalogOptions = $catalog->getProductSettings($id); //CatalogOptions
$category = new \SHWPortfolioCatalog\Models\Category();
$categories = $category->getCategories(false,$id);

//var_dump($categories);

$ns = mt_rand(0, mt_getrandmax());

$path = SHWPortfolioCatalog()->pluginUrl();
$productOptionsEnableSearch = $catalogOptions['productOptionsEnableSearch']['value'] ? $catalogOptions['productOptionsEnableSearch']['value'] : 'on';
$productOptionsactivateLoadMore = $catalogOptions['productOptionsactivateLoadMore']['value'] ? $catalogOptions['productOptionsactivateLoadMore']['value'] : 'on';
$productEnableCategoriesFilter = $catalogOptions['productEnableCategoriesFilter']['value'] ? $catalogOptions['productEnableCategoriesFilter']['value'] : 'on';
$productEnableOrderingButtons = $catalogOptions['productEnableOrderingButtons']['value'] ? $catalogOptions['productEnableOrderingButtons']['value'] : 'on';
$productPopup = $catalogOptions['productPopup']['value'] ? $catalogOptions['productPopup']['value'] : 'popup';
$productEnableZoom = $catalogOptions['productEnableZoom']['value'] ? $catalogOptions['productEnableZoom']['value'] : 'on';
$productEnableLightbox = $catalogOptions['productEnableLightbox']['value'] ? $catalogOptions['productEnableLightbox']['value'] : 'on';
$productShowCategories = $catalogOptions['productShowCategories']['value'] ? $catalogOptions['productShowCategories']['value'] : 'on';
$productShowAttributes = $catalogOptions['productShowAttributes']['value'] ? $catalogOptions['productShowAttributes']['value'] : 'on';
$theme_id = $catalogOptions['productOptionTheme']['theme_id'];
$enables = ($productOptionsEnableSearch == 'on' || $productEnableCategoriesFilter == 'on' || $productEnableOrderingButtons == 'on') ? true : false;
if ($theme_id) {
    $theme = new \SHWPortfolioCatalog\Models\Themes(array('id' => $theme_id));
    $propertyOptions = $theme->getOptionsObject();
}
/* Theme Options */
$template = $propertyOptions->view;
$categoryButtonsPositionBtn = $propertyOptions->categoryButtonsPositionBtn;
$orderingButtonsPositionBtn = $propertyOptions->orderingButtonsPositionBtn;
$loadMoreDefaultImagesCount = $propertyOptions->loadMoreDefaultImagesCount;
$loadMorefaultCount = $propertyOptions->loadMorefaultCount;
$searchFieldPosition = $propertyOptions->searchFieldPosition;
$loadMoreText = $propertyOptions->loadMoreButtonText;
$loadMoreLoadingIcons = $propertyOptions->loadMoreLoadingIcons;
$productOptionsactivateScroll = $propertyOptions->loadMoreType == 'scroll' ? 'on' : 'off';
$productOptionsactivateLoadMore = $propertyOptions->loadMoreType == 'button' ? 'on' : 'off';
$searchFieldPlaceholderText = $propertyOptions->searchFieldPlaceholderText;
$allCatalogProducts = $catalog->getSearchProducts($id, '', -1, -1); //Catalog Products By Id
$catalogProducts = $productOptionsactivateLoadMore == "on" && $template != 2 ? $catalog->getSearchProducts($id, '', 0, $loadMoreDefaultImagesCount)
    : ($productOptionsactivateScroll == "on" && $template != 2) ? $catalog->getSearchProducts($id, '', 0, $loadMoreDefaultImagesCount) : $catalog->getProducts_($id); //Catalog Products By Id
if ($template == 2) {
    $productOptionsactivateLoadMore = 'off';
    $productOptionsactivateScroll = 'off';
    $productOptionsEnableSearch = 'off';
    $productEnableOrderingButtons = 'off';
    $productEnableCategoriesFilter = 'off';
}
$catalogAllProductsData = array();
$catalogAllProductsDataWithoutLimit = array();
$allCount = count($catalog->getProducts_($id));
foreach ($allCatalogProducts as $key => $value) {
    $prodId = $value->prodId;
    $thumbnails = $catalog->getProductByIdWithoutMain($prodId);
    $catalogCategories = $catalog->getCatalogProductCategories($prodId);
    $catalogproductAttributes = $catalog->getCatalogProductAtrributes($prodId); //Catalog Products By Id
    array_push($catalogAllProductsDataWithoutLimit, array('result' => $value, 'thumbnails' => $thumbnails,
        'categories' => $catalogCategories, 'attributes' => $catalogproductAttributes));
}
foreach ($catalogProducts as $key => $value) {
    $prodId = $value->prodId;
    $thumbnails = $catalog->getProductByIdWithoutMain($prodId);
    $catalogCategories = $catalog->getCatalogProductCategories($prodId);
    $catalogproductAttributes = $catalog->getCatalogProductAtrributes($prodId); //Catalog Products By Id
    array_push($catalogAllProductsData, array('result' => $value, 'thumbnails' => $thumbnails,
        'categories' => $catalogCategories, 'attributes' => $catalogproductAttributes));
}
// $productData
$productInfoArray = array(
    'catID' => $id,
    'options' => $propertyOptions,
    'AllProductsData' => $catalogAllProductsData,
    'allCountData' => count($catalogAllProductsDataWithoutLimit),
    'productOptionsEnableSearch' => $productOptionsEnableSearch,
    'productOptionsactivateLoadMore' => $productOptionsactivateLoadMore,
    'loadMoreDefaultImagesCount' => $loadMoreDefaultImagesCount,
    'loadMorefaultCount' => $loadMorefaultCount,
    'productOptionsactivateScroll' => $productOptionsactivateScroll,
    'productEnableCategoriesFilter' => $productEnableCategoriesFilter,
    'productEnableOrderingButtons' => $productEnableOrderingButtons,
    'searchFieldPlaceholderText' => $searchFieldPlaceholderText,
    'catalog' => $catalog,
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
    'ns' => $ns,
    'postId' => $postId,
    'propertyOptions' => $propertyOptions
);
?>
<div class="catalog_loading">
    <img style="display: block;" src="<?php echo $path . "/resources/assets/images/icons/loading" . $loadMoreLoadingIcons . ".gif"; ?>"/>
</div>

<div class="shwc_template<?php echo $template == 2 ? 1 : "" ?>" id="shwc_template_<?php echo $ns; ?>">

    <?php
    /*##########LEFT SIDEBAR###########*/
    if (($categoryButtonsPositionBtn == "left" && $productEnableCategoriesFilter=="on")  || ($searchFieldPosition == "left" && $productOptionsEnableSearch=="on") || ($orderingButtonsPositionBtn == "left" && $productEnableOrderingButtons=="on")) {
        if ($enables && $template != 2) {
            ?><?php \SHWPortfolioCatalog\Helpers\View::render('frontend/templates/positions/template_sidebar_left.php', $productInfoArray); ?><?php }
    }
    /*##########RIGHT SIDEBAR###########*/
    if (($categoryButtonsPositionBtn == "right" && $productEnableCategoriesFilter=="on")  || ($searchFieldPosition == "right" && $productOptionsEnableSearch=="on") || ($orderingButtonsPositionBtn == "right" && $productEnableOrderingButtons=="on")) {
        if ($enables && $template != 2) { ?><?php \SHWPortfolioCatalog\Helpers\View::render('frontend/templates/positions/template_sidebar_right.php', $productInfoArray); ?><?php }
    }
    ?>
    <div class="shwc_template_center">
        <?php
        /*##########TOP###########*/
        if  (($categoryButtonsPositionBtn == "top" && $productEnableCategoriesFilter=="on")  || ($searchFieldPosition == "top" && $productOptionsEnableSearch=="on") || ($orderingButtonsPositionBtn == "top" && $productEnableOrderingButtons=="on")){
            if ($enables && $template != 2) {
                ?><?php \SHWPortfolioCatalog\Helpers\View::render('frontend/templates/positions/template_header_top.php', $productInfoArray); ?><?php }
        } ?>
        <!-- TODO change logic-->
        <?php $tmp = $template == 4 ? '5064.53px' : $template == 5 || $template == 1 || $template == 3 ? '366px' : '650px'; ?>
        <?php $style = $template != 2 ? "height:" . $tmp . ";overflow-y:scroll;" : ""; ?>
        <div class="search_template">
            <?php \SHWPortfolioCatalog\Helpers\View::render('frontend/templates/template-' . $template . '.php', $productInfoArray); ?><?php \SHWPortfolioCatalog\Helpers\View::render('frontend/templates/styles/template-' . $template . '.css.php', array('propertyOptions' => $propertyOptions, 'ns' => $ns,)); ?><?php \SHWPortfolioCatalog\Helpers\View::render('frontend/options/item_popup.css.php', array('propertyOptions' => $propertyOptions, 'ns' => $ns,)); ?><?php \SHWPortfolioCatalog\Helpers\View::render('frontend/options/item_page.css.php', array('propertyOptions' => $propertyOptions, 'ns' => $ns,)); ?><?php \SHWPortfolioCatalog\Helpers\View::render('frontend/options/category_buttons.css.php', array('propertyOptions' => $propertyOptions, 'ns' => $ns,)); ?><?php \SHWPortfolioCatalog\Helpers\View::render('frontend/options/ordering_buttons.css.php', array('propertyOptions' => $propertyOptions, 'ns' => $ns,)); ?><?php \SHWPortfolioCatalog\Helpers\View::render('frontend/options/search_field.css.php', array('propertyOptions' => $propertyOptions, 'ns' => $ns,)); ?><?php \SHWPortfolioCatalog\Helpers\View::render('frontend/options/load_more.css.php', array('propertyOptions' => $propertyOptions, 'ns' => $ns,)); ?>
        </div>
        <input type="hidden" name="catalog_id" value="<?php echo $id; ?>">
        <?php
        if ($productOptionsactivateLoadMore == "on" || $productOptionsactivateScroll == "on") {
            ?>
            <div style="<?php if($productOptionsactivateScroll == "on"){ ?> display: none; <?php }?>" class="load_more_wrapper" id="load_more_wrapper" cnt="<?php echo $allCount ?>">
                <img style="display: none;" class="loadingImage" src="<?php echo $path . "/resources/assets/images/icons/loading" . $loadMoreLoadingIcons . ".gif"; ?>"/>
                <span class="load_more_buttonDefault" defaultLimit="<?php echo $loadMoreDefaultImagesCount; ?>" limit="<?php echo $loadMorefaultCount; ?>" page="<?php echo $loadMoreDefaultImagesCount; ?>" ns="<?php echo $ns; ?>" allCount="<?php echo $allCount; ?>">
                      <?php if ($allCount > $loadMoreDefaultImagesCount) { ?>
                          <span class="load_more_button"><?php echo $loadMoreText;?></span><?php } ?></span>
            </div><?php } if ($productOptionsactivateScroll == "on") { ?>
            <script>
                var pageNumber = parseInt(<?php echo $loadMoreDefaultImagesCount;?>);
                function bindScroll() {
                    if (jQuery(window).scrollTop() >= jQuery(document).height() - jQuery(window).height()) {
                        jQuery(".load_more_buttonDefault").trigger("click", function (size) {
                            pageNumber = size;
                        });
                    }
                }
                jQuery(window).scroll(bindScroll);
            </script>
        <?php } ?>
    </div>
</div>