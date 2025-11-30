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
    // FIX: Wait for Firebase to verify the user BEFORE fetching
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchEvents(user);
      } else {
        // If not logged in, stop loading (the router will likely redirect to login)
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchEvents = async (user: any) => {
    try {
      // 1. Get Events for this Agency
      const q = query(collection(db, 'events'), where('agencyId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      
      const eventsList = [];
      
      // 2. Fetch Thumbnails
      for (const doc of querySnapshot.docs) {
        const eventData = doc.data();
        let coverUrl = null;

        // Note: We removed 'orderBy' to avoid Index errors for now
        const photoQ = query(
          collection(db, 'photos'), 
          where('eventId', '==', doc.id),
          limit(1)
        );
        const photoSnapshot = await getDocs(photoQ);
        if (!photoSnapshot.empty) {
          coverUrl = photoSnapshot.docs[0].data().originalUrl;
        }

        eventsList.push({ id: doc.id, ...eventData, coverUrl });
      }

      setEvents(eventsList);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    const name = prompt("Enter Event Name:");
    if (!name) return;
    
    if (!auth.currentUser) return;

    try {
      const docRef = await addDoc(collection(db, 'events'), {
        name,
        agencyId: auth.currentUser.uid,
        date: new Date().toISOString().split('T')[0],
        status: 'active',
        createdAt: serverTimestamp(),
        photoCount: 0
      });
      navigate(`/admin/events/${docRef.id}`);
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Could not create event. Check console.");
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-64 text-slate-400">
      <Loader className="w-8 h-8 animate-spin mb-4 text-indigo-600" />
      <p>Loading your galleries...</p>
    </div>
  );

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

      {events.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
          <ImageIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900">No events yet</h3>
          <p className="text-slate-500 mb-6">Create your first event to start uploading photos</p>
          <button onClick={handleCreate} className="text-indigo-600 font-semibold hover:underline">
            Create an Event Now
          </button>
        </div>
      ) : (
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
                    {/* Placeholder for Photo Count */}
                    View Gallery
                  </span>
                  <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-medium">
                    Manage →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsManager;