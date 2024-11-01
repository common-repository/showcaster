jQuery('input[name=productOptionsEnableSearch]').keypress(function (e) {
    if (e.which == 13) {
        e.preventDefault();
        loadMoreClickEnter(e);
    }
});
jQuery('#productOptionsEnableSearchBtn').on('click', function (e) {
    e.preventDefault();
    loadMoreClickEnter(e);
    return false;
});
jQuery('.load_more_buttonDefault').on('click', function (e, callback) {
    var limit_ = parseInt(e.currentTarget.getAttribute('limit'));
    var page = parseInt(e.currentTarget.getAttribute('page'));
    var allCount = e.currentTarget.getAttribute('allCount');
    var ns = e.currentTarget.getAttribute('ns');
    var filter = jQuery('button[class$=" categoriesBtn ' + ns + ' is-checked"]');
    var filterdata = filter.attr('data-filter');
    filterdata = filterdata || '*';
    var isMansoryView = jQuery('.shwc_template_center').find('.mansory_wrapper').length != 0;
    var currentIsotope = jQuery('#filter_' + ns);
    var items = isMansoryView ? currentIsotope.find('.shwcgrid-item-view4') : currentIsotope.find('.shwcgrid-item');
    var category = filterdata;
    if (filterdata.substr(0, 1) == ".") {
        category = category.substr(1);
    }
    if (page < parseInt(allCount)) {
        getData(page, limit_, function () {
            page = page + limit_;
            e.currentTarget.setAttribute('page', page);
            if (parseInt(allCount) <= page) {
                if (callback) {
                    callback(page);
                }
                jQuery(e.target).hide();
                return;
            }
            if (callback) {
                callback(page);
            }
        }, ns, category);
    }
});
function loadMoreClickEnter(e) {
    var ns = e.currentTarget.getAttribute('ns');
    var template = jQuery('#shwc_template_' + ns);
    var load_more_buttonDefault = template.find('.load_more_buttonDefault');
    var allCount = load_more_buttonDefault.attr('allCount');
    var loadMore = template.find('.load_more_button');
    var limit = parseInt(load_more_buttonDefault.attr('limit'));
    var defaultLimit = parseInt(load_more_buttonDefault.attr('defaultLimit'));
    load_more_buttonDefault.attr('page', defaultLimit);
    var page = 0;
    var grid = jQuery(template.find('.shwcgrid'));
    grid.html('');
    getData(page, defaultLimit, function (size) {
        if (loadMore) {
            loadMore.show();
        }
        if (size < defaultLimit || size == parseInt(allCount)) {
            loadMore.hide();
        }
    }, ns, '*');
}
function getData(page, limit, callback, ns, category, isEmpty) {
    var template = jQuery('#shwc_template_' + ns);
    var term = template.find('input[name=productOptionsEnableSearch]').val() ? template.find('input[name=productOptionsEnableSearch]').val().trim() : '';
    var catID = template.find('input[name=catalog_id]').val();
    var general_data = {
        action: "shwproduct_search_product",
        nonce: shwProductAjaxObj.productInfo,
        term: term,
        catID: catID,
        limit: limit,
        ns: ns,
        category: category,
        page: page
    };
    jQuery(template.find('.load_more_button')).css('opacity', '0');
    jQuery(template.find('.loadingImage')).css('display', 'block');
    jQuery.ajax({
        url: shwProductAjaxObj.ajaxUrl,
        method: 'post',
        data: general_data,
        dataType: 'html'
    }).always(function () {
        doingAjax = false;
        jQuery(template.find('.load_more_button')).css('opacity', '1');
        jQuery(template.find('.loadingImage')).css('display', 'none');
    }).done(function (response) {
        var response = response != 0 ? response : '';
        var grid = jQuery(template.find('.shwcgrid'));
        if (isEmpty) {
            grid.html('');
        }
        if (response) {
            grid.append(response).isotope('reloadItems');
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
            grid.isotope('reloadItems');
            grid.imagesLoaded(function () {
                grid.isotope(isotopeObject);
            });
            constructCarusel();
            /*if (isEmpty) {
                updateControls();
            }this makes thumb slider slide more than once after category filtering*/
        }
        callback(grid.find('.shwcgrid-item').length);
    }).fail(function () {
    });
}