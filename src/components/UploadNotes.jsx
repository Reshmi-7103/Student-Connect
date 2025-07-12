// src/components/UploadNotes.jsx
import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { FaFileAlt, FaTrash } from "react-icons/fa";

const UploadNotes = ({ path, user }) => {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [filesWithUrls, setFilesWithUrls] = useState([]);

  const handleUpload = async () => {
    if (!file) return alert("Choose a file first!");

    const filePath = `${path}/${file.name}`;
    const { error } = await supabase.storage
      .from("studnotes")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Upload error:", error.message);
      alert("Upload failed.");
    } else {
      alert("Uploaded!");
      fetchFiles();
    }
  };

  const fetchFiles = async () => {
    const { data, error } = await supabase.storage
      .from("studnotes")
      .list(path, { limit: 100 });

    if (error) console.error(error);
    else setFiles(data);
  };

  const getSignedUrl = async (fileName) => {
    const { data } = await supabase.storage
      .from("studnotes")
      .createSignedUrl(`${path}/${fileName}`, 60 * 60 * 24 * 365);
    return data?.signedUrl;
  };

  const deleteFile = async (fileName) => {
    const { error } = await supabase.storage.from("studnotes").remove([`${path}/${fileName}`]);
    if (error) {
      alert("Delete failed");
    } else {
      alert("Deleted!");
      fetchFiles();
    }
  };

  const loadUrls = async () => {
    const urls = await Promise.all(
      files.map(async (file) => ({
        name: file.name,
        url: await getSignedUrl(file.name),
        size: (file.metadata?.size / 1024).toFixed(1) || "N/A",
        created_at: file.created_at || new Date().toISOString(),
      }))
    );
    setFilesWithUrls(urls);
  };

  useEffect(() => {
    fetchFiles();
  }, [path]);

  useEffect(() => {
    if (files.length > 0) loadUrls();
  }, [files]);

  return (
    <div className="bg-white p-4 rounded shadow-md border">
      <h3 className="text-lg font-bold mb-4 text-purple-700">
        Upload Notes in: <span className="underline">{path}</span>
      </h3>

      <div className="flex gap-3 items-center mb-4">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          Upload
        </button>
      </div>

      <h4 className="text-md font-semibold mb-2 text-gray-700">📂 Uploaded Files:</h4>

      {filesWithUrls.length === 0 ? (
        <p className="text-gray-400">No files uploaded yet.</p>
      ) : (
        <ul className="space-y-2">
          {filesWithUrls.map((file, idx) => (
            <li key={idx} className="flex items-center justify-between bg-gray-100 p-2 rounded shadow-sm">
              <div className="flex items-center gap-3">
                <FaFileAlt className="text-blue-600" />
                <a
                  href={file.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-700 font-medium underline"
                >
                  {file.name}
                </a>
                <span className="text-sm text-gray-500">({file.size} KB)</span>
              </div>
              <button
                onClick={() => deleteFile(file.name)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UploadNotes;
