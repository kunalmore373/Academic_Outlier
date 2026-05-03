import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        gpa: '',
        annualBudget: '',
        targetDestinations: '',
        currentDegree: '',
        avatar: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get('/users/me');
                const u = response.data.user;
                setUser(u);
                setFormData({
                    name: u.profile?.name || '',
                    avatar: u.profile?.avatar || '',
                    gpa: u.profile?.academicStanding?.gpa || '',
                    annualBudget: u.profile?.annualBudget || '',
                    targetDestinations: u.profile?.targetDestinations?.join(', ') || '',
                    currentDegree: u.profile?.currentDegree || ''
                });
            } catch (err) {
                console.error('Error fetching profile:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            const data = {
                name: formData.name,
                gpa: Number(formData.gpa),
                annualBudget: Number(formData.annualBudget),
                currentDegree: formData.currentDegree,
                targetDestinations: formData.targetDestinations.split(',').map(d => d.trim())
            };
            
            await api.patch('/users/profile', data);
            setMessage('Profile updated successfully!');
            setIsEditing(false);
            // Sync user state
            setUser(prev => ({
                ...prev,
                profile: {
                    ...prev.profile,
                    name: data.name,
                    currentDegree: data.currentDegree,
                    annualBudget: data.annualBudget,
                    targetDestinations: data.targetDestinations,
                    academicStanding: { ...(prev?.profile?.academicStanding || {}), gpa: data.gpa }
                }
            }));
        } catch (err) {
            console.error('Update failed:', err);
            setError(err.response?.data?.message || 'Failed to update profile.');
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formDataToUpload = new FormData();
        formDataToUpload.append('avatar', file);

        setLoading(true);
        try {
            const response = await api.post('/users/upload-avatar', formDataToUpload, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            const newAvatar = response.data.avatar;
            setUser(prev => ({
                ...prev,
                profile: { ...prev.profile, avatar: newAvatar }
            }));
            setFormData(prev => ({ ...prev, avatar: newAvatar }));
            setMessage('Avatar updated successfully!');
        } catch (err) {
            console.error('Upload failed:', err);
            setError('Failed to upload image.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00236f]"></div>
        </div>
    );

    return (
        <div className="antialiased min-h-screen flex bg-[#f7f9fb] text-slate-900 font-['Inter']">
            {/* Sidebar */}
            <nav className="h-screen w-64 fixed left-0 top-0 flex flex-col bg-white border-r border-slate-200/60 z-50">
                <div className="flex flex-col h-full py-8 text-left">
                    <div className="px-8 mb-10 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#00236f] flex items-center justify-center text-white font-bold shadow-lg shadow-blue-900/20">
                            {user?.profile?.name?.[0] || 'A'}
                        </div>
                        <div>
                            <h1 className="text-lg font-black tracking-tight text-[#00236f]">The Atelier</h1>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Student Portal</p>
                        </div>
                    </div>
                    <ul className="flex flex-col gap-1 px-4 flex-grow">
                        <li>
                            <div onClick={() => navigate('/dashboard')} className="flex items-center gap-4 text-slate-500 font-semibold px-4 py-3 hover:bg-slate-50 rounded-xl transition-all cursor-pointer">
                                <span className="material-symbols-outlined text-[20px]">dashboard</span>
                                <span className="text-sm">Overview</span>
                            </div>
                        </li>
                        <li>
                            <div onClick={() => navigate('/university')} className="flex items-center gap-4 text-slate-500 font-semibold px-4 py-3 hover:bg-slate-50 rounded-xl transition-all cursor-pointer">
                                <span className="material-symbols-outlined text-[20px]">school</span>
                                <span className="text-sm">Universities</span>
                            </div>
                        </li>
                        <li>
                            <div onClick={() => navigate('/loans')} className="flex items-center gap-4 text-slate-500 font-semibold px-4 py-3 hover:bg-slate-50 rounded-xl transition-all cursor-pointer">
                                <span className="material-symbols-outlined text-[20px]">payments</span>
                                <span className="text-sm">Loan Tools</span>
                            </div>
                        </li>
                        <li>
                            <div onClick={() => navigate('/profile')} className="flex items-center gap-4 text-[#00236f] font-bold bg-blue-50 rounded-xl px-4 py-3 transition-all cursor-pointer">
                                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                                <span className="text-sm">Profile</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Main Content */}
            <main className="ml-64 p-12 w-full">
                <header className="mb-12 text-left">
                    <h2 className="text-4xl font-black text-[#00236f] tracking-tight mb-2">Scholar Profile</h2>
                    <p className="text-slate-500 text-lg">Manage your academic identity and preferences.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left Column: Summary & Security */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 text-center">
                            <div className="relative inline-block mb-6">
                                <img 
                                    className="w-32 h-32 rounded-full object-cover ring-4 ring-blue-50 shadow-xl" 
                                    src={((user?.profile?.avatar || "").startsWith('http') ? user.profile.avatar : `${import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || 'https://academic-outlier.onrender.com'}${user?.profile?.avatar}`) || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} 
                                    alt="Avatar" 
                                />
                                <label className="absolute bottom-0 right-0 p-2 bg-[#00236f] text-white rounded-full shadow-lg border-4 border-white hover:scale-110 transition-transform cursor-pointer">
                                    <span className="material-symbols-outlined text-sm">photo_camera</span>
                                    <input 
                                        type="file" 
                                        className="hidden" 
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </label>
                            </div>
                            <h3 className="text-2xl font-black text-[#00236f] tracking-tight">{user?.profile?.name || 'Scholar'}</h3>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">{user?.email}</p>
                            
                            <div className="mt-8 pt-8 border-t border-slate-50 flex justify-around">
                                <div>
                                    <p className="text-xl font-black text-[#00236f]">{user?.profile?.academicStanding?.gpa || '0.0'}</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">Current GPA</p>
                                </div>
                                <div className="border-l border-slate-100"></div>
                                <div>
                                    <p className="text-xl font-black text-[#00236f]">{user?.profile?.targetDestinations?.length || '0'}</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">Destinations</p>
                                </div>
                            </div>
                        </div>

                        {/* Security Card */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                             <h3 className="text-sm font-black text-[#00236f] uppercase tracking-widest mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-blue-600">shield</span>
                                Security & Access
                             </h3>
                             <p className="text-xs text-slate-500 mb-6 text-left">Need to update your credentials? Reset your password securely via OTP.</p>
                             <button 
                                onClick={() => navigate('/user/forgot-password')}
                                className="w-full py-4 border border-slate-100 bg-slate-50 text-[#00236f] rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                             >
                                <span className="material-symbols-outlined text-sm">lock_reset</span>
                                Reset My Password
                             </button>
                        </div>
                    </div>

                    {/* Right Column: Edit Details */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-3xl p-10 shadow-sm border border-slate-100">
                            <div className="flex justify-between items-center mb-10">
                                <h3 className="text-xl font-black text-[#00236f]">Academic Identity</h3>
                                {!isEditing && (
                                    <button 
                                        onClick={() => setIsEditing(true)}
                                        className="px-6 py-2 border border-slate-200 rounded-xl text-xs font-black uppercase text-slate-500 hover:text-[#00236f] hover:border-[#00236f] transition-all"
                                    >
                                        Edit Profile
                                    </button>
                                )}
                            </div>

                            {message && <p className="mb-6 text-sm font-bold text-green-600 bg-green-50 p-4 rounded-xl">{message}</p>}
                            {error && <p className="mb-6 text-sm font-bold text-red-600 bg-red-50 p-4 rounded-xl">{error}</p>}

                            <form onSubmit={handleUpdate} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="text-left">
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                                        <input 
                                            disabled={!isEditing}
                                            className="w-full bg-slate-50 border-none rounded-xl px-5 py-3 text-sm font-semibold focus:ring-2 focus:ring-blue-100 disabled:opacity-60"
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        />
                                    </div>
                                    <div className="text-left">
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Current Degree</label>
                                        <input 
                                            disabled={!isEditing}
                                            className="w-full bg-slate-50 border-none rounded-xl px-5 py-3 text-sm font-semibold focus:ring-2 focus:ring-blue-100 disabled:opacity-60"
                                            value={formData.currentDegree}
                                            onChange={(e) => setFormData({...formData, currentDegree: e.target.value})}
                                        />
                                    </div>
                                    <div className="text-left">
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Academic GPA</label>
                                        <input 
                                            disabled={!isEditing}
                                            type="number" step="0.01"
                                            className="w-full bg-slate-50 border-none rounded-xl px-5 py-3 text-sm font-semibold focus:ring-2 focus:ring-blue-100 disabled:opacity-60"
                                            value={formData.gpa}
                                            onChange={(e) => setFormData({...formData, gpa: e.target.value})}
                                        />
                                    </div>
                                    <div className="text-left">
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Annual Budget ($)</label>
                                        <input 
                                            disabled={!isEditing}
                                            type="number"
                                            className="w-full bg-slate-50 border-none rounded-xl px-5 py-3 text-sm font-semibold focus:ring-2 focus:ring-blue-100 disabled:opacity-60"
                                            value={formData.annualBudget}
                                            onChange={(e) => setFormData({...formData, annualBudget: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div className="text-left">
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Target Destinations (comma separated)</label>
                                    <input 
                                        disabled={!isEditing}
                                        className="w-full bg-slate-50 border-none rounded-xl px-5 py-3 text-sm font-semibold focus:ring-2 focus:ring-blue-100 disabled:opacity-60"
                                        value={formData.targetDestinations}
                                        onChange={(e) => setFormData({...formData, targetDestinations: e.target.value})}
                                    />
                                </div>

                                {isEditing && (
                                    <div className="flex gap-4 pt-4">
                                        <button 
                                            type="submit"
                                            className="flex-1 bg-[#00236f] text-white py-4 rounded-2xl font-black uppercase text-xs shadow-lg shadow-blue-900/20 hover:scale-[1.02] transition-all"
                                        >
                                            Save Changes
                                        </button>
                                        <button 
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                            className="px-10 border border-slate-200 rounded-2xl font-black uppercase text-xs text-slate-400 hover:bg-slate-50 transition-all"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Profile;
