import * as React from "react";
import { shallow } from "enzyme";
import Aircraft from "../Aircraft";

describe("Aircraft", () => {
  const props = {
    aircraft: { ident: "1234" },
    totalAircraftUse: 10
  };
  const wrapper = shallow(<Aircraft {...props} />);
  it("matches the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
