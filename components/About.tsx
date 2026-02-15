
import React from 'react';

const About: React.FC = () => {
  return (
    <section className="py-32 px-8 bg-white overflow-hidden border-t-8 border-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
        <div className="md:w-1/2">
           <div className="neo-card p-10 bg-[#76C24F] rotate-[-2deg] mb-10">
              <h2 className="text-5xl md:text-7xl font-black uppercase leading-none text-white">WHY ARE <br />WE LIKE <br />THIS?</h2>
           </div>
           <p className="text-2xl font-black text-gray-500 leading-relaxed">
             We realized the world is boring. Everyone wants "luxury" and "premium." We just want to watch you struggle with your pizza toppings. 
           </p>
        </div>
        <div className="md:w-1/2 flex justify-center">
           <div className="w-64 h-64 neo-card bg-[#FFCF25] flex items-center justify-center p-8 rotate-[5deg]">
              <img src="https://api.iconify.design/fluent-emoji:grinning-face-with-sweat.svg" className="w-full h-full" />
           </div>
        </div>
      </div>
    </section>
  );
};

export default About;
