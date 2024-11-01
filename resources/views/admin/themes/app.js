import React, {Component} from "react";
import ReactDOM from "react-dom";
import LayoutOptions from "./options/components/layoutOptions";
import GridItem from "./options/components/gridItem";
import ItemPage from "./options/components/itemPage";
import SliderOptions from "./options/components/sliderOptions";
import Draggable from "react-draggable";
import PreviewPanel from "./options/components/previewPanel";
import CategoryButtons from "./options/components/categoryButtons";
import OrderingButtons from "./options/components/orderingButtons";
import SearchField from "./options/components/searchField";
import LoadMore from "./options/components/loadMore";
import ItemPopup from "./options/components/itemPopup";

class App extends Component {
    constructor(props) {
        super(props);
        let themeData = JSON.parse(document.getElementById('themePopup').getAttribute('options'));
        let state = {
            layoutWidth: 50,
            layoutAlign: 'center',
            layoutContainerBackground: 'FFF',
            view: 1,
            gridItemWidth: '1024',
            gridItemDimension: 'px',
            gridItemFixedHeight: true,
            gridItemHeight: 300,
            gridItemShowTitle: true,
            gridItemTitle1: 'title1',
            gridItemTitle2: 'title1',
            gridItemTitle3: 'title1',
            gridItemShowDescription: true,
            gridItemDescription1: 'description1',
            gridItemDescription2: 'description2',
            gridItemDescription3: 'description3',
            gridItemShowPrice: true,
            gridItemShowPrice1: 'price1',
            gridItemShowPrice2: 'price2',
            gridItemShowPrice3: 'price3',
            gridItemShowDiscountPrice: true,
            gridItemShowDiscountPrice1: 'Discount Price 1',
            gridItemShowDiscountPrice2: 'Discount Price 1',
            gridItemShowDiscountPrice3: 'Discount Price 1',
            gridItemMargin: 1,
            gridItemBackgroundTransparency: 1,
            gridItemBorderRadius: 1,
            gridItemBackgroundColor: '888',
            gridItemBackgroundColorHover: 'ededed',
            // Item Popup
            itemPopupPopupWidth: '100',
            itemPopupDimension: 'px',
            itemPopupBackground: 'FFF',
            itemPopupOverlayColor: 'FFF',
            itemPopupOverlayTransparency: '0.5',
            itemPopupIconsColor: 'FFF',
            itemPopupTitle1: 'Title1',
            itemPopupTitle2: 'Title2',
            itemPopupTitle3: 'Title3',
            itemPopupDescription1: 'Description 1',
            itemPopupDescription2: 'Description 2',
            itemPopupDescription3: 'Description 3',
            itemPopupPrice1: 'Price1',
            itemPopupPrice2: ' Price2',
            itemPopupPrice3: ' Price3',
            itemPopupDiscountPrice1: 'Discount Price1',
            itemPopupDiscountPrice2: 'Discount Price2',
            itemPopupDiscountPrice3: 'Discount Price3',
            itemPopupLabels1: 'Popup Labels1',
            itemPopupLabels2: 'Popup Labels2',
            itemPopupLabels3: 'Popup Labels3',
            itemPopupAttributes1: 'Attributes1',
            itemPopupAttributes2: 'Attributes2',
            itemPopupAttributes3: 'Attributes3',
            //Item Page
            //itemPageEnableImageZoom : true,
            itemPageTitle: 'Title',
            itemPageTitleColor: 'FFF',
            itemPageTitleFontStyle: 'Arial',
            itemPageDescription: 'Description',
            itemPageDescriptionColor: 'FFF',
            itemPageDescriptionFontStyle: 'Arial',
            itemPagePrice: 'Price',
            itemPagePriceColor: 'FFF',
            itemPagePriceFontStyle: 'Arial',
            itemPageDiscountPrice: 'Discount Price',
            itemPageDiscountPriceColor: 'FFF',
            itemPageDiscountPriceFontStyle: 'Arial',
            itemPageLabele: 'Label',
            itemPageLabeleColor: 'FFF',
            itemPageLabeleFontStyle: 'Arial',
            itemPageAttribute: 'Attribute',
            itemPageAttributeColor: 'FFF',
            itemPageAttributeFontStyle: 'Arial',
            // Category buttons
            categoryButtonsPositionBtn: 'top',
            categoryButtonsTextSize: 12,
            categoryButtonsText: 'text',
            categoryButtonsTextFontStyle: 'Arial',
            categoryButtonsPaddingSize: 2,
            categoryButtonsGapSpaceSize: 2,
            categoryButtonsBackgroundColor: 'FFF',
            categoryButtonsBackgroundColorHover: 'FFF',
            categoryButtonsStyleLinkOrButton: 'button',
            categoryButtonsBorderColor: 'FFF',
            categoryButtonsBorderThickness: 1,
            categoryButtonsBorderRadius: 2,
            //Ordering Buttons
            orderingButtonsPositionBtn: 'top',
            orderingButtonsTextSize: 12,
            orderingButtonsTextColor: 'FFF',
            orderingButtonsFontStyle: 'Arial',
            orderingButtonsPadding: 2,
            orderingButtonsGapSpace: 2,
            orderingButtonsBackgroundColor: 'FFF',
            orderingButtonsBackgroundColorHover: 'FFF',
            orderingButtonsStyleButtonOrLink: 'Link',
            orderingButtonsBorderColor: 'FFF',
            orderingButtonsBorderThickness: 2,
            orderingButtonsBorderRadius: 2,
            orderingButtonsBorderColorHover: '888',
            //Search Field
            searchFieldPosition: 'top',
            searchFieldPlaceholderText: 'text',
            searchFieldTextSize: 12,
            searchFieldTextColor: 'FFF',
            searchFieldTextFontStyle: 'Arial',
            searchFieldBackground: 'FFF',
            searchFieldButtonIconColor: 'FFF',
            searchFieldButtonBackground: 'FFf',
            searchFieldPadding: 12,
            searchFieldBorderColor: 'FFF',
            searchFieldBorderSize: 12,
            searchFieldBorderRadius: 1,
            searchFieldButtonBackgroundHover: 'FFF',
            //Load More
            loadMoreType: 'button',
            loadMoreLoadingIcons: 'loading1',
            loadMoreDefaultImagesCount: 20,
            loadMorefaultCount: 10,
            loadMoreButtonText: 'Load More',
            loadMoreButtonTextSize: '14',
            loadMoreButtonTextColor: '555',
            loadMoreButtonFontStyle: 'Arial',
            loadMoreButtonPadding: '20',
            loadMoreButtonBackgroundColor: 'fefefe',
            loadMoreButtonBackgroundColorHover:'8888',
            loadMoreButtonBorderColor: '888',
            loadMoreButtonBorderColorHover: '888',
            loadMoreBorderThickness: 3,
            loadMoreBorderRadius: 3,
            //Slider Options
            sliderEnableArrows: false,
            sliderArrowsColor: 'fff',
            sliderArrowsColorHover: 'fff',
            sliderEnableDots: true,
            sliderDotsColor: '000',
            sliderDotsColorActive: '888',
            sliderSlidesToShow: 5,
            sliderSlidesToScroll: 2,
            sliderScrollSpeed: 1000,
            sliderAutoPlay: true,
            sliderSlidesToShowHidden: 5
        };
        this.state = {
            pluginUrl: themeData.pluginUrl ? themeData.pluginUrl : '',
            layoutWidth: themeData.layoutWidth ? themeData.layoutWidth : 50,
            layoutAlign: themeData.layoutAlign ? themeData.layoutAlign : state.layoutAlign,
            layoutContainerBackground: themeData.layoutContainerBackground ? themeData.layoutContainerBackground : state.layoutContainerBackground,
            view: themeData.view ? themeData.view : state.view,
            gridItemWidth: themeData.gridItemWidth ? themeData.gridItemWidth : state.gridItemWidth,
            gridItemDimension: themeData.gridItemDimension ? themeData.gridItemDimension : state.gridItemDimension,
            gridItemFixedHeight: themeData.gridItemFixedHeight ? themeData.gridItemFixedHeight : state.gridItemFixedHeight,
            gridItemHeight: themeData.gridItemHeight ? themeData.gridItemHeight : state.gridItemHeight,
            gridItemShowTitle: themeData.gridItemShowTitle ? themeData.gridItemShowTitle : state.gridItemShowTitle,
            gridItemTitle1: themeData.gridItemTitle1 ? themeData.gridItemTitle1 : state.gridItemTitle1,
            gridItemTitle2: themeData.gridItemTitle2 ? themeData.gridItemTitle2 : state.gridItemTitle2,
            gridItemTitle3: themeData.gridItemTitle3 ? themeData.gridItemTitle3 : state.gridItemTitle3,
            gridItemShowDescription: themeData.gridItemShowDescription ? themeData.gridItemShowDescription : state.gridItemShowDescription,
            gridItemDescription1: themeData.gridItemDescription1 ? themeData.gridItemDescription1 : state.gridItemDescription1,
            gridItemDescription2: themeData.gridItemDescription2 ? themeData.gridItemDescription2 : state.gridItemDescription2,
            gridItemDescription3: themeData.gridItemDescription3 ? themeData.gridItemDescription3 : state.gridItemDescription3,
            gridItemShowPrice: themeData.gridItemShowPrice ? themeData.gridItemShowPrice : state.gridItemShowPrice,
            gridItemShowPrice1: themeData.gridItemShowPrice1 ? themeData.gridItemShowPrice1 : state.gridItemShowPrice1,
            gridItemShowPrice2: themeData.gridItemShowPrice2 ? themeData.gridItemShowPrice2 : state.gridItemShowPrice2,
            gridItemShowPrice3: themeData.gridItemShowPrice3 ? themeData.gridItemShowPrice3 : state.gridItemShowPrice3,
            gridItemShowDiscountPrice: themeData.gridItemShowDiscountPrice ? themeData.gridItemShowDiscountPrice : state.gridItemShowDiscountPrice,
            gridItemShowDiscountPrice1: themeData.gridItemShowDiscountPrice1 ? themeData.gridItemShowDiscountPrice1 : state.gridItemShowDiscountPrice1,
            gridItemShowDiscountPrice2: themeData.gridItemShowDiscountPrice2 ? themeData.gridItemShowDiscountPrice2 : state.gridItemShowDiscountPrice2,
            gridItemShowDiscountPrice3: themeData.gridItemShowDiscountPrice3 ? themeData.gridItemShowDiscountPrice3 : state.gridItemShowDiscountPrice3,
            gridItemMargin: themeData.gridItemMargin ? themeData.gridItemMargin : state.gridItemMargin,
            gridItemBackgroundTransparency: themeData.gridItemBackgroundTransparency ? themeData.gridItemBackgroundTransparency : state.gridItemBackgroundTransparency,
            gridItemBorderRadius: themeData.gridItemBorderRadius ? themeData.gridItemBorderRadius : state.gridItemBorderRadius,
            gridItemBackgroundColor: themeData.gridItemBackgroundColor ? themeData.gridItemBackgroundColor : state.gridItemBackgroundColor,
            gridItemBackgroundColorHover: themeData.gridItemBackgroundColorHover ? themeData.gridItemBackgroundColorHover : state.gridItemBackgroundColorHover,
            //Item Popup
            itemPopupPopupWidth: themeData.itemPopupPopupWidth ? themeData.itemPopupPopupWidth : state.itemPopupPopupWidth,
            itemPopupDimension: themeData.itemPopupDimension ? themeData.itemPopupDimension : state.itemPopupDimension,
            itemPopupSizeByPx: themeData.itemPopupSizeByPx ? themeData.itemPopupSizeByPx : state.itemPopupSizeByPx,
            itemPopupSizeByPrc: themeData.itemPopupSizeByPrc ? themeData.itemPopupSizeByPrc : state.itemPopupSizeByPrc,
            itemPopupBackground: themeData.itemPopupBackground ? themeData.itemPopupBackground : state.itemPopupBackground,
            itemPopupOverlayColor: themeData.itemPopupOverlayColor ? themeData.itemPopupOverlayColor : state.itemPopupOverlayColor,
            itemPopupOverlayTransparency: themeData.itemPopupOverlayTransparency ? themeData.itemPopupOverlayTransparency : state.itemPopupOverlayTransparency,
            itemPopupIconsColor: themeData.itemPopupIconsColor ? themeData.itemPopupIconsColor : state.itemPopupIconsColor,
            itemPopupTitle1: themeData.itemPopupTitle1 ? themeData.itemPopupTitle1 : state.itemPopupTitle1,
            itemPopupTitle2: themeData.itemPopupTitle2 ? themeData.itemPopupTitle2 : state.itemPopupTitle2,
            itemPopupTitle3: themeData.itemPopupTitle3 ? themeData.itemPopupTitle3 : state.itemPopupTitle3,
            itemPopupDescription1: themeData.itemPopupDescription1 ? themeData.itemPopupDescription1 : state.itemPopupDescription1,
            itemPopupDescription2: themeData.itemPopupDescription2 ? themeData.itemPopupDescription2 : state.itemPopupDescription2,
            itemPopupDescription3: themeData.itemPopupDescription3 ? themeData.itemPopupDescription3 : state.itemPopupDescription3,
            itemPopupPrice1: themeData.itemPopupPrice1 ? themeData.itemPopupPrice1 : state.itemPopupPrice1,
            itemPopupPrice2: themeData.itemPopupPrice2 ? themeData.itemPopupPrice2 : state.itemPopupPrice2,
            itemPopupPrice3: themeData.itemPopupPrice3 ? themeData.itemPopupPrice3 : state.itemPopupPrice3,
            itemPopupDiscountPrice1: themeData.itemPopupDiscountPrice1 ? themeData.itemPopupDiscountPrice1 : state.itemPopupDiscountPrice1,
            itemPopupDiscountPrice2: themeData.itemPopupDiscountPrice2 ? themeData.itemPopupDiscountPrice2 : state.itemPopupDiscountPrice2,
            itemPopupDiscountPrice3: themeData.itemPopupDiscountPrice3 ? themeData.itemPopupDiscountPrice3 : state.itemPopupDiscountPrice3,
            itemPopupLabels1: themeData.itemPopupLabels1 ? themeData.itemPopupLabels1 : state.itemPopupLabels1,
            itemPopupLabels2: themeData.itemPopupLabels2 ? themeData.itemPopupLabels2 : state.itemPopupLabels2,
            itemPopupLabels3: themeData.itemPopupLabels3 ? themeData.itemPopupLabels3 : state.itemPopupLabels3,
            itemPopupAttributes1: themeData.itemPopupAttributes1 ? themeData.itemPopupAttributes1 : state.itemPopupAttributes1,
            itemPopupAttributes2: themeData.itemPopupAttributes2 ? themeData.itemPopupAttributes2 : state.itemPopupAttributes2,
            itemPopupAttributes3: themeData.itemPopupAttributes3 ? themeData.itemPopupAttributes3 : state.itemPopupAttributes3,
            //Item Page
            itemPageTitle: themeData.itemPageTitle ? themeData.itemPageTitle : state.itemPageTitle,
            itemPageTitleColor: themeData.itemPageTitleColor ? themeData.itemPageTitleColor : state.itemPageTitleColor,
            itemPageTitleFontStyle: themeData.itemPageTitleFontStyle ? themeData.itemPageTitleFontStyle : state.itemPageTitleFontStyle,
            itemPageDescription: themeData.itemPageDescription ? themeData.itemPageDescription : state.itemPageDescription,
            itemPageDescriptionColor: themeData.itemPageDescriptionColor ? themeData.itemPageDescriptionColor : state.itemPageDescriptionColor,
            itemPageDescriptionFontStyle: themeData.itemPageDescriptionFontStyle ? themeData.itemPageDescriptionFontStyle : state.itemPageDescriptionFontStyle,
            itemPagePrice: themeData.itemPagePrice ? themeData.itemPagePrice : state.itemPagePrice,
            itemPagePriceColor: themeData.itemPagePriceColor ? themeData.itemPagePriceColor : state.itemPagePriceColor,
            itemPagePriceFontStyle: themeData.itemPagePriceFontStyle ? themeData.itemPagePriceFontStyle : state.itemPagePriceFontStyle,
            itemPageDiscountPrice: themeData.itemPageDiscountPrice ? themeData.itemPageDiscountPrice : state.itemPageDiscountPrice,
            itemPageDiscountPriceColor: themeData.itemPageDiscountPriceColor ? themeData.itemPageDiscountPriceColor : state.itemPageDiscountPriceColor,
            itemPageDiscountPriceFontStyle: themeData.itemPageDiscountPriceFontStyle ? themeData.itemPageDiscountPriceFontStyle : state.itemPageDiscountPriceFontStyle,
            itemPageLabele: themeData.itemPageLabele ? themeData.itemPageLabele : state.itemPageLabele,
            itemPageLabeleColor: themeData.itemPageLabeleColor ? themeData.itemPageLabeleColor : state.itemPageLabeleColor,
            itemPageLabeleFontStyle: themeData.itemPageLabeleFontStyle ? themeData.itemPageLabeleFontStyle : state.itemPageLabeleFontStyle,
            itemPageAttribute: themeData.itemPageAttribute ? themeData.itemPageAttribute : state.itemPageAttribute,
            itemPageAttributeColor: themeData.itemPageAttributeColor ? themeData.itemPageAttributeColor : state.itemPageAttributeColor,
            itemPageAttributeFontStyle: themeData.itemPageAttributeFontStyle ? themeData.itemPageAttributeFontStyle : state.itemPageAttributeFontStyle,
            // Category buttons
            categoryButtonsPositionBtn: themeData.categoryButtonsPositionBtn ? themeData.categoryButtonsPositionBtn : state.categoryButtonsPositionBtn,
            categoryButtonsTextSize: themeData.categoryButtonsTextSize ? themeData.categoryButtonsTextSize : state.categoryButtonsTextSize,
            categoryButtonsText: themeData.categoryButtonsText ? themeData.categoryButtonsText : state.categoryButtonsText,
            categoryButtonsTextFontStyle: themeData.categoryButtonsTextFontStyle ? themeData.categoryButtonsTextFontStyle : state.categoryButtonsTextFontStyle,
            categoryButtonsPaddingSize: themeData.categoryButtonsPaddingSize ? themeData.categoryButtonsPaddingSize : state.categoryButtonsPaddingSize,
            categoryButtonsGapSpaceSize: themeData.categoryButtonsGapSpaceSize ? themeData.categoryButtonsGapSpaceSize : state.categoryButtonsGapSpaceSize,
            categoryButtonsBackgroundColor: themeData.categoryButtonsBackgroundColor ? themeData.categoryButtonsBackgroundColor : state.categoryButtonsBackgroundColor,
            categoryButtonsBackgroundColorHover: themeData.categoryButtonsBackgroundColorHover ? themeData.categoryButtonsBackgroundColorHover : state.categoryButtonsBackgroundColorHover,
            categoryButtonsStyleLinkOrButton: themeData.categoryButtonsStyleLinkOrButton ? themeData.categoryButtonsStyleLinkOrButton : state.categoryButtonsStyleLinkOrButton,
            categoryButtonsBorderColor: themeData.categoryButtonsBorderColor ? themeData.categoryButtonsBorderColor : state.categoryButtonsBorderColor,
            categoryButtonsBorderThickness: themeData.categoryButtonsBorderThickness ? themeData.categoryButtonsBorderThickness : state.categoryButtonsBorderThickness,
            categoryButtonsBorderRadius: themeData.categoryButtonsBorderRadius ? themeData.categoryButtonsBorderRadius : state.categoryButtonsBorderRadius,
            categoryButtonsBorderColorHover: themeData.categoryButtonsBorderColorHover ? themeData.categoryButtonsBorderColorHover : state.categoryButtonsBorderColorHover,
            //Ordering Buttons
            orderingButtonsPositionBtn: themeData.orderingButtonsPositionBtn ? themeData.orderingButtonsPositionBtn : state.orderingButtonsPositionBtn,
            orderingButtonsTextSize: themeData.orderingButtonsTextSize ? themeData.orderingButtonsTextSize : state.orderingButtonsTextSize,
            orderingButtonsTextColor: themeData.orderingButtonsTextColor ? themeData.orderingButtonsTextColor : state.orderingButtonsTextColor,
            orderingButtonsFontStyle: themeData.orderingButtonsFontStyle ? themeData.orderingButtonsFontStyle : state.orderingButtonsFontStyle,
            orderingButtonsPadding: themeData.orderingButtonsPadding ? themeData.orderingButtonsPadding : state.orderingButtonsPadding,
            orderingButtonsGapSpace: themeData.orderingButtonsGapSpace ? themeData.orderingButtonsGapSpace : state.orderingButtonsGapSpace,
            orderingButtonsBackgroundColor: themeData.orderingButtonsBackgroundColor ? themeData.orderingButtonsBackgroundColor : state.orderingButtonsBackgroundColor,
            orderingButtonsBackgroundColorHover: themeData.orderingButtonsBackgroundColorHover ? themeData.orderingButtonsBackgroundColorHover : state.orderingButtonsBackgroundColorHover,
            orderingButtonsStyleButtonOrLink: themeData.orderingButtonsStyleButtonOrLink ? themeData.orderingButtonsStyleButtonOrLink : state.orderingButtonsStyleButtonOrLink,
            orderingButtonsBorderColor: themeData.orderingButtonsBorderColor ? themeData.orderingButtonsBorderColor : state.orderingButtonsBorderColor,
            orderingButtonsBorderThickness: themeData.orderingButtonsBorderThickness ? themeData.orderingButtonsBorderThickness : state.orderingButtonsBorderThickness,
            orderingButtonsBorderRadius: themeData.orderingButtonsBorderRadius ? themeData.orderingButtonsBorderRadius : state.orderingButtonsBorderRadius,
            orderingButtonsBorderColorHover: themeData.orderingButtonsBorderColorHover ? themeData.orderingButtonsBorderColorHover : state.orderingButtonsBorderColorHover,
            // Search Field
            searchFieldPosition: themeData.searchFieldPosition ? themeData.searchFieldPosition : state.searchFieldPosition,
            searchFieldPlaceholderText: themeData.searchFieldPlaceholderText ? themeData.searchFieldPlaceholderText : state.searchFieldPlaceholderText,
            searchFieldTextSize: themeData.searchFieldTextSize ? themeData.searchFieldTextSize : state.searchFieldTextSize,
            searchFieldTextColor: themeData.searchFieldTextColor ? themeData.searchFieldTextColor : state.searchFieldTextColor,
            searchFieldTextFontStyle: themeData.searchFieldTextFontStyle ? themeData.searchFieldTextFontStyle : state.searchFieldTextFontStyle,
            searchFieldBackground: themeData.searchFieldBackground ? themeData.searchFieldBackground : state.searchFieldBackground,
            searchFieldButtonIconColor: themeData.searchFieldButtonIconColor ? themeData.searchFieldButtonIconColor : state.searchFieldButtonIconColor,
            searchFieldButtonBackground: themeData.searchFieldButtonBackground ? themeData.searchFieldButtonBackground : state.searchFieldButtonBackground,
            searchFieldPadding: themeData.searchFieldPadding ? themeData.searchFieldPadding : state.searchFieldPadding,
            searchFieldBorderColor: themeData.searchFieldBorderColor ? themeData.searchFieldBorderColor : state.searchFieldBorderColor,
            searchFieldBorderSize: themeData.searchFieldBorderSize ? themeData.searchFieldBorderSize : state.searchFieldBorderSize,
            searchFieldBorderRadius: themeData.searchFieldBorderRadius ? themeData.searchFieldBorderRadius : state.searchFieldBorderRadius,
            searchFieldButtonBackgroundHover: themeData.searchFieldButtonBackgroundHover ? themeData.searchFieldButtonBackgroundHover : state.searchFieldButtonBackgroundHover,
            //Load More
            loadMoreType: themeData.loadMoreType ? themeData.loadMoreType : state.loadMoreType,
            loadMoreLoadingIcons: themeData.loadMoreLoadingIcons ? themeData.loadMoreLoadingIcons : state.loadMoreLoadingIcons,
            loadMoreDefaultImagesCount: themeData.loadMoreDefaultImagesCount ? themeData.loadMoreDefaultImagesCount : state.loadMoreDefaultImagesCount,
            loadMorefaultCount: themeData.loadMorefaultCount ? themeData.loadMorefaultCount : state.loadMorefaultCount,
            loadMoreButtonText: themeData.loadMoreButtonText ? themeData.loadMoreButtonText : state.loadMoreButtonText,
            loadMoreButtonTextSize: themeData.loadMoreButtonTextSize ? themeData.loadMoreButtonTextSize : state.loadMoreButtonTextSize,
            loadMoreButtonTextColor: themeData.loadMoreButtonTextColor ? themeData.loadMoreButtonTextColor : state.loadMoreButtonTextColor,
            loadMoreButtonFontStyle: themeData.loadMoreButtonFontStyle ? themeData.loadMoreButtonFontStyle : state.loadMoreButtonFontStyle,
            loadMoreButtonPadding: themeData.loadMoreButtonPadding ? themeData.loadMoreButtonPadding : state.loadMoreButtonPadding,
            loadMoreButtonBackgroundColor: themeData.loadMoreButtonBackgroundColor ? themeData.loadMoreButtonBackgroundColor : state.loadMoreButtonBackgroundColor,
            loadMoreButtonBackgroundColorHover: themeData.loadMoreButtonBackgroundColorHover ? themeData.loadMoreButtonBackgroundColorHover : state.loadMoreButtonBackgroundColorHover,
            loadMoreButtonBorderColor: themeData.loadMoreButtonBorderColor ? themeData.loadMoreButtonBorderColor : state.loadMoreButtonBorderColor,
            loadMoreButtonBorderColorHover: themeData.loadMoreButtonBorderColorHover ? themeData.loadMoreButtonBorderColorHover : state.loadMoreButtonBorderColorHover,
            loadMoreBorderThickness: themeData.loadMoreBorderThickness ? themeData.loadMoreBorderThickness : state.loadMoreBorderThickness,
            loadMoreBorderRadius: themeData.loadMoreBorderRadius ? themeData.loadMoreBorderRadius : state.loadMoreBorderRadius,
            //Slider Options
            sliderEnableArrows: themeData.sliderEnableArrows ? themeData.sliderEnableArrows : state.sliderEnableArrows,
            sliderArrowsColor: themeData.sliderArrowsColor ? themeData.sliderArrowsColor : state.sliderArrowsColor,
            sliderArrowsColorHover: themeData.sliderArrowsColorHover ? themeData.sliderArrowsColorHover : state.sliderArrowsColorHover,
            sliderEnableDots: themeData.sliderEnableDots ? themeData.sliderEnableDots : state.sliderEnableDots,
            sliderDotsColor: themeData.sliderDotsColor ? themeData.sliderDotsColor : state.sliderDotsColor,
            sliderDotsColorActive: themeData.sliderDotsColorActive ? themeData.sliderDotsColorActive : state.sliderDotsColorActive,
            sliderSlidesToShow: themeData.sliderSlidesToShow ? themeData.sliderSlidesToShow : state.sliderSlidesToShow,
            sliderSlidesToScroll: themeData.sliderSlidesToScroll ? themeData.sliderSlidesToScroll : state.sliderSlidesToScroll,
            sliderScrollSpeed: themeData.sliderScrollSpeed ? themeData.sliderScrollSpeed : state.sliderScrollSpeed,
            sliderAutoPlay: themeData.sliderAutoPlay ? themeData.sliderAutoPlay : state.sliderAutoPlay,
            sliderSlidesToShowHidden: themeData.sliderSlidesToShowHidden ? themeData.sliderSlidesToShowHidden : state.sliderSlidesToShowHidden
        };
    }

