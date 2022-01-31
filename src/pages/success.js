import React from 'react';
import Header from '../components/Header';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';

function success() {
  const router = useRouter();
  return (
    <div className="bg-gray-100 h-screen">
      <Header />
      <main className="max-w-screen-lg mx-auto">
        <div className="flex flex-col p-10 bg-white">
          <div className="flex items-center space-x-2 mb-5">
            <CheckCircleIcon className="text-green-500 h-10" />
            <h1 className="font-bold text-4xl ">
              Thank You, your order has been confirmed!
            </h1>
          </div>
          <p className="font-medium">
            Than you for shopping with us.We'll send a confirmation once your
            item(s) have been shipped, if u want to track your order(s) please
            press the link below
          </p>
          <button
            onClick={() => router.push('/orders')}
            className="button font-medium mt-8"
          >
            Go To My Orders
          </button>
        </div>
      </main>
    </div>
  );
}

export default success;
