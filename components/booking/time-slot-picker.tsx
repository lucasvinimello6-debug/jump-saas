'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { groupSlotsByPeriod } from '@/lib/slots';

interface TimeSlotPickerProps {
    availableSlots: string[];
    onSelectSlot: (slot: string) => void;
    selectedSlot?: string;
}

export const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
    availableSlots,
    onSelectSlot,
    selectedSlot: initialSelectedSlot,
}) => {
    const [selectedSlot, setSelectedSlot] = useState<string | null>(initialSelectedSlot || null);

    const { morning, afternoon, evening } = groupSlotsByPeriod(availableSlots);

    const handleSelectSlot = (slot: string) => {
        setSelectedSlot(slot);
        onSelectSlot(slot);
    };

    return (
        <div className="min-h-screen bg-apple-gray-100 dark:bg-black p-6 font-sans">
            {/* Header Estilo iOS */}
            <header className="mb-8 pt-4">
                <p className="text-apple-blue-light dark:text-apple-blue-dark font-medium mb-1">
                    Passo 2 de 3
                </p>
                <h1 className="text-3xl font-bold text-black dark:text-white tracking-tight">
                    Escolha o horário
                </h1>
            </header>

            <main className="space-y-8 pb-32">
                {/* Seção Manhã */}
                {morning.length > 0 && (
                    <section>
                        <h2 className="text-xs uppercase tracking-widest text-apple-gray-600 dark:text-apple-gray-500 mb-3 ml-2 font-semibold">
                            Manhã
                        </h2>
                        <div className="grid grid-cols-3 gap-3">
                            {morning.map((slot) => (
                                <SlotButton
                                    key={slot}
                                    time={slot}
                                    selected={selectedSlot === slot}
                                    onClick={() => handleSelectSlot(slot)}
                                />
                            ))}
                        </div>
                    </section>
                )}

                {/* Seção Tarde */}
                {afternoon.length > 0 && (
                    <section>
                        <h2 className="text-xs uppercase tracking-widest text-apple-gray-600 dark:text-apple-gray-500 mb-3 ml-2 font-semibold">
                            Tarde
                        </h2>
                        <div className="grid grid-cols-3 gap-3">
                            {afternoon.map((slot) => (
                                <SlotButton
                                    key={slot}
                                    time={slot}
                                    selected={selectedSlot === slot}
                                    onClick={() => handleSelectSlot(slot)}
                                />
                            ))}
                        </div>
                    </section>
                )}

                {/* Seção Noite */}
                {evening.length > 0 && (
                    <section>
                        <h2 className="text-xs uppercase tracking-widest text-apple-gray-600 dark:text-apple-gray-500 mb-3 ml-2 font-semibold">
                            Noite
                        </h2>
                        <div className="grid grid-cols-3 gap-3">
                            {evening.map((slot) => (
                                <SlotButton
                                    key={slot}
                                    time={slot}
                                    selected={selectedSlot === slot}
                                    onClick={() => handleSelectSlot(slot)}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </main>

            {/* Botão de Confirmação Fixo (Apple Style) */}
            <AnimatePresence>
                {selectedSlot && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-10 left-0 right-0 px-6"
                    >
                        <Button size="lg" className="w-full">
                            Confirmar para {selectedSlot}
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Sub-componente do Botão de Slot
interface SlotButtonProps {
    time: string;
    selected: boolean;
    onClick: () => void;
}

const SlotButton: React.FC<SlotButtonProps> = ({ time, selected, onClick }) => (
    <button
        onClick={onClick}
        className={`
      py-4 rounded-apple text-[17px] font-medium transition-all duration-200
      ${selected
                ? 'bg-apple-blue-light dark:bg-apple-blue-dark text-white shadow-lg'
                : 'bg-white dark:bg-apple-background-elevated text-black dark:text-white border border-apple-gray-200 dark:border-white/5'
            }
      active:scale-95
    `}
    >
        {time}
    </button>
);
