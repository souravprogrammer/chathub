import React from "react";
import ContactForm from "./contactForm";

export const metadata = {
  title: "Contact us",
};

function Page() {
  return (
    <main className="py-[75px] ">
      <div className="container flex flex-col gap-6">
        <h1 className="text-5xl text-center bold">Contact</h1>
      </div>
      <div className="flex flex-col items-center justify-center p-10">
        <ContactForm />
      </div>
    </main>
  );
}

export default Page;
