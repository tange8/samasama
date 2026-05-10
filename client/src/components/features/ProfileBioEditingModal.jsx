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
    const payload = {
      ...formData,
      instagram: formData.instagram && !formData.instagram.startsWith("http")
        ? `https://${formData.instagram}`
        : formData.instagram,
      linked_in: formData.linked_in && !formData.linked_in.startsWith("http")
        ? `https://${formData.linked_in}`
        : formData.linked_in,
      facebook: formData.facebook && !formData.facebook.startsWith("http")
        ? `https://${formData.facebook}`
        : formData.facebook,
    };

    try {
      const res = await fetch(
        `http://localhost:3000/api/profiles/${profile.role}/${profile.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) return;

      const updated = await res.json();

      setProfile({
        ...profile,
        ...updated,
      });

      onClose();
    } catch (err) {
      console.error("Network error:", err);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/20"
      onClick={onClose}
    >
      <motion.div
        className="fixed right-0 top-0 bg-[#FFF4EA] w-[90vw] min-w-[320px] max-w-[620px] h-screen rounded-tl-[40px] rounded-bl-[40px] shadow-[-12px_0_30px_rgba(0,0,0,0.18)]"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-full overflow-y-auto p-8">

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-[34px] font-black text-[#070154]">
              Edit Profile
            </h1>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#FF1B29] hover:bg-[#FF1B29]/10 transition-all"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-col gap-5">

            {/* Name */}
            <div className="flex flex-col gap-3">
              <InputBox
                value={formData.first_name}
                placeholder="First Name"
                onChange={(e) => updateField("first_name", e.target.value)}
              />
              <InputBox
                value={formData.last_name}
                placeholder="Last Name"
                onChange={(e) => updateField("last_name", e.target.value)}
              />
            </div>

            {/* Email */}
            <InputBox
              value={formData.email}
              placeholder="Email"
              onChange={(e) => updateField("email", e.target.value)}
            />

            {/* Photo */}
            <InputBox
              value={formData.photo_url}
              placeholder="Profile Image URL"
              onChange={(e) => updateField("photo_url", e.target.value)}
            />

            {/* Socials */}
            <div className="flex flex-col gap-3">
              {[
                ["instagram", "Instagram"],
                ["facebook", "Facebook"],
                ["linked_in", "LinkedIn"],
              ].map(([key, label]) => (
                <InputBox
                  key={key}
                  value={formData[key]}
                  placeholder={label}
                  onChange={(e) => updateField(key, e.target.value)}
                />
              ))}
            </div>

            {/* About */}
            <div className="bg-white rounded-2xl border border-[#FF1B29]/20 p-4 flex items-start gap-3">
              <textarea
                rows={4}
                placeholder="About"
                className="w-full outline-none resize-none text-[#070154]"
                value={formData.about}
                onChange={(e) => updateField("about", e.target.value)}
              />
              <Pencil size={18} className="text-[#FF1B29]" />
            </div>

            {/* Save */}
            <button
              onClick={handleSubmit}
              className="mt-6 h-12 rounded-xl bg-[#FF1B29] text-white font-semibold hover:bg-[#d91422] active:scale-[0.98] transition-all"
            >
              Save Changes
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* Small reusable input block (keeps your code clean) */
function InputBox({ value, placeholder, onChange }) {
  return (
    <div className="bg-white rounded-2xl border border-[#FF1B29]/20 px-4 py-3 flex items-center gap-3">
      <input
        className="w-full outline-none text-[#070154]"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      <Pencil size={18} className="text-[#FF1B29]" />
    </div>
  );
}
