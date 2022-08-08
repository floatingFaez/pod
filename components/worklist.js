import Image from "next/image";
import Link from "next/link";
import { cx } from "@utils/all";
import GetImage from "@utils/getImage";
import { PhotographIcon } from "@heroicons/react/outline";

export default function Worklist({ post, aspect, preloadImage }) {

  const imageProps = post?.mainImage
    ? GetImage(post.mainImage)
    : null;

  return (
    <div className="cursor-pointer group">
      <div
        className={cx(
          "relative mx-5 md:mx-0 overflow-hidden transition-all bg-gray-800",
          aspect === "landscape" ? "aspect-video" : "aspect-square"
        )}>
        <Link href={`/work/${post.slug.current}`}>
          <a className="img-hover">
            {imageProps ? (
              <Image
                src={imageProps.src}
                loader={imageProps.loader}
                blurDataURL={imageProps.blurDataURL}
                alt={post.mainImage.alt || "Thumbnail"}
                placeholder="blur"
                layout="responsive"
                width={'440px'}
                height={'440px'}
                objectFit="cover"
                priority={true}
                className="transition-all"
              />
            ) : (
              <span className="absolute w-16 h-16 text-gray-200 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                <PhotographIcon />
              </span>
            )}
          </a>
        </Link>
      </div>

      <p className="mt-5 text-md text-brand-primary text-white font-secondary leading-5 uppercase">
        <Link href={`/work/${post.slug.current}`}>
          <a className="fss-1">
            {post.title} <br/>
            {post.city}
          </a>
        </Link>
      </p>
      
    </div>
  );
}
