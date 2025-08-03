import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    formatted_price: string;
    is_active: boolean;
    created_at: string;
    payment_links_count?: number;
}

interface Props {
    products: {
        data: Product[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    [key: string]: unknown;
}

export default function ProductsIndex({ products }: Props) {
    return (
        <AppShell>
            <Head title="Kelola Produk - PayLink" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">📦 Kelola Produk</h1>
                        <p className="text-gray-600 mt-1">Kelola semua produk digital Anda</p>
                    </div>
                    
                    <Link href={route('products.create')}>
                        <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                            ➕ Tambah Produk Baru
                        </Button>
                    </Link>
                </div>

                {/* Products Grid */}
                {products.data.length > 0 ? (
                    <div className="grid gap-6">
                        {products.data.map((product) => (
                            <div key={product.id} className="bg-white rounded-lg shadow p-6">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                product.is_active 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {product.is_active ? 'Aktif' : 'Nonaktif'}
                                            </span>
                                        </div>
                                        
                                        <p className="text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                                        
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <span className="font-semibold text-lg text-orange-600">{product.formatted_price}</span>
                                            <span>•</span>
                                            <span>Dibuat {new Date(product.created_at).toLocaleDateString('id-ID')}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 ml-4">
                                        <Link href={route('products.show', product.id)}>
                                            <Button variant="outline" size="sm">
                                                👁️ Lihat
                                            </Button>
                                        </Link>
                                        
                                        <Link href={route('products.edit', product.id)}>
                                            <Button variant="outline" size="sm">
                                                ✏️ Edit
                                            </Button>
                                        </Link>
                                        
                                        <Link 
                                            href={route('payment-links.create')} 
                                            data={{ product_id: product.id }}
                                            as="button"
                                            method="get"
                                        >
                                            <Button size="sm" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                                                🔗 Buat Link
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow p-12 text-center">
                        <div className="text-6xl mb-4">📦</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Belum Ada Produk</h3>
                        <p className="text-gray-600 mb-6">Mulai dengan menambahkan produk digital pertama Anda</p>
                        <Link href={route('products.create')}>
                            <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                                ➕ Tambah Produk Pertama
                            </Button>
                        </Link>
                    </div>
                )}

                {/* Simple Pagination Info */}
                {products.data.length > 0 && (
                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-600">
                                Menampilkan {products.data.length} dari {products.total} produk
                            </div>
                            <div className="text-sm text-gray-600">
                                Halaman {products.current_page} dari {products.last_page}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}