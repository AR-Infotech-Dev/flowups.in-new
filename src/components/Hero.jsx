import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { heroSlides } from "../../data/heroSlides";
import { moduleEnquiry } from "../../data/tdlModules";
import TallyApiFlow from "./TallyApiFlow";
import "./HeroShowcase.css";

function WorkflowPreview({ slide }) {
  return (
    <div className="tally-flow">
      <div className="tally-flow-head">
        <strong><i className={"bi " + slide.icon} aria-hidden="true" /> {slide.name}</strong>
        <span>Example workflow</span>
      </div>
      <ol className="tally-flow-map hero-preview-steps">
        {slide.steps.map(([icon, label, note], index) => (
          <li className="tally-flow-node" key={label}>
            {index > 0 && <i className="tally-flow-arrow bi bi-arrow-right" aria-hidden="true" />}
            <i className={"tally-flow-icon bi " + icon} aria-hidden="true" />
            <strong>{label}</strong>
            <small>{note}</small>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function Hero() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(() => window.matchMedia("(prefers-reduced-motion: no-preference)").matches);
  const [hovering, setHovering] = useState(false);
  const [inView, setInView] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(!document.hidden);
  const stageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(stageRef.current);
    const syncVisibility = () => setDocumentVisible(!document.hidden);
    document.addEventListener("visibilitychange", syncVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncVisibility);
    };
  }, []);

  useEffect(() => {
    if (!playing || hovering || !inView || !documentVisible) return;
    const timer = window.setTimeout(() => {
      setActive((current) => (current + 1) % heroSlides.length);
    }, active === 0 ? 10000 : 7000);
    return () => window.clearTimeout(timer);
  }, [active, playing, hovering, inView, documentVisible]);

  function selectSlide(index) {
    setPlaying(false);
    setActive((index + heroSlides.length) % heroSlides.length);
  }

  return (
    <section
      className="flow-hero premium-hero hero-showcase"
      aria-label="Featured FlowupS products and services"
      aria-roledescription="carousel"
    >
      <div className="premium-sky" data-paused={!playing || !inView || !documentVisible} aria-hidden="true">
        <img src="/images/flowups-hero-starfield.jpg" alt="" fetchPriority="high" />
      </div>
      <div className="container hero-showcase-layout">
        <div className="hero-showcase-controls" role="group" aria-label="Showcase controls">
          <button type="button" className="hero-showcase-control" aria-label="Previous slide" onClick={() => selectSlide(active - 1)}>
            <i className="bi bi-arrow-left" aria-hidden="true" />
          </button>
          <div className="hero-showcase-dots" role="group" aria-label="Choose a slide">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                aria-label={slide.name}
                aria-current={index === active}
                title={slide.name}
                onClick={() => selectSlide(index)}
              />
            ))}
          </div>
          <button type="button" className="hero-showcase-control" aria-label="Next slide" onClick={() => selectSlide(active + 1)}>
            <i className="bi bi-arrow-right" aria-hidden="true" />
          </button>
          <button type="button" className="hero-showcase-control" aria-label={playing ? "Pause showcase motion" : "Play showcase motion"} onClick={() => setPlaying(!playing)}>
            <i className={playing ? "bi bi-pause-fill" : "bi bi-play-fill"} aria-hidden="true" />
          </button>
          <span className="visually-hidden" aria-live={playing ? "off" : "polite"}>
            Slide {active + 1} of {heroSlides.length}: {heroSlides[active].name}
          </span>
        </div>
        <div
          className="hero-showcase-stage"
          ref={stageRef}
          onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovering(true); }}
          onPointerLeave={() => setHovering(false)}
          onFocusCapture={() => setPlaying(false)}
        >
          {heroSlides.map((slide, index) => {
            const isActive = index === active;
            const Heading = index === 0 ? "h1" : "h2";
            const [heading, accent] = slide.heading;
            return (
              <div className="premium-hero-grid hero-showcase-slide" key={slide.id} data-active={isActive} inert={!isActive} aria-hidden={!isActive}>
                <div className="premium-hero-copy">
                  <p className="premium-kicker">{index === 0 ? slide.category + " · " + slide.name : slide.category}</p>
                  <Heading id={index === 0 ? "home-title" : undefined} className="hero-showcase-title">
                    {heading}{accent && <> <em>{accent}</em></>}
                  </Heading>
                  <p className="flow-hero-summary">{slide.description}</p>
                  <div className="flow-actions">
                    <Link className="flow-button premium-primary" to={moduleEnquiry(slide.enquiry ?? slide.name, slide.route)}>
                      {slide.action ?? "Enquire now"} <i className="bi bi-arrow-up-right" aria-hidden="true" />
                    </Link>
                    <Link className="flow-button premium-secondary" to={slide.to}>
                      {slide.details} <i className="bi bi-arrow-right" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
                <div className="premium-console-stage">
                  <div className="premium-console">
                    {index === 0 ? <TallyApiFlow /> : <WorkflowPreview slide={slide} />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}