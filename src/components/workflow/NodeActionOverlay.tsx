'use client';

import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

interface NodeActionOverlayProps {
    onEdit?: () => void;
    onDelete?: () => void;
    isSelected?: boolean;
}

const NodeActionOverlay: React.FC<NodeActionOverlayProps> = ({ onEdit, onDelete, isSelected }) => {
    return (
        <div
            className={`absolute -top-3 -right-0 flex items-center gap-1.5 z-50 transition-all duration-200 ${isSelected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0'
                }`}
        >
            {/* Edit Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onEdit?.();
                }}
                onMouseDown={(e) => e.stopPropagation()}
                className="nodrag w-6 h-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-teal-500/80 transition-colors shadow-lg"
                title="Edit Node"
            >
                <Pencil size={12} strokeWidth={3} />
            </button>

            {/* Delete Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete?.();
                }}
                onMouseDown={(e) => e.stopPropagation()}
                className="nodrag w-6 h-6 rounded-full bg-red-500/80 backdrop-blur-sm border border-red-400/30 flex items-center justify-center text-white hover:bg-red-600 transition-colors shadow-lg"
                title="Delete Node"
            >
                <Trash2 size={12} strokeWidth={3} />
            </button>
        </div>
    );
};

export default NodeActionOverlay;
