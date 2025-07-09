import React from "react";
import clsx from "clsx";

interface PurchaseTermsModalProps {
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
  checked: boolean;
  onCheck: (checked: boolean) => void;
}

const terms = [
  {
    title: "Purchase Terms – VR Visual Magics",
    content: [
      "Applies to all digital video invitation templates and project files sold by VR Visual Magics Only, We don't have any other third party distributors or ownership persons.",
      'Giveaways are available only for purchases made on vrvisualmagics.com, by email at vrvisualmagics@gmail.com, or via contact at 9989002428.'
    ]
  },
  {
    title: "License Type: Personal or Client Use Only",
    content: [
      "When you purchase a video template or project file from VR Visual Magics, you receive/accept a non-exclusive, non-transferable license to use the item under the following conditions:"
    ]
  },
  {
    title: "You CAN:",
    content: [
      "Use the file to create a personalized wedding invitation video for yourself or a direct client use.",
      "Edit the text, images, music, or other editable content in the file.",
      "Use the final edited video on social platforms, wedding websites for fair use only.",
      "Customize and deliver a finished video to a client (one-time use only)."
    ]
  },
  {
    title: "You CANNOT:",
    content: [
      "Resell, redistribute, or upload the original or modified file to any marketplace.",
      "Use the files in a mass production, resale business.",
      "Claim ownership or authorship of the original file design or animation.",
      "Give away the files for free in giveaways, groups or forums."
    ]
  },
  {
    title: "Included in Each Download (varies by product)",
    content: []
  },
  {
    title: "Support Policy:",
    content: [
      "We provide basic support for issues related to downloading or opening the file.",
      "We do not offer free editing or software guidance beyond included instructions."
    ]
  },
  {
    title: "Violation Consequences",
    content: [
      "Unauthorized RESALE, DUPLICATION, or DISTRIBUTION of our templates will result in license termination and legal action as per copyright law."
    ]
  }
];

export default function PurchaseTermsModal({
  open,
  onClose,
  onAccept,
  checked,
  onCheck
}: PurchaseTermsModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-[#232946] via-[#1E1B3A] to-[#18122B] rounded-2xl shadow-2xl border border-purple-900/40 w-full max-w-lg mx-4 p-6 relative animate-fade-in">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl font-bold focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-500 text-transparent bg-clip-text">
          Purchase Terms & Conditions
        </h2>
        <div className="max-h-72 overflow-y-auto pr-2 mb-4 text-sm sm:text-base text-white space-y-4">
          {terms.map((section, idx) => (
            <div key={idx}>
              <div className="font-semibold mb-1 text-pink-300">{section.title}</div>
              {section.content.length > 0 && (
                <ul className="list-disc list-inside ml-2 space-y-1">
                  {section.content.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 mb-4">
          <input
            id="terms-checkbox"
            type="checkbox"
            checked={checked}
            onChange={e => onCheck(e.target.checked)}
            className="accent-pink-500 w-4 h-4"
            required
          />
          <label htmlFor="terms-checkbox" className="text-white text-sm select-none">
            I have read and agree to the Purchase Terms
          </label>
        </div>
        <button
          className={clsx(
            "w-full py-2 rounded-lg font-bold transition-colors text-white bg-gradient-to-r from-pink-500 to-indigo-500 shadow-lg",
            !checked && "opacity-60 cursor-not-allowed"
          )}
          disabled={!checked}
          onClick={onAccept}
        >
          Accept & Continue
        </button>
      </div>
    </div>
  );
} 