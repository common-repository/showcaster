import React, {Component} from "react";
import Options from  '../../templates/style/options';

//import  '../../../../../assets/css/admin/themes/options-styles.css';
import  '../../../../../assets/css/frontend/modal.css';
import  '../../../../../assets/css/frontend/slick.css';
import  '../../../../../assets/css/frontend/slick-theme.css';
import  '../../../../../assets/css/frontend/main.css';

class Popup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageList: props.imageData.imageData
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            imageList: newProps.imageData
        });
    }

    renderThumbsNav() {
        let thumb = [];
        thumb.push(<li className="active"></li>);
        if (this.state.imageList && this.state.imageList[0]) {
            for (let i = 0; i < this.state.imageList[0].thumbnails.length; i++) {
                thumb.push(<li></li>);
            }
        }
        return thumb;
    }

    renderAttributes() {
        let attributes = [];
        if (this.state.imageList && this.state.imageList[0]) {
            for (let i = 0; i < this.state.imageList[0].attributes.length; i++) {
                let attribute = this.state.imageList[0].attributes[i];
                attributes.push(<li>
                    <span className="attr_label">{attribute.title} : {attribute.value}</span>
                </li>);
            }
        }
        return attributes;
    }

    renderThumbnails(mainUrl, background) {
        let thumb = [];
        thumb.push(<li selectedurl={mainUrl} imgurlmain1024={mainUrl} onClick={(e)=>selectProduct(e.currentTarget)}>
            <div className="image_block">
                <div className="bg_wrapper" style={background}></div>
                <img src={mainUrl}/>
            </div>
        </li>);
        if (this.state.imageList && this.state.imageList[0]) {
            for (let i = 0; i < this.state.imageList[0].thumbnails.length; i++) {
                let thumbnail = this.state.imageList[0].thumbnails[i];
                var backgroundImage_ = {
                    backgroundImage: "url('" + thumbnail + "')"
                };
                thumb.push(<li selectedurl={thumbnail} imgurlmain1024={thumbnail} onClick={(e)=>selectProduct(e.currentTarget)}>
                    <div className="image_block">
                        <div className="bg_wrapper" style={backgroundImage_}></div>
                        <img src={thumbnail}/>
                    </div>
                </li>);
            }
        }
        return thumb;
    }

    render() {
        let data = this.props.datas;
        var divStyle = {
            display: 'none'
        };
        var firstImage = this.state.imageList ? this.state.imageList[0] : null;
        var scrImage = (firstImage ? firstImage.name : '');
        var backgroundImage = {
            backgroundImage: "url('"+ scrImage+"')"
        };
        return (
            <div className="modal shwc_modal_page" index="" style={divStyle}>
                <Options css = {data} />
                {(() => {
                    if (firstImage) {
                       return (<div className="modal_content">
                            <div className="images_block">
                                <div className="main_image_block">
                                    <div className="image_block">
                                        <div className="bg_wrapper" style={backgroundImage}></div>
                                        <img id="zoom_011" src={scrImage} />
                                    </div>
                                </div>
                                <div className="thumbs_list_wrap">
                                    <ul className="thumbs_list">
                                        {this.renderThumbnails(scrImage, backgroundImage)}
                                    </ul>
                                    <ul className="thumbs_nav_list">
                                        {this.renderThumbsNav()}
                                    </ul>
                                </div>
                            </div>

                            <div className="info_block" id="infoBlock">
                                <span className="product_heading">{firstImage.productTitle}</span>
                                <div className="info_flex_wrapper">
                                    <div className="product_description">
                                        <span className="info_label">Description</span>
                                        <p className="description_content">
                                            {firstImage.productDescription}
                                        </p>
                                    </div>
                                    <div className="product_price">
                                        <span className="info_label">Price</span>
                                        <span className="old_price">
                                            <span className="old_price_inner">{firstImage.productPrice}</span>
                                        </span>
                                        <span className="discount_price">{firstImage.productDiscount}</span>
                                    </div>
                                    <div className="product_categories">
                                        <span className="info_label">Categories</span>
                                        <ul className="categories_list">
                                        </ul>
                                    </div>
                                    <div className="attributes_block">
                                        <span className="info_label">Attributes</span>
                                        <ul className="attributes_list">
                                            {this.renderAttributes()}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="clear"></div>
                        </div>)
                    }
                })()}
                <div className="close_modal_wrapper">
                    <span className="shwc_info_menu">...</span>
                    <a href="javascript:;" className="close_modal" url="">
                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                             viewBox="0 0 512 512" style={{"enableBackground": "new 0 0 512 512"}}>
                            <g>
                                <g>
                                    <path d="M505.943,6.058c-8.077-8.077-21.172-8.077-29.249,0L6.058,476.693c-8.077,8.077-8.077,21.172,0,29.249
                                        C10.096,509.982,15.39,512,20.683,512c5.293,0,10.586-2.019,14.625-6.059L505.943,35.306
                                        C514.019,27.23,514.019,14.135,505.943,6.058z"/>
                                </g>
                            </g>
                            <g>
                                <g>
                                    <path d="M505.942,476.694L35.306,6.059c-8.076-8.077-21.172-8.077-29.248,0c-8.077,8.076-8.077,21.171,0,29.248l470.636,470.636
                            c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.624-6.057C514.018,497.866,514.018,484.771,505.942,476.694z"/>
                                </g>
                            </g>
                         </svg>
                    </a>
                </div>

                <a href="javascript:;" className="prev_modal_button" onClick={(e)=>goToNextSlideModal(e, false, this.state.imageList)}>
                    <svg className="prev_modal_svg" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                            viewBox="0 0 477.175 477.175" style={{"enableBackground":"new 0 0 477.175 477.175"}} width="50" height="50">
                        <g>
                            <path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225
                                c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z" />
                        </g>
                    </svg>

                    <svg className="mobile_prev_modal_svg" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                         viewBox="0 0 31.494 31.494">
                        <path  d="M10.273,5.009c0.444-0.444,1.143-0.444,1.587,0c0.429,0.429,0.429,1.143,0,1.571l-8.047,8.047h26.554
                            c0.619,0,1.127,0.492,1.127,1.111c0,0.619-0.508,1.127-1.127,1.127H3.813l8.047,8.032c0.429,0.444,0.429,1.159,0,1.587
                            c-0.444,0.444-1.143,0.444-1.587,0l-9.952-9.952c-0.429-0.429-0.429-1.143,0-1.571L10.273,5.009z"/>
                    </svg>
                </a>

                <a href="javascript:;" className="next_modal_button" onClick={(e)=>goToNextSlideModal(e, true, this.state.imageList)}>
                    <svg className="next_modal_svg" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                         viewBox="0 0 477.175 477.175" style={{"enableBackground":"new 0 0 477.175 477.175"}} width="50" height="50">
                        <g>
                            <path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5
                                c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z
                                "/>
                        </g>
                    </svg>

                    <svg className="mobile_next_modal_svg" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                         viewBox="0 0 31.49 31.49">
                    <path d="M21.205,5.007c-0.429-0.444-1.143-0.444-1.587,0c-0.429,0.429-0.429,1.143,0,1.571l8.047,8.047H1.111
                        C0.492,14.626,0,15.118,0,15.737c0,0.619,0.492,1.127,1.111,1.127h26.554l-8.047,8.032c-0.429,0.444-0.429,1.159,0,1.587
                        c0.444,0.444,1.159,0.444,1.587,0l9.952-9.952c0.444-0.429,0.444-1.143,0-1.571L21.205,5.007z"/>
                    </svg>
                </a>
            </div>
        )
    }
}
export default Popup;