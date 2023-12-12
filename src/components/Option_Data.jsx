import React from "react";

export const OptionData = (props) => {
  return (
    <>
      {props.optionData &&
        props.optionData.map((item, index) => {
          const MarketPrice =
            props.liveMarketPrice[props.liveMarketPrice.length - 1].price;
          const lastTwoDigits = Math.round(MarketPrice % 100);
          const startThreeDigits = String(MarketPrice).substring(0, 3);
          const priceValue =
            lastTwoDigits >= 75 || lastTwoDigits <= 25 ? "50" : "00";
          const strikePrice = parseFloat(item.StrikePrice.replace(/,/g, ""));
          const strikePriceClass =
            strikePrice === parseFloat(startThreeDigits + priceValue)
              ? "border-b-8"
              : "";
          const callVolClass = props.checkCondition(item.CallVol, 2);
          const callOIClass = props.checkCondition(item.CallOI, 3);
          const callChgOIClass = props.checkCondition(item.CallChgOI, 4);
          const putChgOIClass = props.checkCondition(item.PutChgOI, 6);
          const putOIClass = props.checkCondition(item.PutOI, 7);
          const putVolClass = props.checkCondition(item.PutVol, 8);

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
              {strikePrice === parseFloat(startThreeDigits + priceValue) ? (
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
              <td className={`py-1 px-3 border ${putOIClass}`}>{item.PutOI}</td>
              <td className={`py-1 px-3 border ${putVolClass}`}>
                {item.PutVol}
              </td>
              <td className="py-1 px-3 border">{item.PutLTP}</td>
              <td className="py-1 px-3 border">{item.PutChgLTP}</td>
            </tr>
          );
        })}
      {props.data &&
        props.data.slice(-1).map((e, i) => {
          return (
            <tr
              key={i}
              className="text-center hover:bg-gray-700 bg-gradient-to-r from-red-600 to-green-600 text-white"
            >
              <td className="py-1 px-3 border">{e.TotalCallLTP.toFixed(2)}</td>
              <td className="py-1 px-3 border">
                {e.TotalCallChgLTP.toFixed(2)}
              </td>
              <td className="py-1 px-3 border">{e.TotalCallVol.toFixed(2)}</td>
              <td className="py-1 px-3 border">{e.TotalCallOI.toFixed(2)}</td>
              <td className="py-1 px-3 border">
                {e.TotalCallChgOI.toFixed(2)}
              </td>
              <td className="py-1 px-3 border">Total</td>
              <td className="py-1 px-3 border">{e.TotalPutChgOI.toFixed(2)}</td>
              <td className="py-1 px-3 border">{e.TotalPutOI.toFixed(2)}</td>
              <td className="py-1 px-3 border">{e.TotalPutVol.toFixed(2)}</td>
              <td className="py-1 px-3 border">
                {e.TotalPutChgLTP.toFixed(2)}
              </td>
              <td className="py-1 px-3 border">{e.TotalPutLTP.toFixed(2)}</td>
            </tr>
          );
        })}
    </>
  );
};
