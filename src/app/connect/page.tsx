"use client";
import ItemCards from "@/components/ItemCards";
import textData from "@/constants/textData";
import SectionTitle from "@/components/SectionTitle";

const ContactForm = () => {
  const placeHolderTheme =
    "p-2 mt-2 rounded-md text-sm font-normal textSecondaryTheme borderTheme transitionButtonTheme cardDarkerTheme";

  return (
    <div className="w-full">
      <form
        action="https://formsubmit.co/contact@onkaryaglewad.in"
        method="POST"
        className="flex flex-col"
      >
        <div className="flex flex-col">
          <label htmlFor="name" className="text-md font-medium textTheme">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name here (e.g. Onkar Yaglewad)"
            className={placeHolderTheme}
            required
          />
        </div>
        <div className="flex flex-col mt-5">
          <label htmlFor="email" className="text-md font-medium textTheme">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email here (e.g. onkaryaglewad@gmail.com)"
            className={placeHolderTheme}
            required
          />
        </div>
        <div className="flex flex-col mt-5">
          <label htmlFor="subject" className="text-md font-medium textTheme">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            placeholder="Enter your subject here (e.g. Just saying Hi!)"
            className={placeHolderTheme}
            required
          />
        </div>
        <div className="flex flex-col mt-5">
          <label htmlFor="message" className="text-md font-medium textTheme">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            rows={5}
            placeholder="Enter your message here (e.g. Hello Onkar! I'd like to say Hi!)"
            className={placeHolderTheme}
            required
          />
        </div>
        <button
          type="submit"
          className="mt-5 p-2 rounded-md buttonTheme transitionButtonTheme"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default function Connect() {
  return (
    <div>
      <section key="Connect">
        <SectionTitle
          title={textData.connectPageData.title}
          subTitle={textData.connectPageData.subtitle}
        />
        <div className="mt-16 flex xs:flex-col sm:flex-col md:flex-row lg:flex-row xs:gap-8 sm:gap-8 md:gap-16 lg:gap-24">
          <ContactForm />
          <ItemCards.connectChannelCard
            listItems={textData.connectPageData.connectLinks}
          />
        </div>
      </section>
    </div>
  );
}
