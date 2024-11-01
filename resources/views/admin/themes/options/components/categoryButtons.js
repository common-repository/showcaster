import React, {Component} from "react";
import ColorComponent from "../../ColorComponent";
import NumberPicker from "../../NumberPicker";
class CategoryButtons extends Component {
    constructor(props) {
        super(props);
        let themeData = props.themeData;
        this.handleChange = this.handleChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this.state = {
            categoryButtonsPositionBtn: themeData.categoryButtonsPositionBtn,
            categoryButtonsTextSize: themeData.categoryButtonsTextSize,
            categoryButtonsText: themeData.categoryButtonsText,
            categoryButtonsTextFontStyle: themeData.categoryButtonsTextFontStyle,
            categoryButtonsPaddingSize: themeData.categoryButtonsPaddingSize,
            categoryButtonsGapSpaceSize: themeData.categoryButtonsGapSpaceSize,
            categoryButtonsBackgroundColor: themeData.categoryButtonsBackgroundColor,
            categoryButtonsBackgroundColorHover: themeData.categoryButtonsBackgroundColorHover,
            categoryButtonsStyleLinkOrButton: themeData.categoryButtonsStyleLinkOrButton,
            categoryButtonsBorderColor: themeData.categoryButtonsBorderColor,
            categoryButtonsBorderThickness: themeData.categoryButtonsBorderThickness,
            categoryButtonsBorderRadius: themeData.categoryButtonsBorderRadius,
            categoryButtonsBorderColorHover: themeData.categoryButtonsBorderColorHover
        }
    }

