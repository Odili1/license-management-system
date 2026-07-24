"use client";

import { useState } from "react";
import { AuthMfaLayout } from "@/src/components/auth/mfa/auth-mfa-layout";
import { MfaCreateNewPassword } from "@/src/components/auth/mfa/auth-mfa-new-password";
import { MfaSecureAccount } from "@/src/components/auth/mfa/auth-mfa-secure-account";
import { MfaScanQr } from "@/src/components/auth/mfa/auth-mfa-scan-qr";
import { MfaConfirmEmail } from "@/src/components/auth/mfa/auth-mfa-confirm-email";
import { MfaVerifyCode } from "@/src/components/auth/mfa/auth-mfa-verify-code";
import { MfaBackupCodes } from "@/src/components/auth/mfa/auth-mfa-backup-codes";
import { MfaSecurityActivated } from "@/src/components/auth/mfa/auth-mfa-security-activated";
import { useRouter } from "next/navigation";
import { customToast } from "@/src/components/custom-toast";

export default function MfaPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [mfaMethod, setMfaMethod] = useState<'app' | 'email' | null>(null);

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => Math.max(1, prev - 1));

    const handleMethodSelect = (method: 'app' | 'email') => {
        setMfaMethod(method);
        setStep(3);
    };

    let CurrentComponent = null;

    switch (step) {
        case 1:
            CurrentComponent = (
                <MfaCreateNewPassword 
                    onNext={handleNext} 
                    onBack={() => router.push('/?login=true')} // go back to login
                />
            );
            break;
        case 2:
            CurrentComponent = (
                <MfaSecureAccount 
                    onNext={handleMethodSelect} 
                    onBack={handleBack} 
                />
            );
            break;
        case 3:
            if (mfaMethod === 'email') {
                CurrentComponent = (
                    <MfaConfirmEmail 
                        onNext={() => setStep(4)} 
                        onBack={() => setStep(2)} 
                    />
                );
            } else {
                CurrentComponent = (
                    <MfaScanQr 
                        onNext={() => setStep(4)} 
                        onBack={() => setStep(2)} 
                    />
                );
            }
            break;
        case 4:
            CurrentComponent = (
                <MfaVerifyCode 
                    onNext={() => setStep(5)} 
                    onBack={() => setStep(3)} 
                />
            );
            break;
        case 5:
            CurrentComponent = (
                <MfaBackupCodes 
                    onNext={() => setStep(6)} 
                    onBack={() => setStep(4)} 
                />
            );
            break;
        case 6:
            CurrentComponent = <MfaSecurityActivated />;
            break;
        default:
            CurrentComponent = <div>Unknown step</div>;
    }

    return (
        <AuthMfaLayout componentProps={CurrentComponent} />
    );
}
