import React, {Component} from "react";
import reactCSS from "reactcss";
import {ChromePicker} from "react-color";
class ColorComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayColorPicker: false,
            color: props.color
        };
    };

    handleClick() {
        this.setState({displayColorPicker: !this.state.displayColorPicker});
    }

    handleClose() {
        this.setState({displayColorPicker: false});
    }

    handleChange(color) {
        this.setState({color: color.hex});
        this.props.setColor(color.hex);
    }

    render() {
        const styles = reactCSS({
            'default': {
                color: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    backgroundColor: `${this.state.color}`
                },
                swatch: {
                    padding: '5px',
                    background: '#fff',
                    borderRadius: '1px',
                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                    display: 'inline-block',
                    cursor: 'pointer'
                },
                popover: {
                    position: 'absolute',
                    zIndex: '2'
                },
                cover: {
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px'
                }
            }
        });
        return (
            <div>
                <div style={ styles.swatch } onClick={ this.handleClick.bind(this) }>
                    <div style={ styles.color }/>
                </div>
                { this.state.displayColorPicker ? <div style={ styles.popover }>
                    <div style={ styles.cover } onClick={ this.handleClose.bind(this) }/>
                    <ChromePicker color={ this.state.color } onChange={ this.handleChange.bind(this) }/>
                </div> : null }
            </div>
        )
    }
}
export default ColorComponent;