<p><p>
    <label for="<?php echo $widget->get_field_id('title'); ?>"><?php _e('Title:'); ?></label>
    <input class="widefat" id="<?php echo $widget->get_field_id('title'); ?>" name="<?php echo $widget->get_field_name('title'); ?>" type="text" value="<?php echo esc_attr($title); ?>"/>
</p>
<label for="<?php echo $widget->get_field_id('shwcatalog_id'); ?>"><?php _e('Select Grid:', SHWPORTFOLIOCATALOG_TEXT_DOMAIN); ?></label>
<select id="<?php echo $widget->get_field_id('shwcatalog_id'); ?>"
        name="<?php echo $widget->get_field_name('shwcatalog_id'); ?>">
    <?php
    $catalogs = \SHWPortfolioCatalog\Models\Catalog::get();
    if ($catalogs) {
        foreach ($catalogs as $catalog) {
            ?>
            <option <?php echo selected($catalogInstance, $catalog->getId()); ?>
                    value="<?php echo $catalog->getId(); ?>">
                <?php echo $catalog->getName(); ?>
            </option>
            <?php
        }
    }
    ?>
</select></p>
