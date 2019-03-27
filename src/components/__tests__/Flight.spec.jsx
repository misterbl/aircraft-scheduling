import * as React from "react";
import { shallow } from "enzyme";
import Flight from "../Flight";

describe("Flight", () => {
  const props = {
    flight: {
      id: "1234",
      origin: "origin",
      readable_departure: "readable_departure",
      destination: "destination",
      readable_arrival: "readable_arrival"
    },
    onRemoveFlight: jest.fn(),
    onSelectFlight: jest.fn()
  };
  const wrapper = shallow(<Flight {...props} />);
  it("matches the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("calls onSelectFlight if rotation is undefined", () => {
    const li = wrapper.find("li");
    li.simulate("click");
    expect(props.onSelectFlight).toHaveBeenCalled();
  });
  it("calls onRemoveFlight and show the righ arrow if rotation is true", () => {
    const propsWithRotation = { ...props, rotation: true };
    const wrapperWithRotation = shallow(<Flight {...propsWithRotation} />);
    const li = wrapperWithRotation.find("li");
    const img = wrapperWithRotation.find("img");
    li.simulate("click");
    expect(propsWithRotation.onRemoveFlight).toHaveBeenCalled();
    expect(img.length).toEqual(1);
  });
});
