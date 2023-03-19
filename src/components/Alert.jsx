import React from "react";

// Define a function called "Alert" which takes in a "props" object
function Alert(props) {
// Return a div element containing the alert message
  return (
    <div className="h-16 m-1 my-1">
      {/* If the "alert" prop is truthy, render the alert message */}
      {props.alert && (
        <div
          // Add classes to the div element based on the "type" property of the "alert" prop
          className={`px-6 py-4 rounded-lg shadow-lg ${props.alert.type} ${props.alert.type}`}
          role="alert"
        >
          {/* Render the "msg" property of the "alert" prop */}
          <p className="mt-2 text-sm font-bold">{props.alert.msg}</p>
        </div>
      )}
    </div>
  );
}

// Export the "Alert" function as the default export of this module
export default Alert;
