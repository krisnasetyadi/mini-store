import { Inter } from 'next/font/google'
import Stripe from 'stripe'
import ProductCard from './product-card'

const inter = Inter({ subsets: ['latin'] })
async function getStripeProducts(){
  const stripe = new Stripe(process.env.STRIPE_SECRET ?? '', {
    apiVersion: '2020-08-27'
  })
  const res = await stripe.prices.list({
    expand: ['data.product']
  })
  const prices = res.data
  return prices
  
}


export default async function Home() {
  const products = await getStripeProducts()
  return (
    <main className='p-4 flex flex-col'>
      <div className='max-w-[1000px] w-full mx-auto grid gric-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
      {products.map((product, idx) => {
        return (
          <ProductCard key={idx} product={product} />
        )
      })}
      </div>
      
    </main>
  )
}
