<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Courses extends Model
{
    protected $fillable = ["user_id", "title", "description", "keys_learning", "modules_and_topics", "category_id", "total_hours", "type_video", "type_payment", "price", "old_price", "cover", "langues"];
    protected $table = "courses";

    protected $casts = [
        'langues' => 'array',
    ];
}
