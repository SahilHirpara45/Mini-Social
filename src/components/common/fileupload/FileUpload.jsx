import Image from "next/image";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { FaUpload } from "react-icons/fa";

function FileUpload({
  iconName,
  maxFiles,
  maxSize,
  errorText,
  onChange,
  error,
  ...props
}) {
  const [files, setFiles] = useState([]);

  // convert file size bytes to MB
  const bytesToMegaBytes = (bytes) => bytes / 1024 ** 2;

  // handles ondrop function of dropzone
  const handleDropChange = (acceptedFiles, setFiles) => {
    if (acceptedFiles.length > 1) {
      // If more than one file is uploaded, trigger error
      onChange(null); // Clear any existing file
      return;
    }
    setFiles((prevFiles) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      onChange(newFiles);
      return newFiles;
    });
  };

  const buttonStyle = {
    background: "none",
    border: "none",
    color: "#FFCC33",
    textDecoration: "none",
    cursor: "pointer",
    padding: 0,
    fontSize: "16px",
    fontWeight: "bold",
  };

  // preview thumbs
  const thumbs = files.map((file) => (
    <div
      className="dz-preview dz-processing dz-image-preview dz-complete"
      key={file.name}
    >
      <div className="dz-image">
        <Image src={file.preview} alt="preview" fill />
      </div>
    </div>
  ));

  return (
    <>
      <Dropzone
        onDrop={(acceptedFiles) => handleDropChange(acceptedFiles, setFiles)}
        maxFiles={1}
        maxSize={maxSize}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className="dropzone dz-clickable"
            style={{ width: "100%" }}
          >
            <input {...getInputProps()} />
            {files.length === 0 && (
              <div className="dz-message">
                <div className="dz-message-icon">
                  <FaUpload
                    style={{ color: "#FFCC33", width: "30px", height: "28px" }}
                  />
                </div>
                <span className="dz-message-text">
                  drag & drop images and videos
                </span>
                <div
                  className="dz-message-btn"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span> or</span>
                  <button
                    style={buttonStyle}
                    size="md"
                    variant="primary"
                    type="button"
                  >
                    Browse Files
                  </button>
                </div>
              </div>
            )}

            {thumbs}
          </div>
        )}
      </Dropzone>
    </>
  );
}

export default FileUpload;
