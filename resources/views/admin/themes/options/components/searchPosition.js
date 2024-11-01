import React, { Component } from 'react';

class SearchOptions extends Component {
    constructor(props) {
        super(props);
        let themeData = props.themeData;
        this.handleChange = this.handleChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this.state = {
            top: themeData.top,
            searchPosition: themeData.searchPosition
        }
    }

    componentWillReceiveProps(data) {
        let themeData = data.themeData;
        this.setState({
            top: themeData.top,
            searchPosition: themeData.searchPosition
        })
    }

    handleChange(event) {
        this.state[event.target.name] = event.target.value;
        this.props.onGiveValue(this.state);
    }

    _handleSubmit(e) {
        this.props.onSubmitData();
    }

    render() {
        return(
            <div className="editor_box">
                <div className="editor_box_title">...</div>
                <span className="heading">Search Options</span>
                <form name="optionForm5" className="options_form">

                    <div  className="search_position_wrapper radio_icons_wrapper">
                        <label>Buttons Position</label>
                        <div className="search_position_block radio_icons_block">
                            <div><input type="radio" checked = {this.state.searchPosition == 'left'} onChange={this.handleChange}  value="left" name="searchPosition" /><span className="radio_block position1"></span></div>
                            <div><input type="radio" checked = {this.state.searchPosition == 'top'} onChange={this.handleChange}  value="top" name="searchPosition" /><span className="radio_block position2"></span></div>
                            <div><input type="radio" checked = {this.state.searchPosition == 'right'} onChange={this.handleChange}   value="right" name="searchPosition" /><span className="radio_block position3"></span></div>
                        </div>
                    </div>
                    <div className="button_wrapper">
                        <input type="button" value="Save" onClick={this._handleSubmit} className="updateThemesData" name="option1Save" />
                    </div>
                </form>
            </div>
        )
    }
}
export default SearchOptions;