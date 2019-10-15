import React, { useState, useRef } from "react";
import LowLevelDatePicker, {
  IProps as ILowLevelDatePickerProps
} from "../LowLevelDatePicker";
import FloatingLabelWrapper, {
  IFloatingLabelWrapperProps
} from "../../FloatingLabelWrapper";
import Typography from "src/components/Typography";
import { paddingHorizontal } from "src/helpers/style-utils";

export type InheritedProps = Omit<
  ILowLevelDatePickerProps,
  "setRangeError" | "rangeError" | "onChange" | "setHasValue" | "value"
> &
  Pick<IFloatingLabelWrapperProps, "label" | "error" | "appearance" | "value">;

type StartDate = string;
type EndDate = string;
type Value = [StartDate, EndDate];

export interface IProps extends InheritedProps {
  onChange: (val: Value, wutChanged: "startDate" | "endDate") => void;
  value: Value | undefined;
}

export default function DateRangeBase({
  value,
  onChange,
  appearance,
  error,
  ...restProps
}: IProps) {
  const [startDateHasValue, setStartDateHasValue] = useState(false);
  const [endDateHasValue, setEndDateHasValue] = useState(false);
  const [startDateRangeError, setStartDateRangeError] = useState(false);
  const [endDateRangeError, setEndDateRangeError] = useState(false);
  const endDateInputRef = useRef<HTMLInputElement>(null);

  const startDate = (value && value[0]) || "";
  const endDate = (value && value[1]) || "";

  return (
    <FloatingLabelWrapper
      floatLabel={startDateHasValue || endDateHasValue}
      error={error || startDateRangeError || endDateRangeError}
      appearance={appearance}
      value={value}
      {...restProps}
    >
      {({
        componentProps: { onChange: _, value: _val, ...cmptProps },
        setInputRef
      }) => {
        return (
          <div className="flex">
            <LowLevelDatePicker
              {...cmptProps}
              value={startDate}
              onChange={startD => {
                onChange([startDate, endDate], "startDate");
                endDateInputRef.current && endDateInputRef.current.focus();
              }}
              rangeError={startDateRangeError}
              setRangeError={setStartDateRangeError}
              setNativeElRef={setInputRef}
              setHasValue={setStartDateHasValue}
              style={{ width: 96 }}
              inputStyle={{
                ...paddingHorizontal(0),
                textAlign: "right"
              }}
              data-testid="startDateInput"
            />

            {startDate && (
              <Typography
                weight={"600"}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "0.25rem",
                  marginLeft: "0.25rem",
                  paddingTop: appearance === "contrast" ? 7 : undefined
                }}
              >
                to
              </Typography>
            )}

            <LowLevelDatePicker
              {...cmptProps}
              value={endDate}
              minDate={startDate}
              onChange={endD => {
                onChange([startDate, endD], "endDate");
              }}
              rangeError={endDateRangeError}
              setRangeError={setEndDateRangeError}
              setHasValue={setEndDateHasValue}
              style={{ width: "65%" }}
              inputStyle={paddingHorizontal(0)}
              setNativeElRef={el => ((endDateInputRef as any).current = el)}
              data-testid="endDateInput"
            />
          </div>
        );
      }}
    </FloatingLabelWrapper>
  );
}
