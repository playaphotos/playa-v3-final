import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DollarSign, Users, Image as ImageIcon, TrendingUp, Plus, ArrowUpRight, CreditCard, Settings } from 'lucide-react';

const Dashboard: React.FC = () => {
  // MOCK DATA for the "Empire" feel
  const stats = [
    { label: 'Total Revenue', value: '$12,450.00', change: '+12.5%', icon: DollarSign, color: 'bg-green-500/20 text-green-400' },
    { label: 'Active Events', value: '14', change: '+2', icon: ImageIcon, color: 'bg-indigo-500/20 text-indigo-400' },
    { label: 'Total Guests', value: '3,842', change: '+124', icon: Users, color: 'bg-purple-500/20 text-purple-400' },
    { label: 'Avg. Order Value', value: '$24.50', change: '+5.2%', icon: TrendingUp, color: 'bg-orange-500/20 text-orange-400' },
  ];

  const recentEvents = [
    { id: 1, name: 'Summer Gala 2025', date: 'Live Now', revenue: '$1,240', status: 'Active' },
    { id: 2, name: 'TechCrunch Disrupt', date: 'Oct 24, 2025', revenue: '$4,500', status: 'Completed' },
    { id: 3, name: 'Smith Wedding', date: 'Oct 12, 2025', revenue: '$850', status: 'Completed' },
  ];

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-slate-500">Welcome back, Mike. Here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-50 flex items-center gap-2">
             <Settings size={18}/> Settings
          </button>
          <Link to="/admin/events/new" className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-500 shadow-lg shadow-indigo-500/20 flex items-center gap-2">
             <Plus size={18}/> Create Event
          </Link>
        </div>
      </div>

      {/* STRIPE CONNECT BANNER (The "Ownership" Hook) */}
      <div className="mb-8 p-6 bg-slate-900 rounded-2xl text-white flex flex-col md:flex-row items-center justify-between shadow-xl">
         <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
               <CreditCard size={32} className="text-white"/>
            </div>
            <div>
               <h3 className="font-bold text-lg">Connect Payouts</h3>
               <p className="text-slate-400 text-sm">Connect your Stripe account to receive 100% of revenue instantly.</p>
            </div>
         </div>
         <button className="px-6 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-colors flex items-center gap-2">
            Connect Stripe <ArrowUpRight size={18}/>
         </button>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
               <div className={`p-3 rounded-xl ${stat.color}`}>
                 <stat.icon size={24} />
               </div>
               <span className="text-green-500 text-xs font-bold bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
                 {stat.change} <ArrowUpRight size={12}/>
               </span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium mb-1">{stat.label}</h3>
            <p className="text-3xl font-extrabold text-slate-900">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* RECENT ACTIVITY TABLE */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
           <h3 className="font-bold text-lg text-slate-900">Recent Events</h3>
           <Link to="/admin/events" className="text-indigo-600 text-sm font-bold hover:underline">View All</Link>
        </div>
        <div className="overflow-x-auto">
           <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                 <tr>
                    <th className="p-4 font-bold">Event Name</th>
                    <th className="p-4 font-bold">Date</th>
                    <th className="p-4 font-bold">Status</th>
                    <th className="p-4 font-bold text-right">Revenue</th>
                    <th className="p-4 font-bold text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                 {recentEvents.map((event) => (
                    <tr key={event.id} className="hover:bg-slate-50 transition-colors">
                       <td className="p-4 font-bold text-slate-900">{event.name}</td>
                       <td className="p-4 text-slate-500">{event.date}</td>
                       <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${event.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                             {event.status}
                          </span>
                       </td>
                       <td className="p-4 text-right font-bold text-slate-900">{event.revenue}</td>
                       <td className="p-4 text-right">
                          <Link to={`/admin/events/${event.id}`} className="text-slate-400 hover:text-indigo-600 font-bold text-sm">Manage</Link>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;