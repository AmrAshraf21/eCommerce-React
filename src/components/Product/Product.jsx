import { useContext, useState } from "react";
import "./Product.css";
import { QuantityContext } from "../context/QuanitityContext";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext/CartContext";
function Product({ prod }) {
	//States --------------------------------------------------

	const { setQuantity } = useContext(QuantityContext);
	const [counter, setCounter] = useState(0);
	const { setCartItems } = useContext(CartContext);

	//----------------------------------------------------------

	const navigate = useNavigate();

	//Functions -------------------------------------------------

	// const handleIncrease = () => {
	// 	if (prod?.stock > counter) {
	// 		setCounter(counter + 1);
	// 		setQuantity((c) => c + 1);
	// 	}
	// };

	// const handleDecrease = () => {
	// 	if (counter > 0) {
	// 		setCounter(counter - 1);
	// 		setQuantity((c) => c - 1);
	// 	}
	// };

	const AddToCart2 = () => {
		setCounter(counter + 1);
		setQuantity((c) => c + 1);
	};

	const handleNavigation = () => {
		navigate(`/product/${prod?.id}`);
	};

	const addToCart = (newItem) => {
		setCartItems((prev) => {
			const existingItem = prev.find((item) => item.id === newItem.id);

			if (existingItem) {
				return prev.map((item) => (item.id === newItem.id ? { ...item, count: item.count + 1 } : item));
			} else {
				return [...prev, { ...newItem, count: 1 }];
			}
		});
	};
	// const AddToCart = ()=>{
	// 	AddToCart2()
	// 	setCartItems(prev=>{
	// 		const isExist = prev.find(x=>x.id === prod.id);
	// 		if(isExist){
	// 			return prev.map(item => item.id === prod.id ? {...item,count:item.count+1} : item);
	// 		}
	// 		else{
	// 			return [...prev,{...prod,count:1}]
	// 		}

	// 	})
	// }
	// -------------------------------------------------
	return (
		<div className="row row-cols-6 col g-2">
			<div className="col card p-0" style={{ width: "18rem" }}>
				<img src={prod.thumbnail} className="card-img-top" alt="..." />
				<div className="card-body">
					<div className=" d-flex justify-content-between">
						<h5 className="card-title">{prod.title}</h5>
						<span className="d-inline-block text-success">${prod.price}</span>
					</div>
					<p className="card-text">{prod.description}</p>
					<div className="rate my-3">
						{Math.round(prod.rating) <= 1 ? (
							<span>
								<i className="fa-solid fa-star"></i>
								<i className="fa-regular fa-star"></i>
								<i className="fa-regular fa-star"></i>
								<i className="fa-regular fa-star"></i>
								<i className="fa-regular fa-star"></i>({Math.round(prod.rating)} )
							</span>
						) : Math.round(prod.rating) <= 2 ? (
							<span>
								<i className="fa-solid fa-star"></i>
								<i className="fa-solid fa-star"></i>
								<i className="fa-regular fa-star"></i>
								<i className="fa-regular fa-star"></i>
								<i className="fa-regular fa-star"></i>({Math.round(prod.rating)})
							</span>
						) : prod?.rating <= 3 ? (
							<span>
								<i className="fa-solid fa-star"></i>
								<i className="fa-solid fa-star"></i>
								<i className="fa-solid fa-star"></i>
								<i className="fa-regular fa-star"></i>
								<i className="fa-regular fa-star"></i>({Math.round(prod.rating)})
							</span>
						) : Math.round(prod.rating) <= 4 ? (
							<span>
								<i className="fa-solid fa-star"></i>
								<i className="fa-solid fa-star"></i>
								<i className="fa-solid fa-star"></i>
								<i className="fa-solid fa-star"></i>
								<i className="fa-regular fa-star"></i>({Math.round(prod.rating)})
							</span>
						) : (
							<span>
								<i className="fa-solid fa-star"></i>
								<i className="fa-solid fa-star"></i>
								<i className="fa-solid fa-star"></i>
								<i className="fa-solid fa-star"></i>
								<i className="fa-solid fa-star"></i>({Math.round(prod.rating)})
							</span>
						)}
					</div>
					{/* {counter !== 0 && (
						<div className="d-flex justify-content-between align-items-center">
							<button disabled={counter === 0} className="btn btn-primary" onClick={handleIncrease}>
								+
							</button>
							<span>{counter}</span>
							<button className="btn btn-primary" disabled={counter === 0} onClick={handleDecrease}>
								-
							</button>
						</div>
					)} */}
					<button className="btn btn-primary" onClick={handleNavigation}>
						Details
					</button>
					<button className="btn btn-primary ms-5" onClick={()=>addToCart(prod)}>
						Add to cart
					</button>
				</div>
			</div>
		</div>
	);
}

export default Product;
