<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Checkout extends Model
{
    protected $fillable = ["user_id", "status", "id", "session_id", "total_price", "courses_id"];

    protected $table = "checkouts";
    protected $casts = [
        "my_learning" => "array",
    ];
}
