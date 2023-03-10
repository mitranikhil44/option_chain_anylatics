import React, { useState, useEffect } from "react";
import TotalChgOI from "./option_analytics/TotalChgOI";
import TotalOI from "./option_analytics/TotalOI";
import TotalVol from "./option_analytics/TotalVol";
import ClickableButton from "./ClickableButton";

const Nifty = (props) => {
  const [data, setData] = useState([]);
  const [niftyOptionData, setNiftyOptionData] = useState([]);
  const [niftyLiveMarketPrice, setNiftyLiveMarketPrice] = useState([]);
  const [showCurrentTableOI, setShowCurrentTableOI] = useState(false);
  const [showChangeTableOI, setShowChangeTableOI] = useState(false);
  const [showCurrentTableVol, setShowCurrentTableVol] = useState(false);

  // Function to get data from API
  useEffect(() => {
    // Get nifty postion data
    fetch(`${props.host}nifty`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });

    // Get nifty option data
    fetch(`${props.host}nifty_option_chain`)
      .then((res) => res.json())
      .then((data) => {
        const dataCopy = [...data.data];
        const middleData = dataCopy.splice(20, dataCopy.length - 60);
        setNiftyOptionData(middleData);
      });

    // Get nifty live market price
    const fetchData = async () => {
      try {
        const res = await fetch(`${props.host}nifty_market_price`);
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

    // Stop the interval when the component unmounts to prevent memory leaks
    return () => clearInterval(fetchInterval);
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
              <th className="py-1 px-3">strikePrice</th>
              <th className="py-1 px-3">PutChgOI</th>
              <th className="py-1 px-3">PutOI</th>
              <th className="py-1 px-3">PutVol</th>
              <th className="py-1 px-3">PutChgLTP</th>
              <th className="py-1 px-3">PutLTP</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {niftyOptionData &&
              niftyOptionData.map((item, index) => {
                const liveMarketPrice =
                  niftyLiveMarketPrice[niftyLiveMarketPrice.length - 1].price;
                const lastTwoDigits = liveMarketPrice % 100;
                const startThreeDigits = Math.floor(liveMarketPrice / 100);
                const priceValue =
                  lastTwoDigits >= 75 || lastTwoDigits < 25 ? "50" : "00";
                const strikePrice = parseFloat(
                  item.StrikePrice.replace(/,/g, "")
                );

                const strikePriceClass =
                  strikePrice === parseFloat(startThreeDigits + priceValue)
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
                    parseFloat(startThreeDigits + priceValue) ? (
                      <td className="py-1 px-3 border relative">
                        <span className="font-bold">
                          {item.StrikePrice}
                          <div className="text-xs left-[12%] top-[81.25%] xs:text-sm xs:left-[11%] xs:top-[80.25%] sm:text-base sm:left-[11%] sm:top-[76.25%] lg:left-[12%] xl:left-[15%] 2xl:left-[25%] 3xl absolute  text-gray-600">
                            <span className="bg-gray-200 rounded-full py-0.5 px-2">
                              {liveMarketPrice}
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
            {data.data && (
              <tr
                key={0}
                className="text-center hover:bg-gray-700 bg-gradient-to-r from-red-600 to-green-600 text-white"
              >
                <td className="py-1 px-3 border">
                  {data.data[0].TotalCallLTP.toFixed(2)}
                </td>
                <td className="py-1 px-3 border">
                  {data.data[0].TotalCallChgLTP.toFixed(2)}
                </td>
                <td className="py-1 px-3 border">
                  {data.data[0].TotalCallVol.toFixed(2)}
                </td>
                <td className="py-1 px-3 border">
                  {data.data[0].TotalCallOI.toFixed(2)}
                </td>
                <td className="py-1 px-3 border">
                  {data.data[0].TotalCallChgOI.toFixed(2)}
                </td>
                <td className="py-1 px-3 border">Total</td>
                <td className="py-1 px-3 border">
                  {data.data[0].TotalPutChgOI.toFixed(2)}
                </td>
                <td className="py-1 px-3 border">
                  {data.data[0].TotalPutOI.toFixed(2)}
                </td>
                <td className="py-1 px-3 border">
                  {data.data[0].TotalPutVol.toFixed(2)}
                </td>
                <td className="py-1 px-3 border">
                  {data.data[0].TotalPutChgLTP.toFixed(2)}
                </td>
                <td className="py-1 px-3 border">
                  {data.data[0].TotalPutLTP.toFixed(2)}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Nifty Current Open Interest Data */}
      <ClickableButton text="Current Open Interest" onClick={handleCurrentOI} />
      {showCurrentTableOI && <TotalOI tabelData={data.data} />}

      {/* Nifty Change Open Interest Data */}
      <ClickableButton text="Change Open Interest" onClick={handleChangeOI} />
      {showChangeTableOI && <TotalChgOI tabelData={data.data} />}

      {/* Nifty Current Volume Data */}
      <ClickableButton text="Current Volume" onClick={handleCurrentVol} />
      {showCurrentTableVol && <TotalVol tabelData={data.data} />}
    </>
  );
};

export default Nifty;
