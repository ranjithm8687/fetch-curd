import React from "react";

const Footer = () => {
  const date = new Date();
  return (
    <footer className="footer">
      <p>CopyRight &copy; {date.getFullYear()}</p>
    </footer>
  );
};

export default Footer;
