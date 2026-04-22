import { useState } from "react"
import { DayPicker } from "react-day-picker"

// Must pass in range/setRange from Home page in order to filter events there
export const Calendar = ({range, setRange}) => {
    return (
    <div>
        <DayPicker
            mode="range"
            showOutsideDays
            captionLayout="dropdown"
            navLayout="around"
            selected={range}
            onSelect={setRange}
            className="bg-[#FFE3CA] w-[400px] h-fit rounded-[10px] border border-[#070154] border-[3px] p-4"
            classNames={{
                month: 'relative w-full',
                month_caption: 'flex p-2 justify-center items-center',
                caption_label: 'hidden',
                button_previous:
                    'absolute top-1 left-4 rounded p-1 hover:bg-[#FFDDBE]',
                button_next:
                    'absolute top-1 right-4 rounded p-1 hover:bg-[#FFDDBE]',

                dropdowns: 'flex gap-2',
                months_dropdown: 'bg-[#FFDDBE] border border-[#070154] rounded',
                years_dropdown: 'bg-[#FFDDBE] border border-[#070154] rounded',
                
                range_start: 'bg-[#FF4F00] text-white',
                range_end: 'bg-[#FF4F00] text-white',
                range_middle: 'bg-[#FFDDBE]',
                
                day: 'text-center rounded w-[51px] h-[51px]',
                outside: 'text-[#B3B3B3]',
                weekdays: 'text-[#757575]',
            }}
        />
    </div>
    
  )
}
