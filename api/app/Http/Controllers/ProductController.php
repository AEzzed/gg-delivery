<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function getCatalog() {
        $products = Product::all()->makeHidden('description');

        return $products;

    }

    public function getCategories() {
        $categories = Product::select('category')
            ->distinct()
            ->pluck('category');

        return $categories;
    }
}
