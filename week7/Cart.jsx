export default function Cart() {
  return (
    <div className="p-4">
      <h1 className="text-xl">Your Cart</h1>
      <p>Cart items shown here...</p>
      <a href="/checkout" className="text-blue-600 underline">Go to Checkout</a>
    </div>
  );
}
