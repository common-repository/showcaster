import React, {Component} from "react";
import CategoryFilter from "./container/categoryFilter";
import GalleryList from "./container/galleryList";
import Popup from "../options/components/popup";

// import '../../../../assets/css/frontend/main.css';

class Grid extends Component {
    constructor(props) {
        super(props);
    }
    componentWillReceiveProps(newProps) {
        this.setState({data: newProps});
    }
    render() {
        let data =this.props;
        var tabType = document.getElementsByClassName('active')[0].children[0].textContent;
        return (
            <div>
                <Popup imageData={data} datas = {data.datas }/>
                 <GalleryList imageData={data}  datas = {data.datas } type="1" count="5" />
             </div>
        )
    }
}
export default Grid;