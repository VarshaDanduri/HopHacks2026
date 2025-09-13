
import React, { useState, useRef, useEffect } from 'react';
import type { Message } from '../types';
import { getCommand, getSearchTags, getChatResponse } from '../services/geminiService';
import { searchByTags } from '../services/nonProfitService';
import ChatMessage from './ChatMessage';

interface ChatbotProps {
    isOpen: boolean;
    onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'init',
            role: 'bot',
            text: "Hello! I'm here to help you find non-profits. You can describe what you're looking for (e.g., 'animal shelters in california') or ask me questions about this website."
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            text: inputValue.trim(),
        };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const command = await getCommand(userMessage.text as string);
            let botResponse: Message;

            if (command === 'SEARCH') {
                const tags = await getSearchTags(userMessage.text as string);
                if (tags.length > 0) {
                    const results = await searchByTags(tags);
                    if (results.length > 0) {
                        botResponse = {
                            id: Date.now().toString() + '-res',
                            role: 'bot',
                            text: `I found ${results.length} non-profit(s) matching your description:`,
                            nonProfits: results,
                        };
                    } else {
                        botResponse = {
                            id: Date.now().toString() + '-res',
                            role: 'bot',
                            text: `I couldn't find any non-profits for the tags: ${tags.join(', ')}. Could you try being more specific or using different terms?`
                        };
                    }
                } else {
                    botResponse = {
                        id: Date.now().toString() + '-res',
                        role: 'bot',
                        text: "I wasn't able to determine specific search tags from your request. Could you please rephrase it?"
                    };
                }
            } else { // QUESTION
                const responseText = await getChatResponse(userMessage.text as string, messages);
                botResponse = {
                    id: Date.now().toString() + '-res',
                    role: 'bot',
                    text: responseText,
                };
            }
            setMessages(prev => [...prev, botResponse]);

        } catch (error) {
            console.error("Error processing message:", error);
            const errorResponse: Message = {
                id: Date.now().toString() + '-err',
                role: 'bot',
                text: "I'm sorry, I'm having trouble connecting. Please try again in a moment."
            };
            setMessages(prev => [...prev, errorResponse]);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className={`fixed bottom-24 right-5 sm:right-10 w-[calc(100%-2.5rem)] sm:w-96 h-[70vh] max-h-[700px] transition-transform transition-opacity duration-300 ease-in-out ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
            <div className="bg-white rounded-2xl shadow-2xl flex flex-col h-full border border-gray-200">
                <header className="flex items-center justify-between p-4 border-b bg-blue-600 text-white rounded-t-2xl">
                    <h3 className="text-lg font-semibold">Non-Profit Assistant</h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                </header>
                <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                    <div className="flex flex-col space-y-4">
                        {messages.map(msg => (
                            <ChatMessage key={msg.id} message={msg} />
                        ))}
                        {isLoading && (
                             <div className="flex justify-start">
                                <div className="bg-gray-200 rounded-2xl p-3 max-w-xs">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
                <div className="p-4 border-t bg-white rounded-b-2xl">
                    <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Ask a question..."
                            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={isLoading}
                        />
                        <button type="submit" disabled={isLoading || !inputValue.trim()} className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.428A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;