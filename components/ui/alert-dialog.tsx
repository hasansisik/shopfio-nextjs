"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

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
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
            <div className="bg-white rounded-[24px] p-6 shadow-xl relative z-10 w-full max-w-md animate-in fade-in zoom-in duration-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">{description}</p>
                <div className="flex justify-end gap-3 font-medium">
                    <Button variant="ghost" className="rounded-full h-10 px-6 font-bold" onClick={() => onOpenChange(false)}>
                        {cancelLabel}
                    </Button>
                    <Button variant="destructive" className="rounded-full h-10 px-6 font-bold bg-red-500 hover:bg-red-600 text-white" onClick={() => {
                        onAction();
                        onOpenChange(false);
                    }}>
                        {actionLabel}
                    </Button>
                </div>
            </div>
        </div>
    )
}
