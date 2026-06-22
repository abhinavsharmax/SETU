"use client";

import React, { useState, useEffect } from "react";
import {
  Award,
  Mountain,
  Users,
  CheckCircle2,
  ArrowRight,
  Loader2,
  Heart,
  Sun,
  Volume2,
  Check,
  ChevronRight,
  ChevronDown,
  Globe,
  Star,
  Camera,
  X as CloseIcon,
  Shield
} from "lucide-react";

// Custom SVG Icons for Social Channels to avoid lucide-react brand dependency issues
const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2C5.12 19.5 12 19.5 12 19.5s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

// Definitions of quick appreciation options
const APPRECIATION_OPTIONS = [
  {
    id: "road-quality",
    icon: Award,
    emoji: "🎖️",
    label: "Outstanding Road Quality",
    template: "I would like to express my sincere appreciation for the outstanding road quality maintained by BRO. The smooth transit significantly reduces travel time and wear on vehicles.",
  },
  {
    id: "harsh-terrain",
    icon: Mountain,
    emoji: "🏔️",
    label: "Commendable Work in Harsh Terrain",
    template: "Kudos to BRO for their remarkable and selfless service in connecting remote border areas under extremely harsh terrain and weather conditions. Truly the nation's pride!",
  },
  {
    id: "responsive-personnel",
    icon: Users,
    emoji: "🤝",
    label: "Helpful & Responsive Personnel",
    template: "My heartfelt thanks to the helpful, polite, and responsive BRO personnel stationed along the highways. Their dedication to safety and assistance is commendable.",
  },
];

const SOCIAL_CHANNELS = [
  {
    name: "X",
    handle: "@BROindia",
    action: "Follow",
    icon: XIcon,
    url: "https://x.com/BROindia",
    color: "bg-black text-white hover:bg-zinc-900",
  },
  {
    name: "Instagram",
    handle: "border__roads__organisation",
    action: "Follow",
    icon: InstagramIcon,
    url: "https://www.instagram.com/border__roads__organisation?igsh=MTA3eGN0b3NvY2hvOQ==",
    color: "bg-[#E1306C] text-white hover:bg-[#D1225B]",
  },
  {
    name: "YouTube",
    handle: "BRO India Official",
    action: "Subscribe",
    icon: YoutubeIcon,
    url: "https://youtube.com",
    color: "bg-[#FF0000] text-white hover:bg-[#E00000]",
  },
  {
    name: "Facebook",
    handle: "Border Roads Organisation",
    action: "Like",
    icon: FacebookIcon,
    url: "https://facebook.com",
    color: "bg-[#1877F2] text-white hover:bg-[#166FE5]",
  },
];

const PROJECT_OPTIONS = [
  "PROJECT DEEPAK / 108 RCC",
  "PROJECT DEEPAK / 68 RCC",
  "PROJECT DEEPAK / 94 RCC",
  "PROJECT DEEPAK / 70 RCC",
];

