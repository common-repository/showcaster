import React, { Component } from 'react';
import Options from  '../style/options';
//import  '../../../../../assets/css/admin/themes/options-styles.css';
import  '../../../../../assets/css/frontend/modal.css';
import  '../../../../../assets/css/frontend/slick.css';
import  '../../../../../assets/css/frontend/slick-theme.css';
import  '../../../../../assets/css/frontend/main.css';
class GalleryList extends Component {
    constructor(props) {
        super(props);
        this.togglePopup = this.togglePopup.bind(this);
        this.state = {
            showPopup: false,
            enableLoadMore: false,
            isLoadBtnClicked: false
        }
    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    componentWillReceiveProps(data) {
        let themeData = data.datas;
        if (themeData.enableLoadMore) {
            this.state.enableLoadMore = themeData.enableLoadMore;
            this.setState({
                enableLoadMore: themeData.enableLoadMore,
                isLoadBtnClicked: false,
                pluginUrl: themeData.pluginUrl
            });
        }
    }

    loadMoreBtn(e) {
        let loadingMore = document.getElementById("loadingMore");
        e.target.style.visibility = "hidden";
        loadingMore.style.visibility = "visible";
        this.state.enableLoadMore = false;
        this.setState({
            enableLoadMore: false,
            isLoadBtnClicked: true
        });
    }

    render() {
        let type = this.props.type;
        let enableLoadMore = this.state.enableLoadMore;
        let isLoadBtnClicked = this.state.isLoadBtnClicked;
        if (document.getElementById('loadMore') && document.getElementById('loadMore').style.visibility!= 'hidden') {
            document.getElementById('loadMore').scrollIntoView(true);
        }
        let galleryList = [];
        let imageList = this.props.imageData.imageData;
        let data = this.props.datas;

        window.slickData = {
            "sliderEnableDots" : data.sliderEnableDots,
            "sliderScrollSpeed" : data.sliderScrollSpeed,
            "sliderSlidesToScroll" : data.sliderSlidesToScroll,
            "sliderSlidesToShow" :data.sliderSlidesToShow,
            "sliderAutoPlay" : data.sliderAutoPlay,
            "sliderEnableArrows" : data.sliderEnableArrows
        };

        function color(hex, alpha) {
            let r = parseInt(hex.slice(1, 3), 16),
                g = parseInt(hex.slice(3, 5), 16),
                b = parseInt(hex.slice(5, 7), 16);
            alpha=1-alpha/100;
            return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
        }
        //imageList = imageList.slice(0, this.props.datas.loadMoreDefaultImagesCount);
        switch(type) {
            case "1" :  /*############################## 1 ####################################*/
                for (let i = 0 ; i < imageList.length; i++) {
                    let current = imageList[i];
                    let thumbnails = current.thumbnails;
                    var textArray = [
                        'category-1',
                        'category-2',
                        'category-3'
                    ];
                    var randomNumber = Math.floor(Math.random()*textArray.length);
                    let cat = textArray[randomNumber];
                    let class_ = 'shwcgrid-item  masonry-item ' + cat;

                    var dateArray = [
                        '' +
                        '2018-06-02 15:00:34',
                        '2018-06-05 15:00:34',
                        '2018-06-03 15:00:34'
                    ];

                    var randomDateNumber = Math.floor(Math.random()*dateArray.length);
                    let date = dateArray[randomDateNumber];
                    galleryList.push(
                        <div className={class_} data-category={cat} id="shwcgrid-item_1" key={i} onClick={this.togglePopup.bind(this)}>
                            <div className="thumb_slider">
                                <span className="control_prev">
                                  <svg viewBox="0 0 18 18" role="img" aria-label="Previous" focusable="false"
                                       style={{ display: "block", fill: "rgb(255, 255, 255)", height: "24px",  width: "24px" }}>
                                        <path fillRule="evenodd"
                                              d="M13.703 16.293a1 1 0 1 1-1.415 1.414l-7.995-8a1 1 0 0 1 0-1.414l7.995-8a1 1 0 1 1 1.415 1.414L6.413 9l7.29 7.293z"></path>
                                    </svg>
                                </span>
                                <span className="control_next">
                                    <svg viewBox="0 0 18 18" role="img" aria-label="Next" focusable="false"
                                         style={{ display: "block", fill: "rgb(255, 255, 255)", height: "24px",  width: "24px" }}>
                                        <path fillRule="evenodd"
                                              d="M4.293 1.707A1 1 0 1 1 5.708.293l7.995 8a1 1 0 0 1 0 1.414l-7.995 8a1 1 0 1 1-1.415-1.414L11.583 9l-7.29-7.293z"></path>
                                    </svg>
                                </span>
                                <ul>
                                    <li>
                                        <div className="image_block">
                                            <div className="bg_wrapper" data-trackid={i} style={{ backgroundImage:"url("+current.name+")"}}></div>
                                            <img src={current.name} ns='1' data-trackid={i} onClick={product.bind(this, imageList, current.name, current.name )} />
                                        </div>
                                    </li>
                                    {(() => {
                                        let thumbnailsArray = [];
                                        for (let j = 0; j < 2; j++){
                                            thumbnailsArray.push(
                                                <li key={j}>
                                                    <div className="image_block">
                                                        <div className="bg_wrapper" style={{ backgroundImage:"url("+thumbnails[j]+")"}}></div>
                                                        <img src={thumbnails[j]} ns='1' alt="" data-trackid={i} onClick={product.bind(this, imageList, current.name, current.name )} />
                                                    </div>
                                                </li>
                                            )
                                        }
                                        return thumbnailsArray;
                                    })()}
                                </ul>
                            </div>
                            <div className="info_block" onClick={this.product}>
                                <span ns='1' className="title" data-trackid={i} > {current.productTitle} </span>
                                <span ns='1' className="description" data-trackid={i}>{current.productDescription}</span>
                                <span ns='1' className="price" data-trackid={i} >{current.productPrice}</span>
                                <span ns='1' className="discont_price" data-trackid={i}>{current.productDiscount}</span>
                                <span ns='1' className="date" style={{display:'none'}} data-trackid={i}>{current.date}</span>
                            </div>
                        </div>
                    )
                }
                return (
                    <div className="shwc_template" id="shwc_template_1">
                        <Options css = {data} />
                        {(() => {
                            if (data.categoryButtonsPositionBtn == "left" || data.searchFieldPosition == "left" || data.orderingButtonsPositionBtn == "left"){
                                return (
                                    <div className="shwc_template_left">
                                        {
                                            (() => {
                                                if(data.searchFieldPosition == "left") {
                                                    return(
                                                        <form className="search_form left">
                                                            <input type="text" placeholder={ data.searchFieldPlaceholderText } ns="1" page="4" name="productOptionsEnableSearch" readOnly/>
                                                            <button type="submit" value="search" ns="1" page="4" name="productOptionsEnableSearchBtn" id="productOptionsEnableSearchBtn" onClick= {() => {return false;}}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 512 512" enablbackground="new 0 0 512 512" width="13px" height="13px">
                                                                    <g>
                                                                        <path d="M495,466.2L377.2,348.4c29.2-35.6,46.8-81.2,46.8-130.9C424,103.5,331.5,11,217.5,11C103.4,11,11,103.5,11,217.5 S103.4,424,217.5,424c49.7,0,95.2-17.5,130.8-46.7L466.1,495c8,8,20.9,8,28.9,0C503,487.1,503,474.1,495,466.2z M217.5,382.9   C126.2,382.9,52,308.7,52,217.5S126.2,52,217.5,52C308.7,52,383,126.3,383,217.5S308.7,382.9,217.5,382.9z" fill="#303030"/>
                                                                    </g>
                                                                </svg>
                                                            </button>
                                                        </form>
                                                    )
                                                }
                                            })()
                                        } {
                                        (() => {
                                            if (data.categoryButtonsPositionBtn == 'left') {
                                                return (
                                                    <div ns="1" className="button-group left categories_list">
                                                        <div>
                                                            <button className="button categoriesBtn 1 is-checked" data-filter="*">show all</button>
                                                        </div>
                                                        <div>
                                                            <button className="button categoriesBtn 1" data-filter=".category-1">Category 1 </button>
                                                        </div>
                                                        <div>
                                                            <button className="button categoriesBtn 1" data-filter=".category-2">Category 2 </button>
                                                        </div>
                                                        <div>
                                                            <button className="button categoriesBtn 1" data-filter=".category-3">Category 3 </button>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        })()
                                    }
                                        {
                                            (() => {
                                                if(data.orderingButtonsPositionBtn == "left") {
                                                    return(
                                                        <div className="button-group sort-by-button-group ordering_butons_list">
                                                            <div>
                                                                <button className="button is-checked ordering_butons" data-sort-value="original-order">Default</button>
                                                            </div>
                                                            <div>
                                                                <button className="button ordering_butons" data-sort-value="date">Date</button>
                                                            </div>
                                                            <div>
                                                                <button className="button ordering_butons" data-sort-value="title">Title</button>
                                                            </div>
                                                            <div>
                                                                <button className="button ordering_butons" id="shuffle" data-sort-value="random">Random</button>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            })()
                                        }
                                        <div className="clear"></div>
                                    </div>
                                )
                            }
                        })()}

                        {(() => {
                            if (data.categoryButtonsPositionBtn == "right" || data.searchFieldPosition == "right" || data.orderingButtonsPositionBtn == "right") {
                                return(
                                    <div className="shwc_template_right">
                                        {(() => {
                                            if (data.searchFieldPosition == "right") {
                                               return (<form className="search_form right">
                                                    <input type="text" placeholder={ data.searchFieldPlaceholderText } ns="1" page="4" name="productOptionsEnableSearch" readOnly/>
                                                    <button type="submit" value="search" ns="1" page="4" name="productOptionsEnableSearchBtn" id="productOptionsEnableSearchBtn" onClick= {() => {return false;}}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 512 512" enablbackground="new 0 0 512 512" width="13px" height="13px">
                                                            <g>
                                                                <path d="M495,466.2L377.2,348.4c29.2-35.6,46.8-81.2,46.8-130.9C424,103.5,331.5,11,217.5,11C103.4,11,11,103.5,11,217.5 S103.4,424,217.5,424c49.7,0,95.2-17.5,130.8-46.7L466.1,495c8,8,20.9,8,28.9,0C503,487.1,503,474.1,495,466.2z M217.5,382.9   C126.2,382.9,52,308.7,52,217.5S126.2,52,217.5,52C308.7,52,383,126.3,383,217.5S308.7,382.9,217.5,382.9z" fill="#303030"/>
                                                            </g>
                                                        </svg>
                                                    </button>
                                                </form>
                                               )
                                            }
                                        })()}{
                                        (() => {
                                            if (data.categoryButtonsPositionBtn == 'right') {
                                              return(
                                                  <div ns="1" className="button-group right categories_list">
                                                      <div>
                                                          <button className="button categoriesBtn 1 is-checked" data-filter="*">show all</button>
                                                      </div>
                                                      <div>
                                                          <button className="button categoriesBtn 1" data-filter=".category-1">Category 1 </button>
                                                      </div>
                                                      <div>
                                                          <button className="button categoriesBtn 1" data-filter=".category-2">Category 2 </button>
                                                      </div>
                                                      <div>
                                                          <button className="button categoriesBtn 1" data-filter=".category-3">Category 3 </button>
                                                      </div>
                                                  </div>
                                              )
                                            }
                                        })()
                                    } {
                                        (() => {
                                            if(data.orderingButtonsPositionBtn == "right") {
                                                return(
                                                    <div className="button-group sort-by-button-group ordering_butons_list">
                                                        <div>
                                                            <button className="button is-checked ordering_butons" data-sort-value="original-order">Default</button>
                                                        </div>
                                                        <div>
                                                            <button className="button ordering_butons" data-sort-value="date">Date</button>
                                                        </div>
                                                        <div>
                                                            <button className="button ordering_butons" data-sort-value="title">Title</button>
                                                        </div>
                                                        <div>
                                                            <button className="button ordering_butons" id="shuffle" data-sort-value="random">Random</button>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })()
                                    }
                                    </div>
                                )
                            }
                            })()}
                        <div className="shwc_template_center">
                            {
                                (() => {
                                    if (data.categoryButtonsPositionBtn == "top" || data.searchFieldPosition == "top" || data.orderingButtonsPositionBtn == "top") {
                                        return (
                                            <div className="shwc_template_top">
                                                {(() => {
                                                    if (data.categoryButtonsPositionBtn == 'top') {
                                                        return(
                                                            <div ns="1" className="button-group top categories_list">
                                                                <div>
                                                                    <button className="button categoriesBtn 1 is-checked" data-filter="*">show all</button>
                                                                </div>
                                                                <div>
                                                                    <button className="button categoriesBtn 1" data-filter=".category-1">Category 1 </button>
                                                                </div>
                                                                <div>
                                                                    <button className="button categoriesBtn 1" data-filter=".category-2">Category 2 </button>
                                                                </div>
                                                                <div>
                                                                    <button className="button categoriesBtn 1" data-filter=".category-3">Category 3 </button>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                })()}{
                                                    (() => {

                                                        if(data.orderingButtonsPositionBtn == "top") {
                                                            return(
                                                                <div className="button-group sort-by-button-group ordering_butons_list">
                                                                    <div>
                                                                        <button className="button is-checked ordering_butons" data-sort-value="original-order">Default</button>
                                                                    </div>
                                                                    <div>
                                                                        <button className="button ordering_butons" data-sort-value="date">Date</button>
                                                                    </div>
                                                                    <div>
                                                                        <button className="button ordering_butons" data-sort-value="title">Title</button>
                                                                    </div>
                                                                    <div>
                                                                        <button className="button ordering_butons" id="shuffle" data-sort-value="random">Random</button>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    })()
                                                }{
                                                (() => {
                                                    if (data.searchFieldPosition == "top") {
                                                        return (<form className="search_form top">
                                                                <input type="text" placeholder={ data.searchFieldPlaceholderText } ns="1" page="4" name="productOptionsEnableSearch" readOnly/>
                                                                <button type="submit" value="search" ns="1" page="4" name="productOptionsEnableSearchBtn" id="productOptionsEnableSearchBtn" onClick= {() => {return false;}}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 512 512" enablbackground="new 0 0 512 512" width="13px" height="13px">
                                                                        <g>
                                                                            <path d="M495,466.2L377.2,348.4c29.2-35.6,46.8-81.2,46.8-130.9C424,103.5,331.5,11,217.5,11C103.4,11,11,103.5,11,217.5 S103.4,424,217.5,424c49.7,0,95.2-17.5,130.8-46.7L466.1,495c8,8,20.9,8,28.9,0C503,487.1,503,474.1,495,466.2z M217.5,382.9   C126.2,382.9,52,308.7,52,217.5S126.2,52,217.5,52C308.7,52,383,126.3,383,217.5S308.7,382.9,217.5,382.9z" fill="#303030"/>
                                                                        </g>
                                                                    </svg>
                                                                </button>
                                                            </form>
                                                        )
                                                    }
                                                })()
                                            }

                                            </div>
                                                )
                                    }

                                    })()
                            }
                            <div className="search_template">
                                <div className="shwc_pc_wrapper pc_view1" id="filter_1">
                                    <div className="shwcgrid">
                                        { galleryList }
                                    </div>

                                    {
                                        (() => {
                                            if (this.props.datas.loadMoreType == 'button') {
                                                let loadMore = this.props.datas.loadMoreButtonText ? this.props.datas.loadMoreButtonText : 'See More';
                                                let src_ = this.props.datas.pluginUrl + "/resources/assets/images/icons/loading" + this.props.datas.loadMoreLoadingIcons + ".gif";
                                                return (
                                                    <div className="load_more_wrapper">
                                                        <a href="javascript:void(0)" id="loadMore" className="load_more_button" count = "1" style={{visibility: enableLoadMore ? 'visible' : 'hidden'}} onClick={this.loadMoreBtn.bind(this)}>{loadMore}</a>
                                                        <img id="loadingMore" className="loadingImage" style={{visibility: isLoadBtnClicked ? 'visible' : 'hidden'}} src={src_} />
                                                    </div>
                                                )
                                            } else {
                                                let src_ = this.props.datas.pluginUrl + "/resources/assets/images/icons/loading" + this.props.datas.loadMoreLoadingIcons + ".gif";
                                                return (
                                                    <div className="load_more_wrapper">
                                                        <img id="loadMore" className="loadingImage" style={{visibility: enableLoadMore ? 'visible' : 'hidden'}} src={src_}/>
                                                    </div>
                                                )
                                            }
                                        })()
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )
                break;
            case '2': /*############################## 2 ####################################*/
                for (let i = 0 ; i < imageList.length; i++) {
                    var textArray = [
                        'category-1',
                        'category-2',
                        'category-3'
                    ];
                    var randomNumber = Math.floor(Math.random()*textArray.length);
                    let cat = textArray[randomNumber];
                    let class_ = 'shwcgrid-item  masonry-item ' + cat;

                    var dateArray = [
                        '2018-06-02 15:00:34',
                        '2018-06-05 15:00:34',
                        '2018-06-03 15:00:34'
                    ];

                    var randomDateNumber = Math.floor(Math.random()*dateArray.length);
                    let date = dateArray[randomDateNumber];
                    let current = imageList[i];
                    galleryList.push(
                        <div className="slider_item "data-category={cat}  key={i}>
                            <div className="image_block" ns='1' data-trackid={i}>
                                <div className="bg_wrapper" style={{ backgroundImage:"url("+current.name+")"}}></div>
                                <div className="vertical_center"><img src={current.name} alt="" ns='1' data-trackid={i} onClick={product.bind(this, imageList, current.name, current.name )} /></div>
                            </div>
                            <div className="info_block">
                                <span ns='1' className="title" data-trackid={1} >{current.productTitle}</span>
                                <span ns='1' className="description" data-trackid={1}>{current.productDescription}</span>
                                <span ns='1' className="price" data-trackid={1} >{current.productPrice}</span>
                                <span ns='1' className="discont_price" data-trackid={1} >{current.productDiscount}</span>
                                <span ns='1' className="date" style={{display:'none'}} data-trackid={i}>{current.date}</span>
                            </div>
                        </div>
                    )
                }
                return (
                    <div className="shwc_template shwc_pc_wrapper pc_view2">
                        <Options css = {data} />
                        <div className="slider_wrapper">
                            <div className="product_slider">
                                {galleryList}
                            </div>
                        </div>
                    </div>
                )
                break;
            case '3': /*############################## 3 ####################################*/
                for(let i = 0 ; i < imageList.length; i++) {
                    let current = imageList[i];
                    let thumbnails = current.thumbnails;
                    var textArray = [
                        'category-1',
                        'category-2',
                        'category-3'
                    ];
                    var randomNumber = Math.floor(Math.random()*textArray.length);
                    let cat = textArray[randomNumber];
                    let class_ = 'shwcgrid-item masonry-item  ' + cat;

                    var dateArray = [
                        '2018-06-02 15:00:34',
                        '2018-06-05 15:00:34',
                        '2018-06-03 15:00:34'
                    ];

                    var randomDateNumber = Math.floor(Math.random()*dateArray.length);
                    let date = dateArray[randomDateNumber];
                    galleryList.push(
                        <div className={class_} key={i}>
                            <div className="board_block ">
                                <div className="main_image_block">
                                    <a className="image_block">
                                        <span className="bg_wrapper" style={{ backgroundImage:"url("+current.name+")"}}></span>
                                        <img src={current.name} alt="" ns='1' data-tracid={i} onClick={product.bind(this, imageList, current.name, current.name )} />
                                    </a>
                                </div>
                                <div className="thumbnails_block">
                                    {(() => {
                                        let thumbnailsArray = [];
                                        for (let j = 0; j < 2; j++){
                                            thumbnailsArray.push(<div className="image_block" key={j}>
                                                    <span className="bg_wrapper" style={{ backgroundImage:"url("+thumbnails[j]+")"}}></span>
                                                    <img src={thumbnails[j]} ns='1' alt="" data-trackid={i} onClick={product.bind(this, imageList, current.name, current.name )} />
                                                </div>)
                                        }
                                        return thumbnailsArray;
                                    })()}
                                </div>
                            </div>
                            <div className="info_block">
                                <a ns='1' className="title"  data-trackid={i} >{current.productTitle}</a>
                                <p ns='1' className="description" data-trackid={i}>{current.productDescription}</p>
                                <div className="price_wrapper">
                                    <span className="price">{current.productPrice}</span>
                                    <span className="discont_price">{current.productDiscount}</span>
                                    <span ns='1' className="date" style={{display:'none'}} data-trackid={i}>{current.date}</span>
                                </div>
                            </div>
                        </div>
                 )
                }
                return (
                    <div className="shwc_template" id="shwc_template_1">
                        <Options css = {data} />
                        {(() => {
                            if (data.categoryButtonsPositionBtn == "left" || data.searchFieldPosition == "left" || data.orderingButtonsPositionBtn == "left"){
                                return (
                                    <div className="shwc_template_left">
                                        {
                                            (() => {
                                                if(data.searchFieldPosition == "left") {
                                                    return(
                                                        <form className="search_form left">
                                                            <input type="text" placeholder={ data.searchFieldPlaceholderText } ns="1" page="4" name="productOptionsEnableSearch" readOnly/>
                                                            <button type="submit" value="search" ns="1" page="4" name="productOptionsEnableSearchBtn" id="productOptionsEnableSearchBtn" onClick= {() => {return false;}}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 512 512" enablbackground="new 0 0 512 512" width="13px" height="13px">
                                                                    <g>
                                                                        <path d="M495,466.2L377.2,348.4c29.2-35.6,46.8-81.2,46.8-130.9C424,103.5,331.5,11,217.5,11C103.4,11,11,103.5,11,217.5 S103.4,424,217.5,424c49.7,0,95.2-17.5,130.8-46.7L466.1,495c8,8,20.9,8,28.9,0C503,487.1,503,474.1,495,466.2z M217.5,382.9   C126.2,382.9,52,308.7,52,217.5S126.2,52,217.5,52C308.7,52,383,126.3,383,217.5S308.7,382.9,217.5,382.9z" fill="#303030"/>
                                                                    </g>
                                                                </svg>
                                                            </button>
                                                        </form>
                                                    )
                                                }
                                            })()
                                        } {
                                        (() => {
                                            if (data.categoryButtonsPositionBtn == 'left') {
                                                return (
                                                    <div ns="1" className="button-group left categories_list">
                                                        <div>
                                                            <button className="button categoriesBtn 1 is-checked" data-filter="*">show all</button>
                                                        </div>
                                                        <div>
                                                            <button className="button categoriesBtn 1" data-filter=".category-1">Category 1 </button>
                                                        </div>
                                                        <div>
                                                            <button className="button categoriesBtn 1" data-filter=".category-2">Category 2 </button>
                                                        </div>
                                                        <div>
                                                            <button className="button categoriesBtn 1" data-filter=".category-3">Category 3 </button>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        })()
                                    }
                                        {
                                            (() => {
                                                if(data.orderingButtonsPositionBtn == "left") {
                                                    return(
                                                        <div className="button-group sort-by-button-group ordering_butons_list">
                                                            <div>
                                                                <button className="button is-checked ordering_butons" data-sort-value="original-order">Default</button>
                                                            </div>
                                                            <div>
                                                                <button className="button ordering_butons" data-sort-value="date">Date</button>
                                                            </div>
                                                            <div>
                                                                <button className="button ordering_butons" data-sort-value="title">Title</button>
                                                            </div>
                                                            <div>
                                                                <button className="button ordering_butons" id="shuffle" data-sort-value="random">Random</button>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            })()
                                        }
                                        <div className="clear"></div>
                                    </div>
                                )
                            }
                        })()}

                        {(() => {
                            if (data.categoryButtonsPositionBtn == "right" || data.searchFieldPosition == "right" || data.orderingButtonsPositionBtn == "right") {
                                return(
                                    <div className="shwc_template_right">
                                        {(() => {
                                            if (data.searchFieldPosition == "right") {
                                                return (<form className="search_form right">
                                                        <input type="text" placeholder={ data.searchFieldPlaceholderText } ns="1" page="4" name="productOptionsEnableSearch" readOnly/>
                                                        <button type="submit" value="search" ns="1" page="4" name="productOptionsEnableSearchBtn" id="productOptionsEnableSearchBtn" onClick= {() => {return false;}}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 512 512" enablbackground="new 0 0 512 512" width="13px" height="13px">
                                                                <g>
                                                                    <path d="M495,466.2L377.2,348.4c29.2-35.6,46.8-81.2,46.8-130.9C424,103.5,331.5,11,217.5,11C103.4,11,11,103.5,11,217.5 S103.4,424,217.5,424c49.7,0,95.2-17.5,130.8-46.7L466.1,495c8,8,20.9,8,28.9,0C503,487.1,503,474.1,495,466.2z M217.5,382.9   C126.2,382.9,52,308.7,52,217.5S126.2,52,217.5,52C308.7,52,383,126.3,383,217.5S308.7,382.9,217.5,382.9z" fill="#303030"/>
                                                                </g>
                                                            </svg>
                                                        </button>
                                                    </form>
                                                )
                                            }
                                        })()}{
                                        (() => {
                                            if (data.categoryButtonsPositionBtn == 'right') {
                                                return(
                                                    <div ns="1" className="button-group right categories_list">
                                                        <div>
                                                            <button className="button categoriesBtn 1 is-checked" data-filter="*">show all</button>
                                                        </div>
                                                        <div>
                                                            <button className="button categoriesBtn 1" data-filter=".category-1">Category 1 </button>
                                                        </div>
                                                        <div>
                                                            <button className="button categoriesBtn 1" data-filter=".category-2">Category 2 </button>
                                                        </div>
                                                        <div>
                                                            <button className="button categoriesBtn 1" data-filter=".category-3">Category 3 </button>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })()
                                    } {
                                        (() => {
                                            if(data.orderingButtonsPositionBtn == "right") {
                                                return(
                                                    <div className="button-group sort-by-button-group ordering_butons_list">
                                                        <div>
                                                            <button className="button is-checked ordering_butons" data-sort-value="original-order">Default</button>
                                                        </div>
                                                        <div>
                                                            <button className="button ordering_butons" data-sort-value="date">Date</button>
                                                        </div>
                                                        <div>
                                                            <button className="button ordering_butons" data-sort-value="title">Title</button>
                                                        </div>
                                                        <div>
                                                            <button className="button ordering_butons" id="shuffle" data-sort-value="random">Random</button>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })()
                                    }
                                    </div>
                                )
                            }
                        })()}
                        <div className="shwc_template_center">
                            {
                                (() => {
                                    if (data.categoryButtonsPositionBtn == "top" || data.searchFieldPosition == "top" || data.orderingButtonsPositionBtn == "top") {
                                        return (
                                            <div className="shwc_template_top">
                                                {(() => {
                                                    if (data.categoryButtonsPositionBtn == 'top') {
                                                        return(
                                                            <div ns="1" className="button-group top categories_list">
                                                                <div>
                                                                    <button className="button categoriesBtn 1 is-checked" data-filter="*">show all</button>
                                                                </div>
                                                                <div>
                                                                    <button className="button categoriesBtn 1" data-filter=".category-1">Category 1 </button>
                                                                </div>
                                                                <div>
                                                                    <button className="button categoriesBtn 1" data-filter=".category-2">Category 2 </button>
                                                                </div>
                                                                <div>
                                                                    <button className="button categoriesBtn 1" data-filter=".category-3">Category 3 </button>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                })()}{
                                                (() => {

                                                    if(data.orderingButtonsPositionBtn == "top") {
                                                        return(
                                                            <div className="button-group sort-by-button-group ordering_butons_list">
                                                                <div>
                                                                    <button className="button is-checked ordering_butons" data-sort-value="original-order">Default</button>
                                                                </div>
                                                                <div>
                                                                    <button className="button ordering_butons" data-sort-value="date">Date</button>
                                                                </div>
                                                                <div>
                                                                    <button className="button ordering_butons" data-sort-value="title">Title</button>
                                                                </div>
                                                                <div>
                                                                    <button className="button ordering_butons" id="shuffle" data-sort-value="random">Random</button>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                })()
                                            }{
                                                (() => {
                                                    if (data.searchFieldPosition == "top") {
                                                        return (<form className="search_form top">
                                                                <input type="text" placeholder={ data.searchFieldPlaceholderText } ns="1" page="4" name="productOptionsEnableSearch" readOnly/>
                                                                <button type="submit" value="search" ns="1" page="4" name="productOptionsEnableSearchBtn" id="productOptionsEnableSearchBtn" onClick= {() => {return false;}}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 512 512" enablbackground="new 0 0 512 512" width="13px" height="13px">
                                                                        <g>
                                                                            <path d="M495,466.2L377.2,348.4c29.2-35.6,46.8-81.2,46.8-130.9C424,103.5,331.5,11,217.5,11C103.4,11,11,103.5,11,217.5 S103.4,424,217.5,424c49.7,0,95.2-17.5,130.8-46.7L466.1,495c8,8,20.9,8,28.9,0C503,487.1,503,474.1,495,466.2z M217.5,382.9   C126.2,382.9,52,308.7,52,217.5S126.2,52,217.5,52C308.7,52,383,126.3,383,217.5S308.7,382.9,217.5,382.9z" fill="#303030"/>
                                                                        </g>
                                                                    </svg>
                                                                </button>
                                                            </form>
                                                        )
                                                    }

                                                })()
                                            }

                                            </div>
                                        )
                                    }

                                })()
                            }
                            <div className="search_template">
                                <div className="shwc_pc_wrapper pc_view3" id="filter_1">
                                    <div className="shwcgrid">
                                        <Options css = {data} />
                                        { galleryList }
                                    </div>
                                    {
                                        (() => {
                                            if (this.props.datas.loadMoreType == 'button') {
                                                let loadMore = this.props.datas.loadMoreButtonText ? this.props.datas.loadMoreButtonText : 'See More';
                                                let src_ = this.props.datas.pluginUrl + "/resources/assets/images/icons/loading" + this.props.datas.loadMoreLoadingIcons + ".gif";
                                                return (
                                                    <div className="load_more_wrapper">
                                                        <a href="javascript:void(0)" id="loadMore"  className="load_more_button" count = "1" style={{visibility: enableLoadMore ? 'visible' : 'hidden'}} onClick={this.loadMoreBtn.bind(this)}>{loadMore}</a>
                                                        <img id="loadingMore" className="loadingImage" style={{visibility: isLoadBtnClicked ? 'visible' : 'hidden'}} src={src_} />
                                                    </div>
                                                )
                                            } else {
                                                let src_ = this.props.datas.pluginUrl + "/resources/assets/images/icons/loading" + this.props.datas.loadMoreLoadingIcons + ".gif";
                                                return (
                                                    <div className="load_more_wrapper">
                                                        <img id="loadMore" className="loadingImage" style={{visibility: enableLoadMore ? 'visible' : 'hidden'}} src={src_}/>
                                                    </div>
                                                )
                                            }
                                        })()
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                )
            break;
            case '4':  /*############################## 4 ####################################*/
                for(let i = 0 ; i < imageList.length; i++) {
                    let current = imageList[i];
                    var textArray = [
                        'category-1',
                        'category-2',
                        'category-3'
                    ];
                    var randomNumber = Math.floor(Math.random()*textArray.length);
                    let cat = textArray[randomNumber];
                    let  gridItemClass = i % 2 != 0 ? 'shwcgrid-item masonry-item right_image '+ cat : 'shwcgrid-item masonry-item '+ cat;
                    galleryList.push(
                        <div className={gridItemClass} data-category={cat} key={i}>
                            <div className="image_block" ns='1'  data-trackid={i} >
                                <div className="bg_wrapper" style={{ backgroundImage:"url("+current.name+")"}}></div>
                                <img src={ current.name } ns='1' data-trackid={i} onClick={product.bind(this, imageList, current.name, current.name )}/>
                            </div>
                            <div className="info_block" ns='1' data-trackid={i} >
                                <div className="vertical_center">
                                    <span ns='1' className="title"  data-trackid={i}>{current.productTitle}</span>
                                    <span ns='1' className="description" data-trackid={i}>{current.productDescription}</span>
                                    <div className="price_wrapper">
                                        <span className="price">{current.productPrice}</span>
                                        <span className="discont_price">{current.productDiscount}</span>
                                        <span ns='1' className="date" style={{display:'none'}} data-trackid={i}>{current.date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                return (
                    <div className="shwc_template" id="shwc_template_1">
                        {(() => {
                            if (data.categoryButtonsPositionBtn == "left" || data.searchFieldPosition == "left" || data.orderingButtonsPositionBtn == "left"){
                                return (
                                    <div className="shwc_template_left">
                                        {
                                            (() => {
                                                if(data.searchFieldPosition == "left") {
                                                    return(
                                                        <form className="search_form left">
                                                            <input type="text" placeholder={ data.searchFieldPlaceholderText } ns="1" page="4" name="productOptionsEnableSearch" readOnly/>
                                                            <button type="submit" value="search" ns="1" page="4" name="productOptionsEnableSearchBtn" id="productOptionsEnableSearchBtn" onClick= {() => {return false;}}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 512 512" enablbackground="new 0 0 512 512" width="13px" height="13px">
                                                                    <g>
                                                                        <path d="M495,466.2L377.2,348.4c29.2-35.6,46.8-81.2,46.8-130.9C424,103.5,331.5,11,217.5,11C103.4,11,11,103.5,11,217.5 S103.4,424,217.5,424c49.7,0,95.2-17.5,130.8-46.7L466.1,495c8,8,20.9,8,28.9,0C503,487.1,503,474.1,495,466.2z M217.5,382.9   C126.2,382.9,52,308.7,52,217.5S126.2,52,217.5,52C308.7,52,383,126.3,383,217.5S308.7,382.9,217.5,382.9z" fill="#303030"/>
                                                                    </g>
                                                                </svg>
                                                            </button>
                                                        </form>
                                                    )
                                                }
                                            })()
                                        } {
                                        (() => {
                                            if (data.categoryButtonsPositionBtn == 'left') {
                                                return (
                                                    <div ns="1" className="button-group left categories_list">
                                                        <div>
                                                            <button className="button categoriesBtn 1 is-checked" data-filter="*">show all</button>
                                                        </div>
                                                        <div>
                                                            <button className="button categoriesBtn 1" data-filter=".category-1">Category 1 </button>
                                                        </div>
                                                        <div>
                                                            <button className="button categoriesBtn 1" data-filter=".category-2">Category 2 </button>
                                                        </div>
                                                        <div>
                                                            <button className="button categoriesBtn 1" data-filter=".category-3">Category 3 </button>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        })()
                                    }
                                        {
                                            (() => {
                                                if(data.orderingButtonsPositionBtn == "left") {
                                                    return(
                                                        <div className="button-group sort-by-button-group ordering_butons_list">
                                                            <div>
                                                                <button className="button is-checked ordering_butons" data-sort-value="original-order">Default</button>
                                                            </div>
                                                            <div>
                                                                <button className="button ordering_butons" data-sort-value="date">Date</button>
                                                            </div>
                                                            <div>
                                                                <button className="button ordering_butons" data-sort-value="title">Title</button>
                                                            </div>
                                                            <div>
                                                                <button className="button ordering_butons" id="shuffle" data-sort-value="random">Random</button>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            })()
                                        }
                                        <div className="clear"></div>
                                    </div>
                                )
                            }
                        })()}

                        {(() => {
                            if (data.categoryButtonsPositionBtn == "right" || data.searchFieldPosition == "right" || data.orderingButtonsPositionBtn == "right") {
                                return(
                                    <div className="shwc_template_right">
                                        {(() => {
                                            if (data.searchFieldPosition == "right") {
                                                return (<form className="search_form right">
                                                        <input type="text" placeholder={ data.searchFieldPlaceholderText } ns="1" page="4" name="productOptionsEnableSearch" readOnly/>
                                                        <button type="submit" value="search" ns="1" page="4" name="productOptionsEnableSearchBtn" id="productOptionsEnableSearchBtn" onClick= {() => {return false;}}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 512 512" enablbackground="new 0 0 512 512" width="13px" height="13px">
                                                                <g>
                                                                    <path d="M495,466.2L377.2,348.4c29.2-35.6,46.8-81.2,46.8-130.9C424,103.5,331.5,11,217.5,11C103.4,11,11,103.5,11,217.5 S103.4,424,217.5,424c49.7,0,95.2-17.5,130.8-46.7L466.1,495c8,8,20.9,8,28.9,0C503,487.1,503,474.1,495,466.2z M217.5,382.9   C126.2,382.9,52,308.7,52,217.5S126.2,52,217.5,52C308.7,52,383,126.3,383,217.5S308.7,382.9,217.5,382.9z" fill="#303030"/>
                                                                </g>
                                                            </svg>
                                                        </button>
                                                    </form>
                                                )
                                            }
                                        })()}{
                                        (() => {
                                            if (data.categoryButtonsPositionBtn == 'right') {
                                                return(
                                                    <div ns="1" className="button-group right categories_list">
                                                        <div>
                                                            <button className="button categoriesBtn 1 is-checked" data-filter="*">show all</button>
                                                        </div>
                                                        <div>
                                                            <button className="button categoriesBtn 1" data-filter=".category-1">Category 1 </button>
                                                        </div>
                                                        <div>
                                                            <button className="button categoriesBtn 1" data-filter=".category-2">Category 2 </button>
                                                        </div>
                                                        <div>
                                                            <button className="button categoriesBtn 1" data-filter=".category-3">Category 3 </button>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })()
                                    } {
                                        (() => {
                                            if(data.orderingButtonsPositionBtn == "right") {
                                                return(
                                                    <div className="button-group sort-by-button-group ordering_butons_list">
                                                        <div>
                                                            <button className="button is-checked ordering_butons" data-sort-value="original-order">Default</button>
                                                        </div>
                                                        <div>
                                                            <button className="button ordering_butons" data-sort-value="date">Date</button>
                                                        </div>
                                                        <div>
                                                            <button className="button ordering_butons" data-sort-value="title">Title</button>
                                                        </div>
                                                        <div>
                                                            <button className="button ordering_butons" id="shuffle" data-sort-value="random">Random</button>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })()
                                    }
                                    </div>
                                )
                            }
                        })()}
                        <div className="shwc_template_center">
                            {
                                (() => {
                                    if (data.categoryButtonsPositionBtn == "top" || data.searchFieldPosition == "top" || data.orderingButtonsPositionBtn == "top") {
                                        return (
                                            <div className="shwc_template_top">
                                                {(() => {
                                                    if (data.categoryButtonsPositionBtn == 'top') {
                                                        return(
                                                            <div ns="1" className="button-group top categories_list">
                                                                <div>
                                                                    <button className="button categoriesBtn 1 is-checked" data-filter="*">show all</button>
                                                                </div>
                                                                <div>
                                                                    <button className="button categoriesBtn 1" data-filter=".category-1">Category 1 </button>
                                                                </div>
                                                                <div>
                                                                    <button className="button categoriesBtn 1" data-filter=".category-2">Category 2 </button>
                                                                </div>
                                                                <div>
                                                                    <button className="button categoriesBtn 1" data-filter=".category-3">Category 3 </button>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                })()}{
                                                (() => {

                                                    if(data.orderingButtonsPositionBtn == "top") {
                                                        return(
                                                            <div className="button-group sort-by-button-group ordering_butons_list">
                                                                <div>
                                                                    <button className="button is-checked ordering_butons" data-sort-value="original-order">Default</button>
                                                                </div>
                                                                <div>
                                                                    <button className="button ordering_butons" data-sort-value="date">Date</button>
                                                                </div>
                                                                <div>
                                                                    <button className="button ordering_butons" data-sort-value="title">Title</button>
                                                                </div>
                                                                <div>
                                                                    <button className="button ordering_butons" id="shuffle" data-sort-value="random">Random</button>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                })()
                                            }{
                                                (() => {

                                                    if (data.searchFieldPosition == "top") {
                                                        return (<form className="search_form top">
                                                                <input type="text" placeholder={ data.searchFieldPlaceholderText } ns="1" page="4" name="productOptionsEnableSearch" readOnly/>
                                                                <button type="submit" value="search" ns="1" page="4" name="productOptionsEnableSearchBtn" id="productOptionsEnableSearchBtn" onClick= {() => {return false;}}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 512 512" enablbackground="new 0 0 512 512" width="13px" height="13px">
                                                                        <g>
                                                                            <path d="M495,466.2L377.2,348.4c29.2-35.6,46.8-81.2,46.8-130.9C424,103.5,331.5,11,217.5,11C103.4,11,11,103.5,11,217.5 S103.4,424,217.5,424c49.7,0,95.2-17.5,130.8-46.7L466.1,495c8,8,20.9,8,28.9,0C503,487.1,503,474.1,495,466.2z M217.5,382.9   C126.2,382.9,52,308.7,52,217.5S126.2,52,217.5,52C308.7,52,383,126.3,383,217.5S308.7,382.9,217.5,382.9z" fill="#303030"/>
                                                                        </g>
                                                                    </svg>
                                                                </button>
                                                            </form>
                                                        )
                                                    }
                                                })()
                                            }

                                            </div>
                                        )
                                    }

                                })()
                            }
                            <div className="search_template">
                                <div className="shwc_pc_wrapper pc_view4" id="filter_1">
                                    <div className="shwcgrid">
                                        <Options css = {data} />
                                        { galleryList }
                                    </div>
                                    {
                                        (() => {
                                            if (this.props.datas.loadMoreType == 'button') {
                                                let loadMore = this.props.datas.loadMoreButtonText ? this.props.datas.loadMoreButtonText : 'See More';
                                                let src_ = this.props.datas.pluginUrl + "/resources/assets/images/icons/loading" + this.props.datas.loadMoreLoadingIcons + ".gif";
                                                return (
                                                    <div className="load_more_wrapper">
                                                        <a href="javascript:void(0)" id="loadMore"  className="load_more_button" count = "1" style={{visibility: enableLoadMore ? 'visible' : 'hidden'}} onClick={this.loadMoreBtn.bind(this)}>{loadMore}</a>
                                                        <img id="loadingMore" className="loadingImage" style={{visibility: isLoadBtnClicked ? 'visible' : 'hidden'}} src={src_} />
                                                    </div>
                                                )
                                            } else {
                                                let src_ = this.props.datas.pluginUrl + "/resources/assets/images/icons/loading" + this.props.datas.loadMoreLoadingIcons + ".gif";
                                                return (
                                                    <div className="load_more_wrapper">
                                                        <img id="loadMore" className="loadingImage" style={{visibility: enableLoadMore ? 'visible' : 'hidden'}} src={src_}/>
                                                    </div>
                                                )
                                            }
                                        })()
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )
            break;
            case '5':  /*############################## 5 ####################################*/

                for(let i = 0 ; i < imageList.length; i++) {
                    let current = imageList[i];
                    let thumbnails = current.thumbnails;
                    var textArray = [
                        'category-1',
                        'category-2',
                        'category-3'
                    ];
                    var randomNumber = Math.floor(Math.random()*textArray.length);
                    let cat = textArray[randomNumber];
                    let class_ = 'shwcgrid-item masonry-item  ' + cat;

                    var dateArray = [
                        '2018-06-02 15:00:34',
                        '2018-06-05 15:00:34',
                        '2018-06-03 15:00:34'
                    ];

                    var randomDateNumber = Math.floor(Math.random()*dateArray.length);
                    let date = dateArray[randomDateNumber];
                    galleryList.push(
                        <div className={class_} key={i}>
                            <a className="image_block">
                                <img src={ current.name } ns={1} alt="" data-trackid={i} onClick={product.bind(this, imageList, current.name, current.name )} />
                            </a>
                            <div className="info_block">
                                <a ns='1' className="title" data-trackid={i} > {current.productTitle} </a>
                                <span ns='1' className="description" data-trackid={i} >{current.productDescription}</span>
                                <div className="price_wrapper">
                                    <span className="price">{current.productPrice}</span>
                                    <span className="discont_price">{current.productDiscount}</span>
                                    <span ns='1' className="date" style={{display:'none'}} data-trackid={i}>{current.date}</span>
                                </div>
                            </div>
                        </div>
                    )
                }
                return (
                    <div className="shwc_template" id="shwc_template_1">
                        {(() => {
                            if (data.categoryButtonsPositionBtn == "left" || data.searchFieldPosition == "left" || data.orderingButtonsPositionBtn == "left"){
                                return (
                                    <div className="shwc_template_left">
                                        {
                                            (() => {
                                                if(data.searchFieldPosition == "left") {
                                                    return(
                                                        <form className="search_form left">
                                                            <input type="text" placeholder={ data.searchFieldPlaceholderText } ns="1" page="4" name="productOptionsEnableSearch" readOnly/>
                                                            <button type="submit" value="search" ns="1" page="4" name="productOptionsEnableSearchBtn" id="productOptionsEnableSearchBtn" onClick= {() => {return false;}}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 512 512" enablbackground="new 0 0 512 512" width="13px" height="13px">
                                                                    <g>
                                                                        <path d="M495,466.2L377.2,348.4c29.2-35.6,46.8-81.2,46.8-130.9C424,103.5,331.5,11,217.5,11C103.4,11,11,103.5,11,217.5 S103.4,424,217.5,424c49.7,0,95.2-17.5,130.8-46.7L466.1,495c8,8,20.9,8,28.9,0C503,487.1,503,474.1,495,466.2z M217.5,382.9   C126.2,382.9,52,308.7,52,217.5S126.2,52,217.5,52C308.7,52,383,126.3,383,217.5S308.7,382.9,217.5,382.9z" fill="#303030"/>
                                                                    </g>
                                                                </svg>
                                                            </button>
                                                        </form>
                                                    )
                                                }
                                            })()
                                        } {
                                        (() => {
                                            if (data.categoryButtonsPositionBtn == 'left') {
                                                return (
                                                    <div ns="1" className="button-group left categories_list">
                                                        <div>
                                                            <button className="button categoriesBtn 1 is-checked" data-filter="*">show all</button>
                                                        </div>
                                                        <div>
                                                            <button className="button categoriesBtn 1" data-filter=".category-1">Category 1 </button>
                                                        </div>
                                                        <div>
                                                            <button className="button categoriesBtn 1" data-filter=".category-2">Category 2 </button>
                                                        </div>
                                                        <div>
                                                            <button className="button categoriesBtn 1" data-filter=".category-3">Category 3 </button>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        })()
                                    }
                                        {
                                            (() => {
                                                if(data.orderingButtonsPositionBtn == "left") {
                                                    return(
                                                        <div className="button-group sort-by-button-group ordering_butons_list">
                                                            <div>
                                                                <button className="button is-checked ordering_butons" data-sort-value="original-order">Default</button>
                                                            </div>
                                                            <div>
                                                                <button className="button ordering_butons" data-sort-value="date">Date</button>
                                                            </div>
                                                            <div>
                                                                <button className="button ordering_butons" data-sort-value="title">Title</button>
                                                            </div>
                                                            <div>
                                                                <button className="button ordering_butons" id="shuffle" data-sort-value="random">Random</button>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            })()
                                        }
                                        <div className="clear"></div>
                                    </div>
                                )
                            }
                        })()}

                        {(() => {
                            if (data.categoryButtonsPositionBtn == "right" || data.searchFieldPosition == "right" || data.orderingButtonsPositionBtn == "right") {
                                return(
                                    <div className="shwc_template_right">
                                        {(() => {
                                            if (data.searchFieldPosition == "right") {
                                                return (<form className="search_form right">
                                                        <input type="text" placeholder={ data.searchFieldPlaceholderText } ns="1" page="4" name="productOptionsEnableSearch" readOnly/>
                                                        <button type="submit" value="search" ns="1" page="4" name="productOptionsEnableSearchBtn" id="productOptionsEnableSearchBtn" onClick= {() => {return false;}}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 512 512" enablbackground="new 0 0 512 512" width="13px" height="13px">
                                                                <g>
                                                                    <path d="M495,466.2L377.2,348.4c29.2-35.6,46.8-81.2,46.8-130.9C424,103.5,331.5,11,217.5,11C103.4,11,11,103.5,11,217.5 S103.4,424,217.5,424c49.7,0,95.2-17.5,130.8-46.7L466.1,495c8,8,20.9,8,28.9,0C503,487.1,503,474.1,495,466.2z M217.5,382.9   C126.2,382.9,52,308.7,52,217.5S126.2,52,217.5,52C308.7,52,383,126.3,383,217.5S308.7,382.9,217.5,382.9z" fill="#303030"/>
                                                                </g>
                                                            </svg>
                                                        </button>
                                                    </form>
                                                )
                                            }
                                        })()}{
                                        (() => {
                                            if (data.categoryButtonsPositionBtn == 'right') {
                                                return(
                                                    <div ns="1" className="button-group right categories_list">
                                                        <div>
                                                            <button className="button categoriesBtn 1 is-checked" data-filter="*">show all</button>
                                                        </div>
                                                        <div>
                                                            <button className="button categoriesBtn 1" data-filter=".category-1">Category 1 </button>
                                                        </div>
                                                        <div>
                                                            <button className="button categoriesBtn 1" data-filter=".category-2">Category 2 </button>
                                                        </div>
                                                        <div>
                                                            <button className="button categoriesBtn 1" data-filter=".category-3">Category 3 </button>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })()
                                    } {
                                        (() => {
                                            if(data.orderingButtonsPositionBtn == "right") {
                                                return(
                                                    <div className="button-group sort-by-button-group ordering_butons_list">
                                                        <div>
                                                            <button className="button is-checked ordering_butons" data-sort-value="original-order">Default</button>
                                                        </div>
                                                        <div>
                                                            <button className="button ordering_butons" data-sort-value="date">Date</button>
                                                        </div>
                                                        <div>
                                                            <button className="button ordering_butons" data-sort-value="title">Title</button>
                                                        </div>
                                                        <div>
                                                            <button className="button ordering_butons" id="shuffle" data-sort-value="random">Random</button>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })()
                                    }
                                    </div>
                                )
                            }
                        })()}
                        <div className="shwc_template_center">
                            {
                                (() => {
                                    if (data.categoryButtonsPositionBtn == "top" || data.searchFieldPosition == "top" || data.orderingButtonsPositionBtn == "top") {
                                        return (
                                            <div className="shwc_template_top">
                                                {(() => {
                                                    if (data.categoryButtonsPositionBtn == 'top') {
                                                        return(
                                                            <div ns="1" className="button-group top categories_list">
                                                                <div>
                                                                    <button className="button categoriesBtn 1 is-checked" data-filter="*">show all</button>
                                                                </div>
                                                                <div>
                                                                    <button className="button categoriesBtn 1" data-filter=".category-1">Category 1 </button>
                                                                </div>
                                                                <div>
                                                                    <button className="button categoriesBtn 1" data-filter=".category-2">Category 2 </button>
                                                                </div>
                                                                <div>
                                                                    <button className="button categoriesBtn 1" data-filter=".category-3">Category 3 </button>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                })()}{
                                                (() => {
                                                    if(data.orderingButtonsPositionBtn == "top") {
                                                        return(
                                                            <div className="button-group sort-by-button-group ordering_butons_list">
                                                                <div>
                                                                    <button className="button is-checked ordering_butons" data-sort-value="original-order">Default</button>
                                                                </div>
                                                                <div>
                                                                    <button className="button ordering_butons" data-sort-value="date">Date</button>
                                                                </div>
                                                                <div>
                                                                    <button className="button ordering_butons" data-sort-value="title">Title</button>
                                                                </div>
                                                                <div>
                                                                    <button className="button ordering_butons" id="shuffle" data-sort-value="random">Random</button>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                })()
                                            }{
                                                (() => {
                                                    if (data.searchFieldPosition == "top") {
                                                        return (<form className="search_form top">
                                                                <input type="text" placeholder={ data.searchFieldPlaceholderText } ns="1" page="4" name="productOptionsEnableSearch" readOnly/>
                                                                <button type="submit" value="search" ns="1" page="4" name="productOptionsEnableSearchBtn" id="productOptionsEnableSearchBtn" onClick= {() => {return false;}}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 512 512" enablbackground="new 0 0 512 512" width="13px" height="13px">
                                                                        <g>
                                                                            <path d="M495,466.2L377.2,348.4c29.2-35.6,46.8-81.2,46.8-130.9C424,103.5,331.5,11,217.5,11C103.4,11,11,103.5,11,217.5 S103.4,424,217.5,424c49.7,0,95.2-17.5,130.8-46.7L466.1,495c8,8,20.9,8,28.9,0C503,487.1,503,474.1,495,466.2z M217.5,382.9   C126.2,382.9,52,308.7,52,217.5S126.2,52,217.5,52C308.7,52,383,126.3,383,217.5S308.7,382.9,217.5,382.9z" fill="#303030"/>
                                                                        </g>
                                                                    </svg>
                                                                </button>
                                                            </form>
                                                        )
                                                    }
                                                })()
                                            }

                                            </div>
                                        )
                                    }

                                })()
                            }
                            <div className="search_template">
                                <div className="shwc_pc_wrapper pc_view5" id="filter_1">
                                    <div className="shwcgrid">
                                        <Options css = {data} />
                                        { galleryList }
                                    </div>
                                    {
                                        (() => {
                                            if (this.props.datas.loadMoreType == 'button') {
                                                let loadMore = this.props.datas.loadMoreButtonText ? this.props.datas.loadMoreButtonText : 'See More';
                                                let src_ = this.props.datas.pluginUrl + "/resources/assets/images/icons/loading" + this.props.datas.loadMoreLoadingIcons + ".gif";
                                                return (
                                                    <div className="load_more_wrapper">
                                                        <a href="javascript:void(0)" id="loadMore"  className="load_more_button" count = "1" style={{visibility: enableLoadMore ? 'visible' : 'hidden'}} onClick={this.loadMoreBtn.bind(this)}>{loadMore}</a>
                                                        <img id="loadingMore" className="loadingImage" style={{visibility: isLoadBtnClicked ? 'visible' : 'hidden'}} src={src_} />
                                                    </div>
                                                )
                                            } else {
                                                let src_ = this.props.datas.pluginUrl + "/resources/assets/images/icons/loading" + this.props.datas.loadMoreLoadingIcons + ".gif";
                                                return (
                                                    <div className="load_more_wrapper">
                                                        <img id="loadMore" className="loadingImage" style={{visibility: enableLoadMore ? 'visible' : 'hidden'}} src={src_}/>
                                                    </div>
                                                )
                                            }
                                        })()
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )
            break;
            case '6':  /*############################## 6 ####################################*/
                for (let i = 0; i < imageList.length; i++) {
                    let current = imageList[i];
                    let thumbnails = current.thumbnails;
                    var textArray = [
                        'category-1',
                        'category-2',
                        'category-3'
                    ];
                    var randomNumber = Math.floor(Math.random()*textArray.length);
                    let cat = textArray[randomNumber];
                    let class_ = 'shwcgrid-item  masonry-item ' + cat;

                    var dateArray = [
                        '2018-06-02 15:00:34',
                        '2018-06-05 15:00:34',
                        '2018-06-03 15:00:34'
                    ];

                    var randomDateNumber = Math.floor(Math.random()*dateArray.length);
                    let date = dateArray[randomDateNumber];
                    galleryList.push(
                        <div className={class_} data-category={cat} key={i}>
                            <ul className="images_list">
                                <li className="main" id="main_<?= $prodId; ?>">
                                    <div className="image_block">
                                        <div className="bg_wrapper" style={{ backgroundImage:"url("+current.name+")"}}></div>
                                        <img src={ current.name} ns='1' data-trackid={i} onClick={product.bind(this, imageList, current.name, current.name )} />
                                    </div>
                                </li>
                                {(() => {
                                    let thumbnailsArray = [];
                                    for (let j = 0; j < thumbnails.length; j++){
                                        thumbnailsArray.push(<li key = {j}>
                                            <div className="image_block">
                                                <div className="bg_wrapper" style={{ backgroundImage:"url("+thumbnails[j]+")"}}></div>
                                                <img src={thumbnails[j]} ns='1' data-trackid={j} onClick={product.bind(this, imageList, current.name, current.name )}/>
                                            </div>
                                        </li>)
                                    }
                                    return thumbnailsArray;
                                })()}
                            </ul>
                            <div className="info_block">
                                <a ns='1' className="title" data-trackid={i} >{current.productTitle}</a>
                                <span ns='1' className="description" data-trackid= {i}>{current.productDescription}</span>
                                <div className="price_wrapper">
                                    <span className="price">{current.productPrice}</span>
                                    <span className="discont_price">{current.productDiscount}</span>
                                    <span ns='1' className="date" style={{display:'none'}} data-trackid={i}>{current.date}</span>
                                </div>
                                <span className="date"></span>
                                <div className="clear"></div>
                            </div>
                        </div>
                    );
                }
                return (
                    <div className="shwc_template" id="shwc_template_1">
                        {(() => {
                            if (data.categoryButtonsPositionBtn == "left" || data.searchFieldPosition == "left" || data.orderingButtonsPositionBtn == "left"){
                                return (
                                    <div className="shwc_template_left">
                                        {
                                            (() => {
                                                if(data.searchFieldPosition == "left") {
                                                    return(
                                                        <form className="search_form left">
                                                            <input type="text" placeholder={ data.searchFieldPlaceholderText } ns="1" page="4" name="productOptionsEnableSearch" readOnly/>
                                                            <button type="submit" value="search" ns="1" page="4" name="productOptionsEnableSearchBtn" id="productOptionsEnableSearchBtn" onClick= {() => {return false;}}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 512 512" enablbackground="new 0 0 512 512" width="13px" height="13px">
                                                                    <g>
                                                                        <path d="M495,466.2L377.2,348.4c29.2-35.6,46.8-81.2,46.8-130.9C424,103.5,331.5,11,217.5,11C103.4,11,11,103.5,11,217.5 S103.4,424,217.5,424c49.7,0,95.2-17.5,130.8-46.7L466.1,495c8,8,20.9,8,28.9,0C503,487.1,503,474.1,495,466.2z M217.5,382.9   C126.2,382.9,52,308.7,52,217.5S126.2,52,217.5,52C308.7,52,383,126.3,383,217.5S308.7,382.9,217.5,382.9z" fill="#303030"/>
                                                                    </g>
                                                                </svg>
                                                            </button>
                                                        </form>
                                                    )
                                                }
                                            })()
                                        } {
                                        (() => {
                                            if (data.categoryButtonsPositionBtn == 'left') {
                                                return (
                                                    <div ns="1" className="button-group left categories_list">
                                                        <div>
                                                            <button className="button categoriesBtn 1 is-checked" data-filter="*">show all</button>
                                                        </div>
                                                        <div>
                                                            <button className="button categoriesBtn 1" data-filter=".category-1">Category 1 </button>
                                                        </div>
                                                        <div>
                                                            <button className="button categoriesBtn 1" data-filter=".category-2">Category 2 </button>
                                                        </div>
                                                        <div>
                                                            <button className="button categoriesBtn 1" data-filter=".category-3">Category 3 </button>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        })()
                                    }
                                        {
                                            (() => {
                                                if(data.orderingButtonsPositionBtn == "left") {
                                                    return(
                                                        <div className="button-group sort-by-button-group ordering_butons_list">
                                                            <div>
                                                                <button className="button is-checked ordering_butons" data-sort-value="original-order">Default</button>
                                                            </div>
                                                            <div>
                                                                <button className="button ordering_butons" data-sort-value="date">Date</button>
                                                            </div>
                                                            <div>
                                                                <button className="button ordering_butons" data-sort-value="title">Title</button>
                                                            </div>
                                                            <div>
                                                                <button className="button ordering_butons" id="shuffle" data-sort-value="random">Random</button>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            })()
                                        }
                                        <div className="clear"></div>
                                    </div>
                                )
                            }
                        })()}

                        {(() => {
                            if (data.categoryButtonsPositionBtn == "right" || data.searchFieldPosition == "right" || data.orderingButtonsPositionBtn == "right") {
                                return(
                                    <div className="shwc_template_right">
                                        {(() => {
                                            if (data.searchFieldPosition == "right") {
                                                return (<form className="search_form right">
                                                        <input type="text" placeholder={ data.searchFieldPlaceholderText } ns="1" page="4" name="productOptionsEnableSearch" readOnly/>
                                                        <button type="submit" value="search" ns="1" page="4" name="productOptionsEnableSearchBtn" id="productOptionsEnableSearchBtn" onClick= {() => {return false;}}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 512 512" enablbackground="new 0 0 512 512" width="13px" height="13px">
                                                                <g>
                                                                    <path d="M495,466.2L377.2,348.4c29.2-35.6,46.8-81.2,46.8-130.9C424,103.5,331.5,11,217.5,11C103.4,11,11,103.5,11,217.5 S103.4,424,217.5,424c49.7,0,95.2-17.5,130.8-46.7L466.1,495c8,8,20.9,8,28.9,0C503,487.1,503,474.1,495,466.2z M217.5,382.9   C126.2,382.9,52,308.7,52,217.5S126.2,52,217.5,52C308.7,52,383,126.3,383,217.5S308.7,382.9,217.5,382.9z" fill="#303030"/>
                                                                </g>
                                                            </svg>
                                                        </button>
                                                    </form>
                                                )
                                            }
                                        })()}{
                                        (() => {
                                            if (data.categoryButtonsPositionBtn == 'right') {
                                                return(
                                                    <div ns="1" className="button-group right categories_list">
                                                        <div>
                                                            <button className="button categoriesBtn 1 is-checked" data-filter="*">show all</button>
                                                        </div>
                                                        <div>
                                                            <button className="button categoriesBtn 1" data-filter=".category-1">Category 1 </button>
                                                        </div>
                                                        <div>
                                                            <button className="button categoriesBtn 1" data-filter=".category-2">Category 2 </button>
                                                        </div>
                                                        <div>
                                                            <button className="button categoriesBtn 1" data-filter=".category-3">Category 3 </button>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })()
                                    } {
                                        (() => {
                                            if(data.orderingButtonsPositionBtn == "right") {
                                                return(
                                                    <div className="button-group sort-by-button-group ordering_butons_list">
                                                        <div>
                                                            <button className="button is-checked ordering_butons" data-sort-value="original-order">Default</button>
                                                        </div>
                                                        <div>
                                                            <button className="button ordering_butons" data-sort-value="date">Date</button>
                                                        </div>
                                                        <div>
                                                            <button className="button ordering_butons" data-sort-value="title">Title</button>
                                                        </div>
                                                        <div>
                                                            <button className="button ordering_butons" id="shuffle" data-sort-value="random">Random</button>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })()
                                    }
                                    </div>
                                )
                            }
                        })()}
                        <div className="shwc_template_center">
                            {
                                (() => {
                                    if (data.categoryButtonsPositionBtn == "top" || data.searchFieldPosition == "top" || data.orderingButtonsPositionBtn == "top") {
                                        return (
                                            <div className="shwc_template_top">
                                                {(() => {
                                                    if (data.categoryButtonsPositionBtn == 'top') {
                                                        return(
                                                            <div ns="1" className="button-group top categories_list">
                                                                <div>
                                                                    <button className="button categoriesBtn 1 is-checked" data-filter="*">show all</button>
                                                                </div>
                                                                <div>
                                                                    <button className="button categoriesBtn 1" data-filter=".category-1">Category 1 </button>
                                                                </div>
                                                                <div>
                                                                    <button className="button categoriesBtn 1" data-filter=".category-2">Category 2 </button>
                                                                </div>
                                                                <div>
                                                                    <button className="button categoriesBtn 1" data-filter=".category-3">Category 3 </button>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                })()}{
                                                (() => {
                                                    if(data.orderingButtonsPositionBtn == "top") {
                                                        return(
                                                            <div className="button-group sort-by-button-group ordering_butons_list">
                                                                <div>
                                                                    <button className="button is-checked ordering_butons" data-sort-value="original-order">Default</button>
                                                                </div>
                                                                <div>
                                                                    <button className="button ordering_butons" data-sort-value="date">Date</button>
                                                                </div>
                                                                <div>
                                                                    <button className="button ordering_butons" data-sort-value="title">Title</button>
                                                                </div>
                                                                <div>
                                                                    <button className="button ordering_butons" id="shuffle" data-sort-value="random">Random</button>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                })()
                                            }{
                                                (() => {
                                                    if (data.searchFieldPosition == "top") {
                                                        return (<form className="search_form top">
                                                                <input type="text" placeholder={ data.searchFieldPlaceholderText } ns="1" page="4" name="productOptionsEnableSearch" readOnly/>
                                                                <button type="submit" value="search" ns="1" page="4" name="productOptionsEnableSearchBtn" id="productOptionsEnableSearchBtn" onClick= {() => {return false;}}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 512 512" enablbackground="new 0 0 512 512" width="13px" height="13px">
                                                                        <g>
                                                                            <path d="M495,466.2L377.2,348.4c29.2-35.6,46.8-81.2,46.8-130.9C424,103.5,331.5,11,217.5,11C103.4,11,11,103.5,11,217.5 S103.4,424,217.5,424c49.7,0,95.2-17.5,130.8-46.7L466.1,495c8,8,20.9,8,28.9,0C503,487.1,503,474.1,495,466.2z M217.5,382.9   C126.2,382.9,52,308.7,52,217.5S126.2,52,217.5,52C308.7,52,383,126.3,383,217.5S308.7,382.9,217.5,382.9z" fill="#303030"/>
                                                                        </g>
                                                                    </svg>
                                                                </button>
                                                            </form>
                                                        )
                                                    }
                                                })()
                                            }

                                            </div>
                                        )
                                    }

                                })()
                            }
                            <div className="search_template">
                                <div className="shwc_pc_wrapper pc_view6" id="filter_1">
                                    <div className="shwcgrid">
                                        <Options css = {data} />
                                        { galleryList }
                                    </div>
                                    {
                                        (() => {
                                            if (this.props.datas.loadMoreType == 'button') {
                                                let loadMore = this.props.datas.loadMoreButtonText ? this.props.datas.loadMoreButtonText : 'See More';
                                                let src_ = this.props.datas.pluginUrl + "/resources/assets/images/icons/loading" + this.props.datas.loadMoreLoadingIcons + ".gif";
                                                return (
                                                    <div className="load_more_wrapper">
                                                        <a href="javascript:void(0)" id="loadMore"  className="load_more_button" count = "1" style={{visibility: enableLoadMore ? 'visible' : 'hidden'}} onClick={this.loadMoreBtn.bind(this)}>{loadMore}</a>
                                                        <img id="loadingMore" className="loadingImage" style={{visibility: isLoadBtnClicked ? 'visible' : 'hidden'}} src={src_} />
                                                    </div>
                                                )
                                            } else {
                                                let src_ = this.props.datas.pluginUrl + "/resources/assets/images/icons/loading" + this.props.datas.loadMoreLoadingIcons + ".gif";
                                                return (
                                                    <div className="load_more_wrapper">
                                                        <img id="loadMore" className="loadingImage" style={{visibility: enableLoadMore ? 'visible' : 'hidden'}} src={src_}/>
                                                    </div>
                                                )
                                            }
                                        })()
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )
                break;
            default:
                return (
                    <div></div>
                )
        }
    }
}
export default GalleryList;