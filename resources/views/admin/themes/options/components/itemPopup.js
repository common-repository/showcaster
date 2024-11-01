import React, {Component} from "react";
import ColorComponent from "../../ColorComponent";
import NumberPicker from "../../NumberPicker";
class ItemPopup extends Component {
    constructor(props) {
        super(props);
        let themeData = props.themeData;
        this.handleChange = this.handleChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this.state = {
            itemPopupPopupWidth: themeData.itemPopupPopupWidth,
            itemPopupDimension: themeData.itemPopupDimension,
            itemPopupSizeByPx: themeData.itemPopupSizeByPx,
            itemPopupSizeByPrc: themeData.itemPopupSizeByPrc,
            itemPopupBackground: themeData.itemPopupBackground,
            itemPopupOverlayColor: themeData.itemPopupOverlayColor,
            itemPopupOverlayTransparency: themeData.itemPopupOverlayTransparency,
            itemPopupIconsColor: themeData.itemPopupIconsColor,
            //itemPopupEnableImageZoom: themeData.itemPopupEnableImageZoom == "true",
            itemPopupTitle1: themeData.itemPopupTitle1,
            itemPopupTitle2: themeData.itemPopupTitle2,
            itemPopupTitle3: themeData.itemPopupTitle3,
            itemPopupDescription1: themeData.itemPopupDescription1,
            itemPopupDescription2: themeData.itemPopupDescription2,
            itemPopupDescription3: themeData.itemPopupDescription3,
            itemPopupPrice1: themeData.itemPopupPrice1,
            itemPopupPrice2: themeData.itemPopupPrice2,
            itemPopupPrice3: themeData.itemPopupPrice3,
            itemPopupDiscountPrice1: themeData.itemPopupDiscountPrice1,
            itemPopupDiscountPrice2: themeData.itemPopupDiscountPrice2,
            itemPopupDiscountPrice3: themeData.itemPopupDiscountPrice3,
            itemPopupLabels1: themeData.itemPopupLabels1,
            itemPopupLabels2: themeData.itemPopupLabels2,
            itemPopupLabels3: themeData.itemPopupLabels3,
            itemPopupAttributes1: themeData.itemPopupAttributes1,
            itemPopupAttributes2: themeData.itemPopupAttributes2,
            itemPopupAttributes3: themeData.itemPopupAttributes3
        }
    }

    componentWillReceiveProps(data) {
        let themeData = data.themeData;
        this.setState({
            itemPopupPopupWidth: themeData.itemPopupPopupWidth,
            itemPopupDimension: themeData.itemPopupDimension,
            itemPopupSizeByPx: themeData.itemPopupSizeByPx,
            itemPopupSizeByPrc: themeData.itemPopupSizeByPrc,
            itemPopupBackground: themeData.itemPopupBackground,
            itemPopupOverlayColor: themeData.itemPopupOverlayColor,
            itemPopupOverlayTransparency: themeData.itemPopupOverlayTransparency,
            itemPopupIconsColor: themeData.itemPopupIconsColor,
            //itemPopupEnableImageZoom: themeData.itemPopupEnableImageZoom == "true",
            itemPopupTitle1: themeData.itemPopupTitle1,
            itemPopupTitle2: themeData.itemPopupTitle2,
            itemPopupTitle3: themeData.itemPopupTitle3,
            itemPopupDescription1: themeData.itemPopupDescription1,
            itemPopupDescription2: themeData.itemPopupDescription2,
            itemPopupDescription3: themeData.itemPopupDescription3,
            itemPopupPrice1: themeData.itemPopupPrice1,
            itemPopupPrice2: themeData.itemPopupPrice2,
            itemPopupPrice3: themeData.itemPopupPrice3,
            itemPopupDiscountPrice1: themeData.itemPopupDiscountPrice1,
            itemPopupDiscountPrice2: themeData.itemPopupDiscountPrice2,
            itemPopupDiscountPrice3: themeData.itemPopupDiscountPrice3,
            itemPopupLabels1: themeData.itemPopupLabels1,
            itemPopupLabels2: themeData.itemPopupLabels2,
            itemPopupLabels3: themeData.itemPopupLabels3,
            itemPopupAttributes1: themeData.itemPopupAttributes1,
            itemPopupAttributes2: themeData.itemPopupAttributes2,
            itemPopupAttributes3: themeData.itemPopupAttributes3
        })
    }

    handleChange(event) {
        let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        this.state[event.target.name] = value;
        this.props.onGiveValue(this.state);
    }

    setColor(data, color) {
        this.state[data] = color;
        this.props.onGiveValue(this.state);
    }

    setNum(data, num) {
        this.state[data] = num;
        this.props.onGiveValue(this.state);
    }

