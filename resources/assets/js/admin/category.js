/* Category */
jQuery('#doaction').on('click tap', function (e) {
    var action = document.getElementById('bulk-action-selector-top');
    if (action.value == 'delete') {
        if (!confirm("Are you sure you want to delete this item?")) {
            return false;
        }
    }
})
function getTemplate(child, editUrl, delete_category_link) {
    var tmpl = ' <tr id="tag-' + child['id'] + '">' +
        '<th scope="row" class="check-column">' +
        '<label class="screen-reader-text" for="cb-select-31">Select' + child["title"] + '</label>' +
        '<input type="checkbox" name="delete_tags[]" value="' + child["id"] + '" id="cb-select-31">' +
        '</th>' +
        '<td class="name column-name has-row-actions column-primary" data-colname="Name">' +
        '<strong>' +
        '<a class="row-title" href="' + editUrl + '" aria-label="' + child['title'] + ' (Edit)">' + child['title'] + '</a>' +
        '</strong><br>' +
        '<div class="row-actions">' +
        '<span class="edit">' +
        '<a href="' + editUrl + '" aria-label="Edit “' + child['title'] + '">Edit</a> |' +
        '</span>' +
        '<span class="inline hide-if-no-js">' +
        '<a href="#" uid="' + child['id'] + '" class="editinline aria-button-if-js" aria-label="Quick edit “' + child['title'] + '” inline" role="button">Quick&nbsp;Edit</a> |' +
        '</span>' +
        '<span class="delete">' +
        '<a href="' + delete_category_link + '" class="delete-tag aria-button-if-js" aria-label="Delete “' + child['title'] + '" role="button">Delete</a> |' +
        '</span>' +
        '<span class="view">' +
        '<a href="" target="_blank">View</a>' +
        '</span>' +
        '</div>' +
        '<button type="button" class="toggle-row"' +
        '<span class="screen-reader-text">Show more details</span>' +
        '</button>' +
        '</td>' +
        '<td class="description column-description" data-colname="Description">' + child['description'] + '</td>' +
        '<td class="slug column-slug" data-colname="Slug">' + child['slug'] + '</td>' +
        '</tr>' +
        '<tr id="edit-' + child['id'] + '" style="display:none;" class="inline-edit-row inline-editor">' +
        '<td colspan="5" class="colspanchange">' +
        '<fieldset>' +
        '<legend class="inline-edit-legend">Quick Edit</legend>' +
        '<div class="inline-edit-col">' +
        '<label>' +
        '<span class="title">Name</span>' +
        '<span class="input-text-wrap"><input type="text" name="name" class="ptitle" value="' + child['title'] + '"></span>' +
        '</label>' +
        '<label>' +
        '<span class="title">Slug</span>' +
        '<span class="input-text-wrap"><input type="text" name="slug" class="ptitle" value="' + child['slug'] + '"></span>' +
        '</label>' +
        '</div>' +
        '</fieldset>' +
        '<p class="inline-edit-save submit">' +
        '<button type="button" uid ="' + child['id'] + '"  class="cancel button alignleft">Cancel</button>' +
        '<button type="button" uid ="' + child['id'] + '" class="save button button-primary alignright">Update Category</button>' +
        '<span class="spinner"></span>' +
        '<span class="error" style="display:none;"></span>' +
        '<br class="clear">' +
        '</p>' +
        '</td>' +
        '</tr>';
    return tmpl;
}
jQuery(document).ready(function () {
    jQuery('#the-list').on('click', function (e) {
        var target = e.target;
        if (target.className === "editinline aria-button-if-js") {
            var id = target.getAttribute('uid');
            jQuery('#tag-' + id).hide();
            jQuery('#edit-' + id).show();
        } else if (target.className === "cancel button alignleft") {
            var id = target.getAttribute('uid');
            jQuery('#tag-' + id).show();
            jQuery('#edit-' + id).hide();
        } else if (target.className === "save button button-primary alignright") {
            var id = target.getAttribute('uid');
            var catTitle = jQuery('#edit-' + id).find('input[name=name]').val();
            var slugTitle = jQuery('#edit-' + id).find('input[name=slug]').val();
            var formData = {
                catTitle: catTitle,
                slugTitle: slugTitle,
                id: id
            }
            general_data = {
                action: "shwupdate_category",
                nonce: addCategory.nonce,
                formdata: formData
            };
            jQuery.ajax({
                url: ajaxurl,
                method: 'post',
                data: general_data,
                dataType: 'json',
                beforeSend: function () {
                    doingAjax = true;
                    // submitBtn.attr("disabled", 'disabled');
                    // submitBtn.parent().find(".spinner").css("visibility", "visible");
                }
            }).always(function () {
                doingAjax = false;
                // submitBtn.removeAttr("disabled");
                // submitBtn.parent().find(".spinner").css("visibility", "hidden");
            }).done(function (response) {
                if (response) {
                    jQuery('#the-list').html('');
                    for (var i in response) {
                        var editUrl = response[i].editUrl;
                        var delete_category_link = response[i].delete_category_link;
                        jQuery('#the-list').append(getTemplate(response[i], editUrl, delete_category_link));
                    }
                    document.getElementById('catDescription').value = "";
                    document.getElementById('tag-name').value = "";
                    document.getElementById('tag-slug').value = "";
                } else {
                    toastr.error('Error while saving. Code No# 1');
                }
            }).fail(function () {
                toastr.error('Error while saving. Code No# 2');
            });
        }
    });
    jQuery('.button.button-primary.addCategoryBtn').on('click', function (e) {
        e.preventDefault();
        var form = jQuery('#addCategory');
        var catTitle = document.getElementById('tag-name').value;
        var slugTitle = document.getElementById('tag-slug').value;
        var catDescription = document.getElementById('catDescription').value;
        var formData = {
            catTitle: catTitle,
            slugTitle: slugTitle,
            catDescription: catDescription
        }
        general_data = {
            action: "shwadd_category",
            nonce: addCategory.nonce,
            formdata: formData
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
                jQuery('#the-list').html('');
                for (var i in response) {
                    var editUrl = response[i].editUrl;
                    var delete_category_link = response[i].delete_category_link;
                    jQuery('#the-list').append(getTemplate(response[i], editUrl, delete_category_link));
                }
                document.getElementById('catDescription').value = "";
                document.getElementById('tag-name').value = "";
                document.getElementById('tag-slug').value = "";
            } else {
                toastr.error('Error while saving. Code No# 3');
            }
        }).fail(function () {
            toastr.error('Error while saving. Code No# 4');
        });
        return false;
    })
    /* Search Categories*/
    jQuery('#searchCategory').on('click', function (e) {
        seartTerm();
    });
    jQuery("#categoryTerm").bind('keyup', function(event){
        if(event.keyCode == 13){
            seartTerm();
        }
    });
});
function seartTerm() {
    var categoryTerm = document.getElementById('categoryTerm').value;
    var searchCategory = document.getElementById('searchCategory').value = "";
    var load = document.getElementById('load').style.display = "block";
    general_data = {
        action: "shwsearch_category",
        nonce: addCategory.nonce,
        categoryTerm: categoryTerm
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
        // submitBtn.removeAttr("disabled");
        // submitBtn.parent().find(".spinner").css("visibility", "hidden");
    }).done(function (response) {
        if (response) {
            var load = document.getElementById('load').style.display = "none";
            var searchCategory = document.getElementById('searchCategory').value = "Search";
            jQuery('#the-list').html('');
            for (var i in response) {
                var editUrl = response[i].editUrl;
                var delete_category_link = response[i].delete_category_link;
                jQuery('#the-list').append(getTemplate(response[i], editUrl, delete_category_link));
            }
            document.getElementById('catDescription').value = "";
            document.getElementById('tag-name').value = "";
            document.getElementById('tag-slug').value = "";
        } else {
            toastr.error('Error while saving. Code No# 5');
        }
    }).fail(function () {
        toastr.error('Error while saving. Code No# 6');
    });
    return false;
}