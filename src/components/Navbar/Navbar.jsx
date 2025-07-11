import { useContext } from "react";
import "./Navbar.css";
import { QuantityContext } from "../context/QuanitityContext";
import { Link, NavLink } from "react-router-dom";
import { CartContext } from "../context/CartContext/CartContext";
import { AuthContext } from "../context/AuthContext/AuthContext";
function Navbar() {
	// const { quantity } = useContext(QuantityContext);
	// const {cartItems} = useContext(CartContext);
	const { totalQuantity } = useContext(CartContext);
	const { loggedIn, logout } = useContext(AuthContext);

	return (
		<>
			<nav className="navbar navbar-expand-lg bg-body-tertiary">
				<div className="container-fluid custom-container">
					<a className="navbar-brand" href="/">
						<img src="../../../public/images/1.png" />
					</a>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav me-auto  mb-lg-0">
							<li className="nav-item mt-2">
								<NavLink
									to="/"
									className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active" : "")}>
									Home
								</NavLink>
							</li>
							<li className="nav-item">
								{/* <Link to={{pathname:'/about',search:'?query=s'}} className="text-decoration-none fs-4 text-info">About</Link> */}
								{/* <Link to='/about' className="text-decoration-none fs-4 text-info">About</Link> */}
							</li>
							<li className="nav-item mx-3 mt-2">
								<NavLink
									to="/about"
									className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active" : "")}>
									About
								</NavLink>
							</li>
							{/* <li className="nav-item mx-3 mt-2">
								<NavLink
									to="/register"
									className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active" : "")}>
									Register
								</NavLink>
							</li>
							<li className="nav-item mx-3 mt-2">
								<NavLink
									to="/login"
									className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active" : "")}>
									Login
								</NavLink>
							</li> */}
							{loggedIn ? (
								<>
									
									<button className="btn btn-primary" onClick={logout}>
										Logout
									</button>
								</>
							) : (
								<>
									<li className="nav-item mx-3 mt-2">
										<NavLink
											to="/login"
											className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active" : "")}>
											Login
										</NavLink>
									</li>{" "}
									<li className="nav-item mx-3 mt-2">
										<NavLink
											to="/register"
											className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active" : "")}>
											Register
										</NavLink>
									</li>
								</>
							)}

							{/* <li className="nav-item dropdown">
								<a
									className="nav-link dropdown-toggle"
									href="#"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false">
									Dropdown
								</a>
								<ul className="dropdown-menu">
									<li>
										<NavLink
											to="/"
											className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active" : "")}>
											Home
										</NavLink>
									</li>
									<li>
										<NavLink
											to="/about"
											className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active" : "")}>
											About
										</NavLink>
									</li>
									<li>
										<a className="dropdown-item" href="#">
											Something else here
										</a>
									</li>
								</ul>
							</li> */}
						</ul>
						<Link to={{ pathname: "/cart" }} className="text-decoration-none fs-4 text-info">
							<span className="fs-2 text-danger">🛒 {totalQuantity}</span>
						</Link>{" "}
					</div>
				</div>
			</nav>
		</>
	);
}

export default Navbar;
