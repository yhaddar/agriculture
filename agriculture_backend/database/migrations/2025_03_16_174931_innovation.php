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
        /*
         * table innovations for innovation about agriculture
         */
        Schema::create("innovations", function(Blueprint $table){
            $table->uuid("id")->primary();
            $table->string("innovation")->nullable(false);
            $table->string("inventor")->nullable(false);
            $table->string("image")->nullable(false);
            $table->longText("description")->nullable(false);
            $table->date("date_creation")->nullable(false);
            $table->uuid("user_id")->nullable(false);
            $table->foreign("user_id")->references("id")->on("authentications")->onDelete("cascade");
            $table->longText("impact")->nullable(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("innovations");
    }
};
