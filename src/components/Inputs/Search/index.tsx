import React from "react";
import { IBasicInputProps } from "../Basic";
import Basic from "src/components/Inputs/Basic";

export interface ISearchInputProps
  extends Omit<IBasicInputProps, "icon" | "iconPosition"> {}

function Search({ accessibilityLabel = "Search", ...rest }: ISearchInputProps) {
  return (
    <Basic
      {...rest}
      accessibilityLabel={accessibilityLabel}
      icon={{
        name: "search"
      }}
    />
  );
}

export default Search;
