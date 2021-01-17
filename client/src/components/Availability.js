import React, { Component } from 'react';

class Availability extends Component {
    state = { ready: false, availability: ""}

    componentDidUpdate() {
      this.getAvailability();
    }

    /**
   * Sets ready to true when the props is properly loaded
   * Goes through the availability data provided for a manufacturer
   * to figure out if the current product is available
   */
    getAvailability = () => {
      if(typeof(this.props.manufacturer.response) == "object" && this.state.ready == false) {
        this.setState({ ready : true });
        this.props.manufacturer.response.forEach(product => {
          if(product.id.toLowerCase() == this.props.id) {
            if(product.DATAPAYLOAD.includes("OUTOFSTOCK")) {
              this.setState({ availability : "Out of stock" });
            } else {
              this.setState({ availability : "In stock" });
            } 
          }
        })
      }
    }
    render() {
      const { availability, ready } = this.state;

      return (
      <div>
        {ready ? (
        <div>
            <div>{availability}</div>
        </div>) : (
          <div>
          <div className="fetching">Loading availability information</div>
          </div>
        )}
      </div>
      );
    }
  }

export default Availability;