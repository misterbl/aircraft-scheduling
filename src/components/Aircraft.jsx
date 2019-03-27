import React from "react";

const AirCraft = ({ aircraft, totalAircraftUse, onSelectAircraft }) => (
  <li onClick={onSelectAircraft} className="text-center">
    <p>{aircraft.ident}</p>
    <p>{`(${totalAircraftUse()} %)`}</p>
  </li>
);

export default AirCraft;
