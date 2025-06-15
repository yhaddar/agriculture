<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PrivacyPolicy extends Model
{
    protected $fillable = ["id", "title", "description"];
    protected $table = "privacy_policy";
}
