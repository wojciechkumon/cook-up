import React, {Component} from "react";
import "./CratesWrapper.scss";
import client from "../restclient/client";
import CrateElement from "./CrateElement";

class CratesWrapper extends Component {

  constructor(props) {
    super(props);
    this.state = {crates: []};
  }

  componentDidMount() {
    client({method: 'GET', path: '/api/crates'}).done(response => {
      this.setState({crates: response.entity._embedded.crates});
    });
  }

  render() {
    const crateElements = this.state.crates.map(
      (crate) => <CrateElement key={crate._links.self.href} crate={crate}/>
    );

    return (
      <div className='CratesWrapper'>
        {crateElements}
      </div>
    );
  }
}

export default CratesWrapper;
