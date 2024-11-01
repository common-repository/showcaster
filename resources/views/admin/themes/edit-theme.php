<?php
global $wpdb;
$id = $theme->getId();
$list = $theme->getThemesUrl();
$new_theme_link = admin_url('admin.php?page=shwportfoliocatalog_themes&task=create_new_theme');
$new_theme_link = wp_nonce_url($new_theme_link, 'shwcatalog_create_new_theme');
$save_data_nonce = wp_create_nonce('shwcatalog_nonce_save_data' . $id);
?>
<div class="showcaster_admin_page_header_wrapper">
    <span class="js_error">If you see this message your website probably has a JavaScript error. This may cause many problems with plugin functionality. In order to fix it please contact us on admin@showcaster.org.</span>
</div>
<ul class="tab_nav_list themes_nav">
    <?php foreach ($list as $val): ?><?php if ($val["id"] == $id): ?>
        <li class='tab_nav_active_tab'>
            <?php if ($id > 3) { ?>
                <a href="javascript:;" class="shwproduct_remove_theme"><i url="<?= $val["url"] ?>" uid="<?php echo $id ?>" class="fa fa-close" aria-hidden="true"></i></a>
            <?php } ?>
            <a href="javascript:;" id="shwproduct_edit_theme" class="product-pencil shwproduct_edit_name"><i url="<?= $val["url"] ?>" uid="<?php echo $id ?>" class="fa fa-pencil" aria-hidden="true"></i></a>
            <input type="hidden" id="shwtheme_id" name="shwtheme_id" value="<?php echo $id ?>">
            <a href="javascript:;" url="<?= $val["url"] ?>" uid="<?php echo $id ?>" class="shwproduct_active_theme_name" id="shwproduct_active_theme"><?= $val["name"] ?></a>
            <input type='text' name='edit_theme_<?php echo $id ?>' value='<?= $val["name"] ?>' class="shwproduct_hidden edit_name_input">
        </li>
    <?php else: ?>
        <li>
            <a href="<?= $val["url"] ?>"><?= $val["name"] ?></a>
        </li>
    <?php endif; ?><?php endforeach; ?>
    <li class="tab_nav_add_new_tab">
        <a href="<?= $new_theme_link ?>"><?php _e('ADD NEW THEME '); ?><i class="fa fa-plus" aria-hidden="true"></i></a>
    </li>
</ul>
<div id="shwproduct_images_form">
    <div class="themeOptionsContainer">
        <div style="clear: both"></div>
        <ul class="editOptions shwtheme_options_list" id="shwtheme_options_list">
            <li class="active">
                <a href="#layout_options" onclick="hidePopUp()" type="layout_options"><?php _e('Layout Options'); ?></a>
            </li>
            <li style="display: none;">
                <a href="#slider_options" onclick="hidePopUp()" type="slider_options"><?php _e('Slider Options'); ?></a>
            </li>
            <li>
                <a href="#grid_item" onclick="hidePopUp()" type="grid_item"><?php _e('Grid Item'); ?></a>
            </li>
            <li>
                <a href="#item_popup" onclick="openPopUp()" type="item_popup"><?php _e('Item Popup'); ?></a>
            </li>
<!--            <li>-->
<!--                <a href="#item_page" onclick="hidePopUp()" type="item_page">--><?php //_e('Item Page'); ?><!--</a>-->
<!--            </li>-->
            <li>
                <a href="#category_buttons" onclick="hidePopUp()" type="category_buttons"><?php _e('Category Buttons'); ?></a>
            </li>
            <li>
                <a href="#ordering_button" onclick="hidePopUp()" type="ordering_button"><?php _e('Ordering Buttons'); ?></a>
            </li>
            <li>
                <a href="#search_field" onclick="hidePopUp()" type="search_field"><?php _e('Search Field'); ?></a>
            </li>
            <li>
                <a href="#load_more" onclick="loadMore()" type="load_more"><?php _e('Load More'); ?></a>
            </li>
        </ul>
    </div>
    <input type="hidden" name="theme_id" value="<?= $id ?>"/>
    <div class="themeContainer" id="layoutOptions"></div>
</div>
<?php \SHWPortfolioCatalog\Helpers\View::render('admin/themes/options-popup.php', array('id' => $id, 'theme' => $theme, "save_data_nonce" => $save_data_nonce)); ?>


