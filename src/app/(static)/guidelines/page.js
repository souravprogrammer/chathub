import React from "react";

function Page() {
  return (
    <div className="p-[80px] text-pretty">
      <div className="container flex flex-col gap-6">
        <h1 className="text-4xl text-center bold">Community Guidelines</h1>
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl">Community Guidelines</h2>
          <p>{`Banter is a chat platform that allows you to:`}</p>
          <ul className="list-disc">
            <li>{`Connect with others and form friendships on our platform.`}</li>
            <li>{`Engage in conversations with others who share similar interests.`}</li>
            <li>{`Enjoy a safe and respectful environment where everyone is welcome.`}</li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-3xl">{`What We Don’t Allow`}</h2>
          <p>
            {`Engaging in any of the following actions will result in a warning and may lead to having your account suspended.`}
          </p>

          <ul className="list-disc">
            <li>{`harass other individuals on the platform.`}</li>
            <li>{`Using Banter for illegal operations. These include, but are not limited to, hacking, the cracking or distribution of pirated software, 
            cheats, exploits or hacks for our or another company or person’s service.`}</li>
            <li>{`Using Banter with malicious intent, in a way that is not reasonable under normal usage, in order to outsource computing and/or storage resources to our servers,
             as well as other forms of Denial of Service to our infrastructure.`}</li>
            <li>{`Sharing any type of imagery that depicts real-life violence, gore or animal cruelty. However,
                an exception to this rule has been made for violence portrayed in media (including movies, games, books and such).`}</li>
          </ul>
          <p>{`To report any of the above activity, contact us at <Email>`}</p>
          <p>{`Please note we are committed to resolving every single report.
           Please be patient and do not spam our support team - we appreciate your concerns and will act upon them.`}</p>
        </div>
      </div>
    </div>
  );
}

export default Page;