    onValueChanged(data) {
        for (let i in data) {
            this.state[i] = data[i];
        }
        this.setState(this.state);
    }

    componentDidMount() {
        jQuery('.editor_box').on('keyup keypress blur change', function (e) {
            changes = true;
        });
        this.setState(this.state);
        window.onbeforeunload = function () {
            if (changes) {
                return "";
            }
        }
    }

    onSubmitData() {
        var doingAjax;
        var theme_id = parseInt(jQuery('input[name=theme_id]').val());
        var general_data = {
            action: 'shwcatalog_updatethemesData',
            nonce: productSave.nonce,
            data: this.state,
            isSave: true,
            theme_id: theme_id
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
            toastr.success('Saved Successfully');
            changes = false;
        }).fail(function () {
            toastr.error('Error while saving. Code No# 19');
        });
    }
    render() {
        let themeData = this.state;
        return (
            <div>
                <div>
                    <PreviewPanel receivedData={this.state}/>
                </div>
                <div>
                    <Draggable handle='.editor_box_title' bounds='div[class=themeContainer]'>
                        <div id="layout_options" className="-shwoptions-modal">
                            <LayoutOptions themeData={themeData} onSubmitData={this.onSubmitData.bind(this)} onGiveValue={this.onValueChanged.bind(this)}/>
                        </div>
                    </Draggable>
                    <Draggable handle='.editor_box_title' bounds='div[class=themeContainer]'>
                        <div id="grid_item" className="-shwoptions-modal">
                            <GridItem themeData={themeData} onSubmitData={this.onSubmitData.bind(this)} onGiveValue={this.onValueChanged.bind(this)} view={this.state.view}/>
                        </div>
                    </Draggable>
                    <Draggable handle='.editor_box_title' bounds='div[class=themeContainer]'>
                        <div id="item_popup" className="-shwoptions-modal">
                            <ItemPopup themeData={themeData} onSubmitData={this.onSubmitData.bind(this)} onGiveValue={this.onValueChanged.bind(this)}/>
                        </div>
                    </Draggable>
                    <Draggable handle='.editor_box_title' bounds='div[class=themeContainer]'>
                        <div id="item_page" className="-shwoptions-modal">
                            <ItemPage themeData={themeData} onSubmitData={this.onSubmitData.bind(this)} onGiveValue={this.onValueChanged.bind(this)}/>
                        </div>
                    </Draggable>
                    <Draggable handle='.editor_box_title' bounds='div[class=themeContainer]'>
                        <div id="category_buttons" className="-shwoptions-modal">
                            <CategoryButtons themeData={themeData} onSubmitData={this.onSubmitData.bind(this)} onGiveValue={this.onValueChanged.bind(this)}/>
                        </div>
                    </Draggable>
                    <Draggable handle='.editor_box_title' bounds='div[class=themeContainer]'>
                        <div id="ordering_button" className="-shwoptions-modal">
                            <OrderingButtons themeData={themeData} onSubmitData={this.onSubmitData.bind(this)} onGiveValue={this.onValueChanged.bind(this)}/>
                        </div>
                    </Draggable>
                    <Draggable handle='.editor_box_title' bounds='div[class=themeContainer]'>
                        <div id="search_field" className="-shwoptions-modal">
                            <SearchField themeData={themeData} onSubmitData={this.onSubmitData.bind(this)} onGiveValue={this.onValueChanged.bind(this)}/>
                        </div>
                    </Draggable>
                    <Draggable handle='.editor_box_title' bounds='div[class=themeContainer]'>
                        <div id="load_more" className="-shwoptions-modal" style={{bottom: "50px", top:"auto"}}>
                            <LoadMore themeData={themeData} onSubmitData={this.onSubmitData.bind(this)} onGiveValue={this.onValueChanged.bind(this)}/>
                        </div>
                    </Draggable>
                    <Draggable handle='.editor_box_title' bounds='div[class=themeContainer]'>
                        <div id="slider_options" className="-shwoptions-modal">
                            <SliderOptions themeData={themeData} onSubmitData={this.onSubmitData.bind(this)} onGiveValue={this.onValueChanged.bind(this)}/>
                        </div>
                    </Draggable>
                </div>
            </div>
        );
    }
}
ReactDOM.render(<App />, document.getElementById('layoutOptions'));