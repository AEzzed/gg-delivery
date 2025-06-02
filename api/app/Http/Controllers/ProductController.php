<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function getCatalog(Request $request) {
    $categories = $request->input('categories', []);

    $query = Product::query();

    if (!empty($categories)) {
        $query->whereIn('category', $categories);
    }

    $products = $query->get()->makeHidden('description');

    return $products;
    }

    public function getCategories() {
        $categories = Product::select('category')
            ->distinct()
            ->pluck('category');

        return $categories;
    }
}
