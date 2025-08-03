import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface PaymentProof {
    id: number;
    status: string;
    notes?: string;
    admin_notes?: string;
    proof_url: string;
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
    paymentProofs: {
        data: PaymentProof[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    [key: string]: unknown;
}

export default function PaymentProofs({ paymentProofs }: Props) {
    const [selectedProof, setSelectedProof] = useState<PaymentProof | null>(null);
    const [rejectReason, setRejectReason] = useState('');
    const [isRejecting, setIsRejecting] = useState(false);

    const handleApprove = (proof: PaymentProof) => {
        router.patch(route('admin.approve-payment', proof.id), {}, {
            preserveState: true,
            onSuccess: () => {
                setSelectedProof(null);
            }
        });
    };

    const handleReject = (proof: PaymentProof) => {
        if (!rejectReason.trim()) {
            alert('Alasan penolakan wajib diisi');
            return;
        }

        router.patch(route('admin.reject-payment', proof.id), {
            admin_notes: rejectReason
        }, {
            preserveState: true,
            onSuccess: () => {
                setSelectedProof(null);
                setRejectReason('');
                setIsRejecting(false);
            }
        });
    };

    const getStatusBadge = (status: string) => {
        const styles = {
            pending: 'bg-yellow-100 text-yellow-800',
            approved: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800',
        };
        
        const labels = {
            pending: 'Menunggu',
            approved: 'Disetujui',
            rejected: 'Ditolak',
        };

        return (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status as keyof typeof styles] || styles.pending}`}>
                {labels[status as keyof typeof labels] || status}
            </span>
        );
    };

    return (
        <AppShell>
            <Head title="Verifikasi Pembayaran - PayLink" />
            
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">📸 Verifikasi Pembayaran</h1>
                    <p className="text-gray-600 mt-1">Review dan verifikasi bukti transfer dari pembeli</p>
                </div>

                {/* Payment Proofs List */}
                {paymentProofs.data.length > 0 ? (
                    <div className="grid gap-6">
                        {paymentProofs.data.map((proof) => (
                            <div key={proof.id} className="bg-white rounded-lg shadow p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {proof.payment_link.customer_name}
                                            </h3>
                                            {getStatusBadge(proof.status)}
                                        </div>
                                        
                                        <div className="text-sm text-gray-600 space-y-1">
                                            <div><strong>Email:</strong> {proof.payment_link.customer_email}</div>
                                            <div><strong>Produk:</strong> {proof.payment_link.product.name}</div>
                                            <div><strong>Harga:</strong> {proof.payment_link.product.formatted_price}</div>
                                            <div><strong>Tanggal:</strong> {new Date(proof.created_at).toLocaleDateString('id-ID')}</div>
                                            {proof.notes && (
                                                <div><strong>Catatan Pembeli:</strong> {proof.notes}</div>
                                            )}
                                            {proof.admin_notes && (
                                                <div className="text-red-600"><strong>Alasan Penolakan:</strong> {proof.admin_notes}</div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 ml-4">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setSelectedProof(proof)}
                                        >
                                            👁️ Lihat Bukti
                                        </Button>
                                        
                                        {proof.status === 'pending' && (
                                            <>
                                                <Button
                                                    size="sm"
                                                    className="bg-green-600 hover:bg-green-700"
                                                    onClick={() => handleApprove(proof)}
                                                >
                                                    ✅ Setujui
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="text-red-600 border-red-600 hover:bg-red-50"
                                                    onClick={() => {
                                                        setSelectedProof(proof);
                                                        setIsRejecting(true);
                                                    }}
                                                >
                                                    ❌ Tolak
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow p-12 text-center">
                        <div className="text-6xl mb-4">📸</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak Ada Bukti Transfer</h3>
                        <p className="text-gray-600">Belum ada bukti transfer yang perlu diverifikasi</p>
                    </div>
                )}

                {/* Pagination Info */}
                {paymentProofs.data.length > 0 && (
                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-600">
                                Menampilkan {paymentProofs.data.length} dari {paymentProofs.total} bukti transfer
                            </div>
                            <div className="text-sm text-gray-600">
                                Halaman {paymentProofs.current_page} dari {paymentProofs.last_page}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal for viewing proof */}
            {selectedProof && !isRejecting && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">Bukti Transfer - {selectedProof.payment_link.customer_name}</h2>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setSelectedProof(null)}
                                >
                                    ❌ Tutup
                                </Button>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div><strong>Email:</strong> {selectedProof.payment_link.customer_email}</div>
                                    <div><strong>Produk:</strong> {selectedProof.payment_link.product.name}</div>
                                    <div><strong>Harga:</strong> {selectedProof.payment_link.product.formatted_price}</div>
                                    <div><strong>Status:</strong> {getStatusBadge(selectedProof.status)}</div>
                                </div>
                                
                                {selectedProof.notes && (
                                    <div>
                                        <strong>Catatan Pembeli:</strong>
                                        <p className="text-gray-600 mt-1">{selectedProof.notes}</p>
                                    </div>
                                )}
                                
                                <div>
                                    <strong>Bukti Transfer:</strong>
                                    <div className="mt-2">
                                        <img 
                                            src={selectedProof.proof_url} 
                                            alt="Bukti Transfer"
                                            className="max-w-full h-auto rounded-lg shadow"
                                        />
                                    </div>
                                </div>
                                
                                {selectedProof.status === 'pending' && (
                                    <div className="flex gap-3 pt-4">
                                        <Button
                                            className="bg-green-600 hover:bg-green-700"
                                            onClick={() => handleApprove(selectedProof)}
                                        >
                                            ✅ Setujui Pembayaran
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="text-red-600 border-red-600 hover:bg-red-50"
                                            onClick={() => setIsRejecting(true)}
                                        >
                                            ❌ Tolak Pembayaran
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for rejecting payment */}
            {selectedProof && isRejecting && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-md w-full">
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-4">Tolak Pembayaran</h2>
                            
                            <div className="space-y-4">
                                <p className="text-gray-600">
                                    Mengapa Anda menolak pembayaran dari <strong>{selectedProof.payment_link.customer_name}</strong>?
                                </p>
                                
                                <textarea
                                    value={rejectReason}
                                    onChange={(e) => setRejectReason(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    rows={4}
                                    placeholder="Masukkan alasan penolakan..."
                                    required
                                />
                                
                                <div className="flex gap-3">
                                    <Button
                                        className="bg-red-600 hover:bg-red-700"
                                        onClick={() => handleReject(selectedProof)}
                                        disabled={!rejectReason.trim()}
                                    >
                                        ❌ Tolak Pembayaran
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setIsRejecting(false);
                                            setRejectReason('');
                                        }}
                                    >
                                        Batal
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AppShell>
    );
}