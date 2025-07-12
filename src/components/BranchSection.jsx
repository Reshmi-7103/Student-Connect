import React from "react";
import UploadNotes from "./UploadNotes";

const BranchSection = ({ year, branch, goBack }) => {
  const path = `${year}/${branch}`;

  return (
    <div>
      <button onClick={goBack} className="text-blue-500 mb-3">← Back to Branches</button>
      <h3 className="font-semibold mb-2">{year} - {branch} Notes</h3>
      <UploadNotes path={path} />
    </div>
  );
};

export default BranchSection;
