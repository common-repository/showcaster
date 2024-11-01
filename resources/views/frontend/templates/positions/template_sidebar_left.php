<div class="shwc_template_left">

    <?php
    if ($productOptionsEnableSearch == 'on') {
        if ($searchPosition == "left" && $productOptionsEnableSearch == 'on') {
            ?>
            <form class="search_form left">
                <?php \SHWPortfolioCatalog\Helpers\View::render('frontend/templates/positions/search_form.php', array('catID' => $catID, 'loadMoreDefaultImagesCount' => $loadMoreDefaultImagesCount, 'productOptionsactivateLoadMore' => $productOptionsactivateLoadMore, 'ns' => $ns,
                    'catalogProducts' => $catalogProducts, 'searchFieldPlaceholderText' =>$searchFieldPlaceholderText)); ?>
            </form>
            <?php
        }
    }
    if (!empty($categories)) {
        if ($categoresPositionBtn == "left" && $productEnableCategoriesFilter == 'on') {
            ?>
            <div ns="<?php echo $ns; ?>" class="button-group <?php echo $categoresPositionBtn; ?> categories_list">
                <div>
                    <button class="button categoriesBtn <?php echo $ns; ?> is-checked" data-filter="*">show all</button>
                </div>
                <?php foreach ($categories as $catKey => $catValue) {
                    ?>
                    <div>
                        <button class="button categoriesBtn <?php echo $ns; ?>" data-filter=".<?php echo esc_html(str_replace("-","",$catValue->title)); ?>"><?php echo stripslashes(esc_html($catValue->title)); ?></button>
                    </div>
                <?php } ?>
            </div>
            <?php
        }
    }
    if ($productEnableOrderingButtons == 'on' && $orderingPositionBtn == 'left') {
            ?><?php \SHWPortfolioCatalog\Helpers\View::render('frontend/templates/positions/sort_buttons.php'); ?><?php
    } ?>
    <div class="clear"></div>
</div>