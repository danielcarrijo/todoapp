<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SubItem extends Model
{
    protected $fillable = ['title','is_completed','urgence'];
    public function task() {
        return $this->belongsto('App\Task');
    }
}
