<?php
 $data = $theme->getOptionsObject();
 $pluginUrl = \SHWPortfolioCatalog()->pluginUrl();
 $data->pluginUrl = $pluginUrl;
?>
<div id="themePopup" options='<?= json_encode($data);?>'> </div>
