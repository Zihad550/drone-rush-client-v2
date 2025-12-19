import { Code, Facebook, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PublicSectionTitle from "../../shared/public-section-title";

export default function OurTeam() {
  const members = [
    {
      id: 1,
      name: "Jehad Hossain",
      title: "Founder & CEO",
      src: "/assets/profile.png",
      linkedin: "https://www.linkedin.com/in/jehad-hossain",
      devTo: "https://dev.to/jehad_hossain",
      facebook: "https://www.facebook.com/zihad31hussain",
      twitter: "https://twitter.com/Jehadhossain_",
    },
    {
      id: 2,
      name: "Jehad Hossain",
      title: "Frontend Developer",
      src: "/assets/profile.png",
      linkedin: "https://www.linkedin.com/in/jehad-hossain",
      devTo: "https://dev.to/jehad_hossain",
      facebook: "https://www.facebook.com/zihad31hussain",
      twitter: "https://twitter.com/Jehadhossain_",
    },
    {
      id: 3,
      name: "Jehad Hossain",
      title: "Backend Developer",
      src: "/assets/profile.png",
      linkedin: "https://www.linkedin.com/in/jehad-hossain",
      devTo: "https://dev.to/jehad_hossain",
      facebook: "https://www.facebook.com/zihad31hussain",
      twitter: "https://twitter.com/Jehadhossain_",
    },
    {
      id: 4,
      name: "Jehad Hossain",
      title: "Web Developer",
      src: "/assets/profile.png",
      linkedin: "https://www.linkedin.com/in/jehad-hossain",
      devTo: "https://dev.to/jehad_hossain",
      facebook: "https://www.facebook.com/zihad31hussain",
      twitter: "https://twitter.com/Jehadhossain_",
    },
  ];

  return (
    <div className="px-0 py-0 text-center">
      <PublicSectionTitle>Our Team</PublicSectionTitle>
      <div className="mx-auto grid max-w-[900px] grid-cols-1 gap-4 sm:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] sm:gap-8">
        {members.map((member) => (
          <div
            key={member.id}
            className="group relative flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-4 shadow-[0_2px_16px_rgba(59,130,246,0.07)] transition-all duration-200 hover:-translate-y-2 hover:border-blue-500 hover:shadow-[0_8px_32px_rgba(59,130,246,0.13)] sm:p-8"
          >
            {/* image */}
            <div className="mb-4 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-4 border-cyan-500 bg-sky-50 shadow-[0_2px_8px_rgba(59,130,246,0.09)] sm:h-24 sm:w-24">
              <Image
                src={member.src}
                alt={member.name}
                width={96}
                height={96}
                className="h-full w-full object-cover"
              />
            </div>
            {/* socials */}
            <div className="mb-2 flex items-center justify-center space-x-2">
              <Link
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-[0_1px_4px_rgba(59,130,246,0.09)] transition-all duration-200 hover:scale-110 hover:shadow-[0_4px_16px_rgba(59,130,246,0.18)]"
              >
                <Linkedin size={20} />
              </Link>
              <Link
                href={member.devTo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-[0_1px_4px_rgba(59,130,246,0.09)] transition-all duration-200 hover:scale-110 hover:shadow-[0_4px_16px_rgba(59,130,246,0.18)]"
              >
                <Code size={20} />
              </Link>
              <Link
                href={member.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-[0_1px_4px_rgba(59,130,246,0.09)] transition-all duration-200 hover:scale-110 hover:shadow-[0_4px_16px_rgba(59,130,246,0.18)]"
              >
                <Facebook size={20} />
              </Link>
              <Link
                href={member.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-[0_1px_4px_rgba(59,130,246,0.09)] transition-all duration-200 hover:scale-110 hover:shadow-[0_4px_16px_rgba(59,130,246,0.18)]"
              >
                <Twitter size={20} />
              </Link>
            </div>
            {/* about */}
            <div>
              <h3 className="mb-1 text-lg font-bold text-gray-900">
                {member.name}
              </h3>
              <p className="text-[15px] font-medium text-cyan-500">
                {member.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
