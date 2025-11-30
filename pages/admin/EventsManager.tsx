import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, addDoc, serverTimestamp, orderBy, limit } from 'firebase/firestore';
import { db, auth } from '../../lib/firebase';
import { Plus, Calendar, Image as ImageIcon, Loader } from 'lucide-react';

const EventsManager = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    if (!auth.currentUser) return;
    
    // 1. Get Events
    const q = query(collection(db, 'events'), where('agencyId', '==', auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    
    const eventsList = [];
    
    // 2. For each event, fetch the LATEST photo to use as a thumbnail
    for (const doc of querySnapshot.docs) {
      const eventData = doc.data();
      let coverUrl = null;

      const photoQ = query(
        collection(db, 'photos'), 
        where('eventId', '==', doc.id),
        orderBy('createdAt', 'desc'),
        limit(1)
      );
      const photoSnapshot = await getDocs(photoQ);
      if (!photoSnapshot.empty) {
        coverUrl = photoSnapshot.docs[0].data().originalUrl;
      }

      eventsList.push({ id: doc.id, ...eventData, coverUrl });
    }

    setEvents(eventsList);
    setLoading(false);
  };

  const handleCreate = async () => {
    const name = prompt("Enter Event Name:");
    if (!name) return;
    
    const docRef = await addDoc(collection(db, 'events'), {
      name,
      agencyId: auth.currentUser?.uid,
      date: new Date().toISOString().split('T')[0],
      status: 'active',
      createdAt: serverTimestamp(),
      photoCount: 0
    });
    navigate(`/admin/events/${docRef.id}`);
  };

  if (loading) return <div className="p-10 flex justify-center"><Loader className="animate-spin text-indigo-600" /></div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Event Galleries</h1>
          <p className="text-slate-500">Create and manage your photo events</p>
        </div>
        <button onClick={handleCreate} className="bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-800 transition-colors">
          <Plus className="w-5 h-5" />
          <span>Create New Gallery</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Link key={event.id} to={`/admin/events/${event.id}`} className="group bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all">
            {/* THUMBNAIL AREA */}
            <div className="h-48 bg-slate-100 relative">
              {event.coverUrl ? (
                <img src={event.coverUrl} alt={event.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-300">
                  <ImageIcon className="w-12 h-12" />
                </div>
              )}
              <div className="absolute top-3 right-3 bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded uppercase">
                {event.status}
              </div>
            </div>
            
            <div className="p-5">
              <h3 className="font-bold text-lg text-slate-900 mb-1">{event.name}</h3>
              <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
                <Calendar className="w-4 h-4" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Photos
                </span>
                <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-medium">
                  Manage →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EventsManager;