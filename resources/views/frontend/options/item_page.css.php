<?php
    echo "<style>";
?>

<?php
/* Item Page */
//$itemPageEnableImageZoom = $propertyOptions->itemPageEnableImageZoom;
$itemPageTitle = $propertyOptions->itemPageTitle;
$itemPageTitleColor = $propertyOptions->itemPageTitleColor;
$itemPageTitleFontStyle = $propertyOptions->itemPageTitleFontStyle;
$itemPageDescription = $propertyOptions->itemPageDescription;
$itemPageDescriptionColor = $propertyOptions->itemPageDescriptionColor;
$itemPageDescriptionFontStyle = $propertyOptions->itemPageDescriptionFontStyle;
$itemPagePrice = $propertyOptions->itemPagePrice;
$itemPagePriceColor = $propertyOptions->itemPagePriceColor;
$itemPagePriceFontStyle = $propertyOptions->itemPagePriceFontStyle;
$itemPageDiscountPrice = $propertyOptions->itemPageDiscountPrice;
$itemPageDiscountPriceColor = $propertyOptions->itemPageDiscountPriceColor;
$itemPageDiscountPriceFontStyle = $propertyOptions->itemPageDiscountPriceFontStyle;
$itemPageLabele = $propertyOptions->itemPageLabele;
$itemPageLabeleColor = $propertyOptions->itemPageLabeleColor;
$itemPageLabeleFontStyle = $propertyOptions->itemPageLabeleFontStyle;
$itemPageAttribute = $propertyOptions->itemPageAttribute;
$itemPageAttributeColor = $propertyOptions->itemPageAttributeColor;
$itemPageAttributeFontStyle = $propertyOptions->itemPageAttributeFontStyle;


/*ITEM POPUP OPTIONS TEMP*/
$itemPopupPopupWidth = $propertyOptions->itemPopupPopupWidth;
$itemPopupDimension = $propertyOptions->itemPopupDimension;
//$itemPopupSizeByPx = $propertyOptions->itemPopupSizeByPx ;
//$itemPopupSizeByPrc = $propertyOptions->itemPopupSizeByPrc;
$itemPopupBackground = $propertyOptions->itemPopupBackground;
$itemPopupOverlayColor = $propertyOptions->itemPopupOverlayColor;
$itemPopupOverlayTransparency = $propertyOptions->itemPopupOverlayTransparency;
$itemPopupIconsColor = $propertyOptions->itemPopupIconsColor;
$itemPopupTitle1 = $propertyOptions->itemPopupTitle1;
$itemPopupTitle2 = $propertyOptions->itemPopupTitle2;
$itemPopupTitle3 = $propertyOptions->itemPopupTitle3;
$itemPopupDescription1 = $propertyOptions->itemPopupDescription1;
$itemPopupDescription2 = $propertyOptions->itemPopupDescription2;
$itemPopupDescription3 = $propertyOptions->itemPopupDescription3;
$itemPopupPrice1 = $propertyOptions->itemPopupPrice1;
$itemPopupPrice2 = $propertyOptions->itemPopupPrice2;
$itemPopupPrice3 = $propertyOptions->itemPopupPrice3;
$itemPopupDiscountPrice1 = $propertyOptions->itemPopupDiscountPrice1;
$itemPopupDiscountPrice2 = $propertyOptions->itemPopupDiscountPrice2;
$itemPopupDiscountPrice3 = $propertyOptions->itemPopupDiscountPrice3;
$itemPopupLabels1 = $propertyOptions->itemPopupLabels1;
$itemPopupLabels2 = $propertyOptions->itemPopupLabels2;
$itemPopupLabels3 = $propertyOptions->itemPopupLabels3;
$itemPopupAttributes1 = $propertyOptions->itemPopupAttributes1;
$itemPopupAttributes2 = $propertyOptions->itemPopupAttributes2;
$itemPopupAttributes3 = $propertyOptions->itemPopupAttributes3;

?>

/*###################ITEM PAGE##################*/

.item_page_content .info_block .product_heading {
    font-size:<?php echo $itemPopupTitle1; ?>px;
    line-height:<?php echo $itemPopupTitle1; ?>px;
    color:<?php echo $itemPopupTitle2; ?>;
    font-family:<?php echo $itemPopupTitle3; ?>;
}
.item_page_content .info_block .description_content {
    font-size:<?php echo $itemPopupDescription1; ?>px;
    line-height:<?php echo $itemPopupDescription1+4; ?>px;
    color:<?php echo $itemPopupDescription2; ?>;
    font-family:<?php echo $itemPopupDescription3; ?>;
}
.item_page_content .info_block .product_price .old_price {
    font-size:<?php echo $itemPopupPrice1; ?>px;
    line-height:<?php echo $itemPopupPrice1+2; ?>px;
    color:<?php echo $itemPopupPrice2; ?>;
    font-family:<?php echo $itemPopupPrice3; ?>;
}
.item_page_content .info_block .product_price .old_price_inner { color:<?php echo $itemPopupPrice2; ?>; }
.item_page_content .info_block .discount_price {
    font-size:<?php echo $itemPopupDiscountPrice1; ?>px;
    line-height:<?php echo $itemPopupDiscountPrice1+2; ?>px;
    color:<?php echo $itemPopupDiscountPrice2; ?>;
    font-family:<?php echo $itemPopupDiscountPrice3; ?>;
}
.item_page_content .info_block .info_label {
    font-size:<?php echo $itemPopupLabels1; ?>px;
    line-height:<?php echo $itemPopupLabels1+2; ?>px;
    color:<?php echo $itemPopupLabels2; ?>;
    font-family:<?php echo $itemPopupLabels3; ?>;
}
.item_page_content .info_block .info_label svg path {
    fill:<?php echo $itemPageLabeleColor; ?>;
}
.item_page_content .info_block .attributes_list li,
.item_page_content .info_block .product_categories .categories_list li {
    font-size:<?php echo $itemPopupAttributes1; ?>px;
    line-height:<?php echo $itemPopupAttributes1+2; ?>px;
    color:<?php echo $itemPopupAttributes2; ?>;
    font-family:<?php echo $itemPopupAttributes3; ?>;
}
@media screen and (max-width:767px) {
    /* IF You Add ItemPageBackgorund option
    .item_page_content,
    .item_page_content .info_block .product_heading,
    .item_page_content .info_block .attributes_block,
    .item_page_content .info_block .product_description {

<?php
           // list($r, $g, $b) = sscanf($itemPageBackground, "#%02x%02x%02x");
           // $r=round($r*97/100);
            //$g=round($g*97/100);
           // $b=round($b*97/100);
        ?>
        border-color:RGB;
    }*/
}
<?php
    echo "</style>";
?>

