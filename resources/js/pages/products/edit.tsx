import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    file_path?: string;
    is_active: boolean;
}

interface Props {
    product: Product;
    [key: string]: unknown;
}

export default function ProductsEdit({ product }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        file: null as File | null,
        is_active: product.is_active as boolean,
        _method: 'PUT',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('products.update', product.id));
    };

    return (
        <AppShell>
            <Head title={`Edit ${product.name} - PayLink`} />
            
            <div className="max-w-2xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">✏️ Edit Produk</h1>
                    <p className="text-gray-600 mt-2">Perbarui informasi produk Anda</p>
                </div>

                {/* Form */}
                <div className="bg-white rounded-lg shadow p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Product Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Nama Produk *
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                placeholder="Contoh: E-book Panduan Digital Marketing"
                                required
                            />
                            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                Deskripsi Produk *
                            </label>
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                placeholder="Jelaskan produk Anda secara detail..."
                                required
                            />
                            {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
                        </div>

                        {/* Price */}
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                                Harga (Rp) *
                            </label>
                            <input
                                type="number"
                                id="price"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                placeholder="150000"
                                min="0"
                                required
                            />
                            {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price}</p>}
                        </div>

                        {/* Current File */}
                        {product.file_path && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    File Saat Ini
                                </label>
                                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                                    <span className="text-green-600">📁</span>
                                    <span className="text-sm text-gray-700">File sudah terupload</span>
                                </div>
                            </div>
                        )}

                        {/* File Upload */}
                        <div>
                            <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
                                {product.file_path ? 'Ganti File Produk (Opsional)' : 'File Produk (Opsional)'}
                            </label>
                            <input
                                type="file"
                                id="file"
                                onChange={(e) => setData('file', e.target.files?.[0] || null)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                accept=".pdf,.zip,.rar,.doc,.docx,.jpg,.png"
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                Format yang didukung: PDF, ZIP, RAR, DOC, DOCX, JPG, PNG. Maksimal 10MB.
                                {product.file_path && ' Kosongkan jika tidak ingin mengganti file.'}
                            </p>
                            {errors.file && <p className="text-red-600 text-sm mt-1">{errors.file}</p>}
                        </div>

                        {/* Status */}
                        <div>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                    className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">Aktifkan produk ini</span>
                            </label>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4 pt-6">
                            <Button
                                type="submit"
                                disabled={processing}
                                className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                            >
                                {processing ? '⏳ Menyimpan...' : '💾 Simpan Perubahan'}
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
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <div className="text-blue-600 text-xl">💡</div>
                        <div>
                            <h3 className="font-medium text-blue-900 mb-1">Tips Edit Produk</h3>
                            <ul className="text-sm text-blue-700 space-y-1">
                                <li>• Perubahan akan berlaku untuk payment link yang baru dibuat</li>
                                <li>• Payment link yang sudah ada tidak akan terpengaruh perubahan harga</li>
                                <li>• Jika mengganti file, pembeli dengan status paid akan mendapat file baru</li>
                                <li>• Nonaktifkan produk jika tidak ingin dijual sementara waktu</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}