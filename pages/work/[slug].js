import { useState, useEffect } from 'react'
import { map } from "lodash";
import Image from "next/image";
import dynamic from 'next/dynamic'
import Link from "next/link";
import { useRouter } from "next/router";
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import { FacebookShareButton, TwitterShareButton } from "react-share";

import Layout from "@components/layout";
import Container from "@components/container";
import SliderPlaceHolder from "@components/ui/slider-placeholder";
const WorkSlider = dynamic(() => import('@components/work/workSlider'),{ loading: () => <SliderPlaceHolder sizes={{w:1130,h:785}}/>, ssr: false });
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

import client, {
  getClient,
  usePreviewSubscription,
  PortableText
} from "@lib/sanity";

import ErrorPage from "next/error";
import GetImage from "@utils/getImage";
import { NextSeo } from "next-seo";

import { singleWorkquery, configQuery, workPathQuery } from "@lib/groq";


export default function Post(props) {

  const { postdata, siteconfig, preview } = props;

  const [modalShow, setModalShow] = useState(false)
  // const [player, setPlayer] = useState(null)

  const onPlayerReady = () => {
    console.log("iframe Added")
  }

  // const pauseVid = () => player.pauseVideo()


  const router = useRouter();
  const { slug } = router.query;


  const shareUrl =
    process.env.NODE_ENV === "production"
      ? `${process.env.VERCEL_URL}${router.asPath}`
      : `http://localhost:3000${router.asPath}`


  const { data: post } = usePreviewSubscription(singleWorkquery, {
    params: { slug: slug },
    initialData: postdata,
    enabled: preview || router.query.preview !== undefined
  });

  const { data: siteConfig } = usePreviewSubscription(configQuery, {
    initialData: siteconfig,
    enabled: preview || router.query.preview !== undefined
  });

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  const handleModalClose = () => {
    // pauseVid()
    setModalShow(false)
  }
  
  // const ogimage = siteConfig?.openGraphImage
  //   ? GetImage(siteConfig?.openGraphImage).src
  //   : defaultOG.src;
  
  let imageProps = post?.mainImage ? GetImage(post?.mainImage) : null;

  return (
    <>
      {post && siteConfig && (
        <Layout {...siteConfig}>
          <NextSeo
            title={`${post.title} - ${siteConfig.title}`}
            description={post.excerpt || ""}
            canonical={`${siteConfig?.url}/work/${post.slug.current}`}
            openGraph={{
              url: `${siteConfig?.url}/work/${post.slug.current}`,
              title: `${post.title} - ${siteConfig.title}`,
              description: post.excerpt || "",
              images: [
                {
                  url: imageProps.src,
                  width: 800,
                  height: 600,
                  alt: ""
                }
              ],
              site_name: siteConfig.title
            }}
            twitter={{
              cardType: "summary_large_image"
            }}
          />
          
          <div className="h-screen relative full-width relative z-0 overflow-hidden -mt-14">
            <div className="aspect-video">
              {imageProps && (
                <Image
                  src={imageProps.src}
                  loader={imageProps.loader}
                  blurDataURL={imageProps.blurDataURL}
                  alt={post.mainImage?.alt || "Thumbnail"}
                  placeholder="blur"
                  layout="fill"
                  loading="eager"
                  objectFit="cover"
                  objectPosition="top"
                />
              )}
            </div>

            <div className="slider-content full-width w-full h-screen text-white">

              <div className="mx-auto px-5 max-w-screen-xl h-full flex flex-row md:flex-col flex-grow justify-between ">
                <Link href="/work">
                  <a className="fss-1 text-white uppercase back-to-index justify-end index-nav font-secondary md:mt-2">
                    Back to Index
                  </a>
                </Link>

                <div className="description flex flex-row justify-end md:justify-between fss-2 text-white">

                  <div className="body hidden md:block">
                    <p className="mb-4 fss-4">{post?.campaign_name}</p>
                    <div className="post-body">{post.body && <PortableText value={post.body} />}</div>
                  </div>

                  <div className="social-share grid content-end">
                    <div className="share-content flex content-end ">
                      <span className="uppercase">Share</span>
                      <ul className="flex">
                        <li className="ml-5">
                          <FacebookShareButton
                            url={shareUrl}
                            quote={post?.campaign_name}
                            className=""
                          >
                            <svg width="9" height="19" viewBox="0 0 9 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M0.287315 10.1196H2.24106V18.6935C2.24106 18.7748 2.27133 18.8528 2.32521 18.9102C2.37909 18.9677 2.45217 19 2.52837 19H5.83824C5.91444 19 5.98752 18.9677 6.0414 18.9102C6.09528 18.8528 6.12555 18.7748 6.12555 18.6935V10.1595H8.37006C8.44082 10.16 8.50927 10.1326 8.56229 10.0826C8.61531 10.0327 8.64916 9.96355 8.65737 9.88858L8.99813 6.73152C9.00276 6.68844 8.99877 6.6448 8.98643 6.60349C8.97408 6.56218 8.95365 6.52413 8.92649 6.49186C8.89934 6.4596 8.86607 6.43384 8.82889 6.41631C8.79171 6.39877 8.75146 6.38985 8.71081 6.39013H6.12498V4.4129C6.12498 3.81655 6.42608 3.51377 7.02025 3.51377H8.71139C8.78759 3.51377 8.86067 3.48149 8.91455 3.42402C8.96843 3.36655 8.9987 3.2886 8.9987 3.20732V0.306452C8.9987 0.225176 8.96843 0.147228 8.91455 0.0897576C8.86067 0.0322868 8.78759 0 8.71139 0L6.38126 0C6.36517 0 6.3284 0 6.27496 0C5.87272 0 4.46545 0.0845806 3.35526 1.17371C2.12556 2.38052 2.29622 3.82574 2.33759 4.07642V6.39013H0.287315C0.211114 6.39013 0.138035 6.42242 0.0841528 6.47989C0.0302708 6.53736 0 6.6153 0 6.69658V9.81319C0 9.85344 0.00743192 9.89329 0.0218708 9.93047C0.0363098 9.96765 0.0574731 10.0014 0.0841528 10.0299C0.110832 10.0583 0.142506 10.0809 0.177364 10.0963C0.212223 10.1117 0.249584 10.1196 0.287315 10.1196Z" fill="white"/>
                            </svg>
                          </FacebookShareButton>
                        </li>
                        <li className="ml-5">
                        <TwitterShareButton
                          url={shareUrl}
                          title={post?.campaign_name}
                          className=""
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 512 512"><path fill="white" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/></svg>
                        </TwitterShareButton>
     
                        </li>
                      </ul>
                    </div>
                    
                  </div>

                </div>
              </div>
            </div>
          </div>

          <div className="full-width theme-gray-bg">
            <Container>
              <div className="body md:hidden pt-10">
                <p className="mb-3 fss-3">{post?.campaign_name}</p>
                <div className="work-desc">{post.body && <PortableText value={post.body} />}</div>
              </div>

              <div className="grid md:grid-cols-2 md:grid-rows-1 py-10 md:pt-9">
                  {
                    map(post?.section2Images, (sectionImage,index)=> {
                      const classes = index === 1 ? 'pad-max':''
                      return <div className={`img-wrap my-5 md:my-16 ${classes}`} key={sectionImage._key}>
                                <Section2Image image={sectionImage.image} sizes={{w:660,h:875}}/>
                              </div>
                    })
                  }
              </div>
            </Container>
          </div>


          <div className="full-width w-full h-screen text-white overflow-hidden relative hidden md:block">
            <div className="aspect-video">
              {
                post?.section3Image && <MainImage image={post?.section3Image} 
                                        layout="fill" 
                                        loading="eager" 
                                        objectFit="cover" 
                                        objectPosition="top"/>
              }
            </div>
          </div>

          <div className="full-width theme-gray-bg pb-2">
            <Container>
              <div className="work-section-content text-center">
                <p className="fss-1 uppercase font-secondary text-center mb-8">{post.section4Heading} </p>
                <div className="text-heading-2.5x font-regular tracking-tight text-center lg:leading-snug text-brand-primary">
                    {post.section4Description && <PortableText value={post.section4Description} />}
                </div>
              </div>
              <div className="relative work-section-image overflow-hidden">
                {post?.section4Image && <MainImage image={post.section4Image} 
                                        layout="fill" 
                                        loading="eager" 
                                        objectFit="cover" 
                                        objectPosition="top"/>}
              </div>
              
            </Container>
          </div>
          <div className="full-width theme-gray-bg py-10 md:py-32">
              <Container>
                <div className="grid md:grid-cols-2 md:grid-rows-1 gap-10">
                  <div className="relative work-section-image overflow-hidden">
                    {post?.section4Image && <MainImage image={post.section5Image} 
                                            layout="fill" 
                                            loading="eager" 
                                            objectFit="cover" 
                                            objectPosition="top"/>}
                  </div>
                  <div className="section-content grid content-center">
                      <div className="vertical-center md:px-16">
                        <span className="fss-3 uppercase">
                          {post?.section5Heading}
                        </span>
                        <div className="fss-2 mt-4">
                          {post?.section5Description && <PortableText value={post.section5Description} />}
                        </div>
                      </div>
                  </div>
                </div>
              </Container>
            </div>

            <div className="full-width  pb-4">

              <Container>
                <div className="work-section-content text-center text-white">
                  <p className="fss-1 uppercase font-secondary text-center mb-8">{post?.section6Heading} </p>
                  <div className="text-heading-2.5x font-regular tracking-tight text-center lg:leading-snug text-brand-primary">
                      {post.section6Description && <PortableText value={post.section6Description} />}
                  </div>
                </div>
              </Container>

              {post?.section6Images && <WorkSlider works={post.section6Images} sliderPerView={1} className='!border-r-0 !p-0 !mr-5' wrapperClassName='nav-white with-left-padding'/>}

            </div>

            <div className="full-width  theme-gray-bg pb-4 md:pb-9">
              <Container>
                <div className="work-section-content text-center text-white">
                  <p className="fss-1 uppercase font-secondary text-center mb-8">{post?.section7Heading} </p>
                  <div className="text-heading-3x font-regular tracking-tight text-center lg:leading-snug text-brand-primary">
                      {post.section6Description && <PortableText value={post.section7Description} />}
                  </div>
                </div>
                <div className="relative work-section-image overflow-hidden video-img">
                  
                {post?.section7videoImage && <MainImage image={post.section7videoImage} 
                                                          layout="fill" 
                                                          loading="eager" 
                                                          objectFit="cover" 
                                                          objectPosition="top"/>}
                  <div className="play-button" onClick={() => setModalShow(true)}>
                    <img src="/img/play-icon.svg" className="play-icon" />
                  </div>
                  
                </div>
                
              </Container>
              
            </div>
          
            <div className="full-width  theme-gray-bg py-4 md:py-16 ">
              <Container>
                <div className="grid md:grid-cols-2 grid-rows-1 gap-5">
                  <div className="md:pr-5 hidden md:block">
                    {post?.mainImage && <MainImage image={post.mainImage} />}
                  </div>

                  <div className="section-content grid content-center py-10">
                      <div className="vertical-center md:px-16 grid md:grid-cols-2">
                        {
                          map(post.services, obj => {
                            return <div className="service mb-5 md:mb-4" key={obj._key}>
                                      <span className="fss-1 font-secondary uppercase">
                                        {obj?.service}
                                      </span>
                                      <p className="fss-4 uppercase">
                                        {obj?.specialist}
                                      </p>
                                    </div>
                          })
                        }
                      </div>
                  </div>
                </div>
              </Container>
            </div>

            <div className={`modal video-modal ${modalShow?'':'hidden'}`}>
                <button type="button" className="btn-close" onClick={handleModalClose}>
                    <img src="/img/cross.svg" alt="cross-black"/>
                </button>
                <div className="modal-body grid grid-rows-3">
                    {post.section7videoUrl && 
                      <LiteYouTubeEmbed
                        aspectHeight = {9}
                        aspectWidth = {16}
                        id={post.section7videoUrl}
                        title={post?.campaign_name}
                        onIframeAdded={onPlayerReady}
                      />
                    }
                </div>
            </div>
        </Layout>
      )}
    </>
  );
}

const MainImage = ({ image,...rest }) => {
  return (
      <Image {...GetImage(image)} alt={image?.alt || "Thumbnail"} {...rest}/>
  );
};


const Section2Image = ({ image,sizes }) => {
  const imageProps = image ? GetImage(image) :  null
  return (
      <Image 
          src={imageProps.src}
          loader={imageProps.loader}
          blurDataURL={imageProps.blurDataURL}
          placeholder="blur"
          layout="responsive"
          width={sizes.w}
          height={sizes.h}
          priority={true}
          alt={image.alt || "Section Image"} 
      /> 
  );
};

export async function getStaticProps({ params, preview = false }) {
  const post = await getClient(preview).fetch(singleWorkquery, {
    slug: params.slug
  });

  const config = await getClient(preview).fetch(configQuery);

  return {
    props: {
      postdata: { ...post },
      siteconfig: { ...config },
      preview
    },
    revalidate: 100
  };
}

export async function getStaticPaths() {
  const allPosts = await client.fetch(workPathQuery);
  return {
    paths:
      allPosts?.map(page => ({
        params: {
          slug: page.slug
        }
      })) || [],
    fallback: true
  };
}
