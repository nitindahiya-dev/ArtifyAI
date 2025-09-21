import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import axios from "axios";

type Props = {
  onSelect: (file: File, response: any) => void; // Updated to pass response
  disabled?: boolean;
};

export default function UploadCard({ onSelect, disabled }: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function processFile(f: File) {
    setPreview(URL.createObjectURL(f));
    const formData = new FormData();
    formData.append("file", f);
    try {
      const response = await axios.post("http://localhost:8000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setError(null);
      onSelect(f, response.data); // Pass file and response
    } catch (err) {
      setError("Failed to upload image");
      console.error(err);
    }
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    processFile(f);
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
        <p className="text-gray-400">Upload a photo of your artwork to begin the authentication process</p>
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative group">
          <div className="overflow-hidden rounded-xl border-2 border-gray-800">
            <Image
              src={preview}
              alt="preview"
              className="w-full max-h-[50vh] object-contain transition-transform duration-500 group-hover:scale-105"
              width={500}
              height={500}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              className="btn bg-white text-black hover:bg-gray-100 border border-gray-800"
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
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <div
            className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
              isDragging ? "border-white bg-gray-900" : "border-gray-700 hover:border-gray-600"
            }`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center mb-6 border border-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{isDragging ? "Drop your artwork here" : "Click or drag to upload"}</h3>
              <p className="text-gray-400">JPG, PNG, or WebP (Max 10MB)</p>
            </div>
          </div>
        </motion.div>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}