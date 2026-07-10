import { Code, Facebook, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const members = [
  {
    name: "Jehad Hossain",
    role: "Founder & CEO",
    initial: "JH",
    linkedin: "https://www.linkedin.com/in/jehad-hossain",
    devTo: "https://dev.to/jehad_hossain",
    facebook: "https://www.facebook.com/zihad31hussain",
    twitter: "https://twitter.com/Jehadhossain_",
  },
  {
    name: "Jehad Hossain",
    role: "Frontend Developer",
    initial: "JH",
    linkedin: "https://www.linkedin.com/in/jehad-hossain",
    devTo: "https://dev.to/jehad_hossain",
    facebook: "https://www.facebook.com/zihad31hussain",
    twitter: "https://twitter.com/Jehadhossain_",
  },
  {
    name: "Jehad Hossain",
    role: "Backend Developer",
    initial: "JH",
    linkedin: "https://www.linkedin.com/in/jehad-hossain",
    devTo: "https://dev.to/jehad_hossain",
    facebook: "https://www.facebook.com/zihad31hussain",
    twitter: "https://twitter.com/Jehadhossain_",
  },
  {
    name: "Jehad Hossain",
    role: "Web Developer",
    initial: "JH",
    linkedin: "https://www.linkedin.com/in/jehad-hossain",
    devTo: "https://dev.to/jehad_hossain",
    facebook: "https://www.facebook.com/zihad31hussain",
    twitter: "https://twitter.com/Jehadhossain_",
  },
];

const socialLinks = (member: (typeof members)[number]) => [
  { key: "linkedin", href: member.linkedin, Icon: Linkedin },
  { key: "devTo", href: member.devTo, Icon: Code },
  { key: "facebook", href: member.facebook, Icon: Facebook },
  { key: "twitter", href: member.twitter, Icon: Twitter },
];

export default function OurTeam() {
  return (
    <section className="mx-auto max-w-[1180px] px-10">
      <div className="mb-8">
        <h2 className="inline-block font-chakra text-[32px] font-bold text-dr-text">
          Our Team
          <span className="mt-2 block h-[3px] w-[90px] rounded-sm bg-gradient-to-r from-dr-red to-transparent" />
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-4">
        {members.map((member, i) => (
          <div
            key={`${member.role}-${i}`}
            className="rounded-[13px] border border-dr-bd-1 bg-dr-surface p-[26px] text-center"
          >
            {/* Initials avatar with blue ring */}
            <span className="mx-auto mb-3.5 flex h-[76px] w-[76px] items-center justify-center rounded-full border-[3px] border-[rgba(47,107,255,0.5)] bg-[linear-gradient(135deg,#ff6377,#c11730)] font-poppins text-2xl font-bold text-white">
              {member.initial}
            </span>

            <h3 className="mb-[3px] font-poppins text-base font-semibold text-dr-text">
              {member.name}
            </h3>
            <p className="mb-3.5 text-[12.5px] text-[#ef7182]">{member.role}</p>

            {/* Red social circles */}
            <div className="flex justify-center gap-2">
              {socialLinks(member).map(({ key, href, Icon }) => (
                <Link
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-dr-red text-white transition-transform duration-200 hover:scale-110"
                >
                  <Icon size={12} />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
