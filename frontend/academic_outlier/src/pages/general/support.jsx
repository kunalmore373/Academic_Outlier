import React from 'react';
import { useNavigate } from 'react-router-dom';

const Support = () => {
  const navigate = useNavigate();

  const handleEmailSupport = () => {
    window.location.href = 'mailto:kunalmoreclg@gmail.com?subject=Academic%20Outlier%20Support';
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] p-10">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200 transition"
        >
          Back
        </button>

        <h1 className="text-3xl font-bold mb-4 text-[#00236f]">Support</h1>
        <p className="text-slate-600 mb-6 leading-7">
          If you need help using the Academic Outlier portal, you can reach out to our support team directly.
          We are here to help with account questions, application guidance, and general student assistance.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 p-6 bg-slate-50">
            <h2 className="text-xl font-semibold mb-2">Email Support</h2>
            <p className="text-slate-600 mb-4">Send us a message and we will respond as soon as possible.</p>
            <button
              onClick={handleEmailSupport}
              className="w-full py-3 bg-[#00236f] text-white rounded-2xl font-semibold hover:bg-[#0d3a74] transition"
            >
              Email support
            </button>
          </div>

          <div className="rounded-3xl border border-slate-200 p-6 bg-slate-50">
            <h2 className="text-xl font-semibold mb-2">Help Resources</h2>
            <p className="text-slate-600 mb-4">
              Explore your dashboard for university guidance, loan tools, and profile tips.
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full py-3 bg-white text-slate-900 border border-slate-200 rounded-2xl font-semibold hover:bg-slate-100 transition"
            >
              Return to dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
