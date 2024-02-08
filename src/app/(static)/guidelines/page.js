import React from "react";

export const metadata = {
  title: "Guidelines",
};
function Page() {
  return (
    <div className="py-[75px] px-4 md:p-[75px] text-pretty">
      <div className="container flex flex-col gap-6">
        <h1 className="text-4xl text-center bold">Community Guidelines</h1>
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl">Community Guidelines</h2>
          <p>{`Banter is a chat platform that allows you to:`}</p>
          <ul className="list-disc">
            <li>{`Our platform allows you to connect with people and create friendships.`}</li>
            <li>{`Engage in chats with people who have similar interests.`}</li>
            <li>{`Experience a safe and polite environment in which everyone is welcome.`}</li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-3xl">{`What We Don’t Allow`}</h2>
          <p>
            {`Engaging in any of the following activities will result in a warning and your account may be suspended.`}
          </p>

          <ul className="list-disc">
            <li>{`harass other individuals on the platform.`}</li>
            <li>{`Using banter for illicit activities. Examples of prohibited activities include hacking, cracking, and distributing unauthorised software, as well as using cheats,
             exploits, or hacks for personal or professional gain.`}</li>
            <li>{`Malicious use of Banter to outsource compute and storage resources, as well as Denial of Service attacks on our infrastructure, goes beyond typical usage.`}</li>
            <li>{`Sharing any photograph that portrays real-life violence, gore, or animal abuse. An exemption to this rule applies to violence shown in media, such as movies, games, and literature.`}</li>
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
