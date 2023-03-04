import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, LinearScale, CategoryScale } from "chart.js";
import "chart.js/auto";

Chart.register(LinearScale);
Chart.register(CategoryScale);

const Home = (props) => {
  const [niftyLiveMarketPrice, setNiftyLiveMarketPrice] = useState([]);
  const [bankNiftyLiveMarketPrice, setBankNiftyLiveMarketPrice] = useState([]);
  const [finNiftyLiveMarketPrice, setFinNiftyLiveMarketPrice] = useState([]);

  // Function to get data from API
  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const [niftyRes, bankNiftyRes, finNiftyRes] = await Promise.all([
          fetch(`${props.host}nifty_market_price`),
          fetch(`${props.host}bank_nifty_market_price`),
          fetch(`${props.host}fin_nifty_market_price`),
        ]);
        const [niftyData, bankNiftyData, finNiftyData] = await Promise.all([
          niftyRes.json(),
          bankNiftyRes.json(),
          finNiftyRes.json(),
        ]);
        setNiftyLiveMarketPrice(niftyData.data);
        setBankNiftyLiveMarketPrice(bankNiftyData.data);
        setFinNiftyLiveMarketPrice(finNiftyData.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMarketData();
    // Schedule the market data fetch every 1 minutes`
    let intervalId = setInterval(fetchMarketData, 1 * 60 * 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [props.host]);

// Function to create chart data for a given market
function createChartData(marketData, marketName) {
  const chartData = {
    labels: marketData.map((item) => item.timestamp),
    datasets: [
      {
        label: `${marketName} Live Change Volume`,
        data: marketData.map((item) => item.volume),
        fill: false,
        backgroundColor: marketData.map((item) =>
          item.volume >= 0 ? "green" : "red"
        ),
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };
  return chartData;
}

// Create chart data for each market
const niftyChartData = createChartData(niftyLiveMarketPrice, "Nifty");
const bankNiftyChartData = createChartData(bankNiftyLiveMarketPrice, "Bank Nifty");
const finNiftyChartData = createChartData(finNiftyLiveMarketPrice, "Fin Nifty");


  return (
    <>
      {/* Nifty 50 chart and price */}
      <div>
        <div className="bg-gradient-to-r from-slate-400 via-white to-slate-500 text-black p-2 flex items-center my-4">
          <h2 className="text-lg font-medium">Market Price: </h2>
          {niftyLiveMarketPrice.length > 0 && (
            <div className="ml-4">
              <p className="text-xl font-semibold">
                {niftyLiveMarketPrice[niftyLiveMarketPrice.length - 1].price}
              </p>
              <p className="text-sm font-medium text-gray-500">
                Last updated:{" "}
                {
                  niftyLiveMarketPrice[niftyLiveMarketPrice.length - 1]
                    .timestamp
                }
              </p>
            </div>
          )}
        </div>

        {/* Live Nifty 50 Price */}
        <div className="w-full mx-auto my-4 lg:my-8">
          <Bar
            key="nifty-chart"
            data={niftyChartData}
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
                  labels: niftyLiveMarketPrice.map((item) => item.timestamp),
                },
              },
            }}
            plugins={{ legend: false }}
          />
        </div>
      </div>

      {/* Bank Nifty chart and price */}
      <div>
        <div className="bg-gradient-to-r from-slate-400 via-white to-slate-500 text-black p-2 flex items-center my-4">
          <h2 className="text-lg font-medium">Market Price: </h2>
          {bankNiftyLiveMarketPrice.length > 0 && (
            <div className="ml-4">
              <p className="text-xl font-semibold">
                {
                  bankNiftyLiveMarketPrice[bankNiftyLiveMarketPrice.length - 1]
                    .price
                }
              </p>
              <p className="text-sm font-medium text-gray-500">
                Last updated:{" "}
                {
                  bankNiftyLiveMarketPrice[bankNiftyLiveMarketPrice.length - 1]
                    .timestamp
                }
              </p>
            </div>
          )}
        </div>

        {/* Live Bank Nifty Price */}
        <div className="w-full mx-auto my-4 lg:my-8">
          <Bar
            key="bank-nifty-chart"
            data={bankNiftyChartData}
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
                  labels: bankNiftyLiveMarketPrice.map(
                    (item) => item.timestamp
                  ),
                },
              },
            }}
            plugins={{ legend: false }}
          />
        </div>
      </div>

      {/* Fin Nifty chart and price */}
      <div>
        <div className="bg-gradient-to-r from-slate-400 via-white to-slate-500 text-black p-2 flex items-center my-4">
          <h2 className="text-lg font-medium">Market Price: </h2>
          {finNiftyLiveMarketPrice.length > 0 && (
            <div className="ml-4">
              <p className="text-xl font-semibold">
                {
                  finNiftyLiveMarketPrice[finNiftyLiveMarketPrice.length - 1]
                    .price
                }
              </p>
              <p className="text-sm font-medium text-gray-500">
                Last updated:{" "}
                {
                  finNiftyLiveMarketPrice[finNiftyLiveMarketPrice.length - 1]
                    .timestamp
                }
              </p>
            </div>
          )}
        </div>

        {/* Live Fin Nifty Price */}
        <div className="w-full mx-auto my-4 lg:my-8">
          <Bar
            key="fin-nifty-chart"
            data={finNiftyChartData}
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
                  labels: finNiftyLiveMarketPrice.map((item) => item.timestamp),
                },
              },
            }}
            plugins={{ legend: false }}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
