import React, { useState } from 'react'
import { X, Pencil, ChevronDown } from 'lucide-react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
dayjs.extend(advancedFormat)

export const CreatePostingModal = ({setAddEventOpen}) => {
  const options = ['Kababayan', 'Fusion', 'Pass', 'Puso'];
  
  const [errors, setErrors] = useState({
    title: '',
    startDate: '',
    endDate: '',
    startClock: '',
    endClock: '',
  })
  // States for frontend
  const [formData, setFormData] = useState({
    title: '',
    organization: '',
    description: '',
    startDate: null, 
    endDate: null,
    startClock: null,
    endClock: null,
    tags: [],
    mentionTaggedOrgs: false,
    attachment: null
  })
  const updateField = (field, value) => {
    setFormData(prev => ({
        ...prev,
        [field]: value
    }))
  }

  const handleTagSelect = (e) => {
    const value = e.target.value
    // Only add value if not already selected
    if (value && !formData.tags.includes(value)){
        // Concat value to tags
        updateField('tags', [...formData.tags, value])
    }
    // Reset dropdown
    e.target.value = ''
  }

  const removeTag = (tag) => {
    // Add everything back except tag we're removing
    updateField('tags', formData.tags.filter((t) => t !== tag))
  }

  // Convert startDate, startClock => startTime (for backend)
  const combineDateTime = (date, time) => {
    if (!date || !time) return null

    return dayjs(date)
        .hour(dayjs(time).hour())
        .minute(dayjs(time).minute())
        .second(0)
        .millisecond(0)
    }
    
    // Ensure non-nullable fields are filled
  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
        newErrors.title = 'Event title is required'
    }

    if (!formData.startDate) {
        newErrors.startDate = 'Start date is required'
    }

    if (!formData.endDate) {
        newErrors.endDate = 'End date is required'
    }

    if (!formData.startClock) {
        newErrors.startClock = 'Start time is required'
    }

    if (!formData.endClock) {
        newErrors.endClock = 'End time is required'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
    }

  const handleSubmit = async () => {
    // Confirm required input filled 
    const isValid = validateForm()
    if(!isValid) return

    const startTime = combineDateTime(formData.startDate, formData.startClock)
    const endTime = combineDateTime(formData.endDate, formData.endClock)
    
    const payload = {
        title: formData.title,
        description: formData.description,
        photo_link: formData.attachment,
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString()
        // Missing frontend aspect for:
            //  1. location picking
            //  2. type of event (event/fundraiser)
        // Missing backend logic for: Recurring daily within range ("Set specific times per day")

    }
    // TO DO: replace with API push logic
    console.log(payload)
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
                    
                    {/* Title: Non-null input */}
                    <div className="flex flex-col justify-start relative">
                    <label className="flex flex-row justify-between w-[631px] h-[45px] py-[10px] px-[20px] text-[#79747E] bg-white border border-[#FF4F00] rounded-[20px]">
                        <input
                        type='text'
                        placeholder='Name your event...'
                        className="w-full outline-none"
                        onChange={(e) => updateField('title', e.target.value)}
                        />
                        <Pencil/>
                    </label>
                    {errors.title && <p className="absolute top-full pl-4 text-[#FF4F00]">* Title required</p>}    
                    </div>
                    

                    <label className="flex flex-row justify-between w-[631px] h-[45px] py-[10px] px-[20px] text-[#79747E] bg-white border border-[#FF4F00] rounded-[20px]">
                        <input
                        type='text'
                        placeholder='Your organization...'
                        className="w-full outline-none"
                        />
                        <Pencil/>
                    </label>

                    <label className="flex flex-row justify-between items-center w-[631px] h-[109px] py-[10px] px-[20px] text-[#79747E] bg-white border border-[#FF4F00] rounded-[20px]">
                        <textarea
                        rows={4}
                        placeholder='Description...'
                        className="w-full h-full outline-none resize-none"
                        onChange={(e) => updateField('description', e.target.value)}
                        />
                        <Pencil/>
                    </label>
                </div>

                {/* Start/End Date/Time (MUI X Components) */}
                <div className="text-[#FF4F00] text-[24px]">Duration and time?</div>
                
                <div className="flex flex-col justify-center items-center gap-4">
                    
                    {/* Start/end date: Non-null input(s) */}
                    <div className="flex flex-col justify-start relative">
                    <div className="flex flex-row justify-between items-center w-[631px] h-[55px] py-[10px] px-[20px] text-[#79747E] bg-white border border-[#FF4F00] rounded-[20px]">
                        <DatePicker 
                            label="Start Date"
                            value={formData.startDate}
                            onChange={(newValue) => updateField('startDate', newValue)}
                            format="MMMM Do, YYYY"
                            slotProps={{
                                textField: {   
                                    size: 'small',
                                    sx: {
                                        '& fieldset': {
                                            border: 'none',
                                        },                              
                                    },
                                },
                            }}
                        />
                        <p className="flex items-center">to</p>
                        <DatePicker 
                            label="End Date" 
                            value={formData.endDate}
                            onChange={(newValue) => updateField('endDate', newValue)}
                            minDate={formData.startDate}
                            format="MMMM Do, YYYY"
                            slotProps={{
                                textField: {
                                    size: 'small',
                                    sx: {
                                        '& fieldset': {
                                            border: 'none'
                                        }
                                    }
                                }
                            }}
                        />
                    </div>
                    {(errors.startDate || errors.endDate) && <p className="top-full pl-4 text-[#FF4F00]">* Mising start and/or end date</p>}
                    </div>
                    
                    <div className="flex flex-col">
                    <div className="flex flex-row justify-between items-center gap-4">
                        
                        <div className="flex flex-col justify-between items-center w-[177px] h-[55px] py-[10px] px-[20px] text-[#79747E] bg-white border border-[#FF4F00] rounded-[20px]">
                            <TimePicker
                                label="Start Time"
                                value={formData.startClock}
                                onChange={(newValue) => updateField('startClock', newValue)}
                                slots={{
                                    openPickerIcon: () => <ChevronDown/>
                                }}
                                slotProps={{
                                    textField: {
                                        size: 'small',
                                        sx: {
                                            '& fieldset': {
                                                border: 'none'
                                            }
                                        }
                                    }
                                }}
                            />
                        </div>
                        <p>to</p>
                        <div className="flex flex-col justify-between items-center w-[177px] h-[55px] py-[10px] px-[20px] text-[#79747E] bg-white border border-[#FF4F00] rounded-[20px]">
                            <TimePicker
                                label="End Time"
                                value={formData.endClock}
                                onChange={(newValue) => updateField('endClock', newValue)}
                                minTime={formData.startClock}
                                slots={{
                                    openPickerIcon: () => <ChevronDown/>
                                }}
                                slotProps={{
                                    textField: {
                                        size: 'small',
                                        sx: {
                                            '& fieldset': {
                                                border: 'none'
                                            }
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>
                        {(errors.startClock || errors.endClock) && <p className="top-full pl-4 text-[#FF4F00]">* Missing start and/or end time</p>}
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
                            {formData.tags.map((tag)=> (
                                <div key={tag} className="flex flex-row gap-2 p-2 w-fit text-white bg-[#FF4F00] rounded-[10px]"> 
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
                        <input 
                        type='file' 
                        accept="image/*" 
                        className="hidden"
                        onChange={(e) => updateField('attachment', e.target.files[0])}
                        />
                        <span>Add an attachment</span>
                    </label>
                </div>

                {/* onClick => Close modal, send push to database, update events */}
                <div className="flex justify-center items-center">
                    <button className="w-[339px] h-[76px] rounded-[10px] text-[24px] text-[#FF4F00] border border-[#FF4F00] hover:bg-[#FF4F00] hover:text-white"
                        onClick={handleSubmit}
                    >
                        Post listing
                    </button>
                </div>
                
            </div>
        </div>
    </div>

    </LocalizationProvider>

  )
}
