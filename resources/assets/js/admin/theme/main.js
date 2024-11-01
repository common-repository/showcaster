String.prototype.stripSlashes = function () {
    if (this == null) {
        return;
    }
    return this.replace(/\\/g, '');
}
function closeModal() {
    jQuery('html').css({"overflow": "auto"});
    shwproductModalProduct.hide('shwc_modal_page');
    var productData = jQuery('.image_block img').attr('data-trackId');
    if (productData) {
        jQuery.removeData(jQuery("#zoom_01" + JSON.parse(productData)['prodId']), 'elevateZoom');//remove zoom instance from image
    }
    jQuery('.zoomContainer').remove();
    jQuery(document).unbind('keyup');
    var gridItem = jQuery('a[href="#grid_item"]');
    jQuery(".editOptions>li.active").removeClass("active");
    gridItem.parent().addClass("active");
    jQuery('.-shwoptions-modal').hide();
    gridItem.removeClass('shwtheme_options_list_visited');
    gridItem.addClass('shwtheme_options_list_active');
    jQuery('#grid_item').show();
    $('.themeContainer').css({
        "min-height": "500px"
    });
}
function openPopUp() {
    jQuery('.themeOptionsContainer').addClass('item_popup');
    shwproductModalProduct.show('shwc_modal_page');
    $('.shwc_modal_page')[0].scrollIntoView();
    $('.themeContainer').css({
        "min-height": "950px"
    });
}

function loadMore() {
    hidePopUp();
    jQuery('#loadingMore').css({
        visibility: 'hidden'
    });
    jQuery('#loadMore').css({
        visibility: 'visible'
    });
}

