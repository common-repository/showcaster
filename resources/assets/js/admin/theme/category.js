var categories_list = jQuery('div[class$=" categories_list"]');
jQuery.each(categories_list, function (index, object) {
    jQuery(object).on('click', 'button', function (e) {
        var $this = jQuery(this), $optionSet = $this.parents('.button-group');
        var sortValue = jQuery(this).attr('data-sort-value');
        var sortByValue = jQuery(this).attr('data-sort-key');
        $optionSet.find('.is-checked').removeClass('is-checked');
        $this.addClass('is-checked');
        if (jQuery(this).attr('id') == "shuffle") {
            jQuery(container[index]).isotope('shuffle').isotope({
                sortBy: 'random'
            });
            updateSortResult(jQuery(container[index]).data('isotope').filteredItems);
            return;
        }
    });
});