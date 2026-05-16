import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Users, Home, ArrowRight, Star, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const LandingPage = () => {
  const features = [
    {
      icon: <Home className="text-indigo-400" />,
      title: "Smart Room Allocation",
      description: "Automated and fair room distribution system for students."
    },
    {
      icon: <Zap className="text-purple-400" />,
      title: "Quick Complaints",
      description: "Submit and track maintenance requests in real-time."
    },
    {
      icon: <Shield className="text-pink-400" />,
      title: "Secure Operations",
      description: "Manage leave requests and campus entry with high security."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30 overflow-hidden">
      {/* Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Home size={24} />
          </div>
          <span className="text-2xl font-bold tracking-tight">SmartCampus</span>
        </div>
        <div className="flex gap-4">
          <Link to="/login">
            <Button variant="ghost" className="text-slate-300">Login</Button>
          </Link>
          <Link to="/register">
            <Button>Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-32 relative z-10">
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-4"
          >
            <Star size={16} fill="currentColor" />
            <span>Trusted by 50+ Modern Campuses</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 leading-tight"
          >
            Smarter Hostel Management <br /> for Modern Campuses
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-xl max-w-3xl mx-auto"
          >
            Manage rooms, complaints, leave requests, events, and student operations in one modern platform. Built for the future of campus living.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 pt-4"
          >
            <Link to="/register">
              <Button className="px-8 py-4 text-lg">
                Get Started Now <ArrowRight className="inline ml-2" size={20} />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary" className="px-8 py-4 text-lg">
                Admin Login
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-32 border-t border-slate-900">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <Card key={idx} className="p-8 group">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats/Benefits Section */}
      <section className="max-w-7xl mx-auto px-6 py-32 bg-indigo-600/5 rounded-[40px] border border-indigo-500/10 mb-32">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl font-bold">Why choose SmartCampus?</h2>
            <div className="space-y-4">
              {[
                "99.9% Operational Efficiency",
                "Real-time Tracking & Updates",
                "Zero Paperwork Policy",
                "Advanced Student Analytics"
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="text-green-400" size={20} />
                  <span className="text-slate-300 text-lg">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 w-full">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-20 -z-10 rounded-full" />
              <img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80" 
                alt="Dashboard Preview" 
                className="rounded-3xl shadow-2xl border border-white/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 py-32 text-center">
        <Card className="p-16 border-indigo-500/30 bg-indigo-600/10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Modernize Your Campus?</h2>
          <p className="text-slate-400 text-xl mb-10">Join hundreds of students and administrators who have already simplified their hostel life.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button className="px-10 py-4 text-lg">Get Started Today</Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="px-10 py-4 text-lg border-indigo-500 text-indigo-400">View Demo</Button>
            </Link>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-900">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Home size={18} />
            </div>
            <span className="text-xl font-bold tracking-tight">SmartCampus</span>
          </div>
          <p className="text-slate-500">© 2024 SmartCampus Management System. All rights reserved.</p>
          <div className="flex gap-6 text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
