import React, { Component } from 'react';
import ColorComponent from '../../ColorComponent';
import NumberPicker from '../../NumberPicker';

class LoadMore extends Component {
    constructor(props) {
        super(props);
        let themeData = props.themeData;
        this.handleChange = this.handleChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this.state = {
            pluginUrl: themeData.pluginUrl,
            loadMoreType: themeData.loadMoreType,
            loadMoreLoadingIcons: themeData.loadMoreLoadingIcons,
            loadMoreDefaultImagesCount: themeData.loadMoreDefaultImagesCount,
            loadMorefaultCount: themeData.loadMorefaultCount,
            loadMoreButtonText: themeData.loadMoreButtonText,
            loadMoreButtonTextSize: themeData.loadMoreButtonTextSize,
            loadMoreButtonTextColor: themeData.loadMoreButtonTextColor,
            loadMoreButtonFontStyle: themeData.loadMoreButtonFontStyle,
            loadMoreButtonPadding: themeData.loadMoreButtonPadding,
            loadMoreButtonBackgroundColor: themeData.loadMoreButtonBackgroundColor,
            loadMoreButtonBorderColorHover: themeData.loadMoreButtonBorderColorHover,
            loadMoreButtonBorderColor: themeData.loadMoreButtonBorderColor,
            loadMoreButtonBorderColorHover: themeData.loadMoreButtonBorderColorHover,
            loadMoreBorderRadius: themeData.loadMoreBorderRadius,
            loadMoreBorderThickness: themeData.loadMoreBorderThickness,
            loadMoreButtonBackgroundColorHover: themeData.loadMoreButtonBackgroundColorHover,
            enableLoadMore: false

        };
        this.hide = 'hide';
    }
    componentWillReceiveProps(data) {
        let themeData = data.themeData;
        this.setState({
            pluginUrl: themeData.pluginUrl,
            loadMoreType: themeData.loadMoreType,
            loadMoreLoadingIcons: themeData.loadMoreLoadingIcons,
            loadMoreDefaultImagesCount: themeData.loadMoreDefaultImagesCount,
            loadMorefaultCount: themeData.loadMorefaultCount,
            loadMoreButtonText: themeData.loadMoreButtonText,
            loadMoreButtonTextSize: themeData.loadMoreButtonTextSize,
            loadMoreButtonTextColor: themeData.loadMoreButtonTextColor,
            loadMoreButtonFontStyle: themeData.loadMoreButtonFontStyle,
            loadMoreButtonPadding: themeData.loadMoreButtonPadding,
            loadMoreButtonBackgroundColor: themeData.loadMoreButtonBackgroundColor,
            loadMoreButtonBorderColorHover: themeData.loadMoreButtonBorderColorHover,
            loadMoreButtonBorderColor: themeData.loadMoreButtonBorderColor,
            loadMoreButtonBackgroundColorHover: themeData.loadMoreButtonBackgroundColorHover,
            loadMoreBorderRadius: themeData.loadMoreBorderRadius,
            loadMoreBorderThickness: themeData.loadMoreBorderThickness,
            enableLoadMore: false
        });
    }

    handleChangeLoadMore(event) {
        this.state.enableLoadMore = true;
        this.state[event.target.name] = event.target.value;
        this.props.onGiveValue(this.state);
    }

