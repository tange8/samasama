import { useState } from "react"
import { DayPicker } from "react-day-picker"

// Must pass in range/setRange from Home page in order to filter events there
export const Calendar = ({range, setRange}) => {
    return (
        <DayPicker
            mode="range"
            showOutsideDays
            captionLayout="dropdown"
            navLayout="around"
            selected={range}
            onSelect={setRange}
            className="bg-[#FFE3CA] w-full max-w-[300px] rounded-[10px] border border-[#070154] border-[3px] p-4"
            classNames={{
                month: 'relative w-full',
                month_caption: 'flex mb-3 justify-center items-center',
                caption_label: 'hidden',
                button_previous: 'absolute top-1 left-1 rounded p-1 hover:bg-[#070154]',
                button_next: 'absolute top-1 right-1 rounded p-1 hover:bg-[#070154]',

                dropdowns: 'flex gap-2',
                months_dropdown: 'bg-[#fff4ea] rounded p-2',
                years_dropdown: 'bg-[#fff4ea] rounded p-2',
                
                range_start: '!bg-[#FF4F00] !text-white',
                range_end: '!bg-[#FF4F00] !text-white',
                range_middle: 'bg-[#FFDDBE]',

                month_grid: 'w-full border-collapse',
                weekdays: 'text-[#757575]',
                weekday: 'text-center',
                week: 'w-full',
                day: 'text-center rounded h-[32px] hover:bg-[#FFDDBE] hover:text-[#FF4F00]',
                outside: 'text-[#B3B3B3]',
            }}
        />
    
  )
}
