<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $fillable = ["title", "description", "cover"];
    protected $casts = ["id" => "string"];
    protected $hidden = ["user_id"];

    public function blogs(){
        return $this->hasMany(Service::class, "category_id", "id");
    }

    public function services(){
        return $this->hasMany(Service::class, "category_id", "id");
    }
}
