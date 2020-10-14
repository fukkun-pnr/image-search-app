import React, { useRef, useState, useEffect, useCallback } from "react";

type Props = {
    src: string;
    alt?: string;
} & React.DOMAttributes<HTMLImageElement>;

export const LazyImage = React.memo((props: Props) => {
    const imageRef = useRef<HTMLImageElement>(null);
    const [imageLoaded, setImageLoaded] = useState(false);

    const startLoading = useCallback((entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            if (entry.intersectionRatio > 0) {
                observer.unobserve(entry.target)
            }

            if (!imageLoaded) {
                const downloadingImage = new Image()
                downloadingImage.onload = () => {
                    if (imageRef.current) {
                        imageRef.current.setAttribute('src', downloadingImage.src)
                        setImageLoaded(true)
                    }
                }

                downloadingImage.src = props.src;
                observer.unobserve(entry.target);
            }

            observer.unobserve(entry.target);
        })
    }, [imageLoaded, props.src]);

    useEffect(() => {
        if (!imageRef.current) return;
        const observer = new IntersectionObserver(startLoading, { rootMargin: '50px' })
        if (!imageLoaded) {
            observer.observe(imageRef.current)
        }
        return () => {
            if (imageRef.current) observer.unobserve(imageRef.current);
        }
    }, [imageLoaded, startLoading]);

    return (
        <img
            {...props}
            src={props.src}
            alt={props.alt}
            ref={imageRef}
        />
    )
});