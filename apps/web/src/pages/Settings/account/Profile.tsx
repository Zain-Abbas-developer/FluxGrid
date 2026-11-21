import React, { useState, useRef } from "react";
import {
  User,
  Camera,
  Save,
  Loader2,
  Check,
  Shield,
  Building2,
} from "lucide-react";

export default function Profile(): React.ReactElement {
  // Form State
  const [formData, setFormData] = useState({
    fullName: "Jane Doe",
    email: "jane.doe@example.com",
    role: "Organization Admin",
    organization: "Alpha Corp",
  });

  // UI State
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  
  // Ref for hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsSaved(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API Call
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }, 1000);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 sm:p-6 lg:p-8">
      
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center dark:border-slate-800">
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          <User size={24} className="text-blue-500" />
          PROFILE
        </h1>
      </div>

      {/* PROFILE CARD */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#111827]">
        
        {/* IMAGE SECTION */}
        <div className="flex flex-col items-start gap-6 border-b border-slate-200 p-6 sm:flex-row sm:items-center dark:border-slate-800">
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
              {avatarPreview ? (
                <img 
                  src={avatarPreview} 
                  alt="Profile Preview" 
                  className="h-full w-full object-cover" 
                />
              ) : (
                <User size={40} className="text-slate-300 dark:text-slate-600" />
              )}
            </div>
            {avatarPreview && (
              <button 
                onClick={() => setAvatarPreview(null)}
                className="absolute -right-1 -top-1 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                title="Remove image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            )}
          </div>
          
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Profile Image</h2>
            <p className="text-xs text-slate-500 mb-3 dark:text-slate-400">
              JPG, GIF or PNG. Max size of 800K
            </p>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-[#0f172a] dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <Camera size={16} />
              Upload Image
            </button>
          </div>
        </div>

        {/* FORM SECTION */}
        <div className="space-y-6 p-6">
          
          {/* Full Name */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-[#0f172a] dark:text-white"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-[#0f172a] dark:text-white"
            />
          </div>

          {/* Role (Read-Only) */}
          <div>
            <label className="mb-1 flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
              Role
              <span className="text-[10px] font-normal text-slate-400">(Read-only)</span>
            </label>
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400 cursor-not-allowed">
              <Shield size={16} className="text-slate-400" />
              {formData.role}
            </div>
          </div>

          {/* Organization (Read-Only) */}
          <div>
            <label className="mb-1 flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
              Organization
              <span className="text-[10px] font-normal text-slate-400">(Read-only)</span>
            </label>
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400 cursor-not-allowed">
              <Building2 size={16} className="text-slate-400" />
              {formData.organization}
            </div>
          </div>

        </div>

        {/* FOOTER ACTION */}
        <div className="flex items-center justify-end border-t border-slate-200 bg-slate-50 p-6 rounded-b-xl dark:border-slate-800 dark:bg-[#0f172a]">
          <button
            onClick={handleSave}
            disabled={isSaving || isSaved || !formData.fullName || !formData.email}
            className={`flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-medium text-white transition ${
              isSaved
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-blue-600 hover:bg-blue-700 disabled:opacity-70"
            }`}
          >
            {isSaving ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Saving...
              </>
            ) : isSaved ? (
              <>
                <Check size={16} />
                Saved!
              </>
            ) : (
              <>
                <Save size={16} />
                Save Profile
              </>
            )}
          </button>
        </div>
      </div>

    </div>
  );
}