import { PaperClipIcon } from "@heroicons/react/24/outline";
import { DataStore } from "aws-amplify";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Table from "../../../components/table";
import Page from "../../../components/template/Page";
import { Adoption, Pet } from "../../../models";

const AdoptionPage = () => {

    const router = useRouter();

    const [adoptions, setAdoptions] = useState<Adoption[]>([]);
    const [sucMes, setSucMes] = useState<String>('');

    useEffect(() => {
        DataStore.query(Adoption).then((adoptionsData) => {
            setAdoptions(adoptionsData)
        });
    }, []);

    useEffect(() => {

        if (!router.isReady)
            return;

        const { id } = router.query;
        if (id) {
            setSucMes(`Adoption Reuqest #${id} is created`)
        }

    }, [router.isReady, router.query])

    return (
        <Page
            category={null}
            title="Adoption Request">

            <div className="container mx-auto">

                <div className="p-10">
                    <div className="mb-10">
                        {sucMes !== "" ?

                            <div className="bg-teal-100 border-t border-b border-teal-500 text-teal-700 px-4 py-3" role="alert">
                                <div className="font-bold">Successful Message</div>
                                <div className="text-sm">{sucMes}</div>
                            </div>
                            : <></>
                        }
                    </div>

                    <div className="mb-6">
                        <button className="back-btn" onClick={() => router.push('/adoptions/')}> &lt; Back</button>
                    </div>


                    <Table
                        title="Adoption Request">
                        <tr>
                            <th>ID#</th>
                            <th>Phone No</th>
                            <th>Status</th>
                            <th>updatedAt</th>
                        </tr>
                        {adoptions.length === 0 ?
                            <tr>
                                <td colSpan={4} className="text-center">No Data here</td>
                            </tr>
                            : adoptions.map((adoption, i) => {

                                return (
                                    <React.Fragment key={i}>
                                        <tr>
                                            <td className="font-bold">{adoption.id}</td>
                                            <td>{adoption.contact}</td>
                                            <td>{adoption.status}</td>
                                            <td>{adoption.updatedAt}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={4}  className="md:px-16 py-8">
                                                <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                                                    <div className="px-4 py-5 sm:px-6">
                                                        <h3 className="text-lg font-medium leading-6 text-gray-900">Pet Information ({adoption.Pet!.id})</h3>
                                                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Pet details</p>
                                                    </div>
                                                    <div className="border-t border-gray-200">
                                                        <dl>
                                                            <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                                                                <dt className="text-sm font-medium text-gray-500">Name</dt>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-4 sm:mt-0">{adoption.Pet!.name}</dd>
                                                            </div>
                                                            <div className="bg-gray-50  px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                                                                <dt className="text-sm font-medium text-gray-500">Breed</dt>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-4 sm:mt-0">{adoption.Pet!.breed}</dd>
                                                            </div>
                                                            <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                                                                <dt className="text-sm font-medium text-gray-500">Size</dt>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-4 sm:mt-0">{adoption.Pet!.size}</dd>
                                                            </div>
                                                            <div className="bg-gray-50  px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                                                                <dt className="text-sm font-medium text-gray-500">Description</dt>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-4 sm:mt-0">{adoption.Pet!.note}</dd>
                                                            </div>
                                                            
                                                        </dl>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                )

                            })

                        }

                    </Table>
                </div>

            </div>


        </Page>
    )
}

export default AdoptionPage;