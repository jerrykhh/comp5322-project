/* eslint-disable @next/next/no-img-element */
import React, { HTMLProps } from "react";
import { useEffect, useState } from "react";
import Loader from "./loader";
import { Storage } from "aws-amplify";

const ImageView = ({ ...props }: HTMLProps<HTMLImageElement>): JSX.Element => {

    const [loading, setLoading] = useState<boolean>(true);
    const [src, setSrc] = useState<string>();

    useEffect(() => {
        console.log("src", src)
        getImageURL();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getImageURL = async () => {
        const signedUrl = await Storage.get(props.src as string);
        console.log(signedUrl);
        setLoading(false);
        setSrc(signedUrl)

    }

    return (
        <React.Fragment>

            {loading ?
                <div className="p-5">
                    <Loader show={loading} />
                </div>
                :
                <div className="max-w-full h-auto">
                    <img src={src as string} className="object-contain block m-auto rounded" alt={props.alt} />
                </div>
            }


        </React.Fragment >
    )

}

export default ImageView