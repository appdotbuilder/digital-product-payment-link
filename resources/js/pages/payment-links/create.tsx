import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Product {
    id: number;
    name: string;
    price: number;
    formatted_price: string;
    description: string;
}

interface Props {
    products: Product[];
    [key: string]: unknown;
}

export default function PaymentLinksCreate({ products }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        product_id: '',
        customer_name: '',
        customer_email: '',
    });

    const selectedProduct = products.find(p => p.id === parseInt(data.product_id));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('payment-links.store'));
    };

    return (
        <AppShell>
            <Head title="Buat Payment Link - PayLink" />
            
            <div className="max-w-2xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">🔗 Buat Payment Link</h1>
                    <p className="text-gray-600 mt-2">Buat link pembayaran untuk pelanggan Anda</p>
                </div>

                {/* Form */}
                <div className="bg-white rounded-lg shadow p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Product Selection */}
                        <div>
                            <label htmlFor="product_id" className="block text-sm font-medium text-gray-700 mb-2">
                                Pilih Produk *
                            </label>
                            <select
                                id="product_id"
                                value={data.product_id}
                                onChange={(e) => setData('product_id', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                required
                            >
                                <option value="">-- Pilih Produk --</option>
                                {products.map((product) => (
                                    <option key={product.id} value={product.id}>
                                        {product.name} - {product.formatted_price}
                                    </option>
                                ))}
                            </select>
                            {errors.product_id && <p className="text-red-600 text-sm mt-1">{errors.product_id}</p>}
                        </div>

                        {/* Product Preview */}
                        {selectedProduct && (
                            <div className="bg-gray-50 border rounded-lg p-4">
                                <h3 className="font-medium text-gray-900 mb-2">📦 Preview Produk</h3>
                                <div className="text-sm text-gray-600">
                                    <div className="font-medium">{selectedProduct.name}</div>
                                    <div className="text-orange-600 font-semibold text-lg">{selectedProduct.formatted_price}</div>
                                    <div className="mt-2">{selectedProduct.description}</div>
                                </div>
                            </div>
                        )}

                        {/* Customer Name */}
                        <div>
                            <label htmlFor="customer_name" className="block text-sm font-medium text-gray-700 mb-2">
                                Nama Pembeli *
                            </label>
                            <input
                                type="text"
                                id="customer_name"
                                value={data.customer_name}
                                onChange={(e) => setData('customer_name', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                placeholder="John Doe"
                                required
                            />
                            {errors.customer_name && <p className="text-red-600 text-sm mt-1">{errors.customer_name}</p>}
                        </div>

                        {/* Customer Email */}
                        <div>
                            <label htmlFor="customer_email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Pembeli *
                            </label>
                            <input
                                type="email"
                                id="customer_email"
                                value={data.customer_email}
                                onChange={(e) => setData('customer_email', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                placeholder="john@example.com"
                                required
                            />
                            {errors.customer_email && <p className="text-red-600 text-sm mt-1">{errors.customer_email}</p>}
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4 pt-6">
                            <Button
                                type="submit"
                                disabled={processing}
                                className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                            >
                                {processing ? '⏳ Membuat...' : '🔗 Buat Payment Link'}
                            </Button>
                            
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => window.history.back()}
                                className="px-8"
                            >
                                ❌ Batal
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Info Card */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <div className="text-green-600 text-xl">ℹ️</div>
                        <div>
                            <h3 className="font-medium text-green-900 mb-1">Tentang Payment Link</h3>
                            <ul className="text-sm text-green-700 space-y-1">
                                <li>• Payment link akan berlaku selama 7 hari</li>
                                <li>• Pembeli akan melihat instruksi pembayaran via transfer bank</li>
                                <li>• Setelah upload bukti transfer, Anda akan mendapat notifikasi</li>
                                <li>• Approve pembayaran agar pembeli bisa download file produk</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}