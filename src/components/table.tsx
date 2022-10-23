import React from "react";

type TableProps = {
    title: string,
    description?: string,
    children: React.ReactNode
}

const Table = ({title, description, children}: TableProps): JSX.Element => {
    return (
        <React.Fragment>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6 border-b-2 border-gray-100">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
                    {
                        description &&
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">{description}</p>
                    }
                </div>
                <div className="p-5">
                    <div className="flex flex-col">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <table className="min-w-full divide-y divide-gray-200 border ">
                                    {children}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}


export default Table;