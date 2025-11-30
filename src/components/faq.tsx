import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";

const FAQ = () => {
  const faqs = [
    {
      id: 1,
      question: "What is a drone?",
      answer:
        "Drones are commonly referred to as Unmanned Aerial Vehicles ( UAV ) are automated aircraft operating systems operated from a remote location or without direct human control.",
    },
    {
      id: 2,
      question: "What is the best drone?",
      answer:
        " DJI is one of the top consumer drone manufacturers, known mainly for their Mavic series . The Mavi series has become the quintessential drone for new to intermediate pilots and videographers and the simultaneous launch in late 2018 of the Mavic 2 Pro and Mavic 2 Zoom was huge news in the industry.",
    },
    {
      id: 3,
      question: "Is it difficult to fly a drone?",
      answer:
        "There is no doubt that autonomy, especially the ability for a GPS-enabled drone to hover perfectly in place, makes flying extremely easy. In truth, almost anyone can fly the DJI Mavic Pro – tap the button to take off, it hovers with extreme accuracy, then press the button to land almost exactly where you took off.",
    },
    {
      id: 4,
      question: "How long can drones fly for?",
      answer:
        "Small Drones can have anywhere from 700 to 1,300 feet of range. Medium drones can have up to 3.1 miles or 5 kilometres. High-end drones can be programmed with GPS capabilities allowing them to more accurately stay within the set boundaries set by the controller.",
    },
    {
      id: 5,
      question: "Can I put a camera on my drone?",
      answer:
        "Buying a drone that comes with support to add your own camera is a great option for photographers and videographers that have a greater concern for the quality of the images and video they intend to capture. Of course, this option does come with its own bag of goodies and bummers.",
    },
  ];

  return (
    <div className="mb-20">
      <h1 className="text-center mb-6 text-4xl font-bold">Common Question</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <video width="100%" height="auto" controls>
            <source src="/assets/faq.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="flex flex-col justify-center">
          <Accordion.Root type="single" collapsible className="space-y-1">
            {faqs.map((faq) => (
              <Accordion.Item
                key={faq.id}
                value={`item-${faq.id}`}
                className="border rounded-lg"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="flex w-full justify-between p-4 text-left font-medium hover:bg-gray-50">
                    {faq.question}
                    <ChevronDownIcon className="h-5 w-5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="p-4 pt-0 text-gray-600">
                  {faq.answer}
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
