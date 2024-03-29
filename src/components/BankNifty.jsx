import React, { useState, useEffect } from "react";
import TotalChgOI from "./option_analytics/TotalChgOI";
import TotalOI from "./option_analytics/TotalOI";
import TotalVol from "./option_analytics/TotalVol";
import { useNavigate } from "react-router-dom";
import ClickableButton from "./ClickableButton";
import { OptionChainChartData } from "./Option_Chain_Chart_Data";
const BankNifty = (props) => {
  const [data, setData] = useState([]);
  const [bankNiftyOptionData, setBankNiftyOptionData] = useState([]);
  const [bankNiftyLiveMarketPrice, setBankNiftyLiveMarketPrice] = useState([]);
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
    const fetchBankNifty = async () => {
      await fetch(`${props.host}bank_nifty`, headers)
        .then((res) => res.json())
        .then((data) => {
          setData(data.data);
        });
    };

    const fetchBankNiftyOP = async () => {
      // Get bank nifty option data
      await fetch(`${props.host}bank_nifty_option_chain`, headers)
        .then((res) => res.json())
        .then((data) => {
          setBankNiftyOptionData(data.data);
        });
    };

    fetchBankNifty();
    fetchBankNiftyOP();

    // Get bank nifty live market price
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${props.host}bank_nifty_market_price`,
          headers
        );
        if (!res.ok) {
          throw new Error(
            `Failed to fetch bank nifty market price: ${res.status}`
          );
        }
        const data = await res.json();
        setBankNiftyLiveMarketPrice(data.data);
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
        navigate("/bank_nifty");
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
  const processedData = bankNiftyOptionData.map((item) => {
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

  // First max no. of bank nifty option data to show in the table
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

  const check_condition = (check, i) => {
    if (parseFloat(check.toString().replace(/,/g, "")) === maxValues[i]) {
      return "bg-red-400";
    } else {
      return "";
    }
  };

  return (
    <>
      {/* Show live bank nifty market price */}
      <div className="bg-gradient-to-r from-slate-400 via-white to-slate-400 text-black p-2 flex items-center my-4">
        <h2 className="text-lg font-medium">Market Price: </h2>
        {bankNiftyLiveMarketPrice.length > 0 && (
          <div className="ml-4">
            <p className="text-xl font-semibold" id="liveMarketPrice">
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

      {/* Show bank nifty change OI optin data */}
      <div className="overflow-x-auto my-3">
        <OptionChainChartData optionData={bankNiftyOptionData} />
      </div>

      {/* Show Bank Nifty option chain data */}
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
          <tbody>
            {bankNiftyOptionData &&
              bankNiftyOptionData.map((item, index) => {
                const MarketPrice =
                  bankNiftyLiveMarketPrice[bankNiftyLiveMarketPrice.length - 1]
                    .price;
                const lastTwoDigits = Math.round(MarketPrice % 100);
                const startTwoDigits = String(MarketPrice).substring(0, 2);
                const midOneDigit = String(MarketPrice).substring(2, 3);
                const priceValue =
                  lastTwoDigits >= 50 ? parseInt(midOneDigit) + 1 : midOneDigit;
                const strikePrice = parseFloat(
                  item.StrikePrice.replace(/,/g, "")
                );
                const strikePriceClass =
                  strikePrice === parseFloat(startTwoDigits + priceValue + "00")
                    ? "border-b-8"
                    : "";
                const callVolClass = check_condition(item.CallVol, 2);
                const callOIClass = check_condition(item.CallOI, 3);
                const callChgOIClass = check_condition(item.CallChgOI, 4);
                const putChgOIClass = check_condition(item.PutChgOI, 6);
                const putOIClass = check_condition(item.PutOI, 7);
                const putVolClass = check_condition(item.PutVol, 8);

                return (
                  <tr
                    key={index}
                    className={`hover:bg-gray-700 bg-gradient-to-r from-sky-400 to-indigo-600 ${strikePriceClass}`}
                  >
                    <td className="py-1 px-3 border">{item.CallLTP}</td>
                    <td className="py-1 px-3 border">{item.CallChgLTP}</td>
                    <td className={`py-1 px-3 border ${callVolClass}`}>
                      {item.CallVol}
                    </td>
                    <td className={`py-1 px-3 border ${callOIClass}`}>
                      {item.CallOI}
                    </td>
                    <td className={`py-1 px-3 border ${callChgOIClass}`}>
                      {item.CallChgOI}
                    </td>
                    {strikePrice ===
                    parseFloat(startTwoDigits + priceValue + "00") ? (
                      <td className="py-1 px-3 border relative">
                        <span className="font-bold">
                          {item.StrikePrice}
                          <div className="text-xs left-[12%] top-[81.25%] xs:text-sm xs:left-[11%] xs:top-[80.25%] sm:text-base sm:left-[11%] sm:top-[76.25%] lg:left-[12%] xl:left-[15%] 2xl:left-[25%] 3xl absolute  text-gray-600">
                            <span className="bg-gray-200 rounded-full py-0.5 px-2">
                              {MarketPrice}
                            </span>
                          </div>
                        </span>
                      </td>
                    ) : (
                      <td className="py-1 px-3 border">{item.StrikePrice}</td>
                    )}
                    <td className={`py-1 px-3 border ${putChgOIClass}`}>
                      {item.PutChgOI}
                    </td>
                    <td className={`py-1 px-3 border ${putOIClass}`}>
                      {item.PutOI}
                    </td>
                    <td className={`py-1 px-3 border ${putVolClass}`}>
                      {item.PutVol}
                    </td>
                    <td className="py-1 px-3 border">{item.PutLTP}</td>
                    <td className="py-1 px-3 border">{item.PutChgLTP}</td>
                  </tr>
                );
              })}
            {data &&
              data.slice(-1).map((e, i) => {
                return (
                  <tr
                    key={i}
                    className="text-center hover:bg-gray-700 bg-gradient-to-r from-red-600 to-green-600 text-white"
                  >
                    <td className="py-1 px-3 border">
                      {e.TotalCallLTP.toFixed(2)}
                    </td>
                    <td className="py-1 px-3 border">
                      {e.TotalCallChgLTP.toFixed(2)}
                    </td>
                    <td className="py-1 px-3 border">
                      {e.TotalCallVol.toFixed(2)}
                    </td>
                    <td className="py-1 px-3 border">
                      {e.TotalCallOI.toFixed(2)}
                    </td>
                    <td className="py-1 px-3 border">
                      {e.TotalCallChgOI.toFixed(2)}
                    </td>
                    <td className="py-1 px-3 border">Total</td>
                    <td className="py-1 px-3 border">
                      {e.TotalPutChgOI.toFixed(2)}
                    </td>
                    <td className="py-1 px-3 border">
                      {e.TotalPutOI.toFixed(2)}
                    </td>
                    <td className="py-1 px-3 border">
                      {e.TotalPutVol.toFixed(2)}
                    </td>
                    <td className="py-1 px-3 border">
                      {e.TotalPutChgLTP.toFixed(2)}
                    </td>
                    <td className="py-1 px-3 border">
                      {e.TotalPutLTP.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
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

export default BankNifty;
