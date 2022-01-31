//@ts-nocheck
import React from 'react';
import Header from '../components/Header';
import Order from '../components/Order';
import { useSession, getSession } from 'next-auth/react';
import db from '../../firebase';
import moment from 'moment';

function orders({ orders }) {
  const { data: session } = useSession();
  if (!orders) {
    return <p>No orders</p>;
  }
  return (
    <div>
      <Header />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl font-bold border-b mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>
        {session ? (
          <h2 className="text-2xl font-bold">{orders.length} Orders</h2>
        ) : (
          <h2 className="text-2xl font-bold">
            Please Sign in to see your orders
          </h2>
        )}
        <div className="mt-5 space-y-4">
          {orders?.map((order) => (
            <Order
              id={order.id}
              amountShipping={order.amountShipping}
              amount={order.amount}
              items={order.items}
              timestamp={order.timestamp}
              images={order.images}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default orders;

export async function getServerSideProps(context) {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

  const session = await getSession(context);
  if (!session) {
    return {
      props: {},
    };
  }

  const stripeOrders = await db
    .collection('users')
    .doc(session.user.email)
    .collection('orders')
    .orderBy('timestamp', 'desc')
    .get();

  let orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );
  return {
    props: { orders },
  };
}
