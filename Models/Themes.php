<?php

namespace SHWPortfolioCatalog\Models;

use SHWPortfolioCatalog\Core\Model;

class Themes extends Model
{
    protected static $tableName = 'shwthemes';
    protected static $primaryKey = 'id';
    public $title;
    public $id;
    private $displayTitle;
    private $theme;
    private $propertie;
    private $options =  array(
                    "layoutWidth"=>"100",
                    "layoutAlign"=>"center",
                    "layoutContainerBackground"=>"#ffffff",
                    "view"=>"1",
                    "gridItemWidth"=>"33",
                    "gridItemDimension"=>"%",
                    "gridItemFixedHeight"=>"true",
                    "gridItemHeight"=>"270",
                    "gridItemShowTitle"=>"true",
                    "gridItemTitle1"=>"18",
                    "gridItemTitle2"=>"#333333",
                    "gridItemTitle3"=>"arial",
                    "gridItemShowDescription"=>"false",
                    "gridItemDescription1"=>"30",
                    "gridItemDescription2"=>"#333333",
                    "gridItemDescription3"=>"inherit",
                    "gridItemShowPrice"=>"true",
                    "gridItemShowPrice1"=>"16",
                    "gridItemShowPrice2"=>"#333333",
                    "gridItemShowPrice3"=>"inherit",
                    "gridItemShowDiscountPrice"=>"true",
                    "gridItemShowDiscountPrice1"=>"16",
                    "gridItemShowDiscountPrice2"=>"#33acdd",
                    "gridItemShowDiscountPrice3"=>"inherit",
                    "gridItemMargin"=>"10",
                    "gridItemBackgroundTransparency"=>"0",
                    "gridItemBorderRadius"=>"5",
                    "gridItemBackgroundColor"=>"#fafafa",
                    "gridItemBackgroundColorHover"=>"#ececec",
                    "itemPopupPopupWidth"=>"90",
                    "itemPopupDimension"=>"%",
                    "itemPopupBackground"=>"#fdfdfd",
                    "itemPopupOverlayColor"=>"#000000",
                    "itemPopupOverlayTransparency"=>"10",
                    "itemPopupIconsColor"=>"#ffffff",
                    "itemPopupTitle1"=>"30",
                    "itemPopupTitle2"=>"#333333",
                    "itemPopupTitle3"=>"inherit",
                    "itemPopupDescription1"=>"16",
                    "itemPopupDescription2"=>"#303030",
                    "itemPopupDescription3"=>"inherit",
                    "itemPopupPrice1"=>"24",
                    "itemPopupPrice2"=>"#303030",
                    "itemPopupPrice3"=>"inherit",
                    "itemPopupDiscountPrice1"=>"24",
                    "itemPopupDiscountPrice2"=>"#33acdd",
                    "itemPopupDiscountPrice3"=>"inherit",
                    "itemPopupLabels1"=>"20",
                    "itemPopupLabels2"=>"#333333",
                    "itemPopupLabels3"=>"inherit",
                    "itemPopupAttributes1"=>"18",
                    "itemPopupAttributes2"=>"#303030",
                    "itemPopupAttributes3"=>"inherit",
                    "itemPageTitle"=>"25",
                    "itemPageTitleColor"=>"#333333",
                    "itemPageTitleFontStyle"=>"inherit",
                    "itemPageDescription"=>"14",
                    "itemPageDescriptionColor"=>"#303030",
                    "itemPageDescriptionFontStyle"=>"inherit",
                    "itemPagePrice"=>"20",
                    "itemPagePriceColor"=>"#303030",
                    "itemPagePriceFontStyle"=>"inherit",
                    "itemPageDiscountPrice"=>"20",
                    "itemPageDiscountPriceColor"=>"#33acdd",
                    "itemPageDiscountPriceFontStyle"=>"inherit",
                    "itemPageLabele"=>"17",
                    "itemPageLabeleColor"=>"#303030",
                    "itemPageLabeleFontStyle"=>"inherit",
                    "itemPageAttribute"=>"15",
                    "itemPageAttributeColor"=>"#303030",
                    "itemPageAttributeFontStyle"=>"inherit",
                    "categoryButtonsPositionBtn"=>"left",
                    "categoryButtonsTextSize"=>"14",
                    "categoryButtonsText"=>"#262626",
                    "categoryButtonsTextFontStyle"=>"arial",
                    "categoryButtonsPaddingSize"=>"10",
                    "categoryButtonsGapSpaceSize"=>"9",
                    "categoryButtonsBackgroundColor"=>"#fcfcfc",
                    "categoryButtonsBackgroundColorHover"=>"#fcfcfc",
                    "categoryButtonsStyleLinkOrButton"=>"button",
                    "categoryButtonsBorderColor"=>"#262626",
                    "categoryButtonsBorderThickness"=>"1",
                    "categoryButtonsBorderRadius"=>"3",
                    "categoryButtonsBorderColorHover"=>"#33acdd",
                    "orderingButtonsPositionBtn"=>"left",
                    "orderingButtonsTextSize"=>"14",
                    "orderingButtonsTextColor"=>"#262626",
                    "orderingButtonsFontStyle"=>"arial",
                    "orderingButtonsPadding"=>"5",
                    "orderingButtonsGapSpace"=>"5",
                    "orderingButtonsBackgroundColor"=>"#ffffff",
                    "orderingButtonsBackgroundColorHover"=>"#ffffff",
                    "orderingButtonsStyleButtonOrLink"=>"link",
                    "orderingButtonsBorderColor"=>"#262626",
                    "orderingButtonsBorderThickness"=>"2",
                    "orderingButtonsBorderRadius"=>"5",
                    "orderingButtonsBorderColorHover"=>"#33acdd",
                    "searchFieldPosition"=>"left",
                    "searchFieldPlaceholderText"=>"Search",
                    "searchFieldTextSize"=>"14",
                    "searchFieldTextColor"=>"#262626",
                    "searchFieldTextFontStyle"=>"arial",
                    "searchFieldBackground"=>"#ffffff",
                    "searchFieldButtonIconColor"=>"#f8f4f4",
                    "searchFieldButtonBackground"=>"#170000",
                    "searchFieldPadding"=>"4",
                    "searchFieldBorderColor"=>"FFF",
                    "searchFieldBorderSize"=>"12",
                    "searchFieldBorderRadius"=>"3",
                    "searchFieldButtonBackgroundHover"=>"#33acdd",
                    "loadMoreType"=>"scroll",
                    "loadMoreLoadingIcons"=>"4",
                    "loadMoreDefaultImagesCount"=>"15",
                    "loadMorefaultCount"=>"15",
                    "loadMoreButtonText"=>"See More",
                    "loadMoreButtonTextSize"=>"14",
                    "loadMoreButtonTextColor"=>"#d16868",
                    "loadMoreButtonFontStyle"=>"arial",
                    "loadMoreButtonPadding"=>"20",
                    "loadMoreButtonBackgroundColor"=>"#c18282",
                    "loadMoreButtonBackgroundColorHover"=>"#c72b2b",
                    "loadMoreButtonBorderColor"=>"#ca7373",
                    "loadMoreButtonBorderColorHover"=>"#e00d0d",
                    "loadMoreBorderThickness"=>"6",
                    "loadMoreBorderRadius"=>"6",
                    "sliderEnableArrows"=>"true",
                    "sliderArrowsColor"=>"#696969",
                    "sliderArrowsColorHover"=>"#33acdd",
                    "sliderEnableDots"=>"true",
                    "sliderDotsColor"=>"#acacac",
                    "sliderDotsColorActive"=>"#0c8fc7",
                    "sliderSlidesToShow"=>"3",
                    "sliderSlidesToScroll"=>"3",
                    "sliderScrollSpeed"=>"1000",
                    "sliderAutoPlay"=>"false",
                    "sliderSlidesToShowHidden"=>"5"
    );
    public function getOptions() {
       return $this->options;
    }

