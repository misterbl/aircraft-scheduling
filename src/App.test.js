import * as React from "react";
import { shallow } from "enzyme";
import fetch from "node-fetch";
import App from "./App";
import { flightsUrl, aircraftsUrl } from "./const";

jest.mock("node-fetch", () =>
  jest.fn(() =>
    Promise.resolve({ ok: true, json: () => Promise.resolve({ data: [] }) })
  )
);
describe("App", () => {
  const props = {
    App: {
      id: "1234",
      origin: "origin",
      readable_departure: "readable_departure",
      destination: "destination",
      readable_arrival: "readable_arrival"
    },
    onRemoveApp: jest.fn(),
    onSelectApp: jest.fn()
  };
  const wrapper = shallow(<App {...props} />);
  it("matches the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("calls fetch on componenDidMount", () => {
    expect(fetch).toHaveBeenCalledWith(aircraftsUrl);
  });
  it("calls setstate on selectAircraft", () => {
    const airCraftsList = wrapper.find("AirCraftsList");
    airCraftsList.simulate("selectAircraft");
    expect(wrapper.state()).toEqual({
      aircraftList: [],
      fatalError: false,
      flightsList: [],
      flyingTimesList: [],
      loading: true,
      rotation: [],
      selectedFlight: null
    });
  });
  it("calls fetch on selectAircraft", () => {
    const airCraftsList = wrapper.find("AirCraftsList");
    airCraftsList.simulate("selectAircraft");
    expect(fetch).toHaveBeenCalledWith(flightsUrl);
  });
  it("calls setstate on removeFlight", () => {
    const flightsList = wrapper.find("FlightsList").at(0);
    flightsList.simulate("removeFlight");
    expect(wrapper.state()).toEqual({
      aircraftList: [],
      fatalError: false,
      flightsList: [],
      flyingTimesList: [],
      loading: true,
      rotation: [],
      selectedFlight: undefined
    });
  });
});
