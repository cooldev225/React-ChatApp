<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePhotoGalleriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('photo_galleries', function (Blueprint $table) {
            $table->id();
            $table->integer('from')->default(0);
            $table->integer('to')->default(0)->nullable();
            $table->binary('photo')->nullable();
            $table->double('blur')->default(0)->nullable();
            $table->binary('content')->nullable();
            $table->string('extra')->default('')->nullable();

            
            // $table->integer('width')->default(0)->nullable();
            // $table->integer('height')->default(0)->nullable();
            // $table->string('emojis')->default('')->nullable();
            
            $table->integer('created_by')->nullable();
            $table->integer('updated_by')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
        });
        DB::statement('ALTER TABLE `photo_galleries` CHANGE `content` `content` MEDIUMBLOB NULL DEFAULT NULL;');
        DB::statement('ALTER TABLE `photo_galleries` CHANGE `photo` `photo` MEDIUMBLOB NULL DEFAULT NULL;');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('photo_galleries');
    }
}
