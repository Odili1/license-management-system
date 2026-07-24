import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { Button } from "@/src/components/button/button";
import { Step1Config } from './step-1-config';
import { Step2Entitlements } from './step-2-entitlements';
import { Step3Validation } from './step-3-validation';
import { Step4Summary } from './step-4-summary';

interface CreateLicenseDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
}

export function CreateLicenseDrawer({ isOpen, onClose, onSubmit }: CreateLicenseDrawerProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [activeTab, setActiveTab] = useState<'single' | 'bulk'>('single');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [licenseData, setLicenseData] = useState({
        targetProduct: '',
        serviceBundle: '',
        internalNotes: '',
        licenseType: '',
        entitlementCount: '',
        targetOrganization: '',
        startDate: null as Date | null,
        endDate: null as Date | null,
        gracePeriod: '',
    });

    const updateData = (newData: Partial<typeof licenseData>) => {
        setLicenseData((prev) => ({ ...prev, ...newData }));
    };

    const handleNext = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        } else {
            setIsSubmitting(true);
            setTimeout(() => {
                onSubmit(licenseData);
                setIsSubmitting(false);
                onClose();
                // Reset form
                setCurrentStep(1);
                setLicenseData({
                    targetProduct: '',
                    serviceBundle: '',
                    internalNotes: '',
                    licenseType: '',
                    entitlementCount: '',
                    targetOrganization: '',
                    startDate: null,
                    endDate: null,
                    gracePeriod: '',
                });
            }, 1500);
        }
    };

    const isStepValid = (step: number) => {
        switch (step) {
            case 1:
                return licenseData.targetProduct !== '' && licenseData.serviceBundle !== '';
            case 2:
                return licenseData.licenseType !== '' && licenseData.entitlementCount !== '';
            case 3:
                return licenseData.targetOrganization !== '' && licenseData.startDate !== null && licenseData.endDate !== null && licenseData.gracePeriod !== '';
            case 4:
                return true;
            default:
                return false;
        }
    };

    const isCurrentStepValid = isStepValid(currentStep);

    const getStepTitle = () => {
        switch (currentStep) {
            case 1: return "Step 1: Classification & Core Parameters";
            case 2: return "Step 2: Entitlements";
            case 3: return "Step 3: Scheduling & Assignment";
            case 4: return "Review License Details";
            default: return "";
        }
    };

    const steps = [
        { num: 1, label: 'CONFIG' },
        { num: 2, label: 'ENTITLEMENTS' },
        { num: 3, label: 'VALIDATION' },
        { num: 4, label: 'SUMMARY' },
    ];

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-40 transition-opacity"
                    onClick={onClose}
                />
            )}

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-[450px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex items-start justify-between">
                    <div>
                        <h2 className="text-xl font-semibold mb-1">Generate New License</h2>
                        <p className="text-sm text-gray-500">{getStepTitle()}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {/* Tabs */}
                    <div className="flex p-1 bg-slate-50 rounded-lg mb-8">
                        <button
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'single' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setActiveTab('single')}
                        >
                            Single upload
                        </button>
                        <button
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'bulk' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setActiveTab('bulk')}
                        >
                            Bulk upload
                        </button>
                    </div>

                    {/* Stepper */}
                    <div className="flex items-center justify-between mb-8 px-2 relative">
                        <div className="absolute left-6 right-6 top-[11px] h-[1px] bg-gray-200 -z-10" />
                        {steps.map((step, index) => {
                            const isCompleted = currentStep > step.num;
                            const isActive = currentStep === step.num;
                            return (
                                <div key={step.num} className="flex flex-col items-center gap-2 bg-white px-2">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${isCompleted ? 'bg-gray-500 text-white' :
                                            isActive ? 'border-2 border-gray-400 text-gray-600' :
                                                'border border-gray-200 text-gray-400'
                                        }`}>
                                        {isCompleted ? <Check className="w-3 h-3" /> : step.num}
                                    </div>
                                    <span className={`text-[9px] font-bold tracking-wider ${isActive || isCompleted ? 'text-gray-700' : 'text-gray-400'
                                        }`}>
                                        {step.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Step Content */}
                    <div className="mt-8">
                        {currentStep === 1 && <Step1Config data={licenseData} updateData={updateData} />}
                        {currentStep === 2 && <Step2Entitlements data={licenseData} updateData={updateData} />}
                        {currentStep === 3 && <Step3Validation data={licenseData} updateData={updateData} />}
                        {currentStep === 4 && <Step4Summary data={licenseData} goToStep={setCurrentStep} />}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 flex items-center gap-3 bg-white">
                    <Button
                        variant="outline"
                        className="flex-1 border-[#E5E7EB] text-gray-700"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        className={`flex-1 transition-colors ${isCurrentStepValid ? 'bg-[#5830F7] hover:bg-[#5830F7]/90 text-white' : 'bg-[#F2F5F9] text-[#9CA3AF] hover:bg-[#F2F5F9]'}`}
                        onClick={handleNext}
                        disabled={isSubmitting || !isCurrentStepValid}
                    >
                        {isSubmitting ? (
                            <div className="flex items-center justify-center">
                                Loading...
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                            </div>
                        ) : (
                            currentStep === 4 ? "Generate License" : "Continue"
                        )}
                    </Button>
                </div>
            </div>
        </>
    );
}
