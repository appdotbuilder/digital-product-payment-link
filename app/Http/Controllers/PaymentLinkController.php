<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePaymentLinkRequest;
use App\Models\PaymentLink;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentLinkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $paymentLinks = PaymentLink::with('product')
            ->latest()
            ->paginate(10);
        
        return Inertia::render('payment-links/index', [
            'paymentLinks' => $paymentLinks
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $products = Product::active()->get();
        
        return Inertia::render('payment-links/create', [
            'products' => $products
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePaymentLinkRequest $request)
    {
        $validated = $request->validated();
        $validated['expires_at'] = now()->addDays(7); // Expire in 7 days
        
        $paymentLink = PaymentLink::create($validated);

        return redirect()->route('payment-links.show', $paymentLink)
            ->with('success', 'Link pembayaran berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(PaymentLink $paymentLink)
    {
        $paymentLink->load(['product', 'paymentProofs']);
        
        return Inertia::render('payment-links/show', [
            'paymentLink' => $paymentLink
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PaymentLink $paymentLink)
    {
        $paymentLink->delete();

        return redirect()->route('payment-links.index')
            ->with('success', 'Link pembayaran berhasil dihapus.');
    }
}