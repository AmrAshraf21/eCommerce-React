// import React from "react";
// import { Navigate } from "react-router-dom";

// const ProductRoute = ({ children }) => {
// 	const loggedIn = true;

// 	return <div>{loggedIn ? <>{children}</> : <Navigate to="/login" />}</div>;
// };

// export default ProductRoute;

import { Navigate,  } from "react-router-dom";

export function ProtectedRoute({ isLoggedIn,children }) {
  return isLoggedIn ? children  : <Navigate to="/login" />;
}
