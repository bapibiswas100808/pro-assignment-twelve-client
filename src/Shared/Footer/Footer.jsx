import logo from "../../assets/logo1.png";
const Footer = () => {
  return (
    <div className="bg-blue">
      <footer className="footer p-10 max-w-[1170px] mx-auto text-white">
        <aside>
          <img className="h-20" src={logo} alt="" />
          <p>
            MED Diagnostic Ltd.
            <br />
            Providing reliable Service since 1992
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Health Care</a>
          <a className="link link-hover">Diagnostic</a>
          <a className="link link-hover">Campaign</a>
          <a className="link link-hover">Medicine</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
