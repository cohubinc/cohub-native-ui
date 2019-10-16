import React from "react";
import { Button, Text, TextInput, View } from "react-native";
import { fireEvent, render, wait } from "@testing-library/react-native";
import { Buttons } from "dist";

function Example() {
  const [show, setShow] = React.useState(false);

  return (
    <View>
      {show && <Text testID="printed-username">Hidden Text</Text>}
      <Buttons.Primary
        label="Show Hidden Text"
        onPress={() => {
          // let's pretend this is making a server request, so it's async
          // (you'd want to mock this imaginary request in your unit tests)...
          setTimeout(() => {
            setShow(!show);
          }, Math.floor(Math.random() * 200));
        }}
      />
    </View>
  );
}

test("button click works", async () => {
  const { getByTestId, getByText, queryByTestId } = render(<Example />);

  const button = getByText("Show Hidden Text");
  fireEvent.press(button);

  await wait(() => expect(queryByTestId("printed-username")).toBeTruthy());
});
