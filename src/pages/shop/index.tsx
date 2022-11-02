/* eslint-disable @next/next/no-img-element */
import { DataStore } from "aws-amplify";
import { useEffect, useState } from "react";
import ImageView from "../../components/lib/element/imageView";
import Page from "../../components/template/Page";
import { DisplayStatus, Product, ProductType } from "../../models";
import { useCart } from 'react-use-cart';
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

const ShopPage = () => {

    const callouts = [
        {
            name: 'All',
            type: null,
            imageSrc: '/images/static/shop/all.jpg',
            imageAlt: 'All',

        },
        // {
        //     name: 'Pet Fashion',
        //     type: ProductType.FASHION,
        //     imageSrc: '/images/static/shop/fashion.jpg',
        //     imageAlt: 'Pet Fashion',

        // },
        {
            name: 'Pet Food',
            type: ProductType.FOOD,
            imageSrc: '/images/static/shop/food.jpg',
            imageAlt: 'Pet Food',

        },
        {
            name: 'Pet Grooming',
            type: ProductType.GROOMING,
            imageSrc: '/images/static/shop/grooming.png',
            imageAlt: 'Pet Grooming',
        },
        {
            name: 'Pet Toys',
            type: ProductType.TOYS,
            imageSrc: '/images/static/shop/toys.jpg',
            imageAlt: 'Pet Toys',
        }
    ];


    const [productType, setProductType] = useState<String | null>(null);
    const [reviewProduct, setReviewProduct] = useState<Product | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [categoryOpen, setCategoryOpen] = useState<boolean>(true);

    const { addItem } = useCart();

    const changeType = (type: ProductType | null) => {
        setProductType(type);
    }

    useEffect(() => {

        if (productType === null) {
            DataStore.query(Product, c => c.display_status('ge', DisplayStatus.SHOW)).then((productData) => {
                console.log('all', productData)
                setProducts(productData);
            })
        } else {

            DataStore.query(Product, c => c.type('eq', productType as ProductType).display_status('ge', DisplayStatus.SHOW)).then((productData) => {
                console.log('filer', productType);
                console.log(productData)
                setProducts(productData);
            });
        }

    }, [productType])



    return (
        <Page
            category={

                <div className="mx-auto">

                    <h2 className="text-2xl font-bold text-gray-900">Collections</h2>
                    <div className="mt-6 space-y-12 ">
                        {callouts.map((callout) => (
                            <div key={callout.name} className="group relative cursor-pointer text-gray-500 hover:text-gray-700" onClick={() => changeType(callout.type)}>
                                <div className="relative h-[10rem] w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 shadow-lg">
                                    <img
                                        src={callout.imageSrc}
                                        alt={callout.imageAlt}
                                        className="max-w-xl h-auto rounded-lg w-full object-cover object-center"
                                    />
                                </div>
                                <p className="text-base font-semibold  mt-2">{callout.name}</p>
                            </div>
                        ))}
                    </div>

                </div>

            }
            title="Shop">

            {reviewProduct !== null ?
                <div className="relative z-50" role="dialog" aria-modal="true">

                    <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block"></div>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-stretch justify-center text-center lg:items-center lg:px-2 xl:px-4">

                            <div className="flex w-full transform text-left text-base transition lg:my-8 lg:max-w-2xl lg:px-4 xl:max-w-4xl">
                                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 lg:p-6 xl:p-8">
                                    <button type="button" className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 lg:top-6 lg:right-6 xl:top-8 xl:right-8">
                                        <span className="sr-only">Close</span>

                                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" onClick={() => setReviewProduct(null)}>
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>

                                    <div className="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
                                        <div className="aspect-w-2 aspect-h-3 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                                            <ImageView src={reviewProduct.image!} className="object-cover object-center" />
                                        </div>
                                        <div className="sm:col-span-8 lg:col-span-7">
                                            <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{reviewProduct.name}</h2>

                                            <section aria-labelledby="information-heading" className="mt-2">
                                                <h3 id="information-heading" className="sr-only">Product information</h3>
                                                <p className="text-2xl text-gray-900">${reviewProduct.price}</p>
                                            </section>

                                            <section aria-labelledby="options-heading" className="mt-10">
                                                <h3 id="options-heading" className="sr-only">Product options</h3>
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-600">Description</h4>

                                                    <fieldset className="mt-4">
                                                        <span className="flex items-center space-x-3">
                                                            <p className="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center focus:outline-none ring-gray-400">
                                                                {reviewProduct.description}
                                                            </p>
                                                        </span>
                                                    </fieldset>
                                                </div>

                                                <button type="submit" className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-800 py-3 px-8 text-base font-medium text-white hover:bg-black focus:outline-none focus:ring-2 focus:bg-black focus:ring-offset-2 lg:mt-24"
                                                    onClick={() => {
                                                        addItem(reviewProduct)
                                                        setReviewProduct(null)
                                                    }}>Add to bag</button>

                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : <></>

            }
            <div className="container mx-auto">
                <div className="p-8">
                    <div className="bg-white">
                        <div className="text-lg font-bold flex justify-between cursor-pointer lg:hidden" onClick={() => setCategoryOpen(!categoryOpen)}>
                            <span>Category</span>{categoryOpen ?
                                <ChevronUpIcon className="w-8 h-8" /> : <ChevronDownIcon className="w-8 h-8" />
                            }
                        </div>
                        <div className="lg:hidden">
                            {categoryOpen && callouts.map((callout, i) => {
                                return (
                                    <div key={i} onClick={() => changeType(callout.type)} className="mx-3 my-3 p-1 border-b cursor-pointer text-gray-500 hover:text-black">{callout.name}</div>
                                )

                            })
                            }
                        </div>
                        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">


                            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                                {products.map((product) => (
                                    <div key={product.id} className="group cursor-pointer" onClick={() => setReviewProduct(product)}>
                                        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                                            <ImageView
                                                src={product.image!}
                                                alt={`${product.name} image`}
                                                className="h-full w-full object-cover object-center group-hover:opacity-75"
                                            />
                                        </div>
                                        <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                                        <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
}

export default ShopPage;