<?php

use App\Http\Controllers\Public\ArticleController;
use App\Http\Controllers\Public\BookController;
use App\Http\Controllers\Public\ContactController;
use App\Http\Controllers\Public\HomeController;
use App\Http\Controllers\Public\JournalController;
use App\Http\Controllers\Public\ProfileController;
use App\Http\Controllers\Public\RobotsController;
use App\Http\Controllers\Public\ServiceController;
use App\Http\Controllers\Public\SitemapController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');
Route::get('/profil', ProfileController::class)->name('profile');
Route::get('/layanan', [ServiceController::class, 'index'])->name('services.index');
Route::get('/kontak', ContactController::class)->name('contact');

Route::get('/buku', [BookController::class, 'index'])->name('books.index');
Route::get('/buku/{slug}', [BookController::class, 'show'])->name('books.show');
Route::get('/jurnal', [JournalController::class, 'index'])->name('journals.index');
Route::get('/jurnal/{slug}', [JournalController::class, 'show'])->name('journals.show');
Route::get('/artikel', [ArticleController::class, 'index'])->name('articles.index');
Route::get('/artikel/{slug}', [ArticleController::class, 'show'])->name('articles.show');

Route::get('/sitemap.xml', SitemapController::class)->name('sitemap');
Route::get('/robots.txt', RobotsController::class)->name('robots');
