import * as React from "react";
import { shallow } from "enzyme";
import AirCraftsList from "../AirCraftsList";

describe("AirCraftsList", () => {
  const props = {
    aircraftList: [{ ident: "1234" }],
    totalAircraftUse: jest.fn(() => 42),
    onSelectAircraft: jest.fn()
  };
  const wrapper = shallow(<AirCraftsList {...props} />);
  it("matches the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("calls onSelectAircraft onSelectAircraft click", () => {
    const airCraft = wrapper.find("AirCraft");
    airCraft.simulate("selectAircraft");
    expect(props.onSelectAircraft).toHaveBeenCalled();
  });
});
