import React from "react";

type Props = {
  randomData?: string;
};

const card = ({ randomData }: Props) => {
  return (
    <div>
      <h1 className="border p-6 text-white text-md mt-4 border-gray-800 rounded-md">
        {randomData}
      </h1>
    </div>
  );
};

export default card;
