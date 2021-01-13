import React from "react";
import { decode } from "html-entities";
import Typography from "../Typography";

type TLiquidTemplate = string;
export interface IFormatMoneyProps {
  value: string | number | null | undefined;
  /**
   * Use to extend decimal precision.
   */
  extendedPrecision?: boolean;
  shopifyCurrencyFormat?: TLiquidTemplate;
}

export default function FormatMoney({
  value,
  extendedPrecision = true,
  shopifyCurrencyFormat = "${{amount}}",
}: IFormatMoneyProps) {
  value = value || 0;
  value = typeof value === "string" ? Number.parseInt(value) : value;

  return (
    <Typography>
      {templateToFormattedMoney(
        value,
        shopifyCurrencyFormat,
        extendedPrecision
      )}
    </Typography>
  );
}

function templateToFormattedMoney(
  value: number,
  shopifyCurrencyFormat: string,
  extendedPrecision: boolean
) {
  const template = stripHtmlAndDecodeHtmlEntities(shopifyCurrencyFormat);
  // Will return something that looks like: "{{amount_with_comma_separator}}"
  const whatToReplace = template.substring(
    template.indexOf("{"),
    template.indexOf("}") + 2
  );
  const defaultPrecision = 2;
  const formattedFloat = (value || 0).toLocaleString(undefined, {
    minimumFractionDigits: defaultPrecision,
    maximumFractionDigits: extendedPrecision ? 5 : defaultPrecision,
  });

  return template.replace(whatToReplace, formattedFloat);
}

const stripHtmlAndDecodeHtmlEntities = (markup: string) =>
  decode(markup.replace(/<[^>]*>?/gm, ""));
