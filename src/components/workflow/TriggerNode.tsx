'use client';

import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Zap } from 'lucide-react';
import NodeActionOverlay from './NodeActionOverlay';

const TriggerNode = ({ data, selected }: NodeProps) => {
    return (
        <div className="group relative">
            <NodeActionOverlay
                isSelected={selected}
                onEdit={() => console.log('Edit Trigger')}
                onDelete={() => console.log('Delete Trigger')}
            />

            <div className={`min-w-[200px] bg-slate-900 border-2 rounded-lg overflow-hidden transition-all duration-200 ${selected ? 'border-teal-400 shadow-[0_0_15px_rgba(45,212,191,0.3)]' : 'border-slate-800'
                }`}>
                <div className="bg-slate-800 px-3 py-2 flex items-center gap-2 border-b border-slate-700">
                    <Zap size={14} className="text-amber-400 fill-amber-400/20" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Trigger Node</span>
                </div>

                <div className="p-3">
                    <p className="text-[11px] text-slate-300 font-medium leading-relaxed uppercase tracking-tight">
                        {data.label || 'On interaction...'}
                    </p>
                </div>

                <Handle type="source" position={Position.Right} className="w-2 h-2 bg-amber-400 border-2 border-slate-900" />
            </div>
        </div>
    );
};

export default TriggerNode;
