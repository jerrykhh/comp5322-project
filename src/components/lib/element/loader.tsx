import { Spinner } from 'flowbite-react'

const Loader = ({ show = true }: { show: boolean }): JSX.Element => {

    const loaderClassName = "h-2.5 w-2.5 bg-gray-800 rounded-full";

    return (
        show ?
            <div className='flex m-auto justify-center'>
                <Spinner
                    size="md"
                />
            </div>
            : <></>
    )
}


export default Loader