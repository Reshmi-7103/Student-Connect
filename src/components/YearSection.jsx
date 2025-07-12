import React, { useState } from "react";
import BranchSection from "./BranchSection";

const YearSection = ({ year, goBack }) => {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const branches = ["IT", "CS", "EXTC", "CIVIL", "MECH", "CHEM", "AIDS"];

  return (
    <div>
      <button onClick={goBack} className="text-blue-500 mb-4">← Back to Years</button>
      <h3 className="text-lg font-semibold mb-2">Select Branch for {year}:</h3>
      {!selectedBranch ? (
        <div className="grid grid-cols-2 gap-3">
          {branches.map((branch) => (
            <button
              key={branch}
              onClick={() => setSelectedBranch(branch)}
              className="bg-green-200 py-2 rounded"
            >
              {branch}
            </button>
          ))}
        </div>
      ) : (
        <BranchSection year={year} branch={selectedBranch} goBack={() => setSelectedBranch(null)} />
      )}
    </div>
  );
};

export default YearSection;
