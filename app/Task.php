<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = ['name','description','is_completed','urgence'];
    public function subitems() {
        return $this->hasMany('App\SubItem');
    }
}
