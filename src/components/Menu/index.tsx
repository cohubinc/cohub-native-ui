import React, { useState } from "react";
import Typography from "../Typography";
import "./Menu.scss";
import Color from "src/definitions/enums/Color";

interface TMenuItem {
  label: string;
  action: any;
}

export interface IMenuProps {
  orientation?: "horizontal" | "vertical";
  appearance?: "light" | "dark";
  items: TMenuItem[];
}

export default function Menu({
  orientation = "horizontal",
  appearance = "light",
  items
}: IMenuProps) {
  const [activeItem, setActiveItem] = useState<TMenuItem>();

  let style = {};

  const itemList = items.map((i: TMenuItem) => {
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
        className="px-05 py-05 pointer"
        style={{ ...style, borderRadius: "4px" }}
      >
        <Typography color={appearance === "light" ? Color.text : Color.grey200}>
          {i.label}
        </Typography>
      </div>
    );
  });

  return (
    <div
      className={`p-05 flex MenuContainer ${
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