export default function FeedbackPortal() {
  // App States
  const [selectedProject, setSelectedProject] = useState(PROJECT_OPTIONS[0]);
  const [showProjectDropdown, setShowProjectDropdown] = useState(false);
  const [selectedPill, setSelectedPill] = useState<string | null>(null);
  const [customFeedback, setCustomFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [audioFeedback, setAudioFeedback] = useState(false);

  // Google Maps Star Rating States
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);

  // Photo Upload States
  const [photos, setPhotos] = useState<string[]>([]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      const newUrls = fileList.map(file => URL.createObjectURL(file));
      setPhotos(prev => [...prev, ...newUrls].slice(0, 4)); // limit to 4 photos
      if (audioFeedback) {
        speakText(`Added ${fileList.length} photos`);
      }
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
    if (audioFeedback) {
      speakText("Removed photo");
    }
  };

  const getRatingLabel = (val: number) => {
    switch (val) {
      case 1: return "Very Poor";
      case 2: return "Poor";
      case 3: return "Average";
      case 4: return "Good";
      case 5: return "Excellent";
      default: return "Select rating";
    }
  };

  // Character Limit Constant
  const CHAR_LIMIT = 500;

  // Sync quick select pill choices with custom feedback textarea
  const handlePillSelect = (id: string, template: string) => {
    if (selectedPill === id) {
      // Toggle off
      setSelectedPill(null);
      setCustomFeedback("");
    } else {
      setSelectedPill(id);
      setCustomFeedback(template);
      if (audioFeedback) {
        speakText(`Selected: ${labelForId(id)}`);
      }
    }
  };

  const labelForId = (id: string) => {
    return APPRECIATION_OPTIONS.find(opt => opt.id === id)?.label || "";
  };

  // Textarea input handler ensuring character limit constraint
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= CHAR_LIMIT) {
      setCustomFeedback(value);
      // Unselect pill if user changes text away from templates
      const matchingPill = APPRECIATION_OPTIONS.find(opt => opt.template === value);
      if (!matchingPill) {
        setSelectedPill(null);
      } else {
        setSelectedPill(matchingPill.id);
      }
    }
  };

  // Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (audioFeedback) {
      speakText("Submitting feedback to Border Roads Organisation.");
    }

    // Simulate network latency (excellent for 3G/4G low bandwidth simulation)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (audioFeedback) {
        speakText("Submission successful. Jai Hind!");
      }
    }, 1800);
  };

  // Reset/Restart form
  const handleReset = () => {
    setSelectedPill(null);
    setCustomFeedback("");
    setRating(0);
    setPhotos([]);
    setIsSubmitted(false);
  };

  // Text-To-Speech Accessibility Helper (ideal for high-altitude/glare accessibility)
  const speakText = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-IN";
      window.speechSynthesis.speak(utterance);
    }
  };

  // Trigger speech on initial success screen render
  useEffect(() => {
    if (isSubmitted && audioFeedback) {
      speakText("Thank you for your appreciation. Your kudos has been submitted to Border Roads Organisation. Jai Hind!");
    }
  }, [isSubmitted, audioFeedback]);

  return (
    <div className={`w-full max-w-md mx-auto min-h-[820px] shadow-lg rounded-3xl overflow-hidden flex flex-col transition-all duration-300 relative ${highContrast
      ? "bg-black border-4 border-yellow-400 text-yellow-400"
      : "bg-white text-slate-800 border border-slate-200/80"
      }`}>
      {/* Tricolor Accent Bar */}
      {!highContrast && (
        <div className="h-[4px] w-full flex">
          <div className="h-full flex-1 bg-[#FF9933]" />
          <div className="h-full flex-1 bg-white" />
          <div className="h-full flex-1 bg-[#138808]" />
        </div>
      )}

      {/* Accessibility Bar */}
      <div className={`px-4 py-2 flex items-center justify-between text-[11px] transition-colors duration-200 border-b ${highContrast
        ? "bg-yellow-400 text-black border-yellow-500 font-bold"
        : "bg-[#f8f9fa] text-slate-600 border-slate-200/60"
        }`}>
        <div className="flex items-center gap-1.5 font-medium tracking-wide">
          <Globe className="w-3.5 h-3.5 stroke-[1.5]" />
          <span className="font-semibold uppercase tracking-wider">GOVERNMENT OF INDIA</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setAudioFeedback(!audioFeedback)}
            className={`flex items-center gap-1 transition-all ${audioFeedback
              ? highContrast ? "underline font-extrabold text-black" : "text-blue-600 font-semibold"
              : "opacity-80 hover:opacity-100"
              }`}
            aria-label="Toggle Screen Reader Voice Prompts"
            type="button"
          >
            <Volume2 className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Voice: {audioFeedback ? "ON" : "OFF"}</span>
          </button>
          <button
            onClick={() => setHighContrast(!highContrast)}
            className={`flex items-center gap-1 transition-all ${highContrast
              ? "underline font-extrabold text-black"
              : "opacity-80 hover:opacity-100"
              }`}
            aria-label="Toggle Outdoor Glare Mode"
            type="button"
          >
            <Sun className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>{highContrast ? "Normal Mode" : "Outdoor Mode"}</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex flex-col justify-between">
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between overflow-hidden">
            {/* Header: Distinct Government Header Panel */}
            <div className={`px-4.5 py-3.5 border-b transition-colors duration-200 ${highContrast
              ? "bg-black border-yellow-400 border-dashed"
              : "bg-slate-50 border-slate-200/85"
            }`}>
              <div className="flex items-center justify-between">
                {/* Left Side: BRO Crest & bold text "BRO" */}
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-xl border flex flex-col items-center justify-center w-9 h-9 ${highContrast ? "border-yellow-400 bg-black" : "border-slate-200 bg-white shadow-sm"
                    }`}>
                    <svg className={`w-5 h-5 ${highContrast ? "stroke-yellow-400" : "stroke-slate-700"}`} viewBox="0 0 48 48" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M 24 4 L 40 10 V 22 C 40 33, 33 41, 24 44 C 15 41, 8 33, 8 22 V 10 L 24 4 Z" />
                      <path d="M 12 28 L 19 18 L 26 28" strokeWidth="2" />
                      <path d="M 22 28 L 29 16 L 36 28" strokeWidth="2" />
                      <path d="M 24 24 Q 22 34 26 40" strokeWidth="2.5" className={highContrast ? "stroke-yellow-400" : "stroke-[#FF9933]"} />
                    </svg>
                  </div>
                  <span className={`text-sm font-black tracking-wider ${highContrast ? "text-yellow-400" : "text-slate-800"}`}>
                    BRO
                  </span>
                </div>

                {/* Center Side: Title and tag */}
                <div className="flex flex-col items-center text-center flex-1 px-2">
                  <h2 className={`text-xs font-extrabold tracking-tight leading-tight ${highContrast ? "text-yellow-400" : "text-slate-800 uppercase"}`}>
                    SETU System
                  </h2>
                  <p className={`text-[8px] font-bold uppercase tracking-wider scale-[0.9] mt-0.5 whitespace-nowrap ${highContrast ? "text-yellow-400" : "text-slate-455"}`}>
                    Transit Engagement Utility
                  </p>
                </div>

                {/* Right Side: National Emblem of India */}
                <div className="flex flex-col items-center justify-center" aria-hidden="true">
                  <svg className={`w-6 h-8 ${highContrast ? "fill-yellow-400" : "fill-slate-800"}`} viewBox="0 0 100 130">
                    <path d="M 50 15 C 55 15, 60 18, 62 25 C 64 30, 64 45, 60 52 C 57 56, 52 58, 50 58 C 48 58, 43 56, 40 52 C 36 45, 36 30, 38 25 C 40 18, 45 15, 50 15 Z" />
                    <circle cx="50" cy="72" r="12" strokeWidth="2.5" className={highContrast ? "stroke-black" : "stroke-slate-800"} fill="none" />
                    <path d="M 50 60 L 50 84 M 38 72 L 62 72 M 41.5 63.5 L 58.5 80.5 M 41.5 80.5 L 58.5 63.5" strokeWidth="1.5" className={highContrast ? "stroke-black" : "stroke-slate-800"} />
                    <rect x="35" y="88" width="30" height="6" rx="2" />
                    <path d="M 45 98 L 55 98 M 40 104 L 60 104 M 35 110 L 65 110" strokeWidth="2.5" strokeLinecap="round" className={highContrast ? "stroke-yellow-400" : "stroke-amber-600"} />
                  </svg>
                </div>
              </div>
            </div>

            {/* Scrollable Form Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Formation Dropdown Selector Card */}
              <div className={`p-4 rounded-2xl border transition-all ${highContrast
                ? "border-yellow-400 bg-black"
                : "bg-[#f8fafc] border-[#e2e8f0]"
              }`}>
                <label className={`block text-[10px] font-extrabold tracking-wider uppercase mb-1.5 ${highContrast ? "text-yellow-400" : "text-slate-550"}`}>
                  Select Active Formation / Project
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowProjectDropdown(!showProjectDropdown)}
                    className={`w-full py-2.5 px-3.5 rounded-xl border flex items-center justify-between text-left transition-all ${highContrast
                      ? "border-yellow-400 bg-black text-yellow-400 font-bold"
                      : "border-slate-200 bg-white text-slate-800 hover:border-slate-350 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600/30"
                    }`}
                    aria-expanded={showProjectDropdown}
                  >
                    <span className="text-sm font-semibold">{selectedProject}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showProjectDropdown ? "rotate-180" : ""
                      } ${highContrast ? "text-yellow-400" : "text-slate-500"}`} />
                  </button>

                  {showProjectDropdown && (
                    <div className={`absolute z-25 w-full mt-1 rounded-xl border shadow-lg max-h-52 overflow-y-auto ${highContrast
                      ? "bg-black border-yellow-400 text-yellow-400"
                      : "bg-white border-slate-200 text-slate-800"
                    }`}>
                      {PROJECT_OPTIONS.map((proj) => (
                        <button
                          key={proj}
                          type="button"
                          onClick={() => {
                            setSelectedProject(proj);
                            setShowProjectDropdown(false);
                            if (audioFeedback) speakText(`Project selected: ${proj}`);
                          }}
                          className={`w-full text-left py-2.5 px-4 text-sm font-medium border-b border-slate-100 last:border-0 transition-colors ${highContrast
                            ? "hover:bg-yellow-400 hover:text-black border-yellow-500/30"
                            : "hover:bg-slate-50 border-slate-100/50"
                          }`}
                        >
                          {proj}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Section 1: Appreciation Category Card */}
              <div className={`p-4 rounded-2xl border transition-all ${highContrast
                ? "bg-black border-yellow-400"
                : "bg-[#fffbeb] border-[#fde68a]"
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`text-[11px] font-extrabold tracking-wider uppercase ${highContrast ? "text-yellow-400" : "text-amber-900"}`}>
                    1. Appreciation Category
                  </h3>
                  <span className={`text-[8px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${highContrast ? "bg-yellow-400 text-black" : "bg-amber-100 text-amber-800"}`}>
                    Quick-Select
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {APPRECIATION_OPTIONS.map((opt) => {
                    const IconComponent = opt.icon;
                    const isSelected = selectedPill === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handlePillSelect(opt.id, opt.template)}
                        className={`flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all duration-200 ${isSelected
                          ? highContrast
                            ? "bg-yellow-400 text-black border-yellow-400 font-extrabold"
                            : "bg-white border-amber-500 text-amber-950 ring-1 ring-amber-500/30 shadow-sm"
                          : highContrast
                            ? "bg-black text-yellow-400 border-yellow-400/50 hover:border-yellow-400"
                            : "bg-white/80 text-slate-750 border-slate-200 hover:border-slate-350 hover:bg-white"
                        }`}
                        aria-pressed={isSelected}
                      >
                        <div className={`p-2 rounded-lg transition-all ${isSelected
                          ? highContrast
                            ? "bg-black text-yellow-400"
                            : "bg-amber-500 text-white"
                          : highContrast
                            ? "bg-yellow-400/20 text-yellow-400"
                            : "bg-amber-50 text-amber-600"
                        }`}>
                          <IconComponent className="w-3.5 h-3.5 stroke-[2]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold truncate">{opt.label}</p>
                          <p className={`text-[9px] truncate ${isSelected
                            ? highContrast ? "text-black/80 font-bold" : "text-amber-800 font-semibold"
                            : "text-slate-400"
                          }`}>Select preset message</p>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 transition-all ${isSelected
                          ? highContrast
                            ? "border-black bg-black text-yellow-400"
                            : "border-amber-500 bg-amber-500 text-white"
                          : highContrast
                            ? "border-yellow-400/30"
                            : "border-slate-200"
                        }`}>
                          {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Section 2: Transit Experience Rating Card */}
              <div className={`p-4 rounded-2xl border transition-all ${highContrast
                ? "bg-black border-yellow-400"
                : "bg-[#f0f9ff] border-[#bae6fd]"
              }`}>
                <h3 className={`text-[11px] font-extrabold tracking-wider uppercase mb-3 ${highContrast ? "text-yellow-400" : "text-blue-900"}`}>
                  2. Transit Experience Rating
                </h3>

                <div className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${highContrast
                  ? "border-yellow-400 bg-black"
                  : "bg-white/90 border-blue-200"
                }`}>
                  <div className="flex items-center gap-3">
                    {[1, 2, 3, 4, 5].map((starIdx) => {
                      const isActive = starIdx <= (hoveredRating || rating);
                      return (
                        <button
                          key={starIdx}
                          type="button"
                          onClick={() => {
                            setRating(starIdx);
                            if (audioFeedback) {
                              speakText(`Rated ${starIdx} stars: ${getRatingLabel(starIdx)}`);
                            }
                          }}
                          onMouseEnter={() => setHoveredRating(starIdx)}
                          onMouseLeave={() => setHoveredRating(0)}
                          className="p-0.5 transition-transform active:scale-95 focus:outline-none cursor-pointer"
                          aria-label={`Rate ${starIdx} stars out of 5: ${getRatingLabel(starIdx)}`}
                        >
                          <Star className={`w-7 h-7 transition-all ${isActive
                            ? highContrast
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-amber-500 fill-amber-500 stroke-amber-500"
                            : highContrast
                              ? "text-yellow-400/30 fill-none"
                              : "text-slate-350 fill-none stroke-[1.5]"
                          }`} />
                        </button>
                      );
                    })}
                  </div>
                  <div className={`text-xs font-semibold ${rating > 0
                    ? highContrast ? "text-yellow-400" : "text-slate-800"
                    : "text-slate-500"
                  }`}>
                    {rating > 0
                      ? `${rating} / 5 - ${getRatingLabel(rating)}`
                      : "Tap to select rating"
                    }
                  </div>
                </div>
              </div>

              {/* Section 3: Message & Supporting Photos Card */}
              <div className={`p-4 rounded-2xl border transition-all ${highContrast
                ? "bg-black border-yellow-400"
                : "bg-[#faf5ff] border-[#ebd4ff]"
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`text-[11px] font-extrabold tracking-wider uppercase ${highContrast ? "text-yellow-400" : "text-purple-900"}`}>
                    3. Message & Supporting Photos
                  </h3>
                  <span className={`text-[8px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full ${highContrast ? "bg-yellow-400 text-black" : "bg-purple-100 text-purple-750"}`}>
                    Optional
                  </span>
                </div>

                <div className={`rounded-xl border transition-all overflow-hidden ${highContrast
                  ? "bg-black border-yellow-400"
                  : "bg-white border-slate-200 focus-within:border-purple-400 focus-within:ring-1 focus-within:ring-purple-400/30"
                }`}>
                  {/* Textarea */}
                  <div className="relative">
                    <textarea
                      value={customFeedback}
                      onChange={handleTextareaChange}
                      className={`w-full min-h-[90px] max-h-[140px] p-3.5 text-sm resize-none bg-transparent focus:outline-none placeholder:text-slate-400 placeholder:text-slate-400/70 ${highContrast ? "text-yellow-400 placeholder:text-yellow-400/50" : "text-slate-800"
                      }`}
                      placeholder="Add a message for our border heroes..."
                      maxLength={CHAR_LIMIT}
                      aria-label="Custom Feedback Message"
                    />

                    {/* Character Count */}
                    <div className={`absolute bottom-2.5 right-3 text-[9px] font-semibold select-none ${highContrast
                      ? "text-yellow-400 bg-black/95 px-1 py-0.5 rounded"
                      : "text-slate-400 bg-white/95 px-1 py-0.5 rounded"
                    }`}>
                      {customFeedback.length} / {CHAR_LIMIT}
                    </div>
                  </div>

                  {/* Thin division line inside card */}
                  <div className={`border-t ${highContrast ? "border-yellow-400" : "border-slate-100"}`} />

                  {/* Photos Upload row */}
                  <div className={`p-3.5 ${highContrast ? "bg-black" : "bg-slate-50/50"}`}>
                    <div className="flex flex-wrap gap-2 items-center">
                      {/* Add Photo Button */}
                      {photos.length < 4 && (
                        <label className={`w-11 h-11 rounded-lg border border-dashed flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-95 active:scale-90 ${highContrast
                          ? "border-yellow-400 bg-black text-yellow-400 hover:bg-yellow-400/20"
                          : "border-slate-300 bg-white hover:bg-slate-100/50 text-slate-555 hover:border-slate-400"
                        }`}>
                          <Camera className="w-4 h-4 stroke-[1.5]" />
                          <span className="text-[7px] font-bold mt-0.5 uppercase tracking-wide">Add</span>
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handlePhotoChange}
                            className="hidden"
                            aria-label="Upload photos"
                          />
                        </label>
                      )}

                      {/* Photo Thumbnails */}
                      {photos.map((photoUrl, index) => (
                        <div key={photoUrl} className="relative w-11 h-11 rounded-lg overflow-hidden border border-slate-200/80 bg-white flex-shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={photoUrl} alt="Feedback preview" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            className={`absolute top-0.5 right-0.5 p-0.5 rounded-full shadow-sm hover:scale-110 active:scale-90 transition-all ${highContrast
                              ? "bg-yellow-400 text-black"
                              : "bg-red-500 text-white hover:bg-red-600"
                            }`}
                            aria-label={`Remove photo ${index + 1}`}
                          >
                            <CloseIcon className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      ))}

                      {photos.length === 0 && (
                        <span className="text-[11px] text-slate-450 font-medium ml-1">
                          Attach up to 4 photos of conditions.
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 4: Stay Connected Card */}
              <div className={`p-4 rounded-2xl border transition-all ${highContrast
                ? "bg-black border-yellow-400"
                : "bg-[#fff1f2] border-[#ffe4e6]"
              }`}>
                <h3 className={`text-[11px] font-extrabold tracking-wider uppercase mb-3 ${highContrast ? "text-yellow-400" : "text-rose-900"}`}>
                  4. Stay Connected
                </h3>

                {/* Horizontal Scroll Row for Social Taps */}
                <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-none snap-x snap-mandatory">
                  {SOCIAL_CHANNELS.map((social) => {
                    const SocialIcon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-none snap-start w-[125px] p-2.5 rounded-xl border flex flex-col justify-between transition-all ${highContrast
                          ? "bg-black border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                          : `bg-white/95 border-rose-100 text-slate-800 hover:border-rose-300 hover:shadow-sm`
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className={`p-1.5 rounded-lg ${highContrast ? "bg-yellow-400/20 text-yellow-400" : "bg-rose-50 text-rose-600"}`}>
                            <SocialIcon className="w-3.5 h-3.5" />
                          </div>
                          <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded-full ${highContrast
                            ? "bg-yellow-400 text-black"
                            : "bg-[#fff1f2] text-rose-750"
                          }`}>
                            {social.action}
                          </span>
                        </div>
                        <div className="mt-2.5">
                          <p className="text-xs font-bold leading-tight">{social.name}</p>
                          <p className="text-[9px] text-slate-450 font-medium truncate">{social.handle}</p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Thin Line Division before Button */}
            <div className={`border-t my-2.5 ${highContrast ? "border-yellow-400 border-dashed" : "border-slate-100"}`} />

            {/* Primary Action Button & MoD Secure Footer */}
            <div className="pt-1 bg-inherit px-4 pb-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 rounded-xl flex items-center justify-center text-xs font-extrabold uppercase tracking-wider transition-all duration-300 ${isSubmitting
                  ? highContrast
                    ? "bg-yellow-400/50 text-black border border-yellow-400 cursor-not-allowed"
                    : "bg-slate-200 text-slate-450 cursor-not-allowed"
                  : highContrast
                    ? "bg-yellow-400 text-black hover:bg-yellow-300 active:scale-[0.98]"
                    : "bg-[#1a73e8] text-white hover:bg-blue-700 active:scale-[0.99] shadow-md shadow-blue-500/10"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit Feedback"}
              </button>

              <div className="mt-4 flex flex-col items-center justify-center gap-2">
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase border transition-all ${highContrast
                  ? "bg-black border-yellow-400 text-yellow-400"
                  : "bg-emerald-50/70 border-emerald-150 text-emerald-800"
                }`}>
                  <Shield className="w-3 h-3 text-emerald-600 fill-emerald-600/10" />
                  <span>Secure Transmission to Ministry of Defence</span>
                </div>
                
                <div className="flex flex-col items-center justify-center gap-0.5 text-slate-400 text-[8px] font-semibold select-none">
                  <p>Encrypted data transmitted directly to official BRO systems.</p>
                  <div className="flex items-center gap-1 mt-1 text-[7px] text-slate-400 font-medium">
                    <span>Portal Design:</span>
                    <span className={`font-semibold ${highContrast ? "text-yellow-400" : "text-slate-650"}`}>Polardot</span>
                    <span>&</span>
                    <span className={`font-semibold ${highContrast ? "text-yellow-400" : "text-slate-650"}`}>S+UM Architects</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        ) : (
          /* SUCCESS STATE: "Thank You / Jai Hind" Screen */
          <div className="flex-1 flex flex-col justify-between p-6 text-center animate-fade-in my-auto">
            {/* Top Success Branding */}
            <div className="space-y-5 my-auto">
              {/* Emblem / Ashoka Chakra */}
              <div className="flex justify-center">
                <div className={`relative p-0.5 rounded-full ${highContrast ? "" : "bg-gradient-to-tr from-[#FF9933] via-slate-100 to-[#138808] p-[1.5px]"}`}>
                  <div className={`p-4 rounded-full ${highContrast ? "bg-black border-4 border-yellow-400" : "bg-white"}`}>
                    <CheckCircle2 className={`w-12 h-12 ${highContrast ? "text-yellow-400" : "text-[#138808]"}`} />
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className="space-y-1.5">
                <h2 className={`text-xl font-bold tracking-tight ${highContrast ? "text-yellow-400" : "text-slate-800"}`}>
                  Kudos Submitted Successfully
                </h2>
                <div className="flex items-center justify-center gap-1">
                  <span className={`h-1 w-6 rounded-full ${highContrast ? "bg-yellow-400" : "bg-[#FF9933]"}`} />
                  <span className={`h-1 w-2 rounded-full ${highContrast ? "bg-yellow-400" : "bg-slate-200"}`} />
                  <span className={`h-1 w-6 rounded-full ${highContrast ? "bg-yellow-400" : "bg-[#138808]"}`} />
                </div>
              </div>

              {/* Feedback Summary Card with Thin Line Divisions */}
              <div className={`p-4 rounded-xl border text-left space-y-3 ${highContrast ? "border-yellow-400 bg-black" : "bg-slate-50/50 border-slate-200"
                }`}>
                <div>
                  <span className={`text-[9px] font-bold uppercase tracking-wider block ${highContrast ? "text-yellow-400" : "text-slate-400"}`}>
                    Project Formation
                  </span>
                  <span className="text-sm font-semibold text-slate-800">{selectedProject}</span>
                </div>

                <div className={`border-t ${highContrast ? "border-yellow-400" : "border-slate-205/60"}`} />

                {rating > 0 && (
                  <>
                    <div>
                      <span className={`text-[9px] font-bold uppercase tracking-wider block ${highContrast ? "text-yellow-400" : "text-slate-400"}`}>
                        Experience Rating
                      </span>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-sm font-bold text-slate-800 mr-1">{rating}/5</span>
                        <div className="flex">
                          {"★".repeat(rating).split("").map((s, idx) => (
                            <Star key={idx} className="w-3.5 h-3.5 fill-amber-500 stroke-amber-500 text-amber-500" />
                          ))}
                          {"☆".repeat(5 - rating).split("").map((s, idx) => (
                            <Star key={idx} className="w-3.5 h-3.5 stroke-slate-300 text-slate-300 fill-none" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className={`border-t ${highContrast ? "border-yellow-400" : "border-slate-205/60"}`} />
                  </>
                )}

                {selectedPill && (
                  <>
                    <div>
                      <span className={`text-[9px] font-bold uppercase tracking-wider block ${highContrast ? "text-yellow-400" : "text-slate-400"}`}>
                        Appreciation Category
                      </span>
                      <span className="text-sm font-semibold text-slate-800">{labelForId(selectedPill)}</span>
                    </div>
                    <div className={`border-t ${highContrast ? "border-yellow-400" : "border-slate-205/60"}`} />
                  </>
                )}

                <div>
                  <span className={`text-[9px] font-bold uppercase tracking-wider block ${highContrast ? "text-yellow-400" : "text-slate-400"}`}>
                    Message Dispatched
                  </span>
                  <p className={`text-sm italic mt-1 leading-relaxed ${highContrast ? "text-yellow-400" : "text-slate-600"}`}>
                    "{customFeedback || "Thank you for building our border roads!"}"
                  </p>
                </div>

                {photos.length > 0 && (
                  <>
                    <div className={`border-t ${highContrast ? "border-yellow-400" : "border-slate-205/60"}`} />
                    <div>
                      <span className={`text-[9px] font-bold uppercase tracking-wider block ${highContrast ? "text-yellow-400" : "text-slate-400"}`}>
                        Attached Photos ({photos.length})
                      </span>
                      <div className="flex gap-1.5 mt-1.5 flex-wrap">
                        {photos.map((photoUrl) => (
                          <div key={photoUrl} className="w-8 h-8 rounded-md overflow-hidden border border-slate-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={photoUrl} alt="Dispatched attachment" className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <p className={`text-xs font-medium leading-relaxed px-2 ${highContrast ? "text-yellow-400" : "text-slate-500"}`}>
                Your words of appreciation fuel the spirits of the brave personnel keeping our borders connected and secure.
              </p>
            </div>

            {/* Bottom Brand Action */}
            <div className={`space-y-4 pt-4 border-t flex flex-col items-center ${highContrast ? "border-yellow-400 border-dashed" : "border-slate-100"}`}>
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase border transition-all ${highContrast
                ? "bg-black border-yellow-400 text-yellow-400"
                : "bg-emerald-50/70 border-emerald-150 text-emerald-800"
              }`}>
                <Shield className="w-3 h-3 text-emerald-600 fill-emerald-600/10" />
                <span>Logged with Ministry of Defence</span>
              </div>

              <div className="flex flex-col items-center">
                <span className={`text-lg font-black tracking-widest ${highContrast ? "text-yellow-400" : "text-slate-700"
                  }`}>
                  JAI HIND
                </span>
                <span className={`text-[8px] font-bold uppercase tracking-widest mt-0.5 ${highContrast ? "text-yellow-400" : "text-slate-400"}`}>
                  Connecting Borders, Connecting Minds
                </span>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className={`w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${highContrast
                  ? "bg-black border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                  : "border border-slate-200 hover:bg-slate-50 text-slate-700 bg-white"
                  }`}
              >
                <span>Submit Another Feedback</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
