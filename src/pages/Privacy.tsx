import { motion } from 'motion/react';

export default function Privacy() {
  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <h1 className="text-6xl lg:text-7xl font-black text-white mb-12 tracking-tighter text-gradient">Privacy Policy</h1>
          <div className="space-y-16">
            <section>
              <h2 className="text-3xl font-black text-white mb-6 tracking-tight">What we collect</h2>
              <p className="text-slate-400 leading-relaxed font-medium text-lg">
                Typically: form data, contact details, and analytics events (if enabled). We only collect information that is necessary for us to provide our services and improve your experience on our website.
              </p>
            </section>
            
            <section>
              <h2 className="text-3xl font-black text-white mb-6 tracking-tight">Why we collect it</h2>
              <p className="text-slate-400 leading-relaxed font-medium text-lg">
                To respond to inquiries, improve the website, and measure marketing performance. Your data helps us tailor our communication and ensure we are delivering the most relevant content to you.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-black text-white mb-6 tracking-tight">Data Security</h2>
              <p className="text-slate-400 leading-relaxed font-medium text-lg">
                We take the security of your data seriously and implement appropriate technical and organizational measures to protect it against unauthorized access, loss, or disclosure.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
