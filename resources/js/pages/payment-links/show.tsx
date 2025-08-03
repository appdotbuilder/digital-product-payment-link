import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';

interface PaymentProof {
    id: number;
    status: string;
    notes?: string;
    admin_notes?: string;
    proof_url: string;
    created_at: string;
}

interface PaymentLink {
    id: number;
    token: string;
    customer_name: string;
    customer_email: string;
    status: string;
    created_at: string;
    expires_at: string;
    url: string;
    product: {
        id: number;
        name: string;
        description: string;
        price: number;
        formatted_price: string;
    };
    payment_proofs: PaymentProof[];
}

interface Props {
    paymentLink: PaymentLink;
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Payment Links',
        href: '/payment-links',
    },
    {
        title: 'Detail',
        href: '#',
    },
];

export default function PaymentLinksShow({ paymentLink }: Props) {
    const getStatusBadge = (status: string) => {
        const styles = {
            pending: 'bg-yellow-100 text-yellow-800',
            paid: 'bg-green-100 text-green-800',
            expired: 'bg-red-100 text-red-800',
            cancelled: 'bg-gray-100 text-gray-800',
            approved: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800',
        };
        
        const labels = {
            pending: 'Menunggu',
            paid: 'Lunas',
            expired: 'Kedaluwarsa',
            cancelled: 'Dibatalkan',
            approved: 'Disetujui',
            rejected: 'Ditolak',
        };

        return (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status as keyof typeof styles] || styles.pending}`}>
                {labels[status as keyof typeof labels] || status}
            </span>
        );
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert('Link disalin ke clipboard!');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Payment Link - ${paymentLink.customer_name}`} />
            
            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-bold text-gray-900">{paymentLink.customer_name}</h1>
                            {getStatusBadge(paymentLink.status)}
                        </div>
                        <p className="text-gray-600">Detail payment link dan riwayat pembayaran</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <a
                            href={route('payment.show', paymentLink.token)}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                🔗 Buka Payment Link
                            </Button>
                        </a>
                    </div>
                </div>

                {/* Payment Link Info */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">📋 Informasi Payment Link</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600">Nama Pembeli</label>
                                <div className="text-lg font-medium text-gray-900">{paymentLink.customer_name}</div>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-gray-600">Email Pembeli</label>
                                <div className="text-gray-900">{paymentLink.customer_email}</div>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-gray-600">Status</label>
                                <div>{getStatusBadge(paymentLink.status)}</div>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-gray-600">Dibuat</label>
                                <div className="text-gray-900">{new Date(paymentLink.created_at).toLocaleDateString('id-ID')}</div>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-gray-600">Kedaluwarsa</label>
                                <div className="text-gray-900">{new Date(paymentLink.expires_at).toLocaleDateString('id-ID')}</div>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600">Nama Produk</label>
                                <div className="text-lg font-medium text-gray-900">{paymentLink.product.name}</div>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-gray-600">Harga</label>
                                <div className="text-2xl font-bold text-orange-600">{paymentLink.product.formatted_price}</div>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-gray-600">Deskripsi Produk</label>
                                <div className="text-gray-700">{paymentLink.product.description}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Link URL */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">🔗 URL Payment Link</h2>
                    
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                        <code className="flex-1 text-sm text-gray-800 break-all">
                            {window.location.origin + route('payment.show', paymentLink.token)}
                        </code>
                        <Button
                            variant="outline"
                            onClick={() => copyToClipboard(window.location.origin + route('payment.show', paymentLink.token))}
                        >
                            📋 Salin Link
                        </Button>
                    </div>
                    
                    <p className="text-sm text-gray-600 mt-3">
                        Bagikan link ini kepada pembeli untuk melakukan pembayaran.
                    </p>
                </div>

                {/* Payment Proofs */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">📸 Riwayat Bukti Transfer</h2>
                    
                    {paymentLink.payment_proofs.length > 0 ? (
                        <div className="space-y-4">
                            {paymentLink.payment_proofs.map((proof) => (
                                <div key={proof.id} className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-medium text-gray-900">Bukti Transfer #{proof.id}</h3>
                                            {getStatusBadge(proof.status)}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {new Date(proof.created_at).toLocaleDateString('id-ID')}
                                        </div>
                                    </div>
                                    
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            {proof.notes && (
                                                <div className="mb-3">
                                                    <label className="text-sm font-medium text-gray-600">Catatan Pembeli</label>
                                                    <div className="text-gray-700">{proof.notes}</div>
                                                </div>
                                            )}
                                            
                                            {proof.admin_notes && (
                                                <div>
                                                    <label className="text-sm font-medium text-gray-600">Catatan Admin</label>
                                                    <div className="text-red-700">{proof.admin_notes}</div>
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div>
                                            <label className="text-sm font-medium text-gray-600">Bukti Transfer</label>
                                            <div className="mt-2">
                                                <img 
                                                    src={proof.proof_url} 
                                                    alt="Bukti Transfer"
                                                    className="w-full max-w-xs h-auto rounded-lg border"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            <div className="text-4xl mb-2">📸</div>
                            <p>Belum ada bukti transfer yang diupload</p>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">🚀 Aksi</h2>
                    <div className="flex gap-4">
                        <Link href={route('payment-links.index')}>
                            <Button variant="outline">
                                ← Kembali ke Daftar
                            </Button>
                        </Link>
                        
                        <a
                            href={route('payment.show', paymentLink.token)}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                🔗 Buka Payment Link
                            </Button>
                        </a>
                        
                        {paymentLink.payment_proofs.some(p => p.status === 'pending') && (
                            <Link href={route('admin.payment-proofs')}>
                                <Button className="bg-yellow-600 hover:bg-yellow-700">
                                    📸 Verifikasi Pembayaran
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}