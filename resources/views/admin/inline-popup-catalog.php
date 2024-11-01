<form class="shwc_catalog_shortcode_form" method="post" action="">
    <h3 class="heading"><?= _e('Select The Grid To Embed', 'shwcatalog'); ?></h3>
    <select id="shwg_catalog_select" class="catalog_selectbox">
        <?php
        foreach ($catalogs as $catalog) {
            ?>
            <option value="<?php echo $catalog->getId(); ?>"><?php echo $catalog->getName(); ?></option>
            <?php
        }
        ?>
    </select>
    <button class='shortcode_button insert' id='shwg_catalog_insert'><?php _e('Insert', SHWPORTFOLIOCATALOG_TEXT_DOMAIN); ?></button>
    <button class='shortcode_button cancel' id='shwg_catalog_cancel'><?php _e('Cancel', SHWPORTFOLIOCATALOG_TEXT_DOMAIN); ?></button>
</form>
