<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comments extends Model
{
    protected $fillable = ["user_id", "courses_id", "innovation_id", "type", "comment", "rate"];
}
