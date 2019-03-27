import * as React from "react";
import { shallow } from "enzyme";
import Aircraft from "../Aircraft";

describe("Aircraft", () => {
  const props = {
    aircraft: { ident: "1234" },
    totalAircraftUse: jest.fn(() => 42),
    onSelectAircraft: jest.fn()
  };
  const wrapper = shallow(<Aircraft {...props} />);
  it("matches the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("calls onSelectAircraft onClick()", () => {
    const li = wrapper.find("li");
    li.simulate("click");
    expect(props.onSelectAircraft).toHaveBeenCalled();
  });
});
