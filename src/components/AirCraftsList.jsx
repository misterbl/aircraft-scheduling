import React from "react";
import AirCraft from "./Aircraft";

const AirCraftsList = ({
  aircraftList,
  totalAircraftUse,
  onSelectAircraft
}) => (
  <div className="container mw-250">
    <h3>Aircrafts</h3>
    <ul className="d-flex flex-column">
      {aircraftList.map(aircraft => (
        <AirCraft
          key={aircraft.ident}
          aircraft={aircraft}
          totalAircraftUse={totalAircraftUse}
          onSelectAircraft={onSelectAircraft}
        />
      ))}
    </ul>
  </div>
);

export default AirCraftsList;
