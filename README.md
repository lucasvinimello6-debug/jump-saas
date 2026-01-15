# Barbearia SaaS - Sistema de Agendamento

Sistema completo de agendamento para barbearias com design inspirado no ecossistema Apple.

## 🚀 Tecnologias

- **Frontend**: Next.js 14 + TypeScript
- **Styling**: Tailwind CSS (paleta Apple)
- **Animações**: Framer Motion
- **Backend**: Supabase (PostgreSQL)
- **Notificações**: Twilio (WhatsApp)
- **Datas**: date-fns

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Copiar variáveis de ambiente
cp .env.local.example .env.local

# Configurar suas credenciais no .env.local
```

## 🔧 Configuração

### 1. Supabase

1. Crie um projeto em [supabase.com](https://supabase.com)
2. Execute o script `supabase/schema.sql` no SQL Editor
3. Copie as credenciais para `.env.local`

### 2. Twilio

1. Crie uma conta em [twilio.com](https://twilio.com)
2. Configure o WhatsApp Sandbox
3. Adicione as credenciais no `.env.local`

### 3. Edge Function (Lembretes Automáticos)

```bash
# Instalar Supabase CLI
npm install -g supabase

# Deploy da função
supabase functions deploy send-reminders

# Configurar cron job (executar a cada 15 minutos)
# No painel do Supabase: Database > Cron Jobs
```

## 🎨 Design System

O projeto segue o **Human Interface Guidelines** da Apple:

- **Cores**: System Blue, Gray, Green, Red, Orange
- **Tipografia**: SF Pro Display
- **Cantos**: 20px (squircle)
- **Efeitos**: Glassmorphism, backdrop-blur

## 📱 Funcionalidades

### Cliente
- ✅ Seleção de serviço
- ✅ Escolha de profissional
- ✅ Seleção de horário (time slots)
- ✅ Confirmação via WhatsApp

### Barbeiro
- ✅ Configuração de horários de atendimento
- ✅ Gestão de agenda
- ✅ Histórico de clientes
- ✅ Lembretes automáticos

## 🚀 Executar

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Produção
npm start
```

## 📄 Estrutura

```
├── app/                    # Páginas Next.js
│   ├── booking/           # Fluxo de agendamento
│   └── dashboard/         # Painel do barbeiro
├── components/
│   ├── ui/                # Componentes base (Button, Card, Input)
│   ├── booking/           # TimeSlotPicker
│   └── barber/            # AvailabilityConfig
├── lib/
│   ├── types.ts           # TypeScript types
│   ├── slots.ts           # Lógica de time slots
│   ├── supabase.ts        # Cliente Supabase
│   └── notifications.ts   # Twilio
└── supabase/
    ├── schema.sql         # Schema do banco
    └── functions/         # Edge Functions
```

## 🎯 Próximos Passos

- [ ] Autenticação (Supabase Auth)
- [ ] Dashboard com visualização de agenda
- [ ] Sistema de pagamentos (Stripe/Mercado Pago)
- [ ] PWA (Progressive Web App)
- [ ] Conversão para app nativo (Capacitor)

## 📝 Licença

MIT