    public function getOptionsObject() {
       return json_decode(json_decode($this->options));
    }

    public function setOptions($options_) {
        $this->options = $options_ == null ? json_encode ($this->options) : json_encode ($options_);
        return $this;
    }
    public function getPropertie()
    {
        return $this->propertie;
    }

    public function setPropertie($propertie)
    {
        $this->propertie = $propertie;
    }

    protected static $dbFields = array(
        'title', 'options'
    );


    public static function getAllThemes()    {
        global $wpdb;
        $query = "select * from `" . $wpdb->prefix . "shwthemes` order by id";
        $themes = $wpdb->get_results($query);
        if (empty($themes)) {
            return null;
        }
        return $themes;
    }

    public function __construct($args = array())   {
        parent::__construct($args);
        if (null !== $this->id) {
            $this->theme = $this->getTheme();
            $this->title = $this->theme->title;
        } else {
            $this->title = __('New Theme', SHWPORTFOLIOCATALOG_TEXT_DOMAIN);
            $this->displayTitle = 1;
        }
    }

    /* Update Theme*/
    public function updateThemeTitle($title) {
        global $wpdb;
        $where = array(
            'id' => $this->id
        );
        $updatedData = array("title"=>$title);
        $update = $wpdb->update($wpdb->prefix . "shwthemes", $updatedData, $where);
        return $update;
    }

