import React from "react";

export default function UploadDocument({
  handleFileChange,
  setFieldValue,
  files,
  removeFile,
  errors,
  touched
}: any) {
  return (
    <>
      <div className="mb-4">
        <label
          htmlFor="documents"
          className="block text-sm font-medium text-gray-700 mb-2 p-1"
        >
          Upload Claim Document
        </label>
        <div className="relative flex flex-col p-4 text-gray-400 border border-gray-200 rounded">
          <div
            className="relative flex flex-col text-gray-400 border border-gray-200 border-dashed rounded cursor-pointer"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const droppedFiles = e.dataTransfer.files;
              handleFileChange({
                target: { files: droppedFiles },
              } as React.ChangeEvent<HTMLInputElement>);
            }}
          >
            <input
              type="file"
              id="documents"
              name="documents"
              onChange={(event) => {
                handleFileChange(event);
                setFieldValue("documents", event.target.files);
              }}
              className="absolute inset-0 w-full h-full p-0 m-0 opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <svg
                className="w-6 h-6 mr-1 text-current-50"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p>Drag your files here or click in this area.</p>
            </div>
          </div>

          {/* Display the selected files */}
          {files.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mt-4 md:grid-cols-6">
              {files.map((file: any, index: any) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center overflow-hidden text-center bg-gray-100 border rounded cursor-move select-none"
                  style={{ paddingTop: "100%" }}
                >
                  <button
                    className="absolute top-0 right-0 z-50 p-1 bg-white rounded-bl focus:outline-none"
                    type="button"
                    onClick={() => removeFile(index)}
                  >
                    <svg
                      className="w-4 h-4 text-gray-700"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                  {file.type.includes("image/") && (
                    <img
                      className="absolute inset-0 z-0 object-cover w-full h-full border-4 border-white preview"
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                    />
                  )}
                  {file.type.includes("video/") && (
                    <video
                      className="absolute inset-0 object-cover w-full h-full border-4 border-white"
                      controls
                    >
                      <source
                        src={URL.createObjectURL(file)}
                        type="video/mp4"
                      />
                    </video>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 flex flex-col p-2 text-xs bg-white bg-opacity-50">
                    <span className="w-full font-bold text-gray-900 truncate">
                      {file.name}
                    </span>
                    <span className="text-xs text-gray-900">
                      {Math.round(file.size / 1024)} KB
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {errors.documents && touched.documents && (
          <div className="text-red-500 text-sm mt-2">{errors.documents}</div>
        )}
      </div>
    </>
  );
}
