import React from "react";

import Segment from "../Segment";
import Typography from "../Typography";
import FormatMoney from "../FormatMoney";
import FormatNumber from "../FormatNumber";
import FormatPercent from "../FormatPercent";
import Expander from "../Expander";

export interface IAttributeListProps {
  items: Array<{ attribute: string; value: any; format: any }>;
  header?: string;
  contrast?: boolean;
  className?: string;
  maxVisible?: number;
  expandable?: boolean;
}

export default function AttributeList({
  header,
  items,
  contrast,
  className,
  maxVisible,
  expandable = false
}: IAttributeListProps) {
  const formattedValue = (value: any, format: any) => {
    switch (format) {
      case "money":
        return <FormatMoney value={value} />;
      case "number":
        return <FormatNumber value={value} />;
      case "percentage":
        return <FormatPercent value={value} />;
      case "text":
        return value;
      default:
        return <FormatNumber value={value} />;
    }
  };

  let hiddenAttributes = null;
  let visibleAttributes = items.map(i => (
    <div
      className={`flex justify-between items-center mb-1 ${className}`}
      key={i.attribute}
    >
      <Typography>{i.attribute}</Typography>
      <Typography alignment="right">
        {formattedValue(i.value, i.format)}
      </Typography>
    </div>
  ));

  if (maxVisible) {
    hiddenAttributes = visibleAttributes.splice(maxVisible);
  }

  return (
    <Segment
      className="flex flex-column"
      contrast={contrast}
      padded={contrast ? true : false}
    >
      <Typography.Small muted weight={"500"} uppercase>
        {header}
      </Typography.Small>
      {visibleAttributes}
      {expandable && (
        <Expander
          labelPosition="center"
          expandElement={<Typography muted>More</Typography>}
          expandElementPosition="below"
          collapseElement={<Typography muted>Less</Typography>}
        >
          {hiddenAttributes}
        </Expander>
      )}
    </Segment>
  );
}
