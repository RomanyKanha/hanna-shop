import React, { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import { demoProducts } from './demoProducts'

export default function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [checkout, setCheckout] = useState(false)
  const [ordered, setOrdered] = useState(false)

  useEffect(() => {
    async function load() {
      // If Supabase isn't configured, fall back to demo products so the page never breaks.
      if (!supabase) {
        setProducts(demoProducts)
        setLoading(false)
        return
      }
      const { data, error } = await supabase.from('products').select('*').order('id')
      if (error || !data || data.length === 0) {
        setProducts(demoProducts)
      } else {
        setProducts(data)
      }
      setLoading(false)
    }
    load()
  }, [])

  function addToCart(product) {
    setCart((prev) => {
      const found = prev.find((i) => i.id === product.id)
      if (found) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        )
      }
      return [...prev, { ...product, qty: 1 }]
    })
    setCartOpen(true)
  }

  function changeQty(id, delta) {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    )
  }

  function removeItem(id) {
    setCart((prev) => prev.filter((i) => i.id !== id))
  }

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0)
  const count = cart.reduce((sum, i) => sum + i.qty, 0)

  function placeOrder() {
    setOrdered(true)
    setCart([])
  }

  function closeCheckout() {
    setCheckout(false)
    setOrdered(false)
    setCartOpen(false)
  }

  // Split products for the "Best Sellers" strip (first 4) vs full grid.
  const bestSellers = products.slice(0, 4)

  return (
    <div className="page">
      {/* NAV */}
      <header className="nav">
        <div className="nav-inner">
          <div className="brand">Hanna</div>
          <nav className="nav-links">
            <a href="#shop">Shop</a>
            <a href="#bestsellers">Best Sellers</a>
            <a href="#why">Why Hanna</a>
            <a href="#about">About</a>
          </nav>
          <button className="cart-btn" onClick={() => setCartOpen(true)}>
            Cart{count > 0 ? ` (${count})` : ''}
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">New Autumn Collection</p>
          <h1 className="hero-title">Light every moment with Hanna</h1>
          <p className="hero-sub">
            Handcrafted candles poured from natural soy wax and layered
            fragrance oils, made to turn any room into a warm, quiet sanctuary.
          </p>
          <a href="#shop" className="btn-primary">Shop the collection</a>
        </div>
      </section>

      {/* WHY / VALUES STRIP */}
      <section className="values" id="why">
        <div className="value">
          <span className="value-mark">01</span>
          <h3>Natural soy wax</h3>
          <p>Clean, even burning. Kinder to your home and the air in it.</p>
        </div>
        <div className="value">
          <span className="value-mark">02</span>
          <h3>Hand poured</h3>
          <p>Made in small batches, each one finished and checked by hand.</p>
        </div>
        <div className="value">
          <span className="value-mark">03</span>
          <h3>Layered scent</h3>
          <p>Fragrance oils blended to unfold slowly as the candle burns.</p>
        </div>
        <div className="value">
          <span className="value-mark">04</span>
          <h3>Gift ready</h3>
          <p>Every candle arrives wrapped and ready to give — or to keep.</p>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="section" id="bestsellers">
        <div className="section-head">
          <p className="eyebrow">Loved most</p>
          <h2>Best sellers</h2>
        </div>
        <div className="grid">
          {bestSellers.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={addToCart} featured />
          ))}
        </div>
      </section>

      {/* FULL SHOP */}
      <section className="section shop" id="shop">
        <div className="section-head">
          <p className="eyebrow">The full range</p>
          <h2>Shop all candles</h2>
        </div>
        {loading ? (
          <p className="loading">Lighting the candles…</p>
        ) : (
          <div className="grid">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={addToCart} />
            ))}
          </div>
        )}
      </section>

      {/* ABOUT */}
      <section className="about" id="about">
        <div className="about-inner">
          <p className="eyebrow">Our story</p>
          <h2>Every candle tells a story</h2>
          <p>
            At Hanna we believe scent is memory you can hold. Each candle is
            poured by hand from premium soy wax and carefully chosen fragrance
            oils, made to bring warmth, comfort, and a little quiet luxury to
            every space. Whether you are unwinding after a long day or setting
            the mood for people you love, Hanna is made to be lit.
          </p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="section-head">
          <p className="eyebrow">Kind words</p>
          <h2>What people say</h2>
        </div>
        <div className="reviews">
          <blockquote>
            <p>“The scent lingers for hours without ever feeling heavy. These are the only candles I buy now.”</p>
            <cite>— Sophany R.</cite>
          </blockquote>
          <blockquote>
            <p>“Beautiful to look at, beautiful to burn. The lavender one puts me straight to sleep.”</p>
            <cite>— Daniel M.</cite>
          </blockquote>
          <blockquote>
            <p>“Gifted a set to my mother and she asked for three more. Packaging is gorgeous.”</p>
            <cite>— Lina P.</cite>
          </blockquote>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter">
        <div className="newsletter-inner">
          <h2>Stay in the glow</h2>
          <p>Early access to new scents, seasonal releases, and candle care notes.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Your email address" aria-label="Email address" />
            <button type="button">Subscribe</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-col">
            <div className="brand">Hanna</div>
            <p>Luxury handcrafted scented candles, made for beautiful homes.</p>
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            <a href="#shop">Shop</a>
            <a href="#bestsellers">Best Sellers</a>
            <a href="#about">About</a>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <p>Phnom Penh, Cambodia</p>
            <p>support@hannacandle.com</p>
            <p>Mon–Sat · 9:00–18:00</p>
          </div>
        </div>
        <div className="footer-bottom">
          © 2026 Hanna Candle Store · A student project. No real payments are processed.
        </div>
      </footer>

      {/* CART DRAWER */}
      {cartOpen && (
        <div className="drawer-overlay" onClick={() => setCartOpen(false)}>
          <aside className="drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-head">
              <h3>Your cart</h3>
              <button className="x" onClick={() => setCartOpen(false)}>×</button>
            </div>
            {cart.length === 0 ? (
              <p className="empty">Your cart is empty. Time to find a scent you love.</p>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((i) => (
                    <div className="cart-item" key={i.id}>
                      <img src={i.image_url} alt={i.name} />
                      <div className="cart-item-info">
                        <span className="cart-item-name">{i.name}</span>
                        <span className="cart-item-price">${i.price}</span>
                        <div className="qty">
                          <button onClick={() => changeQty(i.id, -1)}>−</button>
                          <span>{i.qty}</span>
                          <button onClick={() => changeQty(i.id, 1)}>+</button>
                        </div>
                      </div>
                      <button className="remove" onClick={() => removeItem(i.id)}>Remove</button>
                    </div>
                  ))}
                </div>
                <div className="drawer-foot">
                  <div className="total-row">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <button className="btn-primary full" onClick={() => { setCartOpen(false); setCheckout(true) }}>
                    Checkout
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}

      {/* CHECKOUT MODAL */}
      {checkout && (
        <div className="modal-overlay" onClick={closeCheckout}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            {ordered ? (
              <div className="order-done">
                <h3>Thank you for your order</h3>
                <p>This is a demo store — no real payment was taken and nothing will be shipped.</p>
                <button className="btn-primary" onClick={closeCheckout}>Continue browsing</button>
              </div>
            ) : (
              <>
                <h3>Checkout</h3>
                <p className="demo-note">Demo only — please do not enter real card details. No payment is processed.</p>
                <div className="checkout-fields">
                  <input placeholder="Full name" />
                  <input placeholder="Email" />
                  <input placeholder="Shipping address" />
                  <div className="row-2">
                    <input placeholder="Card number (demo)" />
                    <input placeholder="CVC" />
                  </div>
                </div>
                <div className="total-row big">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button className="btn-primary full" onClick={placeOrder}>Place order</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function ProductCard({ product, onAdd, featured }) {
  return (
    <article className={featured ? 'card card-featured' : 'card'}>
      <div className="card-img-wrap">
        {featured && <span className="badge">Best seller</span>}
        <img src={product.image_url} alt={product.name} loading="lazy" />
      </div>
      <div className="card-body">
        <h3 className="card-name">{product.name}</h3>
        <p className="card-cat">{product.category}</p>
        <p className="card-desc">{product.description}</p>
        <div className="card-foot">
          <span className="price">${product.price}</span>
          <button className="add" onClick={() => onAdd(product)}>Add to cart</button>
        </div>
      </div>
    </article>
  )
}
