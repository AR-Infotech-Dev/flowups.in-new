
import { Link } from "react-router-dom";
import { servicesData } from "../../data/serviceData";

export default function Footer() {
  return (
    <footer id="footer" className="footer flow-footer dark-background">
      <div className="container flow-footer-grid">
        <div>
          <Link to="/" className="flow-brand" aria-label="FlowupS Technologies Pvt. Ltd. home">
            <img className="flow-brand-image" src="/images/flowups-logo.png" width="4668" height="1740" alt="" />
          </Link>
          <address>Padtani Complex, behind Joshi Palace,<br />opp. Panhale Pedha, Punjabi Colony,<br />Sangamner, Maharashtra 422605</address>
          <a href="mailto:admin@flowups.in">admin@flowups.in</a>
          <a href="tel:+919665478057">+91 96654 78057</a>
          <a href="tel:+917756923602">+91 77569 23602</a>
        </div>
        <nav aria-label="Services">
          <h2>Services</h2>
          <ul>{servicesData.map(({ id, title }) => <li key={id}><Link to={`/services/${id}`}>{title}</Link></li>)}</ul>
        </nav>
        <nav aria-label="Explore FlowupS">
          <h2>Explore</h2>
          <ul>
            <li><Link to="/tdl-modules">TDL Modules</Link></li>
            <li><Link to="/product">Software Products</Link></li>
            <li><Link to="/about_us">About FlowupS</Link></li>
            <li><Link to="/our-team">Our Team</Link></li>
            <li><Link to="/contact-us">Contact</Link></li>
          </ul>
        </nav>
      </div>
      <div className="container flow-footer-copyright">© {new Date().getFullYear()} FlowupS Technologies Pvt. Ltd.</div>
    </footer>
  );
}
