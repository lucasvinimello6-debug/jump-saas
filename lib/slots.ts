import { addMinutes, format, isAfter, parse } from 'date-fns';

/**
 * Gera horários disponíveis para um barbeiro
 * @param startTime Hora de início (ex: "09:00")
 * @param endTime Hora de fim (ex: "18:00")
 * @param serviceDuration Duração em minutos (ex: 45)
 * @param bookedSlots Horários já ocupados vindos do Supabase (ex: ["10:00", "14:30"])
 * @param breakStart Início do intervalo (opcional)
 * @param breakEnd Fim do intervalo (opcional)
 */
export function generateAvailableSlots(
    startTime: string,
    endTime: string,
    serviceDuration: number,
    bookedSlots: string[] = [],
    breakStart?: string,
    breakEnd?: string
): string[] {
    const slots: string[] = [];
    let currentSlot = parse(startTime, 'HH:mm', new Date());
    const finalSlot = parse(endTime, 'HH:mm', new Date());

    while (isAfter(finalSlot, currentSlot)) {
        const timeString = format(currentSlot, 'HH:mm');

        // Verifica se não está no horário de intervalo
        const isInBreak = breakStart && breakEnd &&
            timeString >= breakStart && timeString < breakEnd;

        // Só adiciona se o horário não estiver ocupado e não estiver no intervalo
        if (!bookedSlots.includes(timeString) && !isInBreak) {
            slots.push(timeString);
        }

        // Adiciona a duração do serviço para o próximo slot
        currentSlot = addMinutes(currentSlot, serviceDuration);
    }

    return slots;
}

/**
 * Agrupa horários por período do dia
 */
export function groupSlotsByPeriod(slots: string[]): {
    morning: string[];
    afternoon: string[];
    evening: string[];
} {
    return {
        morning: slots.filter(slot => slot < '12:00'),
        afternoon: slots.filter(slot => slot >= '12:00' && slot < '18:00'),
        evening: slots.filter(slot => slot >= '18:00'),
    };
}

/**
 * Formata horário para exibição
 */
export function formatTimeSlot(time: string): string {
    return time;
}
