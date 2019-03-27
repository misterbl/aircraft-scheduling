import * as React from "react";
import { shallow } from "enzyme";
import Instructions from "../Instructions";

describe("Instructions", () => {
  const wrapper = shallow(<Instructions />);
  it("matches the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
