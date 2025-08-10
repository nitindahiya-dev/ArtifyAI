// frontend/src/components/UploadCard.tsx
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

type Props = {
  onSelect: (file: File) => void;
  disabled?: boolean;
};

export default function UploadCard({ onSelect, disabled }: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    processFile(f);
  }

  function processFile(f: File) {
    setPreview(URL.createObjectURL(f));
    onSelect(f);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f && f.type.startsWith("image/")) {
      processFile(f);
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Upload Your Artwork</h2>
        <p className="text-indigo-200">Upload a photo of your artwork to begin the authentication process</p>
      </div>

      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFile} 
        disabled={disabled} 
        ref={fileInputRef}
        className="hidden" 
      />

      {preview ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative group"
        >
          <div className="overflow-hidden rounded-xl border-2 border-indigo-500/30">
            <img 
              src={preview} 
              alt="preview" 
              className="w-full max-h-[50vh] object-contain transition-transform duration-500 group-hover:scale-105" 
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              className="btn bg-white/10 backdrop-blur-sm hover:bg-white/20"
              onClick={() => {
                setPreview(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
            >
              Choose Different Artwork
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div 
            className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
              isDragging 
                ? "border-cyan-400 bg-indigo-700/30" 
                : "border-indigo-500/50 hover:border-indigo-400"
            }`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {isDragging ? "Drop your artwork here" : "Click or drag to upload"}
              </h3>
              <p className="text-indigo-300">JPG, PNG, or WebP (Max 10MB)</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}