import React from "react";

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
            {`We get that legal documents can be overwhelming and boring, so we’ve
            tried our best to keep it as simple as possible while providing the
            information needed. It is important however to remember that these
            terms are legally binding between yourself and us if you choose to
            use Chitchat.gg, so please read them carefully before proceeding -
            We will continue to improve and tackle some sections.`}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl">Definitions</h2>
          <p>
            {`Throughout this document, we will use certain terminlogy to refer to things specific to us, 
            so let’s establish what everything means:`}
          </p>
          <ul className="list-disc">
            <li>{`Terms – the Terms of Service, a legally binding agreement between Us and You (“Terms”, “Terms of Service”)`}</li>
            <li>{`You – the user (“you”, “your” or “user”)`}</li>
            <li>{`Banter – the service provided by us (“Banter”, “Platform”, “Service” or “Application”)`}</li>
          </ul>
          <p>
            {`Your access to and use of the service is conditioned on your acceptance of and compliance with these Terms. 
            These Terms apply to all visitors, users and others who access or use our services.
             By accessing or using the service you agree to be bound by these Terms.
              If you disagree with any part of the terms, then please discontinue the use of this service.`}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-3xl">Understanding What We Are</h2>
          <p>
            {`Banter is a chat application that allows you to communicate with
            other users through instant messaging. Some content shared on the
            platform may lead to external websites that are not hosted by us.
            ****See 5. Other linked websites.`}
          </p>
          <p className="font-bold">{`By using our Service, you agree:`}</p>
          <ul className="list-disc">
            <li>{`You are 18 years of age or older.`}</li>
            <li>{`You have read and understood the Terms and Privacy Policy.`}</li>
            <li>{`You agree to abide by our Community Guidelines.`}</li>
          </ul>
          <p>
            {`Your access to and use of the service is conditioned on your acceptance of and compliance with these Terms. 
            These Terms apply to all visitors, users and others who access or use our services.
             By accessing or using the service you agree to be bound by these Terms.
              If you disagree with any part of the terms, then please discontinue the use of this service.`}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl">Contact Us</h2>
          <p>
            {`Feel free to contact us if you have any questions regarding our
            Terms of Service or any of the above statements. You may contact us
            as follows: Email`}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page;
