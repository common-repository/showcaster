function constructFilter(view) {
    var container_ = jQuery('div[id ^=filter_]');
    var container = jQuery(container_.find('.shwcgrid'));
    jQuery.each(container, function (j) {
        var view = container.parent().attr('class');
        var isotopeObject = {
            itemSelector: '.shwcgrid-item',
            getSortData: {
                title: '.title',
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
    var $grid = jQuery('.shwcgrid').isotope({
        itemSelector: '.shwcgrid-item',
        layoutMode: 'fitRows'
    });
    jQuery('.categories_list').on( 'click', 'button', function() {

        var filterValue = jQuery( this ).attr('data-filter');
        jQuery(this).parents('.button-group').find('.categoriesBtn').removeClass('is-checked');
        jQuery(this).addClass('is-checked');

        // use filterFn if matches value
        filterValue = filterFns[ filterValue ] || filterValue;

        $grid.isotope({ filter: filterValue });
    });

    jQuery.each(sort_buttons, function (index, object) {
        jQuery(object).on('click', 'button', function (e) {
            var $this = jQuery(this), $optionSet = $this.parents('.button-group');
            var sortValue = jQuery(this).attr('data-sort-value');
            var sortByValue = jQuery(this).attr('data-sort-key');
            $optionSet.find('.is-checked').removeClass('is-checked');
            $this.addClass('is-checked');
            if (jQuery(this).attr('id') == "shuffle") {
                if (view == 5) {
                    jQuery(container[index]).isotope('shuffle').isotope({
                        sortBy: 'random',
                        layoutMode: 'masonry'
                    });
                } else {
                    jQuery(container[index]).isotope('shuffle').isotope({
                        sortBy: 'random'
                    });
                }

                updateSortResult(jQuery(container[index]).data('isotope').filteredItems);
                return;
            }
            var page = parseInt(jQuery('.load_more_buttonDefault').attr('page'));
            if (view == 5) {
                jQuery(container[index]).isotope({sortBy: sortValue, layoutMode: 'masonry'});
            } else {
                jQuery(container[index]).isotope({sortBy: sortValue});
            }
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