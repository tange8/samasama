import React, { useState } from 'react'
import { X, Pencil } from 'lucide-react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
dayjs.extend(advancedFormat)

export const CreatePostingModal = ({setAddEventOpen}) => {
  const options = ['UCI Fusion', 'UCI Puso', 'UCI Kaba'];
  const [selectedTags, setSelectedTags] = useState([]);
  const [eventStartDate, setEventStartDate] = useState();
  const [eventStartTime, setEventStartTime] = useState();

  const handleTagSelect = (e) => {
    const value = e.target.value
    // Only add value if not already selected
    if (value && !selectedTags.includes(value)){
        // Concat value to selectedTags
        setSelectedTags([...selectedTags, value])
    }
    // Reset dropdown
    e.target.value = ''
  }

  const removeTag = (tag) => {
    // Add everything back except tag we're removing
    setSelectedTags(selectedTags.filter((t) => t !== tag))
  }

    return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>

    <div className="fixed right-0 top-0 bg-[#FFDCBE] max-w-[859px] h-screen rounded-tl-[15px] rounded-bl-[15px] p-8">
        
        {/* Div surrounding modal content */}
        <div className="h-full overflow-y-auto">
            {/* Div surrounding modal header */}
            <div className="flex flex-row w-full items-center justify-between text-[#FF4F00] text-[32px]">
                <h1>New Event</h1>
                <X className="w-[48px] h-[48px]" onClick={() => setAddEventOpen(false)}></X>
            </div>

            {/* Div surrounding event information */}
            <div className="flex flex-col gap-6">

                {/* Div for name, org, description inputs */}
                <div className="flex flex-col items-center justify-center gap-8 py-5 px-25">
                    
                    <div className="flex flex-row justify-between w-[631px] h-[45px] py-[10px] px-[20px] text-[#79747E] bg-white border border-[#FF4F00] rounded-[20px]">
                        <input
                        type='text'
                        placeholder='Name your event...'
                        className="w-full outline-none"
                        />
                        <Pencil/>
                    </div>

                    <div className="flex flex-row justify-between w-[631px] h-[45px] py-[10px] px-[20px] text-[#79747E] bg-white border border-[#FF4F00] rounded-[20px]">
                        <input
                        type='text'
                        placeholder='Your organization...'
                        className="w-full outline-none"
                        />
                        <Pencil/>
                    </div>

                    <div className="flex flex-row justify-between items-center w-[631px] h-[109px] py-[10px] px-[20px] text-[#79747E] bg-white border border-[#FF4F00] rounded-[20px]">
                        <input
                        type='text'
                        placeholder='Description...'
                        className="w-full outline-none"
                        />
                        <Pencil/>
                    </div>
                </div>

                {/* Start/End Date/Time (MUI X Components) */}
                <div className="text-[#FF4F00] text-[24px]">Duration and time?</div>
                <div className="flex flex-col justify-center items-center gap-4">
                    <div className="flex flex-row justify-between items-center w-[631px] h-[80px] py-[10px] px-[20px] text-[#79747E] bg-white border border-[#FF4F00] rounded-[20px]">
                        <DatePicker 
                            label="Start Date"
                            value={eventStartDate}
                            onChange={(newValue) => setEventStartDate(newValue)}
                            format="MMMM Do, YYYY"
                        />
                        <p className="flex items-center">to</p>
                        <DatePicker 
                            label="End Date" 
                            minDate={eventStartDate}
                            format="MMMM Do, YYYY"
                        />
                    </div>
                    
                    <div className="flex flex-row justify-between items-center gap-4">
                        <div className="flex flex-row justify-between items-center w-[177px] h-[80px] py-[10px] px-[20px] text-[#79747E] bg-white border border-[#FF4F00] rounded-[20px]">
                            <TimePicker
                                label="Start Time"
                                value={eventStartTime}
                                onChange={(newValue) => setEventStartTime(newValue)}
                            />
                        </div>
                        <p>to</p>
                        <div className="flex flex-row justify-between items-center w-[177px] h-[80px] py-[10px] px-[20px] text-[#79747E] bg-white border border-[#FF4F00] rounded-[20px]">
                            <TimePicker
                                label="End Time"
                                minTime={eventStartTime}
                            />
                        </div>
                    </div>

                    <label className="flex flex-row gap-4 items-center">
                        <input type='checkbox' className="w-[20px] h-[20px] rounded bg-[#FFDCBE] accent-[#FF4F00]"/>
                        <p className="text-[#4A4459]">Set specific times per day</p>
                    </label>
                </div>


            
                {/* TO DO: Define Tags */}
                <div className="flex flex-col gap-6">
                    <h1 className="text-[#FF4F00] text-[24px]">Tags</h1>
                    <p className="text-[#4A4459]">Select one or more tags</p>

                    {/* Tag select dropdown and displayed selected tags */}
                    <div className="flex flex-col gap-4 justify-center items-center">
                        {/* Tag multi-select */}
                        <select
                            onChange={handleTagSelect}
                            defaultValue=''
                            className="w-[631px] h-[45px] py-[10px] px-[20px] text-[#79747E] bg-white border border-[#FF4F00] rounded-[20px] focus:outline-none"
                        >
                            <option value="" disabled>Select tags...</option>
                            {options.map((tag) => (
                                <option key={tag} value={tag}>{tag}</option>
                            ))}
                        </select>

                        {/* Map out selected tags */}
                        <div className="flex flex-row gap-2">
                            {selectedTags.map((tag)=> (
                                <div className="flex flex-row gap-2 p-2 w-fit text-white bg-[#FF4F00] rounded-[10px]"> 
                                    <p>{tag}</p>
                                    <X onClick={() => removeTag(tag)}/>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <h1 className="text-[#FF4F00] text-[24px]">Mentions</h1>
                    <label className="flex flex-row gap-4 items-center">
                        <input type='checkbox' className="w-[20px] h-[20px] rounded bg-[#FFDCBE] accent-[#FF4F00]"/>
                        <p className="text-[#4A4459]">Mention other organizational accounts tagged above</p>
                    </label>
                </div>

                <div className="flex justify-center items-center w-[631px] h-[45px] mx-auto py-[10px] px-[20px] text-[#79747E] bg-white border border-[#FF4F00] rounded-[20px]">
                    <label>
                        <input type='file' accept="image/*" className="hidden"/>
                        <span>Add an attachment</span>
                    </label>
                </div>

                {/* onClick => Close modal, send push to database, update events */}
                <div className="flex justify-center items-center">
                    <button className="w-[339px] h-[76px] rounded-[10px] text-[24px] text-[#FF4F00] border border-[#FF4F00] hover:bg-[#FF4F00] hover:text-white">
                        Post listing
                    </button>
                </div>
                
            </div>
        </div>
    </div>

    </LocalizationProvider>

  )
}
