<?php

namespace App\Http\Controllers;

use App\SubItem;
use Illuminate\Http\Request;

class SubItemController extends Controller
{
    

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $subitem = new SubItem;
        $subitem->title = $request->title;
        $subitem->task_id = $request->task_id;
        $subitem->is_completed = 0;
        $subitem->urgence = intval($request->urgence);
        $subitem->save();
        return $subitem->toJson();
    }

    public function MarkasCompleted(SubItem $subitem) {
        $subitem->is_completed = 1;
        $subitem->save();
        return response()->json('Marked as completed');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\SubItem  $subItem
     * @return \Illuminate\Http\Response
     */
    public function show(SubItem $subItem)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\SubItem  $subItem
     * @return \Illuminate\Http\Response
     */
    public function edit(SubItem $subItem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\SubItem  $subItem
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, SubItem $subItem)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\SubItem  $subItem
     * @return \Illuminate\Http\Response
     */
    public function destroy(SubItem $subItem)
    {
        //
    }
}
