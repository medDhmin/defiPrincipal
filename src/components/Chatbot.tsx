import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { RAFIQ_SYSTEM_PROMPT } from '../configs/chatbot-prompt';
import ReactMarkdown from 'react-markdown';

type Message = {
    id?: number;
    text: string;
    sender: 'user' | 'bot';
    isTyping?: boolean;
};

interface ChatbotProps {
    title?: string;
    greeting?: string;
    placeholder?: string;
    systemPrompt?: string;
}

export const Chatbot = ({
    title = "Rafiq-AI",
    greeting = "Bonjour ! Je suis Rafiq-AI, votre assistant pour la Nuit de l'Info 2025. Comment puis-je vous aider ?",
    placeholder = "Posez une question sur le défi...",
    systemPrompt = RAFIQ_SYSTEM_PROMPT
}: ChatbotProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY as string | undefined;
    const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

    // Défilement automatique vers le bas
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Effet d'écriture progressive
    const typeText = async (text: string, tempId: number, speed = 20) => {
        let displayedText = '';

        for (let i = 0; i < text.length; i++) {
            displayedText += text[i];
            setMessages(prev =>
                prev.map(m =>
                    m.id === tempId ? { ...m, text: displayedText } : m
                )
            );
            await new Promise(resolve => setTimeout(resolve, speed));
        }

        // Retirer l'ID temporaire une fois l'écriture terminée
        setMessages(prev =>
            prev.map(m =>
                m.id === tempId ? { ...m, id: undefined } : m
            )
        );
    };

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMessage = inputValue.trim();
        setMessages((prev) => [...prev, { text: userMessage, sender: 'user' }]);
        setInputValue('');

        const tempId = Date.now();
        setMessages((prev) => [...prev, { text: '', sender: 'bot', id: tempId }]);

        if (!OPENROUTER_API_KEY) {
            typeText("Erreur : clé API manquante. Vérifie ton .env.local", tempId);
            return;
        }

        try {
            const response = await fetch(OPENROUTER_API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                    'HTTP-Referer': window.location.origin,
                    'X-Title': 'Chatbot Integration',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'deepseek/deepseek-chat',
                    messages: [
                        { role: 'system', content: systemPrompt },
                        ...messages.slice(-5).filter(m => !m.id).map((m) => ({
                            role: m.sender === 'user' ? 'user' : 'assistant',
                            content: m.text,
                        })),
                        { role: 'user', content: userMessage },
                    ],
                    max_tokens: 150,
                    temperature: 0.5,
                    stream: false,
                }),
            });

            if (!response.ok) {
                const errText = await response.text().catch(() => '');
                let msg = `Erreur API: ${response.status}`;
                if (response.status === 400) {
                    msg = "Requête invalide (modèle ou format). Vérifie le nom du modèle.";
                } else if (response.status === 402) {
                    msg = "Plus de crédit. Ajoute du crédit sur OpenRouter.";
                } else if (response.status === 401) {
                    msg = "Clé API invalide. Crée une nouvelle clé.";
                }
                throw new Error(msg);
            }

            const data = await response.json();
            const botReply = data.choices?.[0]?.message?.content?.trim() || "Désolé, je n'ai pas compris.";

            await typeText(botReply, tempId);
        } catch (error: any) {
            console.error('Erreur OpenRouter:', error);
            const errorMsg = error.message.includes('400')
                ? "Erreur de format. Vérifie la console et réessaie."
                : "Oups, un bug. Réessaie !";
            await typeText(errorMsg, tempId);
        }
    };

    return (
        <>
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-primary text-white shadow-2xl hover:scale-110 transition-transform duration-300 glow-primary"
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)]"
                    >
                        <div className="glass rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/20">
                            <div className="bg-gradient-primary p-4">
                                <h3 className="text-white font-bold text-lg">{title}</h3>
                            </div>

                            <div
                                ref={messagesContainerRef}
                                className="h-96 overflow-y-auto p-4 space-y-4 bg-background/95"
                            >
                                {messages.length === 0 && (
                                    <div className="text-center text-muted-foreground py-8">
                                        <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                        <p>{greeting}</p>
                                    </div>
                                )}

                                {messages.map((message, index) => (
                                    <motion.div
                                        key={index}

                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[80%] p-3 rounded-2xl ${message.sender === 'user'
                                                ? 'bg-primary text-primary-foreground'
                                                : 'bg-card text-card-foreground border border-border'
                                                }`}
                                        >
                                            {message.sender === 'bot' ? (
                                                <div className="text-sm prose prose-sm max-w-none">
                                                    <ReactMarkdown
                                                        components={{
                                                            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                                                            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                                                            em: ({ children }) => <em className="italic">{children}</em>,
                                                            ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                                                            ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                                                            li: ({ children }) => <li>{children}</li>,
                                                            code: ({ children }) => (
                                                                <code className="bg-muted px-1 py-0.5 rounded text-xs">
                                                                    {children}
                                                                </code>
                                                            ),
                                                            pre: ({ children }) => (
                                                                <pre className="bg-muted p-2 rounded text-xs overflow-x-auto my-2">
                                                                    {children}
                                                                </pre>
                                                            ),
                                                        }}
                                                    >
                                                        {message.text}
                                                    </ReactMarkdown>
                                                    {message.id && (
                                                        <div className="inline-block w-2 h-4 bg-current ml-1 opacity-60 animate-pulse" />
                                                    )}
                                                </div>
                                            ) : (
                                                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>

                            <div className="p-4 border-t border-border bg-background/95">
                                <div className="flex gap-2">
                                    <Input
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                        placeholder={placeholder}
                                        className="flex-1 bg-background border-border"
                                    />
                                    <Button
                                        onClick={handleSend}
                                        size="icon"
                                        className="glow-primary"
                                        disabled={!inputValue.trim()}
                                    >
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
