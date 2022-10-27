/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { DetailedHTMLProps, HTMLProps, ImgHTMLAttributes } from "react";
import { useEffect, useState } from "react";
import Loader from "./loader";
import { Storage } from "aws-amplify";
import { Spinner } from 'flowbite-react'

interface ImageViewProps extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
    default?: boolean
}

const ImageView = ({ ...props }: ImageViewProps): JSX.Element => {

    // const [loading, setLoading] = useState<boolean>(true);
    const [imageSrc, setImageSrc] = useState<string | undefined>('');

    useEffect(() => {
        // const signedUrl = await Storage.get(props.src as string);
        // console.log(signedUrl);
        // setLoading(false);

        // change to cdn
        console.log('src', props.src)
        console.log(props.default)
        if(props.src){
            console.log(process.env.NEXT_PUBLIC_CDN_ENDPOINT)
            setImageSrc(`${process.env.NEXT_PUBLIC_CDN_ENDPOINT}${props.src}`);
        }else {
            console.log(`set cdn`)
            setImageSrc('/images/default/default-pet.jpg');
        }
        console.log('src', props.src)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.src])

    return (
        <React.Fragment>

            <div className="max-w-full h-auto">
                <img {...props} src={imageSrc} />
            </div>

        </React.Fragment >
    )

}

export default ImageView