// @ts-nocheck
import React, { Dispatch, SetStateAction, useState } from "react"
import DateTimePicker, {
  Event as DateTimePickerEvent,
} from "@react-native-community/datetimepicker"

type DOBPickerProps = {
  setDate: Dispatch<SetStateAction<Date>>
  date: Date
}

const DOBPicker = ({ setDate, date }: DOBPickerProps) => {
  const onChange = (event: DateTimePickerEvent, Date?: Date) => {
    if (Date) {
      setDate(Date) // Only update if a date is actually selected
    }
  }
  return (
    <DateTimePicker
      testID="dateTimePicker"
      value={date}
      mode="date"
      display="spinner"
      onChange={onChange}
      maximumDate={new Date()} // Users can't select a date in the future
    />
  )
}

export default DOBPicker
