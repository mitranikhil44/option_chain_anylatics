import React from "react";

const TotalOI = (props) => {
  return (
    <div>
      <table className="table-auto w-full text-center text-[0.5rem] xxs:text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
        <thead className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
          <tr className="font-bold text-white">
            <th className="px-2 py-1 border">Date</th>
            <th className="px-2 py-1 border">Difference</th>
            <th className="px-2 py-1 border">PCR</th>
            <th className="px-2 py-1 border">Option Signal</th>
            <th className="px-2 py-1 border">Market Price</th>
          </tr>
        </thead>
        <tbody>
          {props.tabelData &&
            props.tabelData.map((item, index) => (
              <tr
                key={index}
                className="bg-gradient-to-r from-blue-600 to-purple-600"
              >
                <td className="px-2 py-1 border">{item.date}</td>
                <td className="px-2 py-1 border">
                  {item.TotalCallOI - item.TotalPutOI}
                </td>
                <td className="px-2 py-1 border">
                  {(item.TotalPutOI / item.TotalCallOI).toFixed(2)}
                </td>
                <td
                  className={`px-2 py-1 border ${
                    (item.TotalPutOI / item.TotalCallOI).toFixed(2) >= 1
                      ? "bg-gradient-to-r from-green-400 to-blue-500 text-white"
                      : "bg-gradient-to-r from-red-600 to-sky-400 text-white"
                  }`}
                >
                  {(item.TotalPutOI / item.TotalCallOI).toFixed(2) >= 1
                    ? "Call"
                    : "Put"}
                </td>
                <td className="px-2 py-1 border">{item.liveMarketPrice}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TotalOI;
