import * as React from "react";
import { shallow } from "enzyme";
import Aircraft from "../Aircraft";

describe("Aircraft", () => {
  const props = {
    aircraft: { ident: "1234" },
    totalAircraftUse: jest.fn(() => 42)
  };
  const wrapper = shallow(<Aircraft {...props} />);
  it("matches the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
