import React, {Component} from "react";
import CategoryFilter from "./container/categoryFilter";
import GalleryList from "./container/galleryList";
class FullWidth extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let data =this.props;
        return (
            <GalleryList imageData={data} datas = {data.datas } type="6" count="5"/>
        )
    }
}
export default FullWidth;