    handleChange(event) {
        this.state[event.target.name] = event.target.value;
        if(this.state.loadMoreType == 'button') {
            this.hide = 'hide';
        } else {
            this.hide = '';
        }
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
       let loadMorePaddingNumb  = 25;
       let loadMoreBorderThicknessNumb = 10;
       let loadMoreBorderRadiusNumb = 10;

        return(
            <div  className="editor_box">
                <div className="editor_box_title">...</div>
                <div className="scroll_wrapper">
                    <span className="heading">Load More</span>
                    <form name="loadMoreForm" className="options_form">
                        <div className="option_line">
                            <label>Type</label>
                            <select name="loadMoreType" value={this.state.loadMoreType} onChange={this.handleChangeLoadMore.bind(this)}>
                                <option value="button">Button</option>
                                <option value="scroll">Scroll</option>
                            </select>
                        </div>
                        <div className="loading_icons_selector_wrapper radio_icons_wrapper option_line">
                            <label>Loading Icon</label>
                            <div className="loading_icon_selector_block radio_icons_block loading_icons">
                                <div><input type="radio" checked = {this.state.loadMoreLoadingIcons == 1} onChange={this.handleChange} value="1" name="loadMoreLoadingIcons" /><span className="radio_block loading1"><img src={this.state.pluginUrl + "/resources/assets/images/icons/loading1.gif"} /></span></div>
                                <div><input type="radio" checked = {this.state.loadMoreLoadingIcons == 2} onChange={this.handleChange} value="2" name="loadMoreLoadingIcons" /><span className="radio_block loading2"><img src={this.state.pluginUrl + "/resources/assets/images/icons/loading2.gif"} /></span></div>
                                <div><input type="radio" checked = {this.state.loadMoreLoadingIcons == 3} onChange={this.handleChange} value="3" name="loadMoreLoadingIcons" /><span className="radio_block loading3"><img src={this.state.pluginUrl + "/resources/assets/images/icons/loading3.gif"} /></span></div>
                                <div><input type="radio" checked = {this.state.loadMoreLoadingIcons == 4} onChange={this.handleChange} value="4" name="loadMoreLoadingIcons" /><span className="radio_block loading4"><img src={this.state.pluginUrl + "/resources/assets/images/icons/loading4.gif"} /></span></div>
                                <div><input type="radio" checked = {this.state.loadMoreLoadingIcons == 5} onChange={this.handleChange} value="5" name="loadMoreLoadingIcons" /><span className="radio_block loading5"><img src={this.state.pluginUrl + "/resources/assets/images/icons/loading5.gif"} /></span></div>
                                <div><input type="radio" checked = {this.state.loadMoreLoadingIcons == 6} onChange={this.handleChange} value="6" name="loadMoreLoadingIcons" /><span className="radio_block loading6"><img src={this.state.pluginUrl + "/resources/assets/images/icons/loading6.gif"} /></span></div>
                                <div className="clear"></div>
                            </div>
                        </div>
                        <div className="option_line">
                            <label>Default Images Count</label>
                            <div className="small_textbox option_block">
                                <input type="text" name="loadMoreDefaultImagesCount" />
                            </div>
                            <div className={"free_message"}>
                                <span>These options are available only on pro version</span>
                                <a href={"http://showcaster.org"} target={"_blank"}>Go Pro</a>
                                <i className={"close_icon"}>[x]</i>
                            </div>
                        </div>
                        <div className="option_line">
                            <label>Added Images Count</label>
                            <div className="small_textbox option_block">
                                <input type="text" name="loadMorefaultCount" />
                            </div>
                        </div>
                        <div  className={this.state.loadMoreType == 'scroll' ? 'hide option_line' : 'option_line'} >
                            <label>Button Text</label>
                            <input type="text" value={this.state.loadMoreButtonText}  name="loadMoreButtonText"  />
                        </div>
                        <div className={this.state.loadMoreType == 'scroll' ? 'hide option_line' : 'option_line'}>
                            <label>Button Text Style</label>
                            <div className="text_options_block option_block">
                                <div className="size_option_wrapper">
                                     <input type="text" className="size_option"  value={this.state.loadMoreButtonTextSize} name="loadMoreButtonTextSize" />
                                </div>
                                <div className="color_option_wrapper">
                                    <div className="colorpicker color_option">
                                         <ColorComponent color={this.state.loadMoreButtonTextColor} />
                                     </div>
                                </div>
                                <select className="font_option" value={this.state.loadMoreButtonFontStyle}  name="loadMoreButtonFontStyle">
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

                        <div className={this.state.loadMoreType == 'scroll' ? 'hide option_line' : 'option_line'}>
                            <label>Padding</label>
                            <NumberPicker  value={this.state.loadMoreButtonPadding} name="loadMoreButtonPadding" numb={this.state.loadMoreButtonPadding} max={loadMorePaddingNumb} />
                        </div>

                        <div className={this.state.loadMoreType == 'scroll' ? 'hide option_line' : 'option_line'}>
                            <label className="hover_option_label">Background Color</label>
                            <div className="hover_option_block">
                                <div className="default_option">
                                    <span>Default Color</span>
                                    <div className="option_block colorpicker color_option ">
                                        <ColorComponent  color={this.state.loadMoreButtonBackgroundColor} />
                                    </div>
                                </div>
                                <div className="hover_option">
                                    <span>Hover Color</span>
                                    <div className="option_block colorpicker color_option hover_option">
                                        <ColorComponent  color={this.state.loadMoreButtonBackgroundColorHover} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={this.state.loadMoreType == 'scroll' ? 'hide option_line' : 'option_line'}>
                            <label className="hover_option_label">Border Color</label>
                            <div className="hover_option_block">
                                <div className="default_option">
                                    <span>Default Color</span>
                                    <div className="option_block colorpicker color_option ">
                                        <ColorComponent  color={this.state.loadMoreButtonBorderColor} />
                                    </div>
                                </div>
                                <div className="hover_option">
                                    <span>Hover Color</span>
                                    <div className="option_block colorpicker color_option hover_option">
                                        <ColorComponent  color={this.state.loadMoreButtonBorderColorHover} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={this.state.loadMoreType == 'scroll' ? 'hide option_line' : 'option_line'}>
                            <label>Border Thickness</label>
                            <NumberPicker value={this.state.loadMoreBorderThickness} name="loadMoreBorderThickness" numb={this.state.loadMoreBorderThickness} max={loadMoreBorderThicknessNumb}/>
                        </div>
                        <div className={this.state.loadMoreBorderRadius=="link" || this.state.loadMoreType == 'scroll' ? 'hide sub_option option_line' : 'sub_option option_line'}>
                            <label>Corner Roundness</label>
                            <NumberPicker value={this.state.loadMoreBorderRadius} name="loadMoreBorderRadius" numb={this.state.loadMoreBorderRadius} max={loadMoreBorderRadiusNumb}/>
                        </div>
                        <div className="button_wrapper option_line">
                            <input type="button" value="Save" onClick={this._handleSubmit} className="updateThemesData" name="option1Save" />
                        </div>
                    </form>
                 </div>
            </div>
        )
    }
}
export default LoadMore;