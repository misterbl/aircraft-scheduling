import * as React from "react";
import { shallow } from "enzyme";
import FlightsList from "../FlightsList";

describe("FlightsList", () => {
  const props = {
    flightsList: [
      {
        id: "1234",
        origin: "origin",
        readable_departure: "readable_departure",
        destination: "destination",
        readable_arrival: "readable_arrival"
      }
    ],
    onRemoveFlight: jest.fn(),
    onSelectFlight: jest.fn()
  };
  const wrapper = shallow(<FlightsList {...props} />);
  it("matches the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
