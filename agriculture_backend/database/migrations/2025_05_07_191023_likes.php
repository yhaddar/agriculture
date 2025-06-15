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
        Schema::create("likes", function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->enum("type", ["BLOGS", "COURSES", "NEWS"]);
            $table->uuid("user_id");
            $table->uuid("service_id")->nullable(true);
            $table->uuid("courses_id")->nullable(true);
            $table->foreign('user_id')->references('id')->on("authentications");
            $table->foreign('service_id')->references('id')->on("services");
            $table->foreign('courses_id')->references('id')->on("courses");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("likes");
    }
};
