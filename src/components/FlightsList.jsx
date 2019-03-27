import React, { PureComponent } from "react";
import Flight from "./Flight";

class FlightsList extends PureComponent {
  render() {
    const {
      flightsList,
      onSelectFlight,
      rotation,
      onRemoveFlight
    } = this.props;
    return (
      <div>
        <h3>{rotation ? "Rotation" : "Flights"}</h3>
        <div className={`container ${rotation ? "rotation" : "mw-250 mn-250"}`}>
          <ul className="d-flex flex-column">
            {flightsList.map(flight => (
              <Flight
                key={`${rotation ? "rotation: " : ""}${flight.id}`}
                flight={flight}
                usage="%used"
                onSelectFlight={onSelectFlight}
                onRemoveFlight={onRemoveFlight}
                rotation={rotation}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default FlightsList;
