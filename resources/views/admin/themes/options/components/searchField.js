import React, { Component } from 'react';
import ColorComponent from '../../ColorComponent';
import NumberPicker from '../../NumberPicker';
class SearchField extends Component {
    constructor(props) {
        super(props);
        let themeData = props.themeData;
        this.handleChange = this.handleChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this.state = {
            searchFieldPosition:  themeData.searchFieldPosition,
            searchFieldPlaceholderText:  themeData.searchFieldPlaceholderText,
            searchFieldTextSize:  themeData.searchFieldTextSize,
            searchFieldTextColor:  themeData.searchFieldTextColor,
            searchFieldTextFontStyle:  themeData.searchFieldTextFontStyle,
            searchFieldBackground:  themeData.searchFieldBackground,
            searchFieldButtonIconColor:  themeData.searchFieldButtonIconColor,
            searchFieldButtonBackground:  themeData.searchFieldButtonBackground,
            searchFieldPadding:  themeData.searchFieldPadding,
            searchFieldBorderColor:  themeData.searchFieldBorderColor,
            searchFieldBorderSize:  themeData.searchFieldBorderSize,
            searchFieldBorderRadius:  themeData.searchFieldBorderRadius,
            searchFieldButtonBackgroundHover: themeData.searchFieldButtonBackgroundHover
        }
    }

    componentWillReceiveProps(data) {
        let themeData = data.themeData;
        this.setState({
            searchFieldPosition:  themeData.searchFieldPosition,
            searchFieldPlaceholderText:  themeData.searchFieldPlaceholderText,
            searchFieldTextSize:  themeData.searchFieldTextSize,
            searchFieldTextColor:  themeData.searchFieldTextColor,
            searchFieldTextFontStyle:  themeData.searchFieldTextFontStyle,
            searchFieldBackground:  themeData.searchFieldBackground,
            searchFieldButtonIconColor:  themeData.searchFieldButtonIconColor,
            searchFieldButtonBackground:  themeData.searchFieldButtonBackground,
            searchFieldPadding:  themeData.searchFieldPadding,
            searchFieldBorderColor:  themeData.searchFieldBorderColor,
            searchFieldBorderSize:  themeData.searchFieldBorderSize,
            searchFieldBorderRadius:  themeData.searchFieldBorderRadius,
            searchFieldButtonBackgroundHover: themeData.searchFieldButtonBackgroundHover
        });
    }

    handleChange(event) {
        this.state[event.target.name] = event.target.value;
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
        let searchFieldPaddingNumb = 15;
        let searchFieldBorderRadiusNumb = 10;

        return(
            <div  className="editor_box">
                <div className="editor_box_title">...</div>
                <span className="heading">Search Field</span>
                    <form name="searchFieldForm" className="options_form">
                        <div  className="search_position_wrapper radio_icons_wrapper option_line">
                            <label>Search Position</label>
                            <div className="search_position_block radio_icons_block">
                                <div><input type="radio" checked = {this.state.searchFieldPosition == 'left'} onChange={this.handleChange}  value="left" name="searchFieldPosition" /><span className="radio_block position1"></span></div>
                                <div><input type="radio" checked = {this.state.searchFieldPosition == 'top'} onChange={this.handleChange}  value="top" name="searchFieldPosition" /><span className="radio_block position2"></span></div>
                                <div><input type="radio" checked = {this.state.searchFieldPosition == 'right'} onChange={this.handleChange}   value="right" name="searchFieldPosition" /><span className="radio_block position3"></span></div>
                            </div>
                        </div>
                        <div className="option_line">
                            <label>Placeholder Text</label>
                            <input type="text" value={this.state.searchFieldPlaceholderText}  name="searchFieldPlaceholderText" onChange={this.handleChange}  />
                        </div>
                        <div className="option_line">
                            <label>Text Style</label>
                            <div className="text_options_block option_block">
                                <div className="size_option_wrapper">
                                    <input type="text" className="size_option" onChange={this.handleChange} value={this.state.searchFieldTextSize} name="searchFieldTextSize" /></div>
                                <div className="color_option_wrapper">
                                    <div className="colorpicker color_option">
                                        <ColorComponent setColor={this.setColor.bind(this, 'searchFieldTextColor')} onChange={this.handleChange} color={this.state.searchFieldTextColor} />
                                    </div>
                                </div>
                                <select className="font_option" onChange={this.handleChange} value={this.state.searchFieldTextFontStyle}  name="searchFieldTextFontStyle">
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
                            <label>Field Background</label>
                            <div className="option_block colorpicker color_option">
                                <ColorComponent color={this.state.searchFieldBackground} />
                            </div>
                            <div className={"free_message"}>
                                <span>These options are available only on pro version</span>
                                <a href={"http://showcaster.org"} target={"_blank"}>Go Pro</a>
                                <i className={"close_icon"}>[x]</i>
                            </div>
                        </div>
                        <div className="option_line">
                            <label>Button Icon Color</label>
                            <div className="option_block colorpicker color_option">
                                <ColorComponent color={this.state.searchFieldButtonIconColor} />
                            </div>
                        </div>
                        <div className="option_line">
                            <label className="hover_option_label">Background Color</label>
                            <div className="hover_option_block">
                                <div className="default_option">
                                    <span>Default Color</span>
                                    <div className="option_block colorpicker color_option ">
                                        <ColorComponent color={this.state.searchFieldButtonBackground} />
                                    </div>
                                </div>
                                <div className="hover_option">
                                    <span>Hover Color</span>
                                    <div className="option_block colorpicker color_option hover_option">
                                        <ColorComponent color={this.state.searchFieldButtonBackgroundHover} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="option_line">
                            <label>Padding</label>
                            <NumberPicker value={this.state.searchFieldPadding} name="searchFieldPadding" numb={this.state.searchFieldPadding}  max={searchFieldPaddingNumb}/>
                        </div>

                        <div className="option_line">
                            <label>Corner Roundness</label>
                            <NumberPicker value={this.state.searchFieldBorderRadius} name="searchFieldBorderRadius" numb={this.state.searchFieldBorderRadius}  max={searchFieldBorderRadiusNumb}/>
                        </div>

                        <div className="button_wrapper option_line">
                            <input type="button" value="Save" onClick={this._handleSubmit} className="updateThemesData" name="option1Save" />
                        </div>
                    </form>
            </div>
        )
    }
}
export default SearchField;