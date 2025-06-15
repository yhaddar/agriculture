<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;
    protected $fillable = ["title", "description", "image","service_type"];
    protected $casts = ["id" => "string"];
    protected $hidden = ["user_id", "category_id", "service_type", "heroComponent_id"];

    public function serviceNews(){
        return $this->hasOne(ServicesNews::class, "service_id", "id");
    }

    public function categories(){
        return $this->belongsTo(Category::class, "category_id", "id");
    }
}
