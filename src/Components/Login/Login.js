import React, { useContext } from 'react';
import { UserContext } from '../../App';
import firebase from "firebase/app";

import "firebase/auth";
import firebaseConfig from './firebase.config'; 
import { useHistory, useLocation } from 'react-router-dom';
import loginBg from './login-bg.png';

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  const handleGoogleSignIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
      const { displayName, email } = result.user;
      const signedInUser = { name: displayName, email }
      setLoggedInUser(signedInUser);
      storeAuthToken();
    }).catch(function (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
  }
 
  const storeAuthToken = () => {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
      .then(function (idToken) {
        sessionStorage.setItem('token', idToken);
        history.replace(from);
      }).catch(function (error) {
        // Handle error
      });
  }

  return (
    <div className="login-page container">
      <div className="row align-items-center" style={{ height: "100vh" }}>
        <div className="col-md-6 shadow p-5">
          <div className="form-group">
            <label htmlFor="">User Name</label>
            <input type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="">Password</label> 
            <input type="password" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="" className="text-danger">Forgot your password?</label>
          </div>
          <div className="from-group mt-5">
            {/* <button className="btn btn-primary" >Google Sign in</button> */}
            <button className="btn btn-brand" onClick={handleGoogleSignIn}>Google Sign in</button>
          </div>
        </div>
        <div className="col-md-6 d-none d-md-block align-self-end">
          <img className="img-fluid " src={loginBg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;




// import React, {  useEffect, useState } from 'react';
// import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
// import { useHistory, useLocation } from 'react-router-dom';
// // import { css } from "@emotion/core";
// import FadeLoader from "react-spinners/FadeLoader";
// import handleError from './ErrorHandler';
// import InputItem from './InputItem';
// import g from './g.svg';
// import { createUserWithEmailAndPassword, handleFacebookSignIn, handleGoogleSignIn, initializeFirebase, signInWithEmailAndPassword } from './HandleLogin';
// initializeFirebase()
// const initUser = {
//   firstName: '',
//   lastName: '',
//   email: '',
//   password: '',
//   confirmPassword: '',
//   errors: {}
// }

// const Login = () => {
//     const history = useHistory();
//     const location = useLocation();
//     let { from } = location.state || { from: { pathname: "/" } };
//     const [loading, setLoading] = useState(false)
//     const [newUser, setNewUser] = useState(true)
//     const [userInfo, setUserInfo] = useState({ ...initUser });
  
//     const onChangeHandler = e => {
//         setUserInfo(previousState => ({ ...previousState, [e.target.name]: e.target.value }))
//         e.persist()
//       }
    
// // const override = css`
// //   display: block;
// //   margin: 0 auto;
// //   display:flex;
// //   color:#000;
// // `;

// const submitHandler = e => {
//     const errors = handleError(userInfo);
//     setUserInfo({ ...userInfo, errors })
//     if (Object.keys(errors).length === 0 && newUser) {
//       setLoading(true)
//       createUserWithEmailAndPassword({ firstName, lastName, email, password })
//         .then(res => {
//           setLoading(false)
//           if (res.error) {
//             setUserInfo({ ...userInfo, errors: res })
//           } else {
          
//             history.replace(from)
//           }
//         })
//     }
//     if (!errors.email && !errors.password) {
//       if (userInfo.password && userInfo.email && !newUser) {
//         setLoading(true)
//         signInWithEmailAndPassword({ email, password })
//           .then(res => {
//             setLoading(false)
//             if (res.error) {
//               setUserInfo({ ...userInfo, errors: res })
//             } else {
          
//               history.replace(from)
//             }
//           })
//       }
//     }
//     e.preventDefault();
//   }


//   const googleSignIn = () => {
//     handleGoogleSignIn()
//       .then(res => {
//         if (res.error) {
//           setUserInfo({ ...userInfo, errors: res })
//         } else {
      
//           history.replace(from)
//         }
//       })
//   }

//   const facebookSignIn = () => {
//     handleFacebookSignIn()
//     .then(res => {
//       if (res.error) {
//         setUserInfo({ ...userInfo, errors: res })
//       } else {
    
//         history.replace(from)
//       }
//     })
      
//   };


//   useEffect(() => {
//     setUserInfo({ ...initUser })
//   }, [newUser])

//   useEffect(() => {
//     console.log('form login');
//   }, [])
//   const { firstName, lastName, email, password, confirmPassword, errors } = userInfo;



//   if (loading) {
//     return (
//       <div className="sweet-loading">
//         <FadeLoader
//         //   css={override}
//           size={150}
//           loading={loading}
//         />
//       </div>
//     );
//   }

//     return (
//         <Container className="pr-0 pt-5">
//       <Row>
//         <Col sm={8} className="m-auto" xl={6} md="8">
//           <Card>
//             <Card.Body>
//               <h2 className="py-1">{newUser ? 'Create an account' : 'Login'}</h2>
//               <Form autoComplete="off" onSubmit={submitHandler}>
//                 {newUser && (
//                   <InputItem value={firstName}
//                     onChangeHandler={onChangeHandler}
//                     error={errors.firstName}
//                     name="firstName"
//                     customClass="loginInput" autoFocus
//                     placeholder="First Name" />
//                 )}
//                 {newUser && (
//                   <InputItem value={lastName}
//                     onChangeHandler={onChangeHandler}
//                     error={errors.lastName}
//                     name="lastName"
//                     customClass="loginInput"
//                     placeholder="Last Name" />
//                 )}
//                 <InputItem value={email}
//                   onChangeHandler={onChangeHandler}
//                   error={errors.email}
//                   name="email"
//                   customClass="loginInput"
//                   type="email"
//                   placeholder="Email" />
//                 <InputItem value={password}
//                   onChangeHandler={onChangeHandler}
//                   error={errors.password}
//                   name="password"
//                   type="password"
//                   customClass="loginInput"
//                   placeholder="Password" />
//                 {newUser && (
//                   <InputItem value={confirmPassword}
//                     onChangeHandler={onChangeHandler}
//                     type="password"
//                     error={errors.confirmPassword}
//                     name="confirmPassword"
//                     customClass="loginInput"
//                     placeholder="Confirm Password" />
//                 )}
//                 {errors.error && (
//                   <p className="text-danger text-center  py-2">
//                     {errors.error}
//                   </p>
//                 )}
//                 <Button className="w-100" variant="warning" type="submit">
//                   {newUser ? 'Create an Account' : 'Login'}
//                 </Button>
//               </Form>
//               <p className="text-center pt-2">
//                 {newUser ? 'Already have an account' : 'Don’t have an account'} ?
//                 <span onClick={() => setNewUser(!newUser)} className="text-warning login">
//                   {newUser ? ' Login' : ' Create an account'}
//                 </span>
//               </p>
//             </Card.Body>
//           </Card>
//           <div className="orr mt-2 w-75 text-center">Or</div>
//           <div className="google-sign-in mt-2 w-75 text-center" onClick={googleSignIn}>
//             <span> <img className="google mr-3 " src={g} alt="google" /> Continue with google </span>
//           </div>
//           <br/>
//           <div className="google-sign-in mt-2 w-75 text-center" onClick={facebookSignIn}>
//             <span> <img className="google mr-3 " src={'https://i.ibb.co/RNN8vYB/facebook-logo.png'} alt="facebook" /> Continue with Facebook </span>
          
//           </div>
//           <br/>
//         </Col>
//       </Row>
//     </Container>
//     );
// };

// export default Login;