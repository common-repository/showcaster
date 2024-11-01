<?php
    echo "<style>";
?>

<?php
/* Item Popup */
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

/*#############ITEM POPUP / MODAL################*/

.modal {
<?php
    list($r, $g, $b) = sscanf($itemPopupOverlayColor, "#%02x%02x%02x");
    $stritemPopupOverlayTransparency=1-($itemPopupOverlayTransparency/100);
?> background:<?php echo "rgba($r, $g, $b,$stritemPopupOverlayTransparency)";?>;
}
.modal .modal_content {
    width:<?php echo $itemPopupPopupWidth.$itemPopupDimension; ?>;
    background-color:<?php echo $itemPopupBackground; ?>
}
.modal_content .images_block .thumbs_list_wrap {
<?php
list($r, $g, $b) = sscanf($itemPopupBackground, "#%02x%02x%02x");
$r=round($r*97/100);
$g=round($g*97/100);
$b=round($b*97/100);
?> background:<?php echo "rgb($r, $g, $b)";?>
}
.modal_content .images_block .thumbs_list_wrap::-webkit-scrollbar-track {
<?php
list($r, $g, $b) = sscanf($itemPopupBackground, "#%02x%02x%02x");
$r=round($r*93/100);
$g=round($g*93/100);
$b=round($b*93/100);
?> background:<?php echo "rgb($r, $g, $b)";?>
}
.modal_content .images_block .thumbs_list_wrap::-webkit-scrollbar-thumb {
<?php
list($r, $g, $b) = sscanf($itemPopupBackground, "#%02x%02x%02x");
$r=round($r*85/100);
$g=round($g*85/100);
$b=round($b*85/100);
?> background-color:<?php echo "rgb($r, $g, $b)";?>
}
.modal_content .info_block {
<?php
list($r, $g, $b) = sscanf($itemPopupBackground, "#%02x%02x%02x");
$r=round($r*97/100);
$g=round($g*97/100);
$b=round($b*97/100);
?> background:<?php echo "rgb($r, $g, $b)";?>
}
.modal_content .attributes_block {
<?php
list($r, $g, $b) = sscanf($itemPopupBackground, "#%02x%02x%02x");
$r=$r*90/100;
$g=$g*90/100;
$b=$b*90/100;
?> border-top:3px solid <?php $rgb=sprintf("#%02x%02x%02x",$r,$g,$b); echo $rgb;?>
}
.modal_content .images_block {
<?php
list($r, $g, $b) = sscanf($itemPopupBackground, "#%02x%02x%02x");
$r=$r*90/100;
$g=$g*90/100;
$b=$b*90/100;
?> border-right:3px solid <?php $rgb=sprintf("#%02x%02x%02x",$r,$g,$b); echo $rgb;?>
}
.prev_modal_button svg path,
.next_modal_button svg path,
.close_modal_wrapper svg path {
    fill:<?php echo $itemPopupIconsColor; ?>;
}
.modal .prev_modal_button svg.mobile_prev_modal_svg path,
.modal .next_modal_button svg.mobile_next_modal_svg path {
    fill:<?php echo $itemPopupTitle2; ?>;
}
@media screen and (max-width:767px) {

    .modal_content .images_block .thumbs_list_wrap .thumbs_nav_list li {
    <?php
        list($r, $g, $b) = sscanf($itemPopupBackground, "#%02x%02x%02x");
        $r=round($r*60/100);
        $g=round($g*60/100);
        $b=round($b*60/100);
    ?> background:<?php echo "rgb($r, $g, $b)";?>;
    }
    .modal_content .images_block .thumbs_list_wrap .thumbs_nav_list li.active {
    <?php
      list($r, $g, $b) = sscanf($itemPopupBackground, "#%02x%02x%02x");
      $r=round($r*1/100);
      $g=round($g*1/100);
      $b=round($b*1/100);
    ?> background:<?php echo "rgb($r, $g, $b)";?>;
    }
    .modal_content .info_block .product_price {
    <?php
    list($r, $g, $b) = sscanf($itemPopupBackground, "#%02x%02x%02x");
    $r=round($r*97/100);
    $g=round($g*97/100);
    $b=round($b*97/100);
    ?> background:<?php echo "rgb($r, $g, $b)";?>
    }
    .modal .close_modal_wrapper .shwc_info_menu { color:<?php echo $itemPopupIconsColor; ?>; }
    .modal .close_modal_wrapper {
        background:<?php echo $itemPopupOverlayColor; ?>;
    }
    .mobile_info_menu {
    <?php
      list($r, $g, $b) = sscanf($itemPopupOverlayColor, "#%02x%02x%02x");
    ?> background:<?php echo "rgba($r, $g, $b,0.8)";?>;
    }

}
.modal_content .info_block .product_heading {
    font-size:<?php echo $itemPopupTitle1; ?>px;
    line-height:<?php echo $itemPopupTitle1; ?>px;
    color:<?php echo $itemPopupTitle2; ?>;
    font-family:<?php echo $itemPopupTitle3; ?>;
}
.modal_content .info_block .description_content {
    font-size:<?php echo $itemPopupDescription1; ?>px;
    line-height:<?php echo $itemPopupDescription1+4; ?>px;
    color:<?php echo $itemPopupDescription2; ?>;
    font-family:<?php echo $itemPopupDescription3; ?>;
}
.modal_content .info_block .product_price .old_price {
    font-size:<?php echo $itemPopupPrice1; ?>px;
    line-height:<?php echo $itemPopupPrice1+2; ?>px;
    color:<?php echo $itemPopupPrice2; ?>;
    font-family:<?php echo $itemPopupPrice3; ?>;
}
.modal_content .info_block .product_price .old_price .old_price_inner {
    color:<?php echo $itemPopupPrice2; ?>;
}
.modal_content .info_block .product_price .discount_price {
    font-size:<?php echo $itemPopupDiscountPrice1; ?>px;
    line-height:<?php echo $itemPopupDiscountPrice1+2; ?>px;
    color:<?php echo $itemPopupDiscountPrice2; ?>;
    font-family:<?php echo $itemPopupDiscountPrice3; ?>;
}
.modal_content .info_block .info_label {
    font-size:<?php echo $itemPopupLabels1; ?>px;
    line-height:<?php echo $itemPopupLabels1+2; ?>px;
    color:<?php echo $itemPopupLabels2; ?>;
    font-family:<?php echo $itemPopupLabels3; ?>;
}
.modal_content .info_block .info_label {
    font-size:<?php echo $itemPopupLabels1; ?>px;
    line-height:<?php echo $itemPopupLabels1+2; ?>px;
    color:<?php echo $itemPopupLabels2; ?>;
    font-family:<?php echo $itemPopupLabels3; ?>;
}
.modal_content .info_block .attributes_list li,
.modal_content .info_block .product_categories .categories_list li {
    font-size:<?php echo $itemPopupAttributes1; ?>px;
    line-height:<?php echo $itemPopupAttributes1+2; ?>px;
    color:<?php echo $itemPopupAttributes2; ?>;
    font-family:<?php echo $itemPopupAttributes3; ?>;
}
<?php
    echo "</style>";
?>

