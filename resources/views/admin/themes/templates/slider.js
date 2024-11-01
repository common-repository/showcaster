import React, { Component } from 'react';
import  GalleryList  from './container/galleryList';
 class Slider extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let data =this.props;
        let cssDate = data.datas;
        const gridCss = `
            .my-element {
                background-color: ${cssDate.layoutContainerBackground}
            }
        `;
        return(
            <GalleryList imageData={data} datas = {data.datas } type="2" count="10"/>
        )
    }
}
export default Slider;