import { toast } from 'sonner';

export const customToast = {
    success: (message: string) => {
        toast.success(message, {
            style: {
                background: '#4CAF50',
                color: 'white',
                border: 'none',
            },
        });
    },
    error: (message: string) => {
        toast.error(message, {
            style: {
                background: '#EF4444',
                color: 'white',
                border: 'none',
            },
        });
    },
};
