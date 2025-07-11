import { useContext, useEffect, useMemo, useState } from "react";
import "./Products.css";
import axiosInter from "../../network/interceptor";
import { Spinner } from "../../network/interceptor";

import Product from "../Product/Product";
import { LoadingContext } from "../context/LoadingContext/LoadingContext";

function Products() {
	const [prods, setProds] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");

	const { loading } = useContext(LoadingContext);
	const ax = Spinner();

	useEffect(() => {
		axiosInter.get("/products").then((res) => {
			setProds(res?.data?.products);
		});
	}, [ax]);

	const filterProducts = useMemo(() => {
		if (!searchQuery.trim()) return prods;

		const lowerCaseQuery = searchQuery.toLowerCase();
		return prods.filter(
			(product) =>
				product.title.toLowerCase().includes(lowerCaseQuery) ||
				product.description.toLowerCase().includes(lowerCaseQuery)
		);
	}, [prods, searchQuery]);

	const handleSearchChange = (event) => {
		setSearchQuery(event.target.value);
	};

	return (
		<div className="container m-auto">
			<div className="mb-4">
				<input
					type="text"
					className="form-control"
					placeholder="Search for products..."
					value={searchQuery}
					onChange={handleSearchChange}
				/>
			</div>

			
			{loading && (
				<div className="text-center my-5">
					<div className="spinner-border text-primary" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
				</div>
			)}

			{/* Show content only when not loading */}
			{!loading && (
				<div className="row">
					{filterProducts.length > 0 ? (
						filterProducts.map((e) => <Product prod={e} key={e.id} />)
					) : (
						<p className="text-center mt-5">
							{prods.length === 0 ? "No products available." : `No products found matching "${searchQuery}".`}
						</p>
					)}
				</div>
			)}
		</div>
	);
}

export default Products;
