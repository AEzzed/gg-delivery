<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class Order extends Model
{

    protected $fillable = [
        'user_id',
        'total_price',
        'status',
        'delivery_method',
        'payment_method',
    ];

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
