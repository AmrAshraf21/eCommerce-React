import {  useEffect, useMemo, useState } from "react";
import "./Products.css";
import axiosInter from "../../network/interceptor";
import Product from "../Product/Product";
import { CartContext } from "../context/CartContext/CartContext";

function Products() {
	const [prods, setProds] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	
	useEffect(() => {
		axiosInter.get("/products").then((res) => {
			setProds(res?.data?.products);
		});
	}, []);

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
		 <div className='container m-auto'>
      
      <div className="mb-4">
        <input
          type="text"
          className="form-control" // Bootstrap class for styling
          placeholder="Search for products..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      
      <div className='row'> 
        {filterProducts.length > 0 ? (
          filterProducts.map(e => (
        
            <Product prod={e} key={e.id} />
          ))
        ) : (
          <p className="text-center mt-5">
            No products found matching "{searchQuery}".
          </p>
        )}
      </div>
    </div>
	);
}

export default Products;
