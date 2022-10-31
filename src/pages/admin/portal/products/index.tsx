import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { DataStore, Predicates, SortDirection, withSSRContext } from "aws-amplify";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { useAdminSessionCheck } from "../../../../components/lib/auth/admin-auth";
import { WarningAlert } from "../../../../components/modal";
import Table from "../../../../components/table";
import AdminPage from "../../../../components/template/AdminPage";
import { Product } from "../../../../models";

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

const AdminProductPage = () => {

    const router = useRouter();
    const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
    const [sucMes, setSucMes] = useState<String>('');
    const [errMes, setErrMes] = useState<String>('');

    const [products, setProducts] = useState<Product[]>([]);


    useEffect(() => {

        if (!router.isReady)
            return;

        const { pk, q } = router.query;

        if (q && q !== "") {
            DataStore.query(Product, c => c.or(p => p.id('contains', q.toString())), {
                page: 0,
                limit: 50,
                sort: p => p.createdAt(SortDirection.DESCENDING)
            }).then((ps) => {
                setProducts(ps);
            });
        } else {

            DataStore.query(Product, Predicates.ALL, {
                page: 0,
                limit: 50,
                sort: p => p.createdAt(SortDirection.DESCENDING)
            }).then((ps) => {
                setProducts(ps);
            });

        }



    }, [router.isReady, router.query]);

    const remove = async (product: Product) => {
        const id = product.id;
        setSucMes('');

        try {
            if (deletingProduct == null)
                return;

            await DataStore.delete(product)
            setProducts(products.filter(item => item !== product));
            setSucMes(`Product #${id} is deleted`);
            setDeletingProduct(null);
        } catch (error) {
            setErrMes(`Deleting Product #${id} failed`)

        }
    }


    return (
        <AdminPage pageName="Products">
            {deletingProduct !== null ?
                <WarningAlert
                    title="Deleting the Product"
                    message={`Are you sure you want to delete ? All data will be permanently removed. This action cannot be undone`}
                    onConfirm={() => remove(deletingProduct)}
                    onCancel={() => setDeletingProduct(null)} />
                : <></>
            }
            {sucMes !== "" || errMes !== "" ?

                <div className="mb-10">
                    {sucMes !== "" ?

                        <div className="bg-teal-100 border-t border-b border-teal-500 text-teal-700 px-4 py-3" role="alert">
                            <p className="font-bold">Successful Message</p>
                            <p className="text-sm">{sucMes}</p>
                        </div>
                        : <></>
                    }

                    {errMes !== "" ?
                        <div className="bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3" role="alert">
                            <p className="font-bold">Error message</p>
                            <p className="text-sm">{errMes}</p>
                        </div>
                        : <></>
                    }
                </div>
                : <></>
            }
            <div className="grid md:grid my-6">

                <div className="my-2">
                    <button className="btn w-full lg:w-32 justify-center text-white bg-sky-500 hover:bg-sky-600" onClick={() => router.push('/admin/portal/products/create')}>Create</button>
                </div>

                <form action="./products" method="GET" className="lg:col-end-7 lg:col-span-1 my-8 lg:my-0 ">
                
                        <div className="flex ">

                            <input
                                type="text"
                                name="q"
                                id="q"
                                placeholder="Search"
                                className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                            />
                            <button className="btn edit-btn ml-2" type="submit">Search</button>
                        </div>
                 
                </form>
            </div>


            <Table
                title="Products"
                description="You can Create, Update, Delete, Read the Products Data ">
                <thead>
                    <tr>
                        <th>ID#</th>
                        <th>Name</th>
                        
                        <th>display</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length == 0 ?
                        <tr>
                            <td className="text-center" colSpan={5}> No any data here</td>
                        </tr>

                        :
                        products.map((product: Product) => {
                            return (
                                <tr className="hover:bg-gray-100" key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                   
                                    <td>{product.display_status}</td>
                                    <td className="action">
                                        <button className="btn view-btn" onClick={() => router.push(`/admin/portal/products/${product.id}`)}>
                                            <EyeIcon className="mr-1" /> View
                                        </button>
                                        <button className="btn edit-btn" onClick={() => router.push(`/admin/portal/products/${product.id}?action=edit`)}>
                                            <PencilIcon className="mr-1" /> Edit
                                        </button>
                                        <button className="btn remove-btn"
                                            onClick={() => setDeletingProduct(product)}>
                                            <TrashIcon />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>


            </Table>
        </AdminPage>
    )



}

export default AdminProductPage;