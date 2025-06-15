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
         * table privacy_policy for the privacy policy of the website
         */
        Schema::create("privacy_policy", function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->string("title")->nullable(false);
            $table->longText("description")->nullable(false);;
            $table->timestamps();
        });
        /*
         * table privacy_policy for the privacy policy of the website
        */
        Schema::create("faq", function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->string("title")->nullable(false);
            $table->longText("description")->nullable(false);;
            $table->timestamps();
        });

        /*
         * table ourServices for the services of the website
        */
        Schema::create("our_services", function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->string("title")->nullable(false);
            $table->longText("description")->nullable(false);;
            $table->string("image")->nullable(false);;
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("privacy_policy");
        Schema::dropIfExists("faq");
        Schema::dropIfExists("our_services");
    }
};
