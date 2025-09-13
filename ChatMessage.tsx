
import React from 'react';
import type { Message } from '../types';
import NonProfitCard from './NonProfitCard';

interface ChatMessageProps {
    message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
    const { role, text, nonProfits } = message;
    const isBot = role === 'bot';

    return (
        <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
            <div className="flex flex-col space-y-2">
                {text && (
                    <div className={`px-4 py-3 rounded-2xl max-w-sm ${isBot ? 'bg-gray-200 text-gray-800 rounded-bl-none' : 'bg-blue-600 text-white rounded-br-none'}`}>
                        <p className="whitespace-pre-wrap">{text}</p>
                    </div>
                )}
                {nonProfits && nonProfits.length > 0 && (
                    <div className="flex flex-col space-y-2">
                        {nonProfits.map(np => <NonProfitCard key={np.id} nonProfit={np} />)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatMessage;