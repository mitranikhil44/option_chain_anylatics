import React, { useState, useEffect } from "react";
import TotalChgOI from "./option_analytics/TotalChgOI";
import TotalOI from "./option_analytics/TotalOI";
import { useNavigate } from "react-router-dom";
import TotalVol from "./option_analytics/TotalVol";
import ClickableButton from "./ClickableButton";
import { Option_Data } from "./Option_Data";
import { Option_Chain_Chart_Data } from "./Option_Chain_Chart_Data";

const Nifty = (props) => {
  const [data, setData] = useState([]);
  const [niftyOptionData, setNiftyOptionData] = useState([]);
  const [niftyLiveMarketPrice, setNiftyLiveMarketPrice] = useState([]);
  const [showCurrentTableOI, setShowCurrentTableOI] = useState(false);
  const [showChangeTableOI, setShowChangeTableOI] = useState(false);
  const [showCurrentTableVol, setShowCurrentTableVol] = useState(false);
  const navigate = useNavigate();

  const headers = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem("x-auth-token"),
    },
  };

  // Function to get data from API
  useEffect(() => {
    // Get nifty postion data
    fetch(`${props.host}nifty`, headers)
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
      });

    // Get nifty option data
    fetch(`${props.host}nifty_option_chain`, headers)
      .then((res) => res.json())
      .then((data) => {
        const dataCopy = [...data.data];
        const middleData = dataCopy.splice(20, dataCopy.length - 50);
        setNiftyOptionData(middleData);
      });

    // Get nifty live market price
    const fetchData = async () => {
      try {
        const res = await fetch(`${props.host}nifty_market_price`, headers);
        if (!res.ok) {
          throw new Error(`Failed to fetch nifty market price: ${res.status}`);
        }
        const data = await res.json();
        setNiftyLiveMarketPrice(data.data);
      } catch (error) {
        console.error(error);
        // Add more robust error handling here, such as displaying an error message to the user or retrying the fetch after a certain amount of time
      }
    };
    fetchData();
    const fetchInterval = setInterval(fetchData, 1 * 60 * 1000);

    // If user is not authenticated, redirect to login page
    if (localStorage.getItem("x-auth-token")) {
      setTimeout(() => {
        navigate("/nifty");
      }, 1000);
    } else {
      navigate("/login");
    }

    // Stop the interval when the component unmounts to prevent memory leaks
    return () => clearInterval(fetchInterval);

    // eslint-disable-next-line
  }, [props.host]);

  // Function to show current open interest table
  const handleCurrentOI = () => {
    setShowCurrentTableOI(!showCurrentTableOI);
    setShowChangeTableOI(false);
    setShowCurrentTableVol(false);
  };

  // Function to show change open interest table
  const handleChangeOI = () => {
    setShowCurrentTableOI(false);
    setShowChangeTableOI(!showChangeTableOI);
    setShowCurrentTableVol(false);
  };

  // Function to show current volume table
  const handleCurrentVol = () => {
    setShowCurrentTableOI(false);
    setShowChangeTableOI(false);
    setShowCurrentTableVol(!showCurrentTableVol);
  };

  // Preprocess the data to remove commas and dashes
  const processedData = niftyOptionData.map((item) => {
    return {
      CallLTP: item.CallLTP.replace(/,/g, ""),
      CallChgLTP: item.CallChgLTP.replace(/,/g, ""),
      CallVol: item.CallVol.replace(/,/g, ""),
      CallOI: item.CallOI.replace(/,/g, ""),
      CallChgOI: item.CallChgOI.replace(/,/g, ""),
      StrikePrice: item.StrikePrice.replace(/,/g, ""),
      PutChgOI: item.PutChgOI.replace(/,/g, ""),
      PutOI: item.PutOI.replace(/,/g, ""),
      PutVol: item.PutVol.replace(/,/g, ""),
      PutChgLTP: item.PutChgLTP.replace(/,/g, ""),
      PutLTP: item.PutLTP.replace(/,/g, ""),
    };
  });

  // First max no. of nifty option data to show in the table
  const maxValues = processedData.reduce(
    (acc, item) => {
      Object.keys(item).forEach((key, index) => {
        const val = Number(item[key]);
        if (val > acc[index]) {
          acc[index] = val;
        }
      });
      return acc;
    },
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  );

  // Function to check if the condition is met
  const check_condition = (check, i) => {
    if (parseFloat(check.toString().replace(/,/g, "")) === maxValues[i]) {
      return "bg-red-400";
    } else {
      return "";
    }
  };

  return (
    <>
      {/* Show live nifty market price */}
      <div className="bg-gradient-to-r from-slate-400 via-white to-slate-400 text-black p-2 flex items-center my-4">
        <h2 className="text-lg font-medium">Market Price: </h2>
        {niftyLiveMarketPrice.length > 0 && (
          <div className="ml-4">
            <p className="text-xl font-semibold">
              {niftyLiveMarketPrice[niftyLiveMarketPrice.length - 1].price}
            </p>
            <p className="text-sm font-medium text-gray-500">
              Last updated:{" "}
              {niftyLiveMarketPrice[niftyLiveMarketPrice.length - 1].timestamp}
            </p>
          </div>
        )}
      </div>

      {/* Show nifty change OI option data */}
      <Option_Chain_Chart_Data optionData={niftyOptionData} />

      {/* Show Nifty option chain data */}
      <div className="mx-auto w-full text-xs overflow-auto xs:text-sm sm:text-base">
        <table className="w-full text-left table-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-purple-600 to-blue-400 text-white">
              <th className="py-1 px-3">CallLTP</th>
              <th className="py-1 px-3">CallChgLTP</th>
              <th className="py-1 px-3">CallVol</th>
              <th className="py-1 px-3">CallOI</th>
              <th className="py-1 px-3">CallChgOI</th>
              <th className="py-1 px-3">StrikePrice</th>
              <th className="py-1 px-3">PutChgOI</th>
              <th className="py-1 px-3">PutOI</th>
              <th className="py-1 px-3">PutVol</th>
              <th className="py-1 px-3">PutChgLTP</th>
              <th className="py-1 px-3">PutLTP</th>
            </tr>
          </thead>
          <tbody className="text-center">
            <Option_Data
              optionData={niftyOptionData}
              liveMarketPrice={niftyLiveMarketPrice}
              data={data}
              checkCondition={check_condition}
            />
          </tbody>
        </table>
      </div>

      {/* Nifty Current Open Interest Data */}
      <ClickableButton text="Current Open Interest" onClick={handleCurrentOI} />
      {showCurrentTableOI && <TotalOI tabelData={data} />}

      {/* Nifty Change Open Interest Data */}
      <ClickableButton text="Change Open Interest" onClick={handleChangeOI} />
      {showChangeTableOI && <TotalChgOI tabelData={data} />}

      {/* Nifty Current Volume Data */}
      <ClickableButton text="Current Volume" onClick={handleCurrentVol} />
      {showCurrentTableVol && <TotalVol tabelData={data} />}
    </>
  );
};

export default Nifty;