    _handleSubmit(e) {
        this.props.onSubmitData();
    }

    stopLabelPropagation(e) {
        e.stopPropagation();
        let value = e.target.getAttribute('name');
        this.state[value] = !this.state[value];
        this.props.onGiveValue(this.state);
    }

    render() {
        let a = 30;
        return (
            <div className="editor_box">
                <div className="editor_box_title">...</div>
                <span className="heading">Item Popup</span>
                <form name="itemPopupForm" className="options_form">
                    <div className="option_line">
                        <label>Popup Width</label>
                        <div className="width_option_block option_block">
                            <input type="text" onChange={this.handleChange} value={this.state.itemPopupPopupWidth} name="itemPopupPopupWidth"/>
                            <select className="" onChange={this.handleChange} value={this.state.itemPopupDimension} name="itemPopupDimension">
                                <option value="px">px</option>
                                <option value="%">%</option>
                            </select>
                        </div>
                    </div>
                    <div className="option_line">
                        <label>Popup Background</label>
                        <div className="option_block colorpicker">
                            <ColorComponent setColor={this.setColor.bind(this, 'itemPopupBackground')} onChange={this.handleChange} color={this.state.itemPopupBackground}/>
                        </div>
                    </div>
                    <div className="option_line">
                        <label>Overlay Color</label>
                        <div className="option_block colorpicker">
                            <ColorComponent setColor={this.setColor.bind(this, 'itemPopupOverlayColor')} onChange={this.handleChange} color={this.state.itemPopupOverlayColor}/>
                        </div>
                    </div>
                    <div className="option_line prc">
                        <label>Overlay Transparency</label>
                        <NumberPicker setNum={this.setNum.bind(this, 'itemPopupOverlayTransparency')} onChange={this.handleChange} value={this.state.itemPopupOverlayTransparency} name="itemPopupOverlayTransparency" numb={this.state.itemPopupOverlayTransparency}/>
                        <div className={"free_message"}>
                            <span>These options are available only on pro version</span>
                            <a href={"http://showcaster.org"} target={"_blank"}>Go Pro</a>
                            <i className={"close_icon"} target={"_blank"}>[x]</i>
                        </div>
                    </div>
                    <div className="option_line">
                        <label>Icons Color</label>
                        <div className="option_block colorpicker">
                            <ColorComponent  color={this.state.itemPopupIconsColor}/>
                        </div>
                    </div>
                    <div className="option_line">
                        <label>Title</label>
                        <div className="text_options_block option_block">
                            <div className="size_option_wrapper">
                                <input type="text" className="size_option"  value={this.state.itemPopupTitle1} name="itemPopupTitle1"/>
                            </div>
                            <div className="color_option_wrapper">
                                <div className="colorpicker color_option">
                                    <ColorComponent  color={this.state.itemPopupTitle2}/>
                                </div>
                            </div>
                            <select className="font_option" value={this.state.itemPopupTitle3} name="itemPopupTitle3">
                                <option value="inherit">Theme Font</option>
                                <option value="arial">Arial</option>
                                <option value="verdana">Verdana</option>
                                <option value="tahoma">Tahoma</option>
                                <option value="Comic Sans MS">Comic Sans MS</option>
                                <option value="georgia">Georgia</option>
                                <option value="palatino">Palatino</option>
                                <option value="bookman">Bookman</option>
                                <option value="garamond">Garamond</option>
                                <option value="Andale Mono">Andale Mono</option>
                            </select>
                        </div>
                    </div>
                    <div className="option_line">
                        <label>Description</label>
                        <div className="text_options_block option_block">
                            <div className="size_option_wrapper">
                                <input type="text" className="size_option"  value={this.state.itemPopupDescription1} name="itemPopupDescription1"/>
                            </div>
                            <div className="color_option_wrapper">
                                <div className="colorpicker color_option">
                                    <ColorComponent  color={this.state.itemPopupDescription2}/>
                                </div>
                            </div>
                            <select className="font_option" value={this.state.itemPopupDescription3} name="itemPopupDescription3">
                                <option value="inherit">Theme Font</option>
                                <option value="arial">Arial</option>
                                <option value="verdana">Verdana</option>
                                <option value="tahoma">Tahoma</option>
                                <option value="Comic Sans MS">Comic Sans MS</option>
                                <option value="georgia">Georgia</option>
                                <option value="palatino">Palatino</option>
                                <option value="bookman">Bookman</option>
                                <option value="garamond">Garamond</option>
                                <option value="Andale Mono">Andale Mono</option>
                            </select>
                        </div>
                    </div>
                    <div className="option_line">
                        <label>Price</label>
                        <div className="text_options_block option_block">
                            <div className="size_option_wrapper">
                                <input type="text" className="size_option" value={this.state.itemPopupPrice1} name="itemPopupPrice1"/>
                            </div>
                            <div className="color_option_wrapper">
                                <div className="colorpicker color_option">
                                    <ColorComponent color={this.state.itemPopupPrice2}/>
                                </div>
                            </div>
                            <select className="font_option" onChange={this.handleChange} value={this.state.itemPopupPrice3} name="itemPopupPrice3">
                                <option value="inherit">Theme Font</option>
                                <option value="arial">Arial</option>
                                <option value="verdana">Verdana</option>
                                <option value="tahoma">Tahoma</option>
                                <option value="Comic Sans MS">Comic Sans MS</option>
                                <option value="georgia">Georgia</option>
                                <option value="palatino">Palatino</option>
                                <option value="bookman">Bookman</option>
                                <option value="garamond">Garamond</option>
                                <option value="Andale Mono">Andale Mono</option>
                            </select>
                        </div>
                    </div>
                    <div className="option_line">
                        <label>Discount Price</label>
                        <div className="text_options_block option_block">
                            <div className="size_option_wrapper">
                                <input type="text" className="size_option" value={this.state.itemPopupDiscountPrice1} name="itemPopupDiscountPrice1"/>
                            </div>
                            <div className="color_option_wrapper">
                                <div className="colorpicker color_option">
                                    <ColorComponent color={this.state.itemPopupDiscountPrice2}/>
                                </div>
                            </div>
                            <select className="font_option" onChange={this.handleChange} value={this.state.itemPopupDiscountPrice3} name="itemPopupDiscountPrice3">
                                <option value="inherit">Theme Font</option>
                                <option value="arial">Arial</option>
                                <option value="verdana">Verdana</option>
                                <option value="tahoma">Tahoma</option>
                                <option value="Comic Sans MS">Comic Sans MS</option>
                                <option value="georgia">Georgia</option>
                                <option value="palatino">Palatino</option>
                                <option value="bookman">Bookman</option>
                                <option value="garamond">Garamond</option>
                                <option value="Andale Mono">Andale Mono</option>
                            </select>
                        </div>
                    </div>
                    <div className="option_line">
                        <label>Labels</label>
                        <div className="text_options_block option_block">
                            <div className="size_option_wrapper">
                                <input type="text" className="size_option" value={this.state.itemPopupLabels1} name="itemPopupLabels1"/>
                            </div>
                            <div className="color_option_wrapper">
                                <div className="colorpicker color_option">
                                    <ColorComponent  color={this.state.itemPopupLabels2}/>
                                </div>
                            </div>
                            <select className="font_option" value={this.state.itemPopupLabels3} name="itemPopupLabels3">
                                <option value="inherit">Theme Font</option>
                                <option value="arial">Arial</option>
                                <option value="verdana">Verdana</option>
                                <option value="tahoma">Tahoma</option>
                                <option value="Comic Sans MS">Comic Sans MS</option>
                                <option value="georgia">Georgia</option>
                                <option value="palatino">Palatino</option>
                                <option value="bookman">Bookman</option>
                                <option value="garamond">Garamond</option>
                                <option value="Andale Mono">Andale Mono</option>
                            </select>
                        </div>
                    </div>
                    <div className="option_line">
                        <label>Attributes</label>
                        <div className="text_options_block option_block">
                            <div className="size_option_wrapper">
                                <input type="text" className="size_option" value={this.state.itemPopupAttributes1} name="itemPopupAttributes1"/>
                            </div>
                            <div className="color_option_wrapper">
                                <div className="colorpicker color_option">
                                    <ColorComponent color={this.state.itemPopupAttributes2}/>
                                </div>
                            </div>
                            <select className="font_option"  value={this.state.itemPopupAttributes3} name="itemPopupAttributes3">
                                <option value="inherit">Theme Font</option>
                                <option value="arial">Arial</option>
                                <option value="verdana">Verdana</option>
                                <option value="tahoma">Tahoma</option>
                                <option value="Comic Sans MS">Comic Sans MS</option>
                                <option value="georgia">Georgia</option>
                                <option value="palatino">Palatino</option>
                                <option value="bookman">Bookman</option>
                                <option value="garamond">Garamond</option>
                                <option value="Andale Mono">Andale Mono</option>
                            </select>
                        </div>
                    </div>
                    <div className="button_wrapper option_line">
                        <input type="button" value="Save" onClick={this._handleSubmit} className="updateThemesData" name="option1Save"/>
                    </div>
                </form>
            </div>
        )
    }
}
export default ItemPopup;