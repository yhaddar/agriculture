<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class heroComponent extends Model
{
    use HasFactory;
    protected $fillable = ["title", "type", "image", "Description"];
}
