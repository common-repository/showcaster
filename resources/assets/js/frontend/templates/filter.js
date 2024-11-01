function constructFilter() {
    var container_ = jQuery('div[id ^=filter_]');
    var container = jQuery(container_.find('.shwcgrid'));
    jQuery.each(container, function (j) {
        var view = container.parent().attr('class');
        var isotopeObject = {
            itemSelector: '.shwcgrid-item',
            getSortData: {
                title: '.title',
                number: '.number parseInt',
                number: '.number parseInt',
                date: function ($elem) {
                    return jQuery($elem).find('.date').text();
                }
            }
        };
        jQuery(this).isotope(isotopeObject);
    });
// filter functions
    var filterFns = {
        // show if number is greater than 50
        numberGreaterThan50: function () {
            var number = jQuery(this).find('.number').text();
            return parseInt(number, 10) > 50;
        },
        // show if name ends with -ium
        ium: function () {
            var name = jQuery(this).find('.name').text();
            return name.match(/ium$/);
        }
    };
    var categories_list = jQuery('div[class$=" categories_list"]');
    var sort_buttons = jQuery('.sort-by-button-group');
    jQuery.each(categories_list, function (index, object) {

        jQuery(object).on('click', 'button', function (e) {
                var filterValue = jQuery(this).attr('data-filter');
                jQuery(this).parents('.button-group').find('.categoriesBtn').removeClass('is-checked');
                var ns = jQuery(this).parents('.categories_list').attr('ns');
                var categoriesBtn = e.currentTarget;
                if (categoriesBtn.getAttribute('class').indexOf('categoriesBtn') > -1) {
                    categoriesBtn.classList.add('is-checked');
                }
                // use filterFn if matches value
                filterValue = filterFns[filterValue] || filterValue;
                var template = jQuery('#shwc_template_' + ns);
                var load_more_buttonDefault = template.find('.load_more_buttonDefault');
                var loadMore = template.find('.load_more_button');
                var limit = parseInt(load_more_buttonDefault.attr('limit'));
                var defaultLimit = parseInt(load_more_buttonDefault.attr('defaultLimit'));
                load_more_buttonDefault.attr('page', defaultLimit);
                var category = filterValue;
                if (filterValue.substr(0, 1) == ".") {
                    category = category.substr(1);
                }
                getData(0, defaultLimit, function (size) {
                    if (loadMore) {
                        loadMore.show();
                    }
                    if (template.find('.currentCount').attr('attr') <= size) {
                        loadMore.hide();
                    }
                }, ns, category, true);
        });
    });
    jQuery.each(sort_buttons, function (index, object) {
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
            var page = parseInt(jQuery('.load_more_buttonDefault').attr('page'));
            jQuery(container[index]).isotope({sortBy: sortValue});
            updateSortResult(jQuery(container[index]).data('isotope').filteredItems);
        });
    });
}

function updateSortResult(shwcgrid_item) {
    jQuery.each( shwcgrid_item, function(index, el ) {
        el.element.classList.remove('right_image');
        if (index%2 == 1) {
            el.element.classList.add('right_image');
        }
    });
}