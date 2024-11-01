var changes = false;

String.prototype.stripSlashes = function () {
    if (this == null) {
        return;
    }
    return this.replace(/\\(.)/mg, "$1").replace(/\\(.)/mg, "$1");
}

function htmlEncode(value) {
    return jQuery('<div/>').text(value).html();
}
var tabs = document.getElementsByClassName('shwproduct_Tab');
Array.prototype.forEach.call(tabs, function (tab) {
    tab.addEventListener('click', setActiveClass);
});
function setActiveClass(evt) {
    Array.prototype.forEach.call(tabs, function (tab) {
        tab.classList.remove('shwproduct_active_Tab');
    });
    if (evt instanceof MouseEvent) {
        evt.currentTarget.classList.add('shwproduct_active_Tab');
    } else {
        evt.classList.add('shwproduct_active_Tab');
    }
}
jQuery('body').on('focus', ".datepicker", function () {
    jQuery(this).datepicker({dateFormat: "dd-mm-yy"});
})
jQuery('input#select-all').on('change', function () {
    if (this.checked) {
        jQuery('input.item-checkbox').prop('checked', true);
    } else {
        jQuery('input.item-checkbox').prop('checked', false);
    }
});

jQuery(document).ready(function () {



    /*#############FREE SCRIPTS####################*/
    jQuery(".free_message i").on('click', function(){
        jQuery(this).parents(".free_message").addClass('to_try');
    });


    jQuery(".themes_nav .tab_nav_add_new_tab a, .add_theme_disabled").click(function(){
        return false;
    });
    var addThemeBlocker='<li class="free_message"> <div class="message_wrapper"> <span>This option is available only on pro version</span> <a href="http://showcaster.org" target="_blank">Go Pro</a> </div> </li>';
    //var addThemeBlocker= '<li class="free_message"> <div class="message_wrapper"> <span>This option is available only on pro version</span> <a href="http://showcaster.org" target="_blank">Go Pro</a> </div> </li>';
    jQuery(".themes_nav.tab_nav_list").append(addThemeBlocker);

    var imagURL= productSave.pluginsUrl+'/showcaster/resources/assets/images/icons/logo.png';
    var headBanner='<div class="shwproduct-list-header"> <div class="logo_block"> <img src ="'+imagURL+'" alt="" /> </div> <div class="navigation_block"> <ul> <li><a href="https://showcaster.org/#pricing" class="pro_button" target="_blank">Get Pro</a></li> <li><a href="https://showcaster.org/#demo" target="_blank">Demo</a></li> <li><a href="https://showcaster.org/#contacts" target="_blank">Help</a></li> <li><a href="https://wordpress.org/support/plugin/showcaster/" target="_blank">Support Forum</a></li> </ul> </div> </div>';
    jQuery('.showcaster_admin_page_header_wrapper').html(headBanner);
    /*END OF FREE*/


    jQuery('.options').on('keyup keypress blur change', function (e) {
        changes = true;
    });
    window.onbeforeunload = function () {
        if (changes) {
            return "";
        }
    };
    jQuery('#layout_options').show();
    jQuery(function () {
        var input = jQuery(".edit_name_input");
        if (input.val()) {
            var len = input.val().length;
            input[0].focus();
            input[0].setSelectionRange(len, len);
        }
    });
    /*Popup Attribute*/

    /* Edit Catalog, Theme Titles */
    jQuery(".tab_nav_active_tab").click(function (e) {
        e.stopPropagation();
        var target = e.target;
        if (target.className == "fa fa-pencil" && target.parentElement.getAttribute('id') == 'shwproduct_edit_nameId') {
            var uid = target.getAttribute('uid');
            jQuery(".shwproduct_active_name[uid=" + uid + "]").hide();
            jQuery("[name='edit_name_" + uid + "']")[0].className = "";
            jQuery("[name='edit_name_" + uid + "']")[0].getAttribute('id');
            document.addEventListener("click", function (event) {
                    var id = jQuery('#shwcatalog_id').val();
                    jQuery('.shwproduct_active_name').show();
                    jQuery("[name='edit_name_" + id + "']")[0].className = "shwproduct_hidden";
                    jQuery(".shwproduct_active_name").html(jQuery("[name='edit_name_" + id + "']")[0].value);
                    var general_data = {
                        action: "shwupdate_catalogsName",
                        nonce: productSave.nonce,
                        id: id,
                        name: jQuery("[name='edit_name_" + id + "']")[0].value
                    };
                    jQuery.ajax({
                        url: ajaxurl,
                        method: 'post',
                        data: general_data,
                        dataType: 'text',
                        beforeSend: function () {
                            doingAjax = true;
                        }
                    }).always(function () {
                        doingAjax = false;
                    }).done(function (response) {
                        if (response == 1) {
                            window.setTimeout('location.reload()', 800)
                        } else {
                        }
                    }).fail(function () {
                    });
                }
                , false);
        }
        if (target.className == "fa fa-pencil" && target.parentElement.getAttribute('id') == 'shwproduct_edit_theme') {
            var uid = target.getAttribute('uid');
            jQuery("#shwproduct_active_theme[uid=" + uid + "]").hide();
            jQuery("[name='edit_theme_" + uid + "']")[0].className = "";
            jQuery("[name='edit_theme_" + uid + "']")[0].getAttribute('id');
            document.addEventListener("click", function (event) {
                    var id = jQuery('#shwtheme_id').val();
                    jQuery('.shwproduct_active_theme_name').show();
                    jQuery("[name='edit_theme_" + id + "']")[0].className = "shwproduct_hidden";
                    jQuery("#shwproduct_active_theme").html(jQuery("[name='edit_theme_" + id + "']")[0].value);
                    var general_data = {
                        action: "shwupdate_theme_title",
                        nonce: productSave.nonce,
                        id: id,
                        name: jQuery("[name='edit_theme_" + id + "']")[0].value
                    };
                    jQuery.ajax({
                        url: ajaxurl,
                        method: 'post',
                        data: general_data,
                        dataType: 'text',
                        beforeSend: function () {
                            doingAjax = true;
                        }
                    }).always(function () {
                        doingAjax = false;
                    }).done(function (response) {
                        if (response == 1) {
                            window.setTimeout('location.reload()', 800)
                        } else {
                        }
                    }).fail(function () {
                    });
                }
                , false);
        }
        if (target.className == "fa fa-close") {
            var uid = target.getAttribute('uid');
            var general_data = {
                action: "shwremove_theme",
                nonce: productSave.nonce,
                id: uid,
            };
            jQuery.ajax({
                url: ajaxurl,
                method: 'post',
                data: general_data,
                dataType: 'text',
                beforeSend: function () {
                    doingAjax = true;
                }
            }).always(function () {
                doingAjax = false;
            }).done(function (response) {
                if (response == 1) {
                    var url = window.location.pathname + '?page=shwportfoliocatalog_themes&task=edit_theme&id=1&_wpnonce=a4cc640233'
                    window.location.href = url;
                } else {
                }
            }).fail(function () {
                }
                , false);
        }
    });
    jQuery(".tab_nav_active_tab").dblclick(function (e) {
        e.stopPropagation();
        var target = e.target;
        if (target.className == "shwproduct_active_name") {
            var uid = target.getAttribute('uid');
            jQuery(target).hide();
            jQuery("[name='edit_name_" + uid + "']")[0].className = "";
            document.addEventListener("click", function (event) {
                    var id = jQuery('#shwcatalog_id').val();
                    jQuery('.shwproduct_active_name').show();
                    jQuery("[name='edit_name_" + id + "']")[0].className = "shwproduct_hidden";
                    jQuery(".shwproduct_active_name").html(jQuery("[name='edit_name_" + id + "']")[0].value);
                    var general_data = {
                        action: "shwupdate_catalogsName",
                        nonce: productSave.nonce,
                        id: id,
                        name: jQuery("[name='edit_name_" + id + "']")[0].value
                    };
                    jQuery.ajax({
                        url: ajaxurl,
                        method: 'post',
                        data: general_data,
                        dataType: 'text',
                        beforeSend: function () {
                            doingAjax = true;
                        }
                    }).always(function () {
                        doingAjax = false;
                    }).done(function (response) {
                        if (response == 1) {
                            window.setTimeout('location.reload()', 800)
                        } else {
                        }
                    }).fail(function () {
                    });
                }
                , false);
        } else if (target.className == "shwproduct_active_theme_name") {
            var uid = target.getAttribute('uid');
            jQuery(target).hide();
            jQuery("[name='edit_theme_" + uid + "']")[0].className = "";
            document.addEventListener("click", function (event) {
                    var id = jQuery('#shwtheme_id').val();
                    jQuery('.shwproduct_active_theme_name').show();
                    jQuery("[name='edit_theme_" + id + "']")[0].className = "shwproduct_hidden";
                    jQuery("#shwproduct_active_theme").html(jQuery("[name='edit_theme_" + id + "']")[0].value);
                    var general_data = {
                        action: "shwupdate_theme_title",
                        nonce: productSave.nonce,
                        id: id,
                        name: jQuery("[name='edit_theme_" + id + "']")[0].value
                    };
                    jQuery.ajax({
                        url: ajaxurl,
                        method: 'post',
                        data: general_data,
                        dataType: 'text',
                        beforeSend: function () {
                            doingAjax = true;
                        }
                    }).always(function () {
                        doingAjax = false;
                    }).done(function (response) {
                        if (response == 1) {
                            window.setTimeout('location.reload()', 800)
                        } else {
                        }
                    }).fail(function () {
                    });
                }
                , false);

        }
    });
    jQuery('.shwfrm_delete_form').on('click tap', function (e) {
        if (!confirm("Are you sure you want to delete this item?")) {
            return false;
        }
        return;
    });
    jQuery('.shwproduct_remove_theme').on('click tap', function (e) {
        if (!confirm("Are you sure you want to delete this theme?")) {
            return false;
        }
        return;
    });
    /* remove,read checked forms */
    jQuery('#doaction').on('click tap', function (e) {
        e.preventDefault();
        var action = jQuery('#bulk-action-selector-top').val();
        if (action == 'trash') {
            if (!confirm("Are you sure you want to delete this item?")) {
                return false;
            }
            var items = jQuery('input.item-checkbox:checked');
            var checked_items = [];
            items.each(function (key, item) {
                checked_items.push(jQuery(this).val());
            });
            if (checked_items.length > 0) {
                var general_data = {
                    action: "shwremove_catalogs",
                    nonce: productSave.nonce,
                    formdata: checked_items
                };
                jQuery.ajax({
                    url: ajaxurl,
                    method: 'post',
                    data: general_data,
                    dataType: 'text',
                    beforeSend: function () {
                        doingAjax = true;
                    }
                }).always(function () {
                    doingAjax = false;
                }).done(function (response) {
                    if (response == 1) {
                        toastr.success('Selected Items Removed Successfully');
                        window.setTimeout('location.reload()', 1000)
                    } else {
                        toastr.error('Error while removing items');
                    }
                }).fail(function () {
                    toastr.error('Error while removing items');
                });
            } else {
                toastr.info('You should select a catalog');
            }
        }
        return false;
    })
    jQuery('#watermark_image_btn_new').click(function (e) {
        e.preventDefault();
        if (custom_uploader) {
            custom_uploader.open();
            return;
        }
        custom_uploader = wp.media.frames.file_frame = wp.media({
            title: 'Choose file',
            button: {
                text: 'Choose file'
            },
            multiple: false
        });
        custom_uploader.on('select', function () {
            var attachment = custom_uploader.state().get('selection').first().toJSON();
            jQuery("#watermark_image_new").attr("src", attachment.url);
            jQuery('#img_watermark_hidden_new').attr('value', attachment.url);
        });
        custom_uploader.open();
    });
    var _custom_media = true,
        _orig_send_attachment = wp.media.editor.send.attachment;
    jQuery('.add_media').on('click', function () {
        _custom_media = false;
    });
    jQuery(".wp-media-buttons-icon").click(function () {
        jQuery(".media-menu .media-menu-item").css("display", "none");
        jQuery("" +
            ":first").css("display", "block");
        jQuery(".separator").next().css("display", "none");
        jQuery('.attachment-filters').val('image').trigger('change');
        jQuery(".attachment-filters").css("display", "none");
    });
    /* Close Popup */
    jQuery(".shwimage-modal-close").click(function () {
        shwproductModalProduct.hide('shwproduct-editimages-modal');
        shwproductModalProduct.hide('shwquick_edit-modal');
    });
    jQuery(".-shwproduct-modal").click(function (e) {
        var targetClass = e.target.getAttribute('class');
        if (targetClass == "shwproduct-editimages-modal -shwproduct-modal" || targetClass == "shwquick_edit-modal -shwproduct-modal") {
            shwproductModalProduct.hide('shwproduct-editimages-modal');
            shwproductModalProduct.hide('shwquick_edit-modal');
        }
    });

    jQuery(document).on('click', "#shwproduct_showAttr", function (e) {
        shwproductModalProduct.hide('shwproduct-editimages-modal');

        jQuery('.single_grid_options_nav ul li').removeClass('active');
        jQuery('.single_grid_options_nav ul li').eq(2).addClass('active');

        jQuery('.single_grid_options_content > div').removeClass('active');
        jQuery('#shwproduct_attributes').addClass('active');

    });


    jQuery(document).on('click', ".shwcatalog_item_edit a", function (e) {
        e.preventDefault();
        document.getElementById('shwloadingContainer').style.display = "block";
        var id = e.srcElement.parentNode.getAttribute('productId');
        var catalogId = jQuery("input[name=catalogId]").val();
        var general_data = {
            productId: parseInt(id),
            catalogId: catalogId,
            nonce: productSave.nonce,
            action: "shwcatalog_getProductById"
        }
        jQuery.ajax({
            url: ajaxurl,
            method: 'post',
            data: general_data,
            dataType: 'json',
            beforeSend: function () {
                doingAjax = true;
            }
        }).always(function () {
            doingAjax = false;
        }).done(function (response) {
            if (response) {
                document.getElementById('shwloadingContainer').style.display = "none";
                var result = response.result;
                jQuery("input[name=productTitle]").val(result.title ? result.title.stripSlashes() : null);
                jQuery("input[name=shwimage_images_id]").val(id);
                jQuery("textarea[name=productDescription]").val(result.description ? result.description.stripSlashes() : null);
                jQuery("input[name=productPrice]").val(result.price ? result.price.stripSlashes() : null);
                jQuery("input[name=discountPrice]").val(result.discount ? result.discount.stripSlashes() : null);
                var srcImageUrl1 = jQuery("div[srcImageUrl1]").attr("srcImageUrl1");
                jQuery("img[name=image]").attr("src", result.image_id == -1 ? srcImageUrl1 + 'icons/noimage.png' : result.guid);
                var thumbnailsDiv = jQuery(".thumbnails");
                var attributesInfo = jQuery(".attributesInfo");
                var categoriesInfo = jQuery(".categoriesInfo");
                thumbnailsDiv.html("");
                attributesInfo.html("");
                categoriesInfo.html("");
                if (response.thumbnails.length) {
                    var thumbnails = response.thumbnails;
                    for (var i = 0; i < thumbnails.length; i++) {
                        var thumbnail = thumbnails[i];
                        var loadThumbnailImage = "loadThumbnailImage" + thumbnail;
                        thumbnailsDiv.append('<div class="thumbnail" class="ui-state-default">' +
                            '<div class="loader"  id="thmb' + thumbnail.id + '" style="display:none;"></div>' +
                            '<img src="' + thumbnail.guid + '" class="" />' +
                            '<div class="shwthumbnails_edit shwcatalog_thumbnails_edit" thumbnailsId="' + thumbnail.id + '" id="' + thumbnail.id + '"> ' +
                            '<i class="editThumbImg"></i>' +
                            '<a href="#"></a></div>' +
                            '<div class="shwthumbnails_edit shwcatalog_delete_thumbnails" thumbnailsId="' + thumbnail.id + '">' +
                            '<i class="removeThumbImg"></i>' +
                            '<a href="#"> </a>' +
                            '</div>');
                    }
                }
                var attributes = response.attributes;
                var categories = response.categories;
                if (attributes.length > 0) {
                    for (var i = 0; i < attributes.length; i++) {
                        var attribute = attributes[i];
                        var className = i % 2 == 0 ? " back backFill" : "back";
                        var checked = attribute.is_visible == "on" || attribute.is_visible === null ? "checked" : "";
                        var value = attribute.value ? attribute.value : "";
                        attributesInfo.append(
                            '<div class="' + className + '">' +
                            '<div class="attrTitleContainer"><label>' + attribute.title + '</label></div>' +
                            '<div class="attribute_value_block"><input type="text" class="attribute_value" value="' + value.stripSlashes() + '" name="attributesValue[' + attribute.attrId + ']" placeholder="Value" /></div>' +
                            '<div class="checkbox_container">' +
                            '<div class="checkboxTwo">' +
                            '<input type ="checkbox" ' + checked + ' name="attributesName[' + attribute.attrId + ']" />' +
                            '<label></label>' +
                            '</div>' +
                            '</div>' +
                            '</div>'
                        );
                    }
                } else {
                    attributesInfo.append(
                        '<div class="categoriesEmpty"> <label>No Attributes Found.\n' +
                        'Go to ' + '<a href="javascript:;"  id="shwproduct_showAttr"> ' + "Attributes Tab" + '</a>' + ' to add some filtering to your products/projects.</label></div>'
                    );
                }
                if (categories.length > 0) {
                    for (var i = 0; i < categories.length; i++) {
                        var category = categories[i];
                        var className = i % 2 == 0 ? " back backFill" : "back";
                        var checked = category.is_visible == "on" ? "checked" : "";
                        var checkedValue = category.is_visible == "on" ? "on" : "off";
                        var value = category.value ? category.value : "";
                        categoriesInfo.append(
                            '<div class="' + className + '">' +
                            '<div class="categoriseTitleContainer"><label>' + htmlEncode(category.title) + '</label></div>' +
                            '<div class="checkbox_container">' +
                            '<div class="checkboxTwo">' +
                            '<input value=' + category.cat_id + ' type ="checkbox" ' + checked + ' name="checkboxTwoInput[' + category.cat_id + ']" />' +
                            '<label></label>' +
                            '</div>' +
                            '</div>' +
                            '</div>'
                        );
                    }
                } else {
                    categoriesInfo.append(
                        '<div class="categoriesEmpty"> <label>No Categories Yet.\n' +
                        'Go to ' + '<a href="../wp-admin/admin.php?page=shwcategories" target="_blank"> ' + "Categories Page," + '</a>' + ' add some  filter to your products/projects.</label></div>'
                    );
                }
            } else {
                toastr.error('Error while getting data');
            }
        }).fail(function () {
            toastr.error('Error while getting data');
        });
        shwproductModalProduct.show('shwproduct-editimages-modal', id);
    })
    jQuery(".shwproduct_edit_product_images").click(function (e) {
        shwproductModalProduct.show('shwquick_edit-modal');
        shwproductModalProduct.dr
    });
    //TODO
})


