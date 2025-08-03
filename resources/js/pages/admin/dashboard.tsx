import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Stats {
    total_products: number;
    active_products: number;
    total_payment_links: number;
    pending_payments: number;
    paid_payments: number;
    pending_proofs: number;
    total_revenue: number;
}

interface PaymentLink {
    id: number;
    token: string;
    customer_name: string;
    customer_email: string;
    status: string;
    created_at: string;
    product: {
        id: number;
        name: string;
        price: number;
        formatted_price: string;
    };
}

interface PaymentProof {
    id: number;
    status: string;
    created_at: string;
    payment_link: {
        id: number;
        customer_name: string;
        customer_email: string;
        product: {
            id: number;
            name: string;
            price: number;
            formatted_price: string;
        };
    };
}

interface Props {
    stats: Stats;
    recentPaymentLinks: PaymentLink[];
    pendingProofs: PaymentProof[];
    [key: string]: unknown;
}

export default function AdminDashboard({ stats, recentPaymentLinks, pendingProofs }: Props) {
    const formatCurrency = (amount: number) => {
        return `Rp ${amount.toLocaleString('id-ID')}`;
    };

    const getStatusBadge = (status: string) => {
        const styles = {
            pending: 'bg-yellow-100 text-yellow-800',
            paid: 'bg-green-100 text-green-800',
            expired: 'bg-red-100 text-red-800',
            cancelled: 'bg-gray-100 text-gray-800',
        };
        
        const labels = {
            pending: 'Menunggu',
            paid: 'Lunas',
            expired: 'Kedaluwarsa',
            cancelled: 'Dibatalkan',
        };

        return (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status as keyof typeof styles] || styles.pending}`}>
                {labels[status as keyof typeof labels] || status}
            </span>
        );
    };

    return (
        <AppShell>
            <Head title="Dashboard Admin - PayLink" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">📊 Dashboard Admin</h1>
                        <p className="text-gray-600 mt-1">Kelola produk digital dan pembayaran Anda</p>
                    </div>
                    
                    <div className="flex gap-3">
                        <Link href={route('products.create')}>
                            <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                                ➕ Tambah Produk
                            </Button>
                        </Link>
                        <Link href={route('payment-links.create')}>
                            <Button variant="outline">
                                🔗 Buat Payment Link
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-100">Total Produk</p>
                                <p className="text-3xl font-bold">{stats.total_products}</p>
                            </div>
                            <div className="text-4xl opacity-80">📦</div>
                        </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-100">Pembayaran Lunas</p>
                                <p className="text-3xl font-bold">{stats.paid_payments}</p>
                            </div>
                            <div className="text-4xl opacity-80">✅</div>
                        </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-yellow-100">Menunggu Verifikasi</p>
                                <p className="text-3xl font-bold">{stats.pending_proofs}</p>
                            </div>
                            <div className="text-4xl opacity-80">⏳</div>
                        </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-purple-100">Total Pendapatan</p>
                                <p className="text-2xl font-bold">{formatCurrency(stats.total_revenue)}</p>
                            </div>
                            <div className="text-4xl opacity-80">💰</div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Recent Payment Links */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">🔗 Payment Link Terbaru</h2>
                            <Link href={route('payment-links.index')}>
                                <Button variant="outline" size="sm">Lihat Semua</Button>
                            </Link>
                        </div>
                        
                        <div className="space-y-3">
                            {recentPaymentLinks.length > 0 ? (
                                recentPaymentLinks.map((link) => (
                                    <div key={link.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex-1">
                                            <div className="font-medium text-gray-900">{link.customer_name}</div>
                                            <div className="text-sm text-gray-600">{link.product.name}</div>
                                            <div className="text-sm text-gray-500">{link.product.formatted_price}</div>
                                        </div>
                                        <div className="text-right">
                                            {getStatusBadge(link.status)}
                                            <div className="text-xs text-gray-500 mt-1">
                                                {new Date(link.created_at).toLocaleDateString('id-ID')}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <div className="text-4xl mb-2">📋</div>
                                    <p>Belum ada payment link</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Pending Payment Proofs */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">📸 Bukti Transfer Baru</h2>
                            <Link href={route('admin.payment-proofs')}>
                                <Button variant="outline" size="sm">Kelola Semua</Button>
                            </Link>
                        </div>
                        
                        <div className="space-y-3">
                            {pendingProofs.length > 0 ? (
                                pendingProofs.map((proof) => (
                                    <div key={proof.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                                        <div className="flex-1">
                                            <div className="font-medium text-gray-900">{proof.payment_link.customer_name}</div>
                                            <div className="text-sm text-gray-600">{proof.payment_link.product.name}</div>
                                            <div className="text-sm text-gray-500">{proof.payment_link.product.formatted_price}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="bg-yellow-100 text-yellow-800 px-2 py-1 text-xs font-medium rounded-full">
                                                Menunggu Review
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                {new Date(proof.created_at).toLocaleDateString('id-ID')}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <div className="text-4xl mb-2">✅</div>
                                    <p>Tidak ada bukti transfer baru</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Navigation */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">🚀 Menu Cepat</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Link href={route('products.index')} className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className="text-3xl mb-2">📦</div>
                            <div className="text-sm font-medium text-gray-900">Kelola Produk</div>
                        </Link>
                        
                        <Link href={route('payment-links.index')} className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className="text-3xl mb-2">🔗</div>
                            <div className="text-sm font-medium text-gray-900">Payment Links</div>
                        </Link>
                        
                        <Link href={route('admin.payment-proofs')} className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className="text-3xl mb-2">📸</div>
                            <div className="text-sm font-medium text-gray-900">Verifikasi Pembayaran</div>
                        </Link>
                        
                        <Link href={route('settings.index')} className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className="text-3xl mb-2">⚙️</div>
                            <div className="text-sm font-medium text-gray-900">Pengaturan</div>
                        </Link>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}