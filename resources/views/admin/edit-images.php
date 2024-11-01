<?php
global $wpdb;
$new_catalog_link = admin_url('admin.php?page=shwportfolio&task=updateImageInfo&id=' . $id);
?>
<div class="shwproduct-editimages-modal -shwproduct-modal">
    <input type="hidden" name="catalogId" value="<?= $id; ?>"/>
    <div class="shwimage-modal-content">
        <div class="popupContainer" id="shwloadingContainer" style="display:none">
            <div class="loader" id="load"></div>
        </div>
        <div class="shwimage-modal-content-header">
            <div class="shwimage-modal-header-icon"></div>
            <div class="shwimage-modal-header-info">
                <h2><?php _e('Edit Grid Item'); ?></h2>
            </div>
            <div class="shwimage-modal-close">
                <i class="fa fa-close"></i>
            </div>
        </div>
        <div class="shwimage-modal-content-body">
            <form method="post" id="shwimage_edited_images_form" name="shwimage_edited_images_form">
                <div class="edit_scroll_content_wrapper">
                    <input type="hidden" name="shwimage_images_id">
                    <div srcImageUrl1=<?php echo SHWPORTFOLIOCATALOG_IMAGES_URL; ?>></div>
                    <div class="productsContainer">
                        <div class="image-container">
                            <div class="loader" id="loadMainImage" style="display: none;"></div>
                            <img name="image" class="check"/>
                            <div class="<?php echo $type == 'catalog' ? 'shwdelete_mainimage' : 'shwportfolio_delete_mainimage' ?> after"
                                 srcImageUrl=<?php echo SHWPORTFOLIOCATALOG_IMAGES_URL; ?>>
                                <i class="removeImg"></i>
                                <a href="#" class="remove"></a>
                            </div>
                            <div class="<?php echo $type == 'catalog' ? 'shwedit_mainimage' : 'shwportfolio_edit_mainimage' ?> after"
                                 id="_edit_thumbnails">
                                <i class="quickEditImg"></i>
                                <a href="#" class="edit"></a>
                            </div>
                        </div>
                        <div>
                            <div class="thumbnails"
                                 id="<?php echo $type == 'catalog' ? 'editImage' : 'shwportfolioeditImage' ?>"></div>
                            <div class="shwcatalogy_add_new_thumb <?php echo $type == 'catalog' ? 'shwcatalog_add_new_thumb' : 'shwportfolio_add_new_thumb'; ?>"
                                 class="" id="_add_thumbnails">
                                <div class="shwcatalogy_add_new_plus"><span class="plus"></span></div>
                            </div>
                        </div>
                    </div>
                    <div class="productInfo">
                        <input type="text" placeholder="Title" name="productTitle">
                        <textarea type="text" name="productDescription" placeholder="Description"></textarea>
                        <input type="text" placeholder="Product Price" name="productPrice">
                        <input type="text" placeholder="Discount Price" name="discountPrice">
                        <div class="attrCatContainer">
                            <div class="attrCat_scroll attributes <?php if ($type == 'portfolio') { ?>attrHidden <?php } ?>"
                                 id="style-3">
                                <div class="attributeHead">
                                    <h3>Attributes</h3>
                                    <h3>Value</h3>
                                    <h3>Visible</h3>
                                </div>
                                <div class="attributesInfo"></div>
                            </div>
                            <div class="attrCat_scroll <?php if ($type == 'portfolio') { ?> shwcategories_ <?php } else { ?> shwcategories <?php } ?>"
                                 id="style-2">
                                <div class="categoriesHead">
                                    <h3>Categories</h3>
                                    <h3>Visible</h3>
                                </div>
                                <div class="categoriesInfo"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btnContainer">
                    <input type="submit" value="Save" id="shwimage-save-buttom" name="updateData" class="shwproduct-save-buttom">
                </div>
            </form>
        </div>
    </div>
</div>