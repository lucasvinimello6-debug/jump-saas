// @ts-nocheck
/// <reference path="./deno.d.ts" />
// @ts-ignore: Deno URL imports
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
// @ts-ignore: Deno URL imports
import twilio from 'https://esm.sh/twilio@4.19.0'

const twilioClient = twilio(
    Deno.env.get('TWILIO_ACCOUNT_SID')!,
    Deno.env.get('TWILIO_AUTH_TOKEN')!
)

Deno.serve(async (req: Request) => {
    const supabase = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // 1. Busca agendamentos nas próximas 2 horas (que não foram notificados)
    const now = new Date().toISOString()
    const twoHoursLater = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString()

    const { data: appointments, error } = await supabase
        .from('appointments')
        .select(`
      id, 
      start_time, 
      client:profiles!appointments_client_id_fkey (full_name, phone),
      service:services (name),
      barber:profiles!appointments_barber_id_fkey (full_name)
    `)
        .eq('reminder_sent', false)
        .eq('status', 'confirmed')
        .gte('start_time', now)
        .lte('start_time', twoHoursLater)

    if (error) {
        console.error('Erro ao buscar agendamentos:', error)
        return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }

    console.log(`Encontrados ${appointments?.length || 0} agendamentos para notificar`)

    // 2. Envia as mensagens
    const results = await Promise.all((appointments || []).map(async (apt: any) => {
        try {
            const timeFormatted = new Date(apt.start_time).toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit'
            })

            await twilioClient.messages.create({
                from: Deno.env.get('TWILIO_WHATSAPP_NUMBER')!,
                to: `whatsapp:${apt.client.phone}`,
                body: `Olá ${apt.client.full_name}! 👋\n\nLembrando do seu horário de ${apt.service.name} às ${timeFormatted} com ${apt.barber.full_name}.\n\nTe esperamos! 💈`
            })

            // 3. Marca como enviado
            await supabase
                .from('appointments')
                .update({ reminder_sent: true })
                .eq('id', apt.id)

            return { id: apt.id, status: 'sent' }
        } catch (e) {
            console.error(`Erro ao enviar para ${apt.id}:`, e)
            const errorMessage = e instanceof Error ? e.message : 'Unknown error'
            return { id: apt.id, status: 'error', error: errorMessage }
        }
    }))

    return new Response(
        JSON.stringify({
            success: true,
            processed: results.length,
            results
        }),
        {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        }
    )
})
