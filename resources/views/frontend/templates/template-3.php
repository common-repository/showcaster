<script>
    var current_data = [];
    if (typeof(alldata) == "undefined") {
        alldata = {};
    }
</script>
<?php
$path = SHWPortfolioCatalog()->pluginUrl();
\SHWPortfolioCatalog\Helpers\View::renderOnce('frontend/Utils.php');
?>
<?php
if (isset($_GET['task']) === 'product') {
    \SHWPortfolioCatalog\Helpers\View::render('frontend/single.php', array('AllProductsData' => $AllProductsData, 'ns' => $ns));
} else {
    ?>
    <div class="shwc_pc_wrapper pc_view3" id="filter_<?php echo $ns; ?>">
        <div class="shwcgrid">
            <?php
            $productInfoArray = array(
                'catID' => $catID,
                'options' => $options,
                'AllProductsData' => $AllProductsData,
                'allCountData' => $allCountData,
                'productOptionsEnableSearch' => $productOptionsEnableSearch,
                'productOptionsactivateLoadMore' => $productOptionsactivateLoadMore,
                'productOptionsactivateScroll' => $productOptionsactivateScroll,
                'productEnableCategoriesFilter' => $productEnableCategoriesFilter,
                'productEnableOrderingButtons' => $productEnableOrderingButtons,
                'catalog' => $catalog,
                'categoresPositionBtn' => $categoresPositionBtn,
                'orderingPositionBtn' => $orderingPositionBtn,
                'productPopup' => $productPopup,
                'productEnableZoom' => $productEnableZoom,
                'productEnableLightbox' => $productEnableLightbox,
                'productShowCategories' => $productShowCategories,
                'productShowAttributes' => $productShowAttributes,
                'searchPosition' => $searchPosition,
                'catalogProducts' => $catalogProducts,
                'template' => $template,
                'categories' => $categories,
                'ns' => $ns,
                'postId'=>$postId,
                'propertyOptions' => $propertyOptions
            );
            \SHWPortfolioCatalog\Helpers\View::render('frontend/templates/template-3-1.php', $productInfoArray);
            ?>
            <div class="clear"></div>
        </div>
    </div>
<?php } ?>
