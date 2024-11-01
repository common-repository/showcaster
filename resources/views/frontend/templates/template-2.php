<script>
    var current_data = [];
    if (typeof(alldata) =="undefined") {
        alldata ={};
    }

</script>
<?php
    $path =  SHWPortfolioCatalog()->pluginUrl();
    $templatePath = $path."/resources/assets/images/templates/";
    \SHWPortfolioCatalog\Helpers\View::renderOnce('frontend/Utils.php');
    $post = get_post($postId);
    $sliderOptions = json_encode((object) array(
        'sliderEnableArrows' => $propertyOptions->sliderEnableArrows,
        'sliderEnableDots' => $propertyOptions->sliderEnableDots,
        'sliderDotsColor' => $propertyOptions->sliderDotsColor,
        'sliderDotsColorActive' => $propertyOptions->sliderDotsColorActive,
        'sliderSlidesToShow' => $propertyOptions->sliderSlidesToShow,
        'sliderSlidesToScroll' => $propertyOptions->sliderSlidesToScroll,
        'sliderAutoPlay' => $propertyOptions->sliderAutoPlay,
        'sliderScrollSpeed' => $propertyOptions -> sliderScrollSpeed,
        'sliderArrowsColor' => $propertyOptions -> sliderArrowsColor,
        'sliderArrowsColorHover' => $propertyOptions -> sliderArrowsColorHover,
        'gridItemWidth' => $propertyOptions -> gridItemWidth,
        'sliderSlidesToShowHidden' => $propertyOptions -> sliderSlidesToShow
    ));

?>
<div class="shwc_pc_wrapper pc_view2">
    <div class="slider_wrapper">
        <div class="product_slider"  slider-data=<?= $sliderOptions; ?>>
            <?php
            $index = 0;
            $data = array();
            $k = 0;
            foreach ($AllProductsData as $key =>$value) {
                $catClass = '';
                $categorytitle = $value['categories'];
                $i = 0;
                $visibleCategories = array();
                foreach ($value['categories'] as  $keyCat => $catTitle) {
                    if ($catTitle->is_visible == "on") {
                        $visibleCategories[] = $value['categories'][$i];
                        $catClass .= $catTitle->title . ($i != count($value['categories']) - 1 ?  " " : "");
                    }
                    $i++;
                }

                $prodId = $value['result']->prodId;
                $productUrl = $value['result']->guid ? $value['result']->guid  : '';
                $productTitle = $value['result']->title ? $value['result']->title : '';
                $productCatalogTitle = $value['result']->catalog_title ? $value['result']->catalog_title : '';
                $productDescription = $value['result']->description ? $value['result']->description : '';
                $productPrice = $value['result']->price ? $value['result']->price : '';
                $productDiscount = $value['result']->discount ? $value['result']->discount : '';
                $thumbnail = $value['thumbnails'];
                $imgurlmain = explode( ";", $productUrl );
                $imgurlmain1024 = esc_url( $catalog -> portfolio_catalog_get_image_by_sizes_and_src( $imgurlmain[0], 'large', false ));
                $imgurl = explode( ";", $productUrl );
                $img =  esc_url(  $catalog -> portfolio_catalog_get_image_by_sizes_and_src( $imgurl[0], 'medium', false ));

	            $thumbnails = thumbnailImg($thumbnail, $catalog);
                $posts = get_posts(array(
                    'post_type' => 'post',
                    'post_status' => 'publish',
                    'posts_per_page' => 1
                ));
                $data_ = array(
                    'productUrl' => $productUrl,
                    'thumbnail' => $thumbnails,
                    'prodId' => $prodId,
                    'product1024'=> $imgurlmain1024,
                    'productUrl' => $productUrl,
                    'productTitle' => $productTitle,
                    'productCatalogTitle' => $productCatalogTitle,
                    'index'=> $index,
                    'productDescription' => stripcslashes($productDescription),
                    'productPrice' => $productPrice,
                    'productDiscount' => $productDiscount,
                    'categories' => $visibleCategories,
                    'attributes'=>$value['attributes'],
                    'url'  => setLastChar(get_permalink($post->ID)),
                    'productEnableZoom'=>$productEnableZoom,
                    'productShowAttributes' => $productShowAttributes
                );
                array_push($data, $data_);
                ?>
            <div class="slider_item <?php echo $catClass;?>" data-category="<?php echo esc_html(str_replace("-","",$catClass)); ?>" >
                <script>
                    current_data[<?php echo $index;?>] = <?php echo json_encode($data_);?>;
                    alldata[<?php echo $ns;?>] = current_data;
                </script>
                <div class="image_block" ns='<?php echo $ns; ?>' data-trackId='<?php echo $index;?>' >
	                <?php $popup = $productPopup == 'popup' ? true : false; ?>
                    <div class="bg_wrapper" style="background-image:url(<?php echo $imgurlmain1024; ?>)"></div>
                    <div class="vertical_center"><img src="<?php echo $imgurlmain1024 ?>" alt="" ns='<?php echo $ns; ?>' data-trackId='<?php echo $index;?>' onclick="product(this, '<?php echo $productUrl ?>', '<?php echo $productUrl ?>', '<?php echo $imgurlmain1024;?>', '<?php echo $popup; ?>', '<?php echo  $prodId;?>' )"/></div>
                </div>
                <div class="info_block">
	                <?php $priceClass = $productDiscount && $productPrice ? 'price' : 'discont_price'; ?>
                    <span ns='<?php echo $ns; ?>' class="title <?= $productTitle == ""  ? "hide" : "" ?>" data-trackId='<?php echo $index;?>' onclick="product(this, '<?php echo $productUrl ?>', '<?php echo $productUrl ?>', '<?php echo $imgurlmain1024;?>','<?php echo $popup; ?>', '<?php echo  $prodId;?>')"><?php echo removeslashes($productTitle); ?> </span>
                    <span ns='<?php echo $ns; ?>' class="description <?= $productDescription == ""  ? "hide" : "" ?>" data-trackId='<?php echo $index;?>' onclick="product(this, '<?php echo $productUrl ?>', '<?php echo $productUrl ?>', '<?php echo $imgurlmain1024;?>','<?php echo $popup; ?>', '<?php echo  $prodId;?>')"><?php echo removeslashes($productDescription); ?> </span>
                    <span ns='<?php echo $ns; ?>' class="<?php echo $priceClass; ?> <?= $productPrice == ""  ? "hide" : "" ?>" data-trackId='<?php echo $index;?>' onclick="product(this, '<?php echo $productUrl ?>', '<?php echo $productUrl ?>', '<?php echo $imgurlmain1024;?>','<?php echo $popup; ?>', '<?php echo  $prodId;?>')"><?php echo removeslashes($productPrice); ?> </span>
                    <span ns='<?php echo $ns; ?>' class="discont_price <?= $productDiscount == ""  ? "hide" : "" ?>" data-trackId='<?php echo $index;?>' onclick="product(this, '<?php echo $productUrl ?>', '<?php echo $productUrl ?>', '<?php echo $imgurlmain1024;?>','<?php echo $popup; ?>', '<?php echo  $prodId;?>')"><?php echo removeslashes($productDiscount); ?> </span>
                </div>
            </div>
                <?php
                $index++;
            }

            ?>
        </div>
        <div class="clear"></div>
    </div>
    <?php \SHWPortfolioCatalog\Helpers\View::render('frontend/modal.php', array('data'=>$data, 'categoresPositionBtn' => $categoresPositionBtn)); ?>
</div>