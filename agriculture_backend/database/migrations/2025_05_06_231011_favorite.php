<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create("favorites", function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->enum("type", ["BLOGS", "COURSES"]);
            $table->uuid("user_id");
            $table->uuid("course_id")->nullable(true);
            $table->uuid("blog_id")->nullable();
            $table->foreign("user_id")->references("id")->on("authentications");
            $table->foreign("course_id")->references("id")->on("courses");
            $table->foreign("blog_id")->references("id")->on("services");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("favorites");
    }
};
