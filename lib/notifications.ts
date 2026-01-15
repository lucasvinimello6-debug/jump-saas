import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export async function sendAppointmentReminder(
    customerPhone: string,
    customerName: string,
    serviceName: string,
    time: string,
    barberName: string
) {
    try {
        const message = await client.messages.create({
            from: process.env.TWILIO_WHATSAPP_NUMBER,
            to: `whatsapp:${customerPhone}`,
            body: `Olá, ${customerName}! 👋\n\nConfirmamos seu horário para *${serviceName}* com o barbeiro *${barberName}*.\n\n📅 Horário: ${time}\n📍 Local: Barbearia Estilo Apple\n\nTe esperamos lá!`,
        });

        return { success: true, sid: message.sid };
    } catch (error) {
        console.error('Erro ao enviar WhatsApp:', error);
        return { success: false, error };
    }
}

export async function sendAppointmentConfirmation(
    customerPhone: string,
    customerName: string,
    serviceName: string,
    time: string,
    barberName: string
) {
    try {
        const message = await client.messages.create({
            from: process.env.TWILIO_WHATSAPP_NUMBER,
            to: `whatsapp:${customerPhone}`,
            body: `✅ Agendamento confirmado!\n\nOlá, ${customerName}!\n\nSeu horário foi confirmado:\n\n🔹 Serviço: ${serviceName}\n🔹 Profissional: ${barberName}\n🔹 Data/Hora: ${time}\n\nVocê receberá um lembrete 2 horas antes. Até lá! 💈`,
        });

        return { success: true, sid: message.sid };
    } catch (error) {
        console.error('Erro ao enviar confirmação:', error);
        return { success: false, error };
    }
}