    componentWillReceiveProps(data) {
        let themeData = data.themeData;
        this.setState({
            categoryButtonsPositionBtn: themeData.categoryButtonsPositionBtn,
            categoryButtonsTextSize: themeData.categoryButtonsTextSize,
            categoryButtonsText: themeData.categoryButtonsText,
            categoryButtonsTextFontStyle: themeData.categoryButtonsTextFontStyle,
            categoryButtonsPaddingSize: themeData.categoryButtonsPaddingSize,
            categoryButtonsGapSpaceSize: themeData.categoryButtonsGapSpaceSize,
            categoryButtonsBackgroundColor: themeData.categoryButtonsBackgroundColor,
            categoryButtonsBackgroundColorHover: themeData.categoryButtonsBackgroundColorHover,
            categoryButtonsStyleLinkOrButton: themeData.categoryButtonsStyleLinkOrButton,
            categoryButtonsBorderColor: themeData.categoryButtonsBorderColor,
            categoryButtonsBorderThickness: themeData.categoryButtonsBorderThickness,
            categoryButtonsBorderRadius: themeData.categoryButtonsBorderRadius,
            categoryButtonsBorderColorHover: themeData.categoryButtonsBorderColorHover
        });
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

    render() {
        let categoryButtonsPaddingNumb = 25;
        let categoryButtonsGapSpaceNumb = 25;
        let categoryButtonsBorderThicknessNumb = 10;
        let categoryButtonsBorderRadiusNumb = 10;
        return (
            <div className="editor_box">
                <div className="editor_box_title">...</div>
                <span className="heading">Categories Buttons</span>
                <form name="CategoryButtonsForm" className="options_form">
                    <div className="category_buttons_position_wrapper radio_icons_wrapper option_line">
                        <label>Buttons Position</label>
                        <div className="category_buttons_position_wrapper radio_icons_block">
                            <div>
                                <input type="radio" checked={this.state.categoryButtonsPositionBtn == 'left'} onChange={this.handleChange} value="left" name="categoryButtonsPositionBtn"/><span className="radio_block position1"></span>
                            </div>
                            <div>
                                <input type="radio" checked={this.state.categoryButtonsPositionBtn == 'top'} onChange={this.handleChange} value="top" name="categoryButtonsPositionBtn"/><span className="radio_block position2"></span>
                            </div>
                            <div>
                                <input type="radio" checked={this.state.categoryButtonsPositionBtn == 'right'} onChange={this.handleChange} value="right" name="categoryButtonsPositionBtn"/><span className="radio_block position3"></span>
                            </div>
                        </div>
                    </div>
                    <div className="option_line">
                        <label>Text Style</label>
                        <div className="text_options_block option_block">
                            <div className="size_option_wrapper">
                                <input type="text" className="size_option" onChange={this.handleChange} value={this.state.categoryButtonsTextSize} name="categoryButtonsTextSize"/>
                            </div>
                            <div className="color_option_wrapper">
                                <div className="colorpicker color_option">
                                    <ColorComponent setColor={this.setColor.bind(this, 'categoryButtonsText')} onChange={this.handleChange} color={this.state.categoryButtonsText}/>
                                </div>
                            </div>
                            <select className="font_option" onChange={this.handleChange} value={this.state.categoryButtonsTextFontStyle} name="categoryButtonsTextFontStyle">
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
                        <NumberPicker setNum={this.setNum.bind(this, 'categoryButtonsPaddingSize')} onChange={this.handleChange} value={this.state.categoryButtonsPaddingSize} name="categoryButtonsPaddingSize" numb={this.state.categoryButtonsPaddingSize} max={categoryButtonsPaddingNumb}/>
                    </div>
                    <div className="option_line">
                        <label>Gap Space</label>
                        <NumberPicker value={this.state.categoryButtonsGapSpaceSize} name="categoryButtonsGapSpaceSize" numb={this.state.categoryButtonsGapSpaceSize} max={categoryButtonsGapSpaceNumb}/>
                        <div className={"free_message"}>
                            <span>These options are available only on pro version</span>
                            <a href={"http://showcaster.org"} target={"_blank"}>Go Pro</a>
                            <i className={"close_icon"}>[x]</i>
                        </div>
                    </div>
                    <div className="option_line">
                        <label className="hover_option_label">Backgound Color</label>
                        <div className="hover_option_block">
                            <div className="default_option">
                                <span>Default Color</span>
                                <div className="option_block colorpicker color_option ">
                                    <ColorComponent  color={this.state.categoryButtonsBackgroundColor}/>
                                </div>
                            </div>
                            <div className="hover_option">
                                <span>Hover Color</span>
                                <div className="option_block colorpicker color_option hover_option">
                                    <ColorComponent  color={this.state.categoryButtonsBackgroundColorHover}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="option_line">
                        <label>Style</label>
                        <select className="font_option" value={this.state.categoryButtonsStyleLinkOrButton} name="categoryButtonsStyleLinkOrButton">
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
                                    <ColorComponent color={this.state.categoryButtonsBorderColor}/>
                                </div>
                            </div>
                            <div className="hover_option">
                                <span>Hover Color</span>
                                <div className="option_block colorpicker color_option hover_option">
                                    <ColorComponent color={this.state.categoryButtonsBorderColorHover}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="option_line">
                        <label>Border Thickness</label>
                        <NumberPicker value={this.state.categoryButtonsBorderThickness} name="categoryButtonsBorderThickness" numb={this.state.categoryButtonsBorderThickness} max={categoryButtonsBorderThicknessNumb}/>
                    </div>
                    <div className={this.state.categoryButtonsStyleLinkOrButton == "link" ? 'hide sub_option option_line' : 'sub_option option_line'}>
                        <label>Corner Roundness</label>
                        <NumberPicker setNum={this.setNum.bind(this, 'categoryButtonsBorderRadius')} onChange={this.handleChange} value={this.state.categoryButtonsBorderRadius} name="categoryButtonsBorderRadius" numb={this.state.categoryButtonsBorderRadius} max={categoryButtonsBorderRadiusNumb}/>
                    </div>
                    <div className="button_wrapper option_line">
                        <input type="button" value="Save" onClick={this._handleSubmit} className="updateThemesData" name="option1Save"/>
                    </div>
                </form>

            </div>
        )
    }
}
export default CategoryButtons;