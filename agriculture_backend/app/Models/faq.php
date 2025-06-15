<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class faq extends Model
{
    protected $fillable = ["id", "title", "description"];
    protected $table = "faq";
}
