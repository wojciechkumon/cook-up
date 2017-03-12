import React, {Component} from "react";
import "./CrateElement.scss";

class CrateElement extends Component {

  render() {
    const price = this.props.crate.price / 100.0;
    const toDecimalPlacesPrices = price.toFixed(2);

    return (
      <div className='CrateElement'>
        <span>name: {this.props.crate.name}</span><br/>
        <span>price: {toDecimalPlacesPrices}$</span>
      </div>
    );
  }
}

export default CrateElement;
