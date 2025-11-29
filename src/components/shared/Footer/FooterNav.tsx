import Link from "next/link";

interface IFooterNav {
  id: number;
  name: string;
  link: string;
}

interface IFooterNavProps {
  navs: IFooterNav[];
  title?: string;
  subtitle?: string;
}

const FooterNav = ({ navs, title, subtitle }: IFooterNavProps) => {
  return (
    <div>
      <h3
        className={`mb-4 md:mb-6 ${
          title ? "text-xl font-semibold" : "text-sm font-medium"
        } text-blue-400`}
      >
        {title || subtitle}
      </h3>

      {navs.map((nav) => (
        <div key={nav.id} className="mb-2">
          <Link
            href={nav.link}
            className="text-gray-100 text-sm hover:text-blue-400 hover:ml-2 transition-all duration-300 inline-block"
          >
            {nav.name}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default FooterNav;
