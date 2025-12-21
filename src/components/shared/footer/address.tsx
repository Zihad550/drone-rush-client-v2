import { Clock, MapPin } from "lucide-react";

const Address = () => {
  const addresses = [
    {
      id: 1,
      field: "Address:",
      value: "5171 W Campbell Ave undefined Kent, Utah 53127 United States",
      icon: <MapPin className="w-5 h-5" />,
    },
    {
      id: 4,
      field: "Hours:",
      value: "10:00 - 18:00, Mon - Sat",
      icon: <Clock className="w-5 h-5" />,
    },
  ];

  return (
    <div className="mt-3 md:mt-1">
      {addresses.map((address) => (
        <div key={address.id} className="flex mb-2">
          {/* icon */}
          <div className="mr-2 text-muted-foreground dark:text-gray-400">
            {address.icon}
          </div>
          {/* text */}
          <div className="flex items-start">
            <span className="text-muted-foreground dark:text-gray-300 text-sm">
              {address.field}
            </span>
            <span className="ml-2 text-muted-foreground dark:text-gray-300 text-sm">
              {address.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Address;
