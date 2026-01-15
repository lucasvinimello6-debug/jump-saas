'use client';

import { useState } from 'react';
import { TimeSlotPicker } from '@/components/booking/time-slot-picker';
import { generateAvailableSlots } from '@/lib/slots';

export default function BookingPage() {
    const [selectedSlot, setSelectedSlot] = useState<string>();

    // Exemplo: gerar slots das 9h às 18h, com serviço de 45min
    // Horários ocupados: 10:00, 14:30
    const availableSlots = generateAvailableSlots(
        '09:00',
        '18:00',
        45,
        ['10:00', '14:30'],
        '12:00',
        '13:00'
    );

    const handleSelectSlot = (slot: string) => {
        setSelectedSlot(slot);
        console.log('Horário selecionado:', slot);
        // Aqui você implementaria a lógica de confirmação
    };

    return (
        <TimeSlotPicker
            availableSlots={availableSlots}
            onSelectSlot={handleSelectSlot}
            selectedSlot={selectedSlot}
        />
    );
}
