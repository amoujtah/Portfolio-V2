import React from 'react';

const Skills = () => {
  const skillsList = ['Cybersecurity', 'Networking', 'Linux', 'Python', 'Web Security', 'SOC Basics'];

  return (
    <div className="flex flex-row flex-wrap gap-3 mt-6 justify-center md:justify-start w-full">
      {skillsList.map((skill) => (
        <div
          key={skill}
          className="cursor-pointer rounded-full border border-emerald-400/25 bg-emerald-400/5 px-5 py-2 text-sm text-emerald-100 shadow-sm transition-all duration-300 ease-in-out hover:border-emerald-300/60 hover:bg-emerald-400/10"
        >
          {skill}
        </div>
      ))}
    </div>
  );
};

export default Skills;
