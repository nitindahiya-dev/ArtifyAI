import React, { useState } from "react";

type Props = {
  onSelect: (file: File) => void;
  disabled?: boolean;
};

export default function UploadCard({ onSelect, disabled }: Props) {
  const [preview, setPreview] = useState<string | null>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setPreview(URL.createObjectURL(f));
    onSelect(f);
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-2">Upload artwork photo</h3>
      <div className="mb-4">
        <input type="file" accept="image/*" onChange={handleFile} disabled={disabled} />
      </div>

      {preview ? (
        <div className="mb-4">
          <img src={preview} alt="preview" className="max-h-64 object-contain rounded-md border" />
        </div>
      ) : (
        <div className="mb-4 small">Choose a JPG/PNG photo of the artwork to get an AI report and CID</div>
      )}
    </div>
  );
}
