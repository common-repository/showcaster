import React, { Component } from 'react';
import ColorComponent from '../../ColorComponent';
import NumberPicker from '../../NumberPicker';

class OrderingButtons extends Component {
    constructor(props) {
        super(props);
        let themeData = props.themeData;
        this.handleChange = this.handleChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this.state = {
            orderingButtonsPositionBtn: themeData.orderingButtonsPositionBtn,
            orderingButtonsTextSize: themeData.orderingButtonsTextSize,
            orderingButtonsTextColor: themeData.orderingButtonsTextColor,
            orderingButtonsFontStyle: themeData.orderingButtonsFontStyle,
            orderingButtonsPadding: themeData.orderingButtonsPadding,
            orderingButtonsGapSpace: themeData.orderingButtonsGapSpace,
            orderingButtonsBackgroundColor: themeData.orderingButtonsBackgroundColor,
            orderingButtonsBackgroundColorHover: themeData.orderingButtonsBackgroundColorHover,
            orderingButtonsStyleButtonOrLink: themeData.orderingButtonsStyleButtonOrLink,
            orderingButtonsBorderColor: themeData.orderingButtonsBorderColor,
            orderingButtonsBorderThickness: themeData.orderingButtonsBorderThickness,
            orderingButtonsBorderRadius: themeData.orderingButtonsBorderRadius,
            orderingButtonsBorderColorHover: themeData.orderingButtonsBorderColorHover
        }
    }

    componentWillReceiveProps(data) {
        let themeData = data.themeData;
        this.setState({
            orderingButtonsPositionBtn: themeData.orderingButtonsPositionBtn,
            orderingButtonsTextSize: themeData.orderingButtonsTextSize,
            orderingButtonsTextColor: themeData.orderingButtonsTextColor,
            orderingButtonsFontStyle: themeData.orderingButtonsFontStyle,
            orderingButtonsPadding: themeData.orderingButtonsPadding,
            orderingButtonsGapSpace: themeData.orderingButtonsGapSpace,
            orderingButtonsBackgroundColor: themeData.orderingButtonsBackgroundColor,
            orderingButtonsBackgroundColorHover: themeData.orderingButtonsBackgroundColorHover,
            orderingButtonsStyleButtonOrLink: themeData.orderingButtonsStyleButtonOrLink,
            orderingButtonsBorderColor: themeData.orderingButtonsBorderColor,
            orderingButtonsBorderThickness: themeData.orderingButtonsBorderThickness,
            orderingButtonsBorderRadius: themeData.orderingButtonsBorderRadius,
            orderingButtonsBorderColorHover: themeData.orderingButtonsBorderColorHover
        });
    }

    handleChange(event) {
        let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        this.state[event.target.name] = value;
        this.props.onGiveValue(this.state);
    }

    setColor(data , color) {
        this.state[data] = color;
        this.props.onGiveValue(this.state);
    }

    setNum(data , num) {
        this.state[data] = num;
        this.props.onGiveValue(this.state);
    }

    _handleSubmit(e) {
        this.props.onSubmitData();
    }

