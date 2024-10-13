import type { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Button, Text, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { adjustedTime } from "~/utils/adjust-time";

interface TimePickerProps {
  value?;
  onChange?(value);
  children?;
  Toggle?;
  className?;
  onClose?;
  onOpen?;
}
export function TimePicker({
  value,
  onChange: _onChange,
  Toggle,
  className,
  children,
  onClose,
  onOpen,
}: TimePickerProps) {
  const [time, setTime] = useState(
    value || new Date(adjustedTime().toISOString()),
  );
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");
  const onChange = (event: DateTimePickerEvent, selectedTime) => {
    switch (event.type) {
      case "set":
        setTime(selectedTime);
        setShow(false);
        setTimeout(() => {
          if (mode == "date") {
            setMode("time");
            setShow(true);
          } else {
            console.log({ selectedTime });

            _onChange?.(selectedTime);
          }
        }, 200);
        break;
      case "dismissed":
        setShow(false);
    }
  };
  //
  return (
    <>
      {/* Button to Show Time Picker */}
      {Toggle ? (
        <Toggle
          onPress={() => {
            setMode("date");
            setShow(true);
            onOpen?.();
          }}
        />
      ) : (
        <Button
          title="Select Time"
          onPress={() => {
            setMode("date");
            setShow(true);
            onOpen?.();
          }}
        />
      )}
      {/* <View className="flex-1 items-center justify-center"> */}
      {/* Display Selected Time */}
      {/* <Text className="mt-4 text-lg">
          Selected Time: {time.toLocaleDateString()} {time.toLocaleTimeString()}
        </Text> */}

      {/* Time Picker */}
      {show && (
        <DateTimePicker
          value={time}
          mode={mode}
          display="default"
          onChange={onChange}
          onTouchCancel={onClose}
          maximumDate={new Date()}
        />
      )}
      {/* </View> */}
    </>
  );
}
