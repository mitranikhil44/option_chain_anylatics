import React, {useEffect, useState} from "react";
import { Line } from 'react-chartjs-2';

const TotalChgChgOI = (props) => {
  const [PCR, setPCR] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const pcrData = props.tabelData.map((item) => {
        let itemPCR = item.TotalPutChgOI && item.TotalCallChgOI ? item.TotalPutChgOI / item.TotalCallChgOI : 0;
        itemPCR = isNaN(itemPCR) ? 0 : itemPCR;
        return itemPCR;
      });
      setPCR(pcrData);
    }
    fetchData();
    // eslint-disable-next-line
  }, [])
  
  const chartData = {
    labels: props.tabelData.map(item => item.date),
    datasets: [
      {
        label: 'PCR',
        data: PCR,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1
      }
    ]
  };
  
  return (
    <div>
      <div className="my-6">
      <Line data={chartData} />
      </div>
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
                  {item.TotalCallChgOI - item.TotalPutChgOI}
                </td>
                <td className="px-2 py-1 border">
                  {(item.TotalPutChgOI / item.TotalCallChgOI).toFixed(2)}
                </td>
                <td
                  className={`px-2 py-1 border ${
                    (item.TotalPutChgOI / item.TotalCallChgOI).toFixed(2) >= 1
                      ? "bg-gradient-to-r from-green-400 to-blue-500 text-white"
                      : "bg-gradient-to-r from-red-600 to-sky-400 text-white"
                  }`}
                >
                  {(item.TotalPutChgOI / item.TotalCallChgOI).toFixed(2) >= 1
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

export default TotalChgChgOI;
