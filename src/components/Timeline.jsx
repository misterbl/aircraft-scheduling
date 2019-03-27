import React, { PureComponent } from "react";
import { DAYTOSECONDS } from "../const";
import { calculatePercentage } from "../utils";

class Timeline extends PureComponent {
  startIdl = () => {
    const { flyingTimesList } = this.props;
    if (flyingTimesList[0]) return flyingTimesList[0].departuretime;
  };

  render() {
    const { flyingTimesList } = this.props;
    const startIdl =
      flyingTimesList[0] &&
      calculatePercentage(flyingTimesList[0].departuretime);

    const endIdl =
      flyingTimesList[-1] &&
      calculatePercentage(DAYTOSECONDS - flyingTimesList[-1].arrivaltime);

    return (
      <div className="progress">
        <div
          key={startIdl}
          role="progressbar"
          style={{ width: `${startIdl}%` }}
          aria-valuenow={startIdl}
          aria-valuemin="0"
          aria-valuemax="100"
        />
        {flyingTimesList.map(flight => (
          <>
            {flight && (
              <div
                key={flight.timePercentage}
                className={`progress-bar ${
                  flight.turnaround ? "bg-danger" : "bg-success"
                }`}
                role="progressbar"
                style={{ width: `${flight.timePercentage}%` }}
                aria-valuenow={flight.timePercentage}
                aria-valuemin="0"
                aria-valuemax="100"
              />
            )}
            <div
              key={endIdl}
              role="progressbar"
              style={{ width: `${endIdl}%` }}
              aria-valuenow={endIdl}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </>
        ))}
      </div>
    );
  }
}
export default Timeline;