jQuery(document).ready(function () {

    /* Tabs
    jQuery('#shw_tabs_nav > div')
        .tabs()
        .addClass('ui-tabs-vertical ui-helper-clearfix');
    setTimeout(function () {
        jQuery("#shwproduct_product_style").show();
    }, 0);

    var doingAjax = false;
    /* Attributes*/

    /*SINGLE GRID OPTIONS TABS*/
    jQuery('.single_grid_options_nav ul li a').on('click',function(){
        var strID=jQuery(this).attr('href');
        jQuery(this).parent().parent().find('li').removeClass('active');
        jQuery(this).parent().addClass('active');

        jQuery('.single_grid_options_content .active').removeClass('active');
        jQuery(strID).addClass('active');
        return false;
    });


    jQuery('#addAtributeId').keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            e.preventDefault();
            var id = jQuery("input[name=catalogId]").val();
            var title = jQuery("input[name=addAttribute]").val();
            var general_data = {
                catalog_id: parseInt(id),
                title: title,
                nonce: productSave.nonce,
                action: "shwcatalog_add_attributes_button"
            }
            if (title) {
                jQuery.ajax({
                    url: ajaxurl,
                    method: 'post',
                    data: general_data,
                    dataType: 'json',
                    beforeSend: function () {
                        doingAjax = true;
                    }
                }).always(function () {
                    doingAjax = false;
                }).done(function (response) {
                    if (response) {
                        jQuery('#addAtributeId').attr("value", "");
                        jQuery('.shwproduct_allAttributes').html('');
                        jQuery('.shwproduct_allAttributes').append('<div id="check">');
                        for (var i = 0; i < response.length; i++) {
                            var el = response[i];
                            jQuery('.shwproduct_allAttributes').append('</div><label uid=' + el.id + ' id="attribute' + el.id + '" class="ui-state-default">' + htmlEncode(el.title) +
                                '<span class="attributeClose" uid=' + el.id + '></span></label>'
                            );
                        }
                    }
                })
            } else {
                alert("The Attribute Field Is Empty!");
            }
        }
    });

    jQuery('.shwproduct_allAttributes').on('click', function (e) {
        var target = e.target;
        if (target.className === "attributeClose") {
            var attributeId = parseInt(target.getAttribute('uid'));
            var catalog_id = parseInt(jQuery("input[name=catalogId]").val());
            var removedAttrId = document.getElementById('attribute' + attributeId);
            removedAttrId.style.display = "none"
            var general_data = {
                action: "shwcatalog_remove_attributes",
                nonce: productSave.nonce,
                catalog_id: catalog_id,
                attributeId: attributeId
            };
            jQuery.ajax({
                url: ajaxurl,
                method: 'post',
                data: general_data,
                dataType: 'json',
                beforeSend: function () {
                    doingAjax = true;
                }
            }).always(function () {
                doingAjax = false;
            }).done(function (response) {
                if (response) {
                    jQuery('.shwproduct_allAttributes').html('');
                    jQuery('.shwproduct_allAttributes').append('<div id="check">');
                    for (var i = 0; i < response.length; i++) {
                        var el = response[i];
                        jQuery('.shwproduct_allAttributes').append('</div><label uid=' + el.id + ' id="attribute' + el.id + '">' + htmlEncode(el.title) +
                            '<span class="attributeClose" uid=' + el.id + '></span></label>'
                        );
                    }
                }
            })
        }
    });
    jQuery('#shwproduct_images_form').on('submit', function (e) {
        e.preventDefault();
        // if (doingAjax) return false;
        var form = jQuery('#shwproduct_images_form'),
            submitBtn = form.find('input[type=submit]'),
            formData = form.serialize(),
            general_data = {
                action: "shwproduct_save_product",
                nonce: productSave.nonce,
                catalog_id: jQuery("input[name=shwcatalog_id]").val(),
                catalog_name: jQuery("input[name=shwcatalog_name]").val(),
                formdata: formData
            };
        jQuery.ajax({
            url: ajaxurl,
            method: 'post',
            data: general_data,
            dataType: 'text',
            beforeSend: function () {
                doingAjax = true;
                submitBtn.attr("disabled", 'disabled');
                submitBtn.parent().find(".spinner").css("visibility", "visible");
            }
        }).always(function (response) {
            //jQuery('.shwproduct_items_section').prepend(response);
            doingAjax = false;
            submitBtn.removeAttr("disabled");
            submitBtn.parent().find(".spinner").css("visibility", "hidden");
        }).done(function (response) {
            if (response == 1) {
                changes = false;
                toastr.success('Saved Successfully');
            } else {
                toastr.error('Error while saving. Code No# 7');
            }
        }).fail(function () {
            toastr.error('Error while saving. Code No# 8');
        });
        return false;
    });
    /* Portfolio Save*/
    jQuery('#shwportfolio_images_form').on('submit', function (e) {
        e.preventDefault();
        if (doingAjax) return false;
        var form = jQuery('#shwportfolio_images_form'),
            submitBtn = form.find('input[type=submit]'),
            formData = form.serialize(),
            general_data = {
                action: "shwportfolio_save_product",
                nonce: productSave.nonce,
                portfolio_id: jQuery("input[name=shwportfolio_id]").val(),
                portfolio_name: jQuery("input[name=shwportfolio_name]").val(),
                formdata: formData
            };
        jQuery.ajax({
            url: ajaxurl,
            method: 'post',
            data: general_data,
            dataType: 'text',
            beforeSend: function () {
                doingAjax = true;
                submitBtn.attr("disabled", 'disabled');
                submitBtn.parent().find(".spinner").css("visibility", "visible");
            }
        }).always(function () {
            doingAjax = false;
            submitBtn.removeAttr("disabled");
            submitBtn.parent().find(".spinner").css("visibility", "hidden");
        }).done(function (response) {
            if (response == 1) {
                toastr.success('Saved Successfully');
            } else {
                toastr.error('Error while saving. Code No# 9');
            }
        }).fail(function () {
            toastr.error('Error while saving. Code No# 10');
        });
        return false;
    });
    //TODO
    jQuery('#shwproduct_edited_images_form').on('submit', function (e) {
        e.preventDefault();
        var form = jQuery('#shwproduct_edited_images_form'),
            submitBtn = form.find('input[type=submit]'),
            formData = form.serialize(),
            general_data = {
                action: "shwproduct_save_product_images",
                nonce: productSave.nonce,
                product_id: jQuery("input[name=shwcatalog_id]").val(),
                formdata: formData
            };
        jQuery.ajax({
            url: ajaxurl,
            method: 'post',
            data: general_data,
            dataType: 'text',
            beforeSend: function () {
                doingAjax = true;
                submitBtn.attr("disabled", 'disabled');
                submitBtn.parent().find(".spinner").css("visibility", "visible");
            }
        }).always(function () {
            doingAjax = false;
            submitBtn.removeAttr("disabled");
            submitBtn.parent().find(".spinner").css("visibility", "hidden");
        }).done(function (response) {
            if (response == 1) {
                toastr.success('Saved Successfully');
            } else {
                toastr.error('Error while saving. Code No# 11');
            }
        }).fail(function () {
            toastr.error('Error while saving. Code No# 12');
        });
        return false;
    });
    /* Remove Product */
    jQuery(document).on('change', ".shwproduct_item_overlay input[type=checkbox]", function () {
        if (jQuery(this).is(':checked')) {
            jQuery(this).parent().addClass("active_item");
        }
        else {
            jQuery(this).parent().removeClass("active_item");
        }
    })
    jQuery(document).on('change', ".items_checkbox", function () {
        var count = jQuery(".shwproduct_item input:checked").length;
        if (count > 0) {
            jQuery(".shwproduct_remove_selected_images").show();
        }
        else {
            jQuery(".shwproduct_remove_selected_images").hide();
        }
    });
    jQuery("#shwproduct_select_all_items").change(function () {
        if (jQuery(this).attr("checked") == 'checked') {
            jQuery(".shwproduct_item input[type='checkbox']").attr("checked", "checked");
            jQuery(".shwproduct_item_overlay").addClass("active_item");
            jQuery(".shwproduct_remove_selected_images").show();
        }
        else {
            jQuery(".shwproduct_item input[type='checkbox']").removeAttr("checked");
            jQuery(".shwproduct_item_overlay").removeClass("active_item");
            jQuery(".shwproduct_remove_selected_images").hide();
        }
    })
    jQuery(".catalog_delete_form").click(function (e) {
        e.preventDefault();
        if (!confirm("Are you sure you want to delete this item?")) {
            return false;
        }
        var checked_items = [];
        jQuery(".shwproduct_item input:checked").each(function (key, item) {
            checked_items.push(jQuery(this).val());
        })
        general_data = {
            action: "shwproduct_remove_catalog_items",
            nonce: productSave.nonce,
            catalog_id: jQuery("input[name=shwcatalog_id]").val(),
            formdata: checked_items
        };
        jQuery.ajax({
            url: ajaxurl,
            method: 'post',
            data: general_data,
            dataType: 'text',
            beforeSend: function () {
                doingAjax = true;
            }
        }).always(function () {
            doingAjax = false;
        }).done(function (response) {
            if (response == 1) {
                toastr.success('Selected Items Removed Successfully');
                window.setTimeout('location.reload()', 1000)
            } else {
                toastr.error('Error while removing items');
            }
        }).fail(function () {
            toastr.error('Error while removing items');
        });
    });
});
/* Add Product to  Portfolio || Catalog */
function addItem(data, type, update, thumbnailsId, callback, catalog_id, product_id, action) {
    action = action ? action : 'catalog';
    var actionStr = "shwproduct_add_" + action + "_" + type;
    if (!thumbnailsId) {
        document.getElementById('loadMainImage').style.display = "block";
    }
    general_data = {
        action: actionStr,
        nonce: productSave.nonce,
        catalog_id: catalog_id,
        product_id: product_id,
        formdata: data,
        update: update,
        thumbnailsId: thumbnailsId
    };
    jQuery.ajax({
        url: ajaxurl,
        method: 'post',
        data: general_data,
        dataType: 'json',
        beforeSend: function () {
            doingAjax = true;
        }
    }).always(function () {
        doingAjax = false;
    }).done(function (response) {
        if (response) {
            document.getElementById('loadMainImage').style.display = "none";
            document.getElementById('loadMainImage').style.display = "none";
            toastr.success('Added Successfully');
            if (type !== "thumbnails") {
                callback();
            } else if (!update) {
                callback(response);
            } else {
                if (!thumbnailsId) {
                    callback(data);
                } else {
                    callback(response);
                }
            }
        } else {
            toastr.error('Error while saving. Code No# 13');
        }
    }).fail(function () {
        toastr.error('Error while saving. Code No# 14');
    });
}
jQuery(".quickCatalogView").click(function (e) {
    e.preventDefault();
    shwproductModalProduct.show('shwquick_edit-modal');
});
jQuery(document).ready(function () {
    function deleteCatalogProductThumbnails(catalog_id, product_id, thumbnailsId, isCatalog, callback, isMainImage, removeOnlyMain) {
        var actionStr = isCatalog ? (isMainImage ? "shwcatalog_delete_catalog_product_mainimage" : "shwcatalog_delete_catalog_product_thumbnails")
            : (isMainImage ? "shwportfolio_delete_portfolio_product_mainimage" : "shwportfolio_delete_portfolio_product_thumbnails");
        if (!thumbnailsId) {
            document.getElementById('loadMainImage').style.display = "block";
        }
        var general_data = {
            action: actionStr,
            nonce: productSave.nonce,
            catalog_id: catalog_id,
            product_id: product_id,
            removeOnlyMain: removeOnlyMain
        };
        if (!isMainImage) {
            general_data.thumbnailsId = thumbnailsId;
        }
        jQuery.ajax({
            url: ajaxurl,
            method: 'post',
            data: general_data,
            dataType: 'json',
            beforeSend: function () {
                doingAjax = true;
            }
        }).always(function () {
            doingAjax = false;
        }).done(function (response) {
            if (response) {
                document.getElementById('loadMainImage').style.display = "none";
                toastr.success('Removed Successfully');
                callback(response);
            } else {
                toastr.error('Error while deleting');
            }
        }).fail(function () {
            if (isMainImage) {
                toastr.error('You cannot delete the current image');
            } else {
                toastr.error('Error while deleting');
            }
        });
    }

    function updateThumbnailsCatalogProduct(thumbnails, isCatalog) {

        var str = "";
        if (thumbnails) {
            for (var i = 0; i < thumbnails.length; i++) {
                var thumbnail = thumbnails[i];
                if (isCatalog) {
                    var loadThumbnailImage = "loadThumbnailImage" + thumbnail;
                    str += '<div class="thumbnail" class="ui-state-default">' +
                        '<div class="loader"  id="thmb' + thumbnail.id + '" style="display:none;"></div>' +
                        '<img src="' + thumbnail.guid + '" class="" />' +
                        '<div class="shwthumbnails_edit shwcatalog_thumbnails_edit" thumbnailsId="' + thumbnail.id + '" id="' + thumbnail.id + '">' +
                        '<i class="editThumbImg"></i>' +
                        '<a href="#"></a>' +
                        '</div>' +
                        '<div class="shwthumbnails_edit shwcatalog_delete_thumbnails" thumbnailsId="' + thumbnail.id + '">' +
                        '<i class="removeThumbImg"></i>' +
                        '<a href="#"> </a>' +
                        '</div>' +
                        '</div>';
                } else {
                    str += '<div class="thumbnail" class="ui-state-default">' +
                        '<div class="loader"  id="thmb' + thumbnail.id + '" style="display:none;"></div>' +
                        '<img src="' + thumbnail.guid + '" class="" />' +
                        '<div class="shwthumbnails_edit shwportfolio_thumbnails_edit" thumbnailsId="' + thumbnail.id + '" id="' + thumbnail.id + '">' +
                        '<i class="editThumbImg"></i>' +
                        '<a href="#"></a>' +
                        '</div>' +
                        '<div class="shwthumbnails_edit shwportfolio_delete_thumbnails" thumbnailsId="' + thumbnail.id + '">' +
                        '<i class="removeThumbImg"></i>' +
                        '<a href="#"> </a>' +
                        '</div>' +
                        '</div>';
                }
            }
        }
        return str;
    }

    function uploadFunction(button, isThumb, update, isMultiple, thumbnailsId, callback, catalog_id, product_id, action) {
        var id = button.attr('id').replace('_button', '');
        //If the uploader object has already been created, reopen the dialog
        if (custom_uploader) {
            custom_uploader.options.multiple = isMultiple;
            if (update != null) {
                custom_uploader.update = update;
            }
            custom_uploader.open();
            return;
        }
        var custom_uploader;
        //Extend the wp.media object
        custom_uploader = wp.media.frames.file_frame = wp.media({
            title: 'Insert Into Product',
            button: {
                text: 'Insert Into Product'
            },
            multiple: isMultiple
        });
        if (update != null) {
            custom_uploader.update = update;
        }
        if (thumbnailsId) {
            custom_uploader.thumbnailsId = thumbnailsId;
        }
        //When a file is selected, grab the URL and set it as the text field's value
        custom_uploader.on('select', function () {
            attachments = custom_uploader.state().get('selection').toJSON();
            var imageArr = [];
            for (var key in attachments) {
                jQuery("#shwproduct_images_name[" + id + "]").val(attachments[key].url + ';;;' + jQuery("#" + id).val());
                imageArr.push({
                    image: attachments[key].id,
                    url: attachments[key].url
                })
            }
            if (isThumb) {
                addItem(imageArr, "thumbnails", custom_uploader.update, custom_uploader.thumbnailsId, callback, catalog_id, product_id, action);
            } else {
                addItem(imageArr, "product", false, false, callback, catalog_id, product_id, action);
            }
        });

        custom_uploader.open();
    }



    jQuery('.shwcatalog_add_new_image').click(function (e) {
        e.preventDefault();
        var button = jQuery(this);
        var catalog_id = jQuery("input[name=shwcatalog_id]").val();
        var product_id = jQuery("input[name=shwimage_images_id]").val();
        uploadFunction(button, false, false, true, false, function () {
            window.setTimeout(location.reload(), 1000)
        }, catalog_id, product_id, "catalog");
    });
    jQuery('.shwportfolio_add_new_image').click(function (e) {
        e.preventDefault();
        var button = jQuery(this);
        var catalog_id = jQuery("input[name=shwcatalog_id]").val();
        var product_id = jQuery("input[name=shwimage_images_id]").val();
        uploadFunction(button, false, false, true, false, function () {
            window.setTimeout(location.reload(), 1000)
        }, catalog_id, product_id, "portfolio");
    });





    jQuery('.shwcatalog_add_new_thumb').click(function (e) {


        e.preventDefault();
        var button = jQuery(this);
        var catalog_id = jQuery("input[name=shwcatalog_id]").val();
        var product_id = jQuery("input[name=shwimage_images_id]").val();



        uploadFunction(button, true, false, true, false, function (response) {


            var thumbnailsDiv = jQuery(".thumbnails");
            if (response.thumbnails.length) {
                var thumbnails = response.thumbnails;

                var div = updateThumbnailsCatalogProduct(thumbnails, true);
                thumbnailsDiv.html("");
                thumbnailsDiv.append(div);
            }
        }, catalog_id, product_id);

    });




    jQuery('.shwportfolio_add_new_thumb').click(function (e) {
        e.preventDefault();
        var button = jQuery(this);
        var catalog_id = jQuery("input[name=shwcatalog_id]").val();
        var product_id = jQuery("input[name=shwimage_images_id]").val();
        uploadFunction(button, true, false, true, false, function (response) {
            var thumbnailsDiv = jQuery(".thumbnails");
            thumbnailsDiv.html("");
            if (response.thumbnails.length) {
                var thumbnails = response.thumbnails;
                for (var i = 0; i < thumbnails.length; i++) {
                    var thumbnail = thumbnails[i];
                    thumbnailsDiv.append('<div class="thumbnail" class="ui-state-default">' +
                        '<div class="loader"  id="thmb' + thumbnail.id + '" style="display:none;"></div>' +
                        '<img src="' + thumbnail.guid + '" class="" />' +
                        '<div class="shwthumbnails_edit shwportfolio_thumbnails_edit" thumbnailsId="' + thumbnail.id + '" id="' + thumbnail.id + '"> ' +
                        '<i class="editThumbImg"></i>' +
                        '<a href="#"></a></div>' +
                        '<div class="shwthumbnails_edit shwportfolio_delete_thumbnails" thumbnailsId="' + thumbnail.id + '">' +
                        '<i class="removeThumbImg"></i>' +
                        '<a href="#"> </a>' +
                        '</div>');
                }
            }
        }, catalog_id, product_id, 'portfolio');
    });
    jQuery(document).on('click', '.shwedit_mainimage', function (e) {
        e.preventDefault();
        var catalog_id = jQuery("input[name=shwcatalog_id]").val();
        var product_id = jQuery("input[name=shwimage_images_id]").val();
        var button = jQuery(this);
        uploadFunction(button, true, true, false, false, function (data) {
            jQuery("img[name=image]").attr("src", data[data.length - 1].url);
            var image = "imagegroup_" + product_id;
            jQuery("input[name=" + image + "]").next().attr("src", data[data.length - 1].url);
        }, catalog_id, product_id);
    });
    jQuery(document).on('click', '.shwdelete_mainimage', function (e) {
        e.preventDefault();
        // document.getElementById('loadMainImage').style.display = "block";
        var catalog_id = jQuery("input[name=shwcatalog_id]").val();
        var product_id = jQuery("input[name=shwimage_images_id]").val();
        var srcImageUrl = e.srcElement.getAttribute('srcImageUrl') == null ? e.srcElement.parentNode.getAttribute('srcImageUrl') : e.srcElement.getAttribute('srcImageUrl');
        deleteCatalogProductThumbnails(catalog_id, product_id, false, true, function (response) {
            var thumbnailsDiv = jQuery(".thumbnails");
            var thumbnails = response.thumbnails;


            var div = updateThumbnailsCatalogProduct(thumbnails, true);
            thumbnailsDiv.html("");
            thumbnailsDiv.append(div);
            jQuery("img[name=image]").attr("src", response.main_image == -1 ? srcImageUrl + 'icons/noimage.png' : response.main_image);
            var image = "imagegroup_" + product_id;
            jQuery("input[name=" + image + "]").next().attr("src", response.main_image == -1 ? srcImageUrl + 'icons/noimage.png' : response.main_image);
        }, true)
    });
    jQuery(document).on('click', '.shwcatalog_delete_thumbnails', function (e) {
        e.preventDefault();
        var catalog_id = jQuery("input[name=shwcatalog_id]").val();
        var product_id = jQuery("input[name=shwimage_images_id]").val();
        var thumbnailsId = e.srcElement.getAttribute('thumbnailsId') == null ? e.srcElement.parentNode.getAttribute('thumbnailsId') : e.srcElement.getAttribute('thumbnailsId');
        document.getElementById('thmb' + thumbnailsId).style.display = "block";
        deleteCatalogProductThumbnails(catalog_id, product_id, thumbnailsId, true, function (response) {
            document.getElementById('thmb' + thumbnailsId).style.display = "none";
            var thumbnailsDiv = jQuery(".thumbnails");
            var thumbnails = response.thumbnails;

            var div = updateThumbnailsCatalogProduct(thumbnails, true);
            thumbnailsDiv.html("");
            thumbnailsDiv.append(div);
        })
    });
    jQuery(document).on('click', '.shwportfolio_delete_thumbnails', function (e) {
        e.preventDefault();
        var catalog_id = jQuery("input[name=shwcatalog_id]").val();
        var product_id = jQuery("input[name=shwimage_images_id]").val();
        var thumbnailsId = e.srcElement.getAttribute('thumbnailsId') == null ? e.srcElement.parentNode.getAttribute('thumbnailsId') : e.srcElement.getAttribute('thumbnailsId');
        deleteCatalogProductThumbnails(catalog_id, product_id, thumbnailsId, false, function (response) {
            var thumbnailsDiv = jQuery(".thumbnails");
            var thumbnails = response.thumbnails;

            var div = updateThumbnailsCatalogProduct(thumbnails, false);
            thumbnailsDiv.html("");
            thumbnailsDiv.append(div);
        })
    });
    jQuery(document).on('click', '.shwportfolio_edit_mainimage', function (e) {
        e.preventDefault();
        var catalog_id = jQuery("input[name=shwcatalog_id]").val();
        var product_id = jQuery("input[name=shwimage_images_id]").val();
        var button = jQuery(this);
        uploadFunction(button, true, true, false, false, function (data) {
            jQuery("img[name=image]").attr("src", data[data.length - 1].url);
            var image = "imagegroup_" + product_id;
            jQuery("input[name=" + image + "]").next().attr("src", data[data.length - 1].url);
        }, catalog_id, product_id, 'portfolio');
    });
    jQuery(document).on('click', '.shwportfolio_delete_mainimage', function (e) {
        e.preventDefault();
        // document.getElementById('loadMainImage').style.display = "block";
        var portfolio_id = jQuery("input[name=shwportfolio_id]").val();
        var product_id = jQuery("input[name=shwimage_images_id]").val();
        var srcImageUrl = e.srcElement.getAttribute('srcImageUrl') == null ? e.srcElement.parentNode.getAttribute('srcImageUrl') : e.srcElement.getAttribute('srcImageUrl');
        deleteCatalogProductThumbnails(portfolio_id, product_id, false, true, function (response) {
            var thumbnailsDiv = jQuery(".thumbnails");
            var thumbnails = response.thumbnails;

            var div = updateThumbnailsCatalogProduct(thumbnails, true);
            thumbnailsDiv.html("");
            thumbnailsDiv.append(div);
            jQuery("img[name=image]").attr("src", response.main_image == -1 ? srcImageUrl + 'icons/noimage.png' : response.main_image);
            var image = "imagegroup_" + product_id;
            jQuery("input[name=" + image + "]").next().attr("src", response.main_image == -1 ? srcImageUrl + 'icons/noimage.png' : response.main_image);
        }, true)
    });
    jQuery(document).on('click', '.shwcatalog_thumbnails_edit', function (e) {
        e.preventDefault();
        var button = jQuery(this);
        var catalog_id = jQuery("input[name=shwcatalog_id]").val();
        var product_id = jQuery("input[name=shwimage_images_id]").val();
        var thumbnailsId = e.srcElement.getAttribute('thumbnailsId') == null ? e.srcElement.parentNode.getAttribute('thumbnailsId') : e.srcElement.getAttribute('thumbnailsId');
        document.getElementById('thmb' + thumbnailsId).style.display = "block";
        uploadFunction(button, true, true, false, thumbnailsId, function (response) {
            document.getElementById('thmb' + thumbnailsId).style.display = "none";
            var thumbnailsDiv = jQuery(".thumbnails");
            var thumbnails = response.thumbnails;

            var div = updateThumbnailsCatalogProduct(thumbnails, true);
            thumbnailsDiv.html("");
            thumbnailsDiv.append(div);
        }, catalog_id, product_id);
    });
    jQuery(document).on('click', '.shwportfolio_thumbnails_edit', function (e) {
        e.preventDefault();
        var button = jQuery(this);
        var catalog_id = jQuery("input[name=shwcatalog_id]").val();
        var product_id = jQuery("input[name=shwimage_images_id]").val();
        var thumbnailsId = e.srcElement.getAttribute('thumbnailsId') == null ? e.srcElement.parentNode.getAttribute('thumbnailsId') : e.srcElement.getAttribute('thumbnailsId');
        uploadFunction(button, true, true, false, thumbnailsId, function (response) {
            var thumbnailsDiv = jQuery(".thumbnails");
            var thumbnails = response.thumbnails;

            var div = updateThumbnailsCatalogProduct(thumbnails, false);
            thumbnailsDiv.html("");
            thumbnailsDiv.append(div);
        }, catalog_id, product_id, 'portfolio');
    });
    jQuery(document).on('click', '.shwquickedit_image', function (e) {
        e.preventDefault();
        var catalog_id = jQuery("input[name=shwcatalog_id]").val();
        var product_id = e.srcElement.getAttribute('productId') == null ? e.srcElement.parentNode.getAttribute('productId') : e.srcElement.getAttribute('productId');
        var button = jQuery(this);
        document.getElementById('quickLoad').style.display = "block";
        uploadFunction(button, true, true, false, false, function (data) {
            jQuery("[name=quickEditImage" + product_id + "]").attr("src", data[data.length - 1].url);
            var image = "imagegroup_" + product_id;
            jQuery("input[name=" + image + "]").next().attr("src", data[data.length - 1].url);
            document.getElementById('quickLoad').style.display = "none";
        }, catalog_id, product_id);
        // document.getElementById('quickLoad').style.display = "none";
    });
    jQuery(document).on('click', '.shwquickdelete_image', function (e) {
        e.preventDefault();
        var catalog_id = jQuery("input[name=shwcatalog_id]").val();
        var product_id = e.srcElement.getAttribute('productId') == null ? e.srcElement.parentNode.getAttribute('productId') : e.srcElement.getAttribute('productId');
        var srcImageUrl = e.srcElement.getAttribute('srcImageUrl') == null ? e.srcElement.parentNode.getAttribute('srcImageUrl') : e.srcElement.getAttribute('srcImageUrl');
        document.getElementById('quickLoad').style.display = "block";
        deleteCatalogProductThumbnails(catalog_id, product_id, false, true, function (response) {
            jQuery("[name=quickEditImage" + product_id + "]").attr("src", srcImageUrl + 'icons/noimage.png');
            var image = "imagegroup_" + product_id;
            jQuery("input[name=" + image + "]").next().removeAttr('src');
            jQuery("input[name=" + image + "]").next().attr("src", srcImageUrl + 'icons/noimage.png');
            document.getElementById('quickLoad').style.display = "none";
        }, true, true)
    });
    jQuery(document).on('click', '.shwportfolio_quickedit_image', function (e) {
        e.preventDefault();
        var portfolio_id = jQuery("input[name=shwportfolio_id]").val();
        var product_id = e.srcElement.getAttribute('productId') == null ? e.srcElement.parentNode.getAttribute('productId') : e.srcElement.getAttribute('productId');
        var button = jQuery(this);
        document.getElementById('quickLoad').style.display = "block";
        uploadFunction(button, true, true, false, false, function (data) {
            jQuery("[name=quickEditImage" + product_id + "]").attr("src", data[data.length - 1].url);
            var image = "imagegroup_" + product_id;
            jQuery("input[name=" + image + "]").next().attr("src", data[data.length - 1].url);
            document.getElementById('quickLoad').style.display = "none";
        }, catalog_id, product_id);
    });
    jQuery(".shwcatalog_add_attributes_button").click(function (e) {
        e.preventDefault();
        var id = jQuery("input[name=catalogId]").val();
        var title = jQuery("input[name=addAttribute]").val();
        var general_data = {
            catalog_id: parseInt(id),
            title: title,
            nonce: productSave.nonce,
            action: "shwcatalog_add_attributes_button"
        }
        if (title) {
            jQuery.ajax({
                url: ajaxurl,
                method: 'post',
                data: general_data,
                dataType: 'json',
                beforeSend: function () {
                    doingAjax = true;
                }
            }).always(function () {
                doingAjax = false;
            }).done(function (response) {
                if (response) {
                    jQuery('#addAtributeId').attr("value", "");
                    jQuery('.shwproduct_allAttributes').html('');
                    jQuery('.shwproduct_allAttributes').append('<div id="check">');
                    for (var i = 0; i < response.length; i++) {
                        var el = response[i];
                        jQuery('.shwproduct_allAttributes').append('</div><label uid=' + el.id + ' id="attribute' + el.id + '" class="ui-state-default">' + htmlEncode(el.title) +
                            '<span class="attributeClose" uid=' + el.id + '></span></label>'
                        );
                    }
                }
            })
        } else {
            alert("The Attribute Field Is Empty!");
        }
    });
    jQuery(function () {
        jQuery("#sortable").sortable({
            placeholder: "ui-state-highlight",
            update: function (event, ui) {
                var attributeIds = [];
                var catalogId = jQuery("input[name=catalogId]").val();
                var listArray = jQuery('.shwproduct_allAttributes').find('label');
                for (var i = 0; i < listArray.length; i++) {
                    attributeIds.push({
                        id: parseInt(listArray[i].getAttribute('uid')),
                        order: i + 1
                    });
                }
                var general_data = {
                    catalog_id: parseInt(catalogId),
                    attributeIds: attributeIds,
                    nonce: productSave.nonce,
                    action: "shwcatalog_updateOrder_attributes"
                }
                jQuery.ajax({
                    url: ajaxurl,
                    method: 'post',
                    data: general_data,
                    dataType: 'json',
                    beforeSend: function () {
                        doingAjax = true;
                    }
                }).always(function () {
                    doingAjax = false;
                }).done(function (response) {
                    if (response) {
                        // jQuery( "#sortable" ).sortable('enable');
                        jQuery('#addAtributeId').attr("value", "");
                        jQuery('.shwproduct_allAttributes').html('');
                        jQuery('.shwproduct_allAttributes').append('<div id="check">');
                        for (var i = 0; i < response.length; i++) {
                            var el = response[i];
                            jQuery('.shwproduct_allAttributes').append('</div><label uid=' + el.id + ' id="attribute' + el.id + '" class="ui-state-default">' + htmlEncode(el.title) +
                                '<span class="attributeClose" uid=' + el.id + '></span></label>'
                            );
                        }
                    }
                })
            }
        });
        jQuery("#sortable").disableSelection();
    });
    jQuery(function () {
        jQuery("#editImage").sortable({
            update: function (event, ui) {
                var thumbnailsId = [];
                var listArray = jQuery("div[class$=shwcatalog_thumbnails_edit]");
                var productId = jQuery("input[name=shwimage_images_id]").val();
                for (var i = 0; i < listArray.length; i++) {
                    thumbnailsId.push({
                        id: parseInt(listArray[i].getAttribute('thumbnailsId')),
                        order: i + 1
                    });
                }
                var general_data = {
                    product_id: parseInt(productId),
                    thumbnailsId: thumbnailsId,
                    nonce: productSave.nonce,
                    action: "shwcatalog_updateOrder_thumbnails"
                }
                // jQuery( "#editImage" ).sortable('disable');

                jQuery.ajax({
                    url: ajaxurl,
                    method: 'post',
                    data: general_data,
                    dataType: 'json',
                    beforeSend: function () {
                        doingAjax = true;
                    }
                }).always(function () {
                    doingAjax = false;
                }).done(function (response) {
                    if (response) {
                        // jQuery( "#editImage" ).sortable('enable');
                        var thumbnailsDiv = jQuery(".thumbnails");
                        var thumbnails = response.thumbnails;


                        var div = updateThumbnailsCatalogProduct(thumbnails, true);
                        thumbnailsDiv.html("");
                        thumbnailsDiv.append(div);
                    }
                })
            }
        });
        jQuery("#editImage").disableSelection();
    });
    /* Portfolio*/
    jQuery(function () {
        jQuery("#productsSortable").sortable({
            placeholder: "ui-state-highlight",
            update: function (event, ui) {
                var productIds = [];
                var catalog_id = jQuery("input[name=shwcatalog_id]").val();
                var noimage = jQuery("input[name=noimage]").val();
                var listArray = jQuery('.items_checkbox');
                for (var i = 0; i < listArray.length; i++) {
                    productIds.push({
                        id: parseInt(listArray[i].value),
                        order: i + 1
                    });
                }
                var general_data = {
                    action: 'shwcatalog_updateOrder_products',
                    nonce: productSave.nonce,
                    catalog_id: catalog_id,
                    productIds: productIds
                };
                jQuery("#productsSortable").sortable('disable');
                jQuery.ajax({
                    url: ajaxurl,
                    method: 'post',
                    data: general_data,
                    dataType: 'json',
                    beforeSend: function () {
                        doingAjax = true;
                    }
                }).always(function () {
                    doingAjax = false;
                }).done(function (response) {
                    if (response) {
                        jQuery("#productsSortable").sortable('enable');
                        jQuery('.shwproduct_items_list').html('');
                        for (var i = 0; i < response.length; i++) {
                            var el = response[i];
                            var src = el['image_id'] == -1 ? noimage : el['guid'];
                            jQuery('.shwproduct_items_list').append(
                                '<div class="shwproduct_item ui-state-default">' +
                                '<input type="hidden" name="imagegroup_' + el['id'] + '"/>' +
                                '<img src="' + src + '"/>' +
                                '<div class="shwproduct_item_overlay">' +
                                '<input type="checkbox" name="items[]" value="' + el['id'] + '" class="items_checkbox"/>' +
                                '<div class="shwproduct_item_edit shwcatalog_item_edit" productId="' + el['id'] + '">' +
                                '<a href="#">EDIT</a>' +
                                '</div>' +
                                '</div>' +
                                '</div>'
                            );
                        }
                    } else {
                        toastr.error('Error while saving. Code No# 15');
                    }
                }).fail(function () {
                    toastr.error('Error while saving');
                });
            }
        });
        jQuery("#productsSortable").disableSelection();
    });
    jQuery(function () {
        jQuery("#forceId").sortable({
            stop: function (ev, ui) {
                var children = jQuery('#forceId').sortable('refreshPositions').children();
                var i = 0;
                jQuery.each(children, function () {
                    var className = i % 2 == 0 ? " shwdatarow backFill_ ui-state-default" : "shwdatarow ui-state-default";
                    this.className = '';
                    this.className = className;
                    i++
                });
            },
            update: function (event, ui) {
                var productIds = [];
                var catalog_id = jQuery("input[name=shwcatalog_id]").val();
                var noimage = jQuery("input[name=noimage]").val();
                var type = jQuery("input[name=shwcatalog_type]").val();
                var listArray = jQuery('.shwquickedit_image');
                var srcImageUrl = jQuery("input[name=srcImageUrl]").val();
                for (var i = 0; i < listArray.length; i++) {
                    var prodId = parseInt(listArray[i].getAttribute('productId'));
                    var visible = jQuery('input[name="selectorCondition[' + prodId + ']"]').attr('checked') ? 1 : 0;
                    var title = jQuery('input[name="productTitle[' + prodId + ']"]').val();
                    var description = jQuery('input[name="productDescription[' + prodId + ']"]').val();
                    var price = jQuery('input[name="productPrice[' + prodId + ']"]').val();
                    var discount = jQuery('input[name="discountPrice[' + prodId + ']"]').val();
                    productIds.push({
                        id: prodId,
                        order: i + 1,
                        visible: visible,
                        title: title,
                        description: description,
                        price: price,
                        discount: discount
                    });
                }
                //TODO
                var general_data = {
                    action: 'shwcatalog_updateOrder_products',
                    nonce: productSave.nonce,
                    catalog_id: catalog_id,
                    productIds: productIds
                };
                //jQuery( "#forceId" ).sortable('disable');
                jQuery.ajax({
                    url: ajaxurl,
                    method: 'post',
                    data: general_data,
                    dataType: 'json',
                    beforeSend: function () {
                        doingAjax = true;
                    }
                }).always(function () {
                    doingAjax = false;
                }).done(function (response) {
                    if (response) {
                    } else {
                        toastr.error('Error while saving');
                    }
                }).fail(function () {
                    toastr.error('Error while saving');
                });
            }
        });
        jQuery("#forceId").disableSelection();
        jQuery('#forceId input').keydown(function(e){
            if (e.keyCode == 65 && e.ctrlKey) {
                e.target.select()
            }
        })
    });
});

jQuery(".editOptions li a").click(function (e) {
    e.preventDefault();
    jQuery('a[href="#grid_item"]').removeClass('shwtheme_options_list_active');
    var target = e.target;
    var type = target.getAttribute('type');
    var ul_ = document.getElementsByClassName('editOptions shwtheme_options_list');
    var li_ = ul_[0];
    jQuery(".editOptions>li.active").removeClass("active");
    target.parentElement.className = "active";
    jQuery('.-shwoptions-modal').hide();
    jQuery('#' + type).show();
    if (type === 'load_more') {
        document.getElementById('loadMore').scrollIntoView(true);
    }
});