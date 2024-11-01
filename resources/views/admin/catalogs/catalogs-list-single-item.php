<?php
/**
 * Template for galleries list single item
 *
 * @var $catalog \SHWPortfolioCatalog\Models\Catalog
 */
$catalogId = $catalog->getId();
$editUrl = admin_url('admin.php?page=shwportfolio&task=edit_catalog&id=' . $catalogId);
$editUrl = wp_nonce_url($editUrl, 'edit_catalog_' . $catalogId);
$removeUrl = admin_url('admin.php?page=shwportfolio&task=remove_catalog&id=' . $catalogId);
$removeUrl = wp_nonce_url($removeUrl, 'shwportfoliocatalogy_remove_catalog_' . $catalogId);
$duplicateUrl = admin_url('admin.php?page=shwportfolio&task=duplicate_catalog&id=' . $catalogId);
$duplicateUrl = wp_nonce_url($duplicateUrl, 'shwportfolio_duplicate_catalog_' . $catalogId);
use SHWPortfolioCatalog\Controllers\Frontend\CatalogPreviewController as Preview;

?>
<tr>
    <td class="form-id">
        <input type="checkbox" class="item-checkbox" name="items[]" value="<?php echo $catalogId; ?>">
    </td>
    <td class="form-name">
        <a href="<?php echo $editUrl; ?>"><?php echo esc_html(stripslashes($catalog->getName())); ?></a>
    </td>
    <td class="form-fields">
        <?php echo $catalog->getItemsCount(); ?>
    </td>
    <td class="form-shortcode">[showcaster id="<?php echo $catalogId; ?>"]</td>
    <td class="form-actions">
        <a class="shwfrm_edit_form" title="Settings" href="<?php echo $editUrl; ?>">
            <i class="shwicon shwicon-setting" aria-hidden="true"></i>
        </a>
        <a class="shwfrm_duplicate_form" title="Dublicate" href="<?php echo $duplicateUrl; ?>">
            <i class="shwicon shwicon-duplicate" aria-hidden="true"></i>
        </a>
        <a class="shwfrm_delete_form"  title="Delete" href="<?php echo $removeUrl; ?>">
            <i class="shwicon shwicon-remove" aria-hidden="true"></i>
        </a>
        <a class="shwfrm_preview_form" title="Preview" target="_blank" href="<?php echo Preview::previewUrl($catalog->getId(), false); ?>">
            <i class="shwicon shwicon-eye" aria-hidden="true"></i>
        </a>
    </td>
</tr>

