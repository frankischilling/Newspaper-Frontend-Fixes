import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import { FooterSection } from "@/components/footer/FooterSection";
import { useRef, useState } from "react";

export default function About() {
  const [searchTerm, setSearchTerm] = useState("");
  const footerRef = useRef(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("signup");

  const handleSearchSubmit = (term) => {
    setSearchTerm(term);
  };

  const handleSearchTermChange = (term) => {
    setSearchTerm(term);
  };

  const scrollToFooter = () => {
    if (footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Helmet>
        <title>About Us - ALAMOCITYPULSE</title>
        <meta
          name="description"
          content="Learn about ALAMOCITYPULSE - your trusted source for local San Antonio news, events, and community updates."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar
          onScrollToAbout={scrollToFooter}
          onSearch={handleSearchSubmit}
          searchTerm={searchTerm}
          setSearchTerm={handleSearchTermChange}
        />

        <main className="w-full mx-auto px-4 md:px-10 py-8 pt-[150px] md:pt-[180px] lg:pt-[175px] text-foreground">
          <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                About ALAMOCITYPULSE
              </h1>
              <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
                Your trusted source for local San Antonio news, events, and
                community updates
              </p>
            </div>

            {/* Main Content */}
            <div className="space-y-8 mb-12">
              {/* Mission Section */}
              <section className="bg-card text-card-foreground rounded-lg p-6 md:p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-4 text-foreground">
                  Our Mission
                </h2>
                <p className="text-foreground/80 leading-relaxed mb-4">
                  ALAMOCITYPULSE is a news and blog site dedicated to covering
                  local San Antonio news, including new businesses, events,
                  town fairs, and community happenings. We're committed to
                  keeping you informed about what matters most in your
                  community.
                </p>
                <p className="text-foreground/80 leading-relaxed">
                  We also cover the negative side of news globally, providing
                  balanced reporting and in-depth analysis to help you stay
                  informed about both local and world events.
                </p>
              </section>

              {/* How We Operate Section */}
              <section className="bg-card text-card-foreground rounded-lg p-6 md:p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-4 text-foreground">
                  How We Operate
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">
                      📰 Local News Coverage
                    </h3>
                    <p className="text-foreground/80 leading-relaxed">
                      Our primary focus is on San Antonio and the surrounding
                      areas. We cover breaking news, local politics, business
                      developments, community events, and human interest stories
                      that matter to you.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">
                      💰 Revenue Model
                    </h3>
                    <p className="text-foreground/80 leading-relaxed">
                      Our primary source of income comes from paid advertising on
                      our site and memberships. You can pay to place any
                      advertisement on the site for any amount agreed upon. This
                      allows us to continue providing quality journalism while
                      maintaining our independence.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">
                      👥 Membership Benefits
                    </h3>
                    <p className="text-foreground/80 leading-relaxed">
                      The daily membership allows you to comment and interact
                      with everyone on the site. Free accounts cannot comment,
                      but you can still read all our content. Join
                      as a member to engage with the community and share your
                      thoughts on the stories that matter.
                    </p>
                  </div>
                </div>
              </section>

              {/* What We Cover Section */}
              <section className="bg-card text-card-foreground rounded-lg p-6 md:p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-4 text-foreground">
                  What We Cover
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🏢</span>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Business & Economy
                      </h3>
                      <p className="text-sm text-foreground/70">
                        New businesses, economic developments, and local
                        commerce
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🎉</span>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Events & Festivals
                      </h3>
                      <p className="text-sm text-foreground/70">
                        Town fairs, community events, and local celebrations
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🏛️</span>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Politics & Government
                      </h3>
                      <p className="text-sm text-foreground/70">
                        Local politics, city council, and government news
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🌍</span>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Global News
                      </h3>
                      <p className="text-sm text-foreground/70">
                        Important world events and global news analysis
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <section className="bg-card text-card-foreground rounded-lg p-6 md:p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-4 text-foreground">
                  Get In Touch
                </h2>
                <p className="text-foreground/80 leading-relaxed mb-4">
                  Have a story tip? Want to advertise? Interested in becoming a
                  member? We'd love to hear from you!
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="/dashboard/advertise"
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
                  >
                    Advertise With Us
                  </a>
                  <a
                    href="/pricing"
                    className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    View Membership Plans
                  </a>
                </div>
              </section>
            </div>
          </div>
        </main>

        <FooterSection
          onSetSearchTerm={handleSearchTermChange}
          setAuthModalOpen={setAuthModalOpen}
          setAuthMode={setAuthMode}
          footerRef={footerRef}
        />
      </div>
    </>
  );
}

