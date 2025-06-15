<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OurServices extends Model
{
    protected $fillable = ["title", "description", "image"];
    protected $table = "our_services";
}
