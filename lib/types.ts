// Tipos de usuário
export type UserRole = 'admin' | 'barber' | 'customer';

export interface Profile {
    id: string;
    full_name: string;
    avatar_url?: string;
    phone?: string;
    email: string;
    role: UserRole;
    created_at: string;
}

// Serviços oferecidos
export interface Service {
    id: string;
    name: string;
    description: string;
    price: number;
    duration_minutes: number;
    color_code?: string;
    created_at: string;
}

// Agendamentos
export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Appointment {
    id: string;
    client_id: string;
    barber_id: string;
    service_id: string;
    start_time: string;
    end_time: string;
    status: AppointmentStatus;
    reminder_sent: boolean;
    notes?: string;
    created_at: string;

    // Relações (quando populadas)
    client?: Profile;
    barber?: Profile;
    service?: Service;
}

// Disponibilidade do barbeiro
export interface BarberAvailability {
    id: string;
    barber_id: string;
    day_of_week: number; // 0 (Domingo) a 6 (Sábado)
    is_enabled: boolean;
    start_time: string; // HH:mm
    end_time: string; // HH:mm
    break_start?: string; // HH:mm
    break_end?: string; // HH:mm
}

// Datas bloqueadas (folgas, férias)
export interface BlockedDate {
    id: string;
    barber_id: string;
    date: string; // YYYY-MM-DD
    reason?: string;
    created_at: string;
}

// Time slot para seleção
export interface TimeSlot {
    time: string; // HH:mm
    available: boolean;
    reason?: string; // Se não disponível, motivo
}
