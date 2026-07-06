import { motion } from 'motion/react';
import { Icon } from './Icon';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-12 sm:mt-24 overflow-hidden">
      {/* Top Decorative Wave */}
      <div className="relative">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,0 L0,0 Z" fill="url(#footerGrad1)" />
          <defs>
            <linearGradient id="footerGrad1" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0d9488" />
              <stop offset="0.5" stopColor="#0891b2" />
              <stop offset="1" stopColor="#6366f1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main Footer Body */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        {/* Floating Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="footer-spin absolute -top-20 -right-20 w-64 h-64 sm:w-96 sm:h-96 border border-teal-500/10 rounded-full"></div>
          <div className="footer-spin absolute -bottom-32 -left-32 w-80 h-80 sm:w-[28rem] sm:h-[28rem] border border-indigo-500/10 rounded-full" style={{ animationDirection: 'reverse' }}></div>
          <div className="absolute top-10 left-1/4 w-3 h-3 bg-teal-400/30 rounded-full footer-float"></div>
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-cyan-400/30 rounded-full footer-float-reverse"></div>
          <div className="absolute bottom-1/4 left-1/2 w-4 h-4 bg-indigo-400/20 rounded-full footer-float"></div>
          <div className="absolute top-1/2 right-10 w-2 h-2 bg-rose-400/30 rounded-full footer-float-reverse"></div>
          <div className="absolute bottom-10 right-1/4 w-3 h-3 bg-amber-400/20 rounded-full footer-float"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 py-10 sm:py-16">
          {/* Bangladesh Pride Banner */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-14"
          >
            <div className="inline-flex items-center gap-3 sm:gap-5 bg-gradient-to-r from-teal-500/20 via-cyan-500/20 to-indigo-500/20 backdrop-blur-sm px-5 sm:px-10 py-3 sm:py-4 rounded-full border border-white/10 shadow-xl mb-4 sm:mb-6">
              <span className="text-2xl sm:text-4xl">🇧🇩</span>
              <p className="text-base sm:text-2xl font-black bg-gradient-to-r from-teal-300 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                বাংলা আমার মাতৃভাষা
              </p>
              <span className="text-2xl sm:text-4xl">💙</span>
            </div>
            <p className="text-slate-400 text-xs sm:text-base font-medium">
              Made with ❤️ | ৫টি লার্নিং মোড • Google TTS • Fully Responsive
            </p>
          </motion.div>

          {/* Developer Profile Card */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="relative bg-gradient-to-br from-[#161b22]/90 to-[#0d1117]/75 backdrop-blur-md rounded-[2rem] p-5 sm:p-10 border border-[#30363d] footer-border-glow shadow-2xl mb-8 sm:mb-12 overflow-hidden"
          >
            {/* Card Shimmer Overlay */}
            <div className="footer-shimmer absolute inset-0 rounded-[2rem] pointer-events-none"></div>

            <div className="relative z-10">
              {/* Top Accent Line */}
              <div className="h-1 w-24 sm:w-40 bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 rounded-full mb-6 sm:mb-10 mx-auto sm:mx-0"></div>

              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 sm:gap-10">
                {/* Avatar Section */}
                <div className="flex-shrink-0 relative">
                  <div className="footer-float relative">
                    <div className="w-28 h-28 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-teal-400 via-cyan-500 to-indigo-500 p-1 shadow-2xl shadow-teal-500/30">
                      <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
                        <img
                          src="https://i.imgur.com/akJtZZb.jpeg"
                          alt="Md. Ismail Hossain"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                    {/* Status Badge */}
                    <div className="absolute -bottom-1 -right-1 w-9 h-9 sm:w-12 sm:h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg border-3 border-slate-800">
                      <Icon name="CheckCircle2" className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                    </div>
                  </div>
                </div>

                {/* Info Section */}
                <div className="flex-1 text-center lg:text-left">
                  {/* Name */}
                  <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black mb-1 sm:mb-2 leading-tight">
                    <span className="bg-gradient-to-r from-white via-teal-200 to-cyan-200 bg-clip-text text-transparent">
                      Md. Ismail Hossain
                    </span>
                  </h3>

                  {/* Title Badge */}
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border border-teal-400/30 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6 mt-2 sm:mt-3">
                    <Icon name="GraduationCap" className="w-4 h-4 sm:w-5 sm:h-5 text-teal-300" />
                    <span className="text-teal-200 text-xs sm:text-sm font-bold">Assistant Teacher</span>
                  </div>

                  {/* School Info */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-3 sm:p-5 border border-white/10 mb-4 sm:mb-6">
                    <div className="flex items-start gap-2 sm:gap-3 mb-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Icon name="School" className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="text-white font-bold text-sm sm:text-lg leading-tight">Uttar Deshanterkathi GPS</p>
                        <p className="text-slate-400 text-xs sm:text-sm">Betagi, Barguna</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Icon name="MapPin" className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="text-white font-bold text-sm sm:text-lg leading-tight">Betagi Upazilla</p>
                        <p className="text-slate-400 text-xs sm:text-sm">Barguna, Barisal Division, Bangladesh</p>
                      </div>
                    </div>
                  </div>

                  {/* Qualifications Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
                    {[
                      { icon: 'BookOpen', label: 'B.A. (Hons)', color: 'from-amber-500 to-orange-500' },
                      { icon: 'Award', label: 'B.Ed.', color: 'from-emerald-500 to-green-500' },
                      { icon: 'Library', label: 'M.A. in English', color: 'from-blue-500 to-indigo-500' },
                    ].map((q, i) => (
                      <div key={i} className="flex items-center gap-2 sm:gap-3 bg-white/5 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 border border-white/5">
                        <div className={`w-7 h-7 sm:w-9 sm:h-9 bg-gradient-to-br ${q.color} rounded-lg flex items-center justify-center flex-shrink-0 shadow-md`}>
                          <Icon name={q.icon} className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-white" />
                        </div>
                        <span className="text-white text-xs sm:text-sm font-bold">{q.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* British Council Training - Special Highlight */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative bg-gradient-to-r from-rose-500/10 via-purple-500/10 to-indigo-500/10 border-2 border-rose-400/20 rounded-2xl sm:rounded-3xl p-3 sm:p-5 overflow-hidden"
                  >
                    <div className="footer-shimmer absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none"></div>
                    <div className="relative z-10 flex items-start gap-2 sm:gap-4 text-left">
                      <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-rose-500 via-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl">
                        <span className="text-lg sm:text-2xl">🇬🇧</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] sm:text-xs font-black text-rose-300 uppercase tracking-widest bg-rose-500/20 px-2 py-0.5 rounded-full">Special Training</span>
                          <Icon name="Star" className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
                        </div>
                        <p className="text-white text-xs sm:text-base font-bold leading-relaxed">
                          Specially trained under <span className="text-rose-300">British Council</span> in Bangladesh for <span className="text-purple-300">Master Trainer of English</span> of Primary Education
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Bottom Accent Line */}
              <div className="h-1 w-24 sm:w-40 bg-gradient-to-r from-indigo-400 via-purple-400 to-rose-400 rounded-full mt-6 sm:mt-10 mx-auto sm:mx-0 sm:ml-auto"></div>
            </div>
          </motion.div>

          {/* Contact Cards Grid */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-6 sm:mb-10"
          >
            {/* Phone */}
            <motion.a
              href="tel:01728295215"
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center gap-3 sm:gap-4 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-3 sm:p-5 border border-teal-400/20 hover:border-teal-400/50 transition-all shadow-lg hover:shadow-teal-500/10 text-left"
            >
              <div className="w-11 h-11 sm:w-14 sm:h-14 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl group-hover:shadow-teal-500/40 transition-shadow">
                <Icon name="Phone" className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-slate-400 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mb-0.5">Mobile</p>
                <p className="text-white font-black text-sm sm:text-xl tracking-wide">01728-295215</p>
              </div>
              <Icon name="ArrowUpRight" className="w-4 h-4 sm:w-6 sm:h-6 text-teal-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
            </motion.a>

            {/* WhatsApp */}
            <motion.a
              href="https://wa.me/8801728295215"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center gap-3 sm:gap-4 bg-gradient-to-r from-green-500/10 to-lime-500/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-3 sm:p-5 border border-green-400/20 hover:border-green-400/50 transition-all shadow-lg hover:shadow-green-500/10 text-left"
            >
              <div className="w-11 h-11 sm:w-14 sm:h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl group-hover:shadow-green-500/40 transition-shadow">
                <svg className="w-5 h-5 sm:w-7 sm:h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-slate-400 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mb-0.5">WhatsApp</p>
                <p className="text-white font-black text-sm sm:text-xl tracking-wide">01728-295215</p>
              </div>
              <Icon name="ArrowUpRight" className="w-4 h-4 sm:w-6 sm:h-6 text-green-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
            </motion.a>

            {/* Email */}
            <motion.a
              href="mailto:ismailhossain627@yahoo.com"
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center gap-3 sm:gap-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-3 sm:p-5 border border-indigo-400/20 hover:border-indigo-400/50 transition-all shadow-lg hover:shadow-indigo-500/10 text-left"
            >
              <div className="w-11 h-11 sm:w-14 sm:h-14 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl group-hover:shadow-indigo-500/40 transition-shadow">
                <Icon name="Mail" className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-slate-400 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mb-0.5">E-mail</p>
                <p className="text-white font-black text-[11px] sm:text-base tracking-wide break-all">ismailhossain627@yahoo.com</p>
              </div>
              <Icon name="ArrowUpRight" className="w-4 h-4 sm:w-6 sm:h-6 text-indigo-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
            </motion.a>

            {/* Facebook */}
            <motion.a
              href="https://web.facebook.com/facebook.comismailhossain1983"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center gap-3 sm:gap-4 bg-gradient-to-r from-blue-500/10 to-blue-600/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-3 sm:p-5 border border-blue-400/20 hover:border-blue-400/50 transition-all shadow-lg hover:shadow-blue-500/10 text-left"
            >
              <div className="w-11 h-11 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl group-hover:shadow-blue-500/40 transition-shadow">
                <svg className="w-5 h-5 sm:w-7 sm:h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-slate-400 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mb-0.5">Facebook</p>
                <p className="text-white font-black text-sm sm:text-xl tracking-wide">Follow</p>
              </div>
              <Icon name="ArrowUpRight" className="w-4 h-4 sm:w-6 sm:h-6 text-blue-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
            </motion.a>
          </motion.div>

          {/* Social Media Circular Buttons Row */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6 sm:mb-10"
          >
            <motion.a
              href="https://wa.me/8801728295215"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -4 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-xl hover:shadow-green-500/40 transition-all border border-green-400/20"
              title="WhatsApp"
            >
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </motion.a>

            <motion.a
              href="https://web.facebook.com/facebook.comismailhossain1983"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -4 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-xl hover:shadow-blue-500/40 transition-all border border-blue-400/20"
              title="Facebook"
            >
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </motion.a>

            <motion.a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -4 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl flex items-center justify-center shadow-xl hover:shadow-slate-500/40 transition-all border border-slate-500/20"
              title="Twitter / X"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </motion.a>

            <motion.a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -4 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-2xl flex items-center justify-center shadow-xl hover:shadow-pink-500/40 transition-all border border-pink-400/20"
              title="Instagram"
            >
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </motion.a>

            <motion.a
              href="tel:01728295215"
              whileHover={{ scale: 1.15, y: -4 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-xl hover:shadow-teal-500/40 transition-all border border-teal-400/20"
              title="Call Now"
            >
              <Icon name="Phone" className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </motion.a>

            <motion.a
              href="mailto:ismailhossain627@yahoo.com"
              whileHover={{ scale: 1.15, y: -4 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-indigo-400 to-violet-500 rounded-2xl flex items-center justify-center shadow-xl hover:shadow-indigo-500/40 transition-all border border-indigo-400/20"
              title="Send Email"
            >
              <Icon name="Mail" className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </motion.a>
          </motion.div>

          {/* Location Map */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mb-6 sm:mb-10"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-5 justify-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <Icon name="MapPin" className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <h4 className="text-white font-black text-base sm:text-2xl">আমাদের অবস্থান</h4>
            </div>

            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-[#30363d] footer-border-glow">
              {/* Map Glow Overlay Top */}
              <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none flex items-start justify-center pt-3">
                <span className="bg-slate-900/95 backdrop-blur-sm text-white text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-[#30363d] shadow-lg flex items-center gap-1.5">
                  <Icon name="Navigation" className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />
                  Uttar Deshanterkathi GPS, Betagi, Barguna
                </span>
              </div>

              <iframe
                src="https://www.google.com/maps?q=Uttar+Deshanterkathi+Government+Primary+School+Betagi+Barguna+Bangladesh&output=embed"
                width="100%"
                height="280"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(110%) saturate(80%)' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Uttar Deshanterkathi GPS Location"
                className="w-full block"
              ></iframe>

              {/* Map Glow Overlay Bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-slate-900/40 to-transparent z-10 pointer-events-none"></div>
            </div>

            {/* Map Action Buttons */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-3 sm:mt-4">
              <motion.a
                href="https://www.google.com/maps/search/Uttar+Deshanterkathi+Government+Primary+School+Betagi+Barguna+Bangladesh"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-400/30 px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-white text-xs sm:text-sm font-bold hover:from-red-500/30 hover:to-orange-500/30 transition-all shadow-lg"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                Google Maps-এ দেখুন
              </motion.a>
              <motion.a
                href="https://www.google.com/maps/dir/?api=1&destination=Uttar+Deshanterkathi+Government+Primary+School+Betagi+Barguna+Bangladesh"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-400/30 px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-white text-xs sm:text-sm font-bold hover:from-blue-500/30 hover:to-indigo-500/30 transition-all shadow-lg"
              >
                <Icon name="Navigation" className="w-4 h-4 sm:w-5 sm:h-5" />
                Directions / রাস্তা দেখুন
              </motion.a>
            </div>
          </motion.div>

          {/* Feature Tags Row */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-10"
          >
            {[
              { label: '📚 ৫টি মোড', bg: 'from-teal-500/20 to-cyan-500/20', border: 'border-teal-400/20' },
              { label: '🔊 Google TTS', bg: 'from-blue-500/20 to-indigo-500/20', border: 'border-blue-400/20' },
              { label: '🧠 কুইজ মোড', bg: 'from-green-500/20 to-emerald-500/20', border: 'border-green-400/20' },
              { label: '✍️ কার শিক্ষা', bg: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-400/20' },
              { label: '📱 Responsive', bg: 'from-rose-500/20 to-orange-500/20', border: 'border-rose-400/20' },
              { label: '🇬🇧 British Council', bg: 'from-amber-500/20 to-yellow-500/20', border: 'border-amber-400/20' },
              { label: '📍 Google Map', bg: 'from-red-500/20 to-orange-500/20', border: 'border-red-400/20' },
              { label: '☪ আরবি বর্ণ', bg: 'from-emerald-500/20 to-teal-500/20', border: 'border-emerald-400/20' },
              { label: '💬 WhatsApp', bg: 'from-green-500/20 to-lime-500/20', border: 'border-green-400/20' },
            ].map((tag, i) => (
              <span key={i} className={`bg-gradient-to-r ${tag.bg} ${tag.border} border px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-bold text-white/80`}>
                {tag.label}
              </span>
            ))}
          </motion.div>

          {/* Bottom Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-5 sm:mb-8"></div>

          {/* Copyright Line */}
          <div className="text-center space-y-2 sm:space-y-3">
            <p className="text-slate-500 text-[10px] sm:text-sm font-medium">
              © {currentYear} বর্ণমালা মজা — All Rights Reserved
            </p>
            <p className="text-slate-600 text-[9px] sm:text-xs font-medium flex flex-wrap items-center justify-center gap-1 sm:gap-2">
              <span>Designed & Developed with</span>
              <span className="text-red-400 text-sm sm:text-lg">❤️</span>
              <span>by</span>
              <span className="text-teal-400 font-bold">Md. Ismail Hossain</span>
            </p>
          </div>
        </div>

        {/* Bottom Decorative Wave */}
        <div className="relative -mb-1">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
            <path d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z" fill="#0d1117" />
          </svg>
        </div>
      </div>
    </footer>
  );
}
