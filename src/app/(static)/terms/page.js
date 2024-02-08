import React from "react";

export const metadata = {
  title: "Terms",
};

function Page() {
  return (
    <div className="px-4 py-[75px] md:p-[75px] text-pretty">
      <div className="container flex flex-col gap-6">
        <h1 className="text-4xl text-center bold">Terms and Conditions</h1>
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl">Terms of Service</h2>
          <p>
            <b>Note:</b> Please be aware that only our Terms of Service and
            Privacy Policy in English are legally binding. While translations of
            these documents may be provided for your convenience, they are not
            legal documents.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl">Introduction</h2>
          <p>
            {`We understand how daunting and tiresome legal paperwork can be,
             so we've simplified them while still giving necessary information.
              Please read the terms carefully before using Banter,
               as they are legally binding between you and us.
                We will continue to update and address certain portions.`}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl">Definitions</h2>
          <p>
            {`This text will use particular terminology to refer to things unique to us. Let's clarify what each phrase means:`}
          </p>
          <ul className="list-disc">
            <li>{`Terms – the Terms of Service, a legally binding agreement between Us and You (“Terms”, “Terms of Service”)`}</li>
            <li>{`You – the user (“you”, “your” or “user”)`}</li>
            <li>{`Banter – the service provided by us (“Banter”, “Platform”, “Service” or “Application”)`}</li>
          </ul>
          <p>
            {`Your access and use of the service are subject to your acceptance and compliance with these Terms. 
            These Terms apply to all visitors, users, and anyone who utilise or access our services.
             By accessing or using this service, you agree to these terms.
              If you disagree with any of the terms, please stop using this service.`}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-3xl">Understanding What We Are</h2>
          <p>
            {`Banter is a chat programme that enables users to converse via instant messaging. Some content uploaded on the platform may link to external websites not hosted by us.
            ****See 5. Additional related websites.`}
          </p>
          <p className="font-bold">{`By using our Service, you agree:`}</p>
          <ul className="list-disc">
            <li>{`You are 18 years of age or older.`}</li>
            <li>{`You have read and understood the Terms and Privacy Policy.`}</li>
            <li>{`You agree to abide by our Community Guidelines.`}</li>
          </ul>
          <p>
            {`Your access to and use of the service is contingent upon your acceptance and compliance with these Terms. 
            These Terms apply to all visitors, users, and those who use or utilise our services.
             By accessing or using this service, you agree to be bound by these terms.
              If you disagree with any of the terms, please cease usage of this service.`}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl">Contact Us</h2>
          <p>
            {`Please contact us if you have any issues about our Terms of Service or the statements above.
             Please contact us using the information below: Email`}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page;
