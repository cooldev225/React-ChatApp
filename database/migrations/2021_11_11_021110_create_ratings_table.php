<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRatingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ratings', function (Blueprint $table) {
            $table->integer('user_id');
            $table->integer('text_count')->default(0)->nullable();
            $table->double('text_rate')->default(0)->nullable();
            $table->integer('photo_count')->default(0)->nullable();
            $table->double('photo_rate')->default(0)->nullable();
            $table->integer('video_count')->default(0)->nullable();
            $table->double('video_rate')->default(0)->nullable();
            $table->integer('audio_count')->default(0)->nullable();
            $table->double('audio_rate')->default(0)->nullable();
            $table->integer('video_call_count')->default(0)->nullable();
            $table->double('video_call_rate')->default(0)->nullable();
            $table->integer('voice_call_count')->default(0)->nullable();
            $table->double('voice_call_rate')->default(0)->nullable();

            $table->integer('created_by')->nullable();
            $table->integer('updated_by')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
            $table->primary('user_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ratings');
    }
}
