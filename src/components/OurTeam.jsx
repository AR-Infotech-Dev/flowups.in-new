
import { Link } from "react-router-dom";
import "../pages/CompanyPages.css";

const portraits = import.meta.glob("../assets/team/*.{avif,jpg,jpeg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});
const portraitBySlug = new Map(
  Object.entries(portraits).map(([path, url]) => [path.split("/").at(-1).split(".")[0], url]),
);

const directors = [
  { name: "Ranjit Ambare", role: "Director · Tally Customization & Integration", bio: "Ranjit leads TallyPrime customization, integration, and CRM solutions at FlowupS. His expertise spans TDL modules, CRM workflows, and the FlowupS API for TallyPrime, helping businesses connect accounting, sales, and operations." },
  { name: "Anjan Ambre", role: "Director · Sales, Requirements & Finance", bio: "Anjan leads sales, requirements, and finance at FlowupS. He works with clients to understand business needs, clarify requirements, and coordinate with the development team, keeping communication, expectations, and follow-ups clear." },
];

const departments = [
  {
    id: "engineering",
    title: "Engineering",
    members: [
      { name: "Aniket Sonawane", role: "Full Stack Developer / Team Lead", bio: "Aniket leads full stack development at FlowupS, working across frontend interfaces and backend functionality. He coordinates the engineering team and helps turn business requirements into practical web applications and connected workflows." },
      { name: "Sapana Padmane", role: "Flutter Developer", bio: "Sapana develops mobile applications using Flutter at FlowupS, bringing business workflows to mobile screens. She focuses on clear interfaces, application functionality, and smooth user experiences that help teams work on the go." },
      { name: "Dipti Kanawade", role: "TDL Developer", bio: "Dipti develops TallyPrime customizations using TDL at FlowupS, creating reports and features around business requirements. Her work helps teams simplify accounting tasks and adapt TallyPrime to the way their business operates." },
      { name: "Sakshi Kasar", role: "Junior Full Stack Developer", bio: "Sakshi contributes to frontend and backend development at FlowupS as a Junior Full Stack Developer. She works with the engineering team on application features, interfaces, and improvements that support everyday business workflows." },
    ],
  },
  {
    id: "client-team",
    title: "Sales & Support",
    members: [{ name: "Mangesh Wakchaure", role: "Sales", bio: "Mangesh handles sales at FlowupS, helping prospective clients understand our products and services. He discusses business needs, answers product enquiries, and manages follow-ups to help clients choose a suitable solution." }],
  },
  {
    id: "advisors",
    title: "Technical Advisors",
    members: [
      { name: "Ashish Shinde", role: "Technical Advisor" },
      { name: "Rohit Dave", role: "Technical Advisor" },
      { name: "Suraj Jadhav", role: "Technical Advisor" },
    ],
  },
];

function Portrait({ name }) {
  const slug = name.toLowerCase().replaceAll(" ", "-");
  const portrait = portraitBySlug.get(slug + "-portrait") ?? portraitBySlug.get(slug);
  return (
    <div className="team-portrait" data-person={slug} aria-hidden="true">
      {portrait ? (
        <img className="team-portrait-photo" src={portrait} alt="" width="480" height="600" loading="lazy" />
      ) : (
        <div className="team-portrait-placeholder"><span /><span /></div>
      )}
    </div>
  );
}

function Profile({ member }) {
  return (
    <article className="team-profile">
      <Portrait name={member.name} />
      <div className="team-profile-copy">
        <h3>{member.name}</h3>
        <p className="team-role">{member.role}</p>
        {member.bio && <p className="team-bio">{member.bio}</p>}
      </div>
    </article>
  );
}

export default function OurTeam() {
  return (
    <div className="team-page">
      <header className="team-intro">
        <div className="container">
          <p className="team-eyebrow">Our team</p>
          <h1>The people behind <em>FlowupS.</em></h1>
          <nav aria-label="Team sections">
            <a href="#leadership">Leadership</a>
            {departments.map(({ id, title }) => <a key={id} href={`#${id}`}>{title}</a>)}
          </nav>
        </div>
      </header>
      <section id="leadership" className="team-leadership">
        <div className="container">
          <h2>Leadership</h2>
          <div className="team-directors">
            {directors.map((member) => <Profile key={member.name} member={member} />)}
          </div>
        </div>
      </section>
      <div className="container team-departments">
        {departments.map(({ id, title, members }) => (
          <section key={id} id={id} className="team-department">
            <h2>{title}</h2>
            <div className="team-roster">{members.map((member) => <Profile key={member.name} member={member} />)}</div>
          </section>
        ))}
        <Link className="flow-text-link" to="/contact-us">Get in touch with the team <i className="bi bi-arrow-up-right" aria-hidden="true" /></Link>
      </div>
    </div>
  );
}
