<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VideoCourses extends Model
{
    protected $table = "video_courses";

    protected $fillable = ["title", "description", "video_link", "course_id", "cover", "order", "user_id"];
}
