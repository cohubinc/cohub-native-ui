import React from "react";
import { IBasicInputProps } from "../Basic";
import Color from "src/definitions/enums/Color";
import { Inputs } from "src";

export interface ISearchInputProps
  extends Omit<IBasicInputProps, "icon" | "iconPosition"> {}

function Search(props: ISearchInputProps) {
  return (
    <Inputs.Basic
      {...props}
      icon={{
        name: "search"
      }}
    />
  );
}

export default Search;
