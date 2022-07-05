import Image from "next/image";
import Link from "next/link";
import { cx } from "@utils/all";
import GetImage from "@utils/getImage";
import { parseISO, format } from "date-fns";
import { PhotographIcon } from "@heroicons/react/outline";

export default function Worklist({ post, aspect, preloadImage }) {

  const imageProps = post?.mainImage
    ? GetImage(post.mainImage)
    : null;

  return (
    <>
      <div className="cursor-pointer group">
        <div
          className={cx(
            "relative overflow-hidden transition-all bg-gray-100 dark:bg-gray-800  hover:scale-105",
            aspect === "landscape" ? "aspect-video" : "aspect-square"
          )}>
          <Link href={`/work/${post.slug.current}`}>
            <a>
              {imageProps ? (
                <Image
                  src={imageProps.src}
                  loader={imageProps.loader}
                  blurDataURL={imageProps.blurDataURL}
                  alt={post.mainImage.alt || "Thumbnail"}
                  placeholder="blur"
                  sizes="80vw"
                  //sizes="(max-width: 640px) 90vw, 480px"
                  layout="fill"
                  objectFit="cover"
                  priority={preloadImage ? true : false}
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

        <h2 className="mt-5 text-lg font-regular leading-4 text-brand-primary dark:text-white font-secondary uppercase">
          <Link href={`/work/${post.slug.current}`}>
            {post.title}
          </Link>
        </h2>
        <p className="text-brand-primary dark:text-white leading-5 font-secondary uppercase">{post.city}</p>
      </div>
    </>
  );
}
