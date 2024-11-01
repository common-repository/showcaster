import React, {Component} from "react";
import ColorComponent from "../../ColorComponent";
import NumberPicker from "../../NumberPicker";
class GridItem extends Component {
    constructor(props) {
        super(props);
        let themeData = props.themeData;
        this.handleChange = this.handleChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this.state = {
            gridItemWidth: themeData.gridItemWidth,
            gridItemDimension: themeData.gridItemDimension,
            gridItemFixedHeight: themeData.gridItemFixedHeight.toString() == "true",
            gridItemHeight: themeData.gridItemHeight,
            gridItemBackgroundColor: themeData.gridItemBackgroundColor,
            gridItemBackgroundColorHover: themeData.gridItemBackgroundColorHover,
            gridItemBackgroundTransparency: themeData.gridItemBackgroundTransparency,
            gridItemBorderRadius: themeData.gridItemBorderRadius,
            gridItemMargin: themeData.gridItemMargin,
            gridItemShowTitle: themeData.gridItemShowTitle.toString() == "true",
            gridItemTitle1: themeData.gridItemTitle1,
            gridItemTitle2: themeData.gridItemTitle2,
            gridItemTitle3: themeData.gridItemTitle3,
            gridItemShowDescription: themeData.gridItemShowDescription.toString() == "true",
            gridItemDescription1: themeData.gridItemDescription1,
            gridItemDescription2: themeData.gridItemDescription2,
            gridItemDescription3: themeData.gridItemDescription3,
            gridItemShowPrice: themeData.gridItemShowPrice.toString() == "true",
            gridItemShowPrice1: themeData.gridItemShowPrice1,
            gridItemShowPrice2: themeData.gridItemShowPrice2,
            gridItemShowPrice3: themeData.gridItemShowPrice3,
            gridItemShowDiscountPrice: themeData.gridItemShowDiscountPrice.toString() == "true",
            gridItemShowDiscountPrice1: themeData.gridItemShowDiscountPrice1,
            gridItemShowDiscountPrice2: themeData.gridItemShowDiscountPrice2,
            gridItemShowDiscountPrice3: themeData.gridItemShowDiscountPrice3,
            gridItemWidth3: themeData.gridItemWidth3
        }
    }

    componentWillReceiveProps(data) {
        let themeData = data.themeData;
        this.setState({
            gridItemWidth: themeData.gridItemWidth,
            gridItemDimension: themeData.gridItemDimension,
            gridItemFixedHeight: themeData.gridItemFixedHeight.toString() == "true",
            gridItemHeight: themeData.gridItemHeight,
            gridItemBackgroundColor: themeData.gridItemBackgroundColor,
            gridItemBackgroundColorHover: themeData.gridItemBackgroundColorHover,
            gridItemBackgroundTransparency: themeData.gridItemBackgroundTransparency,
            gridItemBorderRadius: themeData.gridItemBorderRadius,
            gridItemMargin: themeData.gridItemMargin,
            gridItemShowTitle: themeData.gridItemShowTitle.toString() == "true",
            gridItemTitle1: themeData.gridItemTitle1,
            gridItemTitle2: themeData.gridItemTitle2,
            gridItemTitle3: themeData.gridItemTitle3,
            gridItemShowDescription: themeData.gridItemShowDescription.toString() == "true",
            gridItemDescription1: themeData.gridItemDescription1,
            gridItemDescription2: themeData.gridItemDescription2,
            gridItemDescription3: themeData.gridItemDescription3,
            gridItemShowPrice: themeData.gridItemShowPrice.toString() == "true",
            gridItemShowPrice1: themeData.gridItemShowPrice1,
            gridItemShowPrice2: themeData.gridItemShowPrice2,
            gridItemShowPrice3: themeData.gridItemShowPrice3,
            gridItemShowDiscountPrice: themeData.gridItemShowDiscountPrice.toString() == "true",
            gridItemShowDiscountPrice1: themeData.gridItemShowDiscountPrice1,
            gridItemShowDiscountPrice2: themeData.gridItemShowDiscountPrice2,
            gridItemShowDiscountPrice3: themeData.gridItemShowDiscountPrice3,
            gridItemWidth3: themeData.gridItemWidth3
        })
    }

