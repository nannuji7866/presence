
import React, { useState, useEffect } from 'react';
import { CATEGORIES } from '../constants';
import { Send, ArrowRight, CheckCircle2 } from 'lucide-react';

interface BookingFormProps {
  initialService?: string;
  onBookingComplete?: (service: string, details: any) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ initialService = "", onBookingComplete }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: initialService || CATEGORIES[0].subNiches[0].title,
    message: ''
  });

  useEffect(() => {
    if (initialService) {
      setFormData(prev => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate internal record keeping
    if (onBookingComplete) {
      onBookingComplete(formData.service, formData);
    }

    const waNumber = "919816402487"; 
    const text = `*ODDBALL INQUIRY ALERT!*%0A%0A` +
                 `*Agent Name:* ${formData.name}%0A` +
                 `*Target Service:* ${formData.service}%0A` +
                 `*Mission Brief:* ${formData.message}`;
    
    const waUrl = `https://wa.me/${waNumber}?text=${text}`;
    window.open(waUrl, '_blank');
    
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const allSubNiches = CATEGORIES.flatMap(cat => cat.subNiches);

  if (isSubmitted) {
    return (
      <section className="py-20 px-6 flex justify-center bg-white dark:bg-[#1a1a1a]">
        <div className="w-full max-w-md neo-card p-12 bg-[#76C24F] text-white text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-black text-[#76C24F]">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-4xl font-black uppercase mb-4 leading-none">SENT TO THE CLOUD!</h2>
          <p className="font-bold text-white/90 mb-8 uppercase tracking-widest text-sm italic">WhatsApp sent & record maintained in your master vault.</p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="neo-btn bg-black text-white w-full uppercase"
          >
            Book Another Weird Thing
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 flex justify-center bg-white dark:bg-[#1a1a1a]">
      <div className="w-full max-w-md neo-card p-10 bg-[#FFCF25] dark:text-black relative">
        <div className="absolute top-[-20px] right-[-20px] bg-white border-4 border-black p-3 rounded-full animate-bounce">
          <Send size={24} className="text-black" />
        </div>

        <div className="mb-8">
          <h2 className="text-4xl font-black uppercase leading-none mb-2 italic">The Vault-Log</h2>
          <p className="font-bold text-gray-700 text-xs uppercase tracking-widest">Records are managed by mission control.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            required
            name="name"
            placeholder="Your Human Name" 
            className="neo-input shadow-[4px_4px_0px_#000]"
            onChange={handleChange}
            value={formData.name}
          />
          <input 
            required
            name="phone"
            placeholder="Contact (WhatsApp)" 
            className="neo-input shadow-[4px_4px_0px_#000]"
            onChange={handleChange}
            value={formData.phone}
          />
          <select 
            name="service"
            className="neo-input bg-white cursor-pointer shadow-[4px_4px_0px_#000]"
            onChange={handleChange}
            value={formData.service}
          >
            {allSubNiches.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
          </select>
          <textarea 
            required
            name="message"
            rows={4}
            placeholder="Describe the mission details..." 
            className="neo-input resize-none shadow-[4px_4px_0px_#000]"
            onChange={handleChange}
            value={formData.message}
          ></textarea>

          <button type="submit" className="neo-btn w-full bg-[#8B5CF6] text-xl py-4 flex items-center justify-center gap-3 mt-4 !rounded-[30px]">
            Execute Mission <ArrowRight size={24} />
          </button>
        </form>
      </div>
    </section>
  );
};

export default BookingForm;