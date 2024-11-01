<?php
\SHWPortfolioCatalog\Helpers\View::renderOnce('frontend/Utils.php');
$index = isset($index_) ? $index_ : 0;
$data = array();
$k = 0;
$number = $index;
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
    $img = esc_url($catalog->portfolio_catalog_get_image_by_sizes_and_src($imgurl[0], 'medium', true));
    $thumbnails = array();
    foreach ($thumbnail as $key => $val) {
        $thumbnailUrl = $val->guid;
        $imgurlThumb = explode(";", $thumbnailUrl);
        $imgurlThumb1024 = esc_url($catalog->portfolio_catalog_get_image_by_sizes_and_src($imgurlThumb[0], 'large', false));
        $imgurlThumbFull = esc_url($catalog->portfolio_catalog_get_image_by_sizes_and_src($imgurlThumb[0], 'full', false));
        $imgurlThumb640 = esc_url($catalog->portfolio_catalog_get_image_by_sizes_and_src($imgurlThumb[0], 'large', false));
        array_push($thumbnails, array(
                'imgurlThumb1024' => $imgurlThumb1024,
                'imgurlThumb640' => $imgurlThumb640,
                'id' => $val->id,
                'image_id' => $val->image_id,
                'guid' => $imgurlThumbFull,
                'ordering' => $val->ordering,
                'product_id' => $val->product_id)
        );
    }
    $posts = get_posts(array(
        'post_type' => 'post',
        'post_status' => 'publish',
        'posts_per_page' => 1
    ));
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
    ?><?php $popup = $productPopup == 'popup' ? true : false; ?>
    <div class="shwcgrid-item  masonry-item <?php if ($number % 2 == 1) {
        echo 'right_image';
    }
    $number++; ?> <?php echo $catClass; ?>" data-category="<?php echo esc_html(str_replace("-","",$catClass)); ?>">
        <script>
            current_data[<?php echo $index;?>] = <?php echo json_encode($data_);?>;
            alldata[<?php echo $ns;?>] = current_data;
        </script>
        <div class="image_block" ns='<?php echo $ns; ?>' data-trackId='<?php echo $index; ?>' onclick="product(this, '<?php echo $productUrl ?>', '<?php echo $productUrl ?>', '<?php echo $imgurlmain1024; ?>', '<?php echo $popup; ?>', '<?php echo $prodId; ?>' )">
            <div class="bg_wrapper" style="background-image:url(<?php echo $img ?>)"></div>
            <img src="<?php echo $imgurlmain1024; ?>" ns='<?php echo $ns; ?>' data-trackId='<?php echo $index; ?>' onclick="product(this, '<?php echo $productUrl ?>', '<?php echo $productUrl ?>', '<?php echo $imgurlmain1024; ?>', '<?php echo $popup; ?>', '<?php echo $prodId; ?>' )"/>
        </div>
        <div class="info_block" ns='<?php echo $ns; ?>' data-trackId='<?php echo $index; ?>' onclick="product(this, '<?php echo $productUrl ?>', '<?php echo $productUrl ?>', '<?php echo $imgurlmain1024; ?>', <?php echo $popup; ?>, <?php echo $prodId; ?> )">
            <div class="vertical_center">
                <span ns='<?php echo $ns; ?>' class="title <?= $productTitle == "" ? "hide" : "" ?>" data-trackId='<?php echo $index; ?>' onclick="product(this, '<?php echo $productUrl ?>', '<?php echo $productUrl ?>', '<?php echo $imgurlmain1024; ?>', '<?php echo $popup; ?>', '<?php echo $prodId; ?>' )">
                    <?php echo removeslashes($productTitle); ?>
                </span>
                <span ns='<?php echo $ns; ?>' class="description <?= $productDescription == "" ? "hide" : "" ?>" data-trackId='<?php echo $index; ?>' onclick="product(this, '<?php echo $productUrl ?>', '<?php echo $productUrl ?>', '<?php echo $imgurlmain1024; ?>')">
                     <?php echo removeslashes($productDescription); ?>
                 </span>
                <?php $priceClass = $productDiscount && $productPrice ? 'price' : 'discont_price'; ?>
                <div class="price_wrapper <?= $productPrice == "" && $productDiscount == "" ? "hide" : "" ?>">
                    <span class="<?php echo $priceClass; ?> <?= $productPrice == "" ? "hide" : "" ?>"><?php echo removeslashes($productPrice); ?> </span>
                    <span class="discont_price <?= $productDiscount == "" ? "hide" : "" ?>"><?php echo removeslashes($productDiscount); ?></span>
                </div>
            </div>
            <span class="date" style="display:none"><?php echo esc_html($createdDate); ?></span>
        </div>
    </div>
    <?php
    $index++;
}
\SHWPortfolioCatalog\Helpers\View::render('frontend/modal.php', array('data' => $data, 'categoresPositionBtn' => $categoresPositionBtn));
?>
<div class="currentCount" attr="<?php echo $allCountData; ?>"></div>