<?php
    echo "<style>";
?>

<?php

/* Search Field */

$searchFieldPosition = $propertyOptions->searchFieldPosition;
$searchFieldPlaceholderText = $propertyOptions->searchFieldPlaceholderText;
$searchFieldTextFontSize = $propertyOptions->searchFieldTextSize;
$searchFieldTextColor = $propertyOptions->searchFieldTextColor;
$searchFieldTextFontStyle = $propertyOptions->searchFieldTextFontStyle;
$searchFieldBackground = $propertyOptions->searchFieldBackground;
$searchFieldButtonIconColor = $propertyOptions->searchFieldButtonIconColor;
$searchFieldButtonBackground = $propertyOptions->searchFieldButtonBackground;
$searchFieldPadding = $propertyOptions->searchFieldPadding;
$searchFieldBorderColor = $propertyOptions->searchFieldBorderColor;
$searchFieldBorderSize = $propertyOptions->searchFieldBorderSize;
$searchFieldBorderRadius = $propertyOptions->searchFieldBorderRadius;
$searchFieldButtonBackgroundHover = $propertyOptions->searchFieldButtonBackgroundHover;
?>

/*###################SEARCH FIELD##################*/

.shwc_template .search_form {
    border-radius:<?php echo $searchFieldBorderRadius; ?>px;
    height:<?php echo $searchFieldTextFontSize+2+($searchFieldPadding*2) ; ?>px;
}
.shwc_template .search_form input[type="text"] {
    font-size:<?php echo $searchFieldTextFontSize; ?>px !important;
    line-height:<?php echo $searchFieldTextFontSize+2; ?>px !important;
    height:<?php echo $searchFieldTextFontSize+2+($searchFieldPadding*2);?>px !important;
    padding:<?php echo $searchFieldPadding; ?>px <?php echo $searchFieldPadding*2.6+23; ?>px <?php echo $searchFieldPadding; ?>px <?php echo $searchFieldPadding; ?>px;
    color:<?php echo $searchFieldTextColor; ?>;
    font-family:<?php echo $searchFieldTextFontStyle; ?>;
    background:<?php echo $searchFieldBackground; ?>;
    border-color:<?php echo $searchFieldBackground; ?>;
    border-radius:<?php echo $searchFieldBorderRadius; ?>px;

}
.shwc_template .search_form input::-webkit-input-placeholder,
.shwc_template .search_form input:-moz-placeholder {
    <?php
list($r, $g, $b) = sscanf($searchFieldTextColor, "#%02x%02x%02x");
    $hoverGridItemBackgroundTransparency=1-($gridItemBackgroundTransparency/100);
    ?> color:<?php echo "rgba($r, $g, $b,$hoverGridItemBackgroundTransparency)";?>;
}

.shwc_template .search_form button {
    height:<?php echo $searchFieldTextFontSize+2+($searchFieldPadding*2) ; ?>px;
    width:<?php echo $searchFieldPadding*2.6+18; ?>px;
    background:<?php echo $searchFieldButtonBackground; ?>;
}
.shwc_template .search_form button:hover,
.shwc_template .search_form button:focus,
.shwc_template .search_form button:active {
    background:<?php  echo $searchFieldButtonBackgroundHover; ?>;
}

.shwc_template .search_form button svg path {
    fill:<?php echo $searchFieldButtonIconColor; ?>;
}
<?php
    echo "</style>";
?>

