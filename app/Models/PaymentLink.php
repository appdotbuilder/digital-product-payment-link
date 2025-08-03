<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

/**
 * App\Models\PaymentLink
 *
 * @property int $id
 * @property int $product_id
 * @property string $token
 * @property string $customer_name
 * @property string $customer_email
 * @property string $status
 * @property \Illuminate\Support\Carbon $expires_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Product $product
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\PaymentProof> $paymentProofs
 * @property-read int|null $payment_proofs_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentLink newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentLink newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentLink query()
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentLink whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentLink whereCustomerEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentLink whereCustomerName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentLink whereExpiresAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentLink whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentLink whereProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentLink whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentLink whereToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentLink whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentLink pending()
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentLink paid()
 * @method static \Database\Factories\PaymentLinkFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class PaymentLink extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'product_id',
        'token',
        'customer_name',
        'customer_email',
        'status',
        'expires_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'expires_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($paymentLink) {
            if (empty($paymentLink->token)) {
                $paymentLink->token = Str::random(32);
            }
        });
    }

    /**
     * Get the product that owns the payment link.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get the payment proofs for the payment link.
     */
    public function paymentProofs(): HasMany
    {
        return $this->hasMany(PaymentProof::class);
    }

    /**
     * Scope a query to only include pending payment links.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope a query to only include paid payment links.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePaid($query)
    {
        return $query->where('status', 'paid');
    }

    /**
     * Check if the payment link is expired.
     *
     * @return bool
     */
    public function isExpired(): bool
    {
        return $this->expires_at < now();
    }

    /**
     * Get the payment link URL.
     *
     * @return string
     */
    public function getUrlAttribute(): string
    {
        return route('payment.show', $this->token);
    }
}