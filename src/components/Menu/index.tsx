import React, { useState } from "react";
import { Color } from "@cohubinc/cohub-utils";

import Typography from "../Typography";
import "./Menu.scss";

interface IMenuItem {
  label: string;
  action: any;
}

export interface IMenuProps {
  orientation?: "horizontal" | "vertical";
  appearance?: "light" | "dark";
  size?: "small" | "regular";
  items: IMenuItem[];
}

export default function Menu({
  orientation = "horizontal",
  appearance = "light",
  size = "regular",
  items
}: IMenuProps) {
  const [activeItem, setActiveItem] = useState<IMenuItem>();

  let style = {};

  const itemList = items.map((i: IMenuItem) => {
    if (appearance === "light" && activeItem === i) {
      style = { backgroundColor: Color.grey400 as any };
    } else if (appearance === "dark" && activeItem === i) {
      style = { backgroundColor: Color.black200 as any };
    } else {
      style = { backgroundColor: Color.transparent as any };
    }

    return (
      <div
        key={i.label}
        onClick={() => setActiveItem(i)}
        className="flex items-center px-05 py-025 pointer"
        style={{ ...style, borderRadius: "4px" }}
      >
        {size === "small" ? (
          <Typography.Small
            color={appearance === "light" ? Color.text : Color.grey200}
          >
            {i.label}
          </Typography.Small>
        ) : (
          <Typography
            color={appearance === "light" ? Color.text : Color.grey200}
          >
            {i.label}
          </Typography>
        )}
      </div>
    );
  });

  return (
    <div
      className={`p-025 flex MenuContainer ${
        orientation === "horizontal"
          ? "flex-row justify-evenly items-center"
          : "flex-column items-center"
      }`}
      style={
        appearance === "light"
          ? {
              backgroundColor: Color.grey200 as any,
              borderRadius: "8px"
            }
          : {
              backgroundColor: Color.black500 as any,
              borderRadius: "8px"
            }
      }
    >
      {itemList}
    </div>
  );
}
