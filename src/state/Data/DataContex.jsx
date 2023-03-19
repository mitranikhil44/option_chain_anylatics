import MyContext from "./Contex";
import { useState } from "react";

const DataContex = (props) => {
  const [data, setData] = useState([]);
  return (
    <MyContext.Provider
      value={{data, setData}}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default DataContex;
