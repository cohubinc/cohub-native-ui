import React from "react";
import { shallow } from "enzyme";
import Link from "../";

describe("Link", () => {
  it("renders without crashing", async () => {
    const wrapper = shallow(<Link to="/custom/path" />);
    expect(wrapper).toMatchSnapshot();
  });
});
