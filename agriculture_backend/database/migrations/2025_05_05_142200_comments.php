<?php

use App\Enums\TypeCommentsEnum;
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
        Schema::create('comments', function (Blueprint $table) {
           $table->uuid("id")->primary();
           $table->uuid("user_id");
           $table->uuid("courses_id")->nullable();
           $table->uuid("innovation_id")->nullable();
           $table->enum("type", ["COURSES", "INNOVATION"]);
           $table->foreign("user_id")->references("id")->on("authentications")->onDelete("cascade");
           $table->foreign("courses_id")->references("id")->on("courses")->onDelete("cascade");
           $table->foreign("innovation_id")->references("id")->on("innovations")->onDelete("cascade");
           $table->longText("comment");
           $table->integer("rate")->default(0);
           $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};
