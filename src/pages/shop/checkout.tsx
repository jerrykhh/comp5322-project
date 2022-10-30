/* eslint-disable @next/next/no-img-element */

import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/user/user";
import { useCart, Item } from "react-use-cart";
import ImageView from "../../components/lib/element/imageView";
import { EagerOrderItem, Order, OrderItem, OrderStatus } from "../../models";
import { DataStore } from "aws-amplify";
import { v4 } from "uuid";

const CheckOutPage = () => {


    const { user, setUser } = useContext(UserContext);
    const { items, emptyCart } = useCart();
    const [address, setAddress] = useState<string>('');
    const [errMes, setErrMes] = useState<string>('');

    const router = useRouter();


    useEffect(() => {
        if(user === null){
            router.push('/login')
        }
    }, [router.isReady]);

    const totalPrice = (items: Item[]): number => {
        return items.reduce((pre, cur) => {
            return pre + (cur.quantity! * cur.price)
        }, 0.0)
    };

    const create = async () => {
        setErrMes('')
        if (address === '') {
            setErrMes('Missing Shipping Address')
            return;
        }

        if(user === null){
            setErrMes('Session Empty redirect to login page')
            router.push('/login')
            return;
        }
       
        try {



            
            const order = await DataStore.save(new Order({
                OrderItems: [],
                userID: user!.getIdToken().payload.sub,
                address: address,
                status: OrderStatus.CREATED
            }));
            
            const orderItems: EagerOrderItem[] = [];
            for (const item of items) {
               
                const oi = await DataStore.save(new OrderItem({
                    productID: item.id,
                    qty: item.quantity!,
                    orderID: order.id,
                    price: item.price
                }));
                orderItems.push(oi);

            }
    
            
            const res = await DataStore.save(Order.copyOf(order, item => {
                item.OrderItems = orderItems
            }));

            emptyCart();
            router.push(`/user/orders?id=${order.id}`)
        } catch (err) {
            console.log(err)
            setErrMes(`${err}`)
        }


    }


    return (
        <div className="bg-gray-50">
            <div className="container mx-auto">

                <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
                    <div className="mb-6">
                        <button onClick={() => router.back()}> &lt; Back</button>
                    </div>
                    {errMes !== "" ?
                        <div className="my-12 bg-red-100 border  border-red-500 text-red-700 px-4 py-3" role="alert">
                            <div className="font-bold">Error message</div>
                            <div className="text-sm">{errMes}</div>
                        </div>
                        : <></>
                    }

                    <div className="flex justify-start item-start space-y-2 flex-col ">
                        <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800">Confirming Order</h1>
                        <div className="text-base font-medium leading-6 text-gray-600">{new Date().toDateString()}</div>
                    </div>
                    <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                            <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                                <div className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">Customer’s Cart</div>
                                {items.map((item, i) => {
                                    return (
                                        <div key={i} className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
                                            <div className="pb-4 md:pb-8 w-full md:w-40">
                                                <ImageView className="w-full md:block" src={item.image} alt="dress" />
                                            </div>
                                            <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                                                <div className="w-full flex flex-col justify-start items-start space-y-8">
                                                    <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">{item.name}</h3>
                                                    <div className="flex justify-start items-start flex-col space-y-2">

                                                    </div>
                                                </div>
                                                <div className="flex justify-between space-x-8 items-start w-full">
                                                    <p className="text-base xl:text-lg leading-6 text-gray-800">{item.quantity} Qty</p>
                                                    <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">${item.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })

                                }

                            </div>
                            <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                                <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                                    <h3 className="text-xl font-semibold leading-5 text-gray-800">Summary</h3>

                                    <div className="flex justify-between items-center w-full border-t py-4">
                                        <p className="text-base font-semibold leading-4 text-gray-800">Total</p>
                                        <p className="text-base font-semibold leading-4 text-gray-600">${totalPrice(items)}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col ">
                            <h3 className="text-xl font-semibold leading-5 text-gray-800">Customer</h3>
                            <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
                                <div className="flex flex-col justify-start items-start flex-shrink-0">
                                    <div className="flex justify-center  w-full  md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                                        <img src="/images/default/user.jpg" alt="avatar" className="w-32 h-32" />
                                        <div className=" flex justify-start items-start flex-col space-y-2">
                                            <div className="text-base font-semibold leading-4 text-left text-gray-800">{user?.getIdToken().payload.name}</div>

                                        </div>
                                    </div>

                                    <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-4 border-b border-gray-20">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M3 7L12 13L21 7" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <div className="cursor-pointer text-sm leading-5 text-gray-800">{user?.getIdToken().payload.email}</div>
                                    </div>
                                </div>
                                <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                                    <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row  items-center md:items-start ">
                                        <div className="flex justify-center  w-full  md:justify-start  items-center md:items-start flex-col space-y-4 xl:mt-8">
                                            <div className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">Shipping Address</div>
                                            <div className="w-full  text-center md:text-left text-sm leading-5 text-gray-600">
                                                <textarea
                                                    rows={4}
                                                    className="mt-1 block w-full border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                                                    placeholder="Your Shipping Address"
                                                    defaultValue={''}
                                                    value={address}
                                                    onChange={(e) => setAddress(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="flex w-full justify-center items-center md:justify-start md:items-start mt-8">
                                        <button className="mt-6 md:mt-0 py-5 hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 bg-white font-medium w-96 2xl:w-full text-base leading-4 text-gray-800" onClick={() => create()}>Confirm Order</button>
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

export default CheckOutPage;