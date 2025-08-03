<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\PaymentLink;
use App\Models\PaymentProof;
use App\Models\Product;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function index()
    {
        $stats = [
            'total_products' => Product::count(),
            'active_products' => Product::active()->count(),
            'total_payment_links' => PaymentLink::count(),
            'pending_payments' => PaymentLink::pending()->count(),
            'paid_payments' => PaymentLink::paid()->count(),
            'pending_proofs' => PaymentProof::pending()->count(),
            'total_revenue' => PaymentLink::paid()
                ->join('products', 'payment_links.product_id', '=', 'products.id')
                ->sum('products.price'),
        ];
        
        $recentPaymentLinks = PaymentLink::with('product')
            ->latest()
            ->take(5)
            ->get();
        
        $pendingProofs = PaymentProof::with(['paymentLink.product'])
            ->pending()
            ->latest()
            ->take(5)
            ->get();
        
        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentPaymentLinks' => $recentPaymentLinks,
            'pendingProofs' => $pendingProofs,
        ]);
    }
}