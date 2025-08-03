<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\PaymentProof
 *
 * @property int $id
 * @property int $payment_link_id
 * @property string $proof_file_path
 * @property string|null $notes
 * @property string $status
 * @property string|null $admin_notes
 * @property \Illuminate\Support\Carbon|null $approved_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\PaymentLink $paymentLink
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentProof newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentProof newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentProof query()
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentProof whereAdminNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentProof whereApprovedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentProof whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentProof whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentProof whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentProof wherePaymentLinkId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentProof whereProofFilePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentProof whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentProof whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentProof pending()
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentProof approved()
 * @method static \Database\Factories\PaymentProofFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class PaymentProof extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'payment_link_id',
        'proof_file_path',
        'notes',
        'status',
        'admin_notes',
        'approved_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'approved_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the payment link that owns the payment proof.
     */
    public function paymentLink(): BelongsTo
    {
        return $this->belongsTo(PaymentLink::class);
    }

    /**
     * Scope a query to only include pending payment proofs.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope a query to only include approved payment proofs.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    /**
     * Get the proof file URL.
     *
     * @return string
     */
    public function getProofUrlAttribute(): string
    {
        return asset('storage/' . $this->proof_file_path);
    }
}