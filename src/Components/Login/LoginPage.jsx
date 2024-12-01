import { useState } from "react";
import app from "../../Firebase/firebase.init";
import "./LoginPage.css";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import "./UserProfile.css";

const LoginPage = () => {
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser); // Log the user object for debugging
        setUser(loggedUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {!user ? (
        <div className="login-container">
          <div className="login-box">
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Sign in with your Google account</p>
            <button onClick={handleGoogleLogin} className="google-login-button">
              <img
                src="/png-transparent-google-logo-google-text-trademark-logo.png"
                alt="Google logo"
                className="google-logo"
              />
              Sign in with Google
            </button>
          </div>
        </div>
      ) : (
        <div className="user-profile">
          <img
            src={user.photoURL || "https://via.placeholder.com/150"}
            alt="User Profile"
            className="user-photo"
          />
          <div className="user-info">
            <h2 className="user-name">{user.displayName}</h2>
            <p className="user-email">{user.email}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
