<tr id="tag-<?php echo $child->id ?>">
    <th scope="row" class="check-column">
        <label class="screen-reader-text" for="cb-select-31">Select <?php $child->title; ?></label>
        <input type="checkbox" name="delete_tags[]" value="<?php echo $child->id ?>" id="cb-select-31">
    </th>
    <td class="name column-name has-row-actions column-primary" data-colname="Name">
        <strong>
            <a class="row-title" href="<?php echo $editUrl ?>" aria-label="<?php echo $child->title ?> (Edit)"><?php echo $child->title ?></a>
        </strong><br>
        <div class="row-actions">

                            <span class="edit">

                                <a href="<?php echo $editUrl ?>" aria-label="Edit “<?php echo $child->title ?>">Edit</a> |

                            </span><span class="inline hide-if-no-js">

                                <a href="#" uid="<?php echo $child->id; ?>" class="editinline aria-button-if-js" aria-label="Quick edit “<?php echo $child->title; ?>” inline" role="button">Quick&nbsp;Edit</a> |

                            </span>
            <span class="delete">

                                <a href="<?php echo $delete_category_link ?>" class="delete-tag aria-button-if-js" aria-label="Delete “<?php echo $child->title; ?>" role="button">Delete</a> |

                            </span>
        </div>
        <button type="button" class="toggle-row"
        <span class="screen-reader-text">Show more details</span></button>
    </td>
    <td class="description column-description" data-colname="Description"><?php echo $child->description ?></td>
</tr>
<tr id="edit-<?php echo $child->id ?>" style="display:none;" class="inline-edit-row inline-editor" style="">
    <td colspan="5" class="colspanchange">
        <fieldset>
            <legend class="inline-edit-legend">Quick Edit</legend>
            <div class="inline-edit-col">
                <label>
                    <span class="title">Name</span>
                    <span class="input-text-wrap"><input type="text" name="name" class="ptitle" value="<?php echo $child->title ?>"></span>
                </label>
            </div>
        </fieldset>
        <p class="inline-edit-save submit">
            <button type="button" uid="<?php echo $child->id ?>" class="cancel button alignleft">Cancel</button>
            <button type="button" uid="<?php echo $child->id ?>" class="save button button-primary alignright">Update Category</button>
            <span class="spinner"></span>
            <span class="error" style="display:none;"></span>
            <br class="clear">
        </p>
    </td>
</tr>