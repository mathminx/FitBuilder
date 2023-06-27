import React from 'react';

const styles = {
  footerStyle: {
    alignItems: 'center',
    display: 'flex',
    paddingLeft: '15px',
    height: "55px",
    background: "#193381",
    margin: "0px"
  },
}

function Footer() {
  return (
    <footer style={styles.footerStyle} className="footer"></footer>
  );
}

export default Footer;