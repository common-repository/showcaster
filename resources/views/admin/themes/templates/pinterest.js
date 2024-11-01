import React, {Component} from "react";
import CategoryFilter from "./container/categoryFilter";
import GalleryList from "./container/galleryList";
class Pinterest extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let data =this.props;
        return (
           <GalleryList type="3"  imageData={data}  datas = {data.datas}count="5"/>
        )
    }
}
export default Pinterest;