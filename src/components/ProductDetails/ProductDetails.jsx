import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInter from "../../network/interceptor";
import Product from "../Product/Product";
import { QuantityContext } from "../context/QuanitityContext";
import { CartContext } from "../context/CartContext/CartContext";

export const ProductDetails = () => {
	const params = useParams();

	const [productDetails, setProductDetails] = useState({});
	// const { quantity: totalQuantity, setQuantity: setTotalQuantity } = useContext(QuantityContext);
	// const { totalQuantity } = useContext(CartContext);
	// const [count, setCount] = useState(0);
	const { cartItems,setCartItems } = useContext(CartContext);

	// const location = useLocation();
	// console.log(location);

	console.log(productDetails);

	useEffect(() => {
		axiosInter.get(`/product/${params.id}`).then((res) => setProductDetails(res?.data));
	}, [params.id]);

	// const increaseCount = () => {
	// 	if (productDetails?.stock > count) {
	// 		setCount((c) => c + 1);
	// 		setQuantity((c) => c + 1);
	// 	}
	// };

	// const decreaseCount = () => {
	// 	if (totalQuantity > 0) {
	// 		setCount((c) => c - 1);
	// 		setQuantity((c) => c - 1);
	// 	}
	// };
const currentProductInCart = cartItems.find(
    (item) => item.id === productDetails.id
  );

	const addToCart = (product) => {
		setCartItems((prev) => {
			const isExist = prev.find((x) => x.id === product.id);
			if (isExist) {
				return prev.map((e) => (e.id === product.id ? { ...e, count: e.count + 1 } : e));
			} else {
				return [...prev, { ...product, count: 1 }];
			}
		});
	};
	const removeFromCart = (product) => {
		setCartItems((prev) =>
			prev
				.map((item) => (item.id === product.id && item.count > 1 ? { ...item, count: item.count - 1 } : item))
				.filter((item) => item.count > 0)
		);
	};
	return (
		// <Product prod={productDetails} />
		<>
			<div className="container">
				<div className="row">
					<div className="col-lg-4 col-md-6 col-sm-12">
						<img src={productDetails.thumbnail} className="w-100 border border-3 rounded-5" />
					</div>
					<div className="col-lg-8 col-md-6 col-sm-12">
						<h2 className="fs-1 fw-bold">{productDetails.title}</h2>
						<p className="fs-5 fw-medium text-muted">{productDetails.description}</p>
						<span className="d-inline-block px-5 py-2 bg-info text-white border border-1 rounded-4">
							{productDetails.brand}
						</span>
						<span className="d-inline-block px-5 py-2 bg-success ms-3 text-white border border-1 rounded-4">
							{productDetails.category}
						</span>
						<p className="fs-5 text-danger mt-3 ">{productDetails.availabilityStatus}</p>
						<p className="fs-4 text-primary">${productDetails.price}</p>

						<div className="rate my-3">
							{Array.from({ length: 5 }, (_, i) => (
								<i
									key={i}
									className={`fa-star ${i < Math.round(productDetails.rating) ? "fa-solid" : "fa-regular"}`}></i>
							))}
							<span className="ms-2">({Math.round(productDetails.rating)})</span>
						</div>

						<div className="d-flex justify-content-between w-25 my-3 align-items-center">
							<button className="btn btn-secondary text-white " onClick={() => addToCart(productDetails)}>
								+
							</button>
							<span>{currentProductInCart ? currentProductInCart.count : 0}</span>
							<button className="btn btn-info text-white" onClick={() => removeFromCart(productDetails)}>
								-
							</button>
						</div>

						<p className="fs-5 fw-bold text-danger">{productDetails.shippingInformation}</p>
					</div>
				</div>
			</div>
		</>
	);
};
