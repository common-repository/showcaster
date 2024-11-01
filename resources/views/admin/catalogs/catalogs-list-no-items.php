<?php
$new_catalog_link = admin_url('admin.php?page=shwportfolio&task=create_new_catalog');
$new_catalog_link = wp_nonce_url($new_catalog_link, 'shwcatalog_create_new_catalog');
?>
<tr>
    <td colspan="5"><?php _e('No Catalog Found.', SHWPORTFOLIOCATALOG_TEXT_DOMAIN); ?>
        <a href="<?php echo $new_catalog_link; ?>"><?php _e('Add New', SHWPORTFOLIOCATALOG_TEXT_DOMAIN); ?></a></td>
</tr>