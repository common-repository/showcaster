import React, { Component } from 'react';
import ColorComponent from '../../ColorComponent';

class SliderOptions extends Component {
    constructor(props) {
        super(props);
        let themeData = props.themeData;
        this.handleChange = this.handleChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this.state = {
            sliderEnableArrows: themeData.sliderEnableArrows.toString() == "true",
            sliderArrowsColor: themeData.sliderArrowsColor,
            sliderArrowsColorHover: themeData.sliderArrowsColorHover,
            sliderEnableDots: themeData.sliderEnableDots.toString() == "true",
            sliderDotsColor: themeData.sliderDotsColor,
            sliderDotsColorActive: themeData.sliderDotsColorActive,
            sliderSlidesToShow: themeData.sliderSlidesToShow,
            sliderSlidesToScroll: themeData.sliderSlidesToScroll,
            sliderScrollSpeed: themeData.sliderScrollSpeed,
            sliderAutoPlay: themeData.sliderAutoPlay,
            sliderSlidesToShowHidden : themeData.sliderSlidesToShowHidden
        }
    }

    componentWillReceiveProps(data) {
        let themeData = data.themeData;
        this.setState({
            sliderEnableArrows: themeData.sliderEnableArrows.toString() == "true",
            sliderArrowsColor: themeData.sliderArrowsColor,
            sliderArrowsColorHover: themeData.sliderArrowsColorHover,
            sliderEnableDots: themeData.sliderEnableDots.toString() == "true",
            sliderDotsColor: themeData.sliderDotsColor,
            sliderDotsColorActive: themeData.sliderDotsColorActive,
            /*sliderSlidesToShow: themeData.sliderSlidesToShow,*/
            sliderSlidesToScroll: themeData.sliderSlidesToScroll,
            sliderScrollSpeed: themeData.sliderScrollSpeed,
            sliderAutoPlay: themeData.sliderAutoPlay,
            sliderSlidesToShowHidden : themeData.sliderSlidesToShowHidden
        });
    }

    handleChange(event) {
        let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        this.state[event.target.name] = value;
        if (event.target.name == 'sliderSlidesToShow') {
            this.state['gridItemWidth'] = Math.round( 100 / value);
        }
        this.props.onGiveValue(this.state);
    }

    _handleSubmit(e) {
        this.props.onSubmitData();
    }

    stopLabelPropagation(e) {
        e.stopPropagation();
        let value = e.target.getAttribute('name');
        this.state[value]= !this.state[value];
        this.props.onGiveValue(this.state);
    }

    setColor(data , color) {
        this.state[data] = color;
        this.props.onGiveValue(this.state);
    }

    render() {
        return(
            <div className="editor_box">
                <div className="editor_box_title">...</div>
                <span className="heading">Slider Options</span>
                <form name="optionForm6" className="options_form">
                    <div className="option_line">
                        <label>Enable Arrows</label>
                        <div className="checkbox_block">
                            <input type="checkbox" className="css-checkbox" onChange={this.handleChange} checked={this.state.sliderEnableArrows} name="sliderEnableArrows"  />
                            <label className="css-label"  name="sliderEnableArrows" htmlFor="sliderEnableArrows" onClick={ this.stopLabelPropagation.bind(this) }></label>
                        </div>
                        <div className={ this.state.sliderEnableArrows ? 'sub_option' : 'hide sub_option'}>
                            <label>Arrows Color</label>
                            <div className="hover_option_block">
                                <div className="default_option">
                                    <span>Default Color</span>
                                    <div className="option_block colorpicker color_option ">
                                        <ColorComponent setColor={this.setColor.bind(this, 'sliderArrowsColor')} onChange={this.handleChange} color={this.state.sliderArrowsColor} />
                                    </div>
                                </div>

                                <div className="hover_option">
                                    <span>Hover Color</span>
                                    <div className="option_block colorpicker color_option hover_option">
                                        <ColorComponent setColor={this.setColor.bind(this, 'sliderArrowsColorHover')} onChange={this.handleChange} color={this.state.sliderArrowsColorHover} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="option_line">
                        <label>Enable Dots</label>
                        <div className="checkbox_block">
                            <input type="checkbox" className="css-checkbox" onChange={this.handleChange} checked={this.state.sliderEnableDots} name="sliderEnableDots"  />
                            <label className="css-label"  name="sliderEnableDots" htmlFor="sliderEnableDots" onClick={ this.stopLabelPropagation.bind(this) }></label>
                        </div>
                        <div className={!this.state.sliderEnableDots ? 'hide sub_option' : 'sub_option'}>
                            <label>Dots Color</label>
                            <div className="hover_option_block">
                                <div className="default_option">
                                    <span>Default Color</span>
                                    <div className="option_block colorpicker color_option ">
                                        <ColorComponent setColor={this.setColor.bind(this, 'sliderDotsColor')} onChange={this.handleChange} color={this.state.sliderDotsColor} />
                                    </div>
                                </div>
                                <div className="hover_option">
                                    <span>Active Color</span>
                                    <div className="option_block colorpicker color_option hover_option">
                                        <ColorComponent setColor={this.setColor.bind(this, 'sliderDotsColorActive')} onChange={this.handleChange} color={this.state.sliderDotsColorActive} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="option_line">
                        <label>Slides To Show</label>
                        <div className=" option_block small_textbox">
                            <input type="text" onChange={this.handleChange} value={this.state.sliderSlidesToShow} name="sliderSlidesToShow" />
                        </div>
                    </div>

                    <div className="option_line">
                        <label>Slides To Scroll</label>
                        <div className="option_block small_textbox">
                            <input type="text" onChange={this.handleChange} value={this.state.sliderSlidesToScroll} name="sliderSlidesToScroll" />
                        </div>
                        <div className={"free_message"}>
                            <span>These options are available only on pro version</span>
                            <a href={"http://showcaster.org"} target={"_blank"}>Go Pro</a>
                            <i className={"close_icon"}>[x]</i>
                        </div>
                    </div>
                    <div className="option_line">
                        <label>Scroll Speed</label>
                        <div className="option_block millisecond fixed_value small_textbox">
                            <input type="text" onChange={this.handleChange} value={this.state.sliderScrollSpeed} name="sliderScrollSpeed" />
                        </div>
                    </div>

                    <div className="option_line">
                        <label>Auto-Play</label>
                        <div className="checkbox_block">
                            <input type="checkbox" className="css-checkbox" onChange={this.handleChange} checked={this.state.sliderAutoPlay} name="sliderAutoPlay"  />
                            <label className="css-label"  name="sliderAutoPlay" htmlFor="sliderAutoPlay" onClick={ this.stopLabelPropagation.bind(this) } ></label>
                        </div>
                    </div>
                    <div className="button_wrapper option_line">
                        <input type="button" value="Save" onClick={this._handleSubmit} className="updateThemesData" name="option1Save" />
                    </div>
                </form>
            </div>
        )
    }
}
export default SliderOptions;