<?php
$catalogs = \SHWPortfolioCatalog\Models\Catalog::get();
?>
<div id="shwcatalog" style="display:none;">
    <?php
    $new_catalog_link = admin_url('admin.php?page=shwportfolio&task=create_new_catalog');
    $new_catalog_link = wp_nonce_url($new_catalog_link, 'shwcatalog_create_new_catalog');
    if ($catalogs && !empty($catalogs)) {
        \SHWPortfolioCatalog\Helpers\View::render('/admin/inline-popup-catalog.php', array('catalogs' => $catalogs));
    } else {
        printf(
            '<p>%s<a class="button" href="%s">%s</a></p>',
            __('You have not created any catalog yet', SHWPORTFOLIOCATALOG_TEXT_DOMAIN) . '<br>',
            $new_catalog_link,
            __('Create New Product', SHWPORTFOLIOCATALOG_TEXT_DOMAIN)
        );
    }
    ?>
</div>
