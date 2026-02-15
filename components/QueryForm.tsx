
import React, { useState } from 'react';
import { Send, ArrowRight, CheckCircle2, DollarSign, Calendar, MessageSquare, User, Phone } from 'lucide-react';

interface QueryFormProps {
  onQueryComplete?: (details: any) => void;
  onBack?: () => void;
}

const QueryForm: React.FC<QueryFormProps> = ({ onQueryComplete, onBack }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    description: '',
    dateTime: '',
    budget: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (onQueryComplete) {
      onQueryComplete(formData);
    }

    const waNumber = "919816402487"; 
    const text = `*CUSTOM ODDBALL QUERY!*%0A%0A` +
                 `*Agent Name:* ${formData.name}%0A` +
                 `*Contact:* ${formData.contact}%0A` +
                 `*Mission Description:* ${formData.description}%0A` +
                 `*Target Timing:* ${formData.dateTime}%0A` +
                 `*Budget Estimate:* ${formData.budget}`;
    
    const waUrl = `https://wa.me/${waNumber}?text=${text}`;
    window.open(waUrl, '_blank');
    
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isSubmitted) {
    return (
      <section className="py-20 px-6 flex justify-center bg-white dark:bg-[#1a1a1a]">
        <div className="w-full max-w-md neo-card p-12 bg-[#8B5CF6] text-white text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-black text-[#8B5CF6]">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-4xl font-black uppercase mb-4 leading-none italic">WEIRDNESS RECEIVED!</h2>
          <p className="font-bold text-white/90 mb-8 uppercase tracking-widest text-sm italic">Mission control is analyzing your bizarre request. Expect a signal soon.</p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="neo-btn bg-black text-white w-full uppercase shadow-[6px_6px_0px_#FFCF25] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            Submit Another Mystery
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 flex flex-col items-center bg-white dark:bg-[#1a1a1a]">
      {onBack && (
        <button 
          onClick={onBack}
          className="mb-8 self-start max-w-7xl mx-auto flex items-center gap-2 text-xs font-black uppercase tracking-widest text-black/40 hover:text-black transition-colors"
        >
          ← Back to Reality
        </button>
      )}

      <div className="w-full max-w-xl neo-card p-10 bg-white dark:bg-[#262626] relative">
        <div className="absolute top-[-25px] left-[-25px] bg-[#FF00D6] border-4 border-black p-4 rounded-2xl rotate-[-12deg] shadow-[6px_6px_0px_#000] hidden md:block">
          <MessageSquare size={32} className="text-white" />
        </div>

        <div className="mb-10 text-center md:text-left">
          <h2 className="text-5xl font-black uppercase leading-none mb-3 italic tracking-tighter">
            CUSTOM <span className="text-[#FF00D6]">ODDITY</span>
          </h2>
          <p className="font-bold text-gray-400 text-xs uppercase tracking-[0.3em]">Design your own personal chaos mission.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ml-2">
                <User size={12} className="text-[#FFCF25]" /> Your Human Label
              </label>
              <input 
                required
                name="name"
                placeholder="Agent Zero" 
                className="neo-input shadow-[4px_4px_0px_#000] focus:shadow-none transition-all"
                onChange={handleChange}
                value={formData.name}
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ml-2">
                <Phone size={12} className="text-[#76C24F]" /> Signal Channel
              </label>
              <input 
                required
                name="contact"
                placeholder="WhatsApp Number" 
                className="neo-input shadow-[4px_4px_0px_#000] focus:shadow-none transition-all"
                onChange={handleChange}
                value={formData.contact}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ml-2">
              <MessageSquare size={12} className="text-[#8B5CF6]" /> Mission Briefing
            </label>
            <textarea 
              required
              name="description"
              rows={4}
              placeholder="Describe the service. The weirder, the better..." 
              className="neo-input resize-none shadow-[4px_4px_0px_#000] focus:shadow-none transition-all"
              onChange={handleChange}
              value={formData.description}
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ml-2">
                <Calendar size={12} className="text-[#FF00D6]" /> Target Timestamp
              </label>
              <input 
                required
                type="datetime-local"
                name="dateTime"
                className="neo-input shadow-[4px_4px_0px_#000] focus:shadow-none transition-all bg-white"
                onChange={handleChange}
                value={formData.dateTime}
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ml-2">
                <DollarSign size={12} className="text-[#76C24F]" /> Budget Intel (INR)
              </label>
              <input 
                required
                name="budget"
                placeholder="e.g. ₹5,000" 
                className="neo-input shadow-[4px_4px_0px_#000] focus:shadow-none transition-all"
                onChange={handleChange}
                value={formData.budget}
              />
            </div>
          </div>

          <div className="pt-4">
            <button type="submit" className="neo-btn w-full bg-[#FFCF25] !text-black text-2xl py-5 flex items-center justify-center gap-4 !rounded-[40px] shadow-[8px_8px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all group">
              <span className="font-black italic">DEPLOY MISSION</span>
              <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </form>

        <div className="mt-8 flex items-center justify-center gap-3 opacity-30">
          <div className="w-12 h-1 bg-black"></div>
          <span className="text-[10px] font-black uppercase">Mission Control Secured</span>
          <div className="w-12 h-1 bg-black"></div>
        </div>
      </div>
    </section>
  );
};

export default QueryForm;
