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
        Schema::create("review", function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->uuid("user_id");
            $table->text("review");
            $table->integer("rating");
            $table->foreign("user_id")->references("id")->on("authentications");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("review");
    }
};
