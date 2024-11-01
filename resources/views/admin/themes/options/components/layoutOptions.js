import React, { Component } from 'react';
import ColorComponent from '../../ColorComponent';
class LayoutOptions extends Component {
    constructor(props) {
        super(props);
        let themeData = props.themeData;
        this.handleChange = this.handleChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this.state = {
            layoutWidth: themeData.layoutWidth,
            layoutAlign: themeData.layoutAlign,
            layoutPerPage: themeData.layoutPerPage,
            layoutContainerBackground: themeData.layoutContainerBackground,
            view: themeData.view
        }
    }

    componentWillReceiveProps(data) {
        let themeData = data.themeData;
        this.setState( {
            layoutWidth: themeData.layoutWidth,
            layoutAlign: themeData.layoutAlign,
            layoutPerPage: themeData.layoutPerPage,
            layoutContainerBackground: themeData.layoutContainerBackground,
            view: themeData.view
        });
    }

    handleChange(event) {
        this.state[event.target.name] = event.target.value;
        this.props.onGiveValue(this.state);
    }


    componentDidMount() {

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
        return(
            <div className="editor_box">
                <div className="editor_box_title">...</div>
                <div className="scroll_wrapper">
                    <span className="heading">Layout Options</span>
                    <form name="layoutOptionsForm" className="options_form">
                        <div className="option_line">
                            <label>Container Width</label>
                            <div className="fixed_value percent option_block small_textbox"><input type="text" onChange={this.handleChange} value={this.state.layoutWidth} name="layoutWidth" /></div>
                        </div>
                        <div className="option_line">
                            <label>Container Align</label>
                            <select name="layoutAlign" value={this.state.layoutAlign} onChange={this.handleChange}>
                                <option value="left">Left</option>
                                <option value="right">Right</option>
                                <option value="center">Center</option>
                            </select>
                        </div>
                        <div className="option_line">
                            <label>Container Background</label>
                            <div className="option_block colorpicker">
                                <ColorComponent  setColor={this.setColor.bind(this, 'layoutContainerBackground')} onChange={this.handleChange} color={this.state.layoutContainerBackground} />
                            </div>
                        </div>
                        <div className="layout_selector_wrapper option_line radio_icons_wrapper">
                            <label>Layouts</label>
                            <div className="layout_selector_block radio_icons_block">
                                <div><input type="radio" checked = {this.state.view == 1} onChange={this.handleChange} value="1" name="view" /><span className="radio_block layout1"></span></div>
                                <div><input type="radio" checked = {this.state.view == 2} onChange={this.handleChange} value="2" name="view" /><span className="radio_block layout2"></span></div>
                                <div><input type="radio" checked = {this.state.view == 3} onChange={this.handleChange} value="3" name="view" /><span className="radio_block layout3"></span></div>
                                <div><input type="radio" checked = {this.state.view == 4} onChange={this.handleChange} value="4" name="view" /><span className="radio_block layout4"></span></div>
                                <div><input type="radio" checked = {this.state.view == 5} onChange={this.handleChange} value="5" name="view" /><span className="radio_block layout5"></span></div>
                                <div><input type="radio" checked = {this.state.view == 6} onChange={this.handleChange} value="6" name="view" /><span className="radio_block layout6"></span></div>
                            </div>
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
export default LayoutOptions;