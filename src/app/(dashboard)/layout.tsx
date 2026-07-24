'use client';

// import { AuthGuard } from '@/src/components/auth/auth-guard';
import Sidebar from '@/src/components/sidebar/sidebar';
import { TopBar } from '@/src/components/top-bar/top-bar';
import { useAuthStore } from '@/src/store/authStore';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { user } = useAuthStore();

    return (
        // <AuthGuard>
        <div className="flex h-screen">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area - responsive padding based on screen size and sidebar state */}
            <div className="flex flex-col flex-1 overflow-hidden ">
                {/* Top Bar */}
                <TopBar />

                {/* Page Content */}
                <div className="flex-1 overflow-auto">{children}</div>
            </div>
        </div>
        // </AuthGuard>
    );
}
