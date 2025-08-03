import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface PaymentLink {
    id: number;
    token: string;
    customer_name: string;
    customer_email: string;
    status: string;
    created_at: string;
}

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    formatted_price: string;
    file_path?: string;
    is_active: boolean;
    created_at: string;
    payment_links: PaymentLink[];
}

interface Props {
    product: Product;
    [key: string]: unknown;
}

export default function ProductsShow({ product }: Props) {
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
            <Head title={`${product.name} - PayLink`} />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                            <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                                product.is_active 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                            }`}>
                                {product.is_active ? 'Aktif' : 'Nonaktif'}
                            </span>
                        </div>
                        <p className="text-gray-600">Detail produk dan riwayat payment link</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <Link href={route('products.edit', product.id)}>
                            <Button variant="outline">
                                ✏️ Edit Produk
                            </Button>
                        </Link>
                        <Link href={route('payment-links.create')} data={{ product_id: product.id }}>
                            <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                                🔗 Buat Payment Link
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Product Details */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">📦 Detail Produk</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600">Nama Produk</label>
                                <div className="text-lg font-medium text-gray-900">{product.name}</div>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-gray-600">Harga</label>
                                <div className="text-2xl font-bold text-orange-600">{product.formatted_price}</div>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-gray-600">Status</label>
                                <div>
                                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                                        product.is_active 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {product.is_active ? 'Aktif' : 'Nonaktif'}
                                    </span>
                                </div>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-gray-600">Dibuat</label>
                                <div className="text-gray-900">{new Date(product.created_at).toLocaleDateString('id-ID')}</div>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600">Deskripsi</label>
                                <div className="text-gray-900 whitespace-pre-wrap">{product.description}</div>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-gray-600">File Produk</label>
                                <div className="text-gray-900">
                                    {product.file_path ? (
                                        <span className="inline-flex items-center gap-2 text-green-600">
                                            <span>📁</span>
                                            File tersedia
                                        </span>
                                    ) : (
                                        <span className="text-gray-500">Tidak ada file</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Links History */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">🔗 Riwayat Payment Link</h2>
                        <Link href={route('payment-links.create')} data={{ product_id: product.id }}>
                            <Button size="sm" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                                ➕ Buat Link Baru
                            </Button>
                        </Link>
                    </div>
                    
                    {product.payment_links.length > 0 ? (
                        <div className="space-y-3">
                            {product.payment_links.map((link) => (
                                <div key={link.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex-1">
                                        <div className="font-medium text-gray-900">{link.customer_name}</div>
                                        <div className="text-sm text-gray-600">{link.customer_email}</div>
                                        <div className="text-sm text-gray-500">
                                            Dibuat {new Date(link.created_at).toLocaleDateString('id-ID')}
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-3">
                                        {getStatusBadge(link.status)}
                                        <Link href={route('payment-links.show', link.id)}>
                                            <Button variant="outline" size="sm">
                                                👁️ Lihat
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            <div className="text-4xl mb-2">🔗</div>
                            <p>Belum ada payment link untuk produk ini</p>
                            <Link href={route('payment-links.create')} data={{ product_id: product.id }} className="mt-3 inline-block">
                                <Button size="sm" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                                    Buat Payment Link Pertama
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">🚀 Aksi Cepat</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link href={route('products.edit', product.id)} className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className="text-2xl mr-3">✏️</div>
                            <div>
                                <div className="font-medium text-gray-900">Edit Produk</div>
                                <div className="text-sm text-gray-600">Ubah detail produk</div>
                            </div>
                        </Link>
                        
                        <Link href={route('payment-links.create')} data={{ product_id: product.id }} className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className="text-2xl mr-3">🔗</div>
                            <div>
                                <div className="font-medium text-gray-900">Buat Payment Link</div>
                                <div className="text-sm text-gray-600">Link pembayaran baru</div>
                            </div>
                        </Link>
                        
                        <Link href={route('products.index')} className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className="text-2xl mr-3">📦</div>
                            <div>
                                <div className="font-medium text-gray-900">Semua Produk</div>
                                <div className="text-sm text-gray-600">Kembali ke daftar</div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}