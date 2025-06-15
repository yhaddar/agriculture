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
        Schema::create("our_apps", function(Blueprint $table){
            $table->uuid("id")->primary();
            $table->longText("description");
            $table->string("image");
            $table->string("link");
            $table->longText("services");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("our_apps");
    }
};
