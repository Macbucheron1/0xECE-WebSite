
"use client";

import { useState, useContext, useEffect } from "react";
import ContextTest from "../components/contexts/UserContext";
import about from "../../locales/about.json";

export default function About() {
  const { user } = useContext(ContextTest);
  const [text, setText] = useState(about.english);

  useEffect(() => {
    if (user.language === "french") {
      setText(about.french);
    } else {
      setText(about.english);
    }
  }, [user]);


  return (
    <ul className="p-6">
      <h1 className="wt-title">{text.title}</h1>
      <li className="card mt-8">
        <h1 className="p-blue text-xl font-bold mb-4">{text.firstCardTitle}</h1>
        <p className="text-lg p-gray mb-2">
          {text.firstCardText1}
        </p>
        <p className="text-lg p-gray">
          {text.firstCardText2}
        </p>
      </li>
      <li className="mt-4">
        <ul className='flex gap-6'>
          <li className='card flex-grow'>
            <h1 className="p-blue text-xl font-bold mb-4">{text.secondCardTitle}</h1>
            <p className="text-lg p-gray">
              {text.secondCardText}
            </p>
          </li>
          <li className='card flex-grow'>
            <h1 className="p-blue text-xl font-bold mb-4">{text.thirdCardTitle}</h1>
            <p className="text-lg p-gray">
              {text.thirdCardText}
            </p>
          </li>
        </ul>
      </li>
    </ul>
  );
}