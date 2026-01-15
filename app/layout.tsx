import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Barbearia SaaS - Agendamento Inteligente",
    description: "Sistema de agendamento para barbearias com design Apple",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR">
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
