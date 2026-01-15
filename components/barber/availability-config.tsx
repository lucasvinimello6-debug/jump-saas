'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';

interface DayConfig {
    day: string;
    dayIndex: number;
    enabled: boolean;
    startTime: string;
    endTime: string;
    breakStart?: string;
    breakEnd?: string;
}

const DAYS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

export const AvailabilityConfig: React.FC = () => {
    const [daysConfig, setDaysConfig] = useState<DayConfig[]>(
        DAYS.map((day, index) => ({
            day,
            dayIndex: index,
            enabled: index >= 1 && index <= 6, // Segunda a Sábado habilitados por padrão
            startTime: '09:00',
            endTime: '19:00',
            breakStart: '12:00',
            breakEnd: '13:00',
        }))
    );

    const toggleDay = (dayIndex: number) => {
        setDaysConfig((prev) =>
            prev.map((config) =>
                config.dayIndex === dayIndex ? { ...config, enabled: !config.enabled } : config
            )
        );
    };

    const updateTime = (dayIndex: number, field: keyof DayConfig, value: string) => {
        setDaysConfig((prev) =>
            prev.map((config) =>
                config.dayIndex === dayIndex ? { ...config, [field]: value } : config
            )
        );
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-apple-gray-100 dark:bg-black min-h-screen">
            <h1 className="text-2xl font-bold mb-6 text-black dark:text-white">
                Horário de Atendimento
            </h1>

            <Card>
                {daysConfig.map((config, index) => (
                    <div
                        key={config.day}
                        className={`flex flex-col p-4 ${index < daysConfig.length - 1
                                ? 'border-b border-apple-gray-200 dark:border-white/5'
                                : ''
                            }`}
                    >
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-[17px] font-medium text-black dark:text-white">
                                {config.day}
                            </span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={config.enabled}
                                    onChange={() => toggleDay(config.dayIndex)}
                                    className="sr-only peer"
                                />
                                <div className="w-12 h-7 bg-apple-gray-300 peer-focus:outline-none rounded-full peer dark:bg-apple-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-apple-blue-light dark:peer-checked:bg-apple-blue-dark"></div>
                            </label>
                        </div>

                        {config.enabled && (
                            <div className="space-y-3 animate-in fade-in duration-200">
                                <div className="flex gap-4">
                                    <div className="flex flex-col flex-1">
                                        <label className="text-[12px] text-apple-gray-600 dark:text-apple-gray-500 uppercase mb-1">
                                            Início
                                        </label>
                                        <input
                                            type="time"
                                            value={config.startTime}
                                            onChange={(e) => updateTime(config.dayIndex, 'startTime', e.target.value)}
                                            className="bg-transparent text-[17px] text-apple-blue-light dark:text-apple-blue-dark focus:outline-none border-b border-apple-gray-300 dark:border-white/10 pb-1"
                                        />
                                    </div>
                                    <div className="flex flex-col flex-1">
                                        <label className="text-[12px] text-apple-gray-600 dark:text-apple-gray-500 uppercase mb-1">
                                            Fim
                                        </label>
                                        <input
                                            type="time"
                                            value={config.endTime}
                                            onChange={(e) => updateTime(config.dayIndex, 'endTime', e.target.value)}
                                            className="bg-transparent text-[17px] text-apple-blue-light dark:text-apple-blue-dark focus:outline-none border-b border-apple-gray-300 dark:border-white/10 pb-1"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex flex-col flex-1">
                                        <label className="text-[12px] text-apple-gray-600 dark:text-apple-gray-500 uppercase mb-1">
                                            Intervalo (Início)
                                        </label>
                                        <input
                                            type="time"
                                            value={config.breakStart || ''}
                                            onChange={(e) => updateTime(config.dayIndex, 'breakStart', e.target.value)}
                                            className="bg-transparent text-[15px] text-apple-gray-600 dark:text-apple-gray-500 focus:outline-none border-b border-apple-gray-300 dark:border-white/10 pb-1"
                                        />
                                    </div>
                                    <div className="flex flex-col flex-1">
                                        <label className="text-[12px] text-apple-gray-600 dark:text-apple-gray-500 uppercase mb-1">
                                            Intervalo (Fim)
                                        </label>
                                        <input
                                            type="time"
                                            value={config.breakEnd || ''}
                                            onChange={(e) => updateTime(config.dayIndex, 'breakEnd', e.target.value)}
                                            className="bg-transparent text-[15px] text-apple-gray-600 dark:text-apple-gray-500 focus:outline-none border-b border-apple-gray-300 dark:border-white/10 pb-1"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </Card>

            <div className="mt-6">
                <button className="w-full bg-apple-blue-light dark:bg-apple-blue-dark text-white py-4 rounded-apple font-semibold text-lg shadow-lg active:scale-95 transition-transform">
                    Salvar Configurações
                </button>
            </div>
        </div>
    );
};
