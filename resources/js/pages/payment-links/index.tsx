import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';

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
        price: number;
        formatted_price: string;
    };
}

interface Props {
    paymentLinks: {
        data: PaymentLink[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
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
];

export default function PaymentLinksIndex({ paymentLinks }: Props) {
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

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert('Link disalin ke clipboard!');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Payment Links - PayLink" />
            
            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">🔗 Payment Links</h1>
                        <p className="text-gray-600 mt-1">Kelola semua payment link Anda</p>
                    </div>
                    
                    <Link href={route('payment-links.create')}>
                        <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                            ➕ Buat Payment Link Baru
                        </Button>
                    </Link>
                </div>

                {/* Payment Links List */}
                {paymentLinks.data.length > 0 ? (
                    <div className="grid gap-6">
                        {paymentLinks.data.map((link) => (
                            <div key={link.id} className="bg-white rounded-lg shadow p-6">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <h3 className="text-xl font-semibold text-gray-900">{link.customer_name}</h3>
                                            {getStatusBadge(link.status)}
                                        </div>
                                        
                                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <div className="text-sm text-gray-600 mb-1">Email</div>
                                                <div className="font-medium text-gray-900">{link.customer_email}</div>
                                            </div>
                                            <div>
                                                <div className="text-sm text-gray-600 mb-1">Produk</div>
                                                <div className="font-medium text-gray-900">{link.product.name}</div>
                                            </div>
                                            <div>
                                                <div className="text-sm text-gray-600 mb-1">Harga</div>
                                                <div className="font-semibold text-orange-600 text-lg">{link.product.formatted_price}</div>
                                            </div>
                                            <div>
                                                <div className="text-sm text-gray-600 mb-1">Kedaluwarsa</div>
                                                <div className="font-medium text-gray-900">
                                                    {new Date(link.expires_at).toLocaleDateString('id-ID')}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="mb-4">
                                            <div className="text-sm text-gray-600 mb-2">Payment Link</div>
                                            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                                <code className="flex-1 text-sm text-gray-800 break-all">
                                                    {window.location.origin + route('payment.show', link.token)}
                                                </code>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => copyToClipboard(window.location.origin + route('payment.show', link.token))}
                                                >
                                                    📋 Salin
                                                </Button>
                                            </div>
                                        </div>
                                        
                                        <div className="text-sm text-gray-500">
                                            Dibuat {new Date(link.created_at).toLocaleDateString('id-ID')}
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 ml-4">
                                        <Link href={route('payment-links.show', link.id)}>
                                            <Button variant="outline" size="sm">
                                                👁️ Lihat Detail
                                            </Button>
                                        </Link>
                                        
                                        <a
                                            href={route('payment.show', link.token)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                                🔗 Buka Link
                                            </Button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow p-12 text-center">
                        <div className="text-6xl mb-4">🔗</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Belum Ada Payment Link</h3>
                        <p className="text-gray-600 mb-6">Mulai dengan membuat payment link pertama Anda</p>
                        <Link href={route('payment-links.create')}>
                            <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                                ➕ Buat Payment Link Pertama
                            </Button>
                        </Link>
                    </div>
                )}

                {/* Pagination Info */}
                {paymentLinks.data.length > 0 && (
                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-600">
                                Menampilkan {paymentLinks.data.length} dari {paymentLinks.total} payment link
                            </div>
                            <div className="text-sm text-gray-600">
                                Halaman {paymentLinks.current_page} dari {paymentLinks.last_page}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}