function hidePopUp() {
    jQuery('.themeOptionsContainer').removeClass('item_popup');
    shwproductModalProduct.hide('shwc_modal_page');
    jQuery('#loadMore').css({
        visibility: 'hidden'
    });
    jQuery('#loadingMore').css({
        visibility: 'hidden'
    });
    closeModal();
    $('.themeContainer').css({
        "min-height": "500px"
    });
}
function htmlEncode(value) {
    return jQuery('<div/>').text(value).html();
}
function isMobile() {
    return jQuery(window).width() <= 767;
}
function constructMasonry() {
    jQuery('.shwcgrid').masonry({
        itemSelector: '.shwcgrid-item',
        itemWidth: '.masonry-item',
        isAnimated: true
    });
}
/*###Layout 1 THUMBNAIL SLIDER ####*/
function constructCarusel() {
    var slideWidth = jQuery(".thumb_slider").parents('.shwcgrid-item').width();
    var slideHeight = jQuery(".thumb_slider").find('ul li').height();
    var liwidth = slideWidth;
    jQuery(".thumb_slider").css({height: slideHeight});
    jQuery(".thumb_slider").each(function () {
        var slideCount = jQuery(this).find('ul li').length;
        var sliderUlWidth = slideCount * slideWidth;
        var slideLeft = 0;
        if (slideCount != "1") {
            slideLeft = slideWidth;
        }
        jQuery(this).find('ul').css({width: sliderUlWidth, marginLeft: -slideLeft});
        jQuery(this).find('ul li:last-child').prependTo(jQuery(this).find('ul'));
    });
    jQuery(".thumb_slider").find('li').css({width: liwidth});
}
function moveLeft(thumbSlider) {
    var slideWidth = thumbSlider.find('ul li').width();
    thumbSlider.find('ul').animate({
        left: +slideWidth
    }, 200, function () {
        thumbSlider.find('ul li:last-child').prependTo(thumbSlider.find('ul'));
        thumbSlider.find('ul').css('left', '');
    });
}
function moveRight(thumbSlider) {
    var slideWidth = thumbSlider.find('ul li').width();
    thumbSlider.find('ul').animate({
        left: -slideWidth
    }, 200, function () {
        thumbSlider.find('ul li:first-child').appendTo(thumbSlider.find('ul'));
        thumbSlider.find('ul').css('left', '');
    });
}
function updateControls() {
    jQuery('.shwc_pc_wrapper').on("click","span.control_prev",function () {
        var thumbSlider = jQuery(this).parents('.thumb_slider');
        moveLeft(thumbSlider);
        return false;
    });
    jQuery('.shwc_pc_wrapper').on("click","span.control_next", function () {
        var thumbSlider = jQuery(this).parents('.thumb_slider');
        moveRight(thumbSlider);
        return false;
    });
    return false;
}
function constructSwipe(images) {
    var IMG_WIDTH = images[0] ? images[0].clientWidth : 645;
    this.currentImg = 0;
    var maxImages = images.length;
    var speed = 500;
    var imgs;
    var swipeOptions = {
        triggerOnTouchEnd: true,
        IMG_WIDTH: IMG_WIDTH,
        maxImages: maxImages,
        speed: speed,
        currentImg: this.currentImg,
        swipeStatus: swipeStatus,
        allowPageScroll: "vertical",
        threshold: 75
    };
    jQuery(function () {
        imgs = jQuery("#pane-container");
        imgs.css("transform", "translate(0px,0)");
        imgs.swipe(swipeOptions);
    });
}
/*###END Layout 1 THUMBNAIL SLIDER ####*/
/*###START SLICK SLIDER ####*/
function updateSlick() {
    var dataSlick = document.getElementsByClassName('product_slider')[0] ? document.getElementsByClassName('product_slider')[0] : null;
    if (dataSlick) {
        var sliderEnableDots = JSON.parse(window.slickData.sliderEnableDots);
        var sliderScrollSpeed = parseInt(window.slickData.sliderScrollSpeed);
        var sliderSlidesToScroll = parseInt(window.slickData.sliderSlidesToScroll);
        var sliderSlidesToShow = parseInt(window.slickData.sliderSlidesToShow);
        var sliderAutoPlay = JSON.parse(window.slickData.sliderAutoPlay);
        var sliderEnableArrows = JSON.parse(window.slickData.sliderEnableArrows);
        if (jQuery('.product_slider').hasClass('slick-initialized')){
            jQuery('.product_slider').slick('unslick');
        }
        jQuery('.product_slider').slick({
            infinite: true,
            variableWidth: false,
            adaptiveHeight: false,
            autoplaySpeed: 3000,
            dots: sliderEnableDots,
            arrows: sliderEnableArrows,
            slidesToShow: sliderSlidesToShow,
            slidesToScroll: sliderSlidesToScroll,
            speed: sliderScrollSpeed,
            autoplay: sliderAutoPlay,
            responsive: [{
                breakpoint: 780,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });
    }
}
updateSlick();
function constructModal(modal, thumbs_list, productData) {
    thumbs_list.html('');
    var thumbs_nav_list = modal.find('.thumbs_nav_list');
    thumbs_nav_list.html('');
    this.selectedProductId = productData['prodId'];
    modal.find('.main_image_block').html(
        '<div class="image_block">' +
        '<div class="bg_wrapper" style="background-image:url(' + productData.name + ')"></div>' +
        '<img  id="zoom_012" src="' + productData.name + '" data-zoom-image="' + productData.name + '" />' +
        '</div>');
    var title = productData.productTitle ? productData.productTitle.stripSlashes() : '';
    var description = productData.productDescription ? productData.productDescription.stripSlashes() : '';
    var price = productData.productPrice != null ? productData.productPrice.stripSlashes() : '';
    var discountPrice = productData.productDiscount ? productData.productDiscount.stripSlashes() : '';
    var productShowAttributes = productData.productShowAttributes;
    var categories = productData.categories || [];
    var attributes = productData.attributes || [];
    var categoryStr = "";
    var attributeStr = "";
    modal.find('.product_heading').text(title).html();
    modal.find('.product_description p').html(description);
    if (title) {
        modal.find('.product_heading').removeClass('hide');
    } else {
        modal.find('.product_heading').addClass('hide');
    }
    if (description) {
        modal.find('.product_description').removeClass('hide');
    } else {
        modal.find('.product_description').addClass('hide');
    }
    if (price && discountPrice) {
        modal.find('.product_price').removeClass('hide');
        modal.find('.old_price_inner').removeClass('hide');
        modal.find('.old_price_inner').text(price).html();
        modal.find('.discount_price').text(discountPrice).html();
    } else if ((price && !discountPrice) || (!price && discountPrice)) {
        var price_ = price ? price : discountPrice;
        modal.find('.old_price_inner').addClass('hide');
        modal.find('.discount_price').text(price_).html();
    } else {
        modal.find('.product_price').addClass('hide')
    }
    for (var i = 0; i < categories.length; i++) {
        var category = categories[i];
        var categoryLi = '<li>' + category.title + '</li>';
        var is_visisble = category.is_visible == "on";
        if (is_visisble) {
            categoryStr += categoryLi;
        }
    }
    var countAttr = 0;
    if (productShowAttributes == 'on') {
        for (var i = 0; i < attributes.length; i++) {
            var attribute = attributes[i];
            var is_visisble = attribute.is_visible == null || attribute.is_visible == "on";
            if (is_visisble) {
                countAttr++;
                attributeStr += '<li><span class="attr_label">' + attribute.title + ':</span>' + (attribute.value ? attribute.value : "") + '</li>';
            }
        }
    }
    if (countAttr <= 0) {
        modal.find('.attributes_block').addClass('hide')
    } else {
        modal.find('.attributes_block').removeClass('hide')
    }
    jQuery(window).resize(function () {
        if (isMobile()) {
            modal.find('.mobile_info_menu .menu_product_description').html('<span>' + htmlEncode(productData.productDescription) + '</span>');
            modal.find('.mobile_info_menu .menu_attributes_block').html('<ul>' + attributeStr + '</ul>');
            if (productData.thumbnail.length <= 0) {
                modal.find('.thumbs_nav_list').addClass('hide');
            } else {
                modal.find('.thumbs_nav_list').removeClass('hide');
            }
        }
    })
    if (isMobile()) {
        modal.find('.mobile_info_menu .menu_product_description').html('<span>' + htmlEncode(productData.productDescription) + '</span>');
        modal.find('.mobile_info_menu .menu_attributes_block').html('<ul>' + attributeStr + '</ul>');
        if (productData.thumbnail.length <= 0) {
            modal.find('.thumbs_nav_list').addClass('hide');
        } else {
            modal.find('.thumbs_nav_list').removeClass('hide');
        }
    }
    if (categoryStr) {
        modal.find('.product_categories').removeClass('hide');
    } else {
        modal.find('.product_categories').addClass('hide');
    }
    if (productData.productDescription == "" && attributeStr == "") {
        modal.find('.shwc_info_menu').hide();
    } else {
        modal.find('.shwc_info_menu').show();
    }
    modal.find('.categories_list ').html(categoryStr);
    modal.find('.attributes_list').html(attributeStr);
    thumbs_nav_list.append('<li class="active"></li>');
    if (productData.thumbnails.length > 0) {
        modal.find('.thumbs_list_wrap').removeClass('hide');
    } else {
        modal.find('.thumbs_list_wrap').addClass('hide');
    }
    if (isMobile()) {
        modal.find('.thumbs_list_wrap').removeClass('hide');
    }
    var active = "'active'";
    var selectproductStr = "'" + productData["productEnableZoom"] + "'";
    thumbs_list.append('' +
        '<li class=' + active + ' selectedUrl = "' + productData.name + '" imgurlmain1024 = "' + productData.name + '" onclick="selectProduct(this, \'' + productData.thumbnails[0] + '\')">' +
        '<div class="image_block">' +
        '<div class="bg_wrapper" style="background-image:url(' + productData.name + ')"></div>' +
        '<img src="' + productData.name + '" alt="" />' +
        '</div>' +
        '</li>');
    for (var i = 0; i < productData.thumbnails.length; i++) {
        var thumb = productData.thumbnails[i];
        var imgurlThumb640 = thumb;
        thumbs_nav_list.append('<li></li>');
        var active = productData.name == imgurlThumb640 ? "'active'" : "''";
        thumbs_list.append('' +
            '<li class=' + active + ' selectedUrl = "' + imgurlThumb640 + '" imgurlmain1024 = "' + imgurlThumb640 + '" onclick="selectProduct(this, \'' + imgurlThumb640 + '\')">' +
            '<div class="image_block">' +
            '<div class="bg_wrapper" style="background-image:url(' + imgurlThumb640 + ')"></div>' +
            '<img src="' + imgurlThumb640 + '" alt="" />' +
            '</div>' +
            '</li>');
    }
    if (productData['productEnableZoom'] == 'on') {
        jQuery('.zoomContainer').remove();
        jQuery("#zoom_012").elevateZoom({
            zoomType: "inner",
            cursor: "crosshair",
            scrollZoom: true
        });
    }
}
function goToNextSlideModal(target, isNext, alldata) {
    var modal = jQuery(".shwc_modal_page");
    var data = alldata;
    var index = modal[0].getAttribute('index');
    if (data.length > 1) {
        if (isNext) {
            if (index == data.length - 1) {
                index = 0;
            } else {
                index++;
            }
            modal[0].setAttribute('index', index);
        } else {
            if (index > 0) {
                index--;
            } else {
                index = data.length - 1;
            }
            modal[0].setAttribute('index', index);
        }
        var url = data[index].name;
        var title = data[index].productCatalogTitle && data[index].productCatalogTitle != -1 ? data[index].productCatalogTitle.stripSlashes() : data[index].prodId;
        var thumbs_list = modal.find('.thumbs_list');
        thumbs_list.html('');
        constructModal(modal, thumbs_list, data[index]);
        if (isMobile()) {
            constructSwipe(modal.find('.thumbs_list li'));
        }
    }
}
function selectSingleProduct(target, prodId, productEnableZoom) {
    var shwc_product_page = jQuery(".shwc_item_page");
    shwc_product_page.find('.thumbs_list li').removeClass('active');
    var selectedUrl = target.getAttribute('selectedUrl');
    var imgurlmain1024 = target.getAttribute('imgurlmain1024');
    target.classList.add('active');
    shwc_product_page.find('.main_image_block').html(
        '<div class="image_block">' +
        '<div class="bg_wrapper" style="background-image:url(' + selectedUrl + ')"></div>' +
        '<img id="zoom_01' + prodId + '" src="' + imgurlmain1024 + '" alt=""  data-zoom-image ="' + selectedUrl + '" />' +
        '</div>');
    if (productEnableZoom == "on") {
        jQuery('.zoomContainer').remove();
        jQuery("#zoom_01" + prodId).elevateZoom({
            zoomType: "inner",
            cursor: "crosshair",
            scrollZoom: true
        });
    }
}
function selectProduct(target, prodId, productEnableZoom) {
    this.selectedProductId = prodId;
    var modal = jQuery(".shwc_modal_page");
    modal.find('.thumbs_list li').removeClass('active');
    var selectedUrl = target.getAttribute('selectedUrl');
    var imgurlmain1024 = target.getAttribute('imgurlmain1024');
    target.classList.add('active');
    modal.find('.main_image_block').html(
        '<div class="image_block">' +
        '<div class="bg_wrapper" style="background-image:url(' + imgurlmain1024 + ')"></div>' +
        '<img id="zoom_01' + prodId + '" src="' + imgurlmain1024 + '" alt=""  data-zoom-image ="' + selectedUrl + '" />' +
        '</div>');
    if (productEnableZoom == 'on') {
        jQuery('.zoomContainer').remove();
        jQuery("#zoom_01" + prodId).elevateZoom({
            zoomType: "inner",
            cursor: "crosshair",
            scrollZoom: true
        });
    }
}
function selectProduct_(target, prodId, id) {
    this.selectedProductId = prodId;
    var shwc_pc_wrapper = jQuery('.shwc_pc_wrapper');
    shwc_pc_wrapper.find('.images_list').removeClass('active');
    var selectedUrl = target.getAttribute('selectedUrl');
    var imgurlmain1024 = target.getAttribute('imgurlmain1024');
    target.classList.add('active');
    shwc_pc_wrapper.find('#main_' + id).html(
        '<div class="image_block " >' +
        '<div class="bg_wrapper" style="background-image:url(' + imgurlmain1024 + ')"></div>' +
        '<img src="' + imgurlmain1024 + '" alt=""  data-zoom-image ="' + selectedUrl + '" />' +
        '</div>');
}
function product(data, selectedUrl, imgurlmain1024, scope) {
    var target = scope.target;
    var productDataIndex = target.getAttribute('data-trackId');
    var productData = data[productDataIndex];
    jQuery("a[type=item_popup]").click();
    var modal = jQuery(".shwc_modal_page");
    var thumbs_list = modal.find('.thumbs_list');
    constructModal(modal, thumbs_list, productData);
    if (productData['productEnableZoom'] == 'on') {
        jQuery('.zoomContainer').remove();
        jQuery("#zoom_01" + productData['prodId']).elevateZoom({
            zoomType: "inner",
            cursor: "crosshair",
            scrollZoom: true
        });
    }
    if (isMobile()) {
        var images = jQuery(".modal").find('.thumbs_list li');
        constructSwipe(images);
    }
    jQuery(document).unbind('keyup');
    jQuery(document).on('keyup', function (e) {
        switch (e.keyCode) {
            case 27:
                closeModal();
                break;
            case 39:
                goToNextSlideModal(this, true);
                break;
            case 37:
                goToNextSlideModal(this);
                break;
        }
    });
}
jQuery(document).ready(function () {
    constructMasonry();
    updateSlick();
    constructFilter();

     window.onpopstate = function (event) {
        window.location.href = document.location;
    };

    jQuery(document).mouseup(function (e) {
        var container = jQuery(".shwc_modal_page");
        // if the target of the click isn't the container nor a descendant of the container
        if (container.is(e.target) && !isMobile()) {
            closeModal();
        }
    });
    jQuery(document).on('click', '.close_modal', function (e) {
        closeModal();
    });
    /*##########MODAL###########*/
    checkSize();
    jQuery(window).resize(function () {
        checkSize();
    });
    var sliderIndex = 0;

    function checkSize() {
        if (jQuery(window).width() <= 767) {
            var modal = jQuery(".shwc_modal_page");
            constructSwipe(modal.find('.thumbs_list li'));
            if (jQuery(".shwc_pc_wrapper").hasClass("mobile")) {
                var slidePosition = sliderIndex * parseInt(jQuery(window).width());
                jQuery("body").find(".modal_content .images_block .thumbs_list").css({"left": -slidePosition});
                return false;
            }
            gomobile();
        } else {
            if (jQuery(".shwc_pc_wrapper").hasClass("mobile") || jQuery(".shwc_item_page").hasClass("mobile")) {
                goscreen();
            } else {
                return false;
            }
        }
    }

    function gomobile() {
        // TODO
        jQuery(".modal_content").append("<div class='mobile_info_menu'><div class='menu_product_description'></div><div class='menu_attributes_block'></div></div>");
        jQuery('.zoomContainer').remove();
        jQuery(".shwc_pc_wrapper").addClass("mobile");
        jQuery(".shwc_item_page").addClass("mobile");
        jQuery(".shwc_item_page .thumbs_list_wrap").removeClass("hide");
        jQuery(".modal").addClass("mobile");
        jQuery(".modal").find('.thumbs_list_wrap').removeClass('hide');
        jQuery(".modal").find('.thumbs_list').attr("id", "pane-container");
        constructSwipe(jQuery(".modal").length ? jQuery(".modal").find('.thumbs_list li') : jQuery(".shwc_item_page").find('.thumbs_list li'));
    }

    function goscreen() {
        var imgs = jQuery("#pane-container");
        imgs.css("transform", "translate(0px,0)");
        jQuery(".thumbs_list").css({"left": "0px"});
        jQuery(".mobile_info_menu").remove();
        /* TODO zoom */
        jQuery("#zoom_01" + this.selectedProductId).elevateZoom({
            zoomType: "inner",
            cursor: "crosshair",
            scrollZoom: true
        });
        /* TODO zoom  end*/
        jQuery(".shwc_pc_wrapper").removeClass("mobile");
        jQuery(".shwc_item_page").removeClass("mobile");
        jQuery(".modal").removeClass("mobile");
        if (jQuery(".modal").find('.thumbs_nav_list').children().length == 1) {
            jQuery(".modal").find('.thumbs_list_wrap').addClass('hide');
        }
        if (jQuery(".shwc_item_page").find('.thumbs_nav_list').children().length == 1) {
            jQuery(".shwc_item_page .thumbs_list_wrap").addClass("hide");
        }
    }

    jQuery('.close_modal_wrapper .shwc_info_menu').on('click', function () {
        if (jQuery(".mobile_info_menu").hasClass("active")) {
            jQuery(".mobile_info_menu").removeClass("active");
        }
        else {
            jQuery(".mobile_info_menu").addClass("active");
        }
    });
    jQuery(".item_page_content .info_block  .product_description .info_label, .item_page_content .info_block  .attributes_block .info_label").on('click', function () {
        if (jQuery('.shwc_item_page').hasClass('mobile')) {
            jQuery(this).toggleClass("open");
        }
        return false;
    });

});
function swipeStatus(maxImages, IMG_WIDTH, speed, event, phase, direction, distance) {
    //If we are moving before swipe, and we are going L or R in X mode, or U or D in Y mode then drag.
    if (phase == "move" && (direction == "left" || direction == "right")) {
        var duration = 0;
        if (direction == "left") {
            scrollImages(this, (IMG_WIDTH * this.currentImg) + distance, duration);
        } else if (direction == "right") {
            scrollImages(this, (IMG_WIDTH * this.currentImg) - distance, duration);
        }
    } else if (phase == "cancel") {
        scrollImages(this, IMG_WIDTH * this.currentImg, speed);
    } else if (phase == "end") {
        if (direction == "right") {
            previousImage(IMG_WIDTH, speed, this);
        } else if (direction == "left") {
            nextImage(IMG_WIDTH, speed, maxImages, this);
        }
    }
}
function previousImage(IMG_WIDTH, speed, imgs) {
    this.currentImg = Math.max(this.currentImg - 1, 0);
    scrollImages(imgs, IMG_WIDTH * this.currentImg, speed);
}
function nextImage(IMG_WIDTH, speed, maxImages, imgs) {
    this.currentImg = Math.min(this.currentImg + 1, maxImages - 1);
    scrollImages(imgs, IMG_WIDTH * this.currentImg, speed);
}




/**
 * Manually update the position of the imgs on drag
 */
function scrollImages(imgs, distance, duration) {
    imgs.css("transition-duration", (duration / 1000).toFixed(1) + "s");
    //inverse the number we set in the css
    var value = (distance < 0 ? "" : "-") + Math.abs(distance).toString();
    imgs.css("transform", "translate(" + value + "px,0)");
    var page = jQuery(".modal_content").length ? jQuery(".modal_content") : jQuery(".item_page_content");
    page.find(jQuery(".images_block .thumbs_list_wrap .thumbs_nav_list li")).removeClass("active");
    page.find(jQuery(".images_block .thumbs_list_wrap .thumbs_nav_list li")).eq(this.currentImg).addClass("active");
}