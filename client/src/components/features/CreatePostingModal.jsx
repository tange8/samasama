import React, { useState } from 'react'
import { X, Pencil, ChevronDown } from 'lucide-react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { motion } from "framer-motion"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { useAuth } from '../../context/AuthContext' // <-- Added import
dayjs.extend(advancedFormat)

export const CreatePostingModal = ({setAddEventOpen}) => {
  const options = ['Kababayan', 'Fusion', 'Pass', 'Puso'];
  const { user } = useAuth(); // <-- Get current user

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
    location: '',
    description: '',
    startDate: null, 
    endDate: null,
    startClock: null,
    endClock: null,
    mentionOrgs: [],
    photoUrl: '' 
  })
  
  const updateField = (field, value) => {
    setFormData(prev => ({
        ...prev,
        [field]: value
    }))
  }

  const handleOrgSelect = (e) => {
    const value = e.target.value
    // Only add value if not already selected
    if (value && !formData.mentionOrgs.includes(value)){
        // Concat value to tags
        updateField('mentionOrgs', [...formData.mentionOrgs, value])
    }
    // Reset dropdown
    e.target.value = ''
  }

  const removeMentionedOrg = (org) => {
    // Add everything back except tag we're removing
    updateField('mentionOrgs', formData.mentionOrgs.filter((o) => o !== org))
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
    
    // Match the backend req.body exactly
    const payload = {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        photo_url: formData.photoUrl,
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        created_by: user.id,
        type: user?.type === "business" ? "fundraiser" : "event",
        group_id: user?.group_id 
    }
    
    try {
        const res = await fetch("http://localhost:3000/api/postings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.error("Failed to create posting:", errorData.message);
            return;
        }

        setAddEventOpen(false);
        
    } catch (error) {
        console.error("Network error connecting to backend:", error);
    }
  }

    return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div
        className="fixed inset-0 z-50 bg-black/20"
        onClick={() => setAddEventOpen(false)}
    >
    <motion.div className="fixed right-0 top-0 bg-[#FFDCBE] w-[90vw] min-w-[300px] max-w-[600px] h-screen rounded-tl-[50px] rounded-bl-[50px] shadow-[-12px_0_20px_rgba(0,0,0,0.15)]"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
    >    
        <div className="h-full overflow-y-auto p-8">
            <div className="flex flex-row gap-5 items-center pb-4">
                <div className="w-[50px] h-[50px] rounded-full bg-[#FF4F00] text-white flex items-center justify-center">
                    IMG
                </div>
                <div>
                    <p>{user?.org || user?.businessName || user?.name}</p>
                </div>
            </div>
            <div className="flex flex-row w-full items-center justify-between text-[#FF4F00] text-[32px]">
                <h1>New {user?.type === "business" ? "Fundraiser" : "Event"}</h1>
                <X className="w-[48px] h-[48px] cursor-pointer" onClick={() => setAddEventOpen(false)}></X>
            </div>

            <div className="flex flex-col gap-6">

                <div className="flex flex-col items-center justify-center gap-8 py-2 px-15">
                    
                    <div className="flex flex-col justify-start w-full relative">
                    <label className="flex flex-row justify-between w-full py-2 px-4 text-[#79747E] bg-white border border-[#FF4F00] rounded-[20px]">
                        <input
                        type='text'
                        placeholder='Name your event...'
                        className="w-full outline-none"
                        value={formData.title}
                        onChange={(e) => updateField('title', e.target.value)}
                        />
                        <Pencil/>
                    </label>
                    {errors.title && <p className="absolute top-full pl-4 text-[#FF4F00]">* Title required</p>}    
                    </div>
                    

                    <label className="flex flex-row justify-between w-full py-2 px-4 text-[#79747E] bg-white border border-[#FF4F00] rounded-[20px]">
                        <input
                        type='text'
                        placeholder='Enter location...'
                        className="w-full outline-none"
                        value={formData.location}
                        onChange={(e) => updateField('location', e.target.value)}
                        />
                        <Pencil/>
                    </label>

                    <label className="flex flex-row justify-between items-center w-full py-2 px-4 text-[#79747E] bg-white border border-[#FF4F00] rounded-[20px]">
                        <textarea
                        rows={4}
                        placeholder='Description...'
                        className="w-full h-full outline-none resize-none"
                        value={formData.description}
                        onChange={(e) => updateField('description', e.target.value)}
                        />
                        <Pencil/>
                    </label>
                </div>

                <div className="text-[#FF4F00] text-[24px]">Duration and time?</div>
                
                <div className="flex flex-col justify-center items-center gap-4">
                    
                    <div className="flex flex-col w-full max-w-[630px] justify-start relative">
                    <div className="flex flex-row justify-between items-center py-2 px-4 text-[#79747E] bg-white border border-[#FF4F00] rounded-[20px]">
                        
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
                    
                    <div className="flex flex-col w-full max-w-[630px]">
                    <div className="flex flex-row w-full justify-center items-center gap-4">
                        
                        <div className="basis-[177px] flex-shrink min-w-0 py-2 px-4 text-[#79747E] bg-white border border-[#FF4F00] rounded-[20px]">
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
                        <div className="basis-[177px] flex-shrink min-w-0 py-2 px-4 text-[#79747E] bg-white border border-[#FF4F00] rounded-[20px]">
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
                </div>
            
                <div className="flex flex-col gap-6">
                    <h1 className="text-[#FF4F00] text-[24px]">Mentions</h1>
                    <p className="text-[#4A4459]">Want to collaborate with another organization?</p>

                    <div className="flex flex-col gap-4 justify-center items-center">
                        <select
                            onChange={handleOrgSelect}
                            defaultValue=''
                            className="w-full max-w-[630px] min-h-[45px] px-4 text-[#79747E] bg-white border border-[#FF4F00] rounded-[20px] focus:outline-none"
                        >
                            <option value="" disabled>Select orgs...</option>
                            {options.map((org) => (
                                <option key={org} value={org}>{org}</option>
                            ))}
                        </select>

                        <div className="flex flex-row gap-2">
                            {formData.mentionOrgs.map((org)=> (
                                <div key={org} className="flex flex-row gap-2 p-2 w-fit text-white bg-[#FF4F00] rounded-[10px]"> 
                                    <p>{org}</p>
                                    <X onClick={() => removeMentionedOrg(org)} className="cursor-pointer"/>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-start w-full max-w-[630px] mx-auto relative">
                    <label className="flex flex-row justify-between w-full py-2 px-4 text-[#79747E] bg-white border border-[#FF4F00] rounded-[20px]">
                        <input
                        type='text'
                        placeholder='Enter photo URL...'
                        className="w-full outline-none"
                        value={formData.photoUrl}
                        onChange={(e) => updateField('photoUrl', e.target.value)}
                        />
                        <Pencil/>
                    </label>
                </div>

                <div className="flex justify-center items-center">
                    <button className="w-[339px] h-[76px] rounded-[10px] text-[24px] text-[#FF4F00] border border-[#FF4F00] hover:bg-[#FF4F00] hover:text-white transition-all cursor-pointer"
                        onClick={handleSubmit}
                    >
                        Post listing
                    </button>
                </div>
                
            </div>
        </div>
    </motion.div>
    </div>
    </LocalizationProvider>

  )
}