import React from 'react';

const styles = {
  footerStyle: {
    position: "fixed", // Fix position
    left: "0", // Align left
    bottom: "0", // Align bottom
    width: "100%", // Take full width
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "55px",
    background: "#193381",
    color: "gray",
    fontSize: "12px",
    paddingLeft: "15px",
    margin: "0px",
  },
};

function Footer() {
  return (
    <footer style={styles.footerStyle} className="footer">
      <p>
        © 2023 FitBuilder. All rights reserved. Powering your fitness journey,
        one workout at a time.
      </p>
    </footer>
  );
}

export default Footer;

