<div class="shwc_template_top">
    <?php
    /* Categories List */
    if (!empty($categories) && $productEnableCategoriesFilter == 'on') {
        if ($categoresPositionBtn == "top") {
            ?>
            <div ns="<?php echo $ns; ?>" class="button-group <?php echo $categoresPositionBtn; ?> categories_list">
                <div>
                    <button class="button categoriesBtn <?php echo $ns; ?> is-checked" data-filter="*">show all</button>
                </div>
                <?php foreach ($categories as $catKey => $catValue) { ?>
                    <div>
                        <button class="button categoriesBtn <?php echo $ns; ?>" data-filter=".<?php echo spaces($catValue->title); ?>"><?php echo $catValue->title; ?></button>
                    </div>
                <?php } ?>
            </div>
            <?php
        }
    }
    if ($productEnableOrderingButtons == 'on') {
        if ($orderingPositionBtn == 'top') {
            ?><?php \SHWPortfolioCatalog\Helpers\View::render('frontend/templates/positions/sort_buttons.php'); ?><?php }
    }
    if ($productOptionsEnableSearch == 'on') {
        if ($searchPosition == "top" && $productOptionsEnableSearch == 'on') {
            ?>
            <form class="search_form">
                <?php \SHWPortfolioCatalog\Helpers\View::render('frontend/templates/positions/search_form.php', array('catID' => $catID,
                    'loadMoreDefaultImagesCount' => $loadMoreDefaultImagesCount,
                    'loadMorefaultCount' => $loadMorefaultCount, 'productOptionsactivateLoadMore' => $productOptionsactivateLoadMore, 'ns' => $ns, 'catalogProducts' => $catalogProducts, 'searchFieldPlaceholderText' =>$searchFieldPlaceholderText)); ?>
            </form>
            <?php
        }
    }
    ?>
   
</div>