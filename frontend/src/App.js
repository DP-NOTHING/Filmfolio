import React, { useEffect, useState } from 'react';
import './App.css';
import {
	BrowserRouter as Router,
	Route,
	NavLink,
	Routes,
} from 'react-router-dom';
import Home from './components/Home';
import Login from './page/Login';
import User from './components/User/User';
import Player from './components/Player/Player';
// function App() {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");

//     const handleOnSubmit = async (e) => {
//         e.preventDefault();
//         // const { name, email, password, reEnterPassword } = user
//         // console.log(user);
//         // console.log(email);
//         if( name && email){
//             axios.post("http://localhost:5000/register", { name, email })
//             .then( res => {
//                 alert(res.data.message)
//                 setEmail("");
//             setName("");
//             })
//         } else {
//             alert("invlid input")
//         }
//     }
//     return (
//         <>
//             <h1>This is React WebApp </h1>
//             <form action="">
//                 <input type="text" placeholder="name"
//                 value={name} onChange={(e) => setName(e.target.value)} />
//                 <input type="email" placeholder="email"
//                 value={email} onChange={(e) => setEmail(e.target.value)} />
//                 <button type="submit"
//                 onClick={handleOnSubmit}>submit</button>
//             </form>

//         </>

//     );
// }

// export default App;

function App() {
	const [isOnline, setIsOnline] = useState(navigator.onLine);
	const handleOnlineStatus = () => {
		setIsOnline(navigator.onLine);
	};

	useEffect(() => {
		window.addEventListener('online', handleOnlineStatus);
		window.addEventListener('offline', handleOnlineStatus);
		return () => {
			window.removeEventListener('online', handleOnlineStatus);
			window.removeEventListener('offline', handleOnlineStatus);
		};
	}, []);
	return isOnline ? (
		<Router>
			<Routes>
				<Route
					path='/home'
					element={<Home />}
				/>
				<Route
					path='/user'
					element={<User />}
				/>
				<Route
					path='/player/:movieid'
					element={<Player />}
				/>
				<Route
					path='/*'
					element={<Login />}
				/>
			</Routes>
		</Router>
	) : (
		<div>you are offline</div>
	);
}

export default App;
