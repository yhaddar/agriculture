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
        * table categories_courses for category of courses
        */
        Schema::create("categories_courses", function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->string("title");
            $table->longText("description");
            $table->string("cover");
        });

        /*
        * table courses for the courses of agriculture
        */
        Schema::create("courses", function(Blueprint $table) {
            $table->uuid("id")->primary();
            $table->uuid("user_id");
            $table->string("title")->nullable(false);
            $table->longText("description");
            $table->longText("keys_learning");
            $table->longText("modules_and_topics");
            $table->uuid("category_id");
            $table->string("total_hours");
            $table->enum("type_video", ["video", "playlist"]);
            $table->enum("type_payment", ["free", "paid"]);
            $table->double("price")->nullable(true);
            $table->double("old_price")->default(0);
            $table->string("cover");
            $table->json("langues");
            $table->string("trailer")->nullable(true);
            $table->foreign("user_id")->references("id")->on("authentications")->onDelete("cascade");
            $table->foreign("category_id")->references("id")->on("categories_courses")->onDelete("cascade");
            $table->timestamps();
        });
        /*
        * table courses for the courses of agriculture
        */

        Schema::create("video_courses", function(Blueprint $table){
            $table->uuid("id")->primary();
            $table->string("title");
            $table->string("description");
            $table->string("video_link");
            $table->string("cover");
            $table->integer("order");
            $table->uuid("course_id");
            $table->uuid("user_id");
            $table->foreign("course_id")->references("id")->on("courses")->onDelete("cascade");
            $table->foreign("user_id")->references("id")->on("authentications")->onDelete("cascade");
            $table->timestamps();
        });

        /*
         * table my_learning for add the courses to my learning
         */
        Schema::create("my_learning", function(Blueprint $table){
            $table->uuid("id")->primary();
            $table->uuid("user_id");
            $table->uuid("courses_id");
            $table->boolean("isFree");
            $table->foreign("user_id")->references("id")->on("authentications")->onDelete("cascade");
            $table->foreign("courses_id")->references("id")->on("courses")->onDelete("cascade");
            $table->boolean("isPaid")->default(false);
            $table->timestamps();
        });

        /*
         * table checkouts for payment the courses
         */
        Schema::create("checkouts", function(Blueprint $table){
            $table->uuid("id")->primary();
            $table->uuid("user_id");
            $table->uuid("status");
            $table->string("session_id");
            $table->decimal("total_price");
            $table->foreign("user_id")->references("id")->on("authentications")->onDelete("cascade");
            $table->json("my_learning");
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("categories");
        Schema::dropIfExists("courses");
        Schema::dropIfExists("video_courses");
        Schema::dropIfExists("my_learning");
        Schema::dropIfExists("checkouts");
    }
};
