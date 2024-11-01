var shwproductModalProduct = {
    show: function (elementId, args) {
        var el = jQuery('.' + elementId);
        if (el.length) {
            el.css('display', 'block');
        }
    },
    hide: function (elementId) {
        var el = jQuery('.' + elementId);
        el.css('display', 'none');
    }
};
jQuery(document).ready(function () {
    jQuery('body').on('click', '.-shwimage-modal-close', function () {
        shwproductModalProduct.hide(jQuery(this).closest('.-shwproducty-modal').attr('id'));
    });
});