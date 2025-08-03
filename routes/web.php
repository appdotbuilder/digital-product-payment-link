<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\DownloadController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PaymentLinkController;
use App\Http\Controllers\PaymentProofController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Public routes
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Payment routes (public access)
Route::controller(PaymentController::class)->group(function () {
    Route::get('/payment/{token}', 'show')->name('payment.show');
    Route::post('/payment/{token}', 'store')->name('payment.store');
});

// Download route
Route::get('/download/{token}', [DownloadController::class, 'show'])->name('payment.download');

// Authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', [AdminController::class, 'index'])->name('dashboard');
    
    // Payment proof management
    Route::controller(PaymentProofController::class)->prefix('admin')->name('admin.')->group(function () {
        Route::get('/payment-proofs', 'index')->name('payment-proofs');
        Route::patch('/payment-proofs/{paymentProof}/approve', 'update')->name('approve-payment');
        Route::patch('/payment-proofs/{paymentProof}/reject', 'update')->name('reject-payment');
    });
    
    // Product management
    Route::resource('products', ProductController::class);
    
    // Payment link management
    Route::resource('payment-links', PaymentLinkController::class)->except(['edit', 'update']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
