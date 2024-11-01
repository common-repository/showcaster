<?php
function removeslashes($string) {
    $string = implode("", explode("\\", $string));
    return stripslashes(trim($string));
}

function setLastChar($permalink_structure) {
    $lastChar = $permalink_structure[strlen($permalink_structure) - 1];
    if ($lastChar == '/') {
        return $permalink_structure;
    } else {
        return $permalink_structure . '/';
    }
}

function getCount($arr) {
    $count = 0;
    if (!empty($arr)) {
        for ($i = 0; $i < count($arr); $i++) {
            if ($arr[$i]->is_visible == 'on' || $arr[$i]->is_visible == NULL) {
                $count++;
            }
        }
    }
    return $count;
}

function spaces($str) {
    return preg_replace('/\s+/', '-', $str);
}

function replaceToSpace($str) {
    return preg_replace('/-/', ' ', $str);
}

function thumbnailImg($thumbnail, $catalog) {
    $thumbnails = array();
    foreach ($thumbnail as $key => $val) {
        $thumbnailUrl = $val->guid;
        $imgurlThumb = explode(";", $thumbnailUrl);
        $imgurlThumb1024 = esc_url($catalog->portfolio_catalog_get_image_by_sizes_and_src($imgurlThumb[0], 'large', false));
        $imgurlThumbFull = esc_url($catalog->portfolio_catalog_get_image_by_sizes_and_src($imgurlThumb[0], 'full', false));
        $imgurlThumb640 = esc_url($catalog->portfolio_catalog_get_image_by_sizes_and_src($imgurlThumb[0], 'large', false));
        array_push($thumbnails, array(
                'imgurlThumb1024' => $imgurlThumb1024,
                'imgurlThumb640' => $imgurlThumb640,
                'id' => $val->id,
                'image_id' => $val->image_id,
                'guid' => $imgurlThumbFull,
                'ordering' => $val->ordering,
                'product_id' => $val->product_id)
        );
    }
    return $thumbnails;
}

?>