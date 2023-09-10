import { Link } from "react-router-dom";
import {
  
  GoogleLoginButton
} from "react-social-login-buttons";
import React from 'react';
import "../App.css";
export default function SignInForm() {

   // const [name, setName] = useState("");
//     // const [email, setEmail] = useState("");

//     // const handleOnSubmit = async (e) => {
//     //     e.preventDefault();
//     //     // const { name, email, password, reEnterPassword } = user
//     //     // console.log(user);
//     //     // console.log(email);
//     //     if( name && email){
//     //         axios.post("http://localhost:5000/register", { name, email })
//     //         .then( res => {
//     //             alert(res.data.message)
//     //             setEmail("");
//     //         setName("");
//     //         })
//     //     } else {
//     //         alert("invlid input")
//     //     }
//     // }
//     return (
//         // <>
//         //     <h1>This is React WebApp </h1>
//         //     <form action="">
//         //         <input type="text" placeholder="name"
//         //         value={name} onChange={(e) => setName(e.target.value)} />
//         //         <input type="email" placeholder="email"
//         //         value={email} onChange={(e) => setEmail(e.target.value)} />
//         //         <button type="submit"
//         //         onClick={handleOnSubmit}>submit</button>
//         //     </form>
            
//         // </>
//        
//     );
// }
 
// export default App;




  return (
    <div className="formCenter">
        <form className="formFields" /*onSubmit={this.handleSubmit} */>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="email">
              E-Mail Address
            </label>
            <input
              type="email"
              id="email"
              className="formFieldInput"
              placeholder="Enter your email"
              name="email"
              // value={this.state.email}
              // onChange={this.handleChange}
            />
          </div>

          <div className="formField">
            <label className="formFieldLabel" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="formFieldInput"
              placeholder="Enter your password"
              name="password"
              // value={this.state.password}
              // onChange={this.handleChange}
            />
          </div>

          <div className="formField">
            <button className="formFieldButton">Sign In</button>{" "}
            <Link to="/" className="formFieldLink">
              Create an account
            </Link>
          </div>

          <div className="socialMediaButtons">
            <div className="facebookButton">
              <GoogleLoginButton onClick={() => alert("Google auth")} />
            </div>
          </div>
        </form>
      </div>
  )
}
