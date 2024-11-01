jQuery(document).ready(function () {
    jQuery('#shwg_catalog_insert').on('click', function () {
        var id = jQuery('#shwg_catalog_select option:selected').val();
        window.send_to_editor('[showcaster id=\"' + id + '\"]');
        tb_remove();
        return false;
    });
});
