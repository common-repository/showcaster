<?php
\SHWPortfolioCatalog\Helpers\View::renderOnce('frontend/Utils.php');
$index = isset($index_) ? $index_ : 0;
$data = array();
$k = 0;
$post = get_post($postId);
foreach ($AllProductsData as $key => $value) {
    $catClass = '';
    $categorytitle = $value['categories'];
    $i = 0;
    $visibleCategories = array();
    foreach ($value['categories'] as $keyCat => $catTitle) {
        if ($catTitle->is_visible == "on") {
            $visibleCategories[] = $value['categories'][$i];
            $catClass .= spaces($catTitle->title) . ($i != count($value['categories']) - 1 ? " " : "");
        }
        $i++;
    }
    $prodId = $value['result']->prodId;
    $productUrl = $value['result']->guid ? $value['result']->guid : '';
    $productTitle = $value['result']->title ? $value['result']->title : '';
    $productCatalogTitle = $value['result']->catalog_title ? $value['result']->catalog_title : '';
    $productDescription = $value['result']->description ? $value['result']->description : '';
    $productPrice = $value['result']->price ? $value['result']->price : '';
    $productDiscount = $value['result']->discount ? $value['result']->discount : '';
    $createdDate = $value['result']->created_date;
    $thumbnail = $value['thumbnails'];
    $imgurlmain = explode(";", $productUrl);
    $imgurlmain1024 = esc_url($catalog->portfolio_catalog_get_image_by_sizes_and_src($imgurlmain[0], 'large', false));
    $imgurl = explode(";", $productUrl);
    $img = $imgurl[0]; //esc_url($catalog->portfolio_catalog_get_image_by_sizes_and_src($imgurl[0], 'medium', false));
    $thumbnails = thumbnailImg($thumbnail, $catalog);

    $data_ = array(
        'productUrl' => $productUrl,
        'thumbnail' => $thumbnails,
        'prodId' => $prodId,
        'product1024' => $imgurlmain1024,
        'productUrl' => $productUrl,
        'productTitle' => $productTitle,
        'productCatalogTitle' => $productCatalogTitle,
        'index' => $index,
        'productDescription' => stripcslashes($productDescription),
        'productPrice' => $productPrice,
        'productDiscount' => $productDiscount,
        'categories' => $visibleCategories,
        'attributes' => $value['attributes'],
        'url' => setLastChar(get_permalink($post->ID)),
        'productEnableZoom' => $productEnableZoom,
        'productShowAttributes' => $productShowAttributes,
        'productShowCategories' => $productShowCategories
    );
    array_push($data, $data_);
    $popup = $productPopup == 'popup' ? true : false;
?>
    <div class="shwcgrid-item  masonry-item <?php echo $catClass; ?>"  data-category="<?php echo esc_html(str_replace("-","",$catClass)); ?>" id="shwcgrid-item_<?php echo $ns; ?>">
   <div class="thumb_slider">
        <?php if (!empty($thumbnails)) { ?>
            <span class="control_prev">
                    <svg viewBox="0 0 18 18" role="img" aria-label="Previous" focusable="false" style="display: block; fill: rgb(255, 255, 255); height: 24px; width: 24px;">
                        <path fill-rule="evenodd" d="M13.703 16.293a1 1 0 1 1-1.415 1.414l-7.995-8a1 1 0 0 1 0-1.414l7.995-8a1 1 0 1 1 1.415 1.414L6.413 9l7.29 7.293z"></path>
                    </svg>
            </span>
            <span class="control_next">
                    <svg viewBox="0 0 18 18" role="img" aria-label="Next" focusable="false" style="display: block; fill: rgb(255, 255, 255); height: 24px; width: 24px;">
                        <path fill-rule="evenodd" d="M4.293 1.707A1 1 0 1 1 5.708.293l7.995 8a1 1 0 0 1 0 1.414l-7.995 8a1 1 0 1 1-1.415-1.414L11.583 9l-7.29-7.293z"></path>
                    </svg>
            </span>
        <?php } ?>
        <script>
            current_data[<?php echo $index;?>] = <?php echo json_encode($data_);?>;
            alldata[<?php echo $ns;?>] = current_data;
        </script>
        <ul>
            <li>
                <div class="image_block">
                    <div class="bg_wrapper" style="background-image:url(<?php echo $imgurlmain1024 ?>)"></div>
                    <img src="<?php echo $imgurlmain1024; ?>" ns='<?php echo $ns; ?>' data-trackId='<?php echo $index; ?>' onclick="product(this, '<?php echo $productUrl ?>', '<?php echo $productUrl ?>', '<?php echo $imgurlmain1024; ?>', '<?php echo $popup; ?>', '<?php echo $prodId; ?>' )"/>
                </div>
            </li>
            <?php foreach ($thumbnail as $key => $val) {
                $thumbnailUrl = $val->guid;
                ?><?php if ($thumbnailUrl != null) {
                    $imgurl = explode(";", $thumbnailUrl);
                    $img11 = $imgurl[0]; //TODO esc_url($catalog->portfolio_catalog_get_image_by_sizes_and_src($imgurl[0], array(300, 0), false));
                    $imgurlThumb1 = explode(";", $thumbnailUrl);
                    $imgurlThumb10241 = $catalog->portfolio_catalog_get_image_by_sizes_and_src($imgurlThumb1[0], 'large', false);
                    ?>
                    <li>
                        <div class="image_block">
                            <div class="bg_wrapper" style="background-image:url(<?php echo $imgurlThumb10241; ?>)"></div>
                            <img src="<?php echo $imgurlThumb10241; ?>" ns='<?php echo $ns; ?>' data-trackId='<?php echo $index; ?>' onclick="product(this, '<?php echo $thumbnailUrl; ?>', '<?php echo $productUrl ?>','<?php echo $imgurlThumb10241 ?>', '<?php echo $popup; ?>', '<?php echo $prodId; ?>' )"/>
                        </div>
                    </li>
                <?php }
            } ?>
        </ul>
    </div>
    <div class="info_block">
        <?php $priceClass = $productDiscount && $productPrice ? 'price' : 'discont_price'; ?>
        <span ns='<?php echo $ns; ?>' class="title <?= $productTitle == "" ? "hide" : "" ?>" data-trackId='<?php echo $index; ?>' onclick="product(this, '<?php echo $productUrl ?>', '<?php echo $productUrl ?>', '<?php echo $imgurlmain1024; ?>', '<?php echo $popup; ?>', '<?php echo $prodId; ?>' )"><?php echo removeslashes($productTitle); ?> </span>
        <span ns='<?php echo $ns; ?>' class="description <?= $productDescription == "" ? "hide" : "" ?>" data-trackId='<?php echo $index; ?>' onclick="product(this, '<?php echo $productUrl ?>', '<?php echo $productUrl ?>', '<?php echo $imgurlmain1024; ?>', '<?php echo $popup; ?>', '<?php echo $prodId; ?>' )"><?php echo removeslashes($productDescription); ?> </span>
        <span ns='<?php echo $ns; ?>' class="<?php echo $priceClass; ?> <?= $productPrice == "" ? "hide" : "" ?>" data-trackId='<?php echo $index; ?>' onclick="product(this, '<?php echo $productUrl ?>', '<?php echo $productUrl ?>', '<?php echo $imgurlmain1024; ?>', '<?php echo $popup; ?>', '<?php echo $prodId; ?>' )"><?php echo removeslashes($productPrice); ?> </span>
        <span ns='<?php echo $ns; ?>' class="discont_price <?= $productDiscount == "" ? "hide" : "" ?>" data-trackId='<?php echo $index; ?>' onclick="product(this, '<?php echo $productUrl ?>', '<?php echo $productUrl ?>', '<?php echo $imgurlmain1024; ?>', '<?php echo $popup; ?>', '<?php echo $prodId; ?>' )"><?php echo removeslashes($productDiscount); ?> </span>
        <span ns='<?php echo $ns; ?>' class="date" style="display:none"><?php echo esc_html($createdDate); ?></span>
    </div>
</div>
    <?php
    $index++;
}
\SHWPortfolioCatalog\Helpers\View::render('frontend/modal.php', array('data' => $data, 'categoresPositionBtn' => $categoresPositionBtn));
?>
    <div class="currentCount" attr="<?php echo $allCountData; ?>"></div>