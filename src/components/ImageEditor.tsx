import React, { useRef, useState } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import CropperJS from 'cropperjs';

const ImageEditor = ({ onSave }: { onSave: (file: File) => void }) => {
  const [file, setFile] = useState<File | null>(null);
  const cropperRef = useRef<Cropper>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = event.target.files?.[0];
    if (newFile) {
      setFile(newFile);
    }
  };

  const handleSave = () => {
    if (file && cropperRef.current) {
      const croppedCanvas = cropperRef.current.getCroppedCanvas();
      croppedCanvas.toBlob((blob) => {
        if (blob) {
          onSave(new File([blob], file.name));
        }
      });
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {file && (
        <>
          <Cropper
            src={URL.createObjectURL(file)}
            style={{ height: 400, width: '100%' }}
            initialAspectRatio={1}
            aspectRatio={1}
            guides={false}
            // ref={cropperRef}
          />
          <button onClick={handleSave}>Save</button>
        </>
      )}
    </div>
  );
};

export default ImageEditor;
