import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    formatted_price: string;
}

interface PaymentLink {
    id: number;
    token: string;
    customer_name: string;
    customer_email: string;
    status: string;
    expires_at: string;
    product: Product;
}

interface Props {
    paymentLink: PaymentLink;
    [key: string]: unknown;
}

export default function PaymentShow({ paymentLink }: Props) {
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    
    const { data, setData, post, processing, errors } = useForm({
        proof_file: null as File | null,
        notes: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('payment.store', paymentLink.token));
    };

    const isExpired = new Date(paymentLink.expires_at) < new Date();
    const isPaid = paymentLink.status === 'paid';

    return (
        <>
            <Head title={`Pembayaran - ${paymentLink.product.name}`} />
            
            <div className="min-h-screen bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 py-8">
                <div className="max-w-2xl mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">💳</span>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">PayLink</h1>
                        <p className="text-white opacity-90">Halaman Pembayaran</p>
                    </div>

                    {/* Payment Status */}
                    {isPaid && (
                        <div className="bg-green-100 border border-green-400 rounded-lg p-4 mb-6">
                            <div className="flex items-center">
                                <span className="text-2xl mr-3">✅</span>
                                <div>
                                    <h3 className="font-semibold text-green-800">Pembayaran Sudah Lunas</h3>
                                    <p className="text-green-700">Terima kasih! Pembayaran Anda telah dikonfirmasi.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {isExpired && !isPaid && (
                        <div className="bg-red-100 border border-red-400 rounded-lg p-4 mb-6">
                            <div className="flex items-center">
                                <span className="text-2xl mr-3">⏰</span>
                                <div>
                                    <h3 className="font-semibold text-red-800">Link Pembayaran Kedaluwarsa</h3>
                                    <p className="text-red-700">Mohon hubungi penjual untuk mendapatkan link baru.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Product Details */}
                    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">📦 Detail Produk</h2>
                        
                        <div className="space-y-3">
                            <div>
                                <label className="text-sm font-medium text-gray-600">Nama Produk</label>
                                <div className="text-lg font-medium text-gray-900">{paymentLink.product.name}</div>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-gray-600">Deskripsi</label>
                                <div className="text-gray-700">{paymentLink.product.description}</div>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-gray-600">Harga</label>
                                <div className="text-2xl font-bold text-orange-600">{paymentLink.product.formatted_price}</div>
                            </div>
                        </div>
                    </div>

                    {/* Customer Info */}
                    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">👤 Informasi Pembeli</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600">Nama</label>
                                <div className="text-gray-900">{paymentLink.customer_name}</div>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-gray-600">Email</label>
                                <div className="text-gray-900">{paymentLink.customer_email}</div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Instructions */}
                    {!isPaid && !isExpired && (
                        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">🏦 Instruksi Pembayaran</h2>
                            
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                                <h3 className="font-medium text-blue-900 mb-2">Transfer ke Rekening Berikut:</h3>
                                <div className="space-y-2 text-blue-800">
                                    <div><strong>Bank:</strong> BCA</div>
                                    <div><strong>No. Rekening:</strong> 1234567890</div>
                                    <div><strong>Atas Nama:</strong> PayLink Indonesia</div>
                                    <div><strong>Jumlah:</strong> <span className="text-lg font-bold">{paymentLink.product.formatted_price}</span></div>
                                </div>
                            </div>

                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <h3 className="font-medium text-yellow-900 mb-2">⚠️ Penting:</h3>
                                <ul className="text-yellow-800 text-sm space-y-1">
                                    <li>• Transfer sesuai jumlah yang tertera</li>
                                    <li>• Upload bukti transfer setelah pembayaran</li>
                                    <li>• Tunggu konfirmasi dari admin (maks 1x24 jam)</li>
                                    <li>• Link download akan dikirim ke email setelah dikonfirmasi</li>
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Payment Proof Upload */}
                    {!isPaid && !isExpired && (
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">📸 Upload Bukti Transfer</h2>
                            
                            {!showPaymentForm ? (
                                <div className="text-center py-8">
                                    <div className="text-6xl mb-4">💳</div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Sudah Transfer?</h3>
                                    <p className="text-gray-600 mb-6">Upload bukti transfer Anda untuk verifikasi pembayaran</p>
                                    
                                    <Button 
                                        onClick={() => setShowPaymentForm(true)}
                                        className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                                    >
                                        📤 Upload Bukti Transfer
                                    </Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label htmlFor="proof_file" className="block text-sm font-medium text-gray-700 mb-2">
                                            Bukti Transfer *
                                        </label>
                                        <input
                                            type="file"
                                            id="proof_file"
                                            onChange={(e) => setData('proof_file', e.target.files?.[0] || null)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            accept="image/*"
                                            required
                                        />
                                        <p className="text-sm text-gray-500 mt-1">Format: JPG, PNG. Maksimal 2MB.</p>
                                        {errors.proof_file && <p className="text-red-600 text-sm mt-1">{errors.proof_file}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                                            Catatan (Opsional)
                                        </label>
                                        <textarea
                                            id="notes"
                                            value={data.notes}
                                            onChange={(e) => setData('notes', e.target.value)}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            placeholder="Tambahkan catatan jika perlu..."
                                        />
                                        {errors.notes && <p className="text-red-600 text-sm mt-1">{errors.notes}</p>}
                                    </div>

                                    <div className="flex gap-3 pt-2">
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                                        >
                                            {processing ? '⏳ Mengirim...' : '✅ Kirim Bukti Transfer'}
                                        </Button>
                                        
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setShowPaymentForm(false)}
                                        >
                                            ❌ Batal
                                        </Button>
                                    </div>
                                </form>
                            )}
                        </div>
                    )}

                    {/* Download Link for Paid */}
                    {isPaid && (
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">📥 Download Produk</h2>
                            <div className="text-center py-4">
                                <div className="text-4xl mb-4">🎉</div>
                                <p className="text-gray-600 mb-6">Pembayaran telah dikonfirmasi! Anda dapat mendownload produk sekarang.</p>
                                
                                <a
                                    href={route('payment.download', paymentLink.token)}
                                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-green-700 transition-colors"
                                >
                                    📥 Download {paymentLink.product.name}
                                </a>
                            </div>
                        </div>
                    )}

                    {/* Footer */}
                    <div className="text-center mt-8 text-white opacity-75">
                        <p>&copy; 2024 PayLink - Payment Link untuk Produk Digital</p>
                    </div>
                </div>
            </div>
        </>
    );
}