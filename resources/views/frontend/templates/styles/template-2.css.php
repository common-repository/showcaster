<?php
    echo "<style>";
?>

<?php
/* Layout Options*/

$layoutWidth = $propertyOptions->layoutWidth;
$layoutAlign = $propertyOptions->layoutAlign;
$layoutContainerBackground = $propertyOptions->layoutContainerBackground;
$template = $propertyOptions->view;

/* Slider Item */

$gridItemWidth = $propertyOptions->gridItemWidth;
//$gridItemDimension = $gridItemDimension->gridItemDimension;
$gridItemFixedHeight = $propertyOptions->gridItemFixedHeight;
$gridItemHeight = $propertyOptions->gridItemHeight;

//new
$gridItemBackgroundColor = $propertyOptions->gridItemBackgroundColor;
$gridItemBackgroundColorHover = $propertyOptions->gridItemBackgroundColorHover;
$gridItemBackgroundTransparency = $propertyOptions->gridItemBackgroundTransparency;
$gridItemBorderRadius = $propertyOptions->gridItemBorderRadius;
$gridItemMargin = $propertyOptions->gridItemMargin;

$gridItemShowTitle = $propertyOptions->gridItemShowTitle;
$gridItemTitle1 = $propertyOptions->gridItemTitle1;
$gridItemTitle2 = $propertyOptions->gridItemTitle2;
$gridItemTitle3 = $propertyOptions->gridItemTitle3;
$gridItemShowDescription = $propertyOptions->gridItemShowDescription;
$gridItemDescription1 = $propertyOptions->gridItemDescription1;
$gridItemDescription2 = $propertyOptions->gridItemDescription2;
$gridItemDescription3 = $propertyOptions->gridItemDescription3;
$gridItemShowPrice = $propertyOptions->gridItemShowPrice;
$gridItemShowPrice1 = $propertyOptions->gridItemShowPrice1;
$gridItemShowPrice2 = $propertyOptions->gridItemShowPrice2;
$gridItemShowPrice3 = $propertyOptions->gridItemShowPrice3;
$gridItemShowDiscountPrice = $propertyOptions -> gridItemShowDiscountPrice;
$gridItemShowDiscountPrice1 = $propertyOptions->gridItemShowDiscountPrice1;
$gridItemShowDiscountPrice2 = $propertyOptions->gridItemShowDiscountPrice2;
$gridItemShowDiscountPrice3 = $propertyOptions->gridItemShowDiscountPrice3;

/*Slider Options*/

$sliderEnableArrows = $propertyOptions->sliderEnableArrows;
$sliderArrowsColor = $propertyOptions -> sliderArrowsColor;
$sliderArrowsColorHover = $propertyOptions -> sliderArrowsColorHover;
$sliderEnableDots = $propertyOptions->sliderEnableDots;
$sliderDotsColor = $propertyOptions->sliderDotsColor;
$sliderDotsColorActive = $propertyOptions->sliderDotsColorActive;
$sliderSlidesToShow = $propertyOptions->sliderSlidesToShow;
$sliderSlidesToShowHidden = $propertyOptions->sliderSlidesToShowHidden;
$sliderSlidesToScroll = $propertyOptions->sliderSlidesToScroll;
$sliderAutoPlay = $propertyOptions->sliderAutoPlay;
$sliderScrollSpeed = $propertyOptions->sliderScrollSpeed;
$sliderArrowsColor = $propertyOptions->sliderArrowsColor;
$sliderArrowsColorHover = $propertyOptions->sliderArrowsColorHover;
$gridItemWidth= $propertyOptions->gridItemWidth;

?>

.shwc_template
width:<?php echo $layoutWidth; ?>% !important;
<?php if($layoutAlign=='center'){ ?> margin:0px auto !important;
<?php } elseif($layoutAlign=='right'){ ?> float: right ;
<?php } ?> background:<?php echo $layoutContainerBackground; ?>;
}

/*##################SLIDER ITEM#################*/

.shwc_pc_wrapper.pc_view2 .slider_wrapper {
<?php if($sliderEnableArrows!="true"){
    echo 'padding:0px;';
}?>
}
.slick-prev, .slick-next {
<?php if($sliderEnableArrows!="true"){
    echo 'display:none !important;';
}?>
}


