import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { sanityClient, queries } from '../lib/sanity';
import { sanityImageUrl } from '../lib/imageUrl';
import { Award, ArrowLeft, ArrowRight, Mail, Phone } from 'lucide-react';
import { FacebookIcon, LinkedInIcon } from '../components/ui/SocialIcons';

export default function TeamMemberDetail() {
  const { slug } = useParams();
  const [member, setMember] = useState(null);
  const [allMembers, setAllMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!sanityClient) {
        setLoading(false);
        return;
      }
      try {
        const [memberData, allData] = await Promise.all([
          sanityClient.fetch(queries.teamMemberBySlug, { slug }),
          sanityClient.fetch(queries.allTeamMembers),
        ]);
        setMember(memberData);
        setAllMembers(allData || []);
      } catch (err) {
        console.error('Failed to load team member:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading team member...</p>
        </div>
      </div>
    );
  }

  if (!member) {
    return <Navigate to="/team" replace />;
  }

  const currentIndex = allMembers.findIndex(m => m.slug?.current === slug);
  const prevMember = currentIndex > 0 ? allMembers[currentIndex - 1] : null;
  const nextMember = currentIndex < allMembers.length - 1 ? allMembers[currentIndex + 1] : null;

  const socialLinks = [
    member.linkedin && { label: 'LinkedIn', url: member.linkedin, icon: LinkedInIcon },
    member.facebook && { label: 'Facebook', url: member.facebook, icon: FacebookIcon },
    member.email && { label: 'Email', url: `mailto:${member.email}`, icon: Mail },
    member.phone && { label: 'Phone', url: `tel:${member.phone}`, icon: Phone },
  ].filter(Boolean);

  return (
    <>
      <Helmet>
        <title>{member.name} | Bunyala Agri-Climate Industrial Park Limited</title>
        <meta name="description" content={`${member.name} — ${member.role} at Bunyala Agri-Climate Industrial Park Limited.`} />
        <meta property="og:title" content={`${member.name} | Bunyala Agri-Climate Industrial Park Limited`} />
        <meta property="og:description" content={`${member.role} at Bunyala Agri-Climate Industrial Park Limited.`} />
        <link rel="canonical" href={`https://bunyala-agriclimate.org/team/${slug}`} />
      </Helmet>

      <main id="main-content">
        {/* Hero */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-dark dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-400 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <div className="flex flex-col items-center">
              <div className="w-40 h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-accent/50 shadow-2xl mb-6">
                {member.headshot ? (
                  <img
                    src={sanityImageUrl(member.headshot, { width: 400, quality: 75 })}
                    srcSet={`${sanityImageUrl(member.headshot, { width: 200, quality: 75 })} 200w, ${sanityImageUrl(member.headshot, { width: 400, quality: 75 })} 400w`}
                    sizes="(max-width: 1024px) 160px, 192px"
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-accent/20 flex items-center justify-center text-5xl font-bold text-white">
                    {member.name.charAt(0)}
                  </div>
                )}
              </div>
              <span className="inline-block px-4 py-1.5 bg-accent/20 text-accent-light text-sm font-medium rounded-full mb-4">
                Team Member
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                {member.name}
              </h1>
              <p className="text-xl text-white/80 font-medium">
                {member.role}
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 lg:py-24 bg-white dark:bg-dark-surface">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back link */}
            <Link
              to="/team"
              className="inline-flex items-center text-primary dark:text-green-400 hover:underline mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Team
            </Link>

            {/* Credentials */}
            {member.credentials && member.credentials.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Award className="w-6 h-6 mr-3 text-accent" />
                  Credentials
                </h2>
                <div className="flex flex-wrap gap-3">
                  {member.credentials.map((cred, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center px-4 py-2 bg-primary/10 dark:bg-green-400/10 text-primary dark:text-green-400 font-medium rounded-full text-sm"
                    >
                      {cred}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  Connect
                </h2>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-5 py-2.5 bg-neutral dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg hover:border-primary dark:hover:border-green-400 transition-colors"
                    >
                      <social.icon className="w-5 h-5 text-primary dark:text-green-400" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation between members */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t border-gray-200 dark:border-dark-border">
              {prevMember ? (
                <Link
                  to={`/team/${prevMember.slug.current}`}
                  className="flex items-center text-primary dark:text-green-400 hover:underline"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {prevMember.name}
                </Link>
              ) : (
                <span />
              )}
              {nextMember ? (
                <Link
                  to={`/team/${nextMember.slug.current}`}
                  className="flex items-center text-primary dark:text-green-400 hover:underline"
                >
                  {nextMember.name}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              ) : (
                <span />
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}