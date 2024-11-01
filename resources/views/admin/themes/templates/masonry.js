import React, {Component} from "react";
import GalleryList from "./container/galleryList";
class Masonry extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let data =this.props;
        return (
            <GalleryList imageData={data} datas = {data.datas } type="5" count="10"/>
        )
    }
}
export default Masonry;