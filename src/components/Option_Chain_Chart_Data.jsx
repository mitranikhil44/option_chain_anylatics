import React from "react";
import { Chart, LinearScale, CategoryScale } from "chart.js";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
Chart.register(LinearScale);
Chart.register(CategoryScale);

export const Option_Chain_Chart_Data = (props) => {
  const marketName = "Nifty";
  const labels = props.optionData.map((item) => item.StrikePrice);
  const callData = props.optionData.map((item) =>
    item.CallChgOI.replace(/,/g, "")
  );
  const putData = props.optionData.map((item) =>
    item.PutChgOI.replace(/,/g, "")
  );
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: `${marketName} CallChgOI Data`,
        data: callData,
        backgroundColor: "green",
        fill: false,
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: `${marketName} PutChgOI Data`,
        data: putData,
        backgroundColor: "red",
        fill: false,
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };
  return (
    <>
      {/* Live Nifty 50 Price */}
      <div className="w-[500%] xs:w-[400%] sm:w-[300%] lg:w-[200%] 2xl:w-[100%] mx-auto my-4 lg:my-8">
        <Bar
          key="nifty-option-chart"
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            scales: {
              y: {
                type: "linear",
                beginAtZero: false,
              },
              x: {
                type: "category",
                labels: props.optionData.map((item) => item.StrikePrice),
              },
            },
          }}
          plugins={{ legend: false }}
        />
      </div>
    </>
  );
};
