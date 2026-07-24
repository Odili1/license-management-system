export interface AuditLogData {
    id: string;
    timestamp: string;
    actorName: string;
    role: string;
    actorId: string;
    ipAddress: string;
    actionType: 'License Renewed' | 'Tenant Assigned' | 'License Suspended' | 'License Upgraded';
    client: string;
    product: string;
    bundle: string;
    licenseRef: string;
    stateBefore: string;
    stateAfter: string;
    changeSummary: string;
    result: 'Success' | 'Blocked (MFA)';
}

export const auditLogsData: AuditLogData[] = [
    {
        id: 'AUD-001',
        timestamp: '2024-10-24 14:32:01',
        actorName: 'Emeka Okafor',
        role: 'Lead Developer',
        actorId: 'ID: 0892',
        ipAddress: '192.168.1.144',
        actionType: 'License Renewed',
        client: 'Providus Bank',
        product: '3B Admin',
        bundle: 'Premium - Enterprise',
        licenseRef: 'INV-8821-X90-QLP',
        stateBefore: '400 Seats . Active',
        stateAfter: '450 Seats . Active',
        changeSummary: '400 Seats → 450 Seats',
        result: 'Success'
    },
    {
        id: 'AUD-002',
        timestamp: '2024-10-24 14:32:01',
        actorName: 'Sarah Jenkins',
        role: 'Super Admin',
        actorId: 'ID: 0102',
        ipAddress: '192.168.1.15',
        actionType: 'Tenant Assigned',
        client: 'First Bank',
        product: 'Bifense',
        bundle: 'Premium - Enterprise',
        licenseRef: 'INV-9902-A10-ZXP',
        stateBefore: 'Expired',
        stateAfter: 'Active',
        changeSummary: 'Expired → Active',
        result: 'Success'
    },
    {
        id: 'AUD-003',
        timestamp: '2024-10-24 14:32:01',
        actorName: 'Emeka Okafor',
        role: 'Lead Developer',
        actorId: 'ID: 0892',
        ipAddress: '192.168.1.144',
        actionType: 'License Renewed',
        client: 'Providus Bank',
        product: '3B Admin',
        bundle: 'Premium - Enterprise',
        licenseRef: 'INV-8821-X90-QLP',
        stateBefore: '400 Seats . Active',
        stateAfter: '450 Seats . Active',
        changeSummary: '400 Seats → 450 Seats',
        result: 'Success'
    },
    {
        id: 'AUD-004',
        timestamp: '2024-10-24 14:32:01',
        actorName: 'Tunde Adebayo',
        role: 'Super Admin',
        actorId: 'ID: 0041',
        ipAddress: '192.168.1.88',
        actionType: 'License Suspended',
        client: 'Sterling Bank',
        product: 'Bifense',
        bundle: 'Premium - Enterprise',
        licenseRef: 'INV-4521-K82-OPL',
        stateBefore: 'Active',
        stateAfter: 'Suspended',
        changeSummary: 'Active → Suspended',
        result: 'Blocked (MFA)'
    },
    {
        id: 'AUD-005',
        timestamp: '2024-10-24 12:15:32',
        actorName: 'John Doe',
        role: 'Lead Developer',
        actorId: 'ID: 0521',
        ipAddress: '192.168.2.110',
        actionType: 'License Upgraded',
        client: 'Access Bank',
        product: 'Banklet',
        bundle: 'Basic - Premium',
        licenseRef: 'INV-1234-Y21-ASD',
        stateBefore: '100 Seats . Active',
        stateAfter: '200 Seats . Active',
        changeSummary: '100 Seats → 200 Seats',
        result: 'Success'
    },
    {
        id: 'AUD-006',
        timestamp: '2024-10-24 10:04:18',
        actorName: 'Aisha Mohammed',
        role: 'Super Admin',
        actorId: 'ID: 0312',
        ipAddress: '192.168.1.99',
        actionType: 'License Renewed',
        client: 'Zenith Bank',
        product: '3B Admin',
        bundle: 'Premium - Enterprise',
        licenseRef: 'INV-9081-U33-PLK',
        stateBefore: '300 Seats . Expired',
        stateAfter: '300 Seats . Active',
        changeSummary: 'Expired → Active',
        result: 'Success'
    },
    {
        id: 'AUD-007',
        timestamp: '2024-10-23 17:40:22',
        actorName: 'Emeka Okafor',
        role: 'Lead Developer',
        actorId: 'ID: 0892',
        ipAddress: '192.168.1.144',
        actionType: 'License Suspended',
        client: 'Providus Bank',
        product: '3B Admin',
        bundle: 'Premium - Enterprise',
        licenseRef: 'INV-8821-X90-QLP',
        stateBefore: '450 Seats . Active',
        stateAfter: '450 Seats . Suspended',
        changeSummary: 'Active → Suspended',
        result: 'Success'
    },
    {
        id: 'AUD-008',
        timestamp: '2024-10-23 16:30:10',
        actorName: 'David Vance',
        role: 'Lead Developer',
        actorId: 'ID: 0411',
        ipAddress: '192.168.4.52',
        actionType: 'Tenant Assigned',
        client: 'Wema Bank',
        product: 'Banklet',
        bundle: 'Basic - Premium',
        licenseRef: 'INV-7721-M12-XYZ',
        stateBefore: 'Unassigned',
        stateAfter: 'Active',
        changeSummary: 'Unassigned → Active',
        result: 'Success'
    },
    {
        id: 'AUD-009',
        timestamp: '2024-10-23 15:10:05',
        actorName: 'Tunde Adebayo',
        role: 'Super Admin',
        actorId: 'ID: 0041',
        ipAddress: '192.168.1.88',
        actionType: 'License Upgraded',
        client: 'Globus Bank',
        product: '3B Admin',
        bundle: 'Premium - Enterprise',
        licenseRef: 'INV-5541-Q99-WER',
        stateBefore: '500 Seats . Active',
        stateAfter: '1000 Seats . Active',
        changeSummary: '500 Seats → 1000 Seats',
        result: 'Blocked (MFA)'
    },
    {
        id: 'AUD-010',
        timestamp: '2024-10-23 11:20:00',
        actorName: 'Sarah Jenkins',
        role: 'Super Admin',
        actorId: 'ID: 0102',
        ipAddress: '192.168.1.15',
        actionType: 'License Renewed',
        client: 'First Bank',
        product: 'Bifense',
        bundle: 'Premium - Enterprise',
        licenseRef: 'INV-9902-A10-ZXP',
        stateBefore: '250 Seats . Active',
        stateAfter: '250 Seats . Active',
        changeSummary: '250 Seats → 250 Seats',
        result: 'Success'
    }
];
