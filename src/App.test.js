import * as React from "react";
import { shallow } from "enzyme";
import App from "./App";

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

  // it("calls onSelectApp if rotation is undefined", () => {
  //   const li = wrapper.find("li");
  //   li.simulate("doubleClick");
  //   expect(props.onSelectApp).toHaveBeenCalled();
  // });
  // it("calls onRemoveApp if rotation is true", () => {
  //   wrapper.setProps({ rotation: true });
  //   const li = wrapper.find("li");
  //   li.simulate("doubleClick");
  //   expect(props.onRemoveApp).toHaveBeenCalled();
  // });
});
