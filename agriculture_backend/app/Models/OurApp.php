<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OurApp extends Model
{
    protected $fillable = ["services", "description", "image", "link"];
    protected $table = "our_apps";
}
