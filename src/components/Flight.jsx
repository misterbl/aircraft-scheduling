import React, { PureComponent } from "react";
import rightArrow from "../assets/right-arrow.svg";

class Flight extends PureComponent {
  onSelectFlight = () => {
    const { flight, onSelectFlight, rotation, onRemoveFlight } = this.props;
    if (rotation) {
      onRemoveFlight(flight);
    } else {
      onSelectFlight(flight);
    }
  };

  render() {
    const { flight, rotation } = this.props;
    const {
      id,
      origin,
      readable_departure,
      destination,
      readable_arrival
    } = flight;

    return (
      <li className="flight" onClick={this.onSelectFlight}>
        <p className={`${rotation ? "" : "text-center"}`}>
          {`${rotation ? "Flight: " : ""}` + id}
        </p>
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-column">
            <p>{origin}</p>
            <p>{readable_departure}</p>
          </div>
          {rotation && <img src={rightArrow} alt="right arrow" />}
          <div className="d-flex flex-column">
            <p>{destination}</p>
            <p>{readable_arrival}</p>
          </div>
        </div>
      </li>
    );
  }
}

export default Flight;
