import React, {Component} from "react";
import GalleryList from "./container/galleryList";

class Template4 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let data = this.props;
        return (
            <div>
                <GalleryList  imageData={data} type="4" count="5" datas = {data.datas }/>
            </div>

    )
    }
}
export default Template4;



