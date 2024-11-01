<?php
    echo "<style>";
?>

<?php

/* Category Buttons */

$categoryButtonsPositionBtn = $propertyOptions->categoryButtonsPositionBtn;
$categoryButtonsTextSize = $propertyOptions->categoryButtonsTextSize;
$categoryButtonsText = $propertyOptions->categoryButtonsText;
$categoryButtonsTextFontStyle = $propertyOptions->categoryButtonsTextFontStyle;
$categoryButtonsPaddingSize = $propertyOptions->categoryButtonsPaddingSize;
$categoryButtonsGapSpaceSize = $propertyOptions->categoryButtonsGapSpaceSize;
$categoryButtonsBackgroundColor = $propertyOptions->categoryButtonsBackgroundColor;
$categoryButtonsBackgroundColorHover = $propertyOptions->categoryButtonsBackgroundColorHover;
$categoryButtonsStyleLinkOrButton = $propertyOptions->categoryButtonsStyleLinkOrButton;
$categoryButtonsBorderColor = $propertyOptions->categoryButtonsBorderColor;
$categoryButtonsBorderColorHover = $propertyOptions->categoryButtonsBorderColorHover;
$categoryButtonsBorderThickness = $propertyOptions->categoryButtonsBorderThickness;
$categoryButtonsBorderRadius = $propertyOptions->categoryButtonsBorderRadius;
?>

/*###################CATEGORY BUTTONS##################*/

.shwc_template .categories_list > div button {
    font-size:<?php echo $categoryButtonsTextSize; ?>px;
    line-height:<?php echo $categoryButtonsTextSize+2; ?>px;
    color:<?php echo $categoryButtonsText; ?>;
    font-family:<?php echo $categoryButtonsTextFontStyle; ?>;
    padding:<?php echo $categoryButtonsPaddingSize/2; ?>px <?php echo $categoryButtonsPaddingSize ?>px;
    background:<?php echo $categoryButtonsBackgroundColor; ?>;
<?php
if($categoryButtonsPositionBtn=="top"){?> margin:0px <?php echo $categoryButtonsGapSpaceSize/2; ?>px 0px <?php echo $categoryButtonsGapSpaceSize/2; ?>px;
<?php }else {?> margin-bottom:<?php echo $categoryButtonsGapSpaceSize; ?>px;
<?php } ?><?php
    if($categoryButtonsStyleLinkOrButton=="button"){?> border:<?php echo $categoryButtonsBorderThickness; ?>px solid <?php echo $categoryButtonsBorderColor; ?>;
    border-radius:<?php echo $categoryButtonsBorderRadius; ?>px;
    text-align:center;
<?php }else {?>
    border-bottom:<?php echo $categoryButtonsBorderThickness; ?>px solid <?php echo $categoryButtonsBorderColor; ?>;
    border-radius:0px !important;
<?php } ?>
}
.shwc_template .categories_list > div button:hover,
.shwc_template .categories_list > div button.is-checked {
    background: <?php echo $categoryButtonsBackgroundColorHover; ?>;
    border-color: <?php echo $categoryButtonsBorderColorHover; ?>;
}
<?php
    echo "</style>";
?>

