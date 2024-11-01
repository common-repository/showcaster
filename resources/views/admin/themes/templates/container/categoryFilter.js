import React, {Component} from "react";
class CategoryFilter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let count = this.props.count;
        let filterArray = [];
        for (let i = 0; i < count; i++) {
            filterArray.push(
                <div key={i}>
                    <button className="button categoriesBtn" data-filter={".category-" + i}>cattegory 2</button>
                </div>
            )
        }
        return (
            filterArray
        )
    }
}
export default CategoryFilter;