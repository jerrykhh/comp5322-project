/* eslint-disable @next/next/no-img-element */
import { DataStore, Storage, withSSRContext } from "aws-amplify";
import { useRouter } from "next/router"
import React from "react";
import { useRef, useState } from "react";
import AdminPage from "../../../../components/template/AdminPage";
import { DisplayStatus, Product, ProductType } from "../../../../models";
import { v4 } from 'uuid';
import { GetServerSideProps } from "next";
import { useAdminSessionCheck } from "../../../../components/lib/auth/admin-auth";

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    try {
        const {Auth} = withSSRContext({req});
        const user = await Auth.currentSession();
        console.log(user)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        if (!useAdminSessionCheck(user, true)) {
            return {
                redirect: {
                    permanent: false,
                    destination: "/admin/portal/login"
                },
                props: {}
            }
        }
    }catch(err){
        console.log(err)
    }

    return {
        props: {}
    }
}


const ProductCreatePage = () => {

    const router = useRouter();
    const [product, setProduct] = useState<Product>({
        id: '',
        name: '',
        price: 0.0,
        image: '',
        remark: '',
        description: '',
        type: ProductType.FOOD,
        display_status: DisplayStatus.SHOW,
    });
    const inputImageRef = useRef<HTMLInputElement>(null);
    const reviewImageRef = useRef<HTMLImageElement>(null);
    const [photo, setPhoto] = useState<File | null>(null);


    const create = async () => {

        try {

            await Storage.put(`${product.image}`, photo);
            const res = await DataStore.save(
                new Product(product)
            );

            router.push(`/admin/portal/products?pk=${res.id}`)
        } catch (error) {
            console.log(error);
        }
    }


    const uploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e)
        if (e.target.files && e.target.files.length == 1) {
            const file: File = e.target.files[0];
            const id = v4();
            const fileName = `products/${id}.${file.name.split('.').pop()}`;
            console.log(fileName);
            setProduct(preState => ({
                ...preState,
                image: fileName
            }))
            setPhoto(e.target.files[0]);
            reviewImageRef.current!.src = URL.createObjectURL(e.target.files[0]);
        }
    }

    return (
        <AdminPage
            pageName="Pet Create">
            <React.Fragment>
                <div className="mb-6">
                    <button onClick={() => router.back()}> &lt; Back</button>
                </div>
                <div className="mx-auto">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                            <div className="px-4 sm:px-0">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">Product Information</h3>
                                <p className="mt-1 text-sm text-gray-600">Write Down the Product Information</p>

                                <div className={`mt-6 ${(photo == null) ? 'hidden' : 'block'}`}>
                                    <img ref={reviewImageRef} alt="review image" className="rounded" />
                                </div>

                            </div>
                        </div>
                        <div className="mt-5 md:col-span-2 md:mt-0">
                            <form action="#" method="POST">
                                <div className="overflow-hidden shadow sm:rounded-md">
                                    <div className="bg-white px-4 py-5 sm:p-6">
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                    Product Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                                                    value={product.name}
                                                    required
                                                    onChange={(e) => setProduct(preState => ({ ...preState, name: e.target.value }))}
                                                />
                                            </div>
                                            <div className="col-span-6 sm:col-span-2">
                                                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                                    Type
                                                </label>
                                                <select
                                                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm  sm:text-sm"
                                                    value={product.type}
                                                    onChange={e => {

                                                        const productTypeIndex = Object.keys(ProductType).indexOf(e.target.value.toUpperCase());

                                                        setProduct(preState => ({ ...preState, type: Object.values(ProductType)[productTypeIndex] }))

                                                    }}
                                                >

                                                    <option value={'FOOD'} defaultChecked>Food</option>
                                                    <option value={'TREATS'}>Treats</option>
                                                    <option value={'TOYS'}>Toys</option>
                                                    <option value={'GROOMING'}>Grooming</option>
                                                    <option value={'FASHION'}>Fashion</option>
                                                </select>
                                            </div>
                                            <div className="col-span-6 sm:col-span-2">
                                                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                                    Display Product
                                                </label>
                                                <select

                                                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm  sm:text-sm"
                                                    value={product.display_status}
                                                    onChange={(e) => {
                                                        const displayStatusIndex = Object.keys(DisplayStatus).indexOf(e.target.value.toUpperCase());
                                                        setProduct(preState => ({ ...preState, display_status: Object.values(DisplayStatus)[displayStatusIndex] }))

                                                    }}
                                                >
                                                    <option value={'SHOW'} defaultChecked>Show</option>
                                                    <option value={'HIDDEN'}>Hidden</option>
                                                </select>
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                    Price
                                                </label>
                                                <input
                                                    type="number"
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                                                    value={product.price}
                                                    required
                                                    onChange={(e) => setProduct(preState => ({ ...preState, price: parseFloat(parseFloat(e.target.value).toFixed(1)) }))}
                                                />
                                            </div>


                                            <div className="col-span-6">
                                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                                                <textarea id="message" rows={6} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border focus:border-black "
                                                    placeholder="Description..."
                                                    value={product.description}
                                                    onChange={e => setProduct(preState => ({
                                                        ...preState,
                                                        description: e.target.value
                                                    }))}></textarea>
                                            </div>

                                            <div className="col-span-6">
                                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 ">Remark</label>
                                                <textarea id="message" rows={2} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border focus:border-black "
                                                    placeholder="Remark..."
                                                    value={(product.remark) ? product.remark : ''}
                                                    onChange={e => setProduct(preState => ({
                                                        ...preState,
                                                        remark: e.target.value
                                                    }))}
                                                ></textarea>
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            <label className="block text-sm font-medium text-gray-700"> Photo</label>
                                            <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6  cursor-pointer" onClick={() => {
                                                inputImageRef.current?.click();
                                            }}>
                                                <div className="space-y-1 text-center">
                                                    <svg
                                                        className="mx-auto h-12 w-12 text-gray-400"
                                                        stroke="currentColor"
                                                        fill="none"
                                                        viewBox="0 0 48 48"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                            strokeWidth={2}
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                    <div className="text-sm text-gray-600" >
                                                        <label
                                                            htmlFor="file-upload"
                                                            className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                                        >
                                                            <span>Upload a file</span>
                                                            <input ref={inputImageRef} id="file-upload" name="file-upload" type="file" accept="image/*" className="sr-only" onChange={(e) => uploadPhoto(e)} />
                                                        </label>
                                                    </div>
                                                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm  focus:outline-none focus:ring-2  focus:ring-offset-2"
                                            onClick={() => create()}
                                        >
                                            Create
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </React.Fragment>

        </AdminPage>
    )

}

export default ProductCreatePage;
