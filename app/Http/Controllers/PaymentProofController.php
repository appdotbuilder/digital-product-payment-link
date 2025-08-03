<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\PaymentProof;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentProofController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $paymentProofs = PaymentProof::with(['paymentLink.product'])
            ->latest()
            ->paginate(10);
        
        return Inertia::render('admin/payment-proofs', [
            'paymentProofs' => $paymentProofs
        ]);
    }
    
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PaymentProof $paymentProof)
    {
        // Check if this is an approval request
        if ($request->route()->getName() === 'admin.approve-payment') {
            $paymentProof->update([
                'status' => 'approved',
                'approved_at' => now(),
            ]);
            
            // Update payment link status
            $paymentProof->paymentLink->update(['status' => 'paid']);
            
            return back()->with('success', 'Pembayaran berhasil disetujui.');
        }
        
        // Check if this is a rejection request
        if ($request->route()->getName() === 'admin.reject-payment') {
            $request->validate([
                'admin_notes' => 'required|string|max:500'
            ]);
            
            $paymentProof->update([
                'status' => 'rejected',
                'admin_notes' => $request->admin_notes,
            ]);
            
            return back()->with('success', 'Pembayaran berhasil ditolak.');
        }
        
        return back()->withErrors(['error' => 'Aksi tidak valid.']);
    }
}