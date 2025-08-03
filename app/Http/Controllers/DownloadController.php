<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\PaymentLink;

class DownloadController extends Controller
{
    /**
     * Download product file.
     */
    public function show(string $token)
    {
        $paymentLink = PaymentLink::with('product')
            ->where('token', $token)
            ->where('status', 'paid')
            ->firstOrFail();
        
        if (!$paymentLink->product->file_path) {
            abort(404, 'File tidak ditemukan.');
        }
        
        $filePath = storage_path('app/public/' . $paymentLink->product->file_path);
        
        if (!file_exists($filePath)) {
            abort(404, 'File tidak ditemukan.');
        }
        
        return response()->download($filePath, $paymentLink->product->name);
    }
}