import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function Welcome() {
    return (
        <>
            <Head title="PayLink - Payment Link untuk Produk Digital" />
            
            <div className="min-h-screen bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600">
                {/* Navigation */}
                <nav className="px-6 py-4">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                                <span className="text-2xl">💳</span>
                            </div>
                            <span className="text-white text-xl font-bold">PayLink</span>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            <Link href={route('login')}>
                                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-gray-900">
                                    Masuk
                                </Button>
                            </Link>
                            <Link href={route('register')}>
                                <Button className="bg-white text-gray-900 hover:bg-gray-100">
                                    Daftar
                                </Button>
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="px-6 py-16">
                    <div className="max-w-4xl mx-auto text-center text-white">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            🚀 Payment Link untuk
                            <br />
                            <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                                Produk Digital
                            </span>
                        </h1>
                        
                        <p className="text-xl md:text-2xl mb-8 opacity-90">
                            Buat link pembayaran unik untuk setiap produk digital Anda.
                            <br />
                            Terima pembayaran via transfer bank dengan mudah dan aman.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                            <Link href={route('register')}>
                                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 text-lg">
                                    ✨ Mulai Gratis
                                </Button>
                            </Link>
                            <Link href={route('login')}>
                                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-gray-900 px-8 py-3 text-lg">
                                    📊 Dashboard Admin
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="px-6 py-16 bg-white bg-opacity-10 backdrop-blur-sm">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
                            🎯 Fitur Utama
                        </h2>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="text-center text-white">
                                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl">🔗</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Generate Payment Link</h3>
                                <p className="opacity-80">Buat link pembayaran unik untuk setiap produk dengan nama, harga, dan instruksi pembayaran.</p>
                            </div>
                            
                            <div className="text-center text-white">
                                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl">🏦</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Transfer Bank Manual</h3>
                                <p className="opacity-80">Dukungan pembayaran via transfer bank lokal dengan fitur upload bukti transfer.</p>
                            </div>
                            
                            <div className="text-center text-white">
                                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl">📱</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Manajemen Produk</h3>
                                <p className="opacity-80">CRUD lengkap untuk produk digital dengan file download otomatis setelah pembayaran.</p>
                            </div>
                            
                            <div className="text-center text-white">
                                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl">🔔</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Notifikasi Real-time</h3>
                                <p className="opacity-80">Terima notifikasi langsung ketika ada bukti transfer baru dari pembeli.</p>
                            </div>
                            
                            <div className="text-center text-white">
                                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl">📊</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Dashboard Admin</h3>
                                <p className="opacity-80">Monitor data penjualan, status pembayaran, dan kelola semua produk dalam satu tempat.</p>
                            </div>
                            
                            <div className="text-center text-white">
                                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl">📱</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Responsive Design</h3>
                                <p className="opacity-80">Tampilan modern dan responsif yang bekerja sempurna di desktop maupun mobile.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* How It Works */}
                <div className="px-6 py-16">
                    <div className="max-w-4xl mx-auto text-center text-white">
                        <h2 className="text-3xl md:text-4xl font-bold mb-12">
                            🛠️ Cara Kerja
                        </h2>
                        
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-xl font-bold">1</span>
                                </div>
                                <h3 className="text-lg font-semibold mb-2">Upload Produk</h3>
                                <p className="opacity-80">Tambahkan produk digital Anda dengan nama, deskripsi, harga, dan file download.</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-xl font-bold">2</span>
                                </div>
                                <h3 className="text-lg font-semibold mb-2">Generate Link</h3>
                                <p className="opacity-80">Buat payment link unik dan bagikan kepada calon pembeli via WhatsApp, email, atau media sosial.</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-xl font-bold">3</span>
                                </div>
                                <h3 className="text-lg font-semibold mb-2">Terima Pembayaran</h3>
                                <p className="opacity-80">Pembeli transfer ke rekening Anda, upload bukti, lalu Anda approve dan mereka dapatkan file otomatis.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="px-6 py-16 bg-white bg-opacity-10 backdrop-blur-sm">
                    <div className="max-w-4xl mx-auto text-center text-white">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            🎉 Siap Memulai Bisnis Digital Anda?
                        </h2>
                        <p className="text-xl mb-8 opacity-90">
                            Bergabunglah dengan ribuan penjual yang sudah mempercayai PayLink untuk bisnis digital mereka.
                        </p>
                        
                        <Link href={route('register')}>
                            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-xl">
                                🚀 Mulai Sekarang - Gratis!
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Footer */}
                <footer className="px-6 py-8 text-center text-white opacity-80">
                    <p>&copy; 2024 PayLink. Semua hak dilindungi. Dibuat dengan ❤️ untuk penjual digital Indonesia.</p>
                </footer>
            </div>
        </>
    );
}