"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { createPortal } from "react-dom"

interface AlertDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description: string;
    cancelLabel?: string;
    actionLabel?: string;
    onAction: () => void;
}

export function AlertDialog({ 
    isOpen, 
    onOpenChange, 
    title, 
    description, 
    cancelLabel = "Vazgeç", 
    actionLabel = "Evet, Sil", 
    onAction 
}: AlertDialogProps) {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    if (!isOpen || !mounted) return null;

    const modalContent = (
        <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => onOpenChange(false)} />
            <div className="bg-white rounded-[32px] p-8 shadow-2xl relative z-20 w-full max-w-md animate-in fade-in zoom-in duration-300 border border-gray-100 italic">
                <h3 className="text-xl font-black text-gray-900 mb-2 tracking-tight">{title}</h3>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed font-medium">{description}</p>
                <div className="flex justify-end gap-3 font-bold">
                    <Button variant="ghost" className="rounded-2xl h-12 px-8 font-black text-xs uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-all" onClick={() => onOpenChange(false)}>
                        {cancelLabel}
                    </Button>
                    <Button variant="destructive" className="rounded-2xl h-12 px-8 font-black text-xs uppercase tracking-widest bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20 transition-all transform active:scale-95" onClick={() => {
                        onAction();
                        onOpenChange(false);
                    }}>
                        {actionLabel}
                    </Button>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
