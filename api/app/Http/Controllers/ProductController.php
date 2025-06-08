<?php

namespace App\Http\Controllers;

use App\Order;
use App\OrderItem;
use App\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function getCatalog(Request $request)
    {
        $categories = $request->input('categories', []);

        $query = Product::query();

        if (!empty($categories)) {
            $query->whereIn('category', $categories);
        }

        $products = $query->get()->makeHidden('description');

        return response()->json($products);
    }

    public function getProduct(Request $request)
    {
        $id = $request->input('product_id');
        $product = Product::find($id);
        return $product;
    }

    public function getCategories()
    {
        $categories = Product::select('category')
            ->distinct()
            ->pluck('category');

        return response()->json($categories);
    }

    public function addItemToCart(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $userId = $request->user_id;

        $cart = Order::where('user_id', $userId)
            ->where('status', 'cart')
            ->first();

        if (!$cart) {
            $cart = Order::create([
                'user_id' => $userId,
                'status' => 'cart',
                'total_price' => 0,
            ]);
        }

        $product = Product::findOrFail($request->product_id);
        $newQuantity = $request->quantity;
        $itemPrice = $product->price;

        $existingItem = $cart->orderItems()
            ->where('product_id', $request->product_id)
            ->first();

        if ($existingItem) {
            $updatedQuantity = $existingItem->quantity + $newQuantity;
            $updatedPrice = $itemPrice * $updatedQuantity;

            $existingItem->update([
                'quantity' => $updatedQuantity,
                'price' => $updatedPrice,
            ]);
        } else {
            OrderItem::create([
                'order_id' => $cart->id,
                'product_id' => $request->product_id,
                'quantity' => $newQuantity,
                'price' => $itemPrice * $newQuantity,
            ]);
        }

        $cart->update([
            'total_price' => $cart->orderItems()->sum('price'),
        ]);

        return response()->json(['message' => 'Товар успешно добавлен в корзину'], 200);
    }

    public function removeItemFromCart(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $cart = Order::where('user_id', $request->user_id)
            ->where('status', 'cart')
            ->first();

        if (!$cart) {
            return response()->json(['message' => 'Корзина не найдена'], 404);
        }

        $existingItem = $cart->orderItems()
            ->where('product_id', $request->product_id)
            ->first();

        if ($existingItem) {
            $newQuantity = $existingItem->quantity - $request->quantity;

            if ($newQuantity <= 0) {
                $existingItem->delete();
            } else {
                $existingItem->update(['quantity' => $existingItem->quantity - $request->quantity]);
            }
        }

        // Обновляем общую стоимость
        $cart->update([
            'total_price' => $cart->orderItems()->sum('price'),
        ]);

        return response()->json(['message' => 'Товар удален из корзины']);
    }

    public function removeFromCart(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'product_id' => 'required|exists:products,id',
        ]);

        $cart = Order::where('user_id', $request->user_id)
            ->where('status', 'cart')
            ->first();

        if (!$cart) {
            return response()->json(['message' => 'Корзина не найдена'], 404);
        }

        $existingItem = $cart->orderItems()
            ->where('product_id', $request->product_id)
            ->first();

        if ($existingItem) {
            $existingItem->delete();
        }

        $cart->update([
            'total_price' => $cart->orderItems()->sum('price'),
        ]);

        return response()->json(['message' => 'Товар удален из корзины']);
    }

    public function getCartItemQuantity(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'product_id' => 'required|exists:products,id',
        ]);

        $cart = Order::where('user_id', $request->user_id)
            ->where('status', 'cart')
            ->first();

        if (!$cart) {
            return response()->json(['quantity' => 0]);
        }

        $existingItem = $cart->orderItems()->where('product_id', $request->product_id)->first();

        if ($existingItem) {
            $quantity = $existingItem->quantity;
            return response()->json(['quantity' => $quantity], 200);
        } else {
            return response()->json(['quantity' => 0]);
        }
    }

    public function getOrderHistory(Request $request)
    {
        $userId = $request->input('user_id');

        $orders = Order::where('user_id', $userId)
            ->where('status', '=', 'completed')
            ->with([
                'orderItems.product:id,name,price,image_url'
            ])
            ->orderByDesc('created_at')
            ->get();

        $formattedOrders = $orders->map(function ($order) {
            return [
                'id' => $order->id,
                'total_price' => $order->total_price,
                'items' => $order->orderItems->map(function ($item) {
                    return [
                        'product_id' => $item->product_id,
                        'name' => $item->product->name,
                        'quantity' => $item->quantity,
                        'image_url' => $item->product->image_url,
                        'price' => $item->price,
                    ];
                }),
            ];
        });

        return response()->json($formattedOrders);
    }

    public function getOrders(Request $request)
    {
        $userId = $request->input('user_id');

        $orders = Order::where('user_id', $userId)
            ->where('status', '=', 'in progress')
            ->with([
                'orderItems.product:id,name,price,image_url'
            ])
            ->orderByDesc('created_at')
            ->get();

        $formattedOrders = $orders->map(function ($order) {
            return [
                'id' => $order->id,
                'total_price' => $order->total_price,
                'items' => $order->orderItems->map(function ($item) {
                    return [
                        'product_id' => $item->product_id,
                        'name' => $item->product->name,
                        'image_url' => $item->product->image_url,
                        'quantity' => $item->quantity,
                        'price' => $item->price,
                    ];
                }),
            ];
        });

        return response()->json($formattedOrders);
    }


    public function getCart(Request $request)
    {
        $userId = $request->input('user_id');

        $cart = Order::where('user_id', $userId)
            ->where('status', 'cart')
            ->with([
                'orderItems.product:id,name,price,image_url'
            ])
            ->first();

        if (!$cart) {
            return response()->json(['cart' => null]);
        }


        $formattedCart = [
            'id' => $cart->id,
            'total_price' => $cart->total_price,
            'items' => $cart->orderItems->map(function ($item) {
                return [
                    'product_id' => $item->product_id,
                    'name' => $item->product->name,
                    'item_price' => $item->product->price,
                    'total_price' => $item->price,
                    'image_url' => $item->product->image_url
                ];
            }),
        ];

        return response()->json($formattedCart);
    }

    public function confirmOrder(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'payment_method' => 'required|string',
            'delivery_method' => 'required|string',
        ]);

        $cart = Order::where('user_id', $request->user_id)
            ->where('status', 'cart')
            ->with('orderItems.product') // можно загрузить товары, если нужно
            ->first();


        $cart->update([
            'payment_method' => $request->payment_method,
            'delivery_method' => $request->delivery_method,
            'status' => 'in progress', 
        ]);

        return response()->json([
            'message' => 'Заказ подтверждён',
        ], 200);
    }

}
