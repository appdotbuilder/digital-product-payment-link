import React from 'react';
import { Head } from '@inertiajs/react';

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

export default function PaymentSuccess({ paymentLink }: Props) {
    return (
        <>
            <Head title={`Bukti Transfer Terkirim - ${paymentLink.product.name}`} />
            
            <div className="min-h-screen bg-gradient-to-br from-green-500 via-teal-500 to-blue-600 py-8">
                <div className="max-w-2xl mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">✅</span>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">Berhasil!</h1>
                        <p className="text-white opacity-90">Bukti Transfer Telah Diterima</p>
                    </div>

                    {/* Success Card */}
                    <div className="bg-white rounded-lg shadow-lg p-8 text-center mb-6">
                        <div className="text-6xl mb-4">🎉</div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Terima Kasih!</h2>
                        
                        <p className="text-gray-600 mb-6">
                            Bukti transfer Anda telah berhasil dikirim dan sedang dalam proses verifikasi.
                        </p>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                            <h3 className="font-semibold text-blue-900 mb-2">📋 Detail Pesanan</h3>
                            <div className="space-y-2 text-blue-800">
                                <div><strong>Produk:</strong> {paymentLink.product.name}</div>
                                <div><strong>Pembeli:</strong> {paymentLink.customer_name}</div>
                                <div><strong>Email:</strong> {paymentLink.customer_email}</div>
                                <div><strong>Total:</strong> {paymentLink.product.formatted_price}</div>
                            </div>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <h3 className="font-semibold text-yellow-900 mb-2">⏰ Langkah Selanjutnya</h3>
                            <ul className="text-yellow-800 text-sm space-y-1 text-left">
                                <li>• Tim kami akan memverifikasi pembayaran Anda dalam 1x24 jam</li>
                                <li>• Anda akan menerima email konfirmasi setelah pembayaran disetujui</li>
                                <li>• Link download produk akan dikirim ke email: <strong>{paymentLink.customer_email}</strong></li>
                                <li>• Jika ada pertanyaan, silakan hubungi customer service kami</li>
                            </ul>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 text-white">
                        <h3 className="text-lg font-semibold mb-3">📞 Butuh Bantuan?</h3>
                        <div className="space-y-2 text-sm">
                            <div>Email: support@paylink.com</div>
                            <div>WhatsApp: +62 812-3456-7890</div>
                            <div>Jam Operasional: Senin - Jumat, 09:00 - 17:00 WIB</div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-8 text-white opacity-75">
                        <p>&copy; 2024 PayLink - Terima kasih telah mempercayai kami!</p>
                    </div>
                </div>
            </div>
        </>
    );
}