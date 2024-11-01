<?php
    echo "<style>";
?>

<?php
/* Layout Options*/
$layoutWidth = $propertyOptions->layoutWidth;
$layoutAlign = $propertyOptions->layoutAlign;
$layoutContainerBackground = $propertyOptions->layoutContainerBackground;
$template = $propertyOptions->view;

/* Grid Item */

$gridItemWidth = $propertyOptions->gridItemWidth;
$gridItemDimension = $propertyOptions->gridItemDimension;
$gridItemFixedHeight = $propertyOptions->gridItemFixedHeight;
$gridItemHeight = $propertyOptions->gridItemHeight;
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

//new
$gridItemBackgroundColor = $propertyOptions->gridItemBackgroundColor;
$gridItemBackgroundColorHover = $propertyOptions->gridItemBackgroundColorHover;
$gridItemBackgroundTransparency = $propertyOptions->gridItemBackgroundTransparency;
$gridItemBorderRadius = $propertyOptions->gridItemBorderRadius;
$gridItemMargin = $propertyOptions->gridItemMargin;


?>

.shwc_template {
    width:<?php echo $layoutWidth; ?>% !important;
<?php if($layoutAlign=='center'){ ?> margin:0px auto !important;
<?php } elseif($layoutAlign=='right'){ ?> float:right;
<?php } ?> background:<?php echo $layoutContainerBackground; ?>;
}
/*#############GRID ITEM#############*/

.shwc_pc_wrapper.pc_view4 .shwcgrid-item {
    margin:0px 0px <?php echo $gridItemMargin; ?>px 0px;
<?php
list($r, $g, $b) = sscanf($gridItemBackgroundColor, "#%02x%02x%02x");
$bgGridItemBackgroundTransparency=1-($gridItemBackgroundTransparency/100);
?> background:<?php echo "rgba($r, $g, $b,$bgGridItemBackgroundTransparency)";?>;
}
.shwc_pc_wrapper.pc_view4 .shwcgrid-item.right_image {
<?php
 list($r, $g, $b) = sscanf($gridItemBackgroundColorHover, "#%02x%02x%02x");
 $hoverGridItemBackgroundTransparency=1-($gridItemBackgroundTransparency/100);
?> background:<?php echo "rgba($r, $g, $b,$hoverGridItemBackgroundTransparency)";?>;
}
.shwc_pc_wrapper.pc_view4 .shwcgrid-item .image_block { width:50%; /*FREE VERSION HAS FIXED WIDTH<?php echo $gridItemWidth; ?>%*/ }
.shwc_pc_wrapper.pc_view4 .shwcgrid-item .info_block { width:50%;/*FREE VERSION HAS FIXED WIDTH<?php echo 100-$gridItemWidth; ?>%*/ }


.shwc_pc_wrapper.pc_view4 .shwcgrid-item .title {
<?php if($gridItemShowTitle!="true"){$th=0; ?> display:none;
<?php }else {$th=$gridItemTitle1+2;} ?> font-size:<?php echo $gridItemTitle1; ?>px;
    line-height:<?php echo $gridItemTitle1+2; ?>px;
    color:<?php echo $gridItemTitle2; ?>;
    font-family:<?php echo $gridItemTitle3; ?>;
}
.shwc_pc_wrapper.pc_view4 .shwcgrid-item:hover .title { }
.shwc_pc_wrapper.pc_view4 .shwcgrid-item .description {
<?php if($gridItemShowDescription!="true"){$dh=0; ?> display:none;
<?php } else {$dh=($gridItemDescription1+2)*2;}?> font-size:<?php echo $gridItemDescription1; ?>px;
    /*height:<?php echo ($gridItemDescription1+2)*2; ?>px;*/
    line-height:<?php echo $gridItemDescription1+2; ?>px;
    color:<?php echo $gridItemDescription2; ?>;
    font-family:<?php echo $gridItemDescription3; ?>;
}
.shwc_pc_wrapper.pc_view4 .shwcgrid-item:hover .description { color:#; }
.shwc_pc_wrapper.pc_view4 .shwcgrid-item .price {
<?php
 $ph=0;
if($gridItemShowPrice!="true"){ ?> display:none;
<?php } else {$ph=$gridItemShowPrice1+5;} ?> font-size:<?php echo $gridItemShowPrice1; ?>px;
    line-height:<?php echo $gridItemShowPrice1+2; ?>px;
    color:<?php echo $gridItemShowPrice2; ?>;
    font-family:<?php echo $gridItemShowPrice3; ?>;
}
.shwc_pc_wrapper.pc_view4 .shwcgrid-item:hover .price { color:#; }
.shwc_pc_wrapper.pc_view4 .shwcgrid-item .discont_price {
<?php if($gridItemShowDiscountPrice!="true"){ ?> display:none;
<?php } else {
    if($ph<($gridItemShowDiscountPrice1+2)){$ph=$gridItemShowDiscountPrice1+5;}
 } ?> font-size:<?php echo $gridItemShowDiscountPrice1; ?>px;
    line-height:<?php echo $gridItemShowDiscountPrice1+2; ?>px;
    color:<?php echo $gridItemShowDiscountPrice2; ?>;
    font-family:<?php echo $gridItemShowDiscountPrice3; ?>;
}
.shwc_pc_wrapper.pc_view4 .shwcgrid-item:hover .discont_price { color:#; }
<?php
    echo "</style>";
?>