    handleChange(event) {
        let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        this.state[event.target.name] = value;
        if (event.target.name == 'gridItemWidth') {
            this.state['sliderSlidesToShow'] = value > 100 ? 1 : Math.round(100 / value);
        }
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

    setNum(data, num) {
        this.state[data] = num;
        this.props.onGiveValue(this.state);
    }

    setColor(data, color) {
        this.state[data] = color;
        this.props.onGiveValue(this.state);
    }

    render() {
        let gridItemMarginNumb = 30;
        let gridItemBorderRadiusNumb = 15;
        let gridItemBackgroundTransparencyNumb = 100;
        return (
            <div className="editor_box">
                <div className="editor_box_title">...</div>
                <div className="scroll_wrapper">
                    <span className="heading">Grid Item</span>
                    <form name="GridItemForm" className="options_form">
                        {(() => {
                            if (this.props.view == 1 || this.props.view == 3 || this.props.view == 5) {
                                return (
                                    <div className="option_line">
                                        <label>Item Width</label>
                                        <div className="width_option_block option_block small">
                                            <input type="text" onChange={this.handleChange} value={this.state.gridItemWidth} name="gridItemWidth"/>
                                            <select className="" onChange={this.handleChange} value={this.state.gridItemDimension} name="gridItemDimension">
                                                <option value="px">px</option>
                                                <option value="%">%</option>
                                            </select>
                                        </div>
                                    </div>
                                )
                            } else if (this.props.view == 2) {
                                return (
                                    <div className="option_line">
                                        <label>Item Width</label>
                                        <div className="fixed_value percent option_block small_textbox">
                                            <input type="text" onChange={this.handleChange} value={this.state.gridItemWidth} name="gridItemWidth"/>
                                            <input type="hidden" className="hidden" value="%" name="gridItemDimension"/>
                                        </div>
                                    </div>
                                )
                            } else if (this.props.view == 4 || this.props.view == 6) {
                                return (
                                    <div className="option_line">
                                        <label>Image Width</label>
                                        <div className="fixed_value percent option_block small_textbox">
                                            <input type="text" onChange={this.handleChange} value={this.state.gridItemWidth} name="gridItemWidth"/>
                                            <input type="hidden" className="hidden" value="%" name="gridItemDimension"/>
                                        </div>
                                    </div>
                                )
                            } else {
                                return (
                                    <div className="option_line">
                                        <label>Item Width</label>
                                        <div className="fixed_value percent option_block small_textbox">
                                            <input type="text" onChange={this.handleChange} value="100" name="gridItemWidth" disabled="disabled"/>
                                            <input type="hidden" className="hidden" value="%" name="gridItemDimension"/>
                                        </div>
                                    </div>
                                )
                            }
                        })()}
                        {(() => {
                            if (this.props.view == 1 || this.props.view == 2 || this.props.view == 3) {
                                return (
                                    /*No Auto Height Option*/
                                    <div className="option_line">
                                        <label>Fixed Height</label>
                                        <div className="fixed_value pixel option_block small_textbox">
                                            <input type="text" onChange={this.handleChange} value={this.state.gridItemHeight} name="gridItemHeight"/>
                                            <input type="hidden" className="hidden" value="true" name="gridItemFixedHeight" onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                )
                            }
                        })()}
                        {(() => {
                            if (this.props.view == 4) {
                                return (  <div className="option_line">
                                        <label className="hover_option_label">Background Color</label>
                                        <div className="hover_option_block">
                                            <div className="default_option">
                                                <span>Left Image</span>
                                                <div className="option_block colorpicker color_option ">
                                                    <ColorComponent setColor={this.setColor.bind(this, 'gridItemBackgroundColor')} onChange={this.handleChange} color={this.state.gridItemBackgroundColor}/>
                                                </div>
                                            </div>
                                            <div className="hover_option">
                                                <span>Right Image</span>
                                                <div className="option_block colorpicker color_option hover_option">
                                                    <ColorComponent setColor={this.setColor.bind(this, 'gridItemBackgroundColorHover')} onChange={this.handleChange} color={this.state.gridItemBackgroundColorHover}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            } else {
                                return (
                                    <div className="option_line">
                                        <label className="hover_option_label">Background Color</label>
                                        <div className="hover_option_block">
                                            <div className="default_option">
                                                <span>Default Color</span>
                                                <div className="option_block colorpicker color_option ">
                                                    <ColorComponent setColor={this.setColor.bind(this, 'gridItemBackgroundColor')} onChange={this.handleChange} color={this.state.gridItemBackgroundColor}/>
                                                </div>
                                            </div>
                                            <div className="hover_option">
                                                <span>Hover Color</span>
                                                <div className="option_block colorpicker color_option hover_option">
                                                    <ColorComponent setColor={this.setColor.bind(this, 'gridItemBackgroundColorHover')} onChange={this.handleChange} color={this.state.gridItemBackgroundColorHover}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })()}
                        <div className="option_line prc">
                            <label>Background Transparency</label>
                            <NumberPicker setNum={this.setNum.bind(this, 'gridItemBackgroundTransparency')} value={this.state.gridItemBackgroundTransparency} numb={this.state.gridItemBackgroundTransparency} max={gridItemBackgroundTransparencyNumb}/>
                        </div>
                        {(() => {
                            if (this.props.view != 4) {
                                return (
                                    <div className="option_line">
                                        <label>Item Border Roundness</label>
                                        <NumberPicker setNum={this.setNum.bind(this, 'gridItemBorderRadius')} onChange={this.handleChange} value={this.state.gridItemBorderRadius} name="gridItemMargin" numb={this.state.gridItemBorderRadius} max={gridItemBorderRadiusNumb}/>
                                        <div className={"free_message"}>
                                            <span>These options are available only on pro version</span>
                                            <a href={"http://showcaster.org"} target={"_blank"}>Go Pro</a>
                                            <i className={"close_icon"}>[x]</i>
                                        </div>
                                    </div>
                                )
                            }
                        })()}
                        <div className="option_line">
                            <label>Gap Space</label>
                            <NumberPicker  value={this.state.gridItemMargin} name="gridItemMargin"  max={gridItemMarginNumb}/>

                        </div>
                        <div className="option_line">
                            <label>Show Title</label>
                            <div className="checkbox_block">
                                <input type="checkbox" onChange={this.handleChange} className="css-checkbox" checked={this.state.gridItemShowTitle} name="gridItemShowTitle" id="gridItemShowTitle"/>
                                <label className="css-label" name="gridItemShowTitle" htmlFor="enableSearchId" ></label>
                            </div>
                            <div className={!this.state.gridItemShowTitle ? 'hide sub_option' : 'sub_option'}>
                                <label>Title</label>
                                <div className="text_options_block option_block">
                                    <div className="size_option_wrapper">
                                        <input type="text" className="size_option" value={this.state.gridItemTitle1} name="gridItemTitle1"/>
                                    </div>
                                    <div className="color_option_wrapper">
                                        <div className="colorpicker color_option">
                                            {/*<input name="layoutContainerBackground" className="color {onFineChange:'function(){alert(4)}'}" value={this.state.layoutContainerBackground} onChange={this.handleChange} />*/}
                                            <ColorComponent  color={this.state.gridItemTitle2}/>
                                        </div>
                                    </div>
                                    <select className="font_option" name="gridItemTitle3">
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
                        </div>
                        <div className="option_line">
                            <label>Show Description</label>
                            <div className="checkbox_block">
                                <input type="checkbox" className="css-checkbox" checked={this.state.gridItemShowDescription} name="gridItemShowDescription"/>
                                <label className="css-label" name="gridItemShowDescription"></label>
                            </div>
                            <div className={!this.state.gridItemShowDescription ? 'hide sub_option' : 'sub_option'}>
                                <label>Description</label>
                                <div className="text_options_block option_block">
                                    <div className="size_option_wrapper">
                                        <input type="text" className="size_option"  value={this.state.gridItemDescription1} name="gridItemDescription1"/>
                                    </div>
                                    <div className="color_option_wrapper">
                                        <div className="colorpicker color_option">
                                            <ColorComponent onChange={this.handleChange} color={this.state.gridItemDescription2}/>
                                        </div>
                                    </div>
                                    <select className="font_option"  value={this.state.gridItemDescription3} name="gridItemDescription3">
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
                        </div>
                        <div className="option_line">
                            <label>Show Price</label>
                            <div className="checkbox_block">
                                <input type="checkbox" className="css-checkbox" onChange={this.handleChange} checked={this.state.gridItemShowPrice} value={this.state.gridItemShowPrice} name="gridItemShowPrice"/>
                                <label className="css-label" name="gridItemShowPrice"></label>
                            </div>
                            <div className={!this.state.gridItemShowPrice ? 'hide sub_option' : 'sub_option'}>
                                <label>Price</label>
                                <div className="text_options_block option_block">
                                    <div className="size_option_wrapper">
                                        <input type="text" className="size_option"  value={this.state.gridItemShowPrice1} name="gridItemShowPrice1"/>
                                    </div>
                                    <div className="color_option_wrapper">
                                        <div className="colorpicker color_option">
                                            <ColorComponent color={this.state.gridItemShowPrice2}/>
                                        </div>
                                    </div>
                                    <select className="font_option"  value={this.state.gridItemShowPrice3} name="gridItemShowPrice3">
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
                        </div>
                        <div className="option_line">
                            <label>Show Discount Price</label>
                            <div className="checkbox_block">
                                <input type="checkbox" className="css-checkbox" onChange={this.handleChange} checked={this.state.gridItemShowDiscountPrice} value={this.state.gridItemShowDiscountPrice} name="gridItemShowDiscountPrice"/>
                                <label className="css-label" name="gridItemShowDiscountPrice" ></label>
                            </div>
                            <div className={!this.state.gridItemShowDiscountPrice ? 'hide sub_option' : 'sub_option'}>
                                <label>Discount Price</label>
                                <div className="text_options_block option_block">
                                    <div className="size_option_wrapper">
                                        <input type="text" className="size_option" value={this.state.gridItemShowDiscountPrice1} name="gridItemShowDiscountPrice1"/>
                                    </div>
                                    <div className="color_option_wrapper">
                                        <div className="colorpicker color_option">
                                            <ColorComponent color={this.state.gridItemShowDiscountPrice2}/>
                                        </div>
                                    </div>
                                    <select className="font_option" value={this.state.gridItemShowDiscountPrice3} name="gridItemShowDiscountPrice3">
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
                        </div>
                        <div className="button_wrapper option_line">
                            <input type="button" value="Save" onClick={this._handleSubmit} className="updateThemesData" name="option1Save"/>
                        </div>
                    </form>
                </div>
            </div>

        )
    }
}
export default GridItem;