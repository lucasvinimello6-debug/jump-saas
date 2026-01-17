'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { AvailabilityConfig } from '@/components/barber/availability-config';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, Settings, LogOut, User } from 'lucide-react';

export default function DashboardPage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'appointments' | 'settings'>('appointments');
    const router = useRouter();

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/login');
            } else {
                setUser(user);
            }
            setLoading(false);
        };
        getUser();
    }, [router]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-apple-gray-100 dark:bg-black">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-apple-blue-light"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-apple-gray-100 dark:bg-black flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-white dark:bg-apple-background-elevated border-r border-apple-gray-200 dark:border-white/5 p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 bg-apple-blue-light rounded-xl flex items-center justify-center text-white">
                        <Calendar size={24} />
                    </div>
                    <span className="text-xl font-bold tracking-tight">JUMP Dashboard</span>
                </div>

                <nav className="flex-1 space-y-2">
                    <button
                        onClick={() => setActiveTab('appointments')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'appointments' ? 'bg-apple-blue-light text-white shadow-lg shadow-blue-500/20' : 'text-apple-gray-600 dark:text-apple-gray-400 hover:bg-apple-gray-100 dark:hover:bg-white/5'}`}
                    >
                        <Clock size={20} />
                        <span className="font-medium">Agenda</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-apple-blue-light text-white shadow-lg shadow-blue-500/20' : 'text-apple-gray-600 dark:text-apple-gray-400 hover:bg-apple-gray-100 dark:hover:bg-white/5'}`}
                    >
                        <Settings size={20} />
                        <span className="font-medium">Configurações</span>
                    </button>
                </nav>

                <div className="mt-auto pt-6 border-t border-apple-gray-200 dark:border-white/5">
                    <div className="flex items-center gap-3 mb-4 px-2">
                        <div className="w-8 h-8 rounded-full bg-apple-gray-200 dark:bg-apple-gray-700 flex items-center justify-center">
                            <User size={16} />
                        </div>
                        <div className="flex flex-col truncate">
                            <span className="text-sm font-medium truncate">{user?.email}</span>
                            <span className="text-[10px] text-apple-gray-500 uppercase">Barbeiro</span>
                        </div>
                    </div>
                    <Button variant="ghost" className="w-full justify-start gap-3 p-2" onClick={handleLogout}>
                        <LogOut size={20} />
                        Sair
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-10 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    {activeTab === 'appointments' ? (
                        <div className="space-y-6">
                            <div className="flex justify-between items-end">
                                <div>
                                    <h1 className="text-3xl font-bold mb-2">Sua Agenda</h1>
                                    <p className="text-apple-gray-600 dark:text-apple-gray-500">
                                        Veja seus próximos agendamentos
                                    </p>
                                </div>
                                <div className="text-right">
                                    <span className="text-4xl font-bold text-apple-blue-light">0</span>
                                    <p className="text-[12px] uppercase text-apple-gray-500 tracking-wider">Cortes hoje</p>
                                </div>
                            </div>

                            <Card className="p-8 text-center bg-white/50 backdrop-blur-md">
                                <CardContent className="flex flex-col items-center py-10">
                                    <div className="w-16 h-16 bg-apple-gray-200 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
                                        <Calendar className="text-apple-gray-400" size={32} />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">Sem agendamentos para hoje</h3>
                                    <p className="text-apple-gray-500 max-w-xs mx-auto">
                                        Quando os clientes agendarem horários, eles aparecerão aqui.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    ) : (
                        <div className="animate-in fade-in slide-in-from-bottom-4">
                            <AvailabilityConfig />
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
