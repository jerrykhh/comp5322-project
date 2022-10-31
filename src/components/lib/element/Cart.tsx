import Link from 'next/link';
import { useRouter } from 'next/router';
import { MouseEventHandler, useContext } from 'react';
import { useCart, Item } from 'react-use-cart';
import { UserContext } from '../../../contexts/user/user';
import ImageView from './imageView';


const CartPage = ({ onCloseClick }: { onCloseClick: MouseEventHandler<HTMLButtonElement> }) => {

    const {
        isEmpty,
        items,
        updateItemQuantity,
        removeItem,
    } = useCart();

    const router = useRouter();
    const {user, setUser} = useContext(UserContext);


    const remove = (item: Item) => {
        if (item.quantity == 1) {
            removeItem(item.id);
            return;
        }

        if (item.quantity! > 1) {
            updateItemQuantity(item.id, item.quantity! - 1)
        }
    }

    const totalPrice = (items: Item[]): number => {
        return items.reduce((pre, cur) => {
            return pre + (cur.quantity! * cur.price)
        }, 0.0)
    }

    const checkout = () => {
        if(user === null){
            router.push("/login")
        }else{
            router.push("/shop/checkout")
        }

    }


    return (
        <div className="relative z-50" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <div className="pointer-events-auto w-screen max-w-md">
                            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                                    <div className="flex items-start justify-between">
                                        <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
                                        <div className="ml-3 flex h-7 items-center">
                                            <button type="button" className="-m-2 p-2 text-gray-400 hover:text-gray-500" onClick={onCloseClick}>
                                                <span className="sr-only">Close panel</span>
                                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-8">
                                        <div className="flow-root">
                                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                {items.length == 0 ?
                                                    <li className='text-center mt-8 text-gray-500'>Your Shopping cart is empty</li>
                                                    : <></>
                                                }
                                                {items.map((item, i) => {
                                                    return (
                                                        <li className="flex py-6" key={i}>
                                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                <ImageView src={item.image} className="h-full w-full object-cover object-center" />
                                                            </div>

                                                            <div className="ml-4 flex flex-1 flex-col">
                                                                <div>
                                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                                        <h3>{item.name}</h3>
                                                                        <p className="ml-4">${item.quantity! * item.price}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                                    <p className="text-gray-500">Qty {item.quantity}</p>

                                                                    <div className="flex">
                                                                        <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={() => remove(item)}>Remove</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    )
                                                })
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p>Subtotal: ${totalPrice(items)}</p>
                                    </div>
                                    <div className="mt-6">
                                        <button disabled={(items.length == 0)?true: false} className="flex items-center w-full justify-center cursor-pointer rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 disabled:bg-indigo-400" onClick={() => checkout()}>Checkout</button>
                                    </div>
                                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                        <div className='my-2'>
                                            <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={onCloseClick}>
                                                Continue Shopping
                                                <span aria-hidden="true"> &rarr;</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default CartPage;