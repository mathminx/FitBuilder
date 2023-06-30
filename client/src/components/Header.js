import React from 'react';
import Navbar from './navbar/Navbar'

const styles = {
  headerStyle: {
    alignItems: 'center',
    /*border: 'solid #fa6d35',*/
    color: 'white',
    textShadow: "-5px 0px 6px #fa6d35",
    fontStyle: "italic",
    display: 'flex',
    paddingLeft: '15px',
  },
  imageStyle: {
    height: '35px',
  },
  divStyle: {
    background: '#193381',
    display: "flex",
    justifyContent: "space-between",
    alignItems: 'center',
    height: "55px",
    paddingLeft: "30px",
    paddingRight: "30px"
  }
}

function Header() {
  return (
    <div style={styles.divStyle}>
       <header style={styles.headerStyle} className="header">
        <h1 style={styles.headingStyle}>FitBuild&nbsp;</h1>
        <img src={process.env.PUBLIC_URL + '/runner.png'} style={styles.imageStyle}/>
      </header>
      <Navbar style={styles.navbarStyle}/>
    </div>
  );
}

export default Header;