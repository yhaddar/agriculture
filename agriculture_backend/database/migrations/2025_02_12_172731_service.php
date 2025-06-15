<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        /*
        * table categories for category of each blog and news
        */
        Schema::create("categories", function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->string("title")->nullable(false);
            $table->longText("description")->nullable(false);
            $table->string("cover")->nullable(false);
            $table->uuid("user_id")->nullable(true);
            $table->foreign("user_id")->references("id")->on("authentications")->onDelete("set null");
            $table->string("category_type");
            $table->timestamps();
        });

        /*
         * table Services for all blogs and news about agriculture
         */
        Schema::create("services", function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->string("title")->nullable(false);
            $table->longText("description")->nullable(false);
            $table->string("image")->nullable(false);
            $table->uuid("user_id");
            $table->foreign("user_id")->references("id")->on("authentications")->onDelete(null);
            $table->uuid("category_id");
            $table->foreign("category_id")->references("id")->on("categories")->onDelete("cascade");
            $table->enum("service_type", ["BLOGS", "NEWS"]);
            $table->string("location")->nullable(true);
            $table->string("source")->nullable(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("categories");
        Schema::dropIfExists("blogs");
        Schema::dropIfExists("services");
    }

};
