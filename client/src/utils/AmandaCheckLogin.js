import jwtDecode from "jwt-decode";

function CheckLoggedIn() {
  // Retrieve the token from local storage or wherever it is stored
  const token = localStorage.getItem("token");

  if (token) {
    try {
      // Decode the token to get the user information
      const decodedToken = jwtDecode(token);

      // Check if the token has expired
      const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
      if (decodedToken.exp < currentTime) {
        // Token has expired
        return false;
      }

      // User is logged in
      return true;
    } catch (error) {
      // Error occurred while decoding the token
      console.error("Error decoding token:", error);
      return false;
    }
  }

  // No token found, user is not logged in
  return false;
}

export default CheckLoggedIn;
