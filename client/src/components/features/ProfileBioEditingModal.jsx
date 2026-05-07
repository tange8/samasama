import React, { useState, useEffect } from "react";
import { X, Pencil } from "lucide-react";
import { motion } from "framer-motion";

export default function ProfileBioEditingModal({ isVisible, onClose, profile = {}, setProfile }) {
  if (!isVisible) return null;

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    role: "",
    about: "",
    instagram: "",
    facebook: "",
    linked_in: "",
    photo_url: "",
  });

  useEffect(() => {
    setFormData({
      first_name: profile.first_name || "",
      last_name: profile.last_name || "",
      email: profile.email || "",
      role: profile.role || "",
      about: profile.about || "",
      instagram: profile.instagram || "",
      facebook: profile.facebook || "",
      linked_in: profile.linked_in || "",
      photo_url: profile.profileImage || "",
    });
  }, [profile]);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const payload = { ...formData,
        instagram: formData.instagram && !formData.instagram.startsWith('http') 
            ? `https://${formData.instagram}` 
            : formData.instagram,
        linked_in: formData.linked_in && !formData.linked_in.startsWith('http') 
            ? `https://${formData.linked_in}` 
            : formData.linked_in,
        facebook: formData.facebook && !formData.facebook.startsWith('http') 
            ? `https://${formData.facebook}` 
            : formData.facebook,
    };

    try {
      const res = await fetch(`http://localhost:3000/api/profiles/${profile.role}/${profile.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        console.error("Update failed:", err);
        return;
      }

      const updated = await res.json();
      setProfile({
        ...profile,
        ...updated,
      });
      console.log("Updated profile:", updated);

      onClose();
    } catch (err) {
      console.error("Network error:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/20" onClick={() => onClose()}>
      <motion.div
        className="fixed right-0 top-0 bg-[#FFDCBE] w-[90vw] min-w-[300px] max-w-[600px] h-screen rounded-tl-[50px] rounded-bl-[50px] shadow-[-12px_0_20px_rgba(0,0,0,0.15)]"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-full overflow-y-auto p-8">
          <div className="flex flex-row w-full items-center justify-between text-[#FF4F00] text-[32px]">
            <h1>Edit Profile</h1>
            <X className="w-[48px] h-[48px]" onClick={onClose} />
          </div>

          <div className="flex flex-col gap-6 mt-6">
            {/* First + Last Name */}
            <div className="flex flex-col gap-4">
              <label className="flex flex-row justify-between w-full py-2 px-4 bg-white border border-[#FF4F00] rounded-[20px]">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full outline-none"
                  value={formData.first_name}
                  onChange={(e) => updateField("first_name", e.target.value)}
                />
                <Pencil />
              </label>

              <label className="flex flex-row justify-between w-full py-2 px-4 bg-white border border-[#FF4F00] rounded-[20px]">
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full outline-none"
                  value={formData.last_name}
                  onChange={(e) => updateField("last_name", e.target.value)}
                />
                <Pencil />
              </label>
            </div>

            {/* Email */}
            <label className="flex flex-row justify-between w-full py-2 px-4 bg-white border border-[#FF4F00] rounded-[20px]">
              <input
                type="email"
                placeholder="Email"
                className="w-full outline-none"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
              />
              <Pencil />
            </label>

            {/* Profile Image */}
            <label className="flex flex-row justify-between w-full py-2 px-4 bg-white border border-[#FF4F00] rounded-[20px]">
              <input
                type="text"
                placeholder="Photo URL"
                className="w-full outline-none"
                value={formData.photo_url}
                onChange={(e) => updateField("photo_url", e.target.value)}
              />
              <Pencil />
            </label>

            {/* Socials */}
            <div className="flex flex-col gap-4">
              {[
                ["instagram", "Instagram"],
                ["facebook", "Facebook"],
                ["linked_in", "LinkedIn"],
              ].map(([key, label]) => (
                <label key={key} className="flex flex-row justify-between w-full py-2 px-4 bg-white border border-[#FF4F00] rounded-[20px]">
                  <input
                    type="text"
                    placeholder={label}
                    className="w-full outline-none"
                    value={formData[key]}
                    onChange={(e) => updateField(key, e.target.value)}
                  />
                  <Pencil />
                </label>
              ))}
            </div>

            {/* About */}
            <label className="flex flex-row justify-between items-center w-full py-2 px-4 bg-white border border-[#FF4F00] rounded-[20px]">
              <textarea
                rows={4}
                placeholder="About"
                className="w-full outline-none resize-none"
                value={formData.about}
                onChange={(e) => updateField("about", e.target.value)}
              />
              <Pencil />
            </label>

            {/* Submit */}
            <div className="flex justify-center items-center">
              <button
                className="w-[339px] h-[76px] rounded-[10px] text-[24px] text-[#FF4F00] border border-[#FF4F00] hover:bg-[#FF4F00] hover:text-white"
                onClick={handleSubmit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
