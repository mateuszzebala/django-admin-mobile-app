import { Colors } from "@/constants/Colors";
import { convertStringToDate, humanDateString } from "@/utils/dateUtils";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

type DateTimeInputProps = {
  time?: boolean;
  date?: boolean;
  value: any;
  setValue: (value: any) => void;
};

export const DateTimeInput = ({
  time,
  date,
  value,
  setValue,
}: DateTimeInputProps) => {
  // TODO Make sure that datetime which sends is UTC

  const [val, setVal] = React.useState<Date>(
    value ? convertStringToDate(value) : new Date()
  );

  React.useEffect(() => {
    if (value != null && value != val.toJSON()) {
      setVal(convertStringToDate(value));
    }
  }, [value]);

  if (!time && !date)
    throw new Error(
      "You need to specify one or more types of the DateTimeInput"
    );

  const handleInputPress = async () => {
    if (date && !time) {
      DateTimePickerAndroid.open({
        mode: "date",
        value: val,
        onChange: (_, date) => {
          if (date) {
            setValue(date.toJSON());
            setVal(date);
          }
        },
        timeZoneName: "UTC",
      });
    }
    if (date && time) {
      DateTimePickerAndroid.open({
        mode: "date",
        value: val,
        timeZoneName: "UTC",
        onChange: (event, date) => {
          if (event.type === "dismissed") return;
          DateTimePickerAndroid.open({
            mode: "time",
            value: val,
            timeZoneName: "UTC",
            onChange: (_, time) => {
              if (time && date) {
                const newDate = new Date(
                  date.getFullYear(),
                  date.getMonth(),
                  date.getDate(),
                  time.getHours(),
                  time.getMinutes(),
                  time.getSeconds()
                );
                setValue(newDate.toJSON());
                setVal(newDate);
              }
            },
          });
        },
      });
    }
    if (time && !date) {
      DateTimePickerAndroid.open({
        mode: "time",
        value: val,
        timeZoneName: "UTC",
        onChange: (_, time) => {
          if (time) {
            setValue(time.toJSON());
            setVal(time);
          }
        },
      });
    }
  };

  return (
    <TouchableOpacity
      onPress={handleInputPress}
      activeOpacity={0.5}
      style={styles.inputWrapper}
    >
      <View style={styles.input}>
        {value && (
          <>
            {time && (
              <Text style={styles.text}>
                {value ? humanDateString.time(val) : ""}
              </Text>
            )}
            {time && date && <Text> - </Text>}
            {date && (
              <Text style={styles.text}>
                {value ? humanDateString.date(val) : ""}
              </Text>
            )}
          </>
        )}
        {!value && <Text>{value}</Text>}
      </View>
      <Text>UTC</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    backgroundColor: Colors.grey,
    color: Colors.input.color,
    borderRadius: 10,
    padding: 0,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 20,
  },
  input: {
    padding: 20,

    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  text: {
    fontSize: 17,
  },
});
