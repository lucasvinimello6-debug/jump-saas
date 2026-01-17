'use client';

import { useState } from 'react';
import { TimeSlotPicker } from '@/components/booking/time-slot-picker';
import { generateAvailableSlots } from '@/lib/slots';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

export default function BookingPage() {
    const [step, setStep] = useState(1);
    const [selectedSlot, setSelectedSlot] = useState<string>();
    const [customerData, setCustomerData] = useState({ name: '', phone: '', email: '' });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const availableSlots = generateAvailableSlots(
        '09:00',
        '18:00',
        45,
        ['10:00', '14:30'],
        '12:00',
        '13:00'
    );

    const handleConfirmBooking = async () => {
        setLoading(true);
        try {
            // No cenário real, buscaríamos o barber_id e service_id
            // Aqui estamos usando IDs fixos baseados no schema.sql
            const { error } = await supabase.from('appointments').insert([
                {
                    client_id: (await supabase.auth.getUser()).data.user?.id || '00000000-0000-0000-0000-000000000000', // Mock se não logado
                    barber_id: '00000000-0000-0000-0000-000000000000', // Mock
                    service_id: '00000000-0000-0000-0000-000000000000', // Mock
                    start_time: new Date().toISOString(), // Simulação
                    end_time: new Date().toISOString(),
                    notes: `Cliente: ${customerData.name}, Tel: ${customerData.phone}`,
                },
            ]);

            alert('Agendamento realizado com sucesso!');
            router.push('/');
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (step === 1) {
        return (
            <TimeSlotPicker
                availableSlots={availableSlots}
                onSelectSlot={(slot) => {
                    setSelectedSlot(slot);
                    setStep(2);
                }}
                selectedSlot={selectedSlot}
            />
        );
    }

    return (
        <main className="min-h-screen bg-apple-gray-100 dark:bg-black p-6 flex items-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Seus Dados</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-apple-gray-600 dark:text-apple-gray-400">
                        Horário selecionado: <span className="font-bold text-apple-blue-light">{selectedSlot}</span>
                    </p>
                    <Input
                        label="Nome"
                        placeholder="Seu nome"
                        value={customerData.name}
                        onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
                    />
                    <Input
                        label="WhatsApp"
                        placeholder="(00) 00000-0000"
                        value={customerData.phone}
                        onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
                    />
                    <Input
                        label="E-mail"
                        placeholder="seu@email.com"
                        value={customerData.email}
                        onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
                    />
                    <div className="flex gap-3 pt-4">
                        <Button variant="secondary" className="flex-1" onClick={() => setStep(1)}>
                            Voltar
                        </Button>
                        <Button className="flex-1" onClick={handleConfirmBooking} disabled={loading}>
                            {loading ? 'Agendando...' : 'Confirmar'}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}
