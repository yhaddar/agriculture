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
        Schema::create('hero_components', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->string("title");
            $table->longText("description");
            $table->string("image");
            $table->enum("type", ["blogs", "news", "innovation", "courses", "home", "privacyPolicy", "contact", "faq", "ourApps"])->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hero_components');
    }
};