    render() {
        let orderingButtonsPaddingNumb  = 25;
        let orderingButtonsGapSpaceNumb  = 25;
        let orderingButtonsBorderThicknessNumb = 10;
        let orderingButtonsBorderRadiusNumb = 10;

        return(
            <div className="editor_box">
                <div className="editor_box_title">...</div>
                <span className="heading">Ordering Buttons</span>
                <form name="orderingButtonForm" className="options_form">
                    <div  className="ordering_buttons_position_wrapper radio_icons_wrapper option_line">
                        <label>Buttons Position</label>
                        <div className="ordering_buttons_position_block radio_icons_block">
                            <div><input type="radio" checked = {this.state.orderingButtonsPositionBtn == 'left'} onChange={this.handleChange}  value="left" name="orderingButtonsPositionBtn" /><span className="radio_block position1"></span></div>
                            <div><input type="radio" checked = {this.state.orderingButtonsPositionBtn == 'top'} onChange={this.handleChange}  value="top" name="orderingButtonsPositionBtn" /><span className="radio_block position2"></span></div>
                            <div><input type="radio" checked = {this.state.orderingButtonsPositionBtn == 'right'} onChange={this.handleChange}   value="right" name="orderingButtonsPositionBtn" /><span className="radio_block position3"></span></div>
                        </div>
                    </div>

                    <div className="option_line">
                        <label>Text Style</label>
                        <div className="text_options_block option_block">
                            <div className="size_option_wrapper">
                                <input type="text" className="size_option" onChange={this.handleChange} value={this.state.orderingButtonsTextSize} name="orderingButtonsTextSize" />
                            </div>
                            <div className="color_option_wrapper">
                                <div className="colorpicker color_option">
                                     <ColorComponent setColor={this.setColor.bind(this, 'orderingButtonsTextColor')} onChange={this.handleChange} color={this.state.orderingButtonsTextColor} />
                                </div>
                            </div>
                            <select className="font_option" onChange={this.handleChange} value={this.state.orderingButtonsFontStyle}  name="orderingButtonsFontStyle">
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
                        <label>Padding</label>
                        <NumberPicker setNum={this.setNum.bind(this, 'orderingButtonsPadding')}  onChange={this.handleChange} value={this.state.orderingButtonsPadding} name="orderingButtonsPadding" numb={this.state.orderingButtonsPadding} max={orderingButtonsPaddingNumb} />
                    </div>

                    <div className="option_line">
                        <label>Gap Space</label>
                        <NumberPicker  value={this.state.orderingButtonsGapSpace} name="orderingButtonsMargin" numb={this.state.orderingButtonsGapSpace} max={orderingButtonsGapSpaceNumb} />
                        <div className={"free_message"}>
                        <span>These options are available only on pro version</span>
                        <a href={"http://showcaster.org"} target={"_blank"}>Go Pro</a>
                        <i className={"close_icon"}>[x]</i>
                    </div>
                    </div>

                    <div className="option_line">
                        <label className="hover_option_label">Background Color</label>
                        <div className="hover_option_block">
                            <div className="default_option">
                                <span>Default Color</span>
                                <div className="option_block colorpicker color_option ">
                                    <ColorComponent  color={this.state.orderingButtonsBackgroundColor} />
                                </div>
                            </div>
                            <div className="hover_option">
                                <span>Hover Color</span>
                                <div className="option_block colorpicker color_option hover_option">
                                    <ColorComponent color={this.state.orderingButtonsBackgroundColorHover} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="option_line">
                        <label>Style</label>
                        <select className="font_option"  value={this.state.orderingButtonsStyleButtonOrLink}  name="orderingButtonsStyleButtonOrLink">
                            <option value="button">Button</option>
                            <option value="link">Link</option>
                        </select>
                    </div>

                    <div className="option_line">
                        <label className="hover_option_label">Border Color</label>
                        <div className="hover_option_block">
                            <div className="default_option">
                                <span>Default Color</span>
                                <div className="option_block colorpicker color_option ">
                                    <ColorComponent  color={this.state.orderingButtonsBorderColor} />
                                </div>
                            </div>
                            <div className="hover_option">
                                <span>Hover Color</span>
                                <div className="option_block colorpicker color_option hover_option">
                                    <ColorComponent color={this.state.orderingButtonsBorderColorHover} />
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="option_line">
                        <label>Border Thickness</label>
                        <NumberPicker  value={this.state.orderingButtonsBorderThickness} name="orderingButtonsBorderThickness" numb={this.state.orderingButtonsBorderThickness} max={orderingButtonsBorderThicknessNumb} />
                    </div>

                    <div className={this.state.orderingButtonsStyleButtonOrLink=="link" ? 'hide sub_option option_line' : 'sub_option option_line'}>
                        <label>Corner Roundness</label>
                        <NumberPicker  value={this.state.orderingButtonsBorderRadius} name="orderingButtonsBorderRadius" numb={this.state.orderingButtonsBorderRadius} max={orderingButtonsBorderRadiusNumb} />
                    </div>

                    <div className="button_wrapper option_line">
                        <input type="button" value="Save" onClick={this._handleSubmit} className="updateThemesData" name="option1Save" />
                    </div>
                </form>
            </div>
        )
    }
}
export default OrderingButtons;