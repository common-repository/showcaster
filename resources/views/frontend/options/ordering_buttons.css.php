<?php
    echo "<style>";
?>

<?php

/*  Ordering buttons */

$orderingButtonsPositionBtn = $propertyOptions->orderingButtonsPositionBtn;
$orderingButtonsTextSize = $propertyOptions->orderingButtonsTextSize;
$orderingButtonsTextColor = $propertyOptions->orderingButtonsTextColor;
$orderingButtonsFontStyle = $propertyOptions->orderingButtonsFontStyle;
$orderingButtonsPadding = $propertyOptions->orderingButtonsPadding;
$orderingButtonsGapSpace = $propertyOptions->orderingButtonsGapSpace;
$orderingButtonsBackgroundColor = $propertyOptions->orderingButtonsBackgroundColor;
$orderingButtonsBackgroundColorHover = $propertyOptions->orderingButtonsBackgroundColorHover;
$orderingButtonsStyleButtonOrLink = $propertyOptions->orderingButtonsStyleButtonOrLink;
$orderingButtonsBorderColor = $propertyOptions->orderingButtonsBorderColor;
$orderingButtonsBorderColorHover = $propertyOptions->orderingButtonsBorderColorHover;
$orderingButtonsBorderThickness = $propertyOptions->orderingButtonsBorderThickness;
$orderingButtonsBorderRadius = $propertyOptions->orderingButtonsBorderRadius;


?>

/*###################ORDERING BUTTONS##################*/



.shwc_template .ordering_butons_list > div button {
    font-size:<?php echo $orderingButtonsTextSize; ?>px !important;
    line-height:<?php echo $orderingButtonsTextSize+2; ?>px !important;
    color:<?php echo $orderingButtonsTextColor; ?> !important;
    font-family:<?php echo $orderingButtonsFontStyle; ?> !important;
    padding:<?php echo $orderingButtonsPadding/2; ?>px <?php echo $orderingButtonsPadding ?>px !important;
    background:<?php echo $orderingButtonsBackgroundColor; ?> !important;
<?php
if($orderingButtonsPositionBtn=="top"){?> margin:0px <?php echo $orderingButtonsGapSpace/2; ?>px 0px <?php echo $orderingButtonsGapSpace/2; ?>px !important;
<?php }else {?> margin-bottom:<?php echo $orderingButtonsGapSpace; ?>px !important;
<?php } ?><?php
if($orderingButtonsStyleButtonOrLink=="button"){?> border:<?php echo $orderingButtonsBorderThickness; ?>px solid <?php echo $orderingButtonsBorderColor; ?> !important;
    border-radius:<?php echo $orderingButtonsBorderRadius; ?>px !important;
    text-align:center !important;
<?php }else {?>
    border-bottom:<?php echo $orderingButtonsBorderThickness; ?>px solid <?php echo $orderingButtonsBorderColor; ?> !important;
    border-radius:0px !important;
<?php } ?>
}
.shwc_template .ordering_butons_list > div button:hover,
.shwc_template .ordering_butons_list > div button.is-checked {
    background: <?php echo $orderingButtonsBackgroundColorHover; ?> !important;
    border-color: <?php echo $orderingButtonsBorderColorHover; ?> !important;
}
<?php
    echo "</style>";
?>

