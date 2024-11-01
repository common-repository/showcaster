<?php
\SHWPortfolioCatalog\Helpers\View::renderOnce('frontend/Utils.php');
$ns = mt_rand(0, 100000000);
//echo "brr single";
//var_dump($allData);

if (count($allData) > 0) {
    $categories = $allData['categories'];
    $attributes = $allData['attributes'];
    $images = $allData['images'];
    $thumbnails = $allData['thumbnails'];
    $productId = $images->id;
    $options = $allData['options'];
    $productEnableZoom = isset($options['productEnableZoom']) ? $options['productEnableZoom']['value'] : 'on';
    $productShowCategories = isset($options['productShowCategories']['value']) ? $options['productShowCategories']['value'] : 'on';
    $productShowAttributes = isset($options['productShowAttributes']['value']) ? $options['productShowAttributes']['value'] : 'on';
    $productThemeId = isset($options['productOptionTheme']['theme_id']) ? $options['productOptionTheme']['theme_id'] : 'on';
    $catalog = new \SHWPortfolioCatalog\Models\Catalog();
    if ($productThemeId) {
        $theme = new \SHWPortfolioCatalog\Models\Themes(array('id' => $productThemeId));
        $propertyOptions = $theme->getOptionsObject();
    }
    $template = $propertyOptions->view;
    ?><?php \SHWPortfolioCatalog\Helpers\View::render('frontend/templates/styles/template-' . $template . '.css.php', array('propertyOptions' => $propertyOptions)); ?>
    <?php \SHWPortfolioCatalog\Helpers\View::render('frontend/templates/styles/template-' . $template . '.css.php', array('propertyOptions' => $propertyOptions, 'ns' => $ns,)); ?>

    <?php \SHWPortfolioCatalog\Helpers\View::render('frontend/options/item_popup.css.php', array('propertyOptions' => $propertyOptions, 'ns' => $ns,)); ?>

    <?php \SHWPortfolioCatalog\Helpers\View::render('frontend/options/item_page.css.php', array('propertyOptions' => $propertyOptions, 'ns' => $ns,)); ?>

    <?php \SHWPortfolioCatalog\Helpers\View::render('frontend/options/category_buttons.css.php', array('propertyOptions' => $propertyOptions, 'ns' => $ns,)); ?>

    <?php \SHWPortfolioCatalog\Helpers\View::render('frontend/options/ordering_buttons.css.php', array('propertyOptions' => $propertyOptions, 'ns' => $ns,)); ?>

    <?php \SHWPortfolioCatalog\Helpers\View::render('frontend/options/search_field.css.php', array('propertyOptions' => $propertyOptions, 'ns' => $ns,)); ?>

    <?php \SHWPortfolioCatalog\Helpers\View::render('frontend/options/load_more.css.php', array('propertyOptions' => $propertyOptions, 'ns' => $ns,)); ?>
    <?php
    $catCount = getCount($categories);
    $attrCount = getCount($attributes);
    $imgurlmain = explode(";", $images->guid);
    $imgurlmain1024 = esc_url($catalog->portfolio_catalog_get_image_by_sizes_and_src($imgurlmain[0], 'large', false));
    ?>

    <div class="container">
        <div class="shwc_item_page" index="">
            <div class="item_page_content">
                <div class="images_block">
                    <div class="main_image_block">
                        <div class="image_block">
                            <div class="bg_wrapper" style="background-image:url(<?php echo $images->guid; ?>)"></div>
                            <img id="zoom_01<?php echo $productId; ?>" src="<?php echo $imgurlmain1024; ?>" data-zoom-image="<?php echo $images->guid; ?>"/>
                        </div>
                    </div>
                    <div class="thumbs_list_wrap <?php if (count($thumbnails) <= 0) {
                        echo 'hide';
                    } ?>">
                        <ul class="thumbs_list" id="pane-container">
                            <?php $active = 'active'; ?>
                            <?php if (count($thumbnails) > 0) { ?>
                                <li selectedUrl="<?php echo $images->guid; ?>" class="<?php echo $active; ?>" imgurlmain1024="<?php echo $imgurlmain1024; ?>" onclick="selectSingleProduct(this, '<?php echo $productId ?>', '<?php echo $productEnableZoom ?>')">
                                    <div class="image_block">
                                        <div class="bg_wrapper" style="background-image:url(<?php echo $imgurlmain1024; ?>)"></div>
                                        <img src="<?php echo $imgurlmain1024; ?>" alt=""/>
                                    </div>
                                </li>
                            <?php } else { ?>
                                <li selectedUrl="<?php echo $images->guid; ?>" class="<?php echo $active; ?>" imgurlmain1024="<?php echo $imgurlmain1024; ?>" onclick="selectSingleProduct(this, '<?php echo $productId ?>', '<?php echo $productEnableZoom ?>')">
                                    <div class="image_block">
                                        <div class="bg_wrapper" style="background-image:url(<?php echo $imgurlmain1024; ?>)"></div>
                                        <img src="<?php echo $imgurlmain1024; ?>" alt=""/>
                                    </div>
                                </li>
                            <?php } ?>
                            <?php if (!empty($thumbnails)) { ?><?php for ($i = 0; $i < count($thumbnails); $i++) { ?><?php
                                $thumbnailUrl = $thumbnails[$i]->guid;
                                $imgurl = explode(";", $thumbnailUrl);
                                $img11 = esc_url($catalog->portfolio_catalog_get_image_by_sizes_and_src($imgurl[0], 'large', false));
                                $imgurlThumb1 = explode(";", $thumbnailUrl);
                                $imgurlThumb10241 = esc_url($catalog->portfolio_catalog_get_image_by_sizes_and_src($imgurlThumb1[0], 'large', false));
                                ?><?php $active = $images->guid == $thumbnails[$i]->guid ? 'active' : '' ?>
                                <li selectedUrl="<?php echo $thumbnails[$i]->guid; ?>" class="<?php echo $active; ?>" imgurlmain1024="<?php echo $imgurlThumb10241; ?>" onclick="selectSingleProduct(this, '<?php echo $productId ?>', '<?php echo $productEnableZoom ?>')">
                                    <div class="image_block">
                                        <div class="bg_wrapper" style="background-image:url(<?php echo $img11; ?>)"></div>
                                        <img src="<?php echo $img11; ?>" alt=""/>
                                    </div>
                                </li>
                            <?php }
                            } ?>
                        </ul>
                        <ul class="thumbs_nav_list <?php if (count($thumbnails) <= 0) {
                            echo 'hide';
                        } ?>">
                            <li class="active"></li>
                            <?php for ($i = 0; $i < count($thumbnails); $i++) { ?>
                                <li></li>
                            <?php } ?>
                        </ul>
                    </div>
                </div>
                <?php
                //TODO change   logic of the hide class
                $hideClass = '';
                if ($attrCount <= 0 && $catCount <= 0 && $images->title == '' && $images->description == '' && $images->price == '' && $images->discount == '') {
                    $hideClass = ' hide';
                }
                ?>
                <div class="info_block <?php echo $hideClass;; ?>" id="infoBlock">
                    <span class="product_heading <?php if (!$images->title) echo 'hide'; ?>">
                        <?php echo removeslashes($images->title); ?>
                    </span>
                    <div class="info_flex_wrapper">
                        <div class="product_description<?php if (!$images->description) echo ' hide'; ?>">
                            <span class="info_label">Description
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 129 129" enable-background="new 0 0 129 129" width="20px" height="20px">
                                      <g>
                                        <path d="m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z" fill="#cccccc"/>
                                      </g>
                                </svg>
                            </span>
                                <p class="description_content">
                                    <?php echo removeslashes($images->description); ?>
                                </p>
                        </div>
                        <div class="product_price <?php if (!$images->price && !$images->discount) echo 'hide'; ?>">
                            <span class="info_label">Price</span>
                            <span class="old_price">
                            <span class="old_price_inner <?php if ($images->price && !$images->discount) echo 'hide'; ?>"><?php echo removeslashes($images->price); ?></span>
                        </span>
                            <span class="discount_price <?php if (!$images->discount && !$images->price) echo 'hide'; ?>">
                            <?php
                            if (!$images->discount && $images->price) {
                                echo removeslashes($images->price);
                            } else echo removeslashes($images->discount);
                            ?>
                        </span>
                        </div>
                        <?php if (!empty($categories) && $productShowCategories == 'on') { ?>
                            <div class="product_categories <?php if ($catCount <= 0) {
                                echo " hide";
                            } ?>">
                                <span class="info_label">Categories</span>
                                <ul class="categories_list">
                                    <?php $categoryStr = ''; ?>
                                    <?php for ($i = 0; $i < count($categories); $i++) {
                                        if ($categories[$i]->is_visible == 'on') {
                                            $categoryStr .= "<li>" . removeslashes($categories[$i]->title) . "</li> ";
                                        }
                                    } ?><?php echo substr($categoryStr, 0, -1); ?>
                                </ul>
                            </div>
                        <?php } ?>
                        <?php if (!empty($attributes) && $productShowAttributes == 'on') { ?>
                            <div class="attributes_block <?php if ($attrCount <= 0) {
                                echo ' hide';
                            } ?>">
                            <span class="info_label">Attributes<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 129 129" enable-background="new 0 0 129 129" width="20px" height="20px">
                                  <g>
                                    <path d="m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z" fill="#cccccc"/>
                                  </g>
                            </svg></span>
                                <ul class="attributes_list">
                                    <?php for ($i = 0; $i < count($attributes); $i++) {
                                        ?>
                                        <li>
                                            <span class="attr_label"><?php echo removeslashes($attributes[$i]->title); ?> : <?php echo removeslashes($attributes[$i]->value); ?></span>
                                        </li>
                                    <?php } ?>
                                </ul>
                            </div>
                        <?php } ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php
    if ($productEnableZoom == "on") {
        ?>
        <script>
            jQuery(document).ready(function ($) {
                jQuery("#zoom_01<?php echo $productId ?>").elevateZoom({
                    zoomType: "inner",
                    cursor: "crosshair",
                    scrollZoom: true
                });
            });
        </script>
        <?php
    }
}