.slick-prev:before, .slick-next:before { color:<?php echo $sliderArrowsColor; ?>; }
.slick-prev:hover:before, .slick-next:hover:before { color:<?php echo $sliderArrowsColorHover; ?>; }
.slick-dots li button:before { color:<?php echo $sliderDotsColor; ?>; }
.slick-dots li.slick-active button:before { color:<?php echo $sliderDotsColorActive; ?>; }
/*SLIDER ITEM*/

.shwc_pc_wrapper.pc_view2 .slider_item {
<?php
   list($r, $g, $b) = sscanf($gridItemBackgroundColor, "#%02x%02x%02x");
   $bgGridItemBackgroundTransparency=1-($gridItemBackgroundTransparency/100);
 ?> background:<?php echo "rgba($r, $g, $b,$bgGridItemBackgroundTransparency)";?>;
    border-radius:<?php echo $gridItemBorderRadius;?>px;
}
.shwc_pc_wrapper.pc_view2 .slider_item:hover {
<?php
  list($r, $g, $b) = sscanf($gridItemBackgroundColorHover, "#%02x%02x%02x");
  $hoverGridItemBackgroundTransparency=1-($gridItemBackgroundTransparency/100);
?> background:<?php echo "rgba($r, $g, $b,$hoverGridItemBackgroundTransparency)";?>;
}
.shwc_pc_wrapper.pc_view2 .slick-slide {
    margin:0px <?php echo $gridItemMargin;?>px 0px <?php echo $gridItemMargin;?>px;
}
.shwc_pc_wrapper.pc_view2 .slider_item .image_block {
    height:<?php echo $gridItemHeight; ?>px;
}


.shwc_pc_wrapper.pc_view2 .slider_item .title {
<?php if($gridItemShowTitle!="true"){$th=0; ?> display:none;
<?php }else {$th=$gridItemTitle1+2;} ?> font-size:<?php echo $gridItemTitle1; ?>px;
    line-height:<?php echo $gridItemTitle1+2; ?>px;
    color:<?php echo $gridItemTitle2; ?>;
    font-family:<?php echo $gridItemTitle3; ?>;
}
.shwc_pc_wrapper.pc_view2 .slider_item:hover .title { }
.shwc_pc_wrapper.pc_view2 .slider_item .description {
<?php if($gridItemShowDescription!="true"){$dh=0; ?> display:none;
<?php } else {$dh=($gridItemDescription1+2)*2;}?> font-size:<?php echo $gridItemDescription1; ?>px;
    height:<?php echo ($gridItemDescription1+2)*2; ?>px;
    line-height:<?php echo $gridItemDescription1+2; ?>px;
    color:<?php echo $gridItemDescription2; ?>;
    font-family:<?php echo $gridItemDescription3; ?>;
}
.shwc_pc_wrapper.pc_view2 .slider_item:hover .description { color:#; }

.shwc_pc_wrapper.pc_view2 .slider_item .price {
<?php
 $ph=0;
if($gridItemShowPrice!="true"){ ?> display:none;
<?php } else {$ph=$gridItemShowPrice1+5;} ?> font-size:<?php echo $gridItemShowPrice1; ?>px;
    line-height:<?php echo $gridItemShowPrice1+2; ?>px;
    color:<?php echo $gridItemShowPrice2; ?>;
    font-family:<?php echo $gridItemShowPrice3; ?>;
}
.shwc_pc_wrapper.pc_view2 .slider_item:hover .price { color:#; }

.shwc_pc_wrapper.pc_view2 .slider_item .discont_price {
<?php if($gridItemShowDiscountPrice!="true"){ ?> display:none;
<?php } else {
    if($ph<($gridItemShowDiscountPrice1+2)){$ph=$gridItemShowDiscountPrice1+5;}
 } ?> font-size:<?php echo $gridItemShowDiscountPrice1; ?>px;
    line-height:<?php echo $gridItemShowDiscountPrice1+2; ?>px;
    color:<?php echo $gridItemShowDiscountPrice2; ?>;
    font-family:<?php echo $gridItemShowDiscountPrice3; ?>;
}
.shwc_pc_wrapper.pc_view2 .slider_item:hover .discont_price { color:#; }

.shwc_pc_wrapper.pc_view2 .slider_item .info_block {
<?php
    $infoBlockHeight=$th+$dh+$ph+12;
?>
    height:<?php echo $infoBlockHeight; ?>px;
}
<?php
    echo "</style>";
?>

