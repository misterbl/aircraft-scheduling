import * as React from "react";
import { shallow } from "enzyme";
import Timeline from "../Timeline";

describe("Timeline", () => {
  const props = {
    flyingTimesList: [
      {
        id: "1234",
        origin: "origin",
        readable_departure: "readable_departure",
        destination: "destination",
        readable_arrival: "readable_arrival",
        departuretime: 1233,
        arrivaltime: 2500
      }
    ]
  };
  const wrapper = shallow(<Timeline {...props} />);
  it("matches the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
