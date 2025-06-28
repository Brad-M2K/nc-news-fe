import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <span>&copy; {new Date().getFullYear()} NC News &bull; Built by Brad &bull; Powered by React</span>
    </footer>
  );
}

export default Footer;