    /* Remove Theme */
    public function removeTheme() {
        global $wpdb;
        $where = array(
            'id' => $this->id
        );
        $deleted = $wpdb->delete($wpdb->prefix . "shwthemes", $where);
        return $deleted;
    }

    public function setId($id)   {
        $this->id = $id;
    }

    public function getId() {
        return $this->id;
    }

    public function getTheme() {
        global $wpdb;
        $query = $wpdb->prepare("select * from `" . $wpdb->prefix . "shwthemes` where id=%d order by id", $this->id);
        $themes = $wpdb->get_row($query);
        if (empty($themes)) {
            return null;
        }
        $this->theme = $themes;
        return $this->theme;
    }

    public function getThemeById($id) {
	    global $wpdb;
	    $query = $wpdb->prepare("select * from `" . $wpdb->prefix . "shwthemes` where id=%d order by id", $id);
	    $themes = $wpdb->get_row($query);
	    if (empty($themes)) {
		    return null;
	    }
	    $this->theme = $themes;
	    return $this->theme;
    }

    public static function getThemeById_($id) {
        global $wpdb;
        $query = $wpdb->prepare("select * from `" . $wpdb->prefix . "shwthemes` where id=%d order by id", $id);
        $themes = $wpdb->get_row($query);
        if (empty($themes)) {
            return null;
        }
        return json_decode($themes->options);
    }

    public function getTitle() {
        return (!empty($this->title) ? $this->title : __('(no title)', SHWPORTFOLIOCATALOG_TEXT_DOMAIN));
    }
    public function setTitle($title)  {
        $this->title = sanitize_text_field($title);
        return $this;
    }

    public static function getTableName()  {
        return $GLOBALS['wpdb']->prefix . self::$tableName;
    }

    public function unsetId() {
        $this->id = null;
        return $this;
    }

    public static function getThemesUrl() {
        global $wpdb;
        $list = array();
        $themes = $wpdb->get_results(
            "select `id`,`title` from `" . $wpdb->prefix . "shwthemes` order by id"
        );
        foreach ($themes as $val) {
            $EditUrl = admin_url('admin.php?page=shwportfoliocatalog_themes&task=edit_theme&id=' . $val->id);
            $EditUrl = wp_nonce_url($EditUrl, 'shwcatalog_edit_theme_' . $val->id);
            $list[] = array(
                "id" => $val->id,
                "name" => $val->title,
                "url" => $EditUrl
            );
        }
        return $list;
    }
}