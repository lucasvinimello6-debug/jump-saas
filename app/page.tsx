import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-apple-gray-100 to-white dark:from-black dark:to-apple-background-elevated">
            {/* Hero Section */}
            <section className="container mx-auto px-6 pt-20 pb-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-black dark:text-white mb-6 tracking-tight">
                        Agendamento Inteligente
                        <br />
                        <span className="text-apple-blue-light dark:text-apple-blue-dark">
                            para Barbearias
                        </span>
                    </h1>
                    <p className="text-xl text-apple-gray-600 dark:text-apple-gray-500 mb-8 max-w-2xl mx-auto">
                        Sistema completo de gestão de agendamentos com design inspirado na Apple.
                        Simples, elegante e poderoso.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link href="/booking">
                            <Button size="lg">Agendar Horário</Button>
                        </Link>
                        <Link href="/dashboard">
                            <Button size="lg" variant="secondary">
                                Painel do Barbeiro
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="container mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold text-center mb-12 text-black dark:text-white">
                    Funcionalidades
                </h2>
                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    <Card>
                        <CardHeader>
                            <CardTitle>📅 Gestão de Agenda</CardTitle>
                            <CardDescription>
                                Visualize e gerencie todos os agendamentos em uma timeline intuitiva
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>⏰ Horários Flexíveis</CardTitle>
                            <CardDescription>
                                Cada barbeiro define seus próprios horários e dias de atendimento
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>📱 Notificações</CardTitle>
                            <CardDescription>
                                Lembretes automáticos via WhatsApp para reduzir faltas
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>👥 Gestão de Clientes</CardTitle>
                            <CardDescription>
                                Histórico completo de atendimentos e preferências
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>💰 Serviços Personalizados</CardTitle>
                            <CardDescription>
                                Cadastre serviços com preços e durações específicas
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>🎨 Design Apple</CardTitle>
                            <CardDescription>
                                Interface elegante seguindo o Human Interface Guidelines
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-6 py-16">
                <Card glass className="max-w-3xl mx-auto text-center p-12">
                    <CardContent>
                        <h2 className="text-3xl font-bold mb-4 text-black dark:text-white">
                            Pronto para começar?
                        </h2>
                        <p className="text-lg text-apple-gray-600 dark:text-apple-gray-500 mb-8">
                            Experimente agora e transforme a gestão da sua barbearia
                        </p>
                        <Link href="/booking">
                            <Button size="lg">Fazer um Agendamento</Button>
                        </Link>
                    </CardContent>
                </Card>
            </section>
        </main>
    );
}
