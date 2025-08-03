<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePaymentProofRequest;
use App\Models\PaymentLink;
use App\Models\PaymentProof;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PaymentController extends Controller
{
    /**
     * Display the payment page.
     */
    public function show(string $token)
    {
        $paymentLink = PaymentLink::with('product')
            ->where('token', $token)
            ->firstOrFail();
        
        // Check if expired
        if ($paymentLink->isExpired()) {
            $paymentLink->update(['status' => 'expired']);
        }
        
        return Inertia::render('payment/show', [
            'paymentLink' => $paymentLink
        ]);
    }

    /**
     * Store payment proof.
     */
    public function store(StorePaymentProofRequest $request, string $token)
    {
        $paymentLink = PaymentLink::where('token', $token)->firstOrFail();
        
        // Check if payment link is still valid
        if ($paymentLink->status !== 'pending' || $paymentLink->isExpired()) {
            return back()->withErrors(['error' => 'Link pembayaran tidak valid atau sudah kadaluarsa.']);
        }
        
        $validated = $request->validated();
        
        // Handle file upload
        $validated['proof_file_path'] = $request->file('proof_file')->store('payment-proofs', 'public');
        $validated['payment_link_id'] = $paymentLink->id;
        
        PaymentProof::create($validated);
        
        return Inertia::render('payment/success', [
            'paymentLink' => $paymentLink
        ]);
    }


}