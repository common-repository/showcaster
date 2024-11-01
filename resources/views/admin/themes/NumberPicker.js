import React, {Component} from "react";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
class NumberPicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: props.numb
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChangeStart() {
    };

    handleChange(value) {
        this.setState({
            value: value
        });
        this.props.setNum(value);
    };

    handleChangeComplete() {
    };

    render() {
        let value = this.state.value;
        value = parseInt(value);
        let max = this.props.max;
        let min = this.props.min;
        return (
            <div className='slider'>
                <Slider min={min} max={max} value={value} onChangeStart={this.handleChangeStart} onChange={this.handleChange} onChangeComplete={this.handleChangeComplete}/>
            </div>
        )
    }
}
export default NumberPicker;