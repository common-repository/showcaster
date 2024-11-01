import React, {Component} from "react";
import ColorComponent from "../../ColorComponent";
class ItemPage extends Component {
    constructor(props) {
        super(props);
        let themeData = props.themeData;
        this.handleChange = this.handleChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this.state = {
            itemPageTitle: themeData.itemPageTitle,
            itemPageTitleColor: themeData.itemPageTitleColor,
            itemPageTitleFontStyle: themeData.itemPageTitleFontStyle,
            itemPageDescription: themeData.itemPageDescription,
            itemPageDescriptionColor: themeData.itemPageDescriptionColor,
            itemPageDescriptionFontStyle: themeData.itemPageDescriptionFontStyle,
            itemPagePrice: themeData.itemPagePrice,
            itemPagePriceColor: themeData.itemPagePriceColor,
            itemPagePriceFontStyle: themeData.itemPagePriceFontStyle,
            itemPageDiscountPrice: themeData.itemPageDiscountPrice,
            itemPageDiscountPriceColor: themeData.itemPageDiscountPriceColor,
            itemPageDiscountPriceFontStyle: themeData.itemPageDiscountPriceFontStyle,
            itemPageLabele: themeData.itemPageLabele,
            itemPageLabeleColor: themeData.itemPageLabeleColor,
            itemPageLabeleFontStyle: themeData.itemPageLabeleFontStyle,
            itemPageAttribute: themeData.itemPageAttribute,
            itemPageAttributeColor: themeData.itemPageAttributeColor,
            itemPageAttributeFontStyle: themeData.itemPageAttributeFontStyle // themeData.itemPageAttributeFontStyle
        }
    }

    componentWillReceiveProps(data) {
        let themeData = data.themeData;
        this.setState({
            itemPageTitle: themeData.itemPageTitle,
            itemPageTitleColor: themeData.itemPageTitleColor,
            itemPageTitleFontStyle: themeData.itemPageTitleFontStyle,
            itemPageDescription: themeData.itemPageDescription,
            itemPageDescriptionColor: themeData.itemPageDescriptionColor,
            itemPageDescriptionFontStyle: themeData.itemPageDescriptionFontStyle,
            itemPagePrice: themeData.itemPagePrice,
            itemPagePriceColor: themeData.itemPagePriceColor,
            itemPagePriceFontStyle: themeData.itemPagePriceFontStyle,
            itemPageDiscountPrice: themeData.itemPageDiscountPrice,
            itemPageDiscountPriceColor: themeData.itemPageDiscountPriceColor,
            itemPageDiscountPriceFontStyle: themeData.itemPageDiscountPriceFontStyle,
            itemPageLabele: themeData.itemPageLabele,
            itemPageLabeleColor: themeData.itemPageLabeleColor,
            itemPageLabeleFontStyle: themeData.itemPageLabeleFontStyle,
            itemPageAttribute: themeData.itemPageAttribute,
            itemPageAttributeColor: themeData.itemPageAttributeColor,
            itemPageAttributeFontStyle: themeData.itemPageAttributeFontStyle // themeData.itemPageAttributeFontStyle
        })
    }

    handleChange(event) {
        let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        this.state[event.target.name] = value;
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

    setColor(data, color) {
        this.state[data] = color;
        this.props.onGiveValue(this.state);
    }

    render() {
        return (
            <div className="editor_box">
                <div className="editor_box_title">...</div>
                <span className="heading">Item Page</span>
                <form name="itemPageForm" className="options_form">
                    <div className="option_line">
                        <label>Title</label>
                        <div className="text_options_block option_block">
                            <div className="size_option_wrapper">
                                <input type="text" className="size_option" onChange={this.handleChange} value={this.state.itemPageTitle} name="itemPageTitle"/>
                            </div>
                            <div className="color_option_wrapper">
                                <div className="colorpicker color_option">
                                    <ColorComponent setColor={this.setColor.bind(this, 'itemPageTitleColor')} onChange={this.handleChange} color={this.state.itemPageTitleColor}/>
                                </div>
                            </div>
                            <select className="font_option" onChange={this.handleChange} value={this.state.itemPageTitleFontStyle} name="itemPageTitleFontStyle">
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
                                <input type="text" className="size_option" onChange={this.handleChange} value={this.state.itemPageDescription} name="itemPageDescription"/>
                            </div>
                            <div className="color_option_wrapper">
                                <div className="colorpicker color_option">
                                    <ColorComponent setColor={this.setColor.bind(this, 'itemPageDescriptionColor')} onChange={this.handleChange} color={this.state.itemPageDescriptionColor}/>
                                </div>
                            </div>
                            <select className="font_option" onChange={this.handleChange} value={this.state.itemPageDescriptionFontStyle} name="itemPageDescriptionFontStyle">
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
                                <input type="text" className="size_option" onChange={this.handleChange} value={this.state.itemPagePrice} name="itemPagePrice"/>
                            </div>
                            <div className="color_option_wrapper">
                                <div className="colorpicker color_option">
                                    <ColorComponent setColor={this.setColor.bind(this, 'itemPagePriceColor')} onChange={this.handleChange} color={this.state.itemPagePriceColor}/>
                                </div>
                            </div>
                            <select className="font_option" onChange={this.handleChange} value={this.state.itemPagePriceFontStyle} name="itemPagePriceFontStyle">
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
                                <input type="text" className="size_option" onChange={this.handleChange} value={this.state.itemPageDiscountPrice} name="itemPageDiscountPrice"/>
                            </div>
                            <div className="color_option_wrapper">
                                <div className="colorpicker color_option">
                                    <ColorComponent setColor={this.setColor.bind(this, 'itemPageDiscountPriceColor')} onChange={this.handleChange} color={this.state.itemPageDiscountPriceColor}/>
                                </div>
                            </div>
                            <select className="font_option" onChange={this.handleChange} value={this.state.itemPageDiscountPriceFontStyle} name="itemPageDiscountPriceFontStyle">
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
                                <input type="text" className="size_option" onChange={this.handleChange} value={this.state.itemPageLabele} name="itemPageLabele"/>
                            </div>
                            <div className="color_option_wrapper">
                                <div className="colorpicker color_option">
                                    <ColorComponent setColor={this.setColor.bind(this, 'itemPageLabeleColor')} onChange={this.handleChange} color={this.state.itemPageLabeleColor}/>
                                </div>
                            </div>
                            <select className="font_option" onChange={this.handleChange} value={this.state.itemPageLabeleFontStyle} name="itemPageLabeleFontStyle">
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
                                <input type="text" className="size_option" onChange={this.handleChange} value={this.state.itemPageAttribute} name="itemPageAttribute"/>
                            </div>
                            <div className="color_option_wrapper">
                                <div className="colorpicker color_option">
                                    <ColorComponent setColor={this.setColor.bind(this, 'itemPageAttributeColor')} onChange={this.handleChange} color={this.state.itemPageAttributeColor}/>
                                </div>
                            </div>
                            <select className="font_option" onChange={this.handleChange} value={this.state.itemPageAttributeFontStyle} name="itemPageAttributeFontStyle">
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
                    <div className={"free_message"}>
                        These options are only available on Pro version
                        <a href={"http://showcaster.org"} target={"_blank"}>Go Pro</a>
                    </div>
                </form>
            </div>
        )
    }
}
export default ItemPage;

