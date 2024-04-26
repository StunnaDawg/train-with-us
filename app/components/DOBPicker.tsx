import { View, Text, Platform } from "react-native"
import React, { Dispatch, SetStateAction, useState } from "react"
import DateTimePicker, {
  Event as DateTimePickerEvent,
} from "@react-native-community/datetimepicker"

type DOBPickerProps = {
  setDate: Dispatch<SetStateAction<Date>>
  date: Date
}

const DOBPicker = ({ setDate, date }: DOBPickerProps) => {
  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date

    setDate(currentDate)
  }
  return (
    <DateTimePicker
      testID="dateTimePicker"
      value={date}
      mode="date"
      display="default"
      onChange={() => onChange}
      maximumDate={new Date()} // Users can't select a date in the future
    />
  )
}

export default DOBPicker
