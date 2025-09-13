
import React from 'react';
import type { NonProfit } from '../types';

interface NonProfitCardProps {
    nonProfit: NonProfit;
}

const NonProfitCard: React.FC<NonProfitCardProps> = ({ nonProfit }) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4 w-72 shadow-sm hover:shadow-md transition-shadow">
            <h4 className="font-bold text-blue-700">{nonProfit.name}</h4>
            <p className="text-sm text-gray-600 mt-1 mb-3">{nonProfit.description}</p>
            <div className="flex flex-wrap gap-1">
                {nonProfit.tags.map(tag => (
                    <span key={tag} className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default NonProfitCard;