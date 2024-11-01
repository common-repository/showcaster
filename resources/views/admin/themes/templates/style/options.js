import React, {Component} from "react";
class Options extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let cssData =this.props.css;
        let layoutAlign ="";
        if(cssData.layoutAlign=="center"){
            layoutAlign = " margin:0px auto !important;";
        } else if(cssData.layoutAlign=="right"){layoutAlign = "float:right;";}


        function hexToRGB(hex, alpha) {
            var r = parseInt(hex.slice(1, 3), 16),
                g = parseInt(hex.slice(3, 5), 16),
                b = parseInt(hex.slice(5, 7), 16);
            alpha=1-(alpha/100);
            return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
        }

        function hexToNewColor(hex, alpha) {
            var r = parseInt(hex.slice(1, 3), 16),
                g = parseInt(hex.slice(3, 5), 16),
                b = parseInt(hex.slice(5, 7), 16);

                r = parseInt(r*alpha/100);
                g = parseInt(g*alpha/100);
                b = parseInt(b*alpha/100);

            alpha=1-(alpha/100);
            return "rgb(" + r + ", " + g + ", " + b + ")";
        }

        function buttonsPositioning(positionBtn, gapSpace){
            let styles="";
            if(positionBtn=="top"){
                styles="margin:0px "+gapSpace/2+"px !important;";
            }else {
                styles="margin-bottom:"+gapSpace+"px !important;";
            }
            return styles;
        }

        function buttonsStyle(styleBtn, borderSizeBtn, borderColorBtn, borderRadiusBtn){
            let styles="";
            if(styleBtn=="button"){
                styles="border:"+borderSizeBtn+"px solid "+borderColorBtn+" !important;" +
                    "border-radius:"+borderRadiusBtn+"px !important;" +
                    "text-align:center !important;";
            }else {
                styles="border-bottom:"+borderSizeBtn+"px solid "+borderColorBtn+" !important; border-radius:0px !important;";
            }
            return styles;
        }

        function showArrows(field){
            //alert(field);
            field=!!field;
            if(!field){return "padding:0px;";}
            else {return '';}
        }

        function infoHeight(){
            let title = cssData.gridItemShowTitle;
            let desc = cssData.gridItemShowDescription;
            let price = cssData.gridItemShowPrice;
            let disc = cssData.gridItemShowDiscountPrice;
           // console.log("title="+title+" desc="+desc+" price="+price+" disc="+disc);
            let th, dh, ph;

            title=="true" || title==true ? th=cssData.gridItemTitle1*1+2 : th=0;
            desc=="true" || desc==true ? dh=cssData.gridItemDescription1*2+4 : dh=0;
            price=="true"  || price==true? ph=cssData.gridItemShowPrice1*1+5 : ph=0;
            if(disc=="true" || disc==true){ph<cssData.gridItemShowDiscountPrice1 ? ph=cssData.gridItemShowDiscountPrice1*1+5 : ph=ph;/*ph=ph is the magic, remove it an ull see the result =)*/}


           // console.log("th="+th+"="+cssData.gridItemTitle1+" dh="+dh+"="+cssData.gridItemDescription1+" ph="+ph+"="+cssData.gridItemShowDiscountPrice1);
            let sum=0;
            if(th>0 || dh>0 || ph>0) {
                sum=th+dh+ph+12;
            }
            //console.log("sum="+sum);
            return sum;
        }

        let showTitleField = cssData.gridItemShowTitle == "false" || !cssData.gridItemShowTitle ? "display:none !important;" : "";
        let showDescriptionField = cssData.gridItemShowDescription == "false" || !cssData.gridItemShowDescription ? "display:none !important;" : "";
        let showPriceShowPriceField = cssData.gridItemShowPrice == "false"  || !cssData.gridItemShowPrice ? "display:none !important;" : "";
        let showDiscountPriceeField = cssData.gridItemShowDiscountPrice == "false" || !cssData.gridItemShowDiscountPrice ? "display:none !important;" : "";

        let showInfoblock =  infoHeight()== 0 ? "display:none !important;" : "";

        let  galleryListCss = `
            .shwc_template {
                width:${cssData.layoutWidth}% !important;
                background:${cssData.layoutContainerBackground};
                ${layoutAlign}
            }
            
            /*#############GRID ITEM#############*/
             
             /*#######LAYOUT 1######*/
            .shwc_pc_wrapper.pc_view1 .shwcgrid-item {
                width:calc(${cssData.gridItemWidth+cssData.gridItemDimension} - ${cssData.gridItemMargin*2}px);
                height: ${cssData.gridItemHeight*1+infoHeight()}px;
                margin:${cssData.gridItemMargin}px;
                background:${hexToRGB(cssData.gridItemBackgroundColor,cssData.gridItemBackgroundTransparency)};
                border-radius:${cssData.gridItemBorderRadius}px;
            }
            .shwc_pc_wrapper.pc_view1 .shwcgrid-item:hover {
                background:${hexToRGB(cssData.gridItemBackgroundColorHover,cssData.gridItemBackgroundTransparency)};
            }
            
            .shwc_pc_wrapper.pc_view1 .shwcgrid-item .thumb_slider,
            .shwc_pc_wrapper.pc_view1 .shwcgrid-item .thumb_slider > ul li {
                /*STYLES ABOVE ARE ONLY FOR PREVIEW SLIDER*/
                height:${cssData.gridItemHeight}px !important;
            }
            
            /*#######LAYOUT 2######*/
            
            .shwc_pc_wrapper.pc_view2 .slider_wrapper {
                ${showArrows(cssData.sliderEnableArrows)}
            }
           
            .slick-prev, .slick-next {
                ${showArrows(cssData.sliderEnableArrows)}
            }
           
            .slick-prev:before, .slick-next:before { color:${cssData.sliderArrowsColor};}
            .slick-prev:hover:before, .slick-next:hover:before { color:${cssData.sliderArrowsColorHover};}
            .slick-dots li button:before { color:${cssData.sliderDotsColor};}
            .slick-dots li.slick-active button:before { color:${cssData.sliderDotsColorActive};}
            
            .shwc_pc_wrapper.pc_view2 .slider_item {
                background:${hexToRGB(cssData.gridItemBackgroundColor,cssData.gridItemBackgroundTransparency)};
                border-radius:${cssData.gridItemBorderRadius}px;
            }
            .shwc_pc_wrapper.pc_view2 .slider_item:hover {
                 background:${hexToRGB(cssData.gridItemBackgroundColorHover,cssData.gridItemBackgroundTransparency)};
            }
            .shwc_pc_wrapper.pc_view2 .slick-slide {
                margin:0px ${cssData.gridItemMargin}px 0px ${cssData.gridItemMargin}px;
            }
            .shwc_pc_wrapper.pc_view2 .slider_item .image_block {
                height:${cssData.gridItemHeight}px;
            }
                        
            
             /*#######LAYOUT 3######*/
             
             .shwc_pc_wrapper.pc_view3 .shwcgrid-item {
                width:calc(${cssData.gridItemWidth}${cssData.gridItemDimension} - ${cssData.gridItemMargin*2}px);
                margin:0px ${cssData.gridItemMargin}px ${cssData.gridItemMargin*2}px ${cssData.gridItemMargin}px;
                height:${cssData.gridItemHeight*1+12}px;
                background:${hexToRGB(cssData.gridItemBackgroundColor,cssData.gridItemBackgroundTransparency)};
                border-radius:${cssData.gridItemBorderRadius}px;
            }
            
            .shwc_pc_wrapper.pc_view3 .shwcgrid-item:hover {
                background:${hexToRGB(cssData.gridItemBackgroundColorHover,cssData.gridItemBackgroundTransparency)};
            }
            .shwc_pc_wrapper.pc_view3 .shwcgrid-item .board_block {
                height:${cssData.gridItemHeight-infoHeight()}px;
            }
            
                        
             /*#######LAYOUT 4######*/
             
             .shwc_pc_wrapper.pc_view4 .shwcgrid-item {
                margin:0px 0px ${cssData.gridItemMargin}px 0px;
                background:${hexToRGB(cssData.gridItemBackgroundColor,cssData.gridItemBackgroundTransparency)};
            }
            .shwc_pc_wrapper.pc_view4 .shwcgrid-item.right_image {
                background:${hexToRGB(cssData.gridItemBackgroundColorHover,cssData.gridItemBackgroundTransparency)};
            }
            .shwc_pc_wrapper.pc_view4 .shwcgrid-item .image_block { width:50%; /*FREE VERSION HAS FIXED WIDTH<?php echo $gridItemWidth; ?>%*/ }
            .shwc_pc_wrapper.pc_view4 .shwcgrid-item .info_block { width:50%;/*FREE VERSION HAS FIXED WIDTH<?php echo 100-$gridItemWidth; ?>%*/ }
                    
                        
            /*#######LAYOUT 5######*/
            
            .shwc_pc_wrapper.pc_view5 .shwcgrid-item {
                width:calc(${cssData.gridItemWidth}${cssData.gridItemDimension} - ${cssData.gridItemMargin*2}px);
                margin:0px ${cssData.gridItemMargin}px ${cssData.gridItemMargin*2}px ${cssData.gridItemMargin}px;
                height:auto;
                background:${hexToRGB(cssData.gridItemBackgroundColor,cssData.gridItemBackgroundTransparency)};
                border-radius:${cssData.gridItemBorderRadius}px;
            }
            
            .shwc_pc_wrapper.pc_view5 .shwcgrid-item:hover {
                background:${hexToRGB(cssData.gridItemBackgroundColorHover,cssData.gridItemBackgroundTransparency)};
            }
            
            .shwc_pc_wrapper.pc_view5 .shwcgrid-item .info_block {
                ${showInfoblock};
            }
            
            
            
            /*#######LAYOUT 6######*/
                  
            .shwc_pc_wrapper.pc_view6 .shwcgrid-item {
                margin-bottom:${cssData.gridItemMargin}px;
                height:auto;
                background:${hexToRGB(cssData.gridItemBackgroundColor,cssData.gridItemBackgroundTransparency)};
                border-radius:${cssData.gridItemBorderRadius}px;
            }
            .shwc_pc_wrapper.pc_view6 .shwcgrid-item:hover {
                 background:${hexToRGB(cssData.gridItemBackgroundColorHover,cssData.gridItemBackgroundTransparency)};
            }
            .shwc_pc_wrapper.pc_view6 .shwcgrid-item .images_list {
                width:${cssData.gridItemWidth}%;
            }
            .shwc_pc_wrapper.pc_view6 .shwcgrid-item .info_block {
                padding-left:5%;
                width:${95-cssData.gridItemWidth}%;
            }
           
            
            
             /*#######LAYOUT GLOBAL STYLES######*/
            .shwc_pc_wrapper .shwcgrid-item .title,
            .shwc_pc_wrapper .slider_item .title {
                ${showTitleField}
                font-size:${cssData.gridItemTitle1}px;
                line-height:${cssData.gridItemTitle1*1+2}px;
                color:${cssData.gridItemTitle2};
                font-family:${cssData.gridItemTitle3};
            }
            
            .shwc_pc_wrapper .shwcgrid-item .description,
             .shwc_pc_wrapper .slider_item .description {
                ${showDescriptionField}
                font-size:${cssData.gridItemDescription1}px;
                line-height:${cssData.gridItemDescription1*1+2}px;
                color:${cssData.gridItemDescription2};
                font-family:${cssData.gridItemDescription3};
            }
            
            .shwc_pc_wrapper.pc_view1 .shwcgrid-item .description,
            .shwc_pc_wrapper.pc_view2 .slider_item .description,
            .shwc_pc_wrapper.pc_view3 .shwcgrid-item .description {
                 height: ${cssData.gridItemDescription1*2+6}px;
             }
           
            
            
            .shwc_pc_wrapper .shwcgrid-item .price,
             .shwc_pc_wrapper .slider_item .price {
                ${showPriceShowPriceField}
                font-size:${cssData.gridItemShowPrice1}px;
                line-height:${cssData.gridItemShowPrice1*1+2}px;
                color:${cssData.gridItemShowPrice2};
                font-family:${cssData.gridItemShowPrice3};
            }
            
            .shwc_pc_wrapper .shwcgrid-item .discont_price,
             .shwc_pc_wrapper .slider_item .discont_price {
                ${showDiscountPriceeField}
                font-size:${cssData.gridItemShowDiscountPrice1}px;
                line-height:${cssData.gridItemShowDiscountPrice1*1+2}px;
                color:${cssData.gridItemShowDiscountPrice2};
                font-family:${cssData.gridItemShowDiscountPrice3};
            }
            
            .shwc_pc_wrapper.pc_view1 .shwcgrid-item .info_block,
            .shwc_pc_wrapper.pc_view2 .slider_item .info_block,
            .shwc_pc_wrapper.pc_view3 .shwcgrid-item .info_block{
                height:${infoHeight()}px;
            }
            
            
            /*##############CATEGORY BUTTONS#############*/
            
            .shwc_template .categories_list > div button {
                font-size:${cssData.categoryButtonsTextSize}px !important;
                line-height:${cssData.categoryButtonsTextSize*1+2}px !important;
                color:${cssData.categoryButtonsText} !important;
                font-family:${cssData.categoryButtonsTextFontStyle} !important;
                padding:${cssData.categoryButtonsPaddingSize/2}px ${cssData.categoryButtonsPaddingSize}px !important;
                height:${cssData.categoryButtonsTextSize*1+2+cssData.categoryButtonsPaddingSize*1+cssData.categoryButtonsBorderThickness*2}px;
                background:${cssData.categoryButtonsBackgroundColor} !important;
                ${buttonsPositioning(cssData.categoryButtonsPositionBtn,cssData.categoryButtonsGapSpaceSize)}
                ${buttonsStyle(cssData.categoryButtonsStyleLinkOrButton, cssData.categoryButtonsBorderThickness, cssData.categoryButtonsBorderColor, cssData.categoryButtonsBorderRadius)}
            }
            
            .shwc_template .categories_list > div button:hover,
            .shwc_template .categories_list > div button.is-checked {
                background:${cssData.categoryButtonsBackgroundColorHover} !important;
                border-color:${cssData.categoryButtonsBorderColorHover} !important;
            }
            
            
            /*###################ORDERING BUTTONS##################*/
            
            .shwc_template .ordering_butons_list > div button {
                font-size:${cssData.orderingButtonsTextSize}px !important;
                line-height:${cssData.orderingButtonsTextSize*1+2}px !important;
                color:${cssData.orderingButtonsTextColor} !important;
                font-family:${cssData.orderingButtonsFontStyle} !important;
                padding:${cssData.orderingButtonsPadding/2}px ${cssData.orderingButtonsPadding}px !important;
                 height:${cssData.orderingButtonsTextSize*1+2+cssData.orderingButtonsPadding*1+cssData.orderingButtonsBorderThickness*2}px;
                background:${cssData.orderingButtonsBackgroundColor} !important;
                ${buttonsPositioning(cssData.orderingButtonsPositionBtn,cssData.orderingButtonsGapSpace)}
                ${buttonsStyle(cssData.orderingButtonsStyleButtonOrLink, cssData.orderingButtonsBorderThickness, cssData.orderingButtonsBorderColor, cssData.orderingButtonsBorderRadius)}
            }
            
            .shwc_template .ordering_butons_list > div button:hover,
            .shwc_template .ordering_butons_list > div button.is-checked {
                background:${cssData.orderingButtonsBackgroundColorHover} !important;
                border-color:${cssData.orderingButtonsBorderColorHover} !important;
            }
            
            
            /*###################SEARCH##################*/
            
            .shwc_template .search_form {
                border-radius:${cssData.searchFieldBorderRadius}px;
                height:${cssData.searchFieldTextSize*1+2+(cssData.searchFieldPadding*2)}px;
            }
            .shwc_template .search_form input[type="text"] {
                font-size:${cssData.searchFieldTextSize}px !important;
                line-height:${cssData.searchFieldTextSize*1+2}px !important;
                height:${cssData.searchFieldTextSize*1+2+(cssData.searchFieldPadding*2)}px;
                padding:${cssData.searchFieldPadding}px ${cssData.searchFieldPadding*2.6+23}px ${cssData.searchFieldPadding}px ${cssData.searchFieldPadding}px !important;
                color:${cssData.searchFieldTextColor};
                font-family:${cssData.searchFieldTextFontStyle};
                background:${cssData.searchFieldBackground};
                border-color:${cssData.searchFieldBackground};
                border-radius:${cssData.searchFieldBorderRadius}px;
            }
            
             .shwc_template .search_form input::-webkit-input-placeholder,
            .shwc_template .search_form input:-moz-placeholder {
                color:${hexToRGB(cssData.searchFieldTextColor, 40)};
            }

            .shwc_template .search_form button {
                height:${cssData.searchFieldTextSize*1+2+(cssData.searchFieldPadding*2)}px;
                width:${cssData.searchFieldPadding*2.6+18}px;
                background:${cssData.searchFieldButtonBackground};
            }
            .shwc_template .search_form button:hover,
            .shwc_template .search_form button:focus,
            .shwc_template .search_form button:active {
                background:${cssData.searchFieldButtonBackgroundHover};
            }
            
            .shwc_template .search_form button svg path {
                fill:${cssData.searchFieldButtonIconColor};
            }
            
            
            /*#############ITEM POPUP / MODAL################*/
            
            .modal {
             background: ${hexToRGB(cssData.itemPopupOverlayColor,cssData.itemPopupOverlayTransparency)};
             position:absolute; /*only in admin*/
            }
            .modal .modal_content {
                width:${cssData.itemPopupPopupWidth}${cssData.itemPopupDimension};
                background-color:${cssData.itemPopupBackground};
             }
            .modal_content .images_block .thumbs_list_wrap {
             background:${hexToNewColor(cssData.itemPopupBackground, 97)};
             }
            .modal_content .images_block .thumbs_list_wrap::-webkit-scrollbar-track {
             background:${hexToNewColor(cssData.itemPopupBackground, 93)};
             }
            .modal_content .images_block .thumbs_list_wrap::-webkit-scrollbar-thumb {
             background-color:${hexToNewColor(cssData.itemPopupBackground, 85)};
             }
            .modal_content .info_block {
             background:${hexToNewColor(cssData.itemPopupBackground, 97)};
             }
            .modal_content .attributes_block {
             border-top:3px solid ${hexToNewColor(cssData.itemPopupBackground, 90)};
             }
            .modal_content .images_block {
             border-right:3px solid ${hexToNewColor(cssData.itemPopupBackground, 90)};
             }
             
            .prev_modal_button,
            .next_modal_button {
                top:400px !important; /*onli in admin*/
            }
            
            .prev_modal_button svg path,
            .next_modal_button svg path,
            .close_modal_wrapper svg path {
                fill:${cssData.itemPopupIconsColor};
            }
            
            .modal .prev_modal_button svg.mobile_prev_modal_svg path,
            .modal .next_modal_button svg.mobile_next_modal_svg path {
                fill:${cssData.itemPopupTitle2};
            }
            @media screen and (max-width:767px) {
                .modal_content .images_block .thumbs_list_wrap .thumbs_nav_list li {
                 background:${hexToNewColor(cssData.itemPopupBackground, 60)};
                }
                .modal_content .images_block .thumbs_list_wrap .thumbs_nav_list li.active {
                 background:${hexToNewColor(cssData.itemPopupBackground, 1)};
                }
                .modal_content .info_block .product_price {
                 background:${hexToNewColor(cssData.itemPopupBackground, 97)}; 
                 }
                .modal .close_modal_wrapper .shwc_info_menu { color:${cssData.itemPopupIconsColor}; }
                .modal .close_modal_wrapper {
                    background:${cssData.itemPopupOverlayColor};
                }
                .mobile_info_menu {
                 background: ${hexToRGB(cssData.itemPopupOverlayColor, 80)};
                }
            
            }
            .modal_content .info_block .product_heading {
                font-size:${cssData.itemPopupTitle1}px;
                line-height:${cssData.itemPopupTitle1}px;
                color:${cssData.itemPopupTitle2};
                font-family:${cssData.itemPopupTitle3};
            }
            .modal_content .info_block .description_content {
                font-size:${cssData.itemPopupDescription1}px;
                line-height:${cssData.itemPopupDescription1*1+4}px;
                color:${cssData.itemPopupDescription2};
                font-family:${cssData.itemPopupDescription3};
            }
            .modal_content .info_block .product_price .old_price {
                font-size:${cssData.itemPopupPrice1}px;
                line-height:${cssData.itemPopupPrice1*1+2}px;
                color:${cssData.itemPopupPrice2};
                font-family:${cssData.itemPopupPrice3};
            }
            .modal_content .info_block .product_price .old_price .old_price_inner {
                color:${cssData.itemPopupPrice2};
            }
            .modal_content .info_block .product_price .discount_price {
                font-size:${cssData.itemPopupDiscountPrice1}px;
                line-height:${cssData.itemPopupDiscountPrice1*1+2}px;
                color:${cssData.itemPopupDiscountPrice2};
                font-family:${cssData.itemPopupDiscountPrice3};
            }
            .modal_content .info_block .info_label {
                font-size:${cssData.itemPopupBackground}px;
                line-height:${cssData.itemPopupBackground*1+2}px;
                color:${cssData.itemPopupBackground};
                font-family:${cssData.itemPopupBackground};
            }
            .modal_content .info_block .info_label {
                font-size:${cssData.itemPopupLabels1}px;
                line-height:${cssData.itemPopupLabels1*1+2}px;
                color:${cssData.itemPopupLabels2};
                font-family:${cssData.itemPopupLabels3};
            }
            .modal_content .info_block .attributes_list li,
            .modal_content .info_block .product_categories .categories_list li {
                font-size:${cssData.itemPopupAttributes1}px;
                line-height:${cssData.itemPopupAttributes1*1+2}px;
                color:${cssData.itemPopupAttributes2};
                font-family:${cssData.itemPopupAttributes3};
            }         
            
             /*#############Load More################*/
            
            .shwc_template_center .load_more_wrapper .load_more_button {
                font-size:${cssData.loadMoreButtonTextSize}px;
                line-height:${cssData.loadMoreButtonTextSize*1+2}px;
                color:${cssData.loadMoreButtonTextColor};
                font-family:${cssData.loadMoreButtonFontStyle};
                padding:${cssData.loadMoreButtonPadding/2}px ${cssData.loadMoreButtonPadding}px;
                background:${cssData.loadMoreButtonBackgroundColor};
                border-radius:${cssData.loadMoreBorderRadius}px;
                border:${cssData.loadMoreBorderThickness}px solid ${cssData.loadMoreButtonBorderColor};
            }
                      
            .shwc_template_center .load_more_wrapper .load_more_button:hover {
                background:${cssData.loadMoreButtonBackgroundColorHover};
                border-color:${cssData.loadMoreButtonBorderColorHover};
            }   
            `;
        var slideWidth = jQuery(".thumb_slider").parents('.shwcgrid-item').width();
        /*We use settimeout on 1 milisec to get slider width before calling the function*/
        setTimeout(function(){
             /*checking if the change option was element widht or not, if not do nothing*/
            if(slideWidth!=jQuery(".thumb_slider").parents('.shwcgrid-item').width()) {
                constructCarusel();
            }
        },1);

        return (
            <style>
                {galleryListCss}
            </style>
        )
    }
}
export default Options;