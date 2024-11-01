<?php
    echo "<style>";
?>

<?php

/* Load More */
$loadMoreButtonTextSize = $propertyOptions->loadMoreButtonTextSize;
$loadMoreButtonTextColor = $propertyOptions->loadMoreButtonTextColor;
$loadMoreButtonFontStyle = $propertyOptions->loadMoreButtonFontStyle;
$loadMoreButtonPadding = $propertyOptions->loadMoreButtonPadding;
$loadMoreButtonBackgroundColor = $propertyOptions->loadMoreButtonBackgroundColor;
$loadMoreButtonBackgroundColorHover = $propertyOptions->loadMoreButtonBackgroundColorHover;
$loadMoreButtonBorderColor = $propertyOptions->loadMoreButtonBorderColor;
$loadMoreButtonBorderColorHover = $propertyOptions->loadMoreButtonBorderColorHover;
$loadMoreBorderThickness = $propertyOptions->loadMoreBorderThickness;
$loadMoreBorderRadius = $propertyOptions->loadMoreBorderRadius;

?>

.shwc_template_center .load_more_wrapper .load_more_button {
    font-size:<?php echo $loadMoreButtonTextSize; ?>px;
    line-height:<?php echo $loadMoreButtonTextSize+2; ?>px;
    color:<?php echo $loadMoreButtonTextColor; ?>;
    font-family:<?php echo $loadMoreButtonFontStyle ; ?>;
    padding:<?php echo $loadMoreButtonPadding/2; ?>px <?php echo $loadMoreButtonPadding ?>px;
    background:<?php echo $loadMoreButtonBackgroundColor; ?>;
    border-radius:<?php echo $loadMoreBorderRadius; ?>px;
    border:<?php echo $loadMoreBorderThickness; ?>px solid <?php echo $loadMoreButtonBorderColor; ?>;
}

.shwc_template_center .load_more_wrapper .load_more_button:hover {
    background:<?php echo $loadMoreButtonBackgroundColorHover; ?>;
    border-color:<?php echo $loadMoreButtonBorderColorHover; ?>;
}
<?php
    echo "</style>";
?>

