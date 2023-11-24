<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodoController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// create, edit 과 같은 HTML 템플릿 요청 포함.
// Route::resource('todos', TodoController::class);

// create, edit 과 같은 HTML 템플릿 요청 포함 X.
// create 또는 edit 메소드가 포함되지 않은 API 리소스 컨트롤러를 빠르게 생성하려면 make:controller 명령을 실행할 때 --api 옵션(switch)을 사용하세요.
// php artisan make:controller TodoController --api
Route::apiResource('todos', TodoController::class);