import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useContext, useState } from "react";
import { QuantityContext } from "./components/context/QuanitityContext";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { ProductDetails } from "./components/ProductDetails/ProductDetails";
import { ProtectedRoute } from "./components/routes/ProductRoute";
import Login from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import Cart from "./pages/Cart/Cart";
import { CartProvider } from "./components/context/CartContext/CartProvider";
import { AuthProvider } from "./components/context/AuthContext/AuthProvider";
import { AuthContext } from "./components/context/AuthContext/AuthContext";
import { LoadingProvider } from "./components/context/LoadingContext/LoadingProvider";
// import { lazy,Suspense } from "react";
export default function App() {
	const [quantity, setQuantity] = useState(0);
	const { loggedIn } = useContext(AuthContext);

	// const About = lazy(()=>import('./pages/About/About.jsx'));
	// const ProductDetails = lazy(()=>import('./components/ProductDetails/ProductDetails.jsx'))
	return (
		<LoadingProvider>
			<CartProvider>
				<QuantityContext.Provider value={{ quantity, setQuantity }}>
					<Navbar></Navbar>
					{/* <Suspense fallback={<div>Loading...</div>} /> */}
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/about" element={<About />} />
						<Route
							path="/cart"
							element={
								<ProtectedRoute isLoggedIn={loggedIn}>
									<Cart />
								</ProtectedRoute>
							}>
							<Route path="/cart" element={<Cart />} />
						</Route>

						<Route
							path="/product/:id"
							element={
								// <ProductRoute>
								<ProductDetails />
								// </ProductRoute>
							}
						/>
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
					</Routes>
				</QuantityContext.Provider>
			</CartProvider>
		</LoadingProvider>
	);
}
