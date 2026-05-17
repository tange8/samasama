import React, { useState } from 'react'
import { X, Pencil, ChevronDown } from 'lucide-react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { motion } from "framer-motion"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { useAuth } from '../../context/AuthContext'
dayjs.extend(advancedFormat)

export const CreatePostingModal = ({ setAddEventOpen }) => {
    const options = ['Kababayan', 'Fusion', 'Pass', 'Puso'];
    const { user } = useAuth();

    const [errors, setErrors] = useState({
        title: '', startDate: '', endDate: '', startClock: '', endClock: '',
    })

    const [formData, setFormData] = useState({
        title: '', location: '', description: '',
        startDate: null, endDate: null, startClock: null, endClock: null,
        mentionOrgs: [], photoUrl: ''
    })

    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleOrgSelect = (e) => {
        const value = e.target.value
        if (value && !formData.mentionOrgs.includes(value)) {
            updateField('mentionOrgs', [...formData.mentionOrgs, value])
        }
        e.target.value = ''
    }

    const removeMentionedOrg = (org) => {
        updateField('mentionOrgs', formData.mentionOrgs.filter((o) => o !== org))
    }

    const combineDateTime = (date, time) => {
        if (!date || !time) return null
        return dayjs(date).hour(dayjs(time).hour()).minute(dayjs(time).minute()).second(0).millisecond(0)
    }

    const validateForm = () => {
        const newErrors = {}
        if (!formData.title.trim()) newErrors.title = 'Event title is required'
        if (!formData.startDate) newErrors.startDate = 'Start date is required'
        if (!formData.endDate) newErrors.endDate = 'End date is required'
        if (!formData.startClock) newErrors.startClock = 'Start time is required'
        if (!formData.endClock) newErrors.endClock = 'End time is required'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async () => {
        const isValid = validateForm()
        if (!isValid) return

        const startTime = combineDateTime(formData.startDate, formData.startClock)
        const endTime = combineDateTime(formData.endDate, formData.endClock)

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
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            if (!res.ok) {
                const errorData = await res.json();
                console.error("Failed to create posting:", errorData.message);
                return;
            }
            setAddEventOpen(false);
        } catch (error) {
            console.error("Network error:", error);
        }
    }

    const inputClass = "h-12 rounded-xl bg-white px-4 outline-none border border-transparent focus:border-[#FF9B00] focus:ring-4 focus:ring-[#FF9B00]/15 transition-all w-full text-[#070154]"
    const labelClass = "text-[#070154] font-semibold text-[15px]"
    const sectionClass = "flex flex-col gap-2"

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div
                className="fixed inset-0 z-50 bg-black/20"
                onClick={() => setAddEventOpen(false)}
            >
                <motion.div
                    className="fixed right-0 top-0 bg-[#FFF4EA] w-[92vw] max-w-[650px] h-screen rounded-tl-[40px] rounded-bl-[40px] shadow-[-10px_0_40px_rgba(0,0,0,0.15)]"
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="h-full overflow-y-auto p-8 flex flex-col gap-6">

                        {/* Header */}
                        <div className="flex justify-between items-center">
                            <h1 className="text-[28px] font-black text-[#070154]">
                                New {user?.type === "business" ? "Fundraiser" : "Event"}
                            </h1>
                            <button
                                onClick={() => setAddEventOpen(false)}
                                className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#070154] hover:bg-[#FF9B00]/10 transition-all active:scale-95"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Posted by */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#FF1B29] text-white flex items-center justify-center text-sm font-bold">
                                {user?.name?.[0] || "U"}
                            </div>
                            <span className="text-[#070154] font-medium">
                                {user?.org || user?.businessName || user?.name}
                            </span>
                        </div>

                        {/* Title */}
                        <div className={sectionClass}>
                            <label className={labelClass}>Event Title</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Name your event..."
                                    className={inputClass}
                                    value={formData.title}
                                    onChange={(e) => updateField('title', e.target.value)}
                                />
                                {errors.title && <p className="text-[#FF1B29] text-sm mt-1">* Title required</p>}
                            </div>
                        </div>

                        {/* Location */}
                        <div className={sectionClass}>
                            <label className={labelClass}>Location</label>
                            <input
                                type="text"
                                placeholder="Enter location..."
                                className={inputClass}
                                value={formData.location}
                                onChange={(e) => updateField('location', e.target.value)}
                            />
                        </div>

                        {/* Description */}
                        <div className={sectionClass}>
                            <label className={labelClass}>Description</label>
                            <textarea
                                rows={4}
                                placeholder="Description..."
                                className="rounded-xl bg-white px-4 py-3 outline-none border border-transparent focus:border-[#FF9B00] focus:ring-4 focus:ring-[#FF9B00]/15 transition-all w-full text-[#070154] resize-none"
                                value={formData.description}
                                onChange={(e) => updateField('description', e.target.value)}
                            />
                        </div>

                        {/* Dates */}
                        <div className={sectionClass}>
                            <label className={labelClass}>Date</label>
                            <div className="flex items-center gap-3 bg-white rounded-xl px-4 border border-transparent focus-within:border-[#FF9B00] transition-all">
                                <DatePicker
                                    label="Start Date"
                                    value={formData.startDate}
                                    onChange={(v) => updateField('startDate', v)}
                                    format="MMMM Do, YYYY"
                                    slotProps={{ textField: { size: 'small', sx: { '& fieldset': { border: 'none' } } } }}
                                />
                                <span className="text-[#070154]/50">to</span>
                                <DatePicker
                                    label="End Date"
                                    value={formData.endDate}
                                    onChange={(v) => updateField('endDate', v)}
                                    minDate={formData.startDate}
                                    format="MMMM Do, YYYY"
                                    slotProps={{ textField: { size: 'small', sx: { '& fieldset': { border: 'none' } } } }}
                                />
                            </div>
                            {(errors.startDate || errors.endDate) && <p className="text-[#FF1B29] text-sm">* Missing start and/or end date</p>}
                        </div>

                        {/* Times */}
                        <div className={sectionClass}>
                            <label className={labelClass}>Time</label>
                            <div className="flex items-center gap-3 bg-white rounded-xl px-4 border border-transparent focus-within:border-[#FF9B00] transition-all">
                                <TimePicker
                                    label="Start Time"
                                    value={formData.startClock}
                                    onChange={(v) => updateField('startClock', v)}
                                    slots={{ openPickerIcon: () => <ChevronDown /> }}
                                    slotProps={{ textField: { size: 'small', sx: { '& fieldset': { border: 'none' } } } }}
                                />
                                <span className="text-[#070154]/50">to</span>
                                <TimePicker
                                    label="End Time"
                                    value={formData.endClock}
                                    onChange={(v) => updateField('endClock', v)}
                                    minTime={formData.startClock}
                                    slots={{ openPickerIcon: () => <ChevronDown /> }}
                                    slotProps={{ textField: { size: 'small', sx: { '& fieldset': { border: 'none' } } } }}
                                />
                            </div>
                            {(errors.startClock || errors.endClock) && <p className="text-[#FF1B29] text-sm">* Missing start and/or end time</p>}
                        </div>

                        {/* Mentions */}
                        <div className={sectionClass}>
                            <label className={labelClass}>Mentions</label>
                            <p className="text-[#070154]/60 text-sm">Want to collaborate with another organization?</p>
                            <select
                                onChange={handleOrgSelect}
                                defaultValue=""
                                className="h-12 rounded-xl bg-white px-4 outline-none border border-transparent focus:border-[#FF9B00] transition-all text-[#070154] cursor-pointer"
                            >
                                <option value="" disabled>Select orgs...</option>
                                {options.map((org) => (
                                    <option key={org} value={org}>{org}</option>
                                ))}
                            </select>
                            <div className="flex flex-wrap gap-2">
                                {formData.mentionOrgs.map((org) => (
                                    <div key={org} className="flex items-center gap-2 px-3 py-1 bg-[#FF9B00]/20 text-[#070154] rounded-full text-sm">
                                        <span>{org}</span>
                                        <X size={14} onClick={() => removeMentionedOrg(org)} className="cursor-pointer" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Photo URL */}
                        <div className={sectionClass}>
                            <label className={labelClass}>Photo URL</label>
                            <input
                                type="text"
                                placeholder="Enter photo URL..."
                                className={inputClass}
                                value={formData.photoUrl}
                                onChange={(e) => updateField('photoUrl', e.target.value)}
                            />
                        </div>

                        {/* Submit */}
                        <button
                            className="w-full py-3 rounded-xl font-semibold bg-[#FF9B00] text-white hover:bg-[#e68c00] transition-all active:scale-98 cursor-pointer"
                            onClick={handleSubmit}
                        >
                            Post Listing
                        </button>

                    </div>
                </motion.div>
            </div>
        </LocalizationProvider>
    